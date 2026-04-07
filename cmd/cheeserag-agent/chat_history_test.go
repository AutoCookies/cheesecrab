package main

import (
	"strings"
	"testing"
)

// ─── helpers ──────────────────────────────────────────────────────────────────

func newHistory(maxN int) *chatHistory {
	return &chatHistory{maxN: maxN, pins: make(map[string]string)}
}

// ─── chatHistory.add — hard turn cap ──────────────────────────────────────────

func TestChatHistoryAdd_HardCapEnforced(t *testing.T) {
	const cap = 5
	h := newHistory(cap)
	for i := range 10 {
		h.add("question", "answer")
		_ = i
	}
	if got := len(h.turns); got != cap {
		t.Fatalf("hard cap: want %d turns, got %d", cap, got)
	}
}

func TestChatHistoryAdd_ZeroCap_Unlimited(t *testing.T) {
	// maxN=0 means no cap.
	h := newHistory(0)
	for range 50 {
		h.add("q", "a")
	}
	if got := len(h.turns); got != 50 {
		t.Fatalf("zero cap: want 50 turns, got %d", got)
	}
}

func TestChatHistoryAdd_FIFODrop(t *testing.T) {
	const cap = 3
	h := newHistory(cap)
	h.add("first question", "first answer")
	h.add("second question", "second answer")
	h.add("third question", "third answer")
	h.add("fourth question", "fourth answer") // evicts first

	turns := h.turns
	if len(turns) != cap {
		t.Fatalf("FIFO: want %d turns, got %d", cap, len(turns))
	}
	if turns[0].goal != "second question" {
		t.Fatalf("FIFO: oldest remaining should be 'second question', got %q", turns[0].goal)
	}
	if turns[cap-1].goal != "fourth question" {
		t.Fatalf("FIFO: newest should be 'fourth question', got %q", turns[cap-1].goal)
	}
}

func TestChatHistoryAdd_BelowCap_AllRetained(t *testing.T) {
	h := newHistory(10)
	h.add("a", "b")
	h.add("c", "d")
	if got := len(h.turns); got != 2 {
		t.Fatalf("below cap: want 2 turns, got %d", got)
	}
}

func TestChatHistoryAdd_ExactlyAtCap(t *testing.T) {
	const cap = 4
	h := newHistory(cap)
	for i := range cap {
		h.add("q", "a")
		_ = i
	}
	if got := len(h.turns); got != cap {
		t.Fatalf("exactly at cap: want %d, got %d", cap, got)
	}
}

// ─── addPin — per-file size cap ───────────────────────────────────────────────

func TestAddPin_ShortContent_Unchanged(t *testing.T) {
	h := newHistory(20)
	h.addPin("/a.txt", "hello world")
	if h.pins["/a.txt"] != "hello world" {
		t.Fatalf("short content should be stored unchanged, got %q", h.pins["/a.txt"])
	}
}

func TestAddPin_LargeFile_TruncatedAt8KB(t *testing.T) {
	h := newHistory(20)
	big := strings.Repeat("x", maxPinBytes*2)
	h.addPin("/big.txt", big)
	pinned := h.pins["/big.txt"]
	if len(pinned) > maxPinBytes+100 { // +100 for the truncation notice
		t.Fatalf("pin should be capped at ~8 KB, got %d bytes", len(pinned))
	}
	if !strings.Contains(pinned, "truncated") {
		t.Fatalf("truncation notice missing from pinned content")
	}
}

func TestAddPin_ExactlyAtLimit_Unchanged(t *testing.T) {
	h := newHistory(20)
	exact := strings.Repeat("y", maxPinBytes)
	h.addPin("/exact.txt", exact)
	if h.pins["/exact.txt"] != exact {
		t.Fatalf("content exactly at limit should not be truncated")
	}
}

// ─── addPin — total budget eviction ───────────────────────────────────────────

func TestAddPin_TotalBudget_OldestEvicted(t *testing.T) {
	h := newHistory(20)
	// Each pin is maxPinBytes (8 KB); budget is 64 KB → max 8 pins.
	chunk := strings.Repeat("a", maxPinBytes)
	// Add 9 pins — the first should be evicted.
	for i := range 9 {
		path := strings.Repeat(string(rune('A'+i)), 1) + ".txt" // A.txt, B.txt …
		h.addPin("/"+path, chunk)
	}
	if totalPinSize(h.pins) > maxTotalPinBytes {
		t.Fatalf("total pin size %d exceeds budget %d", totalPinSize(h.pins), maxTotalPinBytes)
	}
	// A.txt (first added) should have been evicted.
	if _, exists := h.pins["/A.txt"]; exists {
		t.Fatalf("oldest pin /A.txt should have been evicted")
	}
}

func TestAddPin_UpdateExistingPin_OrderPreserved(t *testing.T) {
	h := newHistory(20)
	chunk := strings.Repeat("b", maxPinBytes/2)
	h.addPin("/first.txt", chunk)
	h.addPin("/second.txt", chunk)
	// Re-pin first.txt — should update in-place, not move to end.
	h.addPin("/first.txt", "updated content")
	if h.pins["/first.txt"] != "updated content" {
		t.Fatalf("re-pin should update content, got %q", h.pins["/first.txt"])
	}
	// first.txt should still be in pinOrder once (not duplicated).
	count := 0
	for _, p := range h.pinOrder {
		if p == "/first.txt" {
			count++
		}
	}
	if count != 1 {
		t.Fatalf("re-pin should not duplicate pinOrder entry, got count=%d", count)
	}
}

func TestAddPin_TotalPinSize_Calculation(t *testing.T) {
	pins := map[string]string{
		"/a.txt": "hello",   // 5
		"/b.txt": "world!!", // 7
	}
	if got := totalPinSize(pins); got != 12 {
		t.Fatalf("totalPinSize want 12, got %d", got)
	}
}

func TestAddPin_Empty_TotalSize_Zero(t *testing.T) {
	if got := totalPinSize(nil); got != 0 {
		t.Fatalf("nil pins: want 0, got %d", got)
	}
}
