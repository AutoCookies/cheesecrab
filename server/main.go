package main

import (
	"github.com/AutoCookies/cheesecrab-super/server/api"
	"github.com/AutoCookies/cheesecrab-super/server/config"
	"github.com/AutoCookies/cheesecrab-super/server/llm"
	"github.com/AutoCookies/cheesecrab-super/server/models"
	"github.com/AutoCookies/cheesecrab-super/server/spaces"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

func main() {
	// 1. Initialize Logger
	utils.InitLogger()
	defer utils.SyncLogger()
	
	utils.Log.Info("Starting Cheesecrab Agent Server...")

	// 2. Load Configuration
	cfg := config.LoadConfig()
	utils.Log.Infof("Loaded config: Port=%d, ModelsDir=%s", cfg.Port, cfg.ModelsDir)

	// 3. Initialize managers
	modelManager := models.NewManager(cfg)
	runner := llm.GetRunner(cfg)

	// 4. Initialize Spaces Registry
	registry := spaces.NewRegistry()
	
	// Register the core spaces
	registry.Register(spaces.NewAIModelsSpace(cfg, modelManager, runner))
	registry.Register(spaces.NewOSSpace())
	registry.Register(spaces.NewAgentSpace(cfg))
	
	// 5. Initialize API Server
	server := api.NewServer(cfg, registry, runner)
	server.SetupRoutes()

	// 6. Start the LLM Subprocess automatically in the background
	go func() {
		err := runner.Start()
		if err != nil {
			utils.Log.Errorf("Background LLM server failed to start: %v", err)
		}
	}()

	// 7. Start listening!
	server.Run()
}
