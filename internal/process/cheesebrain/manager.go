package cheesebrain

import (
	"bufio"
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"
	"time"

	"github.com/AutoCookies/cheesecrab/internal/config"
)

// EngineEvent describes a state transition or notable event emitted by the
// cheesebrain process and consumed by telemetry.
type EngineEvent struct {
	Time    time.Time
	State   string
	Model   string
	Message string
	RawLine string
}

// Manager owns the lifecycle of the cheesebrain C++ server process.
type Manager struct {
	cfg *config.Config
	log *log.Logger

	mu  sync.RWMutex
	cmd *exec.Cmd
	url string

	events chan EngineEvent
}

// NewManager constructs a new Manager.
func NewManager(cfg *config.Config, logger *log.Logger) *Manager {
	return &Manager{
		cfg:    cfg,
		log:    logger,
		events: make(chan EngineEvent, 64),
	}
}

// Start launches the cheesebrain process on a dynamically allocated local port.
func (m *Manager) Start(ctx context.Context) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.cmd != nil {
		return errors.New("cheesebrain already started")
	}

	bin := m.cfg.CheesebrainBin
	if !filepath.IsAbs(bin) {
		cwd, _ := os.Getwd()
		bin = filepath.Join(cwd, bin)
	}

	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return fmt.Errorf("allocate port: %w", err)
	}
	port := ln.Addr().(*net.TCPAddr).Port
	_ = ln.Close()

	baseURL := fmt.Sprintf("http://127.0.0.1:%d", port)

	// Cheesebrain requires a model path; we surface a clear error if it is
	// not configured rather than attempting to guess.
	if m.cfg.ModelPath == "" {
		return errors.New("CHEESEBRAIN_MODEL not set; please set it to a GGUF model path")
	}

	args := []string{
		"-m", m.cfg.ModelPath,
		"--port", fmt.Sprint(port),
	}

	cmd := exec.CommandContext(ctx, bin, args...)

	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("cheesebrain stdout pipe: %w", err)
	}
	stderr, err := cmd.StderrPipe()
	if err != nil {
		return fmt.Errorf("cheesebrain stderr pipe: %w", err)
	}

	if err := cmd.Start(); err != nil {
		return fmt.Errorf("start cheesebrain: %w", err)
	}

	m.log.Printf("started cheesebrain pid=%d on %s", cmd.Process.Pid, baseURL)
	m.cmd = cmd
	m.url = baseURL

	// Emit an initial starting event.
	m.emitEvent(EngineEvent{
		Time:    time.Now(),
		State:   "starting",
		Model:   m.cfg.ModelPath,
		Message: "cheesebrain process launched",
	})

	// Stream and parse stdout/stderr for telemetry events.
	go m.streamOutput("stdout", stdout)
	go m.streamOutput("stderr", stderr)

	go func() {
		if err := cmd.Wait(); err != nil {
			m.log.Printf("cheesebrain exited with error: %v", err)
			m.emitEvent(EngineEvent{
				Time:    time.Now(),
				State:   "crashed",
				Model:   m.cfg.ModelPath,
				Message: err.Error(),
			})
		} else {
			m.log.Printf("cheesebrain exited")
			m.emitEvent(EngineEvent{
				Time:    time.Now(),
				State:   "stopped",
				Model:   m.cfg.ModelPath,
				Message: "cheesebrain exited normally",
			})
		}
	}()

	return nil
}

// URL returns the base URL of the cheesebrain HTTP API.
func (m *Manager) URL() string {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return m.url
}

// Events exposes a read-only stream of EngineEvent updates for telemetry.
func (m *Manager) Events() <-chan EngineEvent {
	return m.events
}

// WaitReady blocks until the cheesebrain HTTP API responds successfully or
// the context is canceled.
func (m *Manager) WaitReady(ctx context.Context) error {
	client := &http.Client{Timeout: 2 * time.Second}
	deadline := time.Now().Add(60 * time.Second)

	url := m.URL() + "/v1/models"

	for {
		if time.Now().After(deadline) {
			return errors.New("timed out waiting for cheesebrain readiness")
		}

		req, _ := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
		resp, err := client.Do(req)
		if err == nil && resp.StatusCode/100 == 2 {
			_ = resp.Body.Close()
			m.emitEvent(EngineEvent{
				Time:    time.Now(),
				State:   "ready",
				Model:   m.cfg.ModelPath,
				Message: "cheesebrain HTTP API is ready",
			})
			return nil
		}
		if resp != nil {
			_ = resp.Body.Close()
		}

		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(1 * time.Second):
		}
	}
}

// Stop attempts graceful shutdown of the cheesebrain process followed by a
// forced kill if it does not exit before the context deadline.
func (m *Manager) Stop(ctx context.Context) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if m.cmd == nil || m.cmd.Process == nil {
		return nil
	}

	done := make(chan struct{})
	go func() {
		_ = m.cmd.Wait()
		close(done)
	}()

	if err := m.cmd.Process.Signal(os.Interrupt); err != nil {
		m.log.Printf("failed to send SIGINT to cheesebrain: %v", err)
	}

	select {
	case <-done:
		return nil
	case <-ctx.Done():
		m.log.Printf("force-killing cheesebrain")
		_ = m.cmd.Process.Kill()
		<-done
		return ctx.Err()
	}
}

func (m *Manager) emitEvent(ev EngineEvent) {
	select {
	case m.events <- ev:
	default:
		// Drop if the channel is full to avoid blocking the process manager.
	}
}

func (m *Manager) streamOutput(stream string, r io.Reader) {
	scanner := bufio.NewScanner(r)
	for scanner.Scan() {
		line := scanner.Text()
		m.log.Printf("cheesebrain %s: %s", stream, line)
		m.parseLine(line)
	}
	if err := scanner.Err(); err != nil {
		m.log.Printf("cheesebrain %s read error: %v", stream, err)
	}
}

func (m *Manager) parseLine(line string) {
	ev := EngineEvent{
		Time:    time.Now(),
		Model:   m.cfg.ModelPath,
		RawLine: line,
	}

	low := strings.ToLower(line)
	switch {
	case strings.Contains(low, "load_model:"):
		ev.State = "loading"
		ev.Message = line
	case strings.Contains(low, "loaded meta data") || strings.Contains(low, "file format = gguf"):
		ev.State = "loading"
		ev.Message = line
	case strings.Contains(low, "binding port"):
		ev.State = "starting"
		ev.Message = line
	case strings.Contains(low, "error") || strings.Contains(low, "fatal"):
		ev.State = "error"
		ev.Message = line
	default:
		// Do not emit events for unrecognized lines.
		return
	}

	m.emitEvent(ev)
}


