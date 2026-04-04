package main

import (
	"context"
	"fmt"
	"strings"

	"github.com/AutoCookies/crabpath/agent"
	"github.com/AutoCookies/crabpath/llm"
	"github.com/AutoCookies/crabpath/memory"
	"github.com/AutoCookies/crabpath/tools"
)

// SubAgentTool spawns a fresh sub-agent with a specific goal, optionally using
// a chosen strategy. Returns the sub-agent's final answer.
// This enables multi-agent delegation for complex, decomposable tasks.
type SubAgentTool struct {
	client   *llm.Client
	registry *tools.Registry
	model    string
	maxSteps int
}

func NewSubAgentTool(client *llm.Client, registry *tools.Registry, model string, maxSteps int) *SubAgentTool {
	return &SubAgentTool{client: client, registry: registry, model: model, maxSteps: maxSteps}
}

func (t *SubAgentTool) Name() string      { return "sub_agent" }
func (t *SubAgentTool) Dangerous() bool   { return true }
func (t *SubAgentTool) Description() string {
	return "Spawn a sub-agent to handle a specific sub-goal autonomously and return its answer. " +
		"Use this to delegate focused sub-tasks (e.g. 'read and summarize file X', 'verify the test suite passes'). " +
		"The sub-agent runs independently with its own memory."
}
func (t *SubAgentTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"goal": map[string]any{
				"type":        "string",
				"description": "The specific sub-goal for the agent to accomplish",
			},
			"strategy": map[string]any{
				"type":        "string",
				"description": "Agent strategy: react (default), reflect, planexec, architect",
				"enum":        []string{"react", "reflect", "planexec", "architect"},
			},
		},
		"required": []string{"goal"},
	}
}

func (t *SubAgentTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	goal, _ := args["goal"].(string)
	if goal == "" {
		return "", fmt.Errorf("sub_agent: goal is required")
	}

	strategyName, _ := args["strategy"].(string)
	strategy := pickStrategy(strategyName)

	// Cap sub-agent steps to avoid unbounded recursion.
	subSteps := t.maxSteps / 2
	if subSteps < 3 {
		subSteps = 3
	}
	if subSteps > 10 {
		subSteps = 10
	}

	executor := agent.NewExecutor(t.client, t.registry,
		agent.WithStrategy(strategy),
		agent.WithMemory(memory.NewBufferMemory()),
		agent.WithModel(t.model),
		agent.WithMaxSteps(subSteps),
	)

	events, path := executor.Run(ctx, goal)
	// Drain events to avoid goroutine leaks.
	for range events {
	}

	if path.Answer == "" {
		return fmt.Sprintf("(sub-agent did not produce a final answer after %d steps)", subSteps), nil
	}
	return path.Answer, nil
}

// pickStrategy returns an agent.Strategy by name, defaulting to ReAct.
func pickStrategy(name string) agent.Strategy {
	switch strings.ToLower(strings.TrimSpace(name)) {
	case "reflect":
		return agent.NewReflectionStrategy()
	case "planexec", "plan_and_execute":
		return agent.NewPlanAndExecuteStrategy()
	case "architect":
		return agent.NewArchitectStrategy()
	default:
		return agent.NewReActStrategy()
	}
}
