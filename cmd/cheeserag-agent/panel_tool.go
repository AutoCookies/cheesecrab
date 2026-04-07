package main

import (
	"context"
	"fmt"
	"strings"

	"github.com/AutoCookies/crabpath/llm"
	"github.com/AutoCookies/crabpath/panel"
	"github.com/AutoCookies/crabpath/tools"
)

// PanelTool exposes the multi-role agent panel as a CrabTool so that the main
// agent can delegate a complex goal to a panel of specialists.
type PanelTool struct {
	client       *llm.Client
	registry     *tools.Registry
	model        string
	baseMaxSteps int
}

func NewPanelTool(client *llm.Client, registry *tools.Registry, model string, baseMaxSteps int) *PanelTool {
	return &PanelTool{
		client:       client,
		registry:     registry,
		model:        model,
		baseMaxSteps: baseMaxSteps,
	}
}

func (t *PanelTool) Name() string    { return "panel_run" }
func (t *PanelTool) Dangerous() bool { return true }
func (t *PanelTool) Description() string {
	return "Run a multi-role agent panel: multiple specialist agents (Researcher, Critic, Planner, etc.) " +
		"independently analyze the same goal in parallel, then their answers are synthesized. " +
		"Use this for complex tasks requiring diverse perspectives."
}
func (t *PanelTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"goal": map[string]any{
				"type":        "string",
				"description": "The question or task for the panel to analyze",
			},
			"roles": map[string]any{
				"type":        "array",
				"description": "Role specs. Each item is either a name string (\"researcher\") or \"name:model\" (\"researcher:llama3:8b\"). Builtin names: researcher, critic, planner, architect, implementer, synthesizer.",
				"items":       map[string]any{"type": "string"},
			},
			"synth": map[string]any{
				"type":        "string",
				"description": "How to synthesize answers: concat (default), llm, first, vote",
				"enum":        []string{"concat", "llm", "first", "vote"},
			},
			"max_steps": map[string]any{
				"type":        "integer",
				"description": "Per-role step budget (default: 6)",
			},
		},
		"required": []string{"goal"},
	}
}

func (t *PanelTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	goal, _ := args["goal"].(string)
	if goal == "" {
		return "", fmt.Errorf("panel_run: goal is required")
	}

	// Parse roles.
	roleNames := "researcher,critic,planner"
	if rv, ok := args["roles"].([]any); ok && len(rv) > 0 {
		var names []string
		for _, r := range rv {
			if s, ok := r.(string); ok {
				names = append(names, s)
			}
		}
		if len(names) > 0 {
			roleNames = strings.Join(names, ",")
		}
	}
	roles := panel.NewClientsForRoles(panel.ParseRoles(roleNames))

	// Synthesis mode.
	synthMode := panel.SynthConcat
	if sm, _ := args["synth"].(string); sm != "" {
		switch strings.ToLower(sm) {
		case "llm":
			synthMode = panel.SynthLLM
		case "first":
			synthMode = panel.SynthFirst
		case "vote":
			synthMode = panel.SynthVote
		}
	}

	// Per-role step budget.
	maxSteps := 6
	if ms, ok := args["max_steps"].(float64); ok && ms > 0 {
		maxSteps = int(ms)
	}
	if maxSteps > t.baseMaxSteps/2 {
		maxSteps = t.baseMaxSteps / 2
		if maxSteps < 3 {
			maxSteps = 3
		}
	}

	p := panel.NewPanel(t.client, t.registry, roles,
		panel.WithSynthMode(synthMode),
		panel.WithPanelMaxSteps(maxSteps),
		panel.WithPanelModel(t.model),
	)

	result, err := p.Run(ctx, goal)
	if err != nil {
		return "", fmt.Errorf("panel_run: %w", err)
	}

	return result.Format(), nil
}
