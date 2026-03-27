package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// LocalExecTool runs local shell commands for autonomous app workflows.
// Dangerous by design; keep it opt-in via CLI/env.
type LocalExecTool struct {
	defaultTimeout time.Duration
}

func NewLocalExecTool() *LocalExecTool {
	sec := 180
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_EXEC_TIMEOUT_SEC")); v != "" {
		if n, err := strconv.Atoi(v); err == nil && n > 0 {
			sec = n
		}
	}
	return &LocalExecTool{defaultTimeout: time.Duration(sec) * time.Second}
}

func (t *LocalExecTool) Name() string      { return "local_exec" }
func (t *LocalExecTool) Dangerous() bool   { return true }
func (t *LocalExecTool) Description() string {
	return "Execute local shell commands (dangerous). Supports command, cwd, timeout_sec, stdin."
}

func (t *LocalExecTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"command": map[string]any{
				"type":        "string",
				"description": "Shell command to execute.",
			},
			"cwd": map[string]any{
				"type":        "string",
				"description": "Optional working directory. Defaults to current process directory.",
			},
			"timeout_sec": map[string]any{
				"type":        "number",
				"description": "Optional timeout in seconds.",
			},
			"stdin": map[string]any{
				"type":        "string",
				"description": "Optional text to pass to the command's standard input.",
			},
		},
		"required": []string{"command"},
	}
}

func (t *LocalExecTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	command := firstString(args, "command", "cmd", "run", "shell")
	if command == "" {
		command = inferCommandFromArgs(args)
	}
	if command == "" {
		return "", fmt.Errorf("local_exec: command required")
	}
	if err := ensureAllowedCommand(command); err != nil {
		return "", err
	}

	timeout := t.defaultTimeout
	if v, ok := args["timeout_sec"].(float64); ok && v > 0 {
		timeout = time.Duration(v * float64(time.Second))
	}
	runCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()

	cmd := exec.CommandContext(runCtx, "bash", "-lc", command)
	if err := ensureDeniedPatterns(command); err != nil {
		return "", err
	}
	if cwd := firstString(args, "cwd", "workdir", "dir", "path"); cwd != "" {
		cmd.Dir = cwd
	}
	if err := ensureAllowedCWD(cmd.Dir); err != nil {
		return "", err
	}

	// Optional stdin
	if stdinText, ok := args["stdin"].(string); ok && stdinText != "" {
		cmd.Stdin = strings.NewReader(stdinText)
	}

	out, err := cmd.CombinedOutput()
	text := strings.TrimSpace(string(out))
	if len(text) > 8000 {
		text = text[:8000] + "\n...[truncated]"
	}
	if runCtx.Err() == context.DeadlineExceeded {
		return "", fmt.Errorf("local_exec: timeout after %s", timeout)
	}
	exitCode := 0
	if err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			exitCode = exitErr.ExitCode()
		} else {
			return "", fmt.Errorf("local_exec: command failed: %v\n%s", err, text)
		}
	}
	if text == "" {
		text = "(no output)"
	}
	return fmt.Sprintf("exit_code=%d\n%s", exitCode, text), nil
}

func inferCommandFromArgs(args map[string]any) string {
	known := []string{"go ", "npm ", "pnpm ", "yarn ", "python ", "python3 ", "node ", "make ", "cmake ", "docker ", "git ", "curl "}
	for _, v := range args {
		s := strings.TrimSpace(fmt.Sprintf("%v", v))
		if s == "" || s == "<NIL>" {
			continue
		}
		low := strings.ToLower(s)
		for _, k := range known {
			if strings.HasPrefix(low, k) {
				return s
			}
		}
	}
	if g := strings.ToLower(strings.TrimSpace(os.Getenv("CHEESERAG_USER_GOAL"))); g != "" {
		switch {
		case strings.Contains(g, "go version"):
			return "go version"
		case strings.Contains(g, "npm test"):
			return "npm test"
		case strings.Contains(g, "go test"):
			return "go test ./..."
		case strings.Contains(g, "build"):
			return "go build ./..."
		}
	}
	return ""
}

func ensureAllowedCommand(command string) error {
	allow := strings.TrimSpace(os.Getenv("CHEESERAG_EXEC_ALLOW"))
	if allow == "*" {
		return nil
	}
	first := command
	if fields := strings.Fields(command); len(fields) > 0 {
		first = fields[0]
	}
	// Expanded default allowlist — includes git, curl, and read-only tools.
	allowed := []string{
		"go", "npm", "pnpm", "yarn", "python", "python3", "node",
		"make", "cmake", "docker", "docker-compose", "bash", "sh",
		"git", "curl", "wget", "cat", "grep", "find", "ls",
		"head", "tail", "wc", "echo", "env", "printenv",
	}
	if allow != "" {
		allowed = nil
		for _, s := range strings.Split(allow, ",") {
			s = strings.TrimSpace(s)
			if s != "" {
				allowed = append(allowed, s)
			}
		}
	}
	for _, a := range allowed {
		if first == a {
			return nil
		}
	}
	return fmt.Errorf("local_exec: command %q blocked by allowlist (set CHEESERAG_EXEC_ALLOW or '*' to allow)", first)
}

func ensureDeniedPatterns(command string) error {
	pat := strings.TrimSpace(os.Getenv("CHEESERAG_EXEC_DENY_REGEX"))
	if pat == "" {
		// sensible defaults for catastrophic destructive ops
		pat = `(^|\s)(rm\s+-rf\s+/|mkfs\.|shutdown|reboot|:(){:|:&};:)(\s|$)`
	}
	re, err := regexp.Compile(pat)
	if err != nil {
		return fmt.Errorf("local_exec: invalid CHEESERAG_EXEC_DENY_REGEX: %w", err)
	}
	if re.MatchString(command) {
		return fmt.Errorf("local_exec: command blocked by deny regex policy")
	}
	return nil
}

func ensureAllowedCWD(cwd string) error {
	root := strings.TrimSpace(os.Getenv("CHEESERAG_EXEC_ROOT"))
	if root == "" {
		return nil
	}
	if strings.TrimSpace(cwd) == "" {
		var err error
		cwd, err = os.Getwd()
		if err != nil {
			return err
		}
	}
	rootAbs, err := filepath.Abs(root)
	if err != nil {
		return err
	}
	cwdAbs, err := filepath.Abs(cwd)
	if err != nil {
		return err
	}
	rel, err := filepath.Rel(rootAbs, cwdAbs)
	if err != nil {
		return err
	}
	if rel == ".." || strings.HasPrefix(rel, ".."+string(filepath.Separator)) {
		return fmt.Errorf("local_exec: cwd %q outside CHEESERAG_EXEC_ROOT %q", cwdAbs, rootAbs)
	}
	return nil
}

