import hashlib
import json
import os
import queue
import threading
import time
import uuid
from datetime import datetime
from pathlib import Path
from typing import AsyncGenerator, List, Optional

import uvicorn
from fastapi import Depends, FastAPI, File, Form, HTTPException, Security, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.security.api_key import APIKeyHeader
from loguru import logger
from prometheus_client import Counter, Histogram, make_asgi_app
from pydantic import BaseModel

# PomaiDB path
import sys
_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT / "third_party" / "pomaidb" / "python"))
import pomaidb

import requests as _requests

from .embeddings import fetch_embedding, resolve_embedding_dim
from .ingestion import process_and_ingest, process_file_with_meta
from .pomaidb_extra import (
    load_chunk_meta,
    load_doc_meta,
    list_docs_in_membrane,
    put_chunk_with_text,
    register_doc_in_index,
    store_chunk_meta,
    store_doc_meta,
)
from .workspace_indexer import get_symbol_map, index_project_workspace, index_single_file
from .citation_engine import assign_citations, strip_llm_citation_artifacts
from . import audio_overview as _audio

# ---------------------------------------------------------------------------
# Security
# ---------------------------------------------------------------------------

API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)


def get_api_key(api_key_header: str = Security(api_key_header)):
    expected = os.environ.get("CHEESE_API_KEY", "cheese-admin-key")
    if api_key_header == expected:
        return api_key_header
    raise HTTPException(status_code=401, detail="Invalid or missing API Key")


def audit_log(action: str, details: dict):
    entry = {"timestamp": datetime.utcnow().isoformat() + "Z", "action": action, "details": details}
    with open(os.environ.get("CHEESE_AUDIT_LOG", "audit.log"), "a") as f:
        f.write(json.dumps(entry) + "\n")


# ---------------------------------------------------------------------------
# App + Metrics
# ---------------------------------------------------------------------------

app = FastAPI(title="Cheeserag Studio API", description="Privacy-First Local Knowledge Workspace", version="2.0.0")

INGESTION_COUNT = Counter("cheeserag_documents_ingested_total", "Total documents ingested")
RETRIEVAL_LATENCY = Histogram("cheeserag_retrieval_latency_seconds", "Latency of retrieval requests")
CHUNK_COUNT = Counter("cheeserag_chunks_created_total", "Total chunks created during ingestion")

app.mount("/metrics", make_asgi_app())
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# ---------------------------------------------------------------------------
# Database singleton
# ---------------------------------------------------------------------------

_db = None
_db_lock = threading.Lock()
_next_chunk_i = 0
_chunk_id_lock = threading.Lock()

# Closed-book similarity threshold — below this, reply "not found"
CLOSED_BOOK_THRESHOLD = float(os.environ.get("CHEESE_CLOSED_BOOK_THRESHOLD", "0.35"))


def _cheesebrain_url() -> str:
    return os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").strip().rstrip("/")


def _emb_model() -> str:
    return os.environ.get("CHEESE_EMBEDDING_MODEL", "").strip()


def _llm_complete(prompt: str, max_tokens: int = 150) -> str:
    """
    Single-turn, non-streaming LLM call with tight token budget.
    Uses completion-style: the prompt ends with a partial sentence the model
    is forced to finish, keeping a 0.5B model on task.
    """
    model = os.environ.get("CHEESE_CHAT_MODEL", "")
    body: dict = {
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": max_tokens,
        "temperature": 0.2,       # low temperature = less rambling
        "repeat_penalty": 1.1,    # suppress repetition loops
        "stream": False,
    }
    if model:
        body["model"] = model
    resp = _requests.post(
        f"{_cheesebrain_url()}/v1/chat/completions",
        json=body,
        timeout=60,
    )
    resp.raise_for_status()
    return resp.json()["choices"][0]["message"]["content"].strip()


def _ensure_db(hint_from_vector: Optional[List[float]] = None):
    global _db
    if _db is not None:
        return _db
    path = os.environ.get("RAG_DB_PATH", "").strip()
    if not path:
        raise ValueError("RAG_DB_PATH must be set")
    dim = resolve_embedding_dim(_cheesebrain_url(), model=_emb_model(), hint_from_vector=hint_from_vector)
    shards = int(os.environ.get("RAG_SHARDS", "1"))
    _db = pomaidb.open_db(path, dim, shards=shards, profile="edge_balanced")

    # Ensure legacy "rag" membrane still exists for backward compat
    _ensure_membrane("rag")
    # Ensure workspace registry membrane
    _ensure_kv_membrane("__workspaces__")
    return _db


def _list_membrane_names() -> set:
    if _db is None:
        return set()
    names = pomaidb.list_membranes(_db)
    have = set()
    if isinstance(names, list):
        for m in names:
            if isinstance(m, str):
                have.add(m)
            elif isinstance(m, dict) and "name" in m:
                have.add(str(m["name"]))
    return have


def _ensure_membrane(name: str):
    have = _list_membrane_names()
    if name not in have:
        dim = resolve_embedding_dim(_cheesebrain_url(), model=_emb_model())
        shard_rag = int(os.environ.get("RAG_MEMBRANE_SHARDS", "1"))
        pomaidb.create_rag_membrane(_db, name, dim=dim, shard_count=shard_rag)
        logger.info(f"Created RAG membrane: {name}")


def _ensure_kv_membrane(name: str):
    """Ensure a KV membrane exists (for metadata + workspace registry)."""
    have = _list_membrane_names()
    if name not in have:
        try:
            pomaidb.create_membrane_kind(_db, name, dim=1, shard_count=1, kind=pomaidb.MEMBRANE_KIND_KEYVALUE)
            logger.info(f"Created KV membrane: {name}")
        except Exception as e:
            logger.warning(f"Could not create KV membrane {name}: {e}")


# ---------------------------------------------------------------------------
# Workspace helpers
# ---------------------------------------------------------------------------

def _rag_membrane(ws_id: str) -> str:
    return f"ws_{ws_id}_rag"


def _meta_membrane(ws_id: str) -> str:
    return f"ws_{ws_id}_meta"


def _docs_membrane(ws_id: str) -> str:
    return f"ws_{ws_id}_docs"


def _ensure_workspace_membranes(ws_id: str):
    _ensure_membrane(_rag_membrane(ws_id))
    _ensure_kv_membrane(_meta_membrane(ws_id))
    _ensure_kv_membrane(_docs_membrane(ws_id))


def _load_workspaces() -> dict:
    if _db is None:
        return {}
    try:
        raw = pomaidb.kv_get(_db, "__workspaces__", "__all__")
        return json.loads(raw) if raw else {}
    except Exception:
        return {}


def _save_workspaces(ws_map: dict):
    try:
        pomaidb.kv_put(_db, "__workspaces__", "__all__", json.dumps(ws_map))
    except Exception as e:
        logger.warning(f"Failed to persist workspace registry: {e}")


def _alloc_chunk_id(doc_id: int) -> int:
    global _next_chunk_i
    with _chunk_id_lock:
        _next_chunk_i += 1
        return int((int(doc_id) << 20) + _next_chunk_i)


# ---------------------------------------------------------------------------
# Background ingest job queue
# ---------------------------------------------------------------------------

class _IngestJob:
    def __init__(self, job_id: str):
        self.job_id = job_id
        self.status = "pending"
        self.progress = 0
        self.total = 0
        self.chunks_added = 0
        self.error: Optional[str] = None
        self._q: queue.Queue = queue.Queue()

    def emit(self, msg: dict):
        self._q.put(msg)

    def done(self, msg: dict):
        self._q.put({**msg, "_done": True})


_jobs: dict[str, _IngestJob] = {}
_jobs_lock = threading.Lock()


def _run_ingest_job(
    job: _IngestJob,
    doc_id: int,
    filename: str,
    file_bytes: Optional[bytes],
    text_content: Optional[str],
    max_chunk_bytes: int,
    overlap_bytes: int,
    ws_id: Optional[str],
    doc_meta: dict,
):
    try:
        cheese = _cheesebrain_url()
        emb = _emb_model()
        rag_mem = _rag_membrane(ws_id) if ws_id else os.environ.get("RAG_MEMBRANE", "rag")
        meta_mem = _meta_membrane(ws_id) if ws_id else None
        docs_mem = _docs_membrane(ws_id) if ws_id else None

        job.status = "chunking"
        job.emit({"status": "chunking", "progress": 0, "total": 0})

        chunks = process_file_with_meta(file_bytes, filename, text_content, max_chunk_bytes, overlap_bytes)
        job.total = len(chunks)
        job.emit({"status": "embedding", "progress": 0, "total": job.total})

        for i, (chunk_text, token_ids, chunk_meta) in enumerate(chunks):
            v = fetch_embedding(cheese, chunk_text, model=emb)
            with _db_lock:
                db = _ensure_db(hint_from_vector=v)
                _ensure_membrane(rag_mem)
                cid = _alloc_chunk_id(doc_id)
                put_chunk_with_text(db, rag_mem, cid, doc_id, token_ids, v, chunk_text)
                if meta_mem:
                    _ensure_kv_membrane(meta_mem)
                    store_chunk_meta(db, meta_mem, cid, chunk_meta)

            job.progress = i + 1
            job.emit({"status": "embedding", "progress": job.progress, "total": job.total})

        with _db_lock:
            db = _ensure_db()
            if docs_mem:
                _ensure_kv_membrane(docs_mem)
                store_doc_meta(db, docs_mem, doc_id, doc_meta)
                register_doc_in_index(db, docs_mem, doc_id)

        job.status = "done"
        job.chunks_added = job.total
        INGESTION_COUNT.inc()
        CHUNK_COUNT.inc(job.total)
        audit_log("INGEST", {"doc_id": doc_id, "workspace": ws_id, "chunks_added": job.total, "file": filename})
        job.done({"status": "done", "progress": job.total, "total": job.total, "chunks_added": job.total})
    except Exception as e:
        job.status = "error"
        job.error = str(e)
        logger.error(f"Ingest job {job.job_id} failed: {e}")
        job.done({"status": "error", "error": str(e)})


# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class WorkspaceCreate(BaseModel):
    name: str


class RetrieveRequest(BaseModel):
    query: str
    top_k: int = 5
    min_score: float = 0.0
    workspace_id: Optional[str] = None
    membrane: Optional[str] = None  # backward compat


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    workspace_id: str
    message: str
    history: List[ChatMessage] = []


class IndexFileRequest(BaseModel):
    filepath: str


# ---------------------------------------------------------------------------
# Routes: health + models
# ---------------------------------------------------------------------------

@app.get("/health")
def health_check():
    return {"status": "ok", "rag_db_path": os.environ.get("RAG_DB_PATH"), "cheesebrain_url": os.environ.get("CHEESEBRAIN_URL")}


@app.get("/v1/models")
def get_models():
    return {"object": "list", "data": [{"id": "cheese_api", "object": "model", "owned_by": "cheeserag"}]}


# ---------------------------------------------------------------------------
# Routes: workspaces
# ---------------------------------------------------------------------------

@app.post("/v1/workspaces")
def create_workspace(req: WorkspaceCreate, api_key: str = Depends(get_api_key)):
    with _db_lock:
        db = _ensure_db()
        _ensure_kv_membrane("__workspaces__")

    ws_id = uuid.uuid4().hex[:12]
    now = datetime.utcnow().isoformat() + "Z"
    ws = {"id": ws_id, "name": req.name, "created_at": now, "doc_count": 0}

    with _db_lock:
        _ensure_workspace_membranes(ws_id)
        ws_map = _load_workspaces()
        ws_map[ws_id] = ws
        _save_workspaces(ws_map)

    audit_log("WORKSPACE_CREATE", {"id": ws_id, "name": req.name})
    return ws


@app.get("/v1/workspaces")
def list_workspaces(api_key: str = Depends(get_api_key)):
    with _db_lock:
        _ensure_db()
        ws_map = _load_workspaces()

    workspaces = list(ws_map.values())
    # Enrich with live doc count from docs membrane
    for ws in workspaces:
        try:
            with _db_lock:
                docs = list_docs_in_membrane(_db, _docs_membrane(ws["id"]))
            ws["doc_count"] = len(docs)
        except Exception:
            pass

    return {"workspaces": workspaces}


@app.delete("/v1/workspaces/{ws_id}", status_code=204)
def delete_workspace(ws_id: str, api_key: str = Depends(get_api_key)):
    with _db_lock:
        _ensure_db()
        ws_map = _load_workspaces()
        if ws_id not in ws_map:
            raise HTTPException(status_code=404, detail="Workspace not found")
        del ws_map[ws_id]
        _save_workspaces(ws_map)
    audit_log("WORKSPACE_DELETE", {"id": ws_id})


@app.get("/v1/workspaces/{ws_id}/docs")
def list_workspace_docs(ws_id: str, api_key: str = Depends(get_api_key)):
    with _db_lock:
        db = _ensure_db()
        docs = list_docs_in_membrane(db, _docs_membrane(ws_id))
    return {"docs": docs}


# ---------------------------------------------------------------------------
# Routes: ingest (async, workspace-aware)
# ---------------------------------------------------------------------------

@app.post("/v1/ingest")
async def ingest(
    doc_id: int = Form(...),
    text: Optional[str] = Form(None),
    max_chunk_bytes: int = Form(512),
    overlap_bytes: int = Form(64),
    workspace_id: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    api_key: str = Depends(get_api_key),
):
    file_bytes: Optional[bytes] = None
    filename = "text"

    if file:
        file_bytes = await file.read()
        filename = file.filename or "upload"
    elif not text:
        raise HTTPException(status_code=400, detail="Must provide either text or file")

    doc_meta = {
        "doc_id": doc_id,
        "name": filename,
        "mime": (file.content_type if file else "text/plain"),
        "size": len(file_bytes) if file_bytes else len(text or ""),
        "ingested_at": datetime.utcnow().isoformat() + "Z",
        "workspace_id": workspace_id,
    }

    job_id = uuid.uuid4().hex
    job = _IngestJob(job_id)
    with _jobs_lock:
        _jobs[job_id] = job

    t = threading.Thread(
        target=_run_ingest_job,
        args=(job, doc_id, filename, file_bytes, text, max_chunk_bytes, overlap_bytes, workspace_id, doc_meta),
        daemon=True,
    )
    t.start()

    return {"job_id": job_id, "doc_id": doc_id}


@app.get("/v1/jobs/{job_id}/stream")
def stream_job(job_id: str, api_key: str = Depends(get_api_key)):
    with _jobs_lock:
        job = _jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    def _generate():
        while True:
            try:
                msg = job._q.get(timeout=30)
                yield f"data: {json.dumps(msg)}\n\n"
                if msg.get("_done"):
                    break
            except queue.Empty:
                yield "data: {\"status\": \"waiting\"}\n\n"

    return StreamingResponse(_generate(), media_type="text/event-stream")


@app.get("/v1/jobs/{job_id}")
def get_job_status(job_id: str, api_key: str = Depends(get_api_key)):
    with _jobs_lock:
        job = _jobs.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {
        "job_id": job.job_id,
        "status": job.status,
        "progress": job.progress,
        "total": job.total,
        "chunks_added": job.chunks_added,
        "error": job.error,
    }


# ---------------------------------------------------------------------------
# Routes: retrieve (workspace-aware, with citations)
# ---------------------------------------------------------------------------

@app.post("/v1/retrieve")
def retrieve(req: RetrieveRequest, api_key: str = Depends(get_api_key)):
    start_t = time.time()
    cheese = _cheesebrain_url()
    emb = _emb_model()

    if req.workspace_id:
        membrane = _rag_membrane(req.workspace_id)
        meta_mem = _meta_membrane(req.workspace_id)
    else:
        membrane = req.membrane or os.environ.get("RAG_MEMBRANE", "rag")
        meta_mem = None

    v = fetch_embedding(cheese, req.query, model=emb)
    with _db_lock:
        db = _ensure_db(hint_from_vector=v)
        res = pomaidb.search_rag_membrane(
            db, membrane,
            vector=v,
            text_query=req.query,
            top_k=req.top_k,
            ef=int(os.environ.get("RAG_EF_SEARCH", "128")),
        )

    context = ""
    hits = []
    if isinstance(res, list):
        for r in res:
            score = float(r.get("score", 0.0))
            if score < req.min_score:
                continue
            text = str(r.get("text", ""))
            cid = int(r.get("chunk_id", 0))

            citation = None
            if meta_mem and cid:
                with _db_lock:
                    citation = load_chunk_meta(db, meta_mem, cid)

            if text:
                context += f"[Chunk {cid}, score {score:.3f}]\n{text}\n\n"
            hits.append({"chunk_id": cid, "score": score, "text": text, "citation": citation})

    RETRIEVAL_LATENCY.observe(time.time() - start_t)
    audit_log("RETRIEVE", {"query": req.query, "workspace": req.workspace_id, "hits": len(hits)})
    return {"context": context.strip(), "hits": hits}


# ---------------------------------------------------------------------------
# Routes: closed-book streaming chat
# ---------------------------------------------------------------------------

@app.post("/v1/chat")
def chat(req: ChatRequest, api_key: str = Depends(get_api_key)):
    """
    Two-phase closed-book chat optimised for 0.5B models:

    Phase A — Extractive LLM call (constrained, non-streaming):
        The model is given a completion-style prompt with a hard max_tokens=150
        and asked to copy the answer verbatim from the context.
        This keeps the 0.5B model on-task and prevents hallucination.

    Phase B — Algorithmic citation assignment (backend, no LLM):
        citation_engine.py matches each answer sentence to retrieved chunks
        via TF-IDF cosine similarity and programmatically inserts [N] markers.
        The LLM never touches citation logic.
    """
    cheese = _cheesebrain_url()
    emb = _emb_model()
    membrane = _rag_membrane(req.workspace_id)
    meta_mem = _meta_membrane(req.workspace_id)

    # ── Step 1: Retrieve top-3 chunks ────────────────────────────────────────
    # Keeping top_k=3 limits context to what a 0.5B model can handle reliably.
    v = fetch_embedding(cheese, req.message, model=emb)
    with _db_lock:
        db = _ensure_db(hint_from_vector=v)
        res = pomaidb.search_rag_membrane(
            db, membrane,
            vector=v,
            text_query=req.message,
            top_k=int(os.environ.get("CHEESE_CHAT_TOP_K", "3")),
            ef=int(os.environ.get("RAG_EF_SEARCH", "128")),
        )

    hits = []
    if isinstance(res, list):
        for r in res:
            score = float(r.get("score", 0.0))
            text = str(r.get("text", ""))
            cid = int(r.get("chunk_id", 0))
            citation = None
            if cid:
                with _db_lock:
                    citation = load_chunk_meta(db, meta_mem, cid)
            hits.append({"score": score, "text": text, "citation": citation, "chunk_id": cid})

    max_score = max((h["score"] for h in hits if h["text"]), default=0.0)

    # ── Step 2: Closed-book gate ──────────────────────────────────────────────
    if max_score < CLOSED_BOOK_THRESHOLD or not any(h["text"] for h in hits):
        def _not_found():
            yield f"data: {json.dumps({'type': 'not_found', 'content': 'I cannot find this information in the uploaded documents.', 'citations': []})}\n\n"
            yield "data: [DONE]\n\n"
        return StreamingResponse(_not_found(), media_type="text/event-stream")

    # ── Step 3 (Phase A): Extractive LLM call — constrained, no streaming ────
    # Cap each chunk at 400 chars to keep total prompt under 0.5B context limit.
    context_block = "\n\n".join(
        h["text"][:400] for h in hits if h["text"]
    )
    # Completion-style prompt: model fills in the blank after the colon.
    extractive_prompt = (
        f"Context:\n{context_block}\n\n"
        f"Question: {req.message}\n"
        f"Answer (one short sentence, use exact words from the context above):"
    )

    try:
        raw_answer = _llm_complete(extractive_prompt, max_tokens=150)
    except Exception as e:
        raw_answer = f"(extraction failed: {e})"

    # Remove any [N] markers the model may have hallucinated
    clean_answer = strip_llm_citation_artifacts(raw_answer)

    # ── Step 4 (Phase B): Algorithmic citation assignment — backend only ──────
    annotated_answer, citations = assign_citations(clean_answer, hits)

    # ── Step 5: Stream the final annotated answer token-by-token ─────────────
    def _stream():
        # Citations are assigned before streaming starts — guaranteed accuracy
        yield f"data: {json.dumps({'type': 'citations', 'citations': citations})}\n\n"

        # Simulate streaming by yielding word-by-word (avoids a second LLM call)
        words = annotated_answer.split(" ")
        for i, word in enumerate(words):
            chunk = word if i == len(words) - 1 else word + " "
            yield f"data: {json.dumps({'type': 'token', 'content': chunk})}\n\n"

        yield "data: [DONE]\n\n"

    return StreamingResponse(_stream(), media_type="text/event-stream")


# ---------------------------------------------------------------------------
# Routes: workspace indexing (legacy + new)
# ---------------------------------------------------------------------------

@app.post("/v1/index_workspace")
def index_workspace(api_key: str = Depends(get_api_key)):
    with _db_lock:
        db = _ensure_db()

    membrane = "workspace_code"
    with _db_lock:
        _ensure_membrane(membrane)

    chunks = index_project_workspace(".")
    doc_id = int(os.environ.get("WORKSPACE_DOC_ID", "999"))
    total_added = 0
    cheese = _cheesebrain_url()
    emb = _emb_model()

    for text_piece in chunks:
        words = text_piece.lower().split()
        token_ids = []
        for w in words[:48]:
            digest = hashlib.sha1(w.encode()).digest()
            token_ids.append(int.from_bytes(digest[:4], "little"))
        if not token_ids:
            token_ids = [0]
        v = fetch_embedding(cheese, text_piece, model=emb)
        with _db_lock:
            cid = _alloc_chunk_id(doc_id)
            put_chunk_with_text(db, membrane, cid, doc_id, token_ids, v, text_piece)
        total_added += 1

    return {"status": "ok", "code_blocks_indexed": total_added}


@app.post("/v1/index_file")
def index_file(payload: IndexFileRequest, api_key: str = Depends(get_api_key)):
    with _db_lock:
        db = _ensure_db()

    membrane = "workspace_code"
    with _db_lock:
        _ensure_membrane(membrane)

    chunks = index_single_file(payload.filepath)
    if not chunks:
        return {"status": "ok", "code_blocks_indexed": 0}

    doc_id = int(os.environ.get("WORKSPACE_DOC_ID", "999"))
    total_added = 0
    cheese = _cheesebrain_url()
    emb = _emb_model()

    for text_piece in chunks:
        words = text_piece.lower().split()
        token_ids = []
        for w in words[:48]:
            digest = hashlib.sha1(w.encode()).digest()
            token_ids.append(int.from_bytes(digest[:4], "little"))
        if not token_ids:
            token_ids = [0]
        v = fetch_embedding(cheese, text_piece, model=emb)
        with _db_lock:
            cid = _alloc_chunk_id(doc_id)
            put_chunk_with_text(db, membrane, cid, doc_id, token_ids, v, text_piece)
        total_added += 1

    return {"status": "ok", "code_blocks_indexed": total_added}


@app.get("/v1/map_symbols")
def map_symbols(api_key: str = Depends(get_api_key)):
    return get_symbol_map(".")


# ---------------------------------------------------------------------------
# Routes: audio overview
# ---------------------------------------------------------------------------

class AudioOverviewRequest(BaseModel):
    workspace_id: str
    top_k: int = 10


@app.post("/v1/audio_overview")
def start_audio_overview(req: AudioOverviewRequest, api_key: str = Depends(get_api_key)):
    """
    Retrieve top-k chunks then kick off the 3-step prompt chain.
    Passes individual chunk texts (not one big blob) so the pipeline
    can feed each chunk to the 0.5B model one at a time.
    """
    cheese = _cheesebrain_url()
    emb = _emb_model()
    membrane = _rag_membrane(req.workspace_id)

    v = fetch_embedding(cheese, "summarize the main topics and key findings", model=emb)
    with _db_lock:
        db = _ensure_db(hint_from_vector=v)
        res = pomaidb.search_rag_membrane(
            db, membrane, vector=v, text_query="summary overview",
            top_k=req.top_k, ef=int(os.environ.get("RAG_EF_SEARCH", "128")),
        )

    # Pass individual chunks — not one concatenated blob
    chunks = []
    if isinstance(res, list):
        for r in res:
            t = str(r.get("text", ""))
            if t:
                chunks.append(t)

    job_id = uuid.uuid4().hex
    _audio.start_overview_job(job_id, req.workspace_id, chunks)
    return {"job_id": job_id}


@app.get("/v1/audio_overview/{job_id}/status")
def audio_overview_status(job_id: str, api_key: str = Depends(get_api_key)):
    job = _audio.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"job_id": job.job_id, "status": job.status, "error": job.error}


@app.get("/v1/audio_overview/{job_id}/download")
def download_audio_overview(job_id: str, api_key: str = Depends(get_api_key)):
    from fastapi.responses import FileResponse
    job = _audio.get_job(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status != "done" or not job.output_path:
        raise HTTPException(status_code=202, detail=f"Not ready: {job.status}")
    return FileResponse(job.output_path, media_type="audio/wav", filename=f"overview-{job.workspace_id}.wav")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    host = os.environ.get("RAG_FACADE_HOST", "127.0.0.1")
    port = int(os.environ.get("RAG_FACADE_PORT", "9090"))
    logger.info(f"Starting Cheeserag Studio API on {host}:{port}")
    uvicorn.run(app, host=host, port=port, log_level="info")
