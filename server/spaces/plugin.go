package spaces

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

// AgentTool matches the OpenAI function calling schema
type AgentTool struct {
	Name        string         `json:"name"`
	Description string         `json:"description"`
	Parameters  json.RawMessage `json:"parameters"` // JSON Schema
}

type PluginManifest struct {
	ID         string      `json:"id"`
	Name       string      `json:"name"`
	AgentTools []AgentTool `json:"agent_tools"`
}

type PluginSpace struct {
	mu              sync.RWMutex
	enabledPlugins  map[string]bool
	pluginManifests map[string]PluginManifest
	pluginPorts     map[string]int
	nextPort        int
}

func NewPluginSpace() *PluginSpace {
	return &PluginSpace{
		enabledPlugins:  make(map[string]bool),
		pluginManifests: make(map[string]PluginManifest),
		pluginPorts:     make(map[string]int),
		nextPort:        11440, // Start dynamic ports from here
	}
}

func (s *PluginSpace) Name() string {
	return "plugins"
}

func (s *PluginSpace) RegisterRoutes(rg *gin.RouterGroup) {
	rg.GET("/active", s.handleActive)
	rg.GET("/available", s.handleAvailable)
	rg.POST("/toggle", s.handleToggle)
	rg.POST("/install", s.handleInstall)
	rg.POST("/uninstall", s.handleUninstall)
	rg.Any("/ipc/:id/*action", s.handleIPC)
}

func (s *PluginSpace) getPluginsDir() string {
	pluginsDir := "plugins"
	if _, err := os.Stat(pluginsDir); os.IsNotExist(err) {
		pluginsDir = filepath.Join("..", "plugins")
	}
	return pluginsDir
}

func (s *PluginSpace) Sync() {
	pluginsDir := s.getPluginsDir()
	entries, err := os.ReadDir(pluginsDir)
	if err != nil {
		utils.Log.Errorf("[Microkernel] Failed to sync plugins: %v", err)
		return
	}

	for _, entry := range entries {
		if entry.IsDir() && !strings.HasPrefix(entry.Name(), ".") {
			id := entry.Name()
			s.mu.RLock()
			enabled := s.enabledPlugins[id]
			s.mu.RUnlock()

			if !enabled {
				utils.Log.Infof("[Microkernel] Auto-enabling discovered plugin: %s", id)
				manifest, err := s.loadManifest(id)
				if err == nil {
					s.mu.Lock()
					port := s.nextPort
					s.nextPort++
					s.pluginPorts[id] = port
					s.pluginManifests[id] = manifest
					s.enabledPlugins[id] = true
					s.mu.Unlock()
					go s.startBackend(id, port)
				}
			}
		}
	}
}

func (s *PluginSpace) handleAvailable(c *gin.Context) {
	// Periodic sync on discovery request
	s.Sync()

	pluginsDir := s.getPluginsDir()
	utils.Log.Infof("[Microkernel] Scanning plugins in: %s", pluginsDir)

	entries, err := os.ReadDir(pluginsDir)
	if err != nil {
		utils.Log.Errorf("[Microkernel] Failed to read plugins directory: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read plugins directory"})
		return
	}

	var available []PluginManifest
	for _, entry := range entries {
		utils.Log.Infof("[Microkernel] Found entry: %s (isDir: %v)", entry.Name(), entry.IsDir())
		if entry.IsDir() && !strings.HasPrefix(entry.Name(), ".") {
			manifest, err := s.loadManifest(entry.Name())
			if err == nil {
				available = append(available, manifest)
			} else {
				utils.Log.Warnf("[Microkernel] Skipping plugin '%s': %v", entry.Name(), err)
			}
		}
	}

	utils.Log.Infof("[Microkernel] Found %d available plugins", len(available))
	c.JSON(http.StatusOK, gin.H{"plugins": available})
}

func (s *PluginSpace) handleActive(c *gin.Context) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	
	active := []string{}
	for id, enabled := range s.enabledPlugins {
		if enabled {
			active = append(active, id)
		}
	}
	c.JSON(http.StatusOK, gin.H{"active": active})
}

func (s *PluginSpace) handleToggle(c *gin.Context) {
	var req struct {
		ID      string `json:"id" binding:"required"`
		Enabled bool   `json:"enabled"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.Enabled {
		// Parse manifest to discover tools
		manifest, err := s.loadManifest(req.ID)
		if err != nil {
			utils.Log.Errorf("[Microkernel] Failed to load manifest for %s: %v", req.ID, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load plugin manifest"})
			return
		}
		
		s.mu.Lock()
		port := s.nextPort
		s.nextPort++
		s.pluginPorts[req.ID] = port
		s.pluginManifests[req.ID] = manifest
		s.enabledPlugins[req.ID] = true
		s.mu.Unlock()

		// Start backend if it exists
		s.startBackend(req.ID, port)
	} else {
		s.mu.Lock()
		delete(s.enabledPlugins, req.ID)
		delete(s.pluginManifests, req.ID)
		delete(s.pluginPorts, req.ID)
		s.mu.Unlock()
	}

	status := "disabled"
	if req.Enabled {
		status = "enabled"
	}
	utils.Log.Infof("[Microkernel] Plugin '%s' is now %s.", req.ID, status)
	
	c.JSON(http.StatusOK, gin.H{"status": "success", "id": req.ID, "enabled": req.Enabled})
}

func (s *PluginSpace) loadManifest(id string) (PluginManifest, error) {
	// Plugins are in ../plugins/ relative to the server binary or in ./plugins if running from root
	// We'll check both.
	manifestPath := filepath.Join("plugins", id, "manifest.json")
	if _, err := os.Stat(manifestPath); os.IsNotExist(err) {
		manifestPath = filepath.Join("..", "plugins", id, "manifest.json")
	}

	data, err := os.ReadFile(manifestPath)
	if err != nil {
		return PluginManifest{}, fmt.Errorf("read manifest: %w", err)
	}

	var m PluginManifest
	if err := json.Unmarshal(data, &m); err != nil {
		return PluginManifest{}, fmt.Errorf("unmarshal manifest: %w", err)
	}
	return m, nil
}

// GetActiveTools returns all tools provided by currently enabled plugins
func (s *PluginSpace) GetActiveTools() []*DynamicPluginTool {
	s.mu.RLock()
	defer s.mu.RUnlock()

	var allTools []*DynamicPluginTool
	for id, enabled := range s.enabledPlugins {
		if enabled {
			if m, ok := s.pluginManifests[id]; ok {
				for _, t := range m.AgentTools {
					allTools = append(allTools, &DynamicPluginTool{
						id:    id,
						tool:  t,
						space: s,
					})
				}
			}
		}
	}
	return allTools
}

// DynamicPluginTool bridges a plugin skill to the CrabAgent's registry
type DynamicPluginTool struct {
	id    string
	tool  AgentTool
	space *PluginSpace
}

func (t *DynamicPluginTool) Name() string        { return t.tool.Name }
func (t *DynamicPluginTool) Description() string { return t.tool.Description }
func (t *DynamicPluginTool) Dangerous() bool     { return false } // Plugins currently non-dangerous by default
func (t *DynamicPluginTool) Schema() map[string]any {
	var m map[string]any
	json.Unmarshal(t.tool.Parameters, &m)
	return m
}
func (t *DynamicPluginTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	t.space.mu.RLock()
	port := t.space.pluginPorts[t.id]
	t.space.mu.RUnlock()

	if port == 0 {
		return "", fmt.Errorf("plugin %s not enabled or backend not started", t.id)
	}

	// For simple skills like 'create_note', the backend endpoint is the tool name itself
	targetURL := fmt.Sprintf("http://127.0.0.1:%d/%s", port, t.tool.Name)
	
	body, _ := json.Marshal(args)
	utils.Log.Infof("[CCPSP] Executing dynamic skill: %s via %s", t.tool.Name, targetURL)

	resp, err := http.Post(targetURL, "application/json", strings.NewReader(string(body)))
	if err != nil {
		return "", fmt.Errorf("skill execution failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return "", fmt.Errorf("plugin returned error status: %d", resp.StatusCode)
	}

	var result map[string]any
	json.NewDecoder(resp.Body).Decode(&result)
	
	resJSON, _ := json.Marshal(result)
	return string(resJSON), nil
}

func (s *PluginSpace) handleInstall(c *gin.Context) {
	var req struct {
		Repo string `json:"repo" binding:"required"`
		ID   string `json:"id" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	utils.Log.Infof("[Microkernel] Installing plugin '%s' from %s", req.ID, req.Repo)

	// Step 1: Check if already exists
	targetPath := filepath.Join("plugins", req.ID)
	if _, err := os.Stat(targetPath); err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Plugin already installed"})
		return
	}

	// Step 2: Execute git submodule add
	cmd := exec.Command("git", "submodule", "add", req.Repo, targetPath)
	output, err := cmd.CombinedOutput()
	if err != nil {
		utils.Log.Errorf("[Microkernel] Installation failed: %s", string(output))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Installation failed", "details": string(output)})
		return
	}

	utils.Log.Infof("[Microkernel] Successfully installed '%s'", req.ID)
	
	// Auto-enable after install
	manifest, err := s.loadManifest(req.ID)
	if err == nil {
		s.mu.Lock()
		port := s.nextPort
		s.nextPort++
		s.pluginPorts[req.ID] = port
		s.pluginManifests[req.ID] = manifest
		s.enabledPlugins[req.ID] = true
		s.mu.Unlock()
		go s.startBackend(req.ID, port)
	}

	c.JSON(http.StatusOK, gin.H{"status": "installed", "id": req.ID})
}

func (s *PluginSpace) handleUninstall(c *gin.Context) {
	var req struct {
		ID string `json:"id" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	utils.Log.Infof("[Microkernel] Uninstalling plugin '%s'", req.ID)

	// Step 1: Force disable if enabled
	s.mu.Lock()
	delete(s.enabledPlugins, req.ID)
	delete(s.pluginManifests, req.ID)
	s.mu.Unlock()

	// Step 2: Remove git submodule and directory
	targetPath := filepath.Join("plugins", req.ID)
	
	// Check if it's a git submodule
	if _, err := os.Stat(filepath.Join(targetPath, ".git")); err == nil || os.IsNotExist(err) {
		// Native submodule removal
		cmd := exec.Command("git", "rm", "-f", targetPath)
		output, err := cmd.CombinedOutput()
		if err != nil {
			utils.Log.Errorf("[Microkernel] git rm failed for %s: %s", req.ID, string(output))
			// Fallback: manual deletion if git fails or it wasn't a proper submodule
			os.RemoveAll(targetPath)
		}
	} else {
		// Just a regular directory
		os.RemoveAll(targetPath)
	}
	
	// Clean up .git/modules if it exists (optional but cleaner)
	// exec.Command("rm", "-rf", filepath.Join(".git", "modules", "plugins", req.ID)).Run()

	utils.Log.Infof("[Microkernel] Successfully uninstalled '%s'", req.ID)
	c.JSON(http.StatusOK, gin.H{"status": "uninstalled", "id": req.ID})
}

func (s *PluginSpace) startBackend(id string, port int) {
	// Paths
	binPath := filepath.Join("plugins", id, "bin", "linux-x64", id+"-backend")
	if _, err := os.Stat(binPath); os.IsNotExist(err) {
		binPath = filepath.Join("..", "plugins", id, "bin", "linux-x64", id+"-backend")
	}

	if _, err := os.Stat(binPath); err == nil {
		utils.Log.Infof("[Microkernel] Starting backend for '%s' on port %d...", id, port)
		cmd := exec.Command(binPath, "--port", fmt.Sprintf("%d", port))
		// Optional: capture stdout/stderr to logs
		err := cmd.Start()
		if err != nil {
			utils.Log.Errorf("[Microkernel] Failed to start backend for %s: %v", id, err)
		}
	} else {
		utils.Log.Warnf("[Microkernel] No backend binary found for '%s' at %s", id, binPath)
	}
}

func (s *PluginSpace) handleIPC(c *gin.Context) {
	id := c.Param("id")
	action := strings.TrimPrefix(c.Param("action"), "/") // e.g. "notes"

	s.mu.RLock()
	enabled := s.enabledPlugins[id]
	port := s.pluginPorts[id]
	s.mu.RUnlock()

	if !enabled || port == 0 {
		utils.Log.Warnf("[Microkernel] Blocked IPC call to dormant plugin '%s': %s", id, action)
		c.JSON(http.StatusForbidden, gin.H{"error": "Plugin is dormant."})
		return
	}

	// Proxy to plugin backend
	targetURL := fmt.Sprintf("http://127.0.0.1:%d/%s", port, action)
	if c.Request.URL.RawQuery != "" {
		targetURL += "?" + c.Request.URL.RawQuery
	}

	utils.Log.Infof("[Microkernel] Routing IPC to %s -> %s", id, targetURL)
	
	// Complex proxying for all methods
	client := &http.Client{}
	proxyReq, err := http.NewRequest(c.Request.Method, targetURL, c.Request.Body)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to create proxy request"})
		return
	}
	
	// Copy headers
	for k, v := range c.Request.Header {
		proxyReq.Header[k] = v
	}

	resp, err := client.Do(proxyReq)
	if err != nil {
		utils.Log.Errorf("[Microkernel] IPC Proxy failed for %s: %v", id, err)
		c.JSON(http.StatusBadGateway, gin.H{"error": "Plugin backend unreachable"})
		return
	}
	defer resp.Body.Close()

	// Stream status and body back
	c.Status(resp.StatusCode)
	for k, v := range resp.Header {
		c.Header(k, v[0])
	}
	c.DataFromReader(resp.StatusCode, resp.ContentLength, resp.Header.Get("Content-Type"), resp.Body, nil)
}
