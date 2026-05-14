package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func configureWorkspaceRoot(path string) (string, error) {
	path = strings.TrimSpace(path)
	if path == "" {
		path = strings.TrimSpace(os.Getenv("CHEESERAG_EXEC_ROOT"))
	}
	if path == "" {
		return "", nil
	}
	abs, err := filepath.Abs(path)
	if err != nil {
		return "", err
	}
	info, err := os.Stat(abs)
	if err != nil {
		return "", err
	}
	if !info.IsDir() {
		return "", fmt.Errorf("workspace root %q is not a directory", abs)
	}
	if err := os.Setenv("CHEESERAG_EXEC_ROOT", abs); err != nil {
		return "", err
	}
	if err := os.Chdir(abs); err != nil {
		return "", err
	}
	return abs, nil
}

func currentWorkspaceRoot() string {
	return strings.TrimSpace(os.Getenv("CHEESERAG_EXEC_ROOT"))
}

func ensureAllowedPath(path string) error {
	if strings.TrimSpace(path) == "" {
		return nil
	}
	checkPath := path
	if !filepath.IsAbs(checkPath) {
		abs, err := filepath.Abs(checkPath)
		if err != nil {
			return err
		}
		checkPath = abs
	}
	info, err := os.Lstat(checkPath)
	if err == nil && info.Mode()&os.ModeSymlink != 0 {
		resolved, err := filepath.EvalSymlinks(checkPath)
		if err != nil {
			return err
		}
		checkPath = resolved
	} else if err != nil && !os.IsNotExist(err) {
		return err
	}
	if err := ensureAllowedCWD(filepath.Dir(checkPath)); err != nil {
		return err
	}
	return nil
}
