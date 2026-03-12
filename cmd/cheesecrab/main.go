package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/AutoCookies/cheesecrab/internal/config"
	"github.com/AutoCookies/cheesecrab/internal/httpgateway"
	"github.com/AutoCookies/cheesecrab/internal/telemetry"
	cbproc "github.com/AutoCookies/cheesecrab/internal/process/cheesebrain"
)

func main() {
	cfg := config.Load()

	rootCtx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	logger := log.New(os.Stdout, "cheesecrab ", log.LstdFlags|log.Lmicroseconds)

	manager := cbproc.NewManager(cfg, logger)
	if err := manager.Start(rootCtx); err != nil {
		logger.Fatalf("failed to start cheesebrain: %v", err)
	}

	telemetrySvc := telemetry.NewService(rootCtx, logger, manager.Events())

	if err := manager.WaitReady(rootCtx); err != nil {
		logger.Fatalf("cheesebrain not ready: %v", err)
	}

	gw := httpgateway.New(cfg, manager, telemetrySvc, logger)

	srv := &http.Server{
		Addr:    cfg.ListenAddr,
		Handler: gw.Router(),
	}

	go func() {
		logger.Printf("HTTP server listening on %s", cfg.ListenAddr)
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

