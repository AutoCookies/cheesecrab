package llmclient

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Client defines the minimal interface used by the agent layer to talk to
// the cheesebrain HTTP API.
type Client interface {
	ChatCompletions(ctx context.Context, req any) (io.ReadCloser, error)
}

type httpClient struct {
	baseURL string
	h       *http.Client
}

// NewHTTPClient returns a Client that targets the given cheesebrain base URL.
func NewHTTPClient(baseURL string) Client {
	return &httpClient{
		baseURL: baseURL,
		h:       &http.Client{},
	}
}

// ChatCompletions issues a POST to cheesebrain's /v1/chat/completions endpoint
// and returns the raw response body for streaming back to the caller.
func (c *httpClient) ChatCompletions(ctx context.Context, req any) (io.ReadCloser, error) {
	body, err := json.Marshal(req)
	if err != nil {
		return nil, err
	}

	url := c.baseURL + "/v1/chat/completions"
	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	httpReq.Header.Set("Content-Type", "application/json")

	resp, err := c.h.Do(httpReq)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode/100 != 2 {
		defer resp.Body.Close()
		b, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("cheesebrain error: %s", string(b))
	}
	return resp.Body, nil
}

