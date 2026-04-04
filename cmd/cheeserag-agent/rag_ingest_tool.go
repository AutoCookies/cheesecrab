package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

// RAGIngestTool ingests local files directly into PomaiDB via the POST /v1/ingest endpoint.
type RAGIngestTool struct {
	base   string
	client *http.Client
}

func NewRAGIngestTool(baseURL string) *RAGIngestTool {
	return &RAGIngestTool{
		base:   strings.TrimRight(baseURL, "/"),
		client: &http.Client{Timeout: 120 * time.Second},
	}
}

func (t *RAGIngestTool) Name() string { return "rag_ingest" }

func (t *RAGIngestTool) Dangerous() bool { return false }

func (t *RAGIngestTool) Description() string {
	return "Ingests a local file (PDF, TXT, MD) into PomaiDB so it can be vector searched later via rag_retrieve. Provide absolute file_path."
}

func (t *RAGIngestTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"query": map[string]any{
				"type":        "string",
				"description": "Absolute path to the file to ingest (e.g., /path/to/doc.pdf). Do not use the word query, use the file path.",
			},
		},
		"required": []string{"query"},
	}
}

func (t *RAGIngestTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	pathRaw, ok := args["query"]
	if !ok {
		// Fallback just in case
		pathRaw, ok = args["file_path"]
		if !ok {
			return "", fmt.Errorf("rag_ingest: missing query (file_path)")
		}
	}
	path, ok := pathRaw.(string)
	if !ok {
		return "", fmt.Errorf("rag_ingest: file_path must be string")
	}

	path = strings.TrimSpace(path)
	if path == "" {
		return "", fmt.Errorf("rag_ingest: missing file_path")
	}

	file, err := os.Open(path)
	if err != nil {
		return "", fmt.Errorf("rag_ingest: access failed: %w", err)
	}
	defer file.Close()

	var requestBody bytes.Buffer
	writer := multipart.NewWriter(&requestBody)

	// doc_id field
	docField, err := writer.CreateFormField("doc_id")
	if err != nil {
		return "", err
	}
	docField.Write([]byte("123")) // Arbitrary ID for CLI ingest

	// file field
	part, err := writer.CreateFormFile("file", filepath.Base(path))
	if err != nil {
		return "", err
	}
	_, err = io.Copy(part, file)
	if err != nil {
		return "", err
	}

	if err := writer.Close(); err != nil {
		return "", err
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, t.base+"/v1/ingest", &requestBody)
	if err != nil {
		return "", err
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	
	apiKey := os.Getenv("CHEESE_API_KEY")
	if apiKey == "" {
		apiKey = "cheese-admin-key"
	}
	req.Header.Set("X-API-Key", apiKey)

	resp, err := t.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("rag_ingest: API request failed: %w", err)
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("rag_ingest: server returned %d: %s", resp.StatusCode, string(respBody))
	}

	return fmt.Sprintf("Success! Ingested into PomaiDB: %s", string(respBody)), nil
}
