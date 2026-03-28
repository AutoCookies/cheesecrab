package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"hash/fnv"
	"io"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"
	"time"
)

// RAGRetrieveTool calls the local Python rag_facade HTTP API (PomaiDB + embeddings).
type RAGRetrieveTool struct {
	base   string
	client *http.Client
}

// RAGFetchWikipediaTool fetches a public Wikipedia summary and ingests it to PomaiDB.
type RAGFetchWikipediaTool struct {
	base   string
	client *http.Client
}

func NewRAGRetrieveTool(baseURL string) *RAGRetrieveTool {
	return &RAGRetrieveTool{
		base:   strings.TrimRight(baseURL, "/"),
		client: &http.Client{Timeout: 120 * time.Second},
	}
}

func NewRAGFetchWikipediaTool(baseURL string) *RAGFetchWikipediaTool {
	return &RAGFetchWikipediaTool{
		base:   strings.TrimRight(baseURL, "/"),
		client: &http.Client{Timeout: 120 * time.Second},
	}
}

func (t *RAGRetrieveTool) Name() string { return "rag_retrieve" }

func (t *RAGRetrieveTool) Dangerous() bool { return false }

func (t *RAGFetchWikipediaTool) Name() string { return "rag_fetch_wikipedia" }

func (t *RAGFetchWikipediaTool) Dangerous() bool { return false }

func (t *RAGRetrieveTool) Description() string {
	return "Search the local PomaiDB knowledge base for domain-specific information (e.g. project docs, internal data). " +
		"The \"query\" arg should be a full question. Use this ONLY if the query is factual and likely to be in the local store."
}

func (t *RAGFetchWikipediaTool) Description() string {
	return "Fetch a summary of a topic from Wikipedia and ingest it into the local store for future retrieval. " +
		"Use this for general public knowledge if rag_retrieve fails or if you know the topic is on Wikipedia."
}

func (t *RAGRetrieveTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"query": map[string]any{
				"type":        "string",
				"description": "Verbatim user question (same language as the docs). Not the word \"query\".",
			},
			"top_k": map[string]any{
				"type":        "number",
				"description": "Maximum number of chunks to return (default 5)",
			},
		},
		"required": []string{"query"},
	}
}

func (t *RAGFetchWikipediaTool) Schema() map[string]any {
	return map[string]any{
		"type": "object",
		"properties": map[string]any{
			"query": map[string]any{
				"type":        "string",
				"description": "Topic or question to search on Wikipedia.",
			},
			"lang": map[string]any{
				"type":        "string",
				"description": "Language code, e.g. en or vi. Default en.",
			},
		},
		"required": []string{"query"},
	}
}

func placeholderQuery(q string) bool {
	s := strings.TrimSpace(strings.ToLower(q))
	switch s {
	case "", "query", "the query", "a query", "search query", "user query", "rag query":
		return true
	default:
		return false
	}
}

func (t *RAGRetrieveTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	q, _ := args["query"].(string)
	if os.Getenv("CHEESERAG_NO_QUERY_FALLBACK") != "1" && placeholderQuery(q) {
		if fb := strings.TrimSpace(os.Getenv("CHEESERAG_USER_GOAL")); fb != "" {
			q = fb
		}
	}
	if strings.TrimSpace(q) == "" {
		return "", fmt.Errorf("rag_retrieve: query required (set a real question or CHEESERAG_USER_GOAL)")
	}
	if placeholderQuery(q) {
		return "", fmt.Errorf("rag_retrieve: model passed placeholder %q as query — use the user's full question text", strings.TrimSpace(q))
	}
	topK := 5.0
	if v, ok := args["top_k"].(float64); ok && v > 0 {
		topK = v
	}
	body := map[string]any{
		"query": q,
		"top_k": int(topK),
	}
	out, err := t.retrieveOnce(ctx, body)
	if err != nil {
		return "", err
	}
	if out.Error != "" {
		return "", fmt.Errorf("rag_retrieve: %s", out.Error)
	}
	if out.Context == "" {
		if os.Getenv("CHEESERAG_AUTO_FETCH_ON_MISS") != "0" {
			fetcher := NewRAGFetchWikipediaTool(t.base)
			lang := strings.TrimSpace(os.Getenv("CHEESERAG_AUTO_FETCH_LANG"))
			if lang == "" {
				lang = "en"
			}
			if _, ferr := fetcher.Execute(ctx, map[string]any{"query": q, "lang": lang}); ferr == nil {
				out2, rerr := t.retrieveOnce(ctx, body)
				if rerr == nil && strings.TrimSpace(out2.Context) != "" {
					return out2.Context, nil
				}
			}
		}
		return "(no matching chunks) Indexed store returned no passages for this query. " +
			"If tool rag_fetch_wikipedia is available, call it to fetch real data, then call rag_retrieve again. " +
			"Only fallback from general knowledge if fetching also fails.", nil
	}
	return out.Context, nil
}

func (t *RAGRetrieveTool) retrieveOnce(ctx context.Context, body map[string]any) (struct {
	Context string `json:"context"`
	Error   string `json:"error"`
}, error) {
	var out struct {
		Context string `json:"context"`
		Error   string `json:"error"`
	}
	raw, err := json.Marshal(body)
	if err != nil {
		return out, err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, t.base+"/v1/retrieve", bytes.NewReader(raw))
	if err != nil {
		return out, err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := doRequestWithRetry(ctx, t.client, req, ragRetryCount(), 300*time.Millisecond)
	if err != nil {
		return out, err
	}
	defer resp.Body.Close()
	b, err := io.ReadAll(resp.Body)
	if err != nil {
		return out, err
	}
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return out, fmt.Errorf("rag_retrieve: HTTP %s: %s", resp.Status, string(b))
	}
	if err := json.Unmarshal(b, &out); err != nil {
		return out, fmt.Errorf("rag_retrieve: decode: %w", err)
	}
	return out, nil
}

func (t *RAGFetchWikipediaTool) Execute(ctx context.Context, args map[string]any) (string, error) {
	query, _ := args["query"].(string)
	query = strings.TrimSpace(query)
	if query == "" {
		return "", fmt.Errorf("rag_fetch_wikipedia: query required")
	}
	lang, _ := args["lang"].(string)
	lang = strings.TrimSpace(strings.ToLower(lang))
	if lang == "" {
		lang = "en"
	}

	searchQuery := normalizeWikipediaQuery(query)
	title, pageURL, extract, err := t.fetchWikipediaSummary(ctx, lang, searchQuery)
	if err != nil && searchQuery != query {
		title, pageURL, extract, err = t.fetchWikipediaSummary(ctx, lang, query)
	}
	if err != nil {
		return "", err
	}
	text := fmt.Sprintf("Source: %s\nTitle: %s\n\n%s", pageURL, title, extract)
	docID := wikipediaDocID(lang, title)
	if err := t.ingestText(ctx, docID, text); err != nil {
		return "", err
	}
	return fmt.Sprintf("ingested wikipedia page %q (doc_id=%d)", title, docID), nil
}

func normalizeWikipediaQuery(q string) string {
	s := strings.TrimSpace(strings.TrimRight(q, "?!.,;:"))
	l := strings.ToLower(s)
	prefixes := []string{
		"what is ", "who is ", "what are ", "who are ", "tell me about ",
		"define ", "explain ",
	}
	for _, p := range prefixes {
		if strings.HasPrefix(l, p) && len(s) > len(p) {
			s = strings.TrimSpace(s[len(p):])
			break
		}
	}
	return strings.TrimSpace(strings.TrimRight(s, "?!.,;:"))
}

func wikipediaDocID(lang, title string) int {
	h := fnv.New32a()
	_, _ = h.Write([]byte(lang + ":" + title))
	// keep doc ids positive and away from small manual ids
	return 900000000 + int(h.Sum32()%90000000)
}

func (t *RAGFetchWikipediaTool) fetchWikipediaSummary(ctx context.Context, lang, query string) (title, pageURL, extract string, err error) {
	searchURL := fmt.Sprintf(
		"https://%s.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&search=%s",
		lang, url.QueryEscape(query),
	)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, searchURL, nil)
	if err != nil {
		return "", "", "", err
	}
	req.Header.Set("User-Agent", "cheeserag-agent/0.1 (+https://local)")
	resp, err := doRequestWithRetry(ctx, t.client, req, ragRetryCount(), 300*time.Millisecond)
	if err != nil {
		return "", "", "", err
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		b, _ := io.ReadAll(resp.Body)
		return "", "", "", fmt.Errorf("rag_fetch_wikipedia: search HTTP %s: %s", resp.Status, string(b))
	}
	var osResp []any
	if err := json.NewDecoder(resp.Body).Decode(&osResp); err != nil {
		return "", "", "", fmt.Errorf("rag_fetch_wikipedia: decode opensearch: %w", err)
	}
	if len(osResp) < 4 {
		return "", "", "", fmt.Errorf("rag_fetch_wikipedia: empty opensearch response")
	}
	titles, _ := osResp[1].([]any)
	urls, _ := osResp[3].([]any)
	if len(titles) == 0 {
		return "", "", "", fmt.Errorf("rag_fetch_wikipedia: no wikipedia page found for %q", query)
	}
	title, _ = titles[0].(string)
	if len(urls) > 0 {
		pageURL, _ = urls[0].(string)
	}
	if strings.TrimSpace(title) == "" {
		return "", "", "", fmt.Errorf("rag_fetch_wikipedia: invalid page title for %q", query)
	}

	sumURL := fmt.Sprintf("https://%s.wikipedia.org/api/rest_v1/page/summary/%s", lang, url.PathEscape(title))
	sumReq, err := http.NewRequestWithContext(ctx, http.MethodGet, sumURL, nil)
	if err != nil {
		return "", "", "", err
	}
	sumReq.Header.Set("User-Agent", "cheeserag-agent/0.1 (+https://local)")
	sumResp, err := doRequestWithRetry(ctx, t.client, sumReq, ragRetryCount(), 300*time.Millisecond)
	if err != nil {
		return "", "", "", err
	}
	defer sumResp.Body.Close()
	if sumResp.StatusCode >= 200 && sumResp.StatusCode < 300 {
		var summary struct {
			Title   string `json:"title"`
			Extract string `json:"extract"`
		}
		if err := json.NewDecoder(sumResp.Body).Decode(&summary); err == nil {
			if strings.TrimSpace(summary.Title) != "" {
				title = summary.Title
			}
			extract = strings.TrimSpace(summary.Extract)
		}
	}
	if extract == "" {
		extract, err = t.fetchWikipediaExtract(ctx, lang, title)
		if err != nil {
			return "", "", "", err
		}
	}
	if pageURL == "" {
		pageURL = fmt.Sprintf("https://%s.wikipedia.org/wiki/%s", lang, url.PathEscape(title))
	}
	return title, pageURL, extract, nil
}

func (t *RAGFetchWikipediaTool) fetchWikipediaExtract(ctx context.Context, lang, title string) (string, error) {
	exURL := fmt.Sprintf(
		"https://%s.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&format=json&titles=%s",
		lang, url.QueryEscape(title),
	)
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, exURL, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("User-Agent", "cheeserag-agent/0.1 (+https://local)")
	resp, err := doRequestWithRetry(ctx, t.client, req, ragRetryCount(), 300*time.Millisecond)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		b, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("rag_fetch_wikipedia: extract HTTP %s: %s", resp.Status, string(b))
	}
	var payload struct {
		Query struct {
			Pages map[string]struct {
				Extract string `json:"extract"`
			} `json:"pages"`
		} `json:"query"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&payload); err != nil {
		return "", fmt.Errorf("rag_fetch_wikipedia: decode extract: %w", err)
	}
	for _, p := range payload.Query.Pages {
		e := strings.TrimSpace(p.Extract)
		if e != "" {
			return e, nil
		}
	}
	return "", fmt.Errorf("rag_fetch_wikipedia: empty extract for %q", title)
}

func (t *RAGFetchWikipediaTool) ingestText(ctx context.Context, docID int, text string) error {
	body := map[string]any{
		"doc_id": docID,
		"text":   text,
	}
	raw, err := json.Marshal(body)
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, t.base+"/v1/ingest", bytes.NewReader(raw))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := doRequestWithRetry(ctx, t.client, req, ragRetryCount(), 300*time.Millisecond)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(resp.Body)
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		return fmt.Errorf("rag_fetch_wikipedia: ingest HTTP %s: %s", resp.Status, string(b))
	}
	return nil
}

func ragFacadeURL() string {
	if v := strings.TrimSpace(os.Getenv("RAG_FACADE_URL")); v != "" {
		return v
	}
	return "http://127.0.0.1:9090"
}

func ragRetryCount() int {
	n := 1
	if v := strings.TrimSpace(os.Getenv("CHEESERAG_RAG_RETRIES")); v != "" {
		if p, err := strconv.Atoi(v); err == nil && p >= 0 {
			n = p
		}
	}
	if n > 5 {
		n = 5
	}
	return n
}

func doRequestWithRetry(ctx context.Context, c *http.Client, req *http.Request, retries int, baseDelay time.Duration) (*http.Response, error) {
	var lastErr error
	for i := 0; i <= retries; i++ {
		attemptReq := req.Clone(ctx)
		if req.GetBody != nil {
			rc, err := req.GetBody()
			if err != nil {
				return nil, err
			}
			attemptReq.Body = rc
		}
		resp, err := c.Do(attemptReq)
		if err == nil {
			return resp, nil
		}
		lastErr = err
		if i < retries {
			select {
			case <-ctx.Done():
				return nil, ctx.Err()
			case <-time.After(baseDelay * time.Duration(i+1)):
			}
		}
	}
	return nil, lastErr
}
