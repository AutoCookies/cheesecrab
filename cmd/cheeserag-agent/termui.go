package main

import (
	"fmt"
	"io"
	"os"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/AutoCookies/crabpath/callback"
)

// TerminalUIHandler prints compact, human-friendly progress in terminal.
type TerminalUIHandler struct {
	out       io.Writer
	startedAt time.Time
	mu        sync.Mutex
}

func NewTerminalUIHandler(out io.Writer) *TerminalUIHandler {
	return &TerminalUIHandler{out: out}
}

func (h *TerminalUIHandler) OnStart(goal string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.startedAt = time.Now()
	showGoal := goal
	if raw := strings.TrimSpace(os.Getenv("CHEESERAG_USER_GOAL")); raw != "" {
		showGoal = raw
	}
	fmt.Fprintf(h.out, "\n=== Cheeserag Agent ===\n")
	fmt.Fprintf(h.out, "Goal: %s\n", oneLine(showGoal, 240))
	fmt.Fprintf(h.out, "Status: running\n")
}

func (h *TerminalUIHandler) OnThought(step int, t callback.ThoughtEvent) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if t.IsFinal {
		fmt.Fprintf(h.out, "\n[step %d] model finalized answer\n", step)
		return
	}
	if strings.TrimSpace(t.Plan) != "" {
		fmt.Fprintf(h.out, "\n[step %d] plan: %s\n", step, oneLine(t.Plan, 140))
	} else {
		fmt.Fprintf(h.out, "\n[step %d] plan: (empty)\n", step)
	}
}

func (h *TerminalUIHandler) OnToolCall(step int, c callback.ToolCallEvent) {
	h.mu.Lock()
	defer h.mu.Unlock()
	fmt.Fprintf(h.out, "[step %d] tool: %s", step, c.ToolName)
	if c.Dangerous {
		fmt.Fprintf(h.out, " (dangerous)")
	}
	argPreview := summarizeArgs(c.Args)
	if argPreview != "" {
		fmt.Fprintf(h.out, " args=%s", argPreview)
	}
	fmt.Fprintln(h.out)
}

func (h *TerminalUIHandler) OnObservation(step int, obs string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	if strings.TrimSpace(obs) == "" {
		fmt.Fprintf(h.out, "[step %d] obs: (empty)\n", step)
		return
	}
	low := strings.ToLower(obs)
	switch {
	case strings.Contains(low, "no matching chunks"):
		fmt.Fprintf(h.out, "[step %d] obs: no chunks found in RAG store\n", step)
	case strings.Contains(low, "error"):
		fmt.Fprintf(h.out, "[step %d] obs: tool returned error\n", step)
	default:
		fmt.Fprintf(h.out, "[step %d] obs: got context\n", step)
	}
}

func (h *TerminalUIHandler) OnToken(_ int, _ string) {}

func (h *TerminalUIHandler) OnFinalAnswer(answer string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	fmt.Fprintf(h.out, "\nFinal answer ready.\n")
	_ = answer
}

func (h *TerminalUIHandler) OnError(err error) {
	h.mu.Lock()
	defer h.mu.Unlock()
	fmt.Fprintf(h.out, "\nAgent error: %v\n", err)
}

func oneLine(s string, max int) string {
	s = strings.TrimSpace(strings.ReplaceAll(s, "\n", " "))
	if max > 0 && len(s) > max {
		return s[:max] + "..."
	}
	return s
}

func summarizeArgs(args map[string]any) string {
	if len(args) == 0 {
		return ""
	}
	keys := make([]string, 0, len(args))
	for k := range args {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	parts := make([]string, 0, len(keys))
	for _, k := range keys {
		v := fmt.Sprintf("%v", args[k])
		parts = append(parts, fmt.Sprintf("%s=%q", k, oneLine(v, 60)))
	}
	return "{" + strings.Join(parts, ", ") + "}"
}
