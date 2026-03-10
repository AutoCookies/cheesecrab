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

	files, err := os.ReadDir(m.config.ModelsDir)
	if err != nil {
		return nil, fmt.Errorf("failed to read models dir: %v", err)
	}

	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(file.Name(), ".gguf") {
			// Filter out vocab files which aren't runnable models
			if strings.HasPrefix(file.Name(), "ggml-vocab-") {
				continue
			}
			
			info, err := file.Info()
			if err != nil {
				continue
			}
			models = append(models, ModelInfo{
				Name: file.Name(),
				Path: filepath.Join(m.config.ModelsDir, file.Name()),
				Size: info.Size(),
			})
		}
	}

	return models, nil
}

// Pull downloads a model directly from a given URL to the models directory
func (m *Manager) Pull(url, filename string) error {
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
