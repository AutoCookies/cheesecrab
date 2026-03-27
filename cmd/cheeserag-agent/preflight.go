package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// preflightRAG checks that the facade and Cheesebrain are reachable before starting the agent.
func preflightRAG(ctx context.Context, cheeseBase, facadeBase string) error {
	client := &http.Client{Timeout: 8 * time.Second}

	facadeBase = strings.TrimRight(facadeBase, "/")
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, facadeBase+"/health", nil)
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("rag_facade at %s: %w", facadeBase, err)
	}
	defer resp.Body.Close()
	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		b, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("rag_facade %s returned %s: %s", facadeBase, resp.Status, strings.TrimSpace(string(b)))
	}

	cheeseBase = strings.TrimRight(cheeseBase, "/")
	modelsReq, err := http.NewRequestWithContext(ctx, http.MethodGet, cheeseBase+"/v1/models", nil)
	if err != nil {
		return err
	}
	mresp, err := client.Do(modelsReq)
	if err != nil {
		return fmt.Errorf("cheesebrain at %s: %w", cheeseBase, err)
	}
	defer mresp.Body.Close()
	b, _ := io.ReadAll(mresp.Body)
	if mresp.StatusCode < 200 || mresp.StatusCode >= 300 {
		return fmt.Errorf("cheesebrain %s /v1/models returned %s: %s", cheeseBase, mresp.Status, strings.TrimSpace(string(b)))
	}
	_ = b
	return nil
}
