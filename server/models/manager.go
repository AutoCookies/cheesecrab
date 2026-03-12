package models

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/AutoCookies/cheesecrab-super/server/config"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

type ModelInfo struct {
	Name string `json:"name"`
	Path string `json:"path"`
	Size int64  `json:"size"`
}

type Manager struct {
	config *config.Config
}

func NewManager(cfg *config.Config) *Manager {
	return &Manager{
		config: cfg,
	}
}

// ListLocal scans the models directory for .gguf files
func (m *Manager) ListLocal() ([]ModelInfo, error) {
	var models []ModelInfo

	err := filepath.WalkDir(m.config.ModelsDir, func(path string, d os.DirEntry, err error) error {
		if err != nil {
			return err
		}
		
		if !d.IsDir() && strings.HasSuffix(d.Name(), ".gguf") {
			// Filter out vocab files which aren't runnable models
			if strings.HasPrefix(d.Name(), "ggml-vocab-") {
				return nil
			}
			
			info, err := d.Info()
			if err != nil {
				return nil
			}
			
			// Align naming with C++ core: use filename without extension
			name := strings.TrimSuffix(d.Name(), ".gguf")
			
			models = append(models, ModelInfo{
				Name: name, // Matches C++ core's model.name/id
				Path: path,
				Size: info.Size(),
			})
		}
		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to read models dir: %v", err)
	}

	return models, nil
}

// GetAgentModel returns the best available model for the agent.
// It prioritizes models in the "agent/" subdirectory, then the root models/ dir.
func (m *Manager) GetAgentModel() (string, error) {
	// 1. Check models/agent/
	agentDir := filepath.Join(m.config.ModelsDir, "agent")
	if entries, err := os.ReadDir(agentDir); err == nil {
		for _, e := range entries {
			if !e.IsDir() && strings.HasSuffix(e.Name(), ".gguf") {
				return filepath.Join("agent", e.Name()), nil
			}
		}
	}

	// 2. Fallback: check root models dir
	entries, err := os.ReadDir(m.config.ModelsDir)
	if err != nil {
		return "", err
	}
	for _, e := range entries {
		if !e.IsDir() && strings.HasSuffix(e.Name(), ".gguf") {
			// Skip vocab files
			if strings.HasPrefix(e.Name(), "ggml-vocab-") {
				continue
			}
			return e.Name(), nil
		}
	}

	return "", fmt.Errorf("no models found in %s", m.config.ModelsDir)
}

// Pull downloads a model directly from a given URL to the models directory
func (m *Manager) Pull(url, filename string) error {
	// Prevent path traversal: filename must be a single path component
	if filename != filepath.Base(filename) || strings.Contains(filename, "..") {
		return fmt.Errorf("invalid filename: must be a single path component")
	}
	destPath := filepath.Join(m.config.ModelsDir, filename)

	// Create the file
	out, err := os.Create(destPath)
	if err != nil {
		return fmt.Errorf("failed to create file: %v", err)
	}
	defer out.Close()

	utils.Log.Infof("Starting download from %s to %s", url, destPath)

	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		os.Remove(destPath)
		return fmt.Errorf("failed to download: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		os.Remove(destPath)
		return fmt.Errorf("bad status: %s", resp.Status)
	}

	// Write the body to file
	_, err = io.Copy(out, resp.Body)
	if err != nil {
		os.Remove(destPath)
		return fmt.Errorf("failed to write file: %v", err)
	}

	utils.Log.Infof("Successfully downloaded %s", filename)
	return nil
}

// Delete removes a local model file
func (m *Manager) Delete(filename string) error {
	destPath := filepath.Join(m.config.ModelsDir, filename)
	
	// Ensure they are not trying to delete outside the models dir
	if !strings.HasPrefix(filepath.Clean(destPath), filepath.Clean(m.config.ModelsDir)) {
		return fmt.Errorf("invalid file path")
	}

	err := os.Remove(destPath)
	if err != nil {
		return fmt.Errorf("failed to delete model: %v", err)
	}

	utils.Log.Infof("Deleted model %s", filename)
	return nil
}
