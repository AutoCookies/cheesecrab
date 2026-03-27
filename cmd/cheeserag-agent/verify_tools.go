package main

import (
	"context"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"
)

type HTTPCheckTool struct{}
type PortCheckTool struct{}

func NewHTTPCheckTool() *HTTPCheckTool { return &HTTPCheckTool{} }
func NewPortCheckTool() *PortCheckTool { return &PortCheckTool{} }

func (t *HTTPCheckTool) Name() string    { return "http_check" }
func (t *HTTPCheckTool) Dangerous() bool { return false }
func (t *HTTPCheckTool) Description() string {
	return "Check an HTTP endpoint status/body for app verification."
}

func (t *PortCheckTool) Name() string        { return "port_check" }
func (t *PortCheckTool) Dangerous() bool     { return false }
func (t *PortCheckTool) Description() string { return "Check whether TCP port is listening." }

func (t *HTTPCheckTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"url":           map[string]any{"type": "string", "description": "HTTP/HTTPS URL to check."},
			"method":        map[string]any{"type": "string", "description": "HTTP method, default GET."},
			"timeout_sec":   map[string]any{"type": "number", "description": "Timeout seconds (default 10)."},
			"expect_status": map[string]any{"type": "number", "description": "Optional exact expected status code."},
			"contains_text": map[string]any{"type": "string", "description": "Optional substring expected in body."},
		},
		"required": []string{"url"},
	}
}

func (t *PortCheckTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"host":        map[string]any{"type": "string", "description": "Host, default 127.0.0.1."},
			"port":        map[string]any{"type": "number", "description": "TCP port."},
			"timeout_sec": map[string]any{"type": "number", "description": "Timeout seconds (default 3)."},
		},
		"required": []string{"port"},
	}
}

func (t *HTTPCheckTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	u := firstString(args, "url", "endpoint", "uri")
	if u == "" {
		return "", fmt.Errorf("http_check: url required")
	}
	method := strings.ToUpper(firstString(args, "method"))
	if method == "" || method == "<NIL>" {
		method = http.MethodGet
	}
	timeout := 10 * time.Second
	if v, ok := firstNumber(args, "timeout_sec", "timeout"); ok && v > 0 {
		timeout = time.Duration(v * float64(time.Second))
	}
	runCtx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	req, err := http.NewRequestWithContext(runCtx, method, u, nil)
	if err != nil {
		return "", err
	}
	resp, err := doHTTPWithRetry(req, verifyRetryCount(), verifyRetryDelay())
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	body, _ := io.ReadAll(io.LimitReader(resp.Body, 4096))
	txt := string(body)

	if v, ok := firstNumber(args, "expect_status", "status"); ok && int(v) != resp.StatusCode {
		return "", fmt.Errorf("http_check: status=%d expected=%d body=%q", resp.StatusCode, int(v), oneLine(txt, 300))
	}
	if exp := firstString(args, "contains_text", "contains", "expect_contains"); exp != "" {
		if !strings.Contains(txt, exp) {
			return "", fmt.Errorf("http_check: body does not contain %q (status=%d)", exp, resp.StatusCode)
		}
	}
	return fmt.Sprintf("status=%d body=%q", resp.StatusCode, oneLine(txt, 300)), nil
}

func (t *PortCheckTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	host := firstString(args, "host", "hostname")
	if host == "" || host == "<NIL>" {
		host = "127.0.0.1"
	}
	port := 0
	if v, ok := firstNumber(args, "port"); ok {
		port = int(v)
	}
	if port <= 0 {
		// tolerate model using service names
		hint := strings.ToLower(firstString(args, "app", "service", "name"))
		switch {
		case strings.Contains(hint, "frontend"), strings.Contains(hint, "vite"):
			port = 5173
		case strings.Contains(hint, "backend"), strings.Contains(hint, "api"):
			port = 8080
		}
	}
	if port <= 0 || port > 65535 {
		return "", fmt.Errorf("port_check: valid port required")
	}
	timeout := 3 * time.Second
	if v, ok := firstNumber(args, "timeout_sec", "timeout"); ok && v > 0 {
		timeout = time.Duration(v * float64(time.Second))
	}
	var lastErr error
	for i := 0; i <= verifyRetryCount(); i++ {
		d := net.Dialer{Timeout: timeout}
		conn, err := d.DialContext(ctx, "tcp", net.JoinHostPort(host, strconv.Itoa(port)))
		if err == nil {
			_ = conn.Close()
			return fmt.Sprintf("listening=true host=%s port=%d attempts=%d", host, port, i+1), nil
		}
		lastErr = err
		if i < verifyRetryCount() {
			select {
			case <-ctx.Done():
				return "", ctx.Err()
			case <-time.After(verifyRetryDelay() * time.Duration(i+1)):
			}
		}
	}
	return fmt.Sprintf("listening=false host=%s port=%d attempts=%d err=%v", host, port, verifyRetryCount()+1, lastErr), nil
}

func firstString(args map[string]any, keys ...string) string {
	for _, k := range keys {
		if v, ok := args[k]; ok {
			s := strings.TrimSpace(fmt.Sprintf("%v", v))
			if s != "" && s != "<NIL>" {
				return s
			}
		}
	}
	return ""
}

func firstNumber(args map[string]any, keys ...string) (float64, bool) {
	for _, k := range keys {
		v, ok := args[k]
		if !ok {
			continue
		}
		switch x := v.(type) {
		case float64:
			return x, true
		case int:
			return float64(x), true
		case string:
			s := strings.TrimSpace(x)
			if n, err := strconv.ParseFloat(s, 64); err == nil {
				return n, true
			}
			if fields := strings.Fields(s); len(fields) > 0 {
				if n, err := strconv.ParseFloat(fields[0], 64); err == nil {
					return n, true
				}
			}
		}
	}
	return 0, false
}

func verifyRetryCount() int {
	n := 1
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_VERIFY_RETRIES")); v != "" {
		if p, err := strconv.Atoi(v); err == nil && p >= 0 {
			n = p
		}
	}
	if n > 5 {
		n = 5
	}
	return n
}

func verifyRetryDelay() time.Duration {
	ms := 350
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_VERIFY_RETRY_DELAY_MS")); v != "" {
		if p, err := strconv.Atoi(v); err == nil && p > 0 {
			ms = p
		}
	}
	if ms > 5000 {
		ms = 5000
	}
	return time.Duration(ms) * time.Millisecond
}

func doHTTPWithRetry(req *http.Request, retries int, baseDelay time.Duration) (*http.Response, error) {
	var lastErr error
	for i := 0; i <= retries; i++ {
		resp, err := http.DefaultClient.Do(req)
		if err == nil {
			return resp, nil
		}
		lastErr = err
		if i < retries {
			select {
			case <-req.Context().Done():
				return nil, req.Context().Err()
			case <-time.After(baseDelay * time.Duration(i+1)):
			}
		}
	}
	return nil, lastErr
}
