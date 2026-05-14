package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"
)

const maxSkillBytes = 128 * 1024

type Skill struct {
	Name        string
	Path        string
	Description string
}

type ExtensionCatalog struct {
	Skills  []Skill
	Plugins []*PluginTool
}

type pluginManifest struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Command     string         `json:"command"`
	ArgsSchema  map[string]any `json:"args_schema"`
	Dangerous   *bool          `json:"dangerous"`
	TimeoutSec  int            `json:"timeout_sec"`
	WorkingDir  string         `json:"working_dir"`
}

type PluginTool struct {
	name        string
	description string
	command     string
	schema      map[string]any
	dangerous   bool
	timeout     time.Duration
	dir         string
}

func LoadExtensions(skillsDir, pluginsDir string) ExtensionCatalog {
	return ExtensionCatalog{
		Skills:  loadSkills(skillsDir),
		Plugins: loadPlugins(pluginsDir),
	}
}

func resolveExtensionDirs(skillsDir, pluginsDir, installRoot string) (string, string) {
	return resolveProjectSkillsDir(skillsDir), resolveInstallPluginsDir(pluginsDir, installRoot)
}

func resolveProjectSkillsDir(explicit string) string {
	if strings.TrimSpace(explicit) != "" {
		return explicit
	}
	if dirExists(".cheese/skills") {
		return ".cheese/skills"
	}
	if dirExists("skills") {
		return "skills"
	}
	return ".cheese/skills"
}

func resolveInstallPluginsDir(explicit, installRoot string) string {
	if strings.TrimSpace(explicit) != "" {
		return explicit
	}
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_HOME")); v != "" {
		return filepath.Join(v, "plugins")
	}
	root := detectCheeseragInstallRoot(installRoot)
	return filepath.Join(root, "plugins")
}

func detectCheeseragInstallRoot(startupDir string) string {
	var candidates []string
	if startupDir != "" {
		candidates = append(candidates, startupDir)
	}
	if exe, err := os.Executable(); err == nil {
		exeDir := filepath.Dir(exe)
		candidates = append(candidates, exeDir)
		if filepath.Base(exeDir) == "build" {
			candidates = append(candidates, filepath.Dir(exeDir))
		}
	}
	for _, c := range candidates {
		if c == "" {
			continue
		}
		if dirExists(filepath.Join(c, "cmd", "cheeserag-agent")) || fileExists(filepath.Join(c, "go.mod")) || dirExists(filepath.Join(c, "plugins")) {
			return c
		}
	}
	if startupDir != "" {
		return startupDir
	}
	if wd, err := os.Getwd(); err == nil {
		return wd
	}
	return "."
}

func dirExists(path string) bool {
	info, err := os.Stat(path)
	return err == nil && info.IsDir()
}

func fileExists(path string) bool {
	info, err := os.Stat(path)
	return err == nil && !info.IsDir()
}

func loadSkills(skillsDir string) []Skill {
	skillsDir = strings.TrimSpace(skillsDir)
	if skillsDir == "" {
		return nil
	}
	entries, err := os.ReadDir(skillsDir)
	if err != nil {
		return nil
	}
	var skills []Skill
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		name := e.Name()
		path := filepath.Join(skillsDir, name, "SKILL.md")
		b, err := os.ReadFile(path)
		if err != nil {
			continue
		}
		skills = append(skills, Skill{
			Name:        name,
			Path:        path,
			Description: summarizeMarkdown(string(b)),
		})
	}
	sort.Slice(skills, func(i, j int) bool { return skills[i].Name < skills[j].Name })
	return skills
}

func loadPlugins(pluginsDir string) []*PluginTool {
	pluginsDir = strings.TrimSpace(pluginsDir)
	if pluginsDir == "" {
		return nil
	}
	entries, err := os.ReadDir(pluginsDir)
	if err != nil {
		return nil
	}
	var out []*PluginTool
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		dir := filepath.Join(pluginsDir, e.Name())
		manifestPath := filepath.Join(dir, "plugin.json")
		b, err := os.ReadFile(manifestPath)
		if err != nil {
			continue
		}
		var m pluginManifest
		if err := json.Unmarshal(b, &m); err != nil {
			fmt.Fprintf(os.Stderr, "[cheese] warning: invalid plugin manifest %s: %v\n", manifestPath, err)
			continue
		}
		tool, err := newPluginTool(dir, m)
		if err != nil {
			fmt.Fprintf(os.Stderr, "[cheese] warning: skipping plugin %s: %v\n", manifestPath, err)
			continue
		}
		out = append(out, tool)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].Name() < out[j].Name() })
	return out
}

func newPluginTool(dir string, m pluginManifest) (*PluginTool, error) {
	name := sanitizeToolName(m.Name)
	if name == "" {
		name = sanitizeToolName(filepath.Base(dir))
	}
	if name == "" {
		return nil, fmt.Errorf("missing plugin name")
	}
	if !strings.HasPrefix(name, "plugin_") {
		name = "plugin_" + name
	}
	if strings.TrimSpace(m.Command) == "" {
		return nil, fmt.Errorf("missing command")
	}
	desc := strings.TrimSpace(m.Description)
	if desc == "" {
		desc = "Run installed plugin " + name + "."
	}
	timeout := time.Duration(m.TimeoutSec) * time.Second
	if timeout <= 0 {
		timeout = 120 * time.Second
	}
	dangerous := true
	if m.Dangerous != nil {
		dangerous = *m.Dangerous
	}
	wd := dir
	if strings.TrimSpace(m.WorkingDir) != "" {
		wd = m.WorkingDir
		if !filepath.IsAbs(wd) {
			wd = filepath.Join(dir, wd)
		}
	}
	schema := normalizePluginSchema(m.ArgsSchema)
	return &PluginTool{name: name, description: desc, command: m.Command, schema: schema, dangerous: dangerous, timeout: timeout, dir: wd}, nil
}

func normalizePluginSchema(schema map[string]any) map[string]any {
	if schema == nil {
		return map[string]any{
			"type":       "object",
			"properties": map[string]any{},
		}
	}
	if schema["type"] == nil {
		schema["type"] = "object"
	}
	if _, ok := schema["properties"]; !ok {
		schema["properties"] = map[string]any{}
	}
	if raw, ok := schema["required"].([]any); ok {
		var required []string
		for _, v := range raw {
			if s, ok := v.(string); ok {
				required = append(required, s)
			}
		}
		schema["required"] = required
	}
	return schema
}

func sanitizeToolName(name string) string {
	name = strings.ToLower(strings.TrimSpace(name))
	name = strings.ReplaceAll(name, "-", "_")
	name = strings.ReplaceAll(name, " ", "_")
	re := regexp.MustCompile(`[^a-z0-9_]+`)
	name = re.ReplaceAllString(name, "")
	return strings.Trim(name, "_")
}

func summarizeMarkdown(content string) string {
	lines := strings.Split(content, "\n")
	var parts []string
	for _, line := range lines {
		line = strings.TrimSpace(strings.TrimLeft(line, "#"))
		if line == "" {
			continue
		}
		parts = append(parts, line)
		if len(strings.Join(parts, " ")) >= 220 || len(parts) >= 3 {
			break
		}
	}
	if len(parts) == 0 {
		return "(no description)"
	}
	desc := strings.Join(parts, " ")
	if len(desc) > 240 {
		desc = desc[:240] + "..."
	}
	return desc
}

func extensionsPrompt(c ExtensionCatalog, skillsDir, pluginsDir string) string {
	var sb strings.Builder
	if len(c.Skills) > 0 {
		fmt.Fprintf(&sb, "\n\n[Installed Skills]\nSkills are local instruction packs in %s. Use list_skills and read_skill when a task matches a skill.\n", skillsDir)
		for _, s := range c.Skills {
			fmt.Fprintf(&sb, "- %s: %s\n", s.Name, s.Description)
		}
	}
	if len(c.Plugins) > 0 {
		fmt.Fprintf(&sb, "\n[Installed Plugins]\nPlugins are command-backed tools loaded from %s/plugin.json.\n", pluginsDir)
		for _, p := range c.Plugins {
			fmt.Fprintf(&sb, "- %s: %s\n", p.Name(), p.Description())
		}
	}
	return sb.String()
}

type ListSkillsTool struct {
	skills []Skill
}

func NewListSkillsTool(skills []Skill) *ListSkillsTool { return &ListSkillsTool{skills: skills} }
func (t *ListSkillsTool) Name() string                 { return "list_skills" }
func (t *ListSkillsTool) Dangerous() bool              { return false }
func (t *ListSkillsTool) Description() string {
	return "List installed local skills from .cheese/skills/<name>/SKILL.md with short descriptions."
}
func (t *ListSkillsTool) Schema() map[string]any {
	return map[string]any{"type": "object", "properties": map[string]any{}}
}
func (t *ListSkillsTool) Execute(_ context.Context, _ map[string]any) (string, error) {
	if len(t.skills) == 0 {
		return "(no installed skills found)", nil
	}
	var sb strings.Builder
	for _, s := range t.skills {
		fmt.Fprintf(&sb, "- %s: %s\n", s.Name, s.Description)
	}
	return strings.TrimSpace(sb.String()), nil
}

type ReadSkillTool struct {
	skills map[string]Skill
}

func NewReadSkillTool(skills []Skill) *ReadSkillTool {
	m := make(map[string]Skill, len(skills))
	for _, s := range skills {
		m[s.Name] = s
	}
	return &ReadSkillTool{skills: m}
}
func (t *ReadSkillTool) Name() string    { return "read_skill" }
func (t *ReadSkillTool) Dangerous() bool { return false }
func (t *ReadSkillTool) Description() string {
	return "Read a local skill's SKILL.md instructions by skill name."
}
func (t *ReadSkillTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name": map[string]any{"type": "string", "description": "Skill folder name under .cheese/skills/."},
		},
		"required": []string{"name"},
	}
}
func (t *ReadSkillTool) Execute(_ context.Context, args map[string]any) (string, error) {
	name := firstString(args, "name", "skill")
	s, ok := t.skills[name]
	if !ok {
		return "", fmt.Errorf("read_skill: unknown skill %q", name)
	}
	b, err := os.ReadFile(s.Path)
	if err != nil {
		return "", fmt.Errorf("read_skill: %w", err)
	}
	if len(b) > maxSkillBytes {
		b = append(b[:maxSkillBytes], []byte("\n...[skill truncated at 128 KB]\n")...)
	}
	return string(b), nil
}

func (t *PluginTool) Name() string        { return t.name }
func (t *PluginTool) Dangerous() bool     { return t.dangerous }
func (t *PluginTool) DangerLevel() int    { return 3 }
func (t *PluginTool) Description() string { return t.description }
func (t *PluginTool) Schema() map[string]any {
	return t.schema
}
func (t *PluginTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	payload, err := json.Marshal(args)
	if err != nil {
		return "", fmt.Errorf("%s: marshal args: %w", t.name, err)
	}
	runCtx, cancel := context.WithTimeout(ctx, t.timeout)
	defer cancel()
	cmd := exec.CommandContext(runCtx, "bash", "-lc", t.command)
	cmd.Dir = t.dir
	cmd.Stdin = strings.NewReader(string(payload))
	cmd.Env = append(os.Environ(),
		"CHEESERAG_PLUGIN_ARGS="+string(payload),
		"CHEESERAG_WORKSPACE_ROOT="+currentWorkspaceRoot(),
	)
	out, err := cmd.CombinedOutput()
	text := strings.TrimSpace(string(out))
	if len(text) > 16*1024 {
		text = text[:16*1024] + "\n...[plugin output truncated]"
	}
	if runCtx.Err() == context.DeadlineExceeded {
		return "", fmt.Errorf("%s: timeout after %s", t.name, t.timeout)
	}
	if err != nil {
		return "", fmt.Errorf("%s: %w\n%s", t.name, err, text)
	}
	if text == "" {
		text = "(plugin completed with no output)"
	}
	return text, nil
}
