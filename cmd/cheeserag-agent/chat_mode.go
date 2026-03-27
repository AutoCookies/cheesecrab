package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
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
	history := &chatHistory{maxN: 5}
	sc := bufio.NewScanner(os.Stdin)

	fmt.Println("\n\x1b[1;36m╔═══════════════════════════════╗")
	fmt.Println("║   Cheeserag Interactive Chat  ║")
	fmt.Println("╚═══════════════════════════════╝\x1b[0m")
	fmt.Println("Commands: /help  /exit  /tools  /clear  /history")
	fmt.Println("End a line with \\ to continue to the next line.")
	fmt.Println()

	var multiLine strings.Builder

	for {
		if multiLine.Len() == 0 {
			fmt.Print("\x1b[1;32mcheeserag>\x1b[0m ")
		} else {
			fmt.Print("\x1b[90m       ...>\x1b[0m ")
		}

		if !sc.Scan() {
			break // EOF
		}
		line := sc.Text()

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
		}

		// Build goal with history context
		goal := input
		if ctx := history.buildContext(); ctx != "" {
			goal = ctx + "\nCurrent question: " + input
		}
		if baseGoalPrefix != "" {
			goal = baseGoalPrefix + "\n\n" + goal
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeoutSec)*time.Second)
		answer := runOneTurn(ctx, executor, goal)
		cancel()

		history.add(input, answer)
	}
}

func runOneTurn(ctx context.Context, executor *agent.Executor, goal string) string {
	events, path := executor.Run(ctx, goal)
	var answer string
	for ev := range events {
		if ev.Type == agent.EventFinalAnswer {
			if s, ok := ev.Payload.(string); ok {
				answer = s
			}
			fmt.Printf("\n\x1b[1mAnswer:\x1b[0m %s\n\n", answer)
		}
	}
	if answer == "" && strings.TrimSpace(path.Answer) != "" {
		answer = path.Answer
		fmt.Printf("\n\x1b[1mAnswer:\x1b[0m %s\n\n", answer)
	}
	if answer == "" {
		fmt.Println("\x1b[31m(no answer produced)\x1b[0m")
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
	fmt.Printf("\x1b[90m[steps=%d tool_calls=%d %s status=%s]\x1b[0m\n\n",
		steps, toolCalls, dur.Round(time.Millisecond), path.Status)
	return answer
}

func printChatHelp() {
	fmt.Println("\x1b[1mCheeserag Chat Commands:\x1b[0m")
	fmt.Println("  /help      Show this help")
	fmt.Println("  /exit      Exit chat mode")
	fmt.Println("  /clear     Clear conversation history")
	fmt.Println("  /history   Show conversation history")
	fmt.Println("  /tools     (run the agent and ask it to list its tools)")
	fmt.Println()
	fmt.Println("Multi-line input: end a line with \\ to continue.")
	fmt.Println()
}

// Satisfy the callback.Handler interface for chat mode — uses the same TerminalUIHandler.
var _ callback.Handler = (*TerminalUIHandler)(nil)
