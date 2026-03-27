# Sample Data For PomaiDB Ingestion

This folder contains small public documents you can ingest into PomaiDB for RAG testing.

## Included files

- `llama_cpp_overview.md`: excerpt from the public `llama.cpp` README.
- `qdrant_overview.md`: excerpt from the public `Qdrant` README.

## Source URLs

- https://raw.githubusercontent.com/ggml-org/llama.cpp/master/README.md
- https://raw.githubusercontent.com/qdrant/qdrant/master/README.md

## Quick ingest example

Use your existing facade endpoint:

```bash
curl -sS -X POST "$RAG_FACADE_URL/v1/ingest" \
  -H "Content-Type: application/json" \
  -d @- <<'JSON'
{
  "texts": [
    {"source": "data/llama_cpp_overview.md", "text": "REPLACE_WITH_FILE_CONTENT"},
    {"source": "data/qdrant_overview.md", "text": "REPLACE_WITH_FILE_CONTENT"}
  ]
}
JSON
```

Or use your existing ingest script/demo flow if you already have one in this repo.
