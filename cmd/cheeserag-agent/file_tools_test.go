package main

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// ---------- read_file -------------------------------------------------------

func TestReadFileTool_ReadsContent(t *testing.T) {
	tmp := t.TempDir()
	p := filepath.Join(tmp, "hello.txt")
	_ = os.WriteFile(p, []byte("line1\nline2\nline3\n"), 0o644)

	tool := NewReadFileTool()
	out, err := tool.Execute(context.Background(), map[string]any{"path": p})
	if err != nil {
		t.Fatalf("read_file error: %v", err)
	}
	if !strings.Contains(out, "line1") || !strings.Contains(out, "line3") {
		t.Fatalf("unexpected output: %q", out)
	}
}

func TestReadFileTool_LineRange(t *testing.T) {
	tmp := t.TempDir()
	p := filepath.Join(tmp, "lines.txt")
	_ = os.WriteFile(p, []byte("a\nb\nc\nd\ne\n"), 0o644)

	tool := NewReadFileTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"path":       p,
		"start_line": float64(2),
		"end_line":   float64(4),
	})
	if err != nil {
		t.Fatalf("read_file error: %v", err)
	}
	if strings.Contains(out, "a") {
		t.Fatalf("start_line not respected: %q", out)
	}
	if !strings.Contains(out, "b") || !strings.Contains(out, "d") {
		t.Fatalf("expected b and d: %q", out)
	}
	if strings.Contains(out, "e") {
		t.Fatalf("end_line not respected: %q", out)
	}
}

func TestReadFileTool_MissingFile(t *testing.T) {
	tool := NewReadFileTool()
	_, err := tool.Execute(context.Background(), map[string]any{"path": "/tmp/cheeserag_nonexistent_file_xyz.txt"})
	if err == nil {
		t.Fatal("expected error for missing file")
	}
}

// ---------- write_file ------------------------------------------------------

func TestWriteFileTool_CreatesFile(t *testing.T) {
	tmp := t.TempDir()
	p := filepath.Join(tmp, "out.txt")

	tool := NewWriteFileTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"path":    p,
		"content": "hello world",
	})
	if err != nil {
		t.Fatalf("write_file error: %v", err)
	}
	if !strings.Contains(out, "wrote") {
		t.Fatalf("unexpected output: %q", out)
	}
	got, _ := os.ReadFile(p)
	if string(got) != "hello world" {
		t.Fatalf("file content mismatch: %q", got)
	}
}

func TestWriteFileTool_CreatesParentDirs(t *testing.T) {
	tmp := t.TempDir()
	p := filepath.Join(tmp, "a", "b", "c.txt")

	tool := NewWriteFileTool()
	_, err := tool.Execute(context.Background(), map[string]any{
		"path":    p,
		"content": "nested",
	})
	if err != nil {
		t.Fatalf("write_file nested error: %v", err)
	}
	if _, err := os.Stat(p); err != nil {
		t.Fatalf("file not created: %v", err)
	}
}

// ---------- list_dir --------------------------------------------------------

func TestListDirTool_ListsEntries(t *testing.T) {
	tmp := t.TempDir()
	_ = os.WriteFile(filepath.Join(tmp, "a.go"), nil, 0o644)
	_ = os.WriteFile(filepath.Join(tmp, "b.go"), nil, 0o644)
	_ = os.Mkdir(filepath.Join(tmp, "sub"), 0o755)

	tool := NewListDirTool()
	out, err := tool.Execute(context.Background(), map[string]any{"path": tmp})
	if err != nil {
		t.Fatalf("list_dir error: %v", err)
	}
	if !strings.Contains(out, "a.go") || !strings.Contains(out, "b.go") || !strings.Contains(out, "sub/") {
		t.Fatalf("unexpected output: %q", out)
	}
}

func TestListDirTool_Recursive(t *testing.T) {
	tmp := t.TempDir()
	_ = os.Mkdir(filepath.Join(tmp, "nested"), 0o755)
	_ = os.WriteFile(filepath.Join(tmp, "nested", "deep.txt"), []byte("x"), 0o644)

	tool := NewListDirTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"path":      tmp,
		"recursive": true,
	})
	if err != nil {
		t.Fatalf("list_dir recursive error: %v", err)
	}
	if !strings.Contains(out, "deep.txt") {
		t.Fatalf("recursive: expected deep.txt in %q", out)
	}
}

// ---------- search_files ----------------------------------------------------

func TestSearchFilesTool_FindsMatch(t *testing.T) {
	tmp := t.TempDir()
	_ = os.WriteFile(filepath.Join(tmp, "main.go"), []byte("package main\nfunc Foo() {}\n"), 0o644)
	_ = os.WriteFile(filepath.Join(tmp, "other.go"), []byte("package main\nfunc Bar() {}\n"), 0o644)

	tool := NewSearchFilesTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"pattern": "func Foo",
		"path":    tmp,
	})
	if err != nil {
		t.Fatalf("search_files error: %v", err)
	}
	if !strings.Contains(out, "main.go") || !strings.Contains(out, "func Foo") {
		t.Fatalf("unexpected output: %q", out)
	}
	if strings.Contains(out, "func Bar") {
		t.Fatalf("should not match Bar: %q", out)
	}
}

func TestSearchFilesTool_LiteralMode(t *testing.T) {
	tmp := t.TempDir()
	_ = os.WriteFile(filepath.Join(tmp, "notes.txt"), []byte("cost: $1.00\nno match here\n"), 0o644)

	tool := NewSearchFilesTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"pattern": "$1.00",
		"path":    tmp,
		"literal": true,
	})
	if err != nil {
		t.Fatalf("search_files literal error: %v", err)
	}
	if !strings.Contains(out, "$1.00") {
		t.Fatalf("literal match not found: %q", out)
	}
}

func TestSearchFilesTool_GlobFilter(t *testing.T) {
	tmp := t.TempDir()
	_ = os.WriteFile(filepath.Join(tmp, "main.go"), []byte("func Target() {}\n"), 0o644)
	_ = os.WriteFile(filepath.Join(tmp, "main.py"), []byte("def Target(): pass\n"), 0o644)

	tool := NewSearchFilesTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"pattern":   "Target",
		"path":      tmp,
		"file_glob": "*.go",
	})
	if err != nil {
		t.Fatalf("search_files glob error: %v", err)
	}
	if !strings.Contains(out, "main.go") {
		t.Fatalf("expected main.go: %q", out)
	}
	if strings.Contains(out, "main.py") {
		t.Fatalf("glob filtered incorrectly — main.py should not appear: %q", out)
	}
}

func TestSearchFilesTool_NoMatch(t *testing.T) {
	tmp := t.TempDir()
	_ = os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("nothing interesting\n"), 0o644)

	tool := NewSearchFilesTool()
	out, err := tool.Execute(context.Background(), map[string]any{
		"pattern": "XYZZY_PATTERN_404",
		"path":    tmp,
	})
	if err != nil {
		t.Fatalf("search_files error: %v", err)
	}
	if !strings.Contains(out, "no matches") {
		t.Fatalf("expected no-matches message: %q", out)
	}
}
