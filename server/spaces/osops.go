package spaces

import (
	"bytes"
	"net/http"
	"os/exec"
	"runtime"

	"github.com/gin-gonic/gin"

	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

type OSSpace struct{}

func NewOSSpace() *OSSpace {
	return &OSSpace{}
}

func (s *OSSpace) Name() string {
	return "os"
}

func (s *OSSpace) RegisterRoutes(router *gin.RouterGroup) {
	// Execute an arbitrary shell command safely (careful here)
	router.POST("/exec", s.handleExec)
	
	// Get real-time OS health stats
	router.GET("/health", s.handleHealth)
	
	// Basic info about the host
	router.GET("/info", s.handleInfo)
}

func (s *OSSpace) handleExec(c *gin.Context) {
	var req struct {
		Command string   `json:"command" binding:"required"`
		Args    []string `json:"args"`
	}
	
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cmd := exec.Command(req.Command, req.Args...)
	
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	
	err := cmd.Run()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":  err.Error(),
			"stderr": stderr.String(),
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"stdout": out.String(),
		"stderr": stderr.String(),
	})
}

func (s *OSSpace) handleHealth(c *gin.Context) {
	health, err := utils.GetSysHealth()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	c.JSON(http.StatusOK, health)
}

func (s *OSSpace) handleInfo(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"os":   runtime.GOOS,
		"arch": runtime.GOARCH,
		"cpus": runtime.NumCPU(),
	})
}
