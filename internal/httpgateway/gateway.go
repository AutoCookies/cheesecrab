package httpgateway

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"io/fs"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/AutoCookies/cheesecrab/internal/agent"
	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/modeldownload"
	"github.com/AutoCookies/cheesecrab/internal/telemetry"
	cbproc "github.com/AutoCookies/cheesecrab/internal/process/cheesebrain"
)

// Gateway wires the external HTTP API to the underlying cheesebrain server
// and agentic runtime.
type Gateway struct {
	cfg       *config.Config
	log       *log.Logger
	proxy     *httputil.ReverseProxy
	mgr       *cbproc.Manager
	agentSvc  *agent.Service
	telemetry *telemetry.Service
	embedFS   fs.FS // non-nil when frontend assets are embedded into the binary
}

// New constructs a new Gateway instance.
// embedFS may be nil (dev mode: serve from disk at cfg.WebRoot).
func New(cfg *config.Config, mgr *cbproc.Manager, tel *telemetry.Service, logger *log.Logger, embedFS fs.FS) *Gateway {
	// Dynamic reverse proxy: reads the current cheesebrain URL on every request
	// so it picks up new ports after SwitchModel restarts the process.
	proxy := &httputil.ReverseProxy{
		Director: func(req *http.Request) {
			baseURL := mgr.URL()
			if baseURL == "" {
				// Leave req unmodified; ErrorHandler below catches the failure.
				return
			}
			target, _ := url.Parse(baseURL)
			req.URL.Scheme = target.Scheme
			req.URL.Host = target.Host
			req.Host = target.Host
		},
		ErrorHandler: func(w http.ResponseWriter, r *http.Request, err error) {
			w.Header().Set("Content-Type", "application/json")
			if mgr.URL() == "" {
				w.WriteHeader(http.StatusServiceUnavailable)
				_, _ = w.Write([]byte(`{"error":"Engine offline — load a model first"}`))
			} else {
				w.WriteHeader(http.StatusBadGateway)
				_, _ = w.Write([]byte(`{"error":"Engine unavailable"}`))
			}
		},
	}

	agentSvc := agent.NewService(cfg, mgr.URL(), logger)

	return &Gateway{
		cfg:       cfg,
		log:       logger,
		proxy:     proxy,
		mgr:       mgr,
		agentSvc:  agentSvc,
		telemetry: tel,
		embedFS:   embedFS,
	}
}

// Router returns an http.Handler that serves the Cheesecrab public API
// and optionally the web UI from cfg.WebRoot (SPA fallback to index.html).
func (g *Gateway) Router() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/healthz", g.handleHealth)
	mux.HandleFunc("/ws/system-status", g.handleSystemStatusWS)
	mux.HandleFunc("/v1/chat/completions", g.handleChatCompletions)

	// Agent endpoints
	mux.HandleFunc("/v1/agent/run", g.agentSvc.HandleAgentRun)
	mux.HandleFunc("/v1/agent/approve", g.agentSvc.HandleAgentApprove)
	mux.HandleFunc("/v1/agent/paths", g.agentSvc.HandleAgentPaths)

	// Model pull — intercepts URL-based downloads before proxying to cheesebrain
	mux.HandleFunc("/api/pull", g.handleModelPull)

	// Model list — scans local models dir so freshly downloaded files appear immediately
	mux.HandleFunc("/api/models", g.handleModelList)

	// Model load — starts/restarts cheesebrain with the chosen model
	mux.HandleFunc("/models/load", g.handleLoadModel)

	// Crab Table (Luckysheet) assets from local crabtable/dist when present
	if g.cfg.CrabtableRoot != "" {
		if info, err := os.Stat(g.cfg.CrabtableRoot); err == nil && info.IsDir() {
			mux.Handle("/crabtable/", http.StripPrefix("/crabtable", http.FileServer(http.Dir(g.cfg.CrabtableRoot))))
		}
	}

	// Fallback: serve web UI from WebRoot if present, else proxy to cheesebrain.
	mux.HandleFunc("/", g.handleFallback)
	return mux
}

// handleFallback serves static web UI (with SPA index.html fallback).
// Priority: embedded FS > WebRoot on disk > proxy to cheesebrain.
func (g *Gateway) handleFallback(w http.ResponseWriter, r *http.Request) {
	// ── 1. Embedded assets (production binary) ────────────────────────────────
	if g.embedFS != nil {
		g.serveFromFS(w, r, g.embedFS)
		return
	}

	// ── 2. On-disk WebRoot (development / explicit config) ────────────────────
	root := g.cfg.WebRoot
	if root != "" {
		if info, err := os.Stat(root); err == nil && info.IsDir() {
			diskFS := os.DirFS(root)
			g.serveFromFS(w, r, diskFS)
			return
		}
	}

	// ── 3. Fall through to cheesebrain reverse proxy ──────────────────────────
	g.proxy.ServeHTTP(w, r)
}

// serveFromFS serves a request from any fs.FS with an SPA index.html fallback.
func (g *Gateway) serveFromFS(w http.ResponseWriter, r *http.Request, fsys fs.FS) {
	path := r.URL.Path
	if path == "/" || path == "" {
		path = "index.html"
	} else {
		path = filepath.ToSlash(filepath.Clean(path[1:])) // strip leading /
	}

	f, err := fsys.Open(path)
	if err != nil {
		// SPA fallback: unknown paths serve index.html
		f, err = fsys.Open("index.html")
		if err != nil {
			http.NotFound(w, r)
			return
		}
		path = "index.html"
	}
	defer f.Close()

	stat, err := f.Stat()
	if err != nil || stat.IsDir() {
		http.NotFound(w, r)
		return
	}

	if rs, ok := f.(io.ReadSeeker); ok {
		http.ServeContent(w, r, stat.Name(), stat.ModTime(), rs)
	} else {
		// embed.FS files are not seekable; read and serve manually
		data, err := io.ReadAll(f)
		if err != nil {
			http.Error(w, "internal error", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", mimeForPath(path))
		_, _ = w.Write(data)
	}
}

// mimeForPath returns a basic Content-Type for common web asset extensions.
func mimeForPath(path string) string {
	switch filepath.Ext(path) {
	case ".html":
		return "text/html; charset=utf-8"
	case ".js", ".mjs":
		return "application/javascript"
	case ".css":
		return "text/css"
	case ".svg":
		return "image/svg+xml"
	case ".png":
		return "image/png"
	case ".jpg", ".jpeg":
		return "image/jpeg"
	case ".ico":
		return "image/x-icon"
	case ".woff2":
		return "font/woff2"
	case ".woff":
		return "font/woff"
	case ".json":
		return "application/json"
	default:
		return "application/octet-stream"
	}
}

func (g *Gateway) handleHealth(w http.ResponseWriter, _ *http.Request) {
	snap := g.telemetry.GetSnapshot()

	resp := struct {
		OK           bool    `json:"ok"`
		EngineState  string  `json:"engine_state"`
		CPUPercent   float64 `json:"cpu_percent"`
		MemTotal     uint64  `json:"mem_total_bytes"`
		MemUsed      uint64  `json:"mem_used_bytes"`
		MemFree      uint64  `json:"mem_free_bytes"`
		EngineModel  string  `json:"engine_model,omitempty"`
		EngineStatus string  `json:"engine_message,omitempty"`
	}{
		OK:           snap.EngineState == "ready" || snap.EngineState == "loading" || snap.EngineState == "starting",
		EngineState:  snap.EngineState,
		CPUPercent:   snap.CPUPercent,
		MemTotal:     snap.MemTotalBytes,
		MemUsed:      snap.MemUsedBytes,
		MemFree:      snap.MemFreeBytes,
		EngineModel:  snap.EngineModel,
		EngineStatus: snap.EngineMessage,
	}

	w.Header().Set("Content-Type", "application/json")
	if !resp.OK {
		w.WriteHeader(http.StatusServiceUnavailable)
	}
	_ = json.NewEncoder(w).Encode(resp)
}

func (g *Gateway) handleSystemStatusWS(w http.ResponseWriter, r *http.Request) {
	g.telemetry.HandleWebSocket(w, r)
}

func (g *Gateway) handleChatCompletions(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var bodyBuf bytes.Buffer
	tee := io.TeeReader(r.Body, &bodyBuf)
	raw, err := io.ReadAll(tee)
	if err != nil {
		http.Error(w, "failed to read body", http.StatusBadRequest)
		return
	}
	_ = r.Body.Close()

	if !shouldRouteAgentic(r.Header, raw) {
		r.Body = io.NopCloser(&bodyBuf)
		g.proxy.ServeHTTP(w, r)
		return
	}

	var req agent.ChatRequest
	if err := json.Unmarshal(raw, &req); err != nil {
		http.Error(w, "invalid JSON", http.StatusBadRequest)
		return
	}

	if err := g.agentSvc.HandleAgenticChat(r.Context(), &req, w); err != nil {
		g.log.Printf("agentic chat error: %v", err)
		http.Error(w, "agent error", http.StatusInternalServerError)
		return
	}
}

type rawChatReq struct {
	Tools      any    `json:"tools"`
	ToolChoice any    `json:"tool_choice"`
	Mode       string `json:"mode"`
}

// handleModelPull handles POST /api/pull.
// If the "model" field is an HTTP(S) URL it downloads the file directly to
// the models directory and streams NDJSON progress. Otherwise the request is
// proxied to cheesebrain (Ollama-style name resolution).
func (g *Gateway) handleModelPull(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}
	_ = r.Body.Close()

	var pullReq struct {
		Model string `json:"model"`
		Name  string `json:"name"` // Ollama also uses "name"
	}
	_ = json.Unmarshal(body, &pullReq)
	modelVal := pullReq.Model
	if modelVal == "" {
		modelVal = pullReq.Name
	}

	// Check if the value is a URL (http:// or https://)
	if strings.HasPrefix(modelVal, "http://") || strings.HasPrefix(modelVal, "https://") {
		// Normalize HuggingFace blob URLs and validate
		downloadURL, _, err := modeldownload.NormalizeURL(modelVal)
		if err != nil {
			w.Header().Set("Content-Type", "application/x-ndjson")
			_ = json.NewEncoder(w).Encode(map[string]string{"status": "error", "error": err.Error()})
			return
		}
		w.Header().Set("Content-Type", "application/x-ndjson")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")
		modeldownload.Download(r.Context(), downloadURL, g.cfg.ModelsDir, w)
		return
	}

	// Not a URL — proxy to cheesebrain
	r.Body = io.NopCloser(bytes.NewReader(body))
	g.proxy.ServeHTTP(w, r)
}

// handleModelList scans the ModelsDir for .gguf files and returns a JSON
// model list in the OpenAI /v1/models format.  This runs entirely in
// cheesecrab so newly-downloaded files are visible without restarting
// cheesebrain.
func (g *Gateway) handleModelList(w http.ResponseWriter, r *http.Request) {
	type modelStatus struct {
		Value string `json:"value"`
	}
	type modelEntry struct {
		ID     string      `json:"id"`
		Object string      `json:"object"`
		Size   int64       `json:"size"`
		Status modelStatus `json:"status"`
	}
	type modelList struct {
		Object string       `json:"object"`
		Data   []modelEntry `json:"data"`
	}

	activeModel := g.mgr.ActiveModel() // e.g. "/home/user/.cheesecrab/models/foo.gguf"

	entries := []modelEntry{}
	dir := g.cfg.ModelsDir
	files, err := os.ReadDir(dir)
	if err == nil {
		for _, f := range files {
			if f.IsDir() {
				continue
			}
			name := f.Name()
			if !strings.HasSuffix(strings.ToLower(name), ".gguf") {
				continue
			}
			if strings.HasSuffix(name, ".tmp") {
				continue
			}
			info, _ := f.Info()
			var sz int64
			if info != nil {
				sz = info.Size()
			}
			id := strings.TrimSuffix(name, filepath.Ext(name))
			fullPath := filepath.Join(dir, name)
			status := "standby"
			if fullPath == activeModel && g.mgr.IsRunning() {
				status = "loaded"
			}
			entries = append(entries, modelEntry{
				ID:     id,
				Object: "model",
				Size:   sz,
				Status: modelStatus{Value: status},
			})
		}
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(modelList{Object: "list", Data: entries})
}

// handleLoadModel starts or restarts cheesebrain with the requested model.
// It blocks until cheesebrain is ready (up to 90s) then returns 200 OK.
func (g *Gateway) handleLoadModel(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req struct {
		Model string `json:"model"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Model == "" {
		http.Error(w, `{"error":"missing model"}`, http.StatusBadRequest)
		return
	}

	// Resolve full path: accept "name", "name.gguf", or an absolute path.
	modelPath := req.Model
	if !filepath.IsAbs(modelPath) {
		if !strings.HasSuffix(strings.ToLower(modelPath), ".gguf") {
			modelPath += ".gguf"
		}
		modelPath = filepath.Join(g.cfg.ModelsDir, modelPath)
	}

	if _, err := os.Stat(modelPath); err != nil {
		http.Error(w, `{"error":"model file not found: `+modelPath+`"}`, http.StatusNotFound)
		return
	}

	g.log.Printf("switching model → %s", modelPath)

	ctx, cancel := context.WithTimeout(r.Context(), 90*time.Second)
	defer cancel()

	if err := g.mgr.SwitchModel(ctx, modelPath); err != nil {
		g.log.Printf("SwitchModel error: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		_ = json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]string{"status": "loaded", "model": req.Model})
}

// shouldRouteAgentic inspects the request to decide whether it should be
// handled via the agentic path or proxied directly to cheesebrain.
func shouldRouteAgentic(h http.Header, raw []byte) bool {
	if h.Get("X-Cheese-Agentic") == "1" {
		return true
	}

	var tmp rawChatReq
	if err := json.Unmarshal(raw, &tmp); err != nil {
		return false
	}

	if tmp.Mode == "agentic" {
		return true
	}
	if tmp.Tools != nil || tmp.ToolChoice != nil {
		return true
	}
	return false
}

