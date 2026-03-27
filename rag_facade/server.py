"""
HTTP facade: Cheesebrain embeddings + PomaiDB RAG search / ingest.
PomaiDB is single-threaded; all DB access is guarded by a lock.
"""

from __future__ import annotations

import json
import os
import re
import sys
import threading
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

# Repo root: cheeserag/
_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT / "third_party" / "pomaidb" / "python"))

import pomaidb  # noqa: E402

from .embeddings import fetch_embedding, resolve_embedding_dim
from .pomaidb_extra import put_chunk_with_text


def _chunk_bytes(text: str, max_bytes: int, overlap: int) -> list[str]:
    raw = text.encode("utf-8")
    if max_bytes <= 0:
        return [text]
    out: list[str] = []
    start = 0
    while start < len(raw):
        end = min(start + max_bytes, len(raw))
        piece = raw[start:end]
        out.append(piece.decode("utf-8", errors="replace"))
        if end >= len(raw):
            break
        start = max(0, end - overlap)
    return out if out else [""]


def _token_ids_from_text(s: str, max_tokens: int = 48) -> list[int]:
    # Deterministic, punctuation-tolerant tokenization:
    # - lowercased
    # - keep alnum/underscore spans (e.g. "Qdrant?" -> "qdrant")
    # - stable 32-bit ids across process restarts (unlike Python's hash())
    words = re.findall(r"[A-Za-z0-9_]+", s.lower())
    ids: list[int] = []
    for w in words[:max_tokens]:
        digest = hashlib.sha1(w.encode("utf-8")).digest()
        ids.append(int.from_bytes(digest[:4], "little"))
    if not ids:
        ids = [0]
    return ids


_db = None
_db_lock = threading.Lock()
_next_chunk_i = 0
_chunk_id_lock = threading.Lock()


def _ensure_db(cheese: str, emb_model: str, *, hint_from_vector: list[float] | None = None):
    global _db
    if _db is not None:
        return _db
    path = os.environ.get("RAG_DB_PATH", "").strip()
    if not path:
        raise ValueError("RAG_DB_PATH must be set (directory for PomaiDB files).")
    dim = resolve_embedding_dim(
        cheese.rstrip("/"),
        model=emb_model,
        hint_from_vector=hint_from_vector,
    )
    shards = int(os.environ.get("RAG_SHARDS", "1"))
    _db = pomaidb.open_db(path, dim, shards=shards, profile="edge_balanced")
    membrane = os.environ.get("RAG_MEMBRANE", "rag").strip() or "rag"
    names = pomaidb.list_membranes(_db)
    have = set()
    if isinstance(names, list):
        for m in names:
            if isinstance(m, str):
                have.add(m)
            elif isinstance(m, dict) and "name" in m:
                have.add(str(m["name"]))
    if membrane not in have:
        shard_rag = int(os.environ.get("RAG_MEMBRANE_SHARDS", "1"))
        pomaidb.create_rag_membrane(_db, membrane, dim=dim, shard_count=shard_rag)
    return _db


def _next_chunk_id() -> int:
    global _next_chunk_i
    with _chunk_id_lock:
        _next_chunk_i += 1
        return int(
            (int(os.environ.get("RAG_CHUNK_ID_BASE", "1")) << 20) + _next_chunk_i
        )


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt: str, *args) -> None:
        sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), fmt % args))

    def _json(self, code: int, obj: dict) -> None:
        b = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)

    def do_GET(self) -> None:
        if self.path in ("/health", "/health/"):
            self._json(200, {"status": "ok"})
            return
        self._json(404, {"error": "not_found"})

    def do_POST(self) -> None:
        if self.path not in ("/v1/retrieve", "/v1/ingest"):
            self._json(404, {"error": "not_found"})
            return
        length = int(self.headers.get("Content-Length", "0") or 0)
        raw = self.rfile.read(length) if length else b"{}"
        try:
            body = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self._json(400, {"error": "invalid_json"})
            return

        cheese = os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").rstrip("/")
        emb_model = os.environ.get("CHEESE_EMBEDDING_MODEL", "").strip()
        membrane = os.environ.get("RAG_MEMBRANE", "rag").strip() or "rag"
        topk = int(body.get("top_k", 5))

        try:
            if self.path == "/v1/retrieve":
                query = str(body.get("query", ""))
                if not query:
                    self._json(400, {"error": "query required"})
                    return
                emb = fetch_embedding(cheese, query, model=emb_model)
                q_tokens = _token_ids_from_text(query)
                budget = int(os.environ.get("RAG_CANDIDATE_BUDGET", "512"))
                with _db_lock:
                    db = _ensure_db(cheese, emb_model, hint_from_vector=emb)
                    hits = pomaidb.search_rag(
                        db,
                        membrane,
                        token_ids=q_tokens,
                        vector=emb,
                        topk=topk,
                        candidate_budget=budget,
                    )
                texts = []
                for h in hits:
                    if len(h) > 4 and h[4]:
                        texts.append(h[4])
                context = "\n\n---\n\n".join(t for t in texts if t)
                self._json(
                    200,
                    {
                        "context": context,
                        "hits": [
                            {
                                "chunk_id": h[0],
                                "doc_id": h[1],
                                "score": h[2],
                                "token_matches": h[3],
                                "chunk_text": h[4] if len(h) > 4 else None,
                            }
                            for h in hits
                        ],
                    },
                )
                return

            # /v1/ingest
            doc_id = int(body.get("doc_id", 0))
            text = str(body.get("text", ""))
            if doc_id <= 0 or not text:
                self._json(400, {"error": "doc_id and text required"})
                return
            max_chunk = int(body.get("max_chunk_bytes", os.environ.get("RAG_MAX_CHUNK_BYTES", "512")))
            overlap = int(body.get("overlap_bytes", os.environ.get("RAG_OVERLAP_BYTES", "64")))
            chunks = _chunk_bytes(text, max_chunk, overlap)
            ingested = 0
            db = None
            for ch in chunks:
                emb = fetch_embedding(cheese, ch, model=emb_model)
                with _db_lock:
                    if db is None:
                        db = _ensure_db(cheese, emb_model, hint_from_vector=emb)
                cid = _next_chunk_id()
                with _db_lock:
                    put_chunk_with_text(
                        db,
                        membrane,
                        chunk_id=cid,
                        doc_id=doc_id,
                        token_ids=_token_ids_from_text(ch),
                        vector=emb,
                        chunk_text=ch,
                    )
                    ingested += 1
            with _db_lock:
                pomaidb.freeze(db)
            self._json(200, {"ingested_chunks": ingested, "doc_id": doc_id})
        except Exception as e:
            self._json(500, {"error": str(e)})


def main() -> None:
    host = os.environ.get("RAG_FACADE_HOST", "127.0.0.1")
    port = int(os.environ.get("RAG_FACADE_PORT", "9090"))
    server = ThreadingHTTPServer((host, port), Handler)
    print("rag_facade listening on http://%s:%s" % (host, port), file=sys.stderr)
    server.serve_forever()


if __name__ == "__main__":
    main()
