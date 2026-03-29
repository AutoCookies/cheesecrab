package main

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/AutoCookies/crabpath/agent"
	"github.com/AutoCookies/crabpath/callback"
)

// chatHistory stores previous Q&A pairs for multi-turn context.
type chatHistory struct {
	turns []chatTurn
	maxN  int
}

type chatTurn struct {
	goal   string
	answer string
}

func (h *chatHistory) add(goal, answer string) {
	h.turns = append(h.turns, chatTurn{goal: goal, answer: answer})
	if h.maxN > 0 && len(h.turns) > h.maxN {
		h.turns = h.turns[len(h.turns)-h.maxN:]
	}
}

func (h *chatHistory) buildContext() string {
	if len(h.turns) == 0 {
		return ""
	}
	var sb strings.Builder
	sb.WriteString("Conversation history (most recent first):\n")
	for i := len(h.turns) - 1; i >= 0; i-- {
		t := h.turns[i]
		sb.WriteString(fmt.Sprintf("  Q: %s\n  A: %s\n\n", oneLine(t.goal, 300), oneLine(t.answer, 300)))
	}
	return sb.String()
}

// runChatMode runs the interactive REPL. Called from main when --chat is set.
func runChatMode(executor *agent.Executor, baseGoalPrefix string, timeoutSec int) {
	history := &chatHistory{maxN: 20}
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

func printChatHelp() {
	fmt.Println("\x1b[1mCheeserag Chat Commands:\x1b[0m")
	fmt.Println("  /help      Show this help")
	fmt.Println("  /exit      Exit chat mode")
	fmt.Println("  /clear     Clear conversation history")
	fmt.Println("  /history   Show conversation history")
	fmt.Println("  /ingest    Native file ingestion (e.g. /ingest /path/to/file.pdf)")
	fmt.Println("  /tools     (run the agent and ask it to list its tools)")
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
