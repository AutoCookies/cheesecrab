#!/usr/bin/env python3
"""Print embedding vector dimension from Cheesebrain POST /v1/embeddings (for RAG_EMBEDDING_DIM)."""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request


def main() -> None:
    base = os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").rstrip("/")
    model = os.environ.get("CHEESE_EMBEDDING_MODEL", "").strip()
    text = os.environ.get("PROBE_EMBED_TEXT", "test")
    body: dict = {"input": text}
    if model:
        body["model"] = model
    req = urllib.request.Request(
        base + "/v1/embeddings",
        data=json.dumps(body).encode("utf-8"),
        method="POST",
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        sys.stderr.write("probe_embedding_dim: HTTP %s: %s\n" % (e.code, body))
        if e.code == 501 and "embeddings" in body.lower():
            sys.stderr.write(
                "Hint: start cheese-server with --embeddings, e.g.:\n"
                "  ./third_party/cheesebrain/build/bin/cheese-server --embeddings --pooling mean -m ./models/your.gguf --host 127.0.0.1 --port 8080\n"
            )
        elif e.code == 400 and "pooling" in body.lower():
            sys.stderr.write(
                "Hint: chat models often need --pooling mean (or cls/last) with --embeddings for /v1/embeddings.\n"
            )
        sys.exit(1)
    except urllib.error.URLError as e:
        sys.stderr.write("probe_embedding_dim: %s\n" % e)
        sys.exit(1)
    emb = payload["data"][0]["embedding"]
    print(len(emb))


if __name__ == "__main__":
    main()
