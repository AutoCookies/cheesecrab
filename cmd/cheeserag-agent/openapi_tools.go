package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// OpenAPITool represents a single endpoint dynamically loaded from a Swagger/OpenAPI spec.
type OpenAPITool struct {
	method      string
	path        string
	operationID string
	description string
	schema      map[string]any
	baseURL     string
}

func (t *OpenAPITool) Name() string {
	name := strings.ReplaceAll(t.operationID, "-", "_")
	if name == "" {
		// Fallback: method_path, e.g., get_api_v1_services
		cleanPath := strings.ReplaceAll(strings.ReplaceAll(t.path, "/", "_"), "{", "")
		cleanPath = strings.ReplaceAll(cleanPath, "}", "")
		name = strings.ToLower(t.method) + cleanPath
	}
	// Tools must usually match ^[a-zA-Z0-9_-]+$
	return name
}

func (t *OpenAPITool) Dangerous() bool {
	// GET requests are safe, others are potentially dangerous
	return t.method != "GET"
}

func (t *OpenAPITool) DangerLevel() int {
	if t.method == "GET" {
		return 0
	}
	return 2
}

func (t *OpenAPITool) Description() string {
	return fmt.Sprintf("Call API %s %s. %s", t.method, t.path, t.description)
}

func (t *OpenAPITool) Schema() map[string]any {
	return t.schema
}

func (t *OpenAPITool) Execute(ctx context.Context, args map[string]any) (string, error) {
	// Build the URL, replacing path parameters
	urlStr := t.baseURL + t.path
	
	// Query parameters and Path parameters extraction
	var bodyBytes []byte
	var err error
	
	for key, val := range args {
		// Replace path variable if it exists (e.g. {id})
		placeholder := fmt.Sprintf("{%s}", key)
		if strings.Contains(urlStr, placeholder) {
			urlStr = strings.ReplaceAll(urlStr, placeholder, fmt.Sprintf("%v", val))
			delete(args, key) // Remove from args once used in path
		}
	}
	
	if t.method == "GET" {
		// Append remaining args as query parameters
		if len(args) > 0 {
			var queryParams []string
			for k, v := range args {
				queryParams = append(queryParams, fmt.Sprintf("%s=%v", k, v))
			}
			urlStr += "?" + strings.Join(queryParams, "&")
		}
	} else {
		// For POST, PUT, PATCH, DELETE, serialize args to JSON body
		bodyBytes, err = json.Marshal(args)
		if err != nil {
			return "", fmt.Errorf("failed to marshal JSON body: %w", err)
		}
	}

	reqCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	var req *http.Request
	if len(bodyBytes) > 0 {
		req, err = http.NewRequestWithContext(reqCtx, t.method, urlStr, bytes.NewReader(bodyBytes))
		req.Header.Set("Content-Type", "application/json")
	} else {
		req, err = http.NewRequestWithContext(reqCtx, t.method, urlStr, nil)
	}

	if err != nil {
		return "", fmt.Errorf("build request error: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	limited := io.LimitReader(resp.Body, 16*1024) // 16KB limit
	raw, err := io.ReadAll(limited)
	if err != nil {
		return "", fmt.Errorf("failed to read response: %w", err)
	}

	return fmt.Sprintf("Status: %d\nBody:\n%s", resp.StatusCode, string(raw)), nil
}

// LoadOpenAPITools fetches an OpenAPI/Swagger JSON from a URL and converts endpoints into tools.
func LoadOpenAPITools(openapiURL string, baseURL string) ([]Tool, error) {
	resp, err := http.Get(openapiURL)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch OpenAPI spec: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("OpenAPI spec fetch returned status %d", resp.StatusCode)
	}

	var spec struct {
		Paths map[string]map[string]struct {
			OperationID string `json:"operationId"`
			Summary     string `json:"summary"`
			Description string `json:"description"`
			Parameters  []struct {
				Name     string `json:"name"`
				In       string `json:"in"`
				Required bool   `json:"required"`
				Schema   struct {
					Type string `json:"type"`
				} `json:"schema"`
			} `json:"parameters"`
		} `json:"paths"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&spec); err != nil {
		return nil, fmt.Errorf("failed to decode OpenAPI JSON: %w", err)
	}

	var loadedTools []Tool

	for path, methods := range spec.Paths {
		for method, op := range methods {
			method = strings.ToUpper(method)
			if method != "GET" && method != "POST" && method != "PUT" && method != "DELETE" && method != "PATCH" {
				continue
			}
			
			// For a 0.5B model, providing 200+ tools is overwhelming.
			// Let's filter to core endpoints (services and bookings)
			if !strings.HasPrefix(path, "/api/v1/services") && !strings.HasPrefix(path, "/api/v1/bookings") {
				continue
			}
			
			// Build a basic JSON schema for this tool
			properties := make(map[string]any)
			var required []string

			for _, param := range op.Parameters {
				properties[param.Name] = map[string]any{
					"type":        param.Schema.Type,
					"description": fmt.Sprintf("Parameter in %s", param.In),
				}
				if param.Required {
					required = append(required, param.Name)
				}
			}

			// In a full implementation, we would parse requestBody for POST/PUT.
			// For this MVP, we allow arbitrary extra arguments which will become the JSON body.
			properties["_extra"] = map[string]any{
				"type": "object",
				"description": "Additional JSON body properties",
			}

			schema := map[string]any{
				"type":       "object",
				"properties": properties,
			}
			if len(required) > 0 {
				schema["required"] = required
			}

			desc := op.Summary
			if desc == "" {
				desc = op.Description
			}
			
			tool := &OpenAPITool{
				method:      method,
				path:        path,
				operationID: op.OperationID,
				description: desc,
				schema:      schema,
				baseURL:     strings.TrimRight(baseURL, "/"),
			}
			loadedTools = append(loadedTools, tool)
		}
	}

	return loadedTools, nil
}
