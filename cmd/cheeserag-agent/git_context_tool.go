package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// GitContextTool exposes git status + diff stats to the agent.
// Safe read-only; Dangerous() = false.
type GitContextTool struct{}

func NewGitContextTool() *GitContextTool { return &GitContextTool{} }

func (t *GitContextTool) Name() string      { return "git_context" }
func (t *GitContextTool) Dangerous() bool   { return false }
func (t *GitContextTool) Description() string {
	return "Return git repository context: current branch, short status, and diff stats. " +
		"Optionally show full diff of a specific file. " +
		"Args: path (optional dir override), file (optional file to diff), show_diff (bool, show git diff --stat HEAD)."
}

func (t *GitContextTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"path":      map[string]any{"type": "string", "description": "Working directory (default: cwd)."},
			"file":      map[string]any{"type": "string", "description": "File to show full diff for (optional)."},
			"show_diff": map[string]any{"type": "boolean", "description": "If true, include git diff --stat HEAD."},
		},
	}
}

func (t *GitContextTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	cwd := firstString(args, "path", "dir", "cwd")
	if cwd == "" {
		var err error
		cwd, err = os.Getwd()
		if err != nil {
			cwd = "."
		}
	}
	showDiff, _ := args["show_diff"].(bool)
	specificFile := firstString(args, "file")

	run := func(args ...string) (string, error) {
		cmd := exec.CommandContext(ctx, "git", args...)
		cmd.Dir = cwd
		out, err := cmd.Output()
		if err != nil {
			return "", err
		}
		return strings.TrimSpace(string(out)), nil
	}

	// Find git root
	root, err := run("rev-parse", "--show-toplevel")
	if err != nil {
		return "", fmt.Errorf("git_context: not a git repository in %s", cwd)
	}

	var parts []string
	parts = append(parts, fmt.Sprintf("repo_root: %s", root))

	// Branch
	branch, _ := run("rev-parse", "--abbrev-ref", "HEAD")
	if branch != "" {
		parts = append(parts, fmt.Sprintf("branch: %s", branch))
	}

	// Last commit
	commit, _ := run("log", "-1", "--oneline")
	if commit != "" {
		parts = append(parts, fmt.Sprintf("last_commit: %s", commit))
	}

	// Short status
	status, err := run("status", "--short")
	if err != nil {
		return "", fmt.Errorf("git_context: git status failed: %w", err)
	}
	if status == "" {
		parts = append(parts, "status: (clean - no changes)")
	} else {
		parts = append(parts, "status:\n"+status)
	}

	// Optional diff stat
	if showDiff {
		stat, _ := run("diff", "--stat", "HEAD")
		if stat != "" {
			parts = append(parts, "diff_stat:\n"+stat)
		}
	}

	// Optional file diff
	if specificFile != "" {
		diff, _ := run("diff", "HEAD", "--", specificFile)
		if diff == "" {
			diff, _ = run("diff", "--cached", "--", specificFile)
		}
		if diff != "" {
			if len(diff) > 6000 {
				diff = diff[:6000] + "\n...[diff truncated]"
			}
			parts = append(parts, fmt.Sprintf("file_diff (%s):\n%s", specificFile, diff))
		} else {
			parts = append(parts, fmt.Sprintf("file_diff (%s): (no diff or untracked)", specificFile))
		}
	}

	return strings.Join(parts, "\n\n"), nil
}
