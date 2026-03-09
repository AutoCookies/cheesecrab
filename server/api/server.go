package api

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/AutoCookies/cheesecrab-super/server/config"
	"github.com/AutoCookies/cheesecrab-super/server/llm"
	"github.com/AutoCookies/cheesecrab-super/server/spaces"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

type Server struct {
	router    *gin.Engine
	cfg       *config.Config
	registry  *spaces.Registry
	llmRunner *llm.Runner
}

func NewServer(cfg *config.Config, registry *spaces.Registry, llmRunner *llm.Runner) *Server {
	// Set Gin mode
	gin.SetMode(gin.ReleaseMode)
	
	r := gin.New()
	
	// Custom logging middleware via zap
	r.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s \"%s\" %s\"\n",
				param.ClientIP,
				param.TimeStamp.Format(time.RFC1123),
				param.Method,
				param.Path,
				param.Request.Proto,
				param.StatusCode,
				param.Latency,
				param.Request.UserAgent(),
				param.ErrorMessage,
		)
	}))
	r.Use(gin.Recovery())

	// CORS config could go here if separating frontend
	
	return &Server{
		router:    r,
		cfg:       cfg,
		registry:  registry,
		llmRunner: llmRunner,
	}
}

func (s *Server) SetupRoutes() {
	v1 := s.router.Group("/v1")
	
	// Expose spaces listing
	v1.GET("/spaces", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"spaces": s.registry.List()})
	})
	
	// General proxy for the loaded LLM - this enables drop-in OpenAI compatible usage
	// like /v1/chat/completions simply passing through
	v1.Any("/proxy/*action", func(c *gin.Context) {
		// Just rewrite to the ai_models space proxy endpoint structure
		c.Request.URL.Path = "/v1/spaces/ai_models/proxy" + c.Param("action")
		s.router.ServeHTTP(c.Writer, c.Request)
	})

	// Attach all spaces under /v1/spaces
	spacesGroup := v1.Group("/spaces")
	s.registry.AttachRoutes(spacesGroup)
}

func (s *Server) Run() {
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", s.cfg.Port),
		Handler: s.router,
	}

	// Run server in a goroutine so that it doesn't block.
	go func() {
		utils.Log.Infof("Cheesecrab Agent Server listening on %s\n", srv.Addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			utils.Log.Fatalf("listen: %s\n", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	utils.Log.Info("Shutting down server...")

	// Kill our cheesecrab process!
	s.llmRunner.Stop()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		utils.Log.Fatal("Server forced to shutdown:", err)
	}

	utils.Log.Info("Server exiting")
}
