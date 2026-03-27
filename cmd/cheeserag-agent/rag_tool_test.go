package main

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"strings"
	"testing"
	"time"
)

type flakyRoundTripper struct {
	failFirst int
	calls     int
}

func (f *flakyRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
	f.calls++
	if f.calls <= f.failFirst {
		return nil, context.DeadlineExceeded
	}
	b, _ := io.ReadAll(req.Body)
	_ = req.Body.Close()
	return &http.Response{
		StatusCode: 200,
		Body:       io.NopCloser(bytes.NewReader(b)),
		Header:     make(http.Header),
		Request:    req,
	}, nil
}

func TestDoRequestWithRetryEventuallySucceeds(t *testing.T) {
	rt := &flakyRoundTripper{failFirst: 1}
	client := &http.Client{Transport: rt}
	req, err := http.NewRequestWithContext(context.Background(), http.MethodPost, "http://example.test/retry", strings.NewReader(`{"x":1}`))
	if err != nil {
		t.Fatalf("new request: %v", err)
	}
	req.GetBody = func() (io.ReadCloser, error) {
		return io.NopCloser(strings.NewReader(`{"x":1}`)), nil
	}
	resp, err := doRequestWithRetry(context.Background(), client, req, 1, 5*time.Millisecond)
	if err != nil {
		t.Fatalf("expected retry success, got %v", err)
	}
	defer resp.Body.Close()
	if rt.calls != 2 {
		t.Fatalf("calls=%d, want 2", rt.calls)
	}
}

func TestRagRetryCountFromEnv(t *testing.T) {
	t.Setenv("CHEESERAG_RAG_RETRIES", "4")
	if got := ragRetryCount(); got != 4 {
		t.Fatalf("ragRetryCount=%d, want 4", got)
	}
}
