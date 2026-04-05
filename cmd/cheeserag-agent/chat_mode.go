package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/AutoCookies/crabpath/agent"
	"github.com/AutoCookies/crabpath/callback"
	"github.com/AutoCookies/crabpath/llm"
	"github.com/AutoCookies/crabpath/panel"
)

// chatHistory stores previous Q&A pairs for multi-turn context.
type chatHistory struct {
	turns []chatTurn
	pins  map[string]string // filepath -> content
	maxN  int
}

type chatTurn struct {
	goal   string
	answer string
}

func (h *chatHistory) add(goal, answer string) {
	h.turns = append(h.turns, chatTurn{goal: goal, answer: answer})
}

func (h *chatHistory) digest(ctx context.Context, client *llm.Client) {
	if len(h.turns) < 12 {
		return
	}
	fmt.Printf("\x1b[90m[cheese] Cheesepress: Compressing conversation context...\x1b[0m\n")

	var sb strings.Builder
	sb.WriteString("Summarize the following conversation into a single compact paragraph, preserving key facts, decisions, and context:\n\n")
	limit := 10
	if len(h.turns) < limit {
		limit = len(h.turns)
	}
	for i := 0; i < limit; i++ {
		t := h.turns[i]
		fmt.Fprintf(&sb, "Q: %s\nA: %s\n\n", oneLine(t.goal, 400), oneLine(t.answer, 400))
	}

	req := llm.Request{
		Messages: []llm.Message{
			{Role: "user", Content: sb.String()},
		},
	}

	summary, err := client.Complete(ctx, req)
	if err != nil {
		return
	}

	// Replace first 5 turns with one digest turn
	newTurns := []chatTurn{{goal: "[Memory Digest]", answer: summary}}
	newTurns = append(newTurns, h.turns[5:]...)
	h.turns = newTurns
}

func (h *chatHistory) buildContext() string {
	var sb strings.Builder
	if len(h.pins) > 0 {
		sb.WriteString("Pinned Context:\n")
		for path, content := range h.pins {
			sb.WriteString(fmt.Sprintf("--- File: %s ---\n%s\n---\n\n", path, content))
		}
	}
	if len(h.turns) == 0 {
		return sb.String()
	}
	sb.WriteString("Conversation history (most recent first):\n")
	for i := len(h.turns) - 1; i >= 0; i-- {
		t := h.turns[i]
		sb.WriteString(fmt.Sprintf("  Q: %s\n  A: %s\n\n", oneLine(t.goal, 300), oneLine(t.answer, 300)))
	}
	return sb.String()
}

// runChatMode runs the interactive REPL. Called from main when --chat is set.
func runChatMode(executor *agent.Executor, baseGoalPrefix string, timeoutSec int) {
	history := &chatHistory{maxN: 20, pins: make(map[string]string)}
	loadPersonalHistory(history)
	sc := bufio.NewScanner(os.Stdin)

	fmt.Println("\x1b[33m┌─ Cheeserag CLI v0.1.0 ───────────────────────────────────────────┐\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m                                                               \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m         \x1b[1mWelcome back!\x1b[0m         \x1b[33mTips for getting started\x1b[0m        \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m                               Run /help for a list of commands \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m             \x1b[93m_______\x1b[0m                                           \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m            \x1b[93m/      /,\x1b[0m          \x1b[33mRecent activity\x1b[0m                 \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m           \x1b[93m/   o  //\x1b[0m           No recent activity              \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m          \x1b[93m/______//\x1b[0m                                            \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m         \x1b[93m(  ^  ^  )\x1b[0m                                            \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m          \x1b[93m\\  -  /\x1b[0m                                             \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m           \x1b[93m'---'\x1b[0m                                               \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m│\x1b[0m                                                               \x1b[33m│\x1b[0m")
	fmt.Println("\x1b[33m└─────────────────────────────────────────────────────────────────┘\x1b[0m")
	fmt.Println()

	var multiLine strings.Builder

	for {
		var line string
		if multiLine.Len() == 0 {
			line = readInputWithSuggestions("\x1b[38;5;214mcheese>\x1b[0m ")
		} else {
			fmt.Print("\x1b[90m       ...>\x1b[0m ")
			if !sc.Scan() {
				break
			}
			line = sc.Text()
		}

		// Multi-line continuation
		if strings.HasSuffix(line, "\\") {
			multiLine.WriteString(strings.TrimSuffix(line, "\\"))
			multiLine.WriteByte('\n')
			continue
		}
		multiLine.WriteString(line)
		input := strings.TrimSpace(multiLine.String())
		multiLine.Reset()

		if input == "" {
			continue
		}

		// Slash commands
		switch strings.ToLower(strings.Fields(input)[0]) {
		case "/exit", "/quit", "/q":
			fmt.Println("\x1b[90mBye!\x1b[0m")
			return
		case "/help":
			printChatHelp()
			continue
		case "/clear":
			history.turns = nil
			fmt.Println("\x1b[90mHistory cleared.\x1b[0m")
			continue
		case "/history":
			if len(history.turns) == 0 {
				fmt.Println("\x1b[90m(no history)\x1b[0m")
			} else {
				for i, t := range history.turns {
					fmt.Printf("\x1b[90m[%d] Q: %s\x1b[0m\n", i+1, oneLine(t.goal, 120))
					fmt.Printf("\x1b[90m    A: %s\x1b[0m\n", oneLine(t.answer, 120))
				}
			}
			continue
		case "/ingest":
			fields := strings.Fields(input)
			if len(fields) < 2 {
				fmt.Println("\x1b[31mUsage: /ingest <absolute_file_path>\x1b[0m")
				continue
			}
			path := strings.TrimSpace(strings.Join(fields[1:], " "))
			fmt.Printf("\x1b[36m[cheese] Native Ingestion into PomaiDB...\x1b[0m\n")
			tool := NewRAGIngestTool(ragFacadeURL())
			res, err := tool.Execute(context.Background(), map[string]any{"query": path})
			if err != nil {
				fmt.Printf("\x1b[31mError: %v\x1b[0m\n", err)
			} else {
				fmt.Printf("\x1b[32m%s\x1b[0m\n", res)
			}
			continue
		case "/diff":
			fmt.Printf("\x1b[36m[cheese] Current Workspace Diffs:\x1b[0m\n")
			cmd := exec.Command("git", "diff", "--stat")
			out, _ := cmd.CombinedOutput()
			fmt.Println(string(out))
			continue
		case "/map":
			fmt.Printf("\x1b[36m[cheese] Codebase Map (AST-indexed files):\x1b[0m\n")
			cmd := exec.Command("git", "ls-files")
			out, _ := cmd.CombinedOutput()
			lines := strings.Split(string(out), "\n")
			for _, l := range lines {
				if strings.HasSuffix(l, ".go") || strings.HasSuffix(l, ".py") || strings.HasSuffix(l, ".cpp") || strings.HasSuffix(l, ".h") {
					fmt.Printf("  📄 %s\n", l)
				}
			}
			continue
		case "/pin":
			fields := strings.Fields(input)
			if len(fields) < 2 {
				fmt.Println("\x1b[31mUsage: /pin <file_path>\x1b[0m")
				continue
			}
			path := fields[1]
			b, err := os.ReadFile(path)
			if err != nil {
				fmt.Printf("\x1b[31mError reading file: %v\x1b[0m\n", err)
			} else {
				history.pins[path] = string(b)
				fmt.Printf("\x1b[32mPinned %s to session context.\x1b[0m\n", path)
			}
			continue
		case "/unpin":
			fields := strings.Fields(input)
			if len(fields) < 2 {
				fmt.Println("\x1b[31mUsage: /unpin <file_path>\x1b[0m")
				continue
			}
			path := fields[1]
			delete(history.pins, path)
			fmt.Printf("\x1b[32mUnpinned %s.\x1b[0m\n", path)
			continue
		case "/strategy":
			fields := strings.Fields(input)
			if len(fields) < 2 {
				fmt.Println("\x1b[31mUsage: /strategy <react|reflect|planexec|architect|fnagent|panel>\x1b[0m")
				continue
			}
			executor.SetStrategy(pickStrategy(fields[1]))
			fmt.Printf("\x1b[32m[cheese] Strategy switched to: %s\x1b[0m\n", strings.ToLower(fields[1]))
			continue
		case "/panel":
			fields := strings.Fields(input)
			panelGoal := strings.TrimSpace(strings.TrimPrefix(input, fields[0]))
			if panelGoal == "" {
				fmt.Println("\x1b[31mUsage: /panel <goal>\x1b[0m")
				continue
			}
			fmt.Printf("\x1b[36m[cheese] Running panel (researcher · critic · planner)...\x1b[0m\n")
			r1, _ := panel.BuiltinRole("researcher")
			r2, _ := panel.BuiltinRole("critic")
			r3, _ := panel.BuiltinRole("planner")
			p := panel.NewPanel(executor.Client(), executor.Registry(), []panel.Role{r1, r2, r3},
				panel.WithSynthMode(panel.SynthConcat),
				panel.WithPanelMaxSteps(6),
				panel.WithPanelModel(executor.Model()),
				panel.WithPanelDisplay(os.Stderr),
			)
			// Give the panel 3× the normal per-turn timeout so all roles can complete.
			panelTimeout := timeoutSec * 3
			if panelTimeout < 300 {
				panelTimeout = 300
			}
			panelCtx, panelCancel := context.WithTimeout(context.Background(), time.Duration(panelTimeout)*time.Second)
			result, err := p.Run(panelCtx, panelGoal)
			panelCancel()
			if err != nil {
				fmt.Printf("\x1b[31m[panel error] %v\x1b[0m\n", err)
			} else {
				fmt.Printf("\n%s\n", result.Format())
				history.add(panelGoal, result.Synthesis)
				savePersonalHistory(history)
			}
			continue
		case "/memory":
			fields := strings.Fields(input)
			if len(fields) < 2 {
				fmt.Println("\x1b[31mUsage: /memory <buffer|file|vector>\x1b[0m")
				continue
			}
			mem := buildMemory(fields[1], executor.Client(), executor.Model())
			executor.SetMemory(mem)
			fmt.Printf("\x1b[32m[cheese] Memory switched to: %s\x1b[0m\n", strings.ToLower(fields[1]))
			continue
		case "/tools":
			all := executor.Registry().All()
			fmt.Printf("\x1b[1mRegistered tools (%d):\x1b[0m\n", len(all))
			for i, t := range all {
				danger := ""
				if t.Dangerous() {
					danger = " \x1b[31m⚠\x1b[0m"
				}
				desc := t.Description()
				if len(desc) > 70 {
					desc = desc[:67] + "..."
				}
				fmt.Printf("  [%02d] %-22s%s  %s\n", i+1, t.Name(), danger, desc)
			}
			continue
		case "/model":
			fields := strings.Fields(input)
			if len(fields) < 2 {
				fmt.Printf("\x1b[90m[cheese] Current model: %s\x1b[0m\n", executor.Model())
				continue
			}
			executor.SetModel(fields[1])
			fmt.Printf("\x1b[32m[cheese] Model switched to: %s\x1b[0m\n", fields[1])
			continue
		case "/save":
			fields := strings.Fields(input)
			savePath := fmt.Sprintf("cheeserag-chat-%d.md", time.Now().Unix())
			if len(fields) >= 2 {
				savePath = fields[1]
			}
			if err := saveChatToFile(savePath, history); err != nil {
				fmt.Printf("\x1b[31mError saving: %v\x1b[0m\n", err)
			} else {
				fmt.Printf("\x1b[32m[cheese] Saved to: %s\x1b[0m\n", savePath)
			}
			continue
		case "/graph":
			fmt.Printf("\x1b[36m[cheese] Generating Semantic Architecture Graph...\x1b[0m\n")
			req, _ := http.NewRequest("GET", ragFacadeURL()+"/v1/map_symbols", nil)
			req.Header.Set("X-API-Key", os.Getenv("CHEESE_API_KEY"))
			resp, err := http.DefaultClient.Do(req)
			if err != nil {
				fmt.Printf("\x1b[31mid map error: %v\x1b[0m\n", err)
				continue
			}
			defer resp.Body.Close()
			var symbolMap map[string][]string
			json.NewDecoder(resp.Body).Decode(&symbolMap)

			fmt.Println("\n\x1b[1mMermaid Architecture Chart:\x1b[0m")
			fmt.Println("```mermaid")
			fmt.Println("classDiagram")
			for file, symbols := range symbolMap {
				base := strings.Split(file, "/")
				filename := base[len(base)-1]
				filename = strings.ReplaceAll(filename, ".", "_")
				fmt.Printf("    class %s {\n", filename)
				for _, s := range symbols {
					fmt.Printf("        +%s()\n", s)
				}
				fmt.Println("    }")
			}
			fmt.Println("```\n")
			continue
		}

		// Build goal with history context
		goal := input
		if ctx := history.buildContext(); ctx != "" {
			goal = ctx + "\nCurrent question: " + input
		}
		if baseGoalPrefix != "" {
			goal = baseGoalPrefix + "\n\n" + goal
		}

		if timeoutSec <= 0 {
			timeoutSec = 300 // 5 minutes default
		}
		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeoutSec)*time.Second)
		answer := runOneTurn(ctx, executor, goal)
		cancel()

		history.add(input, answer)
		history.digest(context.Background(), executor.Client())
		savePersonalHistory(history)
	}
}

const historyFile = ".cheeserag_history.json"

func loadPersonalHistory(h *chatHistory) {
	b, err := os.ReadFile(historyFile)
	if err != nil {
		return
	}
	var turns []chatTurn
	if err := json.Unmarshal(b, &turns); err == nil {
		h.turns = turns
	}
}

func savePersonalHistory(h *chatHistory) {
	b, err := json.MarshalIndent(h.turns, "", "  ")
	if err != nil {
		return
	}
	_ = os.WriteFile(historyFile, b, 0o600)
}

func runOneTurn(ctx context.Context, executor *agent.Executor, goal string) string {
	events, path := executor.Run(ctx, goal)
	var answer string
	for ev := range events {
		if ev.Type == agent.EventFinalAnswer {
			if s, ok := ev.Payload.(string); ok {
				answer = s
			}
		}
	}
	if answer == "" && strings.TrimSpace(path.Answer) != "" {
		answer = path.Answer
	}
	if answer == "" {
		if path.Status == "aborted" {
			fmt.Printf("\x1b[31m(aborted - likely timeout or model error)\x1b[0m\n")
		} else {
			fmt.Println("\x1b[31m(no answer produced)\x1b[0m")
		}
	}
	// Print summary line
	steps := len(path.Steps)
	toolCalls := 0
	for _, st := range path.Steps {
		toolCalls += len(st.ToolCalls)
	}
	dur := time.Since(path.StartedAt)
	if path.EndedAt != nil {
		dur = path.EndedAt.Sub(path.StartedAt)
	}
	fmt.Printf("\x1b[90m(%d steps, %s)\x1b[0m\n\n",
		steps, dur.Round(time.Millisecond))
	return answer
}

func saveChatToFile(path string, history *chatHistory) error {
	f, err := os.Create(path)
	if err != nil {
		return err
	}
	defer f.Close()
	fmt.Fprintf(f, "# Cheeserag Chat — %s\n\n", time.Now().Format("2006-01-02 15:04:05"))
	for i, t := range history.turns {
		fmt.Fprintf(f, "## Turn %d\n\n**User:** %s\n\n**Assistant:** %s\n\n---\n\n", i+1, t.goal, t.answer)
	}
	return nil
}

func printChatHelp() {
	fmt.Println("\x1b[1mCheeserag Chat Commands:\x1b[0m")
	fmt.Println("  /help                Show this help")
	fmt.Println("  /exit                Exit chat mode")
	fmt.Println("  /clear               Clear conversation history")
	fmt.Println("  /history             Show conversation history")
	fmt.Println("  /ingest <file>       Native file ingestion")
	fmt.Println("  /diff                Show current git uncommitted changes")
	fmt.Println("  /map                 List AST-indexed files in workspace")
	fmt.Println("  /graph               Generate semantic architecture Mermaid graph")
	fmt.Println("  /pin <file>          Pin a file to session context")
	fmt.Println("  /unpin <file>        Remove a file from session context")
	fmt.Println("  /strategy <name>     Switch agent strategy at runtime")
	fmt.Println("                         react (default), reflect, planexec, architect, fnagent")
	fmt.Println("  /memory <type>       Switch memory type at runtime")
	fmt.Println("                         buffer (default), file, vector")
	fmt.Println("  /tools               List all registered tools (⚠ = dangerous)")
	fmt.Println("  /model [name]        Show or switch the LLM model at runtime")
	fmt.Println("  /save [path]         Save conversation to a markdown file")
	fmt.Println("  /panel <goal>        Run goal through researcher·critic·planner panel")
	fmt.Println()
	fmt.Println("Multi-line input: end a line with \\ to continue.")
	fmt.Println()
}

func readInputWithSuggestions(prompt string) string {
	fmt.Print(prompt)
	// Put terminal in cbreak mode and disable echo.
	exec.Command("stty", "-F", "/dev/tty", "cbreak", "-echo", "min", "1").Run()
	defer exec.Command("stty", "-F", "/dev/tty", "sane").Run()

	var input []byte
	var suggestionsShown bool

	for {
		var buf [1]byte
		n, err := os.Stdin.Read(buf[:])
		if n == 0 || err != nil {
			break
		}
		b := buf[0]

		if b == 27 { // Escape
			skipEscapeSequence()
			continue
		}

		if b == 13 || b == 10 { // Enter
			if suggestionsShown {
				fmt.Print("\x1b[K")
			}
			fmt.Println()
			break
		}
		if b == 127 || b == 8 { // Backspace
			if len(input) > 0 {
				input = input[:len(input)-1]
				fmt.Print("\b\x1b[K")
				if len(input) == 0 {
					suggestionsShown = false
				}
			}
			continue
		}

		if len(input) == 0 && b == '/' && !suggestionsShown {
			fmt.Print("/")
			fmt.Print("\x1b[90m (ingest, help, exit, history, clear, tools)\x1b[0m\x1b[G")
			fmt.Print(prompt + "/")
			input = append(input, '/')
			suggestionsShown = true
			continue
		}

		if suggestionsShown && len(input) >= 1 {
			// typing after /
			if len(input) == 1 {
				fmt.Print("\x1b[K")
			}
		}

		fmt.Print(string(b))
		input = append(input, b)
	}

	return strings.TrimSpace(string(input))
}

func skipEscapeSequence() {
	// Read until we hit a letter or ~
	for {
		var b [1]byte
		n, _ := os.Stdin.Read(b[:])
		if n == 0 {
			break
		}
		if (b[0] >= 'A' && b[0] <= 'Z') || (b[0] >= 'a' && b[0] <= 'z') || b[0] == '~' {
			break
		}
	}
}

// Satisfy the callback.Handler interface for chat mode — uses the same TerminalUIHandler.
var _ callback.Handler = (*TerminalUIHandler)(nil)
