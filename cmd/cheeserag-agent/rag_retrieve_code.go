package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

type RAGRetrieveCodeTool struct {
	base   string
	client *http.Client
}

func NewRAGRetrieveCodeTool(baseURL string) *RAGRetrieveCodeTool {
	return &RAGRetrieveCodeTool{
		base:   strings.TrimRight(baseURL, "/"),
		client: &http.Client{Timeout: 120 * time.Second},
	}
}

func (t *RAGRetrieveCodeTool) Name() string { return "rag_retrieve_code" }
func (t *RAGRetrieveCodeTool) Dangerous() bool { return false }

func (t *RAGRetrieveCodeTool) Description() string {
	return "Search the AST workspace codebase index for matching logic, functions, or classes. " +
		"Use this instead of generic grep when trying to locate codebase components semantically."
}

func (t *RAGRetrieveCodeTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"query": map[string]any{
				"type":        "string",
				"description": "Verbatim semantic question about the code or symbol name.",
			},
			"top_k": map[string]any{
				"type":        "number",
				"description": "Maximum number of code blocks to return (default 5)",
			},
		},
		"required": []string{"query"},
	}
}

func (t *RAGRetrieveCodeTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	q, _ := args["query"].(string)
	if strings.TrimSpace(q) == "" {
		return "", fmt.Errorf("rag_retrieve_code: query required")
	}
	topK := 5.0
	if v, ok := args["top_k"].(float64); ok && v > 0 {
		topK = v
	}
	body := map[string]any{
		"query": q,
		"top_k": int(topK),
		"membrane": "workspace_code",
	}
	
	raw, err := json.Marshal(body)
	if err != nil {
		return "", err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, t.base+"/v1/retrieve", bytes.NewReader(raw))
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", "application/json")
	apiKey := os.Getenv("CHEESE_API_KEY")
	if apiKey == "" {
		apiKey = "cheese-admin-key"
	}
	req.Header.Set("X-API-Key", apiKey)
	
	resp, err := doRequestWithRetry(ctx, t.client, req, ragRetryCount(), 300*time.Millisecond)
	if err != nil {
		return "", err
	}
	
	var out struct {
		Context string `json:"context"`
		Error   string `json:"error"`
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(resp.Body)
	if err := json.Unmarshal(b, &out); err != nil {
		return "", fmt.Errorf("rag_retrieve_code decode error: %v", err)
	}
	
	if out.Error != "" {
		return "", fmt.Errorf("rag_retrieve_code: %s", out.Error)
	}
	
	if out.Context == "" {
		return "(no matching code blocks found in workspace)", nil
	}
	
	return out.Context, nil
}
