package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"strings"
)

// ConfirmingTool wraps a dangerous tool and prompts the user before executing.
// In non-TTY mode or when autoApprove=true it proceeds without prompting.
type ConfirmingTool struct {
	inner       Tool
	autoApprove bool
}

// Tool is the minimal interface expected by the registry.
type Tool interface {
	Name() string
	Dangerous() bool
	Description() string
	Schema() map[string]any
	Execute(ctx context.Context, args map[string]any) (string, error)
}

func WrapWithConfirm(t Tool, autoApprove bool) Tool {
	if !t.Dangerous() {
		return t
	}
	return &ConfirmingTool{inner: t, autoApprove: autoApprove}
}

func (c *ConfirmingTool) Name() string                        { return c.inner.Name() }
func (c *ConfirmingTool) Dangerous() bool                     { return true }
func (c *ConfirmingTool) Description() string                 { return c.inner.Description() }
func (c *ConfirmingTool) Schema() map[string]any              { return c.inner.Schema() }

// dangerRanker is the optional interface for severity-tiered dangerous tools.
type dangerRanker interface {
	DangerLevel() int
}

func dangerLabel(t Tool) string {
	if dr, ok := t.(dangerRanker); ok {
		switch dr.DangerLevel() {
		case 1:
			return "LOW"
		case 3:
			return "HIGH"
		}
	}
	return "MEDIUM"
}

func (c *ConfirmingTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	if c.autoApprove || !isTTY() {
		return c.inner.Execute(ctx, args)
	}

	// Build a short preview of args for the prompt.
	preview := summarizeArgs(args)
	label := dangerLabel(c.inner)
	fmt.Fprintf(os.Stderr, "\n\x1b[33m⚠  [%s DANGER]\x1b[0m %s %s\n", label, c.inner.Name(), preview)
	fmt.Fprintf(os.Stderr, "Allow? [y/N] ")

	sc := bufio.NewScanner(os.Stdin)
	if sc.Scan() {
		answer := strings.TrimSpace(strings.ToLower(sc.Text()))
		if answer == "y" || answer == "yes" {
			return c.inner.Execute(ctx, args)
		}
	}
	return "", fmt.Errorf("tool %q denied by user", c.inner.Name())
}

func isTTY() bool {
	fi, err := os.Stdout.Stat()
	if err != nil {
		return false
	}
	return (fi.Mode() & os.ModeCharDevice) != 0
}
