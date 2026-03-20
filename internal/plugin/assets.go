package plugin

import (
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// AssetHandler implements the Wails AssetServer middleware for the plugin:// protocol.
func AssetHandler(pluginDir string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// Only handle plugin:// scheme (handled as paths starting with /plugin/ in standard HTTP)
			if !strings.HasPrefix(r.URL.Path, "/plugin/") {
				next.ServeHTTP(w, r)
				return
			}

			// URL: /plugin/<id>/<filepath>
			parts := strings.SplitN(strings.TrimPrefix(r.URL.Path, "/plugin/"), "/", 2)
			if len(parts) < 2 {
				http.Error(w, "invalid plugin path", http.StatusBadRequest)
				return
			}

			pluginID := parts[0]
			filePath := parts[1]

			// Security: Path traversal protection
			if strings.Contains(pluginID, "..") || strings.Contains(filePath, "..") {
				http.Error(w, "forbidden", http.StatusForbidden)
				return
			}

			fullPath := filepath.Join(pluginDir, pluginID, filePath)

			// Check if file exists
			if _, err := os.Stat(fullPath); os.IsNotExist(err) {
				http.Error(w, "not found", http.StatusNotFound)
				return
			}

			// Detect and set MIME type
			ext := filepath.Ext(filePath)
			contentType := mime.TypeByExtension(ext)
			if contentType == "" {
				contentType = "application/octet-stream"
			}
			
			// Force application/javascript for .js files if needed
			if ext == ".js" {
				contentType = "application/javascript"
			}

			w.Header().Set("Content-Type", contentType)
			w.Header().Set("Access-Control-Allow-Origin", "*")

			data, err := os.ReadFile(fullPath)
			if err != nil {
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}

			w.Write(data)
		})
	}
}

// CrabtableHandler serves Luckysheet assets from a disk path.
func CrabtableHandler(crabtableRoot string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if !strings.HasPrefix(r.URL.Path, "/crabtable/") {
				next.ServeHTTP(w, r)
				return
			}

			filePath := strings.TrimPrefix(r.URL.Path, "/crabtable/")
			fullPath := filepath.Join(crabtableRoot, filePath)

			if _, err := os.Stat(fullPath); os.IsNotExist(err) {
				http.Error(w, "not found", http.StatusNotFound)
				return
			}

			ext := filepath.Ext(filePath)
			contentType := mime.TypeByExtension(ext)
			if contentType == "" {
				contentType = "application/octet-stream"
			}
			if ext == ".js" {
				contentType = "application/javascript"
			}

			w.Header().Set("Content-Type", contentType)
			w.Header().Set("Access-Control-Allow-Origin", "*")

			data, err := os.ReadFile(fullPath)
			if err != nil {
				http.Error(w, "internal server error", http.StatusInternalServerError)
				return
			}

			w.Write(data)
		})
	}
}
