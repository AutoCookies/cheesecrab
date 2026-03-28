<div align="center">
  <img src="assets/logo.png" width="320" alt="Cheeserag Logo">
  <h1>Cheeserag</h1>
  <p><b>A unified, local RAG stack and autonomous developer agent with a "vibe".</b></p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Go Version](https://img.shields.io/badge/Go-1.23+-00ADD8.svg?style=flat&logo=go)](https://golang.org/)
  [![C++](https://img.shields.io/badge/C++-17-blue.svg?style=flat&logo=c%2B%2B)](https://en.cppreference.com/w/cpp/17)
</div>

---

**Cheeserag** is a high-performance, local-first retrieval-augmented generation (RAG) ecosystem. It combines a C++ inference engine, an embedded vector database, and a Go-based autonomous agent into a single, seamless developer experience.

<div align="center">
  <img src="assets/demo.png" width="800" alt="Cheeserag CLI Demo">
</div>

## ✨ Key Features

- 🧀 **Unified CLI (`cheese`)**: A single entry point to manage the entire stack—server, facade, and agent.
- 🧠 **Autonomous Agent**: Powered by [Cheesepath](https://github.com/AutoCookies/cheesepath), our ReAct agent searches local files, queries Wikipedia, and monitors your system.
- ⚡ **Local RAG Stack**:
  - **Cheesebrain**: C++ inference server (`/v1/chat/completions`).
  - **PomaiDB**: Embedded vector store for lightning-fast memory.
  - **RAG Facade**: Lightweight Python service bridging embeddings and storage.
- 🎭 **Smooth & Vibe UX**: A typewriter-style terminal interface with real-time slash suggestions (`/help`, `/history`) and minimalist "thinking" indicators.
- 💾 **Session Persistence**: Automatically remembers your conversations across restarts.
- 🛡️ **Safe Execution**: Local command execution with interactive confirmation gates and configurable allowlists.

## 🚀 Quickstart

The easiest way to get started is using the unified `cheese` wrapper:

```bash
# 1. Build the stack
./build.sh

# 2. Start the interactive chat
./cheese
```

The `cheese` script handles process lifecycles, readiness checks, and environment setup automatically.

## 🏗️ Architecture

Cheeserag is built on three core sub-modules:

| Component | Repository | Role |
|-----------|------------|------|
| **Inference** | [Cheesebrain](https://github.com/pomagrenate/cheesebrain) | OpenAI-compatible LLM & Embeddings server. |
| **Vector DB** | [PomaiDB](https://github.com/pomagrenate/pomaidb) | High-speed vector storage and search membrane. |
| **Agent** | [Cheesepath](https://github.com/pomagrenate/cheesepath) | The ReAct executor that manages tools and reasoning. |

## 🛠️ Advanced Usage

### Manual Service Management

If you prefer to run components separately:

1. **Start Inference**:
   ```bash
   ./third_party/cheesebrain/build/bin/cheese-server -m models/qwen2.5-0.5b.gguf --port 8080 --embeddings --pooling mean
   ```

2. **Start RAG Facade**:
   ```bash
   export CHEESEBRAIN_URL=http://localhost:8080
   python3 -m rag_facade
   ```

3. **Start Agent**:
   ```bash
   ./build/cheeserag-agent "How does the vector storage work?"
   ```

### Command Suggestions
In the interactive terminal, simply type `/` at any time to see available commands:
- `/help`: Detailed usage instructions.
- `/history`: Review previous turns in the session.
- `/clear`: Reset chat context and history.
- `/exit`: Securely shutdown all services and exit.

## 🧪 Development

### Building Submodules
```bash
# Update all submodules
git submodule update --init --recursive

# Build C++ and Go binaries
./build.sh
```

---

<p align="center">
  Made with 🧀 by the Pomagrenate Team.
</p>
