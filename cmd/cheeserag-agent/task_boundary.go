package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
)

type TaskBoundaryTool struct{}

func NewTaskBoundaryTool() *TaskBoundaryTool {
	return &TaskBoundaryTool{}
}

func (t *TaskBoundaryTool) Name() string { return "task_boundary" }

func (t *TaskBoundaryTool) Description() string {
	return "Indicate the start of a task or make an update to the current task. Always call this tool to update your checklist progress in .cheeserag_brain."
}

func (t *TaskBoundaryTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"TaskName":    map[string]any{"type": "string", "description": "Name of the task boundary."},
			"Mode":        map[string]any{"type": "string", "description": "PLANNING, EXECUTION, or VERIFICATION"},
			"TaskSummary": map[string]any{"type": "string", "description": "Concise summary of what has been accomplished."},
			"TaskStatus":  map[string]any{"type": "string", "description": "Active status of the current action."},
		},
		"required": []string{"TaskName", "Mode", "TaskSummary", "TaskStatus"},
	}
}

func (t *TaskBoundaryTool) Dangerous() bool { return false }

func (t *TaskBoundaryTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	name, _ := args["TaskName"].(string)
	mode, _ := args["Mode"].(string)
	summary, _ := args["TaskSummary"].(string)
	status, _ := args["TaskStatus"].(string)

	brainDir := ".cheeserag_brain"
	os.MkdirAll(brainDir, 0755)

	logEntry := fmt.Sprintf("## Task: %s\n**Mode**: %s\n**Status**: %s\n**Summary**: %s\n\n", name, mode, status, summary)
	
	f, err := os.OpenFile(filepath.Join(brainDir, "agent_memory.md"), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err == nil {
		f.WriteString(logEntry)
		f.Close()
	}

	return fmt.Sprintf("Task boundary updated. Mode: %s. Proceed with the task.", mode), nil
}
