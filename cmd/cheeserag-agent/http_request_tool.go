package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

const httpRequestMaxBodyBytes = 16 * 1024 // 16 KB response cap

// HttpRequestTool executes a generic HTTP request and returns the status code
// plus the response body (truncated at 16 KB). Useful for API testing, webhook
// debugging, and interacting with local or remote HTTP services.
type HttpRequestTool struct{}

func (t *HttpRequestTool) Name() string      { return "http_request" }
func (t *HttpRequestTool) Dangerous() bool   { return false }
func (t *HttpRequestTool) DangerLevel() int  { return 0 }
func (t *HttpRequestTool) Description() string {
	return "Execute an HTTP request (GET/POST/PUT/DELETE/PATCH) and return the status code and response body. " +
		"Supports custom headers and a request body."
}

func (t *HttpRequestTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"url": map[string]any{
				"type":        "string",
				"description": "Full URL to request (required).",
			},
			"method": map[string]any{
				"type":        "string",
				"description": "HTTP method: GET, POST, PUT, DELETE, PATCH (default: GET).",
			},
			"headers": map[string]any{
				"type":        "object",
				"description": "Optional map of request headers, e.g. {\"Content-Type\": \"application/json\"}.",
				"additionalProperties": map[string]any{"type": "string"},
			},
			"body": map[string]any{
				"type":        "string",
				"description": "Optional request body (e.g. JSON string for POST/PUT).",
			},
			"timeout": map[string]any{
				"type":        "integer",
				"description": "Request timeout in seconds (default: 30).",
			},
		},
		"required": []string{"url"},
	}
}

func (t *HttpRequestTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	urlStr, _ := args["url"].(string)
	if strings.TrimSpace(urlStr) == "" {
		return "", fmt.Errorf("http_request: url is required")
	}

	method := "GET"
	if m, ok := args["method"].(string); ok && strings.TrimSpace(m) != "" {
		method = strings.ToUpper(strings.TrimSpace(m))
	}

	timeoutSec := 30
	if v, ok := args["timeout"].(float64); ok && v > 0 {
		timeoutSec = int(v)
	}

	var bodyReader io.Reader
	if bodyStr, ok := args["body"].(string); ok && bodyStr != "" {
		bodyReader = bytes.NewBufferString(bodyStr)
	}

	reqCtx, cancel := context.WithTimeout(ctx, time.Duration(timeoutSec)*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(reqCtx, method, urlStr, bodyReader)
	if err != nil {
		return "", fmt.Errorf("http_request: build request: %w", err)
	}

	if headers, ok := args["headers"].(map[string]any); ok {
		for k, v := range headers {
			if vs, ok := v.(string); ok {
				req.Header.Set(k, vs)
			}
		}
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("http_request: %w", err)
	}
	defer resp.Body.Close()

	limited := io.LimitReader(resp.Body, httpRequestMaxBodyBytes+1)
	raw, err := io.ReadAll(limited)
	if err != nil {
		return "", fmt.Errorf("http_request: read body: %w", err)
	}

	body := string(raw)
	truncated := false
	if len(raw) > httpRequestMaxBodyBytes {
		body = string(raw[:httpRequestMaxBodyBytes])
		truncated = true
	}

	var sb strings.Builder
	fmt.Fprintf(&sb, "status: %d %s\n", resp.StatusCode, http.StatusText(resp.StatusCode))
	fmt.Fprintf(&sb, "body:\n%s", body)
	if truncated {
		sb.WriteString("\n…[body truncated at 16 KB]")
	}
	return sb.String(), nil
}
