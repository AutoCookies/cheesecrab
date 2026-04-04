package main

import (
	"context"
	"fmt"
	"os"
	"strings"
)

// BatchEditTool applies multiple text replacements across one or more files in
// a single tool call. This is more efficient than calling write_file repeatedly
// when refactoring spans many locations.
type BatchEditTool struct{}

func NewBatchEditTool() *BatchEditTool { return &BatchEditTool{} }

func (t *BatchEditTool) Name() string      { return "batch_edit" }
func (t *BatchEditTool) Dangerous() bool   { return true }
func (t *BatchEditTool) Description() string {
	return "Apply multiple text replacements across one or more files in one call. " +
		"Each edit specifies a file path, the exact text to find (old), and its replacement (new). " +
		"Use dry_run=true to preview changes without writing. " +
		"Returns a summary of applied edits and any errors."
}
func (t *BatchEditTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"edits": map[string]any{
				"type":        "array",
				"description": "List of text replacement operations",
				"items": map[string]any{
					"type": "object",
					"properties": map[string]any{
						"path": map[string]any{
							"type":        "string",
							"description": "Absolute path to the file to edit",
						},
						"old": map[string]any{
							"type":        "string",
							"description": "Exact text to find and replace",
						},
						"new": map[string]any{
							"type":        "string",
							"description": "Replacement text",
						},
					},
					"required": []string{"path", "old", "new"},
				},
			},
			"dry_run": map[string]any{
				"type":        "boolean",
				"description": "If true, report what would change without writing files (default false)",
			},
		},
		"required": []string{"edits"},
	}
}

func (t *BatchEditTool) Execute(_ context.Context, args map[string]any) (string, error) {
	editsRaw, ok := args["edits"]
	if !ok {
		return "", fmt.Errorf("batch_edit: edits is required")
	}
	editsList, ok := editsRaw.([]any)
	if !ok {
		return "", fmt.Errorf("batch_edit: edits must be an array")
	}
	dryRun, _ := args["dry_run"].(bool)

	type editOp struct {
		path, old, new string
	}
	var ops []editOp
	for i, e := range editsList {
		m, ok := e.(map[string]any)
		if !ok {
			return "", fmt.Errorf("batch_edit: edits[%d] must be an object", i)
		}
		path, _ := m["path"].(string)
		old, _ := m["old"].(string)
		newText, _ := m["new"].(string)
		if path == "" || old == "" {
			return "", fmt.Errorf("batch_edit: edits[%d] requires path and old", i)
		}
		ops = append(ops, editOp{path, old, newText})
	}

	var sb strings.Builder
	applied, skipped, failed := 0, 0, 0

	for _, op := range ops {
		data, err := os.ReadFile(op.path)
		if err != nil {
			fmt.Fprintf(&sb, "ERROR  %s: cannot read: %v\n", op.path, err)
			failed++
			continue
		}
		content := string(data)
		if !strings.Contains(content, op.old) {
			fmt.Fprintf(&sb, "SKIP   %s: text not found\n", op.path)
			skipped++
			continue
		}
		updated := strings.ReplaceAll(content, op.old, op.new)
		if dryRun {
			fmt.Fprintf(&sb, "DRY    %s: would replace %d occurrence(s)\n",
				op.path, strings.Count(content, op.old))
			applied++
			continue
		}
		if err := os.WriteFile(op.path, []byte(updated), 0o644); err != nil {
			fmt.Fprintf(&sb, "ERROR  %s: cannot write: %v\n", op.path, err)
			failed++
			continue
		}
		fmt.Fprintf(&sb, "OK     %s: replaced %d occurrence(s)\n",
			op.path, strings.Count(content, op.old))
		applied++
	}

	mode := "applied"
	if dryRun {
		mode = "previewed"
	}
	fmt.Fprintf(&sb, "\nSummary: %d %s, %d skipped, %d failed", applied, mode, skipped, failed)
	return strings.TrimSpace(sb.String()), nil
}
