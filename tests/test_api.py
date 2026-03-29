"""
tests/test_api.py

Automated Test Suite for the Cheeserag Enterprise API.
Tests core endpoints using FastAPI's TestClient without relying on a full PomaiDB instance via monkeypatching.
"""

from fastapi.testclient import TestClient
from pathlib import Path
import sys
import os
import pytest

# Insert application path
_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(_ROOT))

from cheese_api.server import app

# Setup test environment variables
os.environ["CHEESE_API_KEY"] = "test-key"
os.environ["RAG_DB_PATH"] = "/tmp/test_db"
os.environ["CHEESEBRAIN_URL"] = "http://localhost:8080" # Mocked

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert response.json()["rag_db_path"] == "/tmp/test_db"

def test_get_models():
    response = client.get("/v1/models")
    assert response.status_code == 200
    assert response.json()["object"] == "list"
    assert response.json()["data"][0]["id"] == "cheese_api"

def test_unauthorized_retrieve():
    # Should fail without API Key
    payload = {"query": "test query", "top_k": 3}
    response = client.post("/v1/retrieve", json=payload)
    assert response.status_code == 401

def test_unauthorized_ingest():
    # Should fail without API Key
    payload = {"doc_id": "1", "text": "hello"}
    response = client.post("/v1/ingest", data=payload)
    assert response.status_code == 401
    
# Advanced RAG integration tests (Requires full C++ backend, skipped in basic CI)
# @pytest.mark.skip(reason="Needs real PomaiDB instance")
# def test_retrieve_authorized():
#    ...
