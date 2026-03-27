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

// spinnerFrames for "thinking" animation.
var spinnerFrames = []string{"⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"}

// TerminalUIHandler prints compact, human-friendly progress in terminal.
type TerminalUIHandler struct {
	out        io.Writer
	startedAt  time.Time
	mu         sync.Mutex
	tty        bool
	spinStop   chan struct{}
	tokenBuf   strings.Builder
	lastStep   int
}

func NewTerminalUIHandler(out io.Writer) *TerminalUIHandler {
	fi, err := os.Stdout.Stat()
	tty := err == nil && (fi.Mode()&os.ModeCharDevice) != 0
	return &TerminalUIHandler{out: out, tty: tty}
}

// colour helpers — only emit escape codes when connected to a TTY.
func (h *TerminalUIHandler) bold(s string) string {
	if !h.tty {
		return s
	}
	return "\x1b[1m" + s + "\x1b[0m"
}

func (h *TerminalUIHandler) green(s string) string {
	if !h.tty {
		return s
	}
	return "\x1b[32m" + s + "\x1b[0m"
}

func (h *TerminalUIHandler) yellow(s string) string {
	if !h.tty {
		return s
	}
	return "\x1b[33m" + s + "\x1b[0m"
}

func (h *TerminalUIHandler) red(s string) string {
	if !h.tty {
		return s
	}
	return "\x1b[31m" + s + "\x1b[0m"
}

func (h *TerminalUIHandler) dim(s string) string {
	if !h.tty {
		return s
	}
	return "\x1b[90m" + s + "\x1b[0m"
}

func (h *TerminalUIHandler) cyan(s string) string {
	if !h.tty {
		return s
	}
	return "\x1b[36m" + s + "\x1b[0m"
}

func (h *TerminalUIHandler) OnStart(goal string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.startedAt = time.Now()
	showGoal := goal
	if raw := strings.TrimSpace(os.Getenv("CHEESERAG_USER_GOAL")); raw != "" {
		showGoal = raw
	}
	fmt.Fprintf(h.out, "\n%s\n", h.bold("╔══ Cheeserag Agent ══╗"))
	fmt.Fprintf(h.out, h.bold("Goal: ")+"%s\n", oneLine(showGoal, 240))
	fmt.Fprintf(h.out, h.dim("Status: running")+"\n")
}

func (h *TerminalUIHandler) OnThought(step int, t callback.ThoughtEvent) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.stopSpinnerLocked()
	h.lastStep = step
	if t.IsFinal {
		fmt.Fprintf(h.out, "\n%s\n", h.dim(fmt.Sprintf("[step %d] finalizing answer…", step)))
		return
	}
	plan := strings.TrimSpace(t.Plan)
	if plan == "" {
		plan = "(thinking)"
	}
	fmt.Fprintf(h.out, "\n%s %s\n", h.cyan(fmt.Sprintf("[step %d]", step)), h.dim(oneLine(plan, 140)))
	// Start spinner while waiting for tool calls / next thought.
	if h.tty {
		h.spinStop = make(chan struct{})
		stop := h.spinStop
		go func() {
			i := 0
			for {
				select {
				case <-stop:
					fmt.Fprintf(h.out, "\r\x1b[K")
					return
				case <-time.After(80 * time.Millisecond):
					fmt.Fprintf(h.out, "\r%s ", spinnerFrames[i%len(spinnerFrames)])
					i++
				}
			}
		}()
	}
}

func (h *TerminalUIHandler) stopSpinnerLocked() {
	if h.spinStop != nil {
		close(h.spinStop)
		h.spinStop = nil
		// Small pause to let goroutine clear the line.
		time.Sleep(10 * time.Millisecond)
	}
}

func (h *TerminalUIHandler) OnToolCall(step int, c callback.ToolCallEvent) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.stopSpinnerLocked()

	label := c.ToolName
	argPreview := summarizeArgs(c.Args)

	var icon, coloredLabel string
	if c.Dangerous {
		icon = "⚠ "
		coloredLabel = h.yellow(label)
	} else {
		icon = "→ "
		coloredLabel = h.green(label)
	}

	if argPreview != "" {
		fmt.Fprintf(h.out, "%s%s %s\n", icon, coloredLabel, h.dim(argPreview))
	} else {
		fmt.Fprintf(h.out, "%s%s\n", icon, coloredLabel)
	}
}

func (h *TerminalUIHandler) OnObservation(step int, obs string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.stopSpinnerLocked()

	if strings.TrimSpace(obs) == "" {
		fmt.Fprintf(h.out, "%s\n", h.dim(fmt.Sprintf("[step %d] obs: (empty)", step)))
		return
	}
	low := strings.ToLower(obs)

	// Show first 3 non-empty lines as preview.
	preview := obsPreview(obs, 3)

	switch {
	case strings.Contains(low, "no matching chunks"):
		fmt.Fprintf(h.out, "%s\n", h.dim(fmt.Sprintf("[step %d] obs: no chunks found in RAG store", step)))
	case strings.Contains(low, "error"):
		fmt.Fprintf(h.out, "%s\n", h.red(fmt.Sprintf("[step %d] obs: tool error — %s", step, preview)))
	default:
		fmt.Fprintf(h.out, "%s\n", h.dim(fmt.Sprintf("[step %d] obs: %s", step, preview)))
	}
}

// obsPreview returns the first n non-empty trimmed lines joined by " / ".
func obsPreview(obs string, n int) string {
	var parts []string
	for _, l := range strings.Split(obs, "\n") {
		l = strings.TrimSpace(l)
		if l == "" {
			continue
		}
		if len(l) > 120 {
			l = l[:120] + "…"
		}
		parts = append(parts, l)
		if len(parts) >= n {
			break
		}
	}
	return strings.Join(parts, " / ")
}

// OnToken streams LLM tokens live when a TTY is connected.
func (h *TerminalUIHandler) OnToken(_ int, token string) {
	if !h.tty {
		return
	}
	h.mu.Lock()
	defer h.mu.Unlock()
	h.stopSpinnerLocked()
	h.tokenBuf.WriteString(token)
	// Write immediately for streaming effect.
	fmt.Fprint(h.out, token)
}

func (h *TerminalUIHandler) OnFinalAnswer(answer string) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.stopSpinnerLocked()

	// If tokens were streamed, clear the buffer and just print separator.
	if h.tokenBuf.Len() > 0 {
		h.tokenBuf.Reset()
		fmt.Fprintf(h.out, "\n")
	}

	// Render markdown-ish when TTY.
	if h.tty {
		fmt.Fprintf(h.out, "\n%s\n", h.bold("─── Answer ───"))
		fmt.Fprintln(h.out, renderMarkdownish(answer))
	} else {
		fmt.Fprintf(h.out, "\nFinal answer ready.\n")
	}
}

func (h *TerminalUIHandler) OnError(err error) {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.stopSpinnerLocked()
	fmt.Fprintf(h.out, "\n%s %v\n", h.red("Agent error:"), err)
}

// renderMarkdownish converts minimal markdown-ish formatting to ANSI.
func renderMarkdownish(s string) string {
	var sb strings.Builder
	for _, line := range strings.Split(s, "\n") {
		// Bold headers: **text** or ## text
		if strings.HasPrefix(line, "## ") {
			sb.WriteString("\x1b[1m" + line[3:] + "\x1b[0m\n")
			continue
		}
		if strings.HasPrefix(line, "### ") {
			sb.WriteString("\x1b[1m" + line[4:] + "\x1b[0m\n")
			continue
		}
		// Code fences: just dim them
		if strings.HasPrefix(line, "```") {
			sb.WriteString("\x1b[90m" + line + "\x1b[0m\n")
			continue
		}
		sb.WriteString(line)
		sb.WriteByte('\n')
	}
	return strings.TrimRight(sb.String(), "\n")
}

func oneLine(s string, max int) string {
	s = strings.TrimSpace(strings.ReplaceAll(s, "\n", " "))
	if max > 0 && len(s) > max {
		return s[:max] + "…"
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
