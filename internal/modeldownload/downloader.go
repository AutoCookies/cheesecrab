// Package modeldownload handles direct HTTP(S) GGUF model downloads.
// It streams NDJSON progress events compatible with the Ollama /api/pull format
// so the existing frontend progress bar works without changes.
package modeldownload

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// Progress is one line of NDJSON streamed to the client.
type Progress struct {
	Status    string `json:"status"`
	Completed int64  `json:"completed,omitempty"`
	Total     int64  `json:"total,omitempty"`
	Error     string `json:"error,omitempty"`
}

// NormalizeURL converts common HuggingFace blob/tree page URLs to their
// direct download (resolve) equivalents, and returns the filename.
//
//	https://huggingface.co/Org/Repo/blob/main/model.gguf
//	→ https://huggingface.co/Org/Repo/resolve/main/model.gguf
func NormalizeURL(raw string) (downloadURL, filename string, err error) {
	raw = strings.TrimSpace(raw)
	u, err := url.Parse(raw)
	if err != nil || u.Scheme == "" {
		return "", "", fmt.Errorf("not a valid URL: %q", raw)
	}

	// HuggingFace blob → resolve
	if strings.Contains(u.Host, "huggingface.co") {
		u.Path = strings.Replace(u.Path, "/blob/", "/resolve/", 1)
		u.Path = strings.Replace(u.Path, "/tree/", "/resolve/", 1)
	}

	// Derive filename from the last path segment
	filename = filepath.Base(u.Path)
	if filename == "." || filename == "/" {
		return "", "", fmt.Errorf("cannot derive filename from URL: %q", raw)
	}
	if !strings.HasSuffix(strings.ToLower(filename), ".gguf") {
		return "", "", fmt.Errorf("URL does not point to a .gguf file: %q", raw)
	}

	return u.String(), filename, nil
}

// Download fetches a GGUF model from downloadURL into modelsDir,
// streaming NDJSON progress lines to w. Safe to call concurrently for
// different files; same-file concurrent calls will overwrite each other.
func Download(ctx context.Context, downloadURL, modelsDir string, w io.Writer) {
	emit := func(p Progress) {
		b, _ := json.Marshal(p)
		_, _ = fmt.Fprintf(w, "%s\n", b)
		if f, ok := w.(http.Flusher); ok {
			f.Flush()
		}
	}

	if err := os.MkdirAll(modelsDir, 0o755); err != nil {
		emit(Progress{Status: "error", Error: "cannot create models dir: " + err.Error()})
		return
	}

	_, filename, err := NormalizeURL(downloadURL)
	if err != nil {
		emit(Progress{Status: "error", Error: err.Error()})
		return
	}

	destPath := filepath.Join(modelsDir, filename)
	tmpPath := destPath + ".tmp"

	emit(Progress{Status: "connecting"})

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, downloadURL, nil)
	if err != nil {
		emit(Progress{Status: "error", Error: err.Error()})
		return
	}
	req.Header.Set("User-Agent", "Cheesecrab/1.0")

	client := &http.Client{Timeout: 0} // streaming — no global timeout
	resp, err := client.Do(req)
	if err != nil {
		emit(Progress{Status: "error", Error: "request failed: " + err.Error()})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		emit(Progress{Status: "error", Error: fmt.Sprintf("server returned %d %s", resp.StatusCode, resp.Status)})
		return
	}

	total := resp.ContentLength // -1 if unknown

	out, err := os.Create(tmpPath)
	if err != nil {
		emit(Progress{Status: "error", Error: "cannot create file: " + err.Error()})
		return
	}
	defer func() { _ = out.Close() }()

	emit(Progress{Status: "downloading", Completed: 0, Total: max64(total, 0)})

	var downloaded int64
	buf := make([]byte, 32*1024)
	lastReport := time.Now()

	for {
		if ctx.Err() != nil {
			_ = out.Close()
			_ = os.Remove(tmpPath)
			emit(Progress{Status: "error", Error: "cancelled"})
			return
		}
		n, readErr := resp.Body.Read(buf)
		if n > 0 {
			if _, writeErr := out.Write(buf[:n]); writeErr != nil {
				_ = out.Close()
				_ = os.Remove(tmpPath)
				emit(Progress{Status: "error", Error: "write error: " + writeErr.Error()})
				return
			}
			downloaded += int64(n)
			if time.Since(lastReport) >= 500*time.Millisecond || readErr == io.EOF {
				emit(Progress{Status: "downloading", Completed: downloaded, Total: max64(total, downloaded)})
				lastReport = time.Now()
			}
		}
		if readErr == io.EOF {
			break
		}
		if readErr != nil {
			_ = out.Close()
			_ = os.Remove(tmpPath)
			emit(Progress{Status: "error", Error: "read error: " + readErr.Error()})
			return
		}
	}

	_ = out.Close()
	if err := os.Rename(tmpPath, destPath); err != nil {
		_ = os.Remove(tmpPath)
		emit(Progress{Status: "error", Error: "finalise error: " + err.Error()})
		return
	}

	emit(Progress{Status: "success", Completed: downloaded, Total: downloaded})
}

func max64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}
