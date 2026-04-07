package main

import (
	"bytes"
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"syscall"
	"time"
)

type managedProc struct {
	Name      string    `json:"name"`
	Command   string    `json:"command"`
	CWD       string    `json:"cwd"`
	PID       int       `json:"pid"`
	StartedAt time.Time `json:"started_at"`
	LogPath   string    `json:"log_path"`
}

var (
	procMu   sync.Mutex
	procByID = map[string]*managedProc{}
)

type ProcStartTool struct{}
type ProcStatusTool struct{}
type ProcLogsTool struct{}
type ProcStopTool struct{}
type ProcListTool struct{}

func NewProcStartTool() *ProcStartTool   { return &ProcStartTool{} }
func NewProcStatusTool() *ProcStatusTool { return &ProcStatusTool{} }
func NewProcLogsTool() *ProcLogsTool     { return &ProcLogsTool{} }
func NewProcStopTool() *ProcStopTool     { return &ProcStopTool{} }
func NewProcListTool() *ProcListTool     { return &ProcListTool{} }

func (t *ProcStartTool) Name() string   { return "proc_start" }
func (t *ProcStatusTool) Name() string  { return "proc_status" }
func (t *ProcLogsTool) Name() string    { return "proc_logs" }
func (t *ProcStopTool) Name() string    { return "proc_stop" }
func (t *ProcListTool) Name() string    { return "proc_list" }
func (t *ProcStartTool) Dangerous() bool  { return true }
func (t *ProcStartTool) DangerLevel() int { return 2 }
func (t *ProcStatusTool) Dangerous() bool { return false }
func (t *ProcLogsTool) Dangerous() bool   { return false }
func (t *ProcStopTool) Dangerous() bool   { return true }
func (t *ProcStopTool) DangerLevel() int  { return 3 }
func (t *ProcListTool) Dangerous() bool   { return false }

func (t *ProcStartTool) Description() string {
	return "Start a long-running background process (dev server/test runner) and capture logs."
}
func (t *ProcStatusTool) Description() string {
	return "Get status of a managed background process by name."
}
func (t *ProcLogsTool) Description() string {
	return "Read recent logs from a managed background process."
}
func (t *ProcStopTool) Description() string {
	return "Stop a managed background process by name."
}
func (t *ProcListTool) Description() string {
	return "List all managed background processes and running state."
}

func (t *ProcStartTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name":       map[string]any{"type": "string", "description": "Unique process name."},
			"command":    map[string]any{"type": "string", "description": "Command to run in background."},
			"cwd":        map[string]any{"type": "string", "description": "Optional working directory."},
			"restart_if_running": map[string]any{"type": "boolean", "description": "If true, stop then restart existing process with same name."},
		},
		"required": []string{"name", "command"},
	}
}
func (t *ProcStatusTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name": map[string]any{"type": "string"},
		},
		"required": []string{"name"},
	}
}
func (t *ProcLogsTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name":      map[string]any{"type": "string"},
			"tail_lines": map[string]any{"type": "number", "description": "Default 40, max 400."},
		},
		"required": []string{"name"},
	}
}
func (t *ProcStopTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"name": map[string]any{"type": "string"},
		},
		"required": []string{"name"},
	}
}
func (t *ProcListTool) Schema() map[string]any {
	return map[string]any{"type": "object", "properties": map[string]any{}}
}

func (t *ProcStartTool) Execute(_ context.Context, args map[string]any) (string, error) {
	name, _ := args["name"].(string)
	command, _ := args["command"].(string)
	cwd, _ := args["cwd"].(string)
	restart, _ := args["restart_if_running"].(bool)
	name = strings.TrimSpace(name)
	command = strings.TrimSpace(command)
	if name == "" || command == "" {
		return "", fmt.Errorf("proc_start: name and command are required")
	}
	if err := ensureAllowedCommand(command); err != nil {
		return "", err
	}
	if err := ensureDeniedPatterns(command); err != nil {
		return "", err
	}

	procMu.Lock()
	_ = loadRegistryLocked()
	if p, ok := procByID[name]; ok {
		if !restart {
			msg := fmt.Sprintf("already managed name=%s pid=%d running=%v log=%s", p.Name, p.PID, pidRunning(p.PID), p.LogPath)
			procMu.Unlock()
			return msg, nil
		}
		_ = stopLocked(p)
		delete(procByID, name)
		_ = saveRegistryLocked()
	}
	procMu.Unlock()

	logDir := filepath.Join(os.TempDir(), "cheeserag-agent-logs")
	if err := os.MkdirAll(logDir, 0o755); err != nil {
		return "", err
	}
	logPath := filepath.Join(logDir, name+".log")
	lf, err := os.OpenFile(logPath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0o644)
	if err != nil {
		return "", err
	}
	defer lf.Close()

	cmd := exec.Command("bash", "-lc", command)
	if strings.TrimSpace(cwd) != "" {
		cmd.Dir = cwd
	}
	if err := ensureAllowedCWD(cmd.Dir); err != nil {
		return "", err
	}
	cmd.Stdout = lf
	cmd.Stderr = lf
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}
	if err := cmd.Start(); err != nil {
		return "", fmt.Errorf("proc_start: %w", err)
	}
	p := &managedProc{
		Name:      name,
		Command:   command,
		CWD:       cwd,
		PID:       cmd.Process.Pid,
		StartedAt: time.Now(),
		LogPath:   logPath,
	}
	procMu.Lock()
	procByID[name] = p
	_ = saveRegistryLocked()
	procMu.Unlock()
	go func() { _ = cmd.Wait() }()
	return fmt.Sprintf("started name=%s pid=%d log=%s", name, p.PID, p.LogPath), nil
}

func (t *ProcStatusTool) Execute(_ context.Context, args map[string]any) (string, error) {
	name := strings.TrimSpace(fmt.Sprintf("%v", args["name"]))
	if name == "" {
		return "", fmt.Errorf("proc_status: name required")
	}
	procMu.Lock()
	_ = loadRegistryLocked()
	p, ok := procByID[name]
	procMu.Unlock()
	if !ok {
		return fmt.Sprintf("not found: %s", name), nil
	}
	running := pidRunning(p.PID)
	age := time.Since(p.StartedAt).Round(time.Second)
	return fmt.Sprintf("name=%s running=%v pid=%d age=%s cwd=%q log=%s cmd=%q", p.Name, running, p.PID, age, p.CWD, p.LogPath, p.Command), nil
}

func (t *ProcLogsTool) Execute(_ context.Context, args map[string]any) (string, error) {
	name := strings.TrimSpace(fmt.Sprintf("%v", args["name"]))
	if name == "" {
		return "", fmt.Errorf("proc_logs: name required")
	}
	tail := 40
	if v, ok := args["tail_lines"].(float64); ok && v > 0 {
		tail = int(v)
	}
	if tail > 400 {
		tail = 400
	}
	procMu.Lock()
	_ = loadRegistryLocked()
	p, ok := procByID[name]
	procMu.Unlock()
	if !ok {
		return "", fmt.Errorf("proc_logs: process %q not found", name)
	}
	lines, err := tailFileLines(p.LogPath, tail)
	if err != nil {
		return "", err
	}
	if len(lines) == 0 {
		return "(no logs yet)", nil
	}
	return strings.Join(lines, "\n"), nil
}

func (t *ProcStopTool) Execute(_ context.Context, args map[string]any) (string, error) {
	name := strings.TrimSpace(fmt.Sprintf("%v", args["name"]))
	if name == "" {
		return "", fmt.Errorf("proc_stop: name required")
	}
	procMu.Lock()
	_ = loadRegistryLocked()
	p, ok := procByID[name]
	if !ok {
		procMu.Unlock()
		return fmt.Sprintf("not found: %s", name), nil
	}
	err := stopLocked(p)
	delete(procByID, name)
	_ = saveRegistryLocked()
	procMu.Unlock()
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("stopped name=%s pid=%d", p.Name, p.PID), nil
}

func (t *ProcListTool) Execute(_ context.Context, _ map[string]any) (string, error) {
	procMu.Lock()
	defer procMu.Unlock()
	_ = loadRegistryLocked()
	if len(procByID) == 0 {
		return "(no managed processes)", nil
	}
	names := make([]string, 0, len(procByID))
	for k := range procByID {
		names = append(names, k)
	}
	sort.Strings(names)
	lines := make([]string, 0, len(names))
	for _, n := range names {
		p := procByID[n]
		lines = append(lines, fmt.Sprintf("- name=%s running=%v pid=%d log=%s", p.Name, pidRunning(p.PID), p.PID, p.LogPath))
	}
	return strings.Join(lines, "\n"), nil
}

func stopLocked(p *managedProc) error {
	if p == nil || p.PID <= 0 {
		return nil
	}
	// kill process group
	_ = syscall.Kill(-p.PID, syscall.SIGTERM)
	time.Sleep(300 * time.Millisecond)
	_ = syscall.Kill(-p.PID, syscall.SIGKILL)
	return nil
}

func pidRunning(pid int) bool {
	if pid <= 0 {
		return false
	}
	pr, err := os.FindProcess(pid)
	if err != nil {
		return false
	}
	if err := pr.Signal(syscall.Signal(0)); err != nil {
		return false
	}
	return true
}

func registryFile() string {
	if p := strings.TrimSpace(os.Getenv("CHEESERAG_PROC_REGISTRY")); p != "" {
		return p
	}
	return filepath.Join(os.TempDir(), "cheeserag-agent-procs.json")
}

func loadRegistryLocked() error {
	path := registryFile()
	raw, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return nil
		}
		return err
	}
	var list []*managedProc
	if err := json.Unmarshal(raw, &list); err != nil {
		return err
	}
	procByID = map[string]*managedProc{}
	for _, p := range list {
		if p != nil && strings.TrimSpace(p.Name) != "" {
			procByID[p.Name] = p
		}
	}
	return nil
}

func saveRegistryLocked() error {
	path := registryFile()
	list := make([]*managedProc, 0, len(procByID))
	for _, p := range procByID {
		list = append(list, p)
	}
	sort.Slice(list, func(i, j int) bool { return list[i].Name < list[j].Name })
	b, err := json.MarshalIndent(list, "", "  ")
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		return err
	}
	var buf bytes.Buffer
	buf.Write(b)
	buf.WriteByte('\n')
	return os.WriteFile(path, buf.Bytes(), 0o644)
}

func tailFileLines(path string, n int) ([]string, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	buf := make([]string, 0, n)
	for sc.Scan() {
		buf = append(buf, sc.Text())
		if len(buf) > n {
			buf = buf[1:]
		}
	}
	if err := sc.Err(); err != nil {
		return nil, err
	}
	return buf, nil
}

