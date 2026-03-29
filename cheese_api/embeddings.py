"""OpenAI-compatible embedding client (Cheesebrain cheese-server)."""

from __future__ import annotations

import json
import os
import threading
import urllib.error
import urllib.request
from typing import Any

_dim_lock = threading.Lock()
_cached_dim: int | None = None


def fetch_embedding(
    base_url: str,
    text: str,
    *,
    model: str = "",
    timeout_s: float = 120.0,
) -> list[float]:
    """
    POST /v1/embeddings and return the first embedding vector.
    base_url should be like http://127.0.0.1:8080 (no trailing slash).
    """
    url = base_url.rstrip("/") + "/v1/embeddings"
    body: dict[str, Any] = {"input": text}
    if model:
        body["model"] = model
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        method="POST",
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout_s) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        if e.code == 501 and "embeddings" in body.lower():
            raise RuntimeError(
                "Cheesebrain returned 501: embeddings disabled. Restart cheese-server with --embeddings. " + body
            ) from e
        if e.code == 400:
            hint = ""
            if "pooling" in body.lower() or "Pooling" in body:
                hint = (
                    " Hint: for chat models, add e.g. --pooling mean (or cls/last) next to --embeddings."
                )
            raise RuntimeError("Cheesebrain POST /v1/embeddings returned 400: %s%s" % (body, hint)) from e
        raise RuntimeError("Cheesebrain POST /v1/embeddings HTTP %s: %s" % (e.code, body)) from e
    emb = payload["data"][0]["embedding"]
    if not isinstance(emb, list):
        raise RuntimeError("embeddings: unexpected data[0].embedding type")
    return [float(x) for x in emb]


def resolve_embedding_dim(
    cheese_url: str,
    *,
    model: str = "",
    hint_from_vector: list[float] | None = None,
) -> int:
    """
    Dimension for PomaiDB: RAG_EMBEDDING_DIM env, else len(first successful embedding).
    Caches result. If hint_from_vector is given (e.g. query embedding), uses len(hint) when env unset.
    """
    global _cached_dim
    with _dim_lock:
        if _cached_dim is not None:
            return _cached_dim
        v = os.environ.get("RAG_EMBEDDING_DIM", "").strip()
        if v:
            d = int(v)
            if hint_from_vector is not None and len(hint_from_vector) != d:
                raise ValueError(
                    "RAG_EMBEDDING_DIM=%s but embedding API returned length %s"
                    % (d, len(hint_from_vector))
                )
            _cached_dim = d
            return _cached_dim
        if hint_from_vector is not None and len(hint_from_vector) > 0:
            _cached_dim = len(hint_from_vector)
            return _cached_dim
        emb = fetch_embedding(cheese_url, "probe", model=model)
        _cached_dim = len(emb)
        return _cached_dim


def reset_embedding_dim_cache_for_tests() -> None:
    global _cached_dim
    with _dim_lock:
        _cached_dim = None
