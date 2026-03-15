package config

import (
	"os"
	"path/filepath"
)

// Config holds runtime configuration for the cheesecrab daemon.
type Config struct {
	// ListenAddr is the HTTP listen address for the public API.
	ListenAddr string

	// WebRoot is the directory from which to serve the web UI (e.g. "frontend/dist").
	// If empty or the directory does not exist, only the API is served.
	WebRoot string

	// CheesebrainBin is the path to the cheesebrain cheese-server binary.
	CheesebrainBin string

	// ModelPath is an optional explicit model path. If empty, the daemon
	// will start cheesebrain in quickstart mode.
	ModelPath string

	// ModelsDir is the directory where GGUF models are stored for the router.
	ModelsDir string

	// CrabtableRoot is the directory from which to serve Crab Table (Luckysheet) assets (e.g. "crabtable/dist").
	// If empty or the directory does not exist, the Crab Table view falls back to CDN.
	CrabtableRoot string
}

// Load constructs a Config using sensible defaults, overridable via env vars.
//
// Environment variables:
//   - CHEESECRAB_LISTEN_ADDR  (default "127.0.0.1:8080")
//   - CHEESECRAB_WEB_ROOT     (default "frontend/dist"; empty = API only)
//   - CHEESEBRAIN_ROOT        (default "./cheesebrain")
//   - CHEESEBRAIN_BIN         (default "$CHEESEBRAIN_ROOT/build/bin/cheese-server")
//   - CHEESEBRAIN_MODEL       (optional explicit model path)
func Load() *Config {
	listen := getEnvDefault("CHEESECRAB_LISTEN_ADDR", "127.0.0.1:8080")
	webRoot := getEnvDefault("CHEESECRAB_WEB_ROOT", "frontend/dist")
	if webRoot != "" && !filepath.IsAbs(webRoot) {
		cwd, err := os.Getwd()
		if err == nil {
			webRoot = filepath.Join(cwd, webRoot)
		}
	}

	root := getEnvDefault("CHEESEBRAIN_ROOT", "cheesebrain")
	if !filepath.IsAbs(root) {
		cwd, err := os.Getwd()
		if err == nil {
			root = filepath.Join(cwd, root)
		}
	}

	bin := os.Getenv("CHEESEBRAIN_BIN")
	if bin == "" {
		bin = filepath.Join(root, "build", "bin", "cheese-server")
	}

	model := os.Getenv("CHEESEBRAIN_MODEL")

	home, _ := os.UserHomeDir()
	modelsDir := getEnvDefault("CHEESEBRAIN_MODELS_DIR", filepath.Join(home, ".cheesecrab", "models"))

	crabtableRoot := getEnvDefault("CHEESECRAB_CRABTABLE_ROOT", "crabtable/dist")
	if crabtableRoot != "" && !filepath.IsAbs(crabtableRoot) {
		cwd, err := os.Getwd()
		if err == nil {
			crabtableRoot = filepath.Join(cwd, crabtableRoot)
		}
	}

	return &Config{
		ListenAddr:     listen,
		WebRoot:        webRoot,
		CheesebrainBin: bin,
		ModelPath:      model,
		ModelsDir:      modelsDir,
		CrabtableRoot:  crabtableRoot,
	}
}

func getEnvDefault(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

