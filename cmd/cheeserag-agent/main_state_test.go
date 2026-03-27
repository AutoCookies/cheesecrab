package main

import (
	"encoding/json"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/AutoCookies/crabpath/agent"
)

func TestWriteRunStateWritesExpectedFields(t *testing.T) {
	tmp := t.TempDir()
	out := filepath.Join(tmp, "state.json")
	t.Setenv("CHEESERAG_DETERMINISTIC_AUTONOMOUS", "1")
	p := &agent.CrabPath{
		ID:     "run-1",
		Status: agent.PathFailed,
		Steps: []agent.CrabStep{
			{
				Index: 0,
				Thought: agent.CrabThought{
					Reasoning: "auto execution injected by executor",
				},
				ToolCalls: []agent.CrabToolCall{
					{ToolName: "local_exec", Error: "boom"},
				},
			},
		},
	}
	if err := writeRunState(out, p, 2*time.Second, "Check endpoint http://127.0.0.1:9090/health"); err != nil {
		t.Fatalf("writeRunState failed: %v", err)
	}
	var got map[string]any
	raw, err := os.ReadFile(out)
	if err != nil {
		t.Fatalf("read file failed: %v", err)
	}
	if err := json.Unmarshal(raw, &got); err != nil {
		t.Fatalf("invalid json: %v", err)
	}
	if got["status"] != string(agent.PathFailed) {
		t.Fatalf("status=%v, want %s", got["status"], agent.PathFailed)
	}
	if got["state_schema_version"] != float64(1) {
		t.Fatalf("state_schema_version=%v, want 1", got["state_schema_version"])
	}
	if got["last_tool"] != "local_exec" {
		t.Fatalf("last_tool=%v, want local_exec", got["last_tool"])
	}
	if got["last_error"] == "" {
		t.Fatalf("last_error should not be empty")
	}
	if got["observed_intent"] != "http_check" {
		t.Fatalf("observed_intent=%v, want http_check", got["observed_intent"])
	}
	if got["deterministic_autonomous"] != true {
		t.Fatalf("deterministic_autonomous=%v, want true", got["deterministic_autonomous"])
	}
	if got["forced_path_used"] != true {
		t.Fatalf("forced_path_used=%v, want true", got["forced_path_used"])
	}
	if got["first_tool"] != "local_exec" {
		t.Fatalf("first_tool=%v, want local_exec", got["first_tool"])
	}
	if got["last_tool"] != "local_exec" {
		t.Fatalf("last_tool=%v, want local_exec", got["last_tool"])
	}
	if got["failed_tool_calls"] != float64(1) {
		t.Fatalf("failed_tool_calls=%v, want 1", got["failed_tool_calls"])
	}
	if got["successful_tool_calls"] != float64(0) {
		t.Fatalf("successful_tool_calls=%v, want 0", got["successful_tool_calls"])
	}
	if got["stop_reason"] != "tool_errors" {
		t.Fatalf("stop_reason=%v, want tool_errors", got["stop_reason"])
	}
}
