package utils

import (
	"sync"
	"time"
)

type LogEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Level     string    `json:"level"`
	Message   string    `json:"message"`
}

var (
	recentErrorLogs []LogEntry
	logMutex        sync.RWMutex
	maxLogs         = 100
)

func AddErrorLog(msg string) {
	logMutex.Lock()
	defer logMutex.Unlock()

	entry := LogEntry{
		Timestamp: time.Now(),
		Level:     "ERROR",
		Message:   msg,
	}

	recentErrorLogs = append(recentErrorLogs, entry)
	if len(recentErrorLogs) > maxLogs {
		recentErrorLogs = recentErrorLogs[1:] // Keep last 100
	}
}

func GetErrorLogs() []LogEntry {
	logMutex.RLock()
	defer logMutex.RUnlock()
	// Return a copy to prevent race conditions during JSON serialization
	cpy := make([]LogEntry, len(recentErrorLogs))
	copy(cpy, recentErrorLogs)
	return cpy
}

func ClearErrorLogs() {
	logMutex.Lock()
	defer logMutex.Unlock()
	recentErrorLogs = []LogEntry{}
}
