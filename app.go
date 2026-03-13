package main

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/plugin"
	cbproc "github.com/AutoCookies/cheesecrab/internal/process/cheesebrain"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx           context.Context
	pluginManager *plugin.PluginManager
	manager       *cbproc.Manager
}

// NewApp creates a new App application struct
func NewApp() *App {
	cfg := config.Load()
	home, _ := os.UserHomeDir()
	pluginDir := filepath.Join(home, ".cheesecrab", "plugins")
	// Note: We use a simple logger for now, 
	// in main.go we might want to share the same logger.
	logger := log.New(os.Stdout, "app ", log.LstdFlags)
	
	return &App{
		pluginManager: plugin.NewManager(pluginDir),
		manager:       cbproc.NewManager(cfg, logger),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// Start the cheesebrain engine in router mode on startup
	go func() {
		if err := a.manager.Start(ctx); err != nil {
			fmt.Printf("failed to start cheesebrain: %v\n", err)
			return
		}
		if err := a.manager.WaitReady(ctx); err != nil {
			fmt.Printf("cheesebrain not ready: %v\n", err)
		}
	}()
}

// InstallPlugin installs a plugin from a URL.
func (a *App) InstallPlugin(url string) error {
	return a.pluginManager.InstallPlugin(url)
}

// GetInstalledPlugins returns the list of installed plugins.
func (a *App) GetInstalledPlugins() ([]plugin.PluginManifest, error) {
	return a.pluginManager.GetInstalledPlugins()
}

// UninstallPlugin uninstalls a plugin.
func (a *App) UninstallPlugin(id string) error {
	return a.pluginManager.UninstallPlugin(id)
}

// PullModel starts pulling a model and emits progress events.
func (a *App) PullModel(name string) {
	go func() {
		payload, _ := json.Marshal(map[string]interface{}{
			"model":  name,
			"stream": true,
		})

		url := a.manager.URL()
		if url == "" {
			runtime.EventsEmit(a.ctx, "pull:error", "cheesebrain not started")
			return
		}

		resp, err := http.Post(url+"/api/pull", "application/json", bytes.NewBuffer(payload))
		if err != nil {
			runtime.EventsEmit(a.ctx, "pull:error", err.Error())
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			runtime.EventsEmit(a.ctx, "pull:error", fmt.Sprintf("failed to pull model: status %d", resp.StatusCode))
			return
		}

		scanner := bufio.NewScanner(resp.Body)
		for scanner.Scan() {
			line := scanner.Text()
			if line == "" {
				continue
			}
			var progress map[string]interface{}
			if err := json.Unmarshal([]byte(line), &progress); err == nil {
				runtime.EventsEmit(a.ctx, "pull:progress", progress)
			}
		}

		if err := scanner.Err(); err != nil {
			runtime.EventsEmit(a.ctx, "pull:error", err.Error())
		}
	}()
}

// GetModels returns the list of models available in the cheesebrain engine.
func (a *App) GetModels() ([]map[string]interface{}, error) {
	return a.manager.ListModels(a.ctx)
}

// LoadModel tells the cheesebrain engine to load a specific model.
func (a *App) LoadModel(name string) error {
	return a.manager.LoadModel(a.ctx, name)
}

// ChatCompletion proxies a chat request to the cheesebrain engine and streams the response.
func (a *App) ChatCompletion(request map[string]interface{}) {
	go func() {
		request["stream"] = true
		payload, _ := json.Marshal(request)

		url := a.manager.URL()
		if url == "" {
			runtime.EventsEmit(a.ctx, "chat:error", "cheesebrain not started")
			return
		}

		resp, err := http.Post(url+"/v1/chat/completions", "application/json", bytes.NewBuffer(payload))
		if err != nil {
			runtime.EventsEmit(a.ctx, "chat:error", err.Error())
			return
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			runtime.EventsEmit(a.ctx, "chat:error", fmt.Sprintf("failed to chat: status %d", resp.StatusCode))
			return
		}

		scanner := bufio.NewScanner(resp.Body)
		for scanner.Scan() {
			line := scanner.Text()
			if line == "" {
				continue
			}
			if len(line) > 6 && line[:6] == "data: " {
				data := line[6:]
				if data == "[DONE]" {
					runtime.EventsEmit(a.ctx, "chat:done", nil)
					return
				}
				var chunk map[string]interface{}
				if err := json.Unmarshal([]byte(data), &chunk); err == nil {
					runtime.EventsEmit(a.ctx, "chat:token", chunk)
				}
			}
		}

		if err := scanner.Err(); err != nil {
			runtime.EventsEmit(a.ctx, "chat:error", err.Error())
		}
	}()
}

// GetSwarmAgents queries the cheesebrain engine for multi-agent (swarm) metadata, if available.
// If the underlying server does not support this endpoint, it returns an empty list.
func (a *App) GetSwarmAgents() ([]map[string]interface{}, error) {
	url := a.manager.URL()
	if url == "" {
		return []map[string]interface{}{}, nil
	}

	resp, err := http.Get(url + "/v1/agents")
	if err != nil {
		return []map[string]interface{}{}, nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return []map[string]interface{}{}, nil
	}

	var result struct {
		Agents []map[string]interface{} `json:"agents"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return []map[string]interface{}{}, nil
	}

	return result.Agents, nil
}

