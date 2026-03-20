package main

import (
	"embed"
	"net/http"
	"os"
	"path/filepath"

	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/plugin"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	cfg := config.Load()
	home, _ := os.UserHomeDir()
	pluginDir := filepath.Join(home, ".cheesecrab", "plugins")

	// Chain asset handlers: Crabtable -> Plugin
	assetMiddleware := func(next http.Handler) http.Handler {
		return plugin.CrabtableHandler(cfg.CrabtableRoot)(
			plugin.AssetHandler(pluginDir)(next),
		)
	}

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Cheesecrab",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets:     assets,
			Middleware: assetMiddleware,
		},
		BackgroundColour: &options.RGBA{R: 13, G: 13, B: 13, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
