package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"syscall"
	"time"

	frontendui "github.com/AutoCookies/cheesecrab/frontend"
	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/httpgateway"
	cbproc "github.com/AutoCookies/cheesecrab/internal/process/cheesebrain"
	"github.com/AutoCookies/cheesecrab/internal/telemetry"
)

func main() {
	cfg := config.Load()

	rootCtx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	logger := log.New(os.Stdout, "cheesecrab ", log.LstdFlags|log.Lmicroseconds)

	manager := cbproc.NewManager(rootCtx, cfg, logger)

	// If an explicit model was configured via env var, start cheesebrain now.
	// Otherwise cheesebrain stays offline until the user clicks "Load Engine"
	// in the Registry UI.
	if cfg.ModelPath != "" {
		if err := manager.Start(rootCtx); err != nil {
			logger.Fatalf("failed to start cheesebrain: %v", err)
		}
		if err := manager.WaitReady(rootCtx); err != nil {
			logger.Fatalf("cheesebrain not ready: %v", err)
		}
	} else {
		logger.Printf("cheesebrain deferred — open the Registry and load a model")
	}

	telemetrySvc := telemetry.NewService(rootCtx, logger, manager.Events())

	// frontendui.FS() returns the embedded Svelte assets when built with
	// -tags prod, or nil in development (gateway falls back to disk/WebRoot).
	uiFS := frontendui.FS()
	gw := httpgateway.New(cfg, manager, telemetrySvc, logger, uiFS)

	srv := &http.Server{
		Addr:    cfg.ListenAddr,
		Handler: gw.Router(),
	}

	go func() {
		logger.Printf("HTTP server listening on %s", cfg.ListenAddr)

		hasUI := uiFS != nil
		if !hasUI && cfg.WebRoot != "" {
			if _, err := os.Stat(cfg.WebRoot); err == nil {
				hasUI = true
			}
		}

		if hasUI {
			url := fmt.Sprintf("http://%s", cfg.ListenAddr)
			logger.Printf("Web UI ready — opening %s", url)
			openBrowser(url)
		}

		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatalf("http server failed: %v", err)
		}
	}()

	<-rootCtx.Done()

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		logger.Printf("http shutdown error: %v", err)
	}

	if err := manager.Stop(shutdownCtx); err != nil {
		logger.Printf("cheesebrain shutdown error: %v", err)
	}
}

// openBrowser launches the default system browser at the given URL.
// Runs in the background and silently ignores errors (not critical).
func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "linux":
		cmd = exec.Command("xdg-open", url)
	case "darwin":
		cmd = exec.Command("open", url)
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	default:
		return
	}
	cmd.Stdout = nil
	cmd.Stderr = nil
	_ = cmd.Start()
}
