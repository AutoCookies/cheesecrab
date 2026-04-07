package main

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// ─── parseHunkHeader ──────────────────────────────────────────────────────────

func TestParseHunkHeader_Standard(t *testing.T) {
	start, count, err := parseHunkHeader("@@ -3,5 +3,6 @@ func Foo() {")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if start != 3 || count != 5 {
		t.Fatalf("want start=3 count=5, got start=%d count=%d", start, count)
	}
}

func TestParseHunkHeader_NoCount(t *testing.T) {
	// Some patches omit the count when it is 1.
	start, count, err := parseHunkHeader("@@ -10 +10 @@")
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if start != 10 || count != 1 {
		t.Fatalf("want start=10 count=1, got start=%d count=%d", start, count)
	}
}

func TestParseHunkHeader_Invalid(t *testing.T) {
	_, _, err := parseHunkHeader("not a hunk header")
	if err == nil {
		t.Fatal("expected error for invalid hunk header")
	}
}

// ─── diffStats ────────────────────────────────────────────────────────────────

func TestDiffStats_AddedAndRemoved(t *testing.T) {
	patch := `--- a.txt
+++ b.txt
@@ -1,3 +1,3 @@
 context
-old line
+new line
 context2
`
	added, removed := diffStats(patch)
	if added != 1 {
		t.Fatalf("want 1 added, got %d", added)
	}
	if removed != 1 {
		t.Fatalf("want 1 removed, got %d", removed)
	}
}

func TestDiffStats_PureAdd(t *testing.T) {
	patch := `@@ -1,0 +2,2 @@
+line one
+line two
`
	added, removed := diffStats(patch)
	if added != 2 || removed != 0 {
		t.Fatalf("want added=2 removed=0, got added=%d removed=%d", added, removed)
	}
}

func TestDiffStats_PureRemove(t *testing.T) {
	patch := `@@ -1,3 +1,1 @@
 keep
-drop me
-drop too
`
	added, removed := diffStats(patch)
	if added != 0 || removed != 2 {
		t.Fatalf("want added=0 removed=2, got added=%d removed=%d", added, removed)
	}
}

// ─── applyUnifiedDiff ─────────────────────────────────────────────────────────

func TestApplyUnifiedDiff_AddLine(t *testing.T) {
	src := "line1\nline2\nline3\n"
	patch := `--- a.txt
+++ b.txt
@@ -2,1 +2,2 @@
 line2
+inserted
`
	result, err := applyUnifiedDiff(src, patch)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.Contains(result, "inserted") {
		t.Fatalf("inserted line not present: %q", result)
	}
	if !strings.Contains(result, "line1") || !strings.Contains(result, "line3") {
		t.Fatalf("surrounding lines lost: %q", result)
	}
}

func TestApplyUnifiedDiff_RemoveLine(t *testing.T) {
	src := "keep\nremove me\nalso keep\n"
	patch := `--- a.txt
+++ b.txt
@@ -1,3 +1,2 @@
 keep
-remove me
 also keep
`
	result, err := applyUnifiedDiff(src, patch)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if strings.Contains(result, "remove me") {
		t.Fatalf("removed line still present: %q", result)
	}
	if !strings.Contains(result, "keep") || !strings.Contains(result, "also keep") {
		t.Fatalf("surrounding lines lost: %q", result)
	}
}

func TestApplyUnifiedDiff_ReplaceLine(t *testing.T) {
	src := "alpha\nbeta\ngamma\n"
	patch := `--- a.txt
+++ b.txt
@@ -2,1 +2,1 @@
-beta
+BETA
`
	result, err := applyUnifiedDiff(src, patch)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if strings.Contains(result, "beta") {
		t.Fatalf("old line not replaced: %q", result)
	}
	if !strings.Contains(result, "BETA") {
		t.Fatalf("new line not present: %q", result)
	}
}

func TestApplyUnifiedDiff_ContextMismatch_ReturnsError(t *testing.T) {
	src := "correct line\nother\n"
	patch := `--- a.txt
+++ b.txt
@@ -1,2 +1,2 @@
 wrong context line
-other
+replacement
`
	_, err := applyUnifiedDiff(src, patch)
	if err == nil {
		t.Fatal("expected error for context mismatch")
	}
}

func TestApplyUnifiedDiff_SkipsNonHunkLines(t *testing.T) {
	// diff --git lines and index lines should be skipped gracefully.
	src := "a\nb\n"
	patch := `diff --git a/f.txt b/f.txt
index abc..def 100644
--- a/f.txt
+++ b/f.txt
@@ -1,2 +1,2 @@
-a
+A
 b
`
	result, err := applyUnifiedDiff(src, patch)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.Contains(result, "A") || strings.Contains(result, "\na\n") {
		t.Fatalf("unexpected result: %q", result)
	}
}

// ─── PatchApplyTool.Execute ───────────────────────────────────────────────────

func TestPatchApplyTool_Metadata(t *testing.T) {
	tool := &PatchApplyTool{}
	if tool.Name() != "patch_apply" {
		t.Fatalf("name: want patch_apply, got %q", tool.Name())
	}
	if !tool.Dangerous() {
		t.Fatal("patch_apply should be dangerous")
	}
	if tool.DangerLevel() != 2 {
		t.Fatalf("danger level: want 2, got %d", tool.DangerLevel())
	}
}

func TestPatchApplyTool_MissingFile_ReturnsError(t *testing.T) {
	tool := &PatchApplyTool{}
	_, err := tool.Execute(context.Background(), map[string]any{
		"patch": "@@ -1 +1 @@\n-x\n+y\n",
	})
	if err == nil {
		t.Fatal("expected error for missing file arg")
	}
}

func TestPatchApplyTool_MissingPatch_ReturnsError(t *testing.T) {
	tool := &PatchApplyTool{}
	_, err := tool.Execute(context.Background(), map[string]any{
		"file": "/tmp/some.txt",
	})
	if err == nil {
		t.Fatal("expected error for missing patch arg")
	}
}

func TestPatchApplyTool_SuccessfulApply(t *testing.T) {
	tmp := t.TempDir()
	f := filepath.Join(tmp, "target.txt")
	_ = os.WriteFile(f, []byte("hello\nworld\n"), 0o644)

	patch := `--- a/target.txt
+++ b/target.txt
@@ -1,2 +1,2 @@
 hello
-world
+WORLD
`
	tool := &PatchApplyTool{}
	out, err := tool.Execute(context.Background(), map[string]any{
		"file":  f,
		"patch": patch,
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if !strings.Contains(out, "patch applied") {
		t.Fatalf("expected success message: %q", out)
	}

	got, _ := os.ReadFile(f)
	if !strings.Contains(string(got), "WORLD") || strings.Contains(string(got), "world") {
		t.Fatalf("file not patched: %q", got)
	}
}

func TestPatchApplyTool_BadPatch_RollbackRestoresFile(t *testing.T) {
	tmp := t.TempDir()
	f := filepath.Join(tmp, "restore.txt")
	original := "original content\nline two\n"
	_ = os.WriteFile(f, []byte(original), 0o644)

	// Patch with wrong context line — should fail and rollback.
	badPatch := `--- a/restore.txt
+++ b/restore.txt
@@ -1,2 +1,2 @@
 WRONG CONTEXT LINE
-line two
+replaced
`
	tool := &PatchApplyTool{}
	_, err := tool.Execute(context.Background(), map[string]any{
		"file":  f,
		"patch": badPatch,
	})
	if err == nil {
		t.Fatal("expected error for bad patch")
	}

	// File should be restored to original.
	restored, _ := os.ReadFile(f)
	if string(restored) != original {
		t.Fatalf("rollback failed: file content is %q, want %q", restored, original)
	}
}

func TestPatchApplyTool_NonexistentFile_ReturnsError(t *testing.T) {
	tool := &PatchApplyTool{}
	_, err := tool.Execute(context.Background(), map[string]any{
		"file":  "/tmp/cheeserag_no_such_file_xyz.txt",
		"patch": "@@ -1 +1 @@\n-x\n+y\n",
	})
	if err == nil {
		t.Fatal("expected error for nonexistent file")
	}
}

func TestPatchApplyTool_Output_ContainsStats(t *testing.T) {
	tmp := t.TempDir()
	f := filepath.Join(tmp, "stats.txt")
	_ = os.WriteFile(f, []byte("aaa\nbbb\nccc\n"), 0o644)

	patch := `@@ -2,1 +2,1 @@
-bbb
+BBB
`
	tool := &PatchApplyTool{}
	out, err := tool.Execute(context.Background(), map[string]any{
		"file":  f,
		"patch": patch,
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	// Output should mention +1/-1 lines.
	if !strings.Contains(out, "+1") || !strings.Contains(out, "-1") {
		t.Fatalf("expected diff stats in output: %q", out)
	}
}
