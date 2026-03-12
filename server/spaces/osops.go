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

func (s *OSSpace) RegisterRoutes(r *gin.RouterGroup) {
	r.GET("/health", s.handleHealth)
	r.GET("/info", s.handleInfo)
	r.POST("/exec", s.handleExec)
	r.GET("/logs", s.handleLogs)
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

func (s *OSSpace) handleLogs(c *gin.Context) {
	logs := utils.GetErrorLogs()
	c.JSON(http.StatusOK, logs)
}
