package config

import (
	"os"
	"path/filepath"
)

// Config holds runtime configuration for the cheesecrab daemon.
type Config struct {
	// ListenAddr is the HTTP listen address for the public API.
	ListenAddr string

	// CheesebrainBin is the path to the cheesebrain cheese-server binary.
	CheesebrainBin string

	// ModelPath is an optional explicit model path. If empty, the daemon
	// will start cheesebrain in quickstart mode.
	ModelPath string
}

// Load constructs a Config using sensible defaults, overridable via env vars.
//
// Environment variables:
//   - CHEESECRAB_LISTEN_ADDR  (default "127.0.0.1:8080")
//   - CHEESEBRAIN_ROOT        (default "./cheesebrain")
//   - CHEESEBRAIN_BIN         (default "$CHEESEBRAIN_ROOT/build/bin/cheese-server")
//   - CHEESEBRAIN_MODEL       (optional explicit model path)
func Load() *Config {
	listen := getEnvDefault("CHEESECRAB_LISTEN_ADDR", "127.0.0.1:8080")

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

	return &Config{
		ListenAddr:    listen,
		CheesebrainBin: bin,
		ModelPath:     model,
	}
}

func getEnvDefault(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}

