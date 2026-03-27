#!/usr/bin/env bash
# Ingest sample doc → run agent. Requires: cheese-server + rag_facade (same RAG_EMBEDDING_DIM as facade).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
# shellcheck disable=SC1091
source "$ROOT/scripts/rag_env.sh"

if [[ ! -f "$POMAI_C_LIB" ]]; then
  echo "Missing $POMAI_C_LIB — build PomaiDB first (see README)." >&2
  exit 1
fi

if [[ -z "${RAG_EMBEDDING_DIM:-}" ]]; then
  echo "RAG_EMBEDDING_DIM unset — probing Cheesebrain (start cheese-server first)…" >&2
  RAG_EMBEDDING_DIM="$(python3 "$ROOT/scripts/probe_embedding_dim.py")"
  export RAG_EMBEDDING_DIM
  echo "export RAG_EMBEDDING_DIM=$RAG_EMBEDDING_DIM  # use this when starting rag_facade" >&2
fi

FACADE="${RAG_FACADE_URL:-http://127.0.0.1:9090}"
export CHEESERAG_DEMO_TEXT="${CHEESERAG_DEMO_TEXT:-Cheeserag is a local RAG stack: PomaiDB stores chunks, Cheesebrain embeds and chats, Cheesepath runs the agent with rag_retrieve.}"
PAYLOAD="$(python3 -c "import json,os; print(json.dumps({'doc_id': 1, 'text': os.environ['CHEESERAG_DEMO_TEXT']}))")"

curl -sS "${FACADE%/}/v1/ingest" -H 'Content-Type: application/json' -d "$PAYLOAD"
echo "" >&2

Q="${CHEESERAG_DEMO_QUESTION:-What is Cheeserag and which components does it use?}"
export CHEESEBRAIN_URL RAG_FACADE_URL CHEESECRAB_REGISTRY_URL
export CHEESERAG_MINIMAL_TOOLS="${CHEESERAG_MINIMAL_TOOLS:-1}"
cd "$ROOT"
go run ./cmd/cheeserag-agent "$Q"
