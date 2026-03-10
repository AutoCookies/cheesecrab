package spaces

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strconv"

	"github.com/gin-gonic/gin"
	
	"github.com/AutoCookies/cheesecrab-super/server/config"
	"github.com/AutoCookies/cheesecrab-super/server/llm"
	"github.com/AutoCookies/cheesecrab-super/server/models"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

type AIModelsSpace struct {
	cfg     *config.Config
	manager *models.Manager
	runner  *llm.Runner
}

func NewAIModelsSpace(cfg *config.Config, manager *models.Manager, runner *llm.Runner) *AIModelsSpace {
	return &AIModelsSpace{
		cfg:     cfg,
		manager: manager,
		runner:  runner,
	}
}

func (s *AIModelsSpace) Name() string {
	return "ai_models"
}

func (s *AIModelsSpace) RegisterRoutes(router *gin.RouterGroup) {
	// List local GGUF files in directory
	router.GET("/local", s.handleListLocal)
	
	// Pull a new model directly to the models directory
	router.POST("/pull", s.handlePull)
	
	// Delete a local model file
	router.DELETE("/:filename", s.handleDelete)
	
	// Start/Stop the cheesecrab server process
	router.POST("/server/start", s.handleServerStart)
	router.POST("/server/stop", s.handleServerStop)
	
	// OpenAI compatible endpoints - Proxy mapping directly to the underlying cheesecrab-server router
	router.Any("/proxy/*action", s.handleProxy)
}

func (s *AIModelsSpace) handleListLocal(c *gin.Context) {
	list, err := s.manager.ListLocal()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, list)
}

func (s *AIModelsSpace) handlePull(c *gin.Context) {
	var req struct {
		URL      string `json:"url" binding:"required"`
		Filename string `json:"filename" binding:"required"`
	}
	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Simple check, do it async to avoid blocking HTTP context, 
	// in a real app would want websockets or polling to track status
	go func() {
		err := s.manager.Pull(req.URL, req.Filename)
		if err != nil {
			utils.Log.Errorf("Error pulling model: %v", err)
		}
	}()
	
	c.JSON(http.StatusAccepted, gin.H{"message": "Pull started in background"})
}

func (s *AIModelsSpace) handleDelete(c *gin.Context) {
	filename := c.Param("filename")
	if filename == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "filename required"})
		return
	}
	
	if err := s.manager.Delete(filename); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "deleted"})
}

func (s *AIModelsSpace) handleServerStart(c *gin.Context) {
	if err := s.runner.Start(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "server started"})
}

func (s *AIModelsSpace) handleServerStop(c *gin.Context) {
	if err := s.runner.Stop(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "server stopped"})
}

func (s *AIModelsSpace) handleProxy(c *gin.Context) {
	if !s.runner.IsRunning() {
		if err := s.runner.Start(); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start underlying LLM server: " + err.Error()})
			return
		}
	}

	targetURL, _ := url.Parse(fmt.Sprintf("http://127.0.0.1:%s", strconv.Itoa(s.cfg.LLMPort)))
	
	proxy := &httputil.ReverseProxy{
		Director: func(req *http.Request) {
			req.URL.Scheme = targetURL.Scheme
			req.URL.Host = targetURL.Host
			req.Host = targetURL.Host // Required for some servers to accept the proxy request
			// The action is the remaining wildcard path, e.g. /v1/models
			req.URL.Path = c.Param("action")
		},
	}
	
	proxy.ServeHTTP(c.Writer, c.Request)
}
