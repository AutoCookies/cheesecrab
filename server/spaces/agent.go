package spaces

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/AutoCookies/cheesecrab-super/server/config"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
	crabagent "github.com/AutoCookies/crabpath/agent"
	crabtools "github.com/AutoCookies/crabpath/tools"
)

// AgentSpace implements the Space interface and wires crabpath into the
// Gin router under /v1/spaces/agent.
type AgentSpace struct {
	cfg *config.Config
}

func NewAgentSpace(cfg *config.Config) *AgentSpace {
	return &AgentSpace{cfg: cfg}
}

func (s *AgentSpace) Name() string { return "agent" }

func (s *AgentSpace) RegisterRoutes(r *gin.RouterGroup) {
	r.POST("/run", s.handleRun)
	r.GET("/tools", s.handleListTools)
	r.GET("/sessions", s.handleListSessions)
}

// ─── POST /v1/spaces/agent/run ────────────────────────────────────────────────
// Accepts a goal, spins up a CrabAgent, and streams progress events as SSE.

func (s *AgentSpace) handleRun(c *gin.Context) {
	var req struct {
		Goal  string `json:"goal" binding:"required"`
		Model string `json:"model"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if req.Model == "" {
		req.Model = "default"
	}

	llmAddr := fmt.Sprintf("http://127.0.0.1:%d", s.cfg.LLMPort)

	agentCfg := crabagent.Config{
		MaxSteps: 20,
		Model:    req.Model,
		LLMAddr:  llmAddr,
	}

	registry := crabtools.DefaultRegistry(fmt.Sprintf("http://127.0.0.1:%d", s.cfg.Port))
	agent := crabagent.NewCrabAgent(agentCfg, registry)

	ctx, cancel := context.WithTimeout(c.Request.Context(), 10*time.Minute)
	defer cancel()

	// Stream SSE
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("X-Accel-Buffering", "no")

	events, path := agent.RunPath(ctx, req.Goal)

	w := c.Writer
	flusher, ok := w.(http.Flusher)
	bw := bufio.NewWriter(w)

	for event := range events {
		data, _ := json.Marshal(event)
		fmt.Fprintf(bw, "data: %s\n\n", data)
		bw.Flush()
		if ok {
			flusher.Flush()
		}
	}

	// Emit final path summary
	summary, _ := json.Marshal(gin.H{
		"type":   "path_complete",
		"id":     path.ID,
		"status": path.Status,
		"answer": path.Answer,
	})
	fmt.Fprintf(bw, "data: %s\n\n", summary)
	bw.Flush()
	if ok {
		flusher.Flush()
	}

	if path.Status == "failed" {
		if path.Answer != "" {
			utils.Log.Warnf("[AgentSpace] Path %s completed: %s — %s", path.ID, path.Status, path.Answer)
		} else {
			utils.Log.Warnf("[AgentSpace] Path %s completed: %s", path.ID, path.Status)
		}
	} else {
		utils.Log.Infof("[AgentSpace] Path %s completed: %s", path.ID, path.Status)
	}
}

// ─── GET /v1/spaces/agent/tools ───────────────────────────────────────────────

func (s *AgentSpace) handleListTools(c *gin.Context) {
	llmAddr := fmt.Sprintf("http://127.0.0.1:%d", s.cfg.LLMPort)
	registry := crabtools.DefaultRegistry(llmAddr)

	var out []gin.H
	for _, t := range registry.All() {
		out = append(out, gin.H{
			"name":        t.Name(),
			"description": t.Description(),
			"dangerous":   t.Dangerous(),
			"schema":      t.Schema(),
		})
	}
	c.JSON(http.StatusOK, gin.H{"tools": out})
}

// ─── GET /v1/spaces/agent/sessions ────────────────────────────────────────────

func (s *AgentSpace) handleListSessions(c *gin.Context) {
	// Placeholder: in production, use persistent memory on disk
	c.JSON(http.StatusOK, gin.H{"sessions": []interface{}{}})
}
