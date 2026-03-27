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
	p := &agent.CrabPath{
		ID:     "run-1",
		Status: agent.PathFailed,
		Steps: []agent.CrabStep{
			{
				Index: 0,
				ToolCalls: []agent.CrabToolCall{
					{ToolName: "local_exec", Error: "boom"},
				},
			},
		},
	}
	if err := writeRunState(out, p, 2*time.Second, "demo goal"); err != nil {
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
	if got["last_tool"] != "local_exec" {
		t.Fatalf("last_tool=%v, want local_exec", got["last_tool"])
	}
	if got["last_error"] == "" {
		t.Fatalf("last_error should not be empty")
	}
}
