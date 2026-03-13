package plugin

import (
	"archive/zip"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// PluginManifest represents the manifest.json file inside a plugin.
type PluginManifest struct {
	ID           string `json:"id"`
	Name         string `json:"name"`
	Version      string `json:"version"`
	MainJS       string `json:"main_js"`
	EntryElement string `json:"entry_element"`
}

// PluginManager handles plugin installation, uninstallation and management.
type PluginManager struct {
	PluginDir string
}

// NewManager creates a new PluginManager centered at the given directory.
func NewManager(baseDir string) *PluginManager {
	return &PluginManager{
		PluginDir: baseDir,
	}
}

// InstallPlugin downloads and extracts a plugin from a ZIP URL.
func (pm *PluginManager) InstallPlugin(zipURL string) error {
	resp, err := http.Get(zipURL)
	if err != nil {
		return fmt.Errorf("failed to download plugin: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("failed to download plugin: status %d", resp.StatusCode)
	}

	// Read into a temporary file
	tmpFile, err := os.CreateTemp("", "cheesecrab-plugin-*.zip")
	if err != nil {
		return err
	}
	defer os.Remove(tmpFile.Name())
	defer tmpFile.Close()

	if _, err := io.Copy(tmpFile, resp.Body); err != nil {
		return err
	}

	return pm.extractPlugin(tmpFile.Name())
}

// GetInstalledPlugins returns a list of all installed plugin manifests.
func (pm *PluginManager) GetInstalledPlugins() ([]PluginManifest, error) {
	if _, err := os.Stat(pm.PluginDir); os.IsNotExist(err) {
		return []PluginManifest{}, nil
	}

	entries, err := os.ReadDir(pm.PluginDir)
	if err != nil {
		return nil, err
	}

	var manifests []PluginManifest
	for _, entry := range entries {
		if entry.IsDir() {
			manifestPath := filepath.Join(pm.PluginDir, entry.Name(), "manifest.json")
			data, err := os.ReadFile(manifestPath)
			if err != nil {
				continue
			}

			var m PluginManifest
			if err := json.Unmarshal(data, &m); err == nil {
				manifests = append(manifests, m)
			}
		}
	}
	return manifests, nil
}

// UninstallPlugin deletes a plugin by its ID.
func (pm *PluginManager) UninstallPlugin(id string) error {
	// Security: ensure ID doesn't contain path traversal
	if strings.Contains(id, "..") || strings.Contains(id, "/") || strings.Contains(id, "\\") {
		return fmt.Errorf("invalid plugin ID")
	}

	pluginPath := filepath.Join(pm.PluginDir, id)
	return os.RemoveAll(pluginPath)
}

func (pm *PluginManager) extractPlugin(zipPath string) error {
	r, err := zip.OpenReader(zipPath)
	if err != nil {
		return err
	}
	defer r.Close()

	// Find the ID from the manifest inside the zip first to determine the directory
	var pluginID string
	for _, f := range r.File {
		if f.Name == "manifest.json" {
			rc, err := f.Open()
			if err != nil {
				return err
			}
			var m PluginManifest
			if err := json.NewDecoder(rc).Decode(&m); err != nil {
				rc.Close()
				return fmt.Errorf("invalid manifest.json: %w", err)
			}
			rc.Close()
			pluginID = m.ID
			break
		}
	}

	if pluginID == "" {
		return fmt.Errorf("no manifest.json found in plugin zip")
	}

	dest := filepath.Join(pm.PluginDir, pluginID)
	if err := os.MkdirAll(dest, 0755); err != nil {
		return err
	}

	for _, f := range r.File {
		fpath := filepath.Join(dest, f.Name)

		// Security: Check for ZipSlip
		if !strings.HasPrefix(fpath, filepath.Clean(dest)+string(os.PathSeparator)) {
			return fmt.Errorf("invalid file path in zip: %s", fpath)
		}

		if f.FileInfo().IsDir() {
			os.MkdirAll(fpath, os.ModePerm)
			continue
		}

		if err := os.MkdirAll(filepath.Dir(fpath), os.ModePerm); err != nil {
			return err
		}

		outFile, err := os.OpenFile(fpath, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
		if err != nil {
			return err
		}

		rc, err := f.Open()
		if err != nil {
			outFile.Close()
			return err
		}

		_, err = io.Copy(outFile, rc)
		outFile.Close()
		rc.Close()

		if err != nil {
			return err
		}
	}

	return nil
}
