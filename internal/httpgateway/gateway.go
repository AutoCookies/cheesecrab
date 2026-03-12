package httpgateway

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/AutoCookies/cheesecrab/internal/agent"
	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/telemetry"
	cbproc "github.com/AutoCookies/cheesecrab/internal/process/cheesebrain"
)

// Gateway wires the external HTTP API to the underlying cheesebrain server
// and agentic runtime.
type Gateway struct {
	cfg      *config.Config
	log      *log.Logger
	proxy    *httputil.ReverseProxy
	agentSvc *agent.Service
	telemetry *telemetry.Service
}

// New constructs a new Gateway instance.
func New(cfg *config.Config, mgr *cbproc.Manager, tel *telemetry.Service, logger *log.Logger) *Gateway {
	targetURL, _ := url.Parse(mgr.URL())
	proxy := httputil.NewSingleHostReverseProxy(targetURL)

	agentSvc := agent.NewService(cfg, mgr.URL(), logger)

	return &Gateway{
		cfg:       cfg,
		log:       logger,
		proxy:     proxy,
		agentSvc:  agentSvc,
		telemetry: tel,
	}
}

// Router returns an http.Handler that serves the Cheesecrab public API.
func (g *Gateway) Router() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/healthz", g.handleHealth)
	mux.HandleFunc("/ws/system-status", g.handleSystemStatusWS)
	mux.HandleFunc("/v1/chat/completions", g.handleChatCompletions)

	// Fallback: proxy any other paths directly to cheesebrain.
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		g.proxy.ServeHTTP(w, r)
	})

	return mux
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

