package agent

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/AutoCookies/crabpath/agent"
	"github.com/AutoCookies/crabpath/callback"
	"github.com/AutoCookies/crabpath/llm"
	"github.com/AutoCookies/crabpath/memory"
	"github.com/AutoCookies/crabpath/tools"
	"github.com/google/uuid"

	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/llmclient"
)

// ChatRequest mirrors the OpenAI chat completions request shape.
type ChatRequest struct {
	Model    string          `json:"model"`
	Messages json.RawMessage `json:"messages"`
	Tools    json.RawMessage `json:"tools,omitempty"`
	Mode     string          `json:"mode,omitempty"`
	Goal     string          `json:"goal,omitempty"`
	Raw      json.RawMessage `json:"-"`
}

// AgentRunRequest is the payload for POST /v1/agent/run.
type AgentRunRequest struct {
	Goal      string `json:"goal"`
	Model     string `json:"model,omitempty"`
	Strategy  string `json:"strategy,omitempty"` // "react" | "function_calling"
	MaxSteps  int    `json:"max_steps,omitempty"`
	SessionID string `json:"session_id,omitempty"` // client hint; server always generates one
}

// AgentApproveRequest is the payload for POST /v1/agent/approve.
type AgentApproveRequest struct {
	SessionID string `json:"session_id"`
	Approved  bool   `json:"approved"`
}

// runState tracks an in-flight agent run.
type runState struct {
	path      *agent.CrabPath
	approveCh chan bool
	startedAt time.Time
}

// Service coordinates agentic request handling and session lifecycle.
type Service struct {
	log      *log.Logger
	llmProxy llmclient.Client
	llmAddr  string
	cfg      *config.Config

	mu       sync.RWMutex
	sessions map[string]*runState
	history  []*agent.CrabPath // completed paths, capped at 100
}

// NewService constructs a Service backed by the cheesebrain LLM client.
func NewService(cfg *config.Config, cheesebrainBaseURL string, logger *log.Logger) *Service {
	return &Service{
		log:      logger,
		llmProxy: llmclient.NewHTTPClient(cheesebrainBaseURL),
		llmAddr:  cheesebrainBaseURL,
		cfg:      cfg,
		sessions: make(map[string]*runState),
	}
}

// ─── approvalGatedTool ────────────────────────────────────────────────────────

// approvalGatedTool wraps a dangerous CrabTool and blocks Execute until
// the user approves or denies via /v1/agent/approve.
type approvalGatedTool struct {
	tools.CrabTool
	approveCh chan bool
}

func (t *approvalGatedTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	if t.CrabTool.Dangerous() {
		select {
		case approved, ok := <-t.approveCh:
			if !ok || !approved {
				return "", fmt.Errorf("tool %q execution denied by user", t.CrabTool.Name())
			}
		case <-ctx.Done():
			return "", fmt.Errorf("approval wait cancelled: %w", ctx.Err())
		}
	}
	return t.CrabTool.Execute(ctx, args)
}

// gatedRegistry builds a fresh registry with all dangerous tools wrapped in
// an approval gate that blocks until the user signals via approveCh.
func gatedRegistry(baseAddr string, approveCh chan bool) *tools.Registry {
	base := tools.DefaultRegistry(baseAddr)
	r := tools.NewRegistry()
	for _, t := range base.All() {
		if t.Dangerous() {
			r.Register(&approvalGatedTool{CrabTool: t, approveCh: approveCh})
		} else {
			r.Register(t)
		}
	}
	return r
}

// ─── HTTP handlers ────────────────────────────────────────────────────────────

// HandleAgenticChat handles a /v1/chat/completions request routed as agentic.
func (s *Service) HandleAgenticChat(ctx context.Context, req *ChatRequest, w http.ResponseWriter) error {
	if req.Goal != "" {
		return s.runAgentSSE(ctx, &AgentRunRequest{
			Goal:  req.Goal,
			Model: req.Model,
		}, w)
	}
	w.Header().Set("Content-Type", "application/json")
	payload := any(req)
	respStream, err := s.llmProxy.ChatCompletions(ctx, payload)
	if err != nil {
		return err
	}
	defer respStream.Close()
	_, err = io.Copy(w, respStream)
	return err
}

// HandleAgentRun handles POST /v1/agent/run, streaming agent events as SSE.
func (s *Service) HandleAgentRun(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var runReq AgentRunRequest
	if err := json.NewDecoder(r.Body).Decode(&runReq); err != nil {
		http.Error(w, "invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}
	if runReq.Goal == "" {
		http.Error(w, `{"error":"goal is required"}`, http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	if err := s.runAgentSSE(r.Context(), &runReq, w); err != nil {
		s.log.Printf("agent run error: %v", err)
	}
}

// HandleAgentApprove handles POST /v1/agent/approve, unblocking a dangerous tool.
func (s *Service) HandleAgentApprove(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req AgentApproveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}
	if req.SessionID == "" {
		http.Error(w, `{"error":"session_id required"}`, http.StatusBadRequest)
		return
	}

	s.mu.RLock()
	state, ok := s.sessions[req.SessionID]
	s.mu.RUnlock()

	if !ok {
		http.Error(w, `{"error":"session not found"}`, http.StatusNotFound)
		return
	}

	// Non-blocking send: if the tool is not currently waiting, the signal is dropped.
	select {
	case state.approveCh <- req.Approved:
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]any{"ok": true, "approved": req.Approved})
	default:
		http.Error(w, `{"error":"no tool is waiting for approval"}`, http.StatusConflict)
	}
}

// HandleAgentPaths handles GET /v1/agent/paths, returning completed agent runs.
func (s *Service) HandleAgentPaths(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	s.mu.RLock()
	paths := make([]*agent.CrabPath, len(s.history))
	copy(paths, s.history)
	s.mu.RUnlock()

	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(map[string]any{"paths": paths})
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

func (s *Service) runAgentSSE(ctx context.Context, req *AgentRunRequest, w http.ResponseWriter) error {
	sessionID := uuid.NewString()
	approveCh := make(chan bool, 4) // buffered to prevent deadlock on rapid approvals

	llmClient := llm.NewClient(s.llmAddr)
	registry := gatedRegistry(fmt.Sprintf("http://%s", s.cfg.ListenAddr), approveCh)
	mem := memory.NewBufferMemory()

	var strategy agent.Strategy
	switch req.Strategy {
	case "function_calling":
		strategy = agent.NewFunctionCallingStrategy()
	default:
		strategy = agent.NewReActStrategy()
	}

	execOpts := []agent.ExecutorOption{
		agent.WithStrategy(strategy),
		agent.WithMemory(mem),
		agent.WithModel(req.Model),
		agent.WithCallbacks(callback.NewLogHandler(os.Stdout)),
	}
	if req.MaxSteps > 0 {
		execOpts = append(execOpts, agent.WithMaxSteps(req.MaxSteps))
	}
	executor := agent.NewExecutor(llmClient, registry, execOpts...)

	// Register session before starting so approve calls can find it immediately.
	s.mu.Lock()
	s.sessions[sessionID] = &runState{approveCh: approveCh, startedAt: time.Now()}
	s.mu.Unlock()

	// Send session_start event so frontend knows the session ID for approval calls.
	flusher, canFlush := w.(http.Flusher)
	writeSSE := func(data []byte) {
		fmt.Fprintf(w, "data: %s\n\n", data)
		if canFlush {
			flusher.Flush()
		}
	}

	startData, _ := json.Marshal(map[string]any{
		"type":       "session_start",
		"session_id": sessionID,
		"step":       0,
		"payload":    req.Goal,
	})
	writeSSE(startData)

	events, path := executor.Run(ctx, req.Goal)
	for ev := range events {
		data, _ := json.Marshal(ev)
		writeSSE(data)
	}

	// Move completed path to history.
	s.mu.Lock()
	delete(s.sessions, sessionID)
	if path != nil {
		s.history = append(s.history, path)
		if len(s.history) > 100 {
			s.history = s.history[len(s.history)-100:]
		}
	}
	s.mu.Unlock()

	writeSSE([]byte("[DONE]"))
	return nil
}
