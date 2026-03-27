#!/usr/bin/env bash
# Source from repo root:  source scripts/rag_env.sh
# Sets POMAI_C_LIB, default RAG_* paths; set RAG_EMBEDDING_DIM after probe_embedding_dim.py

CHEESERAG_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export POMAI_C_LIB="${POMAI_C_LIB:-$CHEESERAG_ROOT/third_party/pomaidb/build/libpomai_c.so}"
export RAG_DB_PATH="${RAG_DB_PATH:-$CHEESERAG_ROOT/.cache/cheeserag_pomai}"
export CHEESEBRAIN_URL="${CHEESEBRAIN_URL:-http://127.0.0.1:8080}"
export RAG_FACADE_URL="${RAG_FACADE_URL:-http://127.0.0.1:9090}"
export RAG_FACADE_HOST="${RAG_FACADE_HOST:-127.0.0.1}"
export RAG_FACADE_PORT="${RAG_FACADE_PORT:-9090}"
export RAG_MEMBRANE="${RAG_MEMBRANE:-rag}"
mkdir -p "$RAG_DB_PATH"
