package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"time"
)

// WebSearchTool performs a DuckDuckGo HTML search and returns top results.
// No API key required.
type WebSearchTool struct {
	client     *http.Client
	maxResults int
}

func NewWebSearchTool(maxResults int) *WebSearchTool {
	if maxResults <= 0 {
		maxResults = 5
	}
	return &WebSearchTool{
		client:     &http.Client{Timeout: 15 * time.Second},
		maxResults: maxResults,
	}
}

func (t *WebSearchTool) Name() string    { return "web_search" }
func (t *WebSearchTool) Dangerous() bool { return false }
func (t *WebSearchTool) Description() string {
	return "Search the web using DuckDuckGo and return the top results with titles, URLs, and snippets. No API key required."
}
func (t *WebSearchTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"query": map[string]any{
				"type":        "string",
				"description": "Search query string",
			},
			"num_results": map[string]any{
				"type":        "number",
				"description": fmt.Sprintf("Number of results to return (default: %d, max: 10)", t.maxResults),
			},
		},
		"required": []string{"query"},
	}
}

func (t *WebSearchTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	query, _ := args["query"].(string)
	if query == "" {
		return "", fmt.Errorf("web_search: query is required")
	}

	n := t.maxResults
	if v, ok := args["num_results"].(float64); ok && v > 0 {
		n = int(v)
		if n > 10 {
			n = 10
		}
	}

	searchURL := "https://html.duckduckgo.com/html/?q=" + url.QueryEscape(query)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, searchURL, nil)
	if err != nil {
		return "", fmt.Errorf("web_search: %w", err)
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (compatible; CrabAgent/1.0)")
	req.Header.Set("Accept", "text/html")
	req.Header.Set("Accept-Language", "en-US,en;q=0.9")

	resp, err := t.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("web_search: request failed: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(io.LimitReader(resp.Body, 512*1024))
	if err != nil {
		return "", fmt.Errorf("web_search: read error: %w", err)
	}

	results := parseDDGResults(string(body), n)
	if len(results) == 0 {
		return fmt.Sprintf("No results found for %q", query), nil
	}

	var sb strings.Builder
	sb.WriteString(fmt.Sprintf("Search results for %q:\n\n", query))
	for i, r := range results {
		sb.WriteString(fmt.Sprintf("%d. %s\n   %s\n   %s\n\n", i+1, r.title, r.url, r.snippet))
	}
	return strings.TrimRight(sb.String(), "\n"), nil
}

type searchResult struct {
	title   string
	url     string
	snippet string
}

// parseDDGResults extracts search results from DuckDuckGo HTML output.
// It uses simple string scanning — no HTML parser dependency.
func parseDDGResults(html string, maxN int) []searchResult {
	var results []searchResult

	// DuckDuckGo HTML search wraps results in <div class="result">
	// Each result has an <a class="result__a"> for title+URL and
	// a <a class="result__snippet"> or <div class="result__snippet"> for snippet.
	// We extract these using simple marker scanning.

	remaining := html
	for len(results) < maxN && len(remaining) > 0 {
		// Find result block start
		blockStart := strings.Index(remaining, `class="result `)
		if blockStart == -1 {
			blockStart = strings.Index(remaining, `class="result__body"`)
		}
		if blockStart == -1 {
			break
		}

		// Find the next result block to delimit this one
		nextBlock := strings.Index(remaining[blockStart+1:], `class="result `)
		var block string
		if nextBlock == -1 {
			block = remaining[blockStart:]
			remaining = ""
		} else {
			block = remaining[blockStart : blockStart+1+nextBlock]
			remaining = remaining[blockStart+1+nextBlock:]
		}

		title := extractBetween(block, `class="result__a"`, `</a>`)
		title = stripTags(title)
		title = strings.TrimSpace(title)

		// Extract href
		href := ""
		if idx := strings.Index(block, `result__a" href="`); idx != -1 {
			rest := block[idx+len(`result__a" href="`):]
			end := strings.Index(rest, `"`)
			if end != -1 {
				href = rest[:end]
			}
		}
		// DuckDuckGo sometimes uses /l/?uddg= redirect URLs
		if strings.HasPrefix(href, "/l/?") {
			if parsed, err := url.ParseQuery(strings.TrimPrefix(href, "/l/?")); err == nil {
				if uddg := parsed.Get("uddg"); uddg != "" {
					href = uddg
				}
			}
		}

		snippet := extractBetween(block, `class="result__snippet"`, `</a>`)
		if snippet == "" {
			snippet = extractBetween(block, `result__snippet">`, `</`)
		}
		snippet = stripTags(snippet)
		snippet = collapseSpaces(snippet)

		if title == "" && href == "" {
			continue
		}
		if href == "" {
			href = "(URL not extracted)"
		}
		results = append(results, searchResult{title: title, url: href, snippet: snippet})
	}
	return results
}

func extractBetween(s, startMarker, endMarker string) string {
	start := strings.Index(s, startMarker)
	if start == -1 {
		return ""
	}
	s = s[start+len(startMarker):]
	// Skip to end of the opening tag
	if gt := strings.Index(s, ">"); gt != -1 {
		s = s[gt+1:]
	}
	end := strings.Index(s, endMarker)
	if end == -1 {
		return s
	}
	return s[:end]
}

func stripTags(s string) string {
	var sb strings.Builder
	inTag := false
	for _, r := range s {
		if r == '<' {
			inTag = true
		} else if r == '>' {
			inTag = false
		} else if !inTag {
			sb.WriteRune(r)
		}
	}
	return sb.String()
}

func collapseSpaces(s string) string {
	words := strings.Fields(s)
	return strings.Join(words, " ")
}
