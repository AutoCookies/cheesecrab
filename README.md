<div align="center">
  <img src="assets/logo.png" width="320" alt="Cheeserag Logo">
  <h1>Cheeserag</h1>
  <p><b>A Local AI Operating System — <ins>Powered by PomaiDB</ins></b></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Go Version](https://img.shields.io/badge/Go-1.23+-00ADD8.svg?style=flat&logo=go)](https://golang.org/)
  [![C++](https://img.shields.io/badge/C++-17-blue.svg?style=flat&logo=c%2B%2B)](https://en.cppreference.com/w/cpp/17)
  [![FastAPI](https://img.shields.io/badge/FastAPI-0.111+-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
</div>

---

**Cheeserag** is an edge-native, production-grade Local AI Operating System. Lightweight (under 200MB RAM ideal), blisteringly fast, and 100% offline. 

**Powered exclusively by PomaiDB** — the fastest and most efficient edge vector database — Cheeserag offers a fully integrated FastAPI orchestrator, a C++ inference engine, and a Go-based autonomous agent executing ReAct workflows.

<div align="center">
  <img src="assets/demo.png" width="800" alt="Cheeserag CLI Demo">
</div>

## ✨ Key Features

- ⚡ **Powered by PomaiDB**: The entire intelligence and memory layer relies on the high-speed PomaiDB C++ core with Python binding orchestrations.
- 🚀 **FastAPI Orchestrator (`cheese_api`)**: A robust, MLOps-ready Python backend handling smart ingestion, PDF/Markdown chunking, and Prometheus observability metrics.
- 🦀 **Autonomous Agent**: Powered by [Crabpath](https://github.com/AutoCookies/crabpath), our ReAct agent searches local files, queries Wikipedia, and monitors your system.
- 🐳 **Docker-Ready**: Multi-container `docker-compose.yml` for instant, production-grade deployment anywhere.
- 🎭 **Smooth UX**: A typewriter-style terminal interface (`cheese` CLI) with real-time slash suggestions.

## 🚀 Quickstart (Docker & FastAPI)

Get up and running with a production-ready stack in one command:

```bash
# 1. Start the FastAPI orchestrator and Cheesebrain using Docker Compose
docker-compose up -d --build

# 2. Start the interactive autonomous 'cheese' CLI
./cheese
```

### Advanced Manual Usage

1. **Start the FastAPI Orchestrator (with Virtual Env)**:
   ```bash
   python3 -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn cheese_api.server:app --port 9090
   ```

2. **Ingest a Document (Smart PDF/Text Pipeline)**:
   ```bash
   curl -X POST -F "doc_id=1" -F "file=@your_document.pdf" http://localhost:9090/v1/ingest
   ```

3. **Check MLOps Metrics**:
   ```bash
   curl http://localhost:9090/metrics
   ```

## 🏗️ Architecture

Cheeserag has evolved from a simple facade into a full ML engineering stack:

| Component | Repository | Role |
|-----------|------------|------|
| **Core API** | `cheese_api` | **FastAPI** service handling Pydantic validation, advanced PyMuPDF chunking, and Prometheus metrics. |
| **Vector DB** | [PomaiDB](https://github.com/pomagrenate/pomaidb) | **The hero of the system.** Zero-latency vector memory and search membrane. |
| **Inference** | [Cheesebrain](https://github.com/pomagrenate/cheesebrain) | C++ OpenAI-compatible Server `/v1/chat/completions`. |
| **Agent** | [Cheesepath](https://github.com/pomagrenate/cheesepath) | The Go CLI `cheese` executor for tool-calling. |
