# Qdrant Overview (Public Excerpt)

Source: https://raw.githubusercontent.com/qdrant/qdrant/master/README.md

Qdrant is a vector similarity search engine and vector database, written in Rust.

Highlights from the README:

- Stores vectors with payload metadata for semantic search and filtering.
- Supports dense + sparse vectors for hybrid retrieval scenarios.
- Offers REST and gRPC APIs.
- Provides options for quantization and on-disk storage.
- Supports distributed deployment via sharding and replication.

Quick-start snippets shown in README:

```bash
pip install qdrant-client
```

```python
from qdrant_client import QdrantClient
qdrant = QdrantClient(":memory:")
# OR
client = QdrantClient(path="path/to/db")
```

```bash
docker run -p 6333:6333 qdrant/qdrant
```

README positioning:

- Good fit for semantic search, recommendations, matching, and RAG pipelines.
- Has client libraries across Go, Rust, JavaScript/TypeScript, Python, Java, and others.
