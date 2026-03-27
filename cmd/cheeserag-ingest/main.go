// Command cheeserag-ingest posts text files to rag_facade /v1/ingest (PomaiDB via facade).
// Does not import PomaiDB or Cheesebrain directly — HTTP only.
package main

import (
	"bytes"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"hash/fnv"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	facade := flag.String("facade", strings.TrimRight(os.Getenv("RAG_FACADE_URL"), "/"), "rag_facade base URL")
	dir := flag.String("dir", "", "if set, ingest *.md and *.txt under this directory (non-recursive)")
	recursive := flag.Bool("r", false, "with -dir, walk subdirectories")
	skipPreflight := flag.Bool("skip-preflight", false, "do not GET /health before ingesting")
	flag.Parse()
	facadeURL := strings.TrimRight(*facade, "/")
	if facadeURL == "" {
		facadeURL = "http://127.0.0.1:9090"
	}
	paths := flag.Args()

	if *dir != "" {
		if *recursive {
			err := filepath.WalkDir(*dir, func(path string, d fs.DirEntry, err error) error {
				if err != nil {
					return err
				}
				if d.IsDir() {
					return nil
				}
				lower := strings.ToLower(filepath.Ext(path))
				if lower == ".md" || lower == ".txt" {
					paths = append(paths, path)
				}
				return nil
			})
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				os.Exit(1)
			}
		} else {
			entries, err := os.ReadDir(*dir)
			if err != nil {
				fmt.Fprintln(os.Stderr, err)
				os.Exit(1)
			}
			for _, e := range entries {
				if e.IsDir() {
					continue
				}
				lower := strings.ToLower(filepath.Ext(e.Name()))
				if lower != ".md" && lower != ".txt" {
					continue
				}
				paths = append(paths, filepath.Join(*dir, e.Name()))
			}
		}
	}

	if len(paths) == 0 {
		fmt.Fprintln(os.Stderr, "usage: cheeserag-ingest [flags] file1 [file2 ...]\n       cheeserag-ingest -dir ./data")
		os.Exit(2)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Minute)
	defer cancel()

	if !*skipPreflight {
		req, _ := http.NewRequestWithContext(ctx, http.MethodGet, facadeURL+"/health", nil)
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			fmt.Fprintf(os.Stderr, "preflight: rag_facade: %v\n", err)
			os.Exit(1)
		}
		resp.Body.Close()
		if resp.StatusCode < 200 || resp.StatusCode >= 300 {
			fmt.Fprintf(os.Stderr, "preflight: rag_facade: HTTP %s\n", resp.Status)
			os.Exit(1)
		}
	}

	client := &http.Client{Timeout: 120 * time.Second}
	for _, p := range paths {
		raw, err := os.ReadFile(p)
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s: %v\n", p, err)
			os.Exit(1)
		}
		docID := stableDocID(p)
		body := map[string]any{
			"doc_id": docID,
			"text":   string(raw),
		}
		b, err := json.Marshal(body)
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s: %v\n", p, err)
			os.Exit(1)
		}
		req, err := http.NewRequestWithContext(ctx, http.MethodPost, facadeURL+"/v1/ingest", bytes.NewReader(b))
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s: %v\n", p, err)
			os.Exit(1)
		}
		req.Header.Set("Content-Type", "application/json")
		resp, err := client.Do(req)
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s: %v\n", p, err)
			os.Exit(1)
		}
		out, _ := io.ReadAll(resp.Body)
		resp.Body.Close()
		if resp.StatusCode < 200 || resp.StatusCode >= 300 {
			fmt.Fprintf(os.Stderr, "%s: HTTP %s: %s\n", p, resp.Status, strings.TrimSpace(string(out)))
			os.Exit(1)
		}
		fmt.Printf("%s -> %s\n", p, strings.TrimSpace(string(out)))
	}
}

func stableDocID(path string) int {
	h := fnv.New32a()
	_, _ = h.Write([]byte(filepath.Clean(path)))
	// positive ids, avoid tiny manual ids
	return 800000000 + int(h.Sum32()%799000000)
}
