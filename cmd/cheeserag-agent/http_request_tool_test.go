package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

// ─── metadata ─────────────────────────────────────────────────────────────────

func TestHttpRequestTool_Metadata(t *testing.T) {
	tool := &HttpRequestTool{}
	if tool.Name() != "http_request" {
		t.Fatalf("name: want http_request, got %q", tool.Name())
	}
	if tool.Dangerous() {
		t.Fatal("http_request should not be dangerous")
	}
	if tool.Description() == "" {
		t.Fatal("description should not be empty")
	}
	schema := tool.Schema()
	if schema == nil {
		t.Fatal("schema should not be nil")
	}
}

// ─── missing required arg ─────────────────────────────────────────────────────

func TestHttpRequestTool_MissingURL_ReturnsError(t *testing.T) {
	tool := &HttpRequestTool{}
	_, err := tool.Execute(context.Background(), map[string]any{})
	if err == nil {
		t.Fatal("expected error when url is missing")
	}
}

func TestHttpRequestTool_EmptyURL_ReturnsError(t *testing.T) {
	tool := &HttpRequestTool{}
	_, err := tool.Execute(context.Background(), map[string]any{"url": "   "})
	if err == nil {
		t.Fatal("expected error when url is blank")
	}
}

// ─── GET request ──────────────────────────────────────────────────────────────

func TestHttpRequestTool_GET_ReturnsStatusAndBody(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			t.Errorf("expected GET, got %s", r.Method)
		}
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, `{"status":"ok"}`)
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	out, err := tool.Execute(context.Background(), map[string]any{"url": srv.URL})
	if err != nil {
		t.Fatalf("GET error: %v", err)
	}
	if !strings.Contains(out, "200") {
		t.Fatalf("expected status 200 in output: %q", out)
	}
	if !strings.Contains(out, `"status":"ok"`) {
		t.Fatalf("expected body in output: %q", out)
	}
}

func TestHttpRequestTool_GET_DefaultMethod(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "wrong method", http.StatusMethodNotAllowed)
			return
		}
		w.WriteHeader(http.StatusNoContent)
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	// No "method" arg — should default to GET.
	out, err := tool.Execute(context.Background(), map[string]any{"url": srv.URL})
	if err != nil {
		t.Fatalf("default method error: %v", err)
	}
	if !strings.Contains(out, "204") {
		t.Fatalf("expected 204, got: %q", out)
	}
}

// ─── POST with body ───────────────────────────────────────────────────────────

func TestHttpRequestTool_POST_WithBody(t *testing.T) {
	var receivedBody string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			t.Errorf("expected POST, got %s", r.Method)
		}
		raw, _ := io.ReadAll(r.Body)
		receivedBody = string(raw)
		w.WriteHeader(http.StatusCreated)
		fmt.Fprint(w, "created")
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	out, err := tool.Execute(context.Background(), map[string]any{
		"url":    srv.URL,
		"method": "POST",
		"body":   `{"key":"value"}`,
	})
	if err != nil {
		t.Fatalf("POST error: %v", err)
	}
	if !strings.Contains(out, "201") {
		t.Fatalf("expected 201: %q", out)
	}
	if receivedBody != `{"key":"value"}` {
		t.Fatalf("server received wrong body: %q", receivedBody)
	}
}

// ─── Custom headers ───────────────────────────────────────────────────────────

func TestHttpRequestTool_CustomHeaders_Forwarded(t *testing.T) {
	var receivedAuth string
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		receivedAuth = r.Header.Get("Authorization")
		w.WriteHeader(http.StatusOK)
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	_, err := tool.Execute(context.Background(), map[string]any{
		"url":     srv.URL,
		"headers": map[string]any{"Authorization": "Bearer test-token"},
	})
	if err != nil {
		t.Fatalf("custom headers error: %v", err)
	}
	if receivedAuth != "Bearer test-token" {
		t.Fatalf("Authorization header not forwarded: %q", receivedAuth)
	}
}

// ─── 404 / non-2xx response ───────────────────────────────────────────────────

func TestHttpRequestTool_404_NotError(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.NotFound(w, r)
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	out, err := tool.Execute(context.Background(), map[string]any{"url": srv.URL + "/missing"})
	// 404 is not an error — the tool returns status + body.
	if err != nil {
		t.Fatalf("404 should not return error: %v", err)
	}
	if !strings.Contains(out, "404") {
		t.Fatalf("expected 404 in output: %q", out)
	}
}

// ─── Large response truncation ────────────────────────────────────────────────

func TestHttpRequestTool_LargeResponse_Truncated(t *testing.T) {
	bigBody := strings.Repeat("X", httpRequestMaxBodyBytes*2)
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, bigBody)
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	out, err := tool.Execute(context.Background(), map[string]any{"url": srv.URL})
	if err != nil {
		t.Fatalf("large response error: %v", err)
	}
	if !strings.Contains(out, "truncated") {
		t.Fatalf("expected truncation notice: %q", out[:200])
	}
	// Output should not contain the full body.
	if len(out) >= len(bigBody) {
		t.Fatalf("output (%d bytes) should be shorter than bigBody (%d bytes)", len(out), len(bigBody))
	}
}

func TestHttpRequestTool_SmallResponse_NotTruncated(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "small")
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	out, err := tool.Execute(context.Background(), map[string]any{"url": srv.URL})
	if err != nil {
		t.Fatalf("small response error: %v", err)
	}
	if strings.Contains(out, "truncated") {
		t.Fatalf("small response should not be truncated: %q", out)
	}
}

// ─── Method normalization ─────────────────────────────────────────────────────

func TestHttpRequestTool_LowercaseMethod_Normalized(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodDelete {
			t.Errorf("expected DELETE, got %s", r.Method)
		}
		w.WriteHeader(http.StatusNoContent)
	}))
	defer srv.Close()

	tool := &HttpRequestTool{}
	out, err := tool.Execute(context.Background(), map[string]any{
		"url":    srv.URL,
		"method": "delete", // lowercase should be normalized to DELETE
	})
	if err != nil {
		t.Fatalf("delete error: %v", err)
	}
	if !strings.Contains(out, "204") {
		t.Fatalf("expected 204: %q", out)
	}
}

// ─── Context cancellation ─────────────────────────────────────────────────────

func TestHttpRequestTool_CancelledContext_ReturnsError(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Slow handler — context will be cancelled before this responds.
		select {}
	}))
	defer srv.Close()

	ctx, cancel := context.WithCancel(context.Background())
	cancel() // cancelled immediately

	tool := &HttpRequestTool{}
	_, err := tool.Execute(ctx, map[string]any{"url": srv.URL})
	if err == nil {
		t.Fatal("expected error for cancelled context")
	}
}
