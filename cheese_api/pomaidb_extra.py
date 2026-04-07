"""put_chunk with optional chunk text for retrieval hits (PomaiDB Python binding omits text in public put_chunk)."""

from __future__ import annotations

import ctypes

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
