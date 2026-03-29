import os
import threading
from typing import List, Optional, Any
from pathlib import Path

from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Depends, Security
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
from loguru import logger
import time
import json
from datetime import datetime
from prometheus_client import make_asgi_app, Counter, Histogram

# Initialize PomaiDB path insertion
import sys
_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT / "third_party" / "pomaidb" / "python"))

import pomaidb

from .embeddings import fetch_embedding, resolve_embedding_dim
from .pomaidb_extra import put_chunk_with_text
from .ingestion import process_and_ingest, parse_pdf_bytes
from .workspace_indexer import index_project_workspace

# Security Configuration
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

def get_api_key(api_key_header: str = Security(api_key_header)):
    # In production, check against DB or Config. For now, hardcode 'cheese-admin-key'
    expected_key = os.environ.get("CHEESE_API_KEY", "cheese-admin-key")
    if api_key_header == expected_key:
        return api_key_header
    raise HTTPException(status_code=401, detail="Invalid or missing API Key")

def audit_log(action: str, details: dict):
    # Simple Enterprise Audit Logger writing structured JSON
    log_entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "action": action,
        "details": details
    }
    with open(os.environ.get("CHEESE_AUDIT_LOG", "audit.log"), "a") as f:
        f.write(json.dumps(log_entry) + "\n")

app = FastAPI(
    title="Cheeserag Enterprise API",
    description="Local AI Operating System - Powered by PomaiDB",
    version="1.1.0"
)

# Observability Metrics
INGESTION_COUNT = Counter('cheeserag_documents_ingested_total', 'Total documents ingested')
RETRIEVAL_LATENCY = Histogram('cheeserag_retrieval_latency_seconds', 'Latency of retrieval requests')
CHUNK_COUNT = Counter('cheeserag_chunks_created_total', 'Total chunks created during ingestion')

metrics_app = make_asgi_app()
app.mount("/metrics", metrics_app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_db = None
_db_lock = threading.Lock()
_next_chunk_i = 0
_chunk_id_lock = threading.Lock()

def _ensure_db(cheese: str, emb_model: str, hint_from_vector: Optional[List[float]] = None):
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
        logger.info(f"Created RAG membrane: {membrane} with dim {dim}")
        
    return _db

class RetrieveRequest(BaseModel):
    query: str
    top_k: int = 5
    min_score: float = 0.0
    membrane: str | None = None

class IndexFileRequest(BaseModel):
    filepath: str

@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "rag_db_path": os.environ.get("RAG_DB_PATH"),
        "cheesebrain_url": os.environ.get("CHEESEBRAIN_URL")
    }

@app.get("/v1/models")
def get_models():
    return {
        "object": "list",
        "data": [{"id": "cheese_api", "object": "model", "owned_by": "cheeserag"}]
    }

@app.post("/v1/retrieve")
def retrieve(req: RetrieveRequest, api_key: str = Depends(get_api_key)):
    start_t = time.time()
    cheese = os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").strip()
    emb_model = os.environ.get("CHEESE_EMBEDDING_MODEL", "").strip()
    membrane = req.membrane or os.environ.get("RAG_MEMBRANE", "rag").strip() or "rag"

    logger.info(f"Retrieving for query: {req.query[:50]}...")
    v = fetch_embedding(cheese.rstrip("/"), req.query, model=emb_model)
    
    with _db_lock:
        db = _ensure_db(cheese, emb_model, hint_from_vector=v)
        res = pomaidb.search_rag_membrane(
            db, membrane,
            vector=v,
            text_query=req.query,
            top_k=req.top_k,
            ef=int(os.environ.get("RAG_EF_SEARCH", "128"))
        )

    context = ""
    hits = []
    if isinstance(res, list):
        for idx, r in enumerate(res):
            score = float(r.get("score", 0.0))
            if score < req.min_score:
                continue

            text = str(r.get("text", ""))
            cid = int(r.get("chunk_id", 0))
            if text:
                context += f"[Source Info: Chunk ID {cid}, Relevance Score {score:.3f}]\n{text}\n\n"
            hits.append({"chunk_id": cid, "score": score, "text": text})

    RETRIEVAL_LATENCY.observe(time.time() - start_t)
    audit_log("RETRIEVE", {"query": req.query, "top_k": req.top_k, "hits": len(hits)})
    return {"context": context.strip(), "hits": hits}

@app.post("/v1/ingest")
async def ingest(
    doc_id: int = Form(...),
    text: Optional[str] = Form(None),
    max_chunk_bytes: int = Form(512),
    overlap_bytes: int = Form(64),
    file: Optional[UploadFile] = File(None),
    api_key: str = Depends(get_api_key)
):
    cheese = os.environ.get("CHEESEBRAIN_URL", "http://127.0.0.1:8080").strip()
    emb_model = os.environ.get("CHEESE_EMBEDDING_MODEL", "").strip()
    membrane = os.environ.get("RAG_MEMBRANE", "rag").strip() or "rag"
    
    content = ""
    if file:
        file_bytes = await file.read()
        if file.filename and file.filename.lower().endswith(".pdf"):
            content = parse_pdf_bytes(file_bytes)
        else:
            content = file_bytes.decode("utf-8", errors="replace")
    elif text:
        content = text
    else:
        raise HTTPException(status_code=400, detail="Must provide either text or file")
    
    logger.info(f"Ingesting doc_id {doc_id}, length: {len(content)}")
    chunks = process_and_ingest(content, max_chunk_bytes, overlap_bytes)
    
    total_added = 0
    for text_piece, token_ids in chunks:
        v = fetch_embedding(cheese.rstrip("/"), text_piece, model=emb_model)
        with _db_lock:
            db = _ensure_db(cheese, emb_model, hint_from_vector=v)
            global _next_chunk_i
            with _chunk_id_lock:
                _next_chunk_i += 1
                cid = int((int(os.environ.get("RAG_CHUNK_ID_BASE", "1")) << 20) + _next_chunk_i)
            
            put_chunk_with_text(db, membrane, cid, doc_id, token_ids, v, text_piece)
        total_added += 1

    INGESTION_COUNT.inc()
    CHUNK_COUNT.inc(total_added)
    logger.success(f"Successfully ingested doc_id {doc_id} into {total_added} chunks.")
    audit_log("INGEST", {"doc_id": doc_id, "chunks_added": total_added, "bytes_processed": len(content)})
    return {"status": "ok", "chunks_added": total_added, "doc_id": doc_id}

@app.post("/v1/index_workspace")
def index_workspace(req: Request):
    """AST-indexes the entire active workspace into the workspace_code membrane."""
    _check_api_key(req)
    _ensure_db()
    
    membrane = "workspace_code"
    _ensure_membrane(membrane)
    
    logger.info("Starting AST workspace indexing...")
    chunks = index_project_workspace(".")
    logger.info(f"Extracted {len(chunks)} code blocks. Vectorizing...")
    
    doc_id = int(os.environ.get("WORKSPACE_DOC_ID", "999"))
    total_added = 0
    
    with _db_lock:
        global _next_chunk_i
        for text_piece in chunks:
            # Simple token hash
            words = text_piece.lower().split()
            token_ids = []
            for w in words[:48]:
                digest = hashlib.sha1(w.encode("utf-8")).digest()
                token_ids.append(int.from_bytes(digest[:4], "little"))
            if not token_ids:
                token_ids = [0]
                
            v = fetch_embedding(text_piece)
            
            _next_chunk_i += 1
            cid = int((int(doc_id) << 20) + _next_chunk_i)
            
            put_chunk_with_text(_db, membrane, cid, doc_id, token_ids, v, text_piece)
            total_added += 1
            
    logger.success(f"Workspace indexed! {total_added} AST chunks embedded.")
    return {"status": "ok", "code_blocks_indexed": total_added}

@app.post("/v1/index_file")
def index_file(req: Request, payload: IndexFileRequest):
    """AST-indexes a single file into the workspace_code membrane."""
    _check_api_key(req)
    _ensure_db()
    
    membrane = "workspace_code"
    _ensure_membrane(membrane)
    
    chunks = index_single_file(payload.filepath)
    if not chunks:
        return {"status": "ok", "code_blocks_indexed": 0}
        
    doc_id = int(os.environ.get("WORKSPACE_DOC_ID", "999"))
    total_added = 0
    with _db_lock:
        global _next_chunk_i
        for text_piece in chunks:
            words = text_piece.lower().split()
            token_ids = []
            for w in words[:48]:
                digest = hashlib.sha1(w.encode("utf-8")).digest()
                token_ids.append(int.from_bytes(digest[:4], "little"))
            if not token_ids:
                token_ids = [0]
            v = fetch_embedding(text_piece)
            _next_chunk_i += 1
            cid = int((int(doc_id) << 20) + _next_chunk_i)
            put_chunk_with_text(_db, membrane, cid, doc_id, token_ids, v, text_piece)
            total_added += 1
            
    logger.success(f"File {payload.filepath} indexed! {total_added} AST chunks embedded.")
    return {"status": "ok", "code_blocks_indexed": total_added}

if __name__ == "__main__":
    host = os.environ.get("RAG_FACADE_HOST", "127.0.0.1")
    port = int(os.environ.get("RAG_FACADE_PORT", "9090"))
    logger.info(f"Starting FastAPI Orchestrator on {host}:{port}")
    uvicorn.run(app, host=host, port=port, log_level="info")
