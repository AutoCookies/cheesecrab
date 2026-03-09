package llm

import (
	"fmt"
	"os/exec"
	"path/filepath"
	"strconv"
	"sync"
	"time"

	"github.com/AutoCookies/cheesecrab-super/server/config"
	"github.com/AutoCookies/cheesecrab-super/server/utils"
)

type Runner struct {
	cmd    *exec.Cmd
	config *config.Config
	mu     sync.Mutex
}

var instance *Runner
var once sync.Once

func GetRunner(cfg *config.Config) *Runner {
	once.Do(func() {
		instance = &Runner{
			config: cfg,
		}
	})
	return instance
}

func (r *Runner) Start() error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.cmd != nil && r.cmd.Process != nil {
		utils.Log.Info("Cheesecrab server is already running")
		return nil
	}

	binPath, err := filepath.Abs(r.config.CheesecrabPath)
	if err != nil {
		return fmt.Errorf("invalid cheesecrab path: %v", err)
	}

	args := []string{
		"--models-dir", r.config.ModelsDir,
		"--port", strconv.Itoa(r.config.LLMPort),
		"--host", "127.0.0.1",
	}

	utils.Log.Infof("Starting cheesecrab server: %s %v", binPath, args)
	
	r.cmd = exec.Command(binPath, args...)
	
	// Pipe stderr and stdout to our logger if needed, or simply let it inherit
	// For now, let's keep it simple and just run it
	err = r.cmd.Start()
	if err != nil {
		return fmt.Errorf("failed to start cheesecrab server: %v", err)
	}

	utils.Log.Infof("Cheesecrab server started with PID %d", r.cmd.Process.Pid)
	
	// Wait a bit to ensure it doesn't crash immediately
	time.Sleep(1 * time.Second)
	
	// Background routine to wait for process exit
	go func() {
		err := r.cmd.Wait()
		utils.Log.Warnf("Cheesecrab server exited: %v", err)
		r.mu.Lock()
		r.cmd = nil
		r.mu.Unlock()
	}()

	return nil
}

func (r *Runner) Stop() error {
	r.mu.Lock()
	defer r.mu.Unlock()

	if r.cmd == nil || r.cmd.Process == nil {
		return nil
	}

	utils.Log.Info("Stopping cheesecrab server...")
	err := r.cmd.Process.Kill()
	if err != nil {
		return fmt.Errorf("failed to kill cheesecrab server: %v", err)
	}
	
	r.cmd = nil
	return nil
}

func (r *Runner) IsRunning() bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	return r.cmd != nil && r.cmd.Process != nil
}
