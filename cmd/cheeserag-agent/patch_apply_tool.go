package main

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// PatchApplyTool applies a unified diff patch to a single target file.
// On any failure the original file is fully restored (atomic rollback).
// DangerLevel 2: modifies files, but rolls back on error.
type PatchApplyTool struct{}

func (t *PatchApplyTool) Name() string     { return "patch_apply" }
func (t *PatchApplyTool) Dangerous() bool  { return true }
func (t *PatchApplyTool) DangerLevel() int { return 2 }
func (t *PatchApplyTool) Description() string {
	return "Apply a unified diff patch (as produced by `diff -u`) to a file. " +
		"Rolls back automatically if any hunk fails to apply. " +
		"Use this instead of write_file when you have a diff — it is safer and more reviewable."
}

func (t *PatchApplyTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"file": map[string]any{
				"type":        "string",
				"description": "Path of the file to patch (required).",
			},
			"patch": map[string]any{
				"type":        "string",
				"description": "Unified diff content (required). Must include @@ hunk headers.",
			},
		},
		"required": []string{"file", "patch"},
	}
}

func (t *PatchApplyTool) Execute(_ context.Context, args map[string]any) (string, error) {
	filePath, _ := args["file"].(string)
	patchStr, _ := args["patch"].(string)
	if strings.TrimSpace(filePath) == "" {
		return "", fmt.Errorf("patch_apply: file is required")
	}
	if strings.TrimSpace(patchStr) == "" {
		return "", fmt.Errorf("patch_apply: patch is required")
	}

	// Snapshot original content for rollback.
	origBytes, err := os.ReadFile(filePath)
	if err != nil {
		return "", fmt.Errorf("patch_apply: read %s: %w", filePath, err)
	}
	orig := string(origBytes)

	rollback := func() {
		_ = os.WriteFile(filePath, origBytes, 0o644)
	}

	patched, err := applyUnifiedDiff(orig, patchStr)
	if err != nil {
		rollback()
		return "", fmt.Errorf("patch_apply: %w", err)
	}

	if err := os.WriteFile(filePath, []byte(patched), 0o644); err != nil {
		rollback()
		return "", fmt.Errorf("patch_apply: write %s: %w", filePath, err)
	}

	added, removed := diffStats(patchStr)
	return fmt.Sprintf("patch applied to %s (+%d/-%d lines)", filePath, added, removed), nil
}

// diffStats counts added/removed lines from the raw patch text.
func diffStats(patch string) (added, removed int) {
	for _, line := range strings.Split(patch, "\n") {
		if strings.HasPrefix(line, "+") && !strings.HasPrefix(line, "+++") {
			added++
		} else if strings.HasPrefix(line, "-") && !strings.HasPrefix(line, "---") {
			removed++
		}
	}
	return
}

// applyUnifiedDiff applies a unified diff to src and returns the patched string.
// Only hunk headers (@@) and line-level changes (+/-/ ) are processed.
// Returns an error with the hunk number if context lines don't match.
func applyUnifiedDiff(src, patch string) (string, error) {
	lines := strings.Split(src, "\n")
	patchLines := strings.Split(patch, "\n")

	hunkNum := 0
	i := 0 // current position in patchLines
	offset := 0 // cumulative line offset from previous hunks

	for i < len(patchLines) {
		line := patchLines[i]
		// Skip file header lines (--- / +++)
		if strings.HasPrefix(line, "---") || strings.HasPrefix(line, "+++") || strings.HasPrefix(line, "diff ") || strings.HasPrefix(line, "index ") {
			i++
			continue
		}
		// Hunk header: @@ -oldStart,oldCount +newStart,newCount @@
		if strings.HasPrefix(line, "@@") {
			hunkNum++
			oldStart, oldCount, err := parseHunkHeader(line)
			if err != nil {
				return "", fmt.Errorf("hunk %d: bad header %q: %w", hunkNum, line, err)
			}
			i++

			// Collect hunk body lines.
			var hunkLines []string
			for i < len(patchLines) {
				l := patchLines[i]
				if strings.HasPrefix(l, "@@") || strings.HasPrefix(l, "---") || strings.HasPrefix(l, "+++") || strings.HasPrefix(l, "diff ") {
					break
				}
				hunkLines = append(hunkLines, l)
				i++
			}

			// Apply this hunk to lines.
			var newLines []string
			pos := (oldStart - 1) + offset // 0-based index into lines

			// Lines before this hunk.
			if pos > len(lines) {
				return "", fmt.Errorf("hunk %d: start line %d beyond file length %d", hunkNum, oldStart, len(lines))
			}
			newLines = append(newLines, lines[:pos]...)

			// Apply hunk body.
			consumed := 0 // lines consumed from src
			for _, hl := range hunkLines {
				if hl == "" {
					// Treat bare empty line as context.
					if pos+consumed >= len(lines) {
						// Beyond file end — skip silently (trailing newline edge case).
						continue
					}
					newLines = append(newLines, lines[pos+consumed])
					consumed++
					continue
				}
				prefix := hl[0]
				content := hl[1:]
				switch prefix {
				case ' ': // context line — must match
					if pos+consumed >= len(lines) {
						return "", fmt.Errorf("hunk %d: context line beyond file end", hunkNum)
					}
					if lines[pos+consumed] != content {
						return "", fmt.Errorf("hunk %d: context mismatch at src line %d: want %q got %q",
							hunkNum, pos+consumed+1, content, lines[pos+consumed])
					}
					newLines = append(newLines, lines[pos+consumed])
					consumed++
				case '-': // remove line — must match
					if pos+consumed >= len(lines) {
						return "", fmt.Errorf("hunk %d: remove line beyond file end", hunkNum)
					}
					if lines[pos+consumed] != content {
						return "", fmt.Errorf("hunk %d: remove mismatch at src line %d: want %q got %q",
							hunkNum, pos+consumed+1, content, lines[pos+consumed])
					}
					consumed++ // skip (don't append)
				case '+': // add line
					newLines = append(newLines, content)
				}
			}

			// Lines after this hunk.
			newLines = append(newLines, lines[pos+consumed:]...)
			offset += len(newLines) - len(lines) - (pos - (oldStart-1+offset)) - 1
			// Reconstruct: replace lines with newLines for next hunk.
			_ = oldCount // validated implicitly by context matching
			lines = newLines
			offset = 0 // recalculate: lines is now the full updated slice
			continue
		}
		i++
	}

	return strings.Join(lines, "\n"), nil
}

// parseHunkHeader parses "@@ -oldStart[,oldCount] +newStart[,newCount] @@..."
// Returns oldStart and oldCount (1-based line number and line count).
func parseHunkHeader(line string) (oldStart, oldCount int, err error) {
	// Find the content between first @@ and second @@.
	parts := strings.SplitN(line, "@@", 3)
	if len(parts) < 3 {
		return 0, 0, fmt.Errorf("invalid hunk header")
	}
	fields := strings.Fields(strings.TrimSpace(parts[1]))
	if len(fields) < 1 {
		return 0, 0, fmt.Errorf("empty hunk range")
	}
	// Parse old range: -start[,count]
	oldRange := strings.TrimPrefix(fields[0], "-")
	rangeParts := strings.SplitN(oldRange, ",", 2)
	start, err := strconv.Atoi(rangeParts[0])
	if err != nil {
		return 0, 0, fmt.Errorf("parse old start: %w", err)
	}
	count := 1
	if len(rangeParts) == 2 {
		count, err = strconv.Atoi(rangeParts[1])
		if err != nil {
			return 0, 0, fmt.Errorf("parse old count: %w", err)
		}
	}
	return start, count, nil
}
