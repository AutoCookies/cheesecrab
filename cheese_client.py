"""
cheese_client.py

A lightweight Python SDK for interacting with the Cheeserag Enterprise OS.
"""

import requests
from typing import Optional, Dict, Any

class CheeseClient:
    def __init__(self, base_url: str = "http://127.0.0.1:9090", api_key: str = "cheese-admin-key"):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.headers = {"X-API-Key": self.api_key}

    def health(self) -> Dict[str, Any]:
        """Check API health."""
        resp = requests.get(f"{self.base_url}/health")
        resp.raise_for_status()
        return resp.json()

    def retrieve(self, query: str, top_k: int = 5) -> Dict[str, Any]:
        """Perform a vector-based semantic search."""
        payload = {"query": query, "top_k": top_k}
        resp = requests.post(f"{self.base_url}/v1/retrieve", json=payload, headers=self.headers)
        resp.raise_for_status()
        return resp.json()

    def ingest_text(self, doc_id: int, text: str) -> Dict[str, Any]:
        """Ingest raw string text into the RAG membrane."""
        data = {"doc_id": doc_id, "text": text}
        resp = requests.post(f"{self.base_url}/v1/ingest", data=data, headers=self.headers)
        resp.raise_for_status()
        return resp.json()

    def ingest_file(self, doc_id: int, file_path: str) -> Dict[str, Any]:
        """Upload and ingest a file (PDF, TXT, MD)."""
        data = {"doc_id": doc_id}
        with open(file_path, "rb") as f:
            files = {"file": f}
            resp = requests.post(f"{self.base_url}/v1/ingest", data=data, files=files, headers=self.headers)
            resp.raise_for_status()
        return resp.json()

if __name__ == "__main__":
    print("🧀 CheeseClient initialized. Try creating a client instance to connect!")
