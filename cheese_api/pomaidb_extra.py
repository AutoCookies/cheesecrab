"""put_chunk with optional chunk text for retrieval hits (PomaiDB Python binding omits text in public put_chunk)."""

from __future__ import annotations

import ctypes
import json

import pomaidb


def put_chunk_with_text(
    db,
    membrane_name: str,
    chunk_id: int,
    doc_id: int,
    token_ids: list[int],
    vector: list[float] | None,
    chunk_text: str,
) -> None:
    """Insert a RAG chunk with stored text (returned in search_rag hits)."""
    pomaidb._ensure_lib()
    _lib = pomaidb._lib
    chunk = _lib._pomai_rag_chunk()
    chunk.struct_size = ctypes.sizeof(_lib._pomai_rag_chunk())
    chunk.chunk_id = int(chunk_id)
    chunk.doc_id = int(doc_id)
    tokens = (ctypes.c_uint32 * len(token_ids))(*token_ids)
    chunk.token_ids = tokens
    chunk.token_count = len(token_ids)
    if vector is not None and len(vector) > 0:
        vec = (ctypes.c_float * len(vector))(*vector)
        chunk.vector = vec
        chunk.dim = len(vector)
    else:
        chunk.vector = None
        chunk.dim = 0
    raw = chunk_text.encode("utf-8")
    buf = (ctypes.c_char * len(raw))(*raw)
    chunk.chunk_text = ctypes.cast(buf, ctypes.c_char_p)
    chunk.chunk_text_len = len(raw)
    pomaidb._check(_lib.pomai_put_chunk(db, membrane_name.encode("utf-8"), ctypes.byref(chunk)))


def store_chunk_meta(db, meta_membrane: str, chunk_id: int, meta: dict) -> None:
    """Store per-chunk citation metadata (file, page, byte_offset) in a KV membrane."""
    try:
        pomaidb.kv_put(db, meta_membrane, str(chunk_id), json.dumps(meta))
    except Exception:
        pass  # metadata storage is best-effort; never block ingestion


def load_chunk_meta(db, meta_membrane: str, chunk_id: int) -> dict | None:
    """Load citation metadata for a chunk. Returns None if not found."""
    try:
        val = pomaidb.kv_get(db, meta_membrane, str(chunk_id))
        if val:
            return json.loads(val)
    except Exception:
        pass
    return None


def store_doc_meta(db, docs_membrane: str, doc_id: int, meta: dict) -> None:
    """Store per-document metadata (name, mime, size, ingested_at) in a KV membrane."""
    try:
        pomaidb.kv_put(db, docs_membrane, str(doc_id), json.dumps(meta))
    except Exception:
        pass


def load_doc_meta(db, docs_membrane: str, doc_id: int) -> dict | None:
    """Load document metadata. Returns None if not found."""
    try:
        val = pomaidb.kv_get(db, docs_membrane, str(doc_id))
        if val:
            return json.loads(val)
    except Exception:
        pass
    return None


def list_docs_in_membrane(db, docs_membrane: str) -> list[dict]:
    """Return all stored document metadata entries."""
    # PomaiDB KV doesn't expose list-keys directly; we track via a special index key.
    try:
        raw = pomaidb.kv_get(db, docs_membrane, "__doc_index__")
        if raw:
            ids = json.loads(raw)
            result = []
            for did in ids:
                m = load_doc_meta(db, docs_membrane, did)
                if m:
                    result.append(m)
            return result
    except Exception:
        pass
    return []


def register_doc_in_index(db, docs_membrane: str, doc_id: int) -> None:
    """Add doc_id to the __doc_index__ list so list_docs_in_membrane can find it."""
    try:
        raw = pomaidb.kv_get(db, docs_membrane, "__doc_index__")
        ids = json.loads(raw) if raw else []
        if doc_id not in ids:
            ids.append(doc_id)
            pomaidb.kv_put(db, docs_membrane, "__doc_index__", json.dumps(ids))
    except Exception:
        pass
