package main

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"sync/atomic"
	"testing"
	"time"
)

func TestDoHTTPWithRetryEventuallySucceeds(t *testing.T) {
	var calls int32
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		n := atomic.AddInt32(&calls, 1)
		if n == 1 {
			hj, ok := w.(http.Hijacker)
			if !ok {
				t.Fatalf("response writer does not support hijack")
			}
			conn, _, err := hj.Hijack()
			if err != nil {
				t.Fatalf("hijack failed: %v", err)
			}
			_ = conn.Close()
			return
		}
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	}))
	defer srv.Close()

	req, err := http.NewRequestWithContext(context.Background(), http.MethodGet, srv.URL, nil)
	if err != nil {
		t.Fatalf("new request: %v", err)
	}

	resp, err := doHTTPWithRetry(req, 1, 10*time.Millisecond)
	if err != nil {
		t.Fatalf("expected retry success, got error: %v", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("unexpected status: %d", resp.StatusCode)
	}
	if atomic.LoadInt32(&calls) < 2 {
		t.Fatalf("expected at least 2 calls, got %d", calls)
	}
}

func TestVerifyRetryEnvConfig(t *testing.T) {
	t.Setenv("CHEESERAG_VERIFY_RETRIES", "3")
	t.Setenv("CHEESERAG_VERIFY_RETRY_DELAY_MS", "150")
	if got := verifyRetryCount(); got != 3 {
		t.Fatalf("verifyRetryCount=%d, want 3", got)
	}
	if got := verifyRetryDelay(); got != 150*time.Millisecond {
		t.Fatalf("verifyRetryDelay=%s, want 150ms", got)
	}
}

func TestVerifyRetryEnvBounds(t *testing.T) {
	t.Setenv("CHEESERAG_VERIFY_RETRIES", "99")
	t.Setenv("CHEESERAG_VERIFY_RETRY_DELAY_MS", "99999")
	if got := verifyRetryCount(); got != 5 {
		t.Fatalf("verifyRetryCount clamp=%d, want 5", got)
	}
	if got := verifyRetryDelay(); got != 5*time.Second {
		t.Fatalf("verifyRetryDelay clamp=%s, want 5s", got)
	}
}

func TestDoHTTPWithRetryContextCancel(t *testing.T) {
	req, err := http.NewRequestWithContext(context.Background(), http.MethodGet, "http://127.0.0.1:1", nil)
	if err != nil {
		t.Fatalf("new request: %v", err)
	}
	ctx, cancel := context.WithCancel(req.Context())
	cancel()
	req = req.WithContext(ctx)
	_, err = doHTTPWithRetry(req, 2, 10*time.Millisecond)
	if err == nil {
		t.Fatal("expected error on cancelled context")
	}
}

func TestMain(m *testing.M) {
	// Avoid cross-test env leakage in this package when running in IDEs.
	code := m.Run()
	os.Exit(code)
}
