package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// EnvTool allows the agent to read environment variables.
type EnvTool struct{}

func (t *EnvTool) Name() string      { return "read_env" }
func (t *EnvTool) Dangerous() bool   { return false }
func (t *EnvTool) Description() string {
	return "Read environment variables. Useful for checking configuration like RAG_FACADE_URL or PATH. " +
		"Args: name (optional, if empty returns all keys)."
}

func (t *EnvTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name": map[string]any{"type": "string", "description": "Specific variable name to read."},
		},
	}
}

func (t *EnvTool) Execute(_ context.Context, args map[string]any) (string, error) {
	name, _ := args["name"].(string)
	if name != "" {
		val := os.Getenv(name)
		if val == "" {
			return fmt.Sprintf("%s is not set", name), nil
		}
		return fmt.Sprintf("%s=%s", name, val), nil
	}
	var sb strings.Builder
	for _, e := range os.Environ() {
		sb.WriteString(e)
		sb.WriteByte('\n')
	}
	return sb.String(), nil
}

// ProcessTool allows the agent to see running processes.
type ProcessTool struct{}

func (t *ProcessTool) Name() string      { return "list_processes" }
func (t *ProcessTool) Dangerous() bool   { return false }
func (t *ProcessTool) Description() string {
	return "List currently running processes. Useful for verifying if servers (like cheese-server) are up. " +
		"Args: filter (optional string to grep for)."
}

func (t *ProcessTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"filter": map[string]any{"type": "string", "description": "Optional substring to filter process list."},
		},
	}
}

func (t *ProcessTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	filter, _ := args["filter"].(string)
	// Use 'ps' which is usually available on linux/mac.
	cmd := exec.CommandContext(ctx, "ps", "aux")
	out, err := cmd.CombinedOutput()
	if err != nil {
		return "", fmt.Errorf("list_processes: %w", err)
	}

	lines := strings.Split(string(out), "\n")
	if filter == "" {
		// Just return first 100 lines if no filter
		if len(lines) > 100 {
			return strings.Join(lines[:100], "\n") + "\n...[truncated]", nil
		}
		return strings.Join(lines, "\n"), nil
	}

	var match []string
	match = append(match, lines[0]) // Header
	lowFilter := strings.ToLower(filter)
	for i := 1; i < len(lines); i++ {
		if strings.Contains(strings.ToLower(lines[i]), lowFilter) {
			match = append(match, lines[i])
		}
		if len(match) > 100 {
			match = append(match, "...[truncated]")
			break
		}
	}
	return strings.Join(match, "\n"), nil
}
