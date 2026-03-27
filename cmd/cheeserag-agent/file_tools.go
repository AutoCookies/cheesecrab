package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

// ---------------- read_file ------------------------------------------------

type ReadFileTool struct{}

func NewReadFileTool() *ReadFileTool { return &ReadFileTool{} }

func (t *ReadFileTool) Name() string      { return "read_file" }
func (t *ReadFileTool) Dangerous() bool   { return false }
func (t *ReadFileTool) Description() string {
	return "Read a local file and return its text content. " +
		"Args: path (required), start_line (optional, 1-based), end_line (optional, inclusive). " +
		"Returns up to 200 KB of content."
}

func (t *ReadFileTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"path":       map[string]any{"type": "string", "description": "Absolute or relative path to the file."},
			"start_line": map[string]any{"type": "number", "description": "First line to read (1-based). Default: 1."},
			"end_line":   map[string]any{"type": "number", "description": "Last line to read (inclusive). Default: no limit."},
		},
		"required": []string{"path"},
	}
}

func (t *ReadFileTool) Execute(_ context.Context, args map[string]any) (string, error) {
	path := firstString(args, "path", "file", "filename")
	if path == "" {
		return "", fmt.Errorf("read_file: path required")
	}
	if err := ensureAllowedCWD(filepath.Dir(path)); err != nil {
		// Only enforce root restriction when CHEESERAG_EXEC_ROOT is set.
		return "", err
	}

	f, err := os.Open(path)
	if err != nil {
		return "", fmt.Errorf("read_file: %w", err)
	}
	defer f.Close()

	startLine := 1
	endLine := -1 // no limit
	if v, ok := firstNumber(args, "start_line"); ok && v >= 1 {
		startLine = int(v)
	}
	if v, ok := firstNumber(args, "end_line"); ok && v >= 1 {
		endLine = int(v)
	}

	const maxBytes = 200 * 1024
	sc := bufio.NewScanner(f)
	var sb strings.Builder
	lineNo := 0
	for sc.Scan() {
		lineNo++
		if lineNo < startLine {
			continue
		}
		if endLine >= 0 && lineNo > endLine {
			break
		}
		sb.WriteString(sc.Text())
		sb.WriteByte('\n')
		if sb.Len() >= maxBytes {
			sb.WriteString("\n...[truncated at 200 KB]\n")
			break
		}
	}
	if err := sc.Err(); err != nil {
		return "", fmt.Errorf("read_file: scan: %w", err)
	}
	if sb.Len() == 0 {
		return "(empty file or line range out of bounds)", nil
	}
	return sb.String(), nil
}

// ---------------- write_file -----------------------------------------------

type WriteFileTool struct{}

func NewWriteFileTool() *WriteFileTool { return &WriteFileTool{} }

func (t *WriteFileTool) Name() string      { return "write_file" }
func (t *WriteFileTool) Dangerous() bool   { return true }
func (t *WriteFileTool) Description() string {
	return "Write (create or overwrite) a local file with the given content. Args: path, content."
}

func (t *WriteFileTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"path":    map[string]any{"type": "string", "description": "Absolute or relative path to write."},
			"content": map[string]any{"type": "string", "description": "File content to write."},
		},
		"required": []string{"path", "content"},
	}
}

func (t *WriteFileTool) Execute(_ context.Context, args map[string]any) (string, error) {
	path := firstString(args, "path", "file", "filename")
	content, _ := args["content"].(string)
	if path == "" {
		return "", fmt.Errorf("write_file: path required")
	}
	if err := ensureAllowedCWD(filepath.Dir(path)); err != nil {
		return "", err
	}
	if dir := filepath.Dir(path); dir != "" && dir != "." {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return "", fmt.Errorf("write_file: mkdir: %w", err)
		}
	}
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		return "", fmt.Errorf("write_file: %w", err)
	}
	return fmt.Sprintf("wrote %d bytes to %s", len(content), path), nil
}

// ---------------- list_dir -------------------------------------------------

type ListDirTool struct{}

func NewListDirTool() *ListDirTool { return &ListDirTool{} }

func (t *ListDirTool) Name() string      { return "list_dir" }
func (t *ListDirTool) Dangerous() bool   { return false }
func (t *ListDirTool) Description() string {
	return "List files and subdirectories of a directory. Args: path, recursive (bool, default false)."
}

func (t *ListDirTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"path":      map[string]any{"type": "string", "description": "Directory to list."},
			"recursive": map[string]any{"type": "boolean", "description": "If true, walk subdirectories."},
		},
		"required": []string{"path"},
	}
}

func (t *ListDirTool) Execute(_ context.Context, args map[string]any) (string, error) {
	path := firstString(args, "path", "dir", "directory")
	if path == "" {
		path = "."
	}
	recursive, _ := args["recursive"].(bool)

	if err := ensureAllowedCWD(path); err != nil {
		return "", err
	}

	const maxEntries = 500
	var lines []string

	if recursive {
		count := 0
		err := filepath.WalkDir(path, func(p string, d os.DirEntry, err error) error {
			if err != nil {
				return nil // skip permission errors
			}
			rel, _ := filepath.Rel(path, p)
			if rel == "." {
				return nil
			}
			suffix := ""
			if d.IsDir() {
				suffix = "/"
			}
			lines = append(lines, rel+suffix)
			count++
			if count >= maxEntries {
				lines = append(lines, "...[truncated at 500 entries]")
				return filepath.SkipAll
			}
			return nil
		})
		if err != nil {
			return "", fmt.Errorf("list_dir: %w", err)
		}
	} else {
		entries, err := os.ReadDir(path)
		if err != nil {
			return "", fmt.Errorf("list_dir: %w", err)
		}
		for _, e := range entries {
			suffix := ""
			if e.IsDir() {
				suffix = "/"
			}
			lines = append(lines, e.Name()+suffix)
		}
	}

	if len(lines) == 0 {
		return "(empty directory)", nil
	}
	return strings.Join(lines, "\n"), nil
}

// ---------------- search_files ---------------------------------------------

type SearchFilesTool struct{}

func NewSearchFilesTool() *SearchFilesTool { return &SearchFilesTool{} }

func (t *SearchFilesTool) Name() string      { return "search_files" }
func (t *SearchFilesTool) Dangerous() bool   { return false }
func (t *SearchFilesTool) Description() string {
	return "Search files for a regex or literal pattern. " +
		"Args: pattern (required), path (directory or file, default '.'), " +
		"file_glob (e.g. '*.go'), max_results (default 50), literal (bool, treat pattern as literal string)."
}

func (t *SearchFilesTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"pattern":     map[string]any{"type": "string", "description": "Search pattern (regex or literal)."},
			"path":        map[string]any{"type": "string", "description": "Directory or file to search. Default '.'."},
			"file_glob":   map[string]any{"type": "string", "description": "Optional glob filter, e.g. '*.go'."},
			"max_results": map[string]any{"type": "number", "description": "Max matches to return. Default 50."},
			"literal":     map[string]any{"type": "boolean", "description": "If true, treat pattern as literal string."},
		},
		"required": []string{"pattern"},
	}
}

func (t *SearchFilesTool) Execute(_ context.Context, args map[string]any) (string, error) {
	pattern := firstString(args, "pattern", "query", "search")
	if pattern == "" {
		return "", fmt.Errorf("search_files: pattern required")
	}
	searchPath := firstString(args, "path", "dir", "directory")
	if searchPath == "" {
		searchPath = "."
	}
	fileGlob := firstString(args, "file_glob", "glob", "ext")
	maxResults := 50
	if v, ok := firstNumber(args, "max_results", "limit"); ok && v > 0 {
		maxResults = int(v)
	}
	isLiteral, _ := args["literal"].(bool)

	var re *regexp.Regexp
	if isLiteral {
		re = regexp.MustCompile(regexp.QuoteMeta(pattern))
	} else {
		var err error
		re, err = regexp.Compile(pattern)
		if err != nil {
			return "", fmt.Errorf("search_files: invalid pattern: %w", err)
		}
	}

	if err := ensureAllowedCWD(searchPath); err != nil {
		return "", err
	}

	var results []string
	count := 0

	err := filepath.WalkDir(searchPath, func(p string, d os.DirEntry, err error) error {
		if err != nil {
			return nil
		}
		if d.IsDir() {
			// Skip hidden dirs
			if strings.HasPrefix(d.Name(), ".") && d.Name() != "." {
				return filepath.SkipDir
			}
			return nil
		}
		if fileGlob != "" {
			matched, _ := filepath.Match(fileGlob, d.Name())
			if !matched {
				return nil
			}
		}
		f, err := os.Open(p)
		if err != nil {
			return nil
		}
		defer f.Close()

		sc := bufio.NewScanner(f)
		lineNo := 0
		for sc.Scan() {
			lineNo++
			line := sc.Text()
			if re.MatchString(line) {
				results = append(results, fmt.Sprintf("%s:%d: %s", p, lineNo, strings.TrimSpace(line)))
				count++
				if count >= maxResults {
					results = append(results, fmt.Sprintf("...[truncated at %d results]", maxResults))
					return filepath.SkipAll
				}
			}
		}
		return nil
	})
	if err != nil {
		return "", fmt.Errorf("search_files: %w", err)
	}
	if len(results) == 0 {
		return fmt.Sprintf("(no matches for %q in %s)", pattern, searchPath), nil
	}
	return strings.Join(results, "\n"), nil
}
