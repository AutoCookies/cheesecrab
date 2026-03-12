package config

import (
	"os"
	"path/filepath"
	"strconv"
)

type Config struct {
	Port           int
	CheesecrabPath string
	ModelsDir      string
	LLMPort        int
	DatabasePath   string
}

func LoadConfig() *Config {
	home, _ := os.UserHomeDir()
	defaultModelsDir := filepath.Join(home, ".cheesecrab", "models")
	defaultDBPath := filepath.Join(home, ".cheesecrab", "cheesecrab.db")

	port := 11435
	if p := os.Getenv("PORT"); p != "" {
		port, _ = strconv.Atoi(p)
	}

	llmPort := 8081
	if p := os.Getenv("LLM_PORT"); p != "" {
		llmPort, _ = strconv.Atoi(p)
	}

	cheesecrabPath := os.Getenv("CHEESECRAB_PATH")
	if cheesecrabPath == "" {
		cwd, _ := os.Getwd()
		// Try cwd/build/bin first, then ../build/bin (if started from server/)
		cheesecrabPath = filepath.Join(cwd, "build", "bin", "cheese-server")
		if _, err := os.Stat(cheesecrabPath); os.IsNotExist(err) {
			cheesecrabPath = filepath.Join(filepath.Dir(cwd), "build", "bin", "cheese-server")
		}
	}

	modelsDir := os.Getenv("MODELS_DIR")
	if modelsDir == "" {
		modelsDir = defaultModelsDir
	}

	dbPath := os.Getenv("DB_PATH")
	if dbPath == "" {
		dbPath = defaultDBPath
	}

	// Ensure directories exist
	os.MkdirAll(modelsDir, 0755)
	os.MkdirAll(filepath.Dir(dbPath), 0755)

	return &Config{
		Port:           port,
		CheesecrabPath: cheesecrabPath,
		ModelsDir:      modelsDir,
		LLMPort:        llmPort,
		DatabasePath:   dbPath,
	}
}
