package main

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/AutoCookies/crabpath/agent"
	"github.com/AutoCookies/crabpath/callback"
	"github.com/AutoCookies/crabpath/llm"
	"github.com/AutoCookies/crabpath/tools"
)

func cheesebrainURL() string {
	if v := strings.TrimSpace(os.Getenv("CHEESEBRAIN_URL")); v != "" {
		return strings.TrimRight(v, "/")
	}
	return "http://127.0.0.1:8080"
}

func main() {
	llmURL := cheesebrainURL()
	registryURL := strings.TrimSpace(os.Getenv("CHEESECRAB_REGISTRY_URL"))
	if registryURL == "" {
		registryURL = llmURL
	}
	minimalTools := os.Getenv("CHEESERAG_MINIMAL_TOOLS") != "0"

	var reg *tools.Registry
	if minimalTools {
		reg = tools.NewRegistry()
		reg.Register(NewRAGRetrieveTool(ragFacadeURL()))
		reg.Register(NewRAGFetchWikipediaTool(ragFacadeURL()))
	} else {
		reg = tools.DefaultRegistry(registryURL)
		reg.Register(NewRAGRetrieveTool(ragFacadeURL()))
		reg.Register(NewRAGFetchWikipediaTool(ragFacadeURL()))
	}

	maxSteps := 20
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_MAX_STEPS")); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			maxSteps = n
		}
	} else if minimalTools {
		maxSteps = 8
	}
	timeoutSec := 120
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_TIMEOUT_SEC")); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			timeoutSec = n
		}
	}

	client := llm.NewClient(llmURL)
	executor := agent.NewExecutor(client, reg,
		agent.WithStrategy(agent.NewReActStrategy()),
		agent.WithCallbacks(callback.NewLogHandler(os.Stdout)),
		agent.WithMaxSteps(maxSteps),
	)

	userGoal := strings.Join(os.Args[1:], " ")
	// Small models often pass the literal word "query" as the JSON value; rag_retrieve substitutes from this.
	_ = os.Setenv("CHEESERAG_USER_GOAL", userGoal)

	goal := userGoal
	if p := strings.TrimSpace(os.Getenv("CHEESERAG_GOAL_PREFIX")); p != "" {
		goal = p + "\n\n" + goal
	} else if minimalTools {
		goal = "RAG rules (tools: rag_retrieve, rag_fetch_wikipedia):\n" +
			"- Put the user's exact question in JSON field \"query\" (not the literal word query).\n" +
			"- You MUST call rag_retrieve first.\n" +
			"- If rag_retrieve returns no matching chunks, call rag_fetch_wikipedia with the same query to fetch real public data.\n" +
			"- After rag_fetch_wikipedia succeeds, call rag_retrieve again for the same query.\n" +
			"- Then return JSON with is_final=true and final_answer grounded on retrieved passages.\n" +
			"- Use fallback from general knowledge only if both retrieval and web fetch fail.\n\n" + goal
	}
	if strings.TrimSpace(goal) == "" {
		fmt.Fprintln(os.Stderr, "usage: cheeserag-agent <goal text>")
		os.Exit(2)
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(timeoutSec)*time.Second)
	defer cancel()
	events, path := executor.Run(ctx, goal)
	for ev := range events {
		if ev.Type == agent.EventFinalAnswer {
			fmt.Println("Answer:", ev.Payload)
		}
	}
	fmt.Printf("Status: %s\n", path.Status)
	if path.Status != agent.PathCompleted {
		for _, st := range path.Steps {
			for _, tc := range st.ToolCalls {
				if strings.TrimSpace(tc.Error) != "" {
					fmt.Fprintf(os.Stderr, "step=%d tool=%s error=%s\n", st.Index, tc.ToolName, tc.Error)
				}
			}
		}
		if strings.TrimSpace(path.Answer) != "" {
			fmt.Println("Answer:", path.Answer)
		} else {
			fmt.Fprintln(os.Stderr, "Không có câu trả lời cuối: model không gửi is_final/final_answer hoặc đã hết bước.")
		}
	}
}
