package main

import (
	"context"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

func TestGitContextTool_NotARepo(t *testing.T) {
	tmp := t.TempDir()
	tool := NewGitContextTool()
	_, err := tool.Execute(context.Background(), map[string]any{"path": tmp})
	if err == nil {
		t.Fatal("expected error for non-git directory")
	}
	if !strings.Contains(err.Error(), "not a git repository") {
		t.Fatalf("unexpected error message: %v", err)
	}
}

func TestGitContextTool_CleanRepo(t *testing.T) {
	if _, err := exec.LookPath("git"); err != nil {
		t.Skip("git not in PATH")
	}
	tmp := t.TempDir()
	run := func(args ...string) {
		cmd := exec.Command("git", args...)
		cmd.Dir = tmp
		cmd.Env = append(os.Environ(),
			"GIT_AUTHOR_NAME=Test",
			"GIT_AUTHOR_EMAIL=test@test.local",
			"GIT_COMMITTER_NAME=Test",
			"GIT_COMMITTER_EMAIL=test@test.local",
		)
		_ = cmd.Run()
	}
	run("init")
	run("config", "user.email", "test@test.local")
	run("config", "user.name", "Test")
	_ = os.WriteFile(filepath.Join(tmp, "README.md"), []byte("hello\n"), 0o644)
	run("add", ".")
	run("commit", "-m", "init")

	tool := NewGitContextTool()
	out, err := tool.Execute(context.Background(), map[string]any{"path": tmp})
	if err != nil {
		t.Fatalf("git_context error: %v", err)
	}
	if !strings.Contains(out, "branch:") {
		t.Fatalf("expected branch info in output: %q", out)
	}
	if !strings.Contains(out, "last_commit:") {
		t.Fatalf("expected last_commit in output: %q", out)
	}
	if !strings.Contains(out, "clean") {
		t.Fatalf("expected clean status: %q", out)
	}
}

func TestGitContextTool_DirtyRepo(t *testing.T) {
	if _, err := exec.LookPath("git"); err != nil {
		t.Skip("git not in PATH")
	}
	tmp := t.TempDir()
	run := func(args ...string) {
		cmd := exec.Command("git", args...)
		cmd.Dir = tmp
		cmd.Env = append(os.Environ(),
			"GIT_AUTHOR_NAME=Test",
			"GIT_AUTHOR_EMAIL=test@test.local",
			"GIT_COMMITTER_NAME=Test",
			"GIT_COMMITTER_EMAIL=test@test.local",
		)
		_ = cmd.Run()
	}
	run("init")
	run("config", "user.email", "test@test.local")
	run("config", "user.name", "Test")
	_ = os.WriteFile(filepath.Join(tmp, "a.txt"), []byte("x\n"), 0o644)
	run("add", ".")
	run("commit", "-m", "init")

	// Make a change — dirty status
	_ = os.WriteFile(filepath.Join(tmp, "b.txt"), []byte("new\n"), 0o644)

	tool := NewGitContextTool()
	out, err := tool.Execute(context.Background(), map[string]any{"path": tmp})
	if err != nil {
		t.Fatalf("git_context dirty error: %v", err)
	}
	if strings.Contains(out, "clean - no changes") {
		t.Fatalf("should not be clean with untracked files: %q", out)
	}
}
