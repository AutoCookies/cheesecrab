package main

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestLoadExtensions_LoadsSkillsAndPlugins(t *testing.T) {
	root := t.TempDir()
	skillDir := filepath.Join(root, "skills", "review")
	pluginDir := filepath.Join(root, "plugins", "echo")
	if err := os.MkdirAll(skillDir, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.MkdirAll(pluginDir, 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(skillDir, "SKILL.md"), []byte("# Review\n\nCheck behavior first.\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	manifest := `{
		"name": "echo-test",
		"description": "Echo test plugin.",
		"command": "cat",
		"dangerous": false,
		"args_schema": {
			"type": "object",
			"properties": {"message": {"type": "string"}},
			"required": ["message"]
		}
	}`
	if err := os.WriteFile(filepath.Join(pluginDir, "plugin.json"), []byte(manifest), 0o644); err != nil {
		t.Fatal(err)
	}

	catalog := LoadExtensions(filepath.Join(root, "skills"), filepath.Join(root, "plugins"))
	if len(catalog.Skills) != 1 {
		t.Fatalf("expected 1 skill, got %d", len(catalog.Skills))
	}
	if catalog.Skills[0].Name != "review" {
		t.Fatalf("unexpected skill name: %q", catalog.Skills[0].Name)
	}
	if len(catalog.Plugins) != 1 {
		t.Fatalf("expected 1 plugin, got %d", len(catalog.Plugins))
	}
	if catalog.Plugins[0].Name() != "plugin_echo_test" {
		t.Fatalf("unexpected plugin tool name: %q", catalog.Plugins[0].Name())
	}
}

func TestResolveExtensionDirs_ProjectSkillsAndInstallPlugins(t *testing.T) {
	root := t.TempDir()
	oldWD, err := os.Getwd()
	if err != nil {
		t.Fatal(err)
	}
	defer os.Chdir(oldWD)
	if err := os.Chdir(root); err != nil {
		t.Fatal(err)
	}
	installRoot := filepath.Join(root, "cheeserag")
	for _, dir := range []string{".cheese/skills", "skills", filepath.Join(installRoot, "plugins")} {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			t.Fatal(err)
		}
	}
	if err := os.WriteFile(filepath.Join(installRoot, "go.mod"), []byte("module test\n"), 0o644); err != nil {
		t.Fatal(err)
	}

	skillsDir, pluginsDir := resolveExtensionDirs("", "", installRoot)
	if skillsDir != ".cheese/skills" {
		t.Fatalf("expected .cheese/skills, got %q", skillsDir)
	}
	wantPlugins := filepath.Join(installRoot, "plugins")
	if pluginsDir != wantPlugins {
		t.Fatalf("expected %q, got %q", wantPlugins, pluginsDir)
	}
}

func TestResolveExtensionDirs_UsesExplicitDirs(t *testing.T) {
	skillsDir, pluginsDir := resolveExtensionDirs("/tmp/custom-skills", "/tmp/custom-plugins", "/tmp/install")
	if skillsDir != "/tmp/custom-skills" {
		t.Fatalf("expected explicit skills dir, got %q", skillsDir)
	}
	if pluginsDir != "/tmp/custom-plugins" {
		t.Fatalf("expected explicit plugins dir, got %q", pluginsDir)
	}
}

func TestReadSkillTool_ReadsSkillMarkdown(t *testing.T) {
	root := t.TempDir()
	skillDir := filepath.Join(root, "skills", "review")
	if err := os.MkdirAll(skillDir, 0o755); err != nil {
		t.Fatal(err)
	}
	content := "# Review\n\nCheck behavior first.\n"
	if err := os.WriteFile(filepath.Join(skillDir, "SKILL.md"), []byte(content), 0o644); err != nil {
		t.Fatal(err)
	}

	catalog := LoadExtensions(filepath.Join(root, "skills"), "")
	tool := NewReadSkillTool(catalog.Skills)
	out, err := tool.Execute(context.Background(), map[string]any{"name": "review"})
	if err != nil {
		t.Fatalf("read_skill failed: %v", err)
	}
	if !strings.Contains(out, "Check behavior first") {
		t.Fatalf("unexpected skill content: %q", out)
	}
}

func TestPluginTool_ExecutesWithJSONArgs(t *testing.T) {
	root := t.TempDir()
	pluginDir := filepath.Join(root, "plugins", "echo")
	if err := os.MkdirAll(pluginDir, 0o755); err != nil {
		t.Fatal(err)
	}
	manifest := `{
		"name": "echo",
		"description": "Echo plugin.",
		"command": "cat",
		"dangerous": false,
		"args_schema": {
			"type": "object",
			"properties": {"message": {"type": "string"}},
			"required": ["message"]
		}
	}`
	if err := os.WriteFile(filepath.Join(pluginDir, "plugin.json"), []byte(manifest), 0o644); err != nil {
		t.Fatal(err)
	}

	catalog := LoadExtensions("", filepath.Join(root, "plugins"))
	if len(catalog.Plugins) != 1 {
		t.Fatalf("expected plugin")
	}
	out, err := catalog.Plugins[0].Execute(context.Background(), map[string]any{"message": "hello"})
	if err != nil {
		t.Fatalf("plugin failed: %v", err)
	}
	if !strings.Contains(out, `"message":"hello"`) {
		t.Fatalf("unexpected plugin output: %q", out)
	}
}
