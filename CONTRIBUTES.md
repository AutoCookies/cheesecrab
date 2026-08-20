# Contributing to Cheeserag Studio

Thank you for your interest in contributing to **Cheeserag Studio** 🧀

Cheeserag Studio is a privacy-first, local RAG workspace built around **local LLM inference, embedded vector search, grounded citations, AI agents, and offline document processing**.

Contributions are welcome across the entire stack — from C++ performance improvements and RAG retrieval algorithms to Go agents, Python APIs, frontend UX, documentation, and edge-device optimization.

> **Small, focused improvements are better than large, unnecessary rewrites.**

---

## 🧭 Before You Start

Before opening an issue or pull request:

1. Search existing issues and pull requests.
2. Check the documentation for the component you want to modify.
3. Make sure your change fits the project's **local-first and privacy-first philosophy**.
4. Keep changes focused on one problem.
5. Run the relevant tests before submitting a PR.

For large architectural changes, open an issue first so the design can be discussed before implementation begins.

---

# 🏗️ Project Architecture

Cheeserag Studio is composed of several major components:

```text
cheeserag/
│
├── third_party/
│   ├── cheesebrain/       # Local LLM + embedding inference
│   ├── pomaidb/           # Embedded vector database
│   └── cheesepath/        # Agent/tooling framework
│
├── cheese_api/            # FastAPI RAG backend
│
├── cmd/
│   ├── cheeserag-agent/   # Autonomous AI agent
│   └── cheeserag-ingest/  # Document ingestion CLI
│
├── studio/                # Next.js web workspace
│
├── models/                # Local GGUF models
│
└── rag_db/                # Local RAG database
```

Contributions should normally stay within the component responsible for the behavior being changed.

---

# 🎯 What Can You Contribute?

## 🧠 RAG & AI

Help improve:

* Retrieval quality
* Chunking strategies
* Embedding pipelines
* Hybrid search
* Citation accuracy
* Closed-book retrieval
* Prompt engineering
* Small-model optimization
* Context management
* Local model support
* Audio overview generation

---

## 🦣 PomaiDB

PomaiDB is the embedded vector database powering Cheeserag's local knowledge layer.

Contributions can include:

* Vector indexing
* Search performance
* Memory efficiency
* Storage improvements
* HNSW / IVF optimization
* Metadata filtering
* Flash-friendly storage
* Edge-device optimization
* C++ API improvements
* Testing and benchmarks

When modifying PomaiDB, avoid introducing unnecessary dependencies into the core database.

---

## 🤖 Cheeserap Agent

The Go agent provides autonomous interaction with the RAG workspace.

Contributions can improve:

* Agent strategies
* Tool calling
* ReAct execution
* Planning
* Reflection
* Multi-agent panels
* Agent memory
* CLI experience
* Error handling
* Agent observability

---

## 🖥️ Studio

The Next.js frontend contains the document and AI workspace.

Contributions are welcome for:

* UI/UX
* Source management
* Chat
* Citations
* Notes
* Workspace management
* Document viewers
* Accessibility
* Responsive layouts
* Loading and error states

Avoid adding UI complexity that does not improve the user's workflow.

---

## 📄 Document Processing

Cheeserag supports local document ingestion.

Useful contributions include:

* PDF parsing
* OCR
* CSV processing
* Text extraction
* Code indexing
* Chunking
* Metadata extraction
* Large-document handling
* Encoding fixes
* Error recovery

Document processing should remain **local by default**.

---

# 🔒 Privacy Principles

Privacy is a core architectural requirement of Cheeserag Studio.

When contributing, keep these principles in mind:

### Never send user documents to external services without explicit configuration.

Avoid introducing:

* Hidden telemetry
* External analytics
* Cloud document processing
* Unnecessary API calls
* Remote embedding services as mandatory dependencies
* Automatic document uploads

If an external service is genuinely useful, it should be:

1. Explicitly opt-in.
2. Clearly documented.
3. Disabled by default where practical.
4. Separated from the local-first pipeline.

---

# 🌱 Development Setup

## 1. Fork the Repository

Fork the repository on GitHub and clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/cheeserag.git
cd cheeserag
```

Initialize submodules:

```bash
git submodule update --init --recursive
```

Add the upstream repository:

```bash
git remote add upstream https://github.com/pomagrenate/cheeserag.git
```

---

# 🌿 Branching

Create a dedicated branch for your change.

```bash
git checkout -b feature/improve-retrieval
```

Recommended naming:

```text
feature/<description>
fix/<description>
perf/<description>
refactor/<description>
docs/<description>
test/<description>
chore/<description>
```

Examples:

```text
feature/hybrid-search
fix/pdf-page-citation
perf/vector-search
docs/local-installation
test/rag-retrieval
```

---

# ✍️ Coding Guidelines

## C++

Use modern C++20 where appropriate.

Prefer:

* RAII
* Smart pointers
* Clear ownership
* `const` correctness
* Small interfaces
* Explicit error handling
* Deterministic behavior

Avoid:

* Raw ownership
* Global mutable state
* Unnecessary threading
* Hidden allocations in hot paths
* Unnecessary dependencies

Performance-sensitive changes should include benchmarks when practical.

---

## Python

Follow the existing FastAPI and Python project structure.

Prefer:

* Type hints
* Small functions
* Explicit error handling
* Clear API boundaries
* Async operations for I/O-bound workloads

Avoid placing business logic directly inside API route handlers when it can be isolated into a service or module.

---

## Go

Follow standard Go conventions.

Run:

```bash
gofmt -w .
```

Before submitting changes, run:

```bash
go test ./...
```

Keep agent behavior deterministic where possible and make tool failures explicit.

---

## TypeScript / Next.js

Keep components focused and reusable.

Prefer:

* Type-safe APIs
* Clear component boundaries
* Accessible interactions
* Server/client boundaries that are intentional
* Existing design patterns

Avoid introducing large UI libraries for small isolated requirements.

---

# 🧪 Testing

Every bug fix should ideally include a regression test.

Run the relevant test suites before opening a PR.

### C++

```bash
cmake -S . -B build \
  -DCMAKE_BUILD_TYPE=Release \
  -DPOMAI_BUILD_TESTS=ON

cmake --build build -j$(nproc)

ctest \
  --test-dir build \
  --output-on-failure
```

### Go

```bash
go test ./...
```

### Python

```bash
pytest
```

### Studio

```bash
cd studio
npm run lint
```

If a complete test suite cannot be executed locally, clearly mention what was and was not tested in the pull request.

---

# 📊 Performance Contributions

Performance changes are especially valuable for:

* Vector search
* Embedding
* Document ingestion
* RAG retrieval
* Memory usage
* Startup time
* Edge hardware
* Large document processing

When submitting a performance improvement, provide a before/after comparison where possible.

Example:

```text
Before:
Search P95: 42 ms
Memory:      180 MB

After:
Search P95: 28 ms
Memory:      120 MB

Improvement:
P95 latency: -33%
Memory:      -33%
```

Avoid claiming performance improvements without measurements.

---

# 🧠 RAG Contributions

RAG changes require additional care because seemingly small changes can affect:

```text
Document
   ↓
Chunking
   ↓
Embedding
   ↓
Retrieval
   ↓
Context
   ↓
LLM
   ↓
Citation
```

If you modify one stage, check whether it affects downstream stages.

For retrieval changes, include examples where possible:

```text
Question:
What is the main purpose of X?

Expected:
Source A

Previous:
Source B

New:
Source A
```

For citation changes, verify that citations still point to the correct:

* File
* Page
* Line
* Byte offset
* Source chunk

---

# 🤖 Small-Model Compatibility

Cheeserag Studio is intentionally optimized for local models, including relatively small models.

When modifying prompts or agent behavior:

> **Do not assume a large frontier model is available.**

Test changes against the project's supported local model configuration when possible.

Prefer:

```text
Better retrieval
+
Smaller context
+
Deterministic processing
```

over:

```text
Huge prompt
+
Huge context
+
More model tokens
```

---

# 📝 Commit Messages

Use clear and concise commit messages.

Recommended format:

```text
<type>: <short description>
```

Examples:

```text
feat: add hybrid retrieval
fix: correct PDF citation offsets
perf: reduce vector search allocations
refactor: simplify ingestion pipeline
docs: improve local setup guide
test: add closed-book retrieval cases
chore: update cheesebrain submodule
```

Keep the first line short and descriptive.

---

# 🔀 Pull Requests

Before opening a PR:

```bash
git fetch upstream
git rebase upstream/main
```

Then push your branch:

```bash
git push origin feature/your-change
```

Open a pull request against:

```text
pomagrenate/cheeserag:main
```

---

# 📋 Pull Request Requirements

A good PR should explain:

### What changed?

Describe the implementation clearly.

### Why?

Explain the problem being solved.

### How?

Briefly describe the technical approach.

### Testing

Include the commands you ran.

### Performance

If applicable, include before/after measurements.

### Screenshots

For UI changes, include screenshots or a short recording.

---

# 📝 Pull Request Template

Use the following structure when opening a PR:

````markdown
## Summary

<!-- What does this PR change? -->

## Motivation

<!-- Why is this change necessary? -->

## Changes

- 
- 
- 

## Testing

- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

### Commands

```bash
# commands used for testing
````

## Performance

<!-- Add benchmarks if this PR affects performance. -->

## Screenshots

<!-- Required for UI changes. -->

## Breaking Changes

* [ ] No
* [ ] Yes

If yes, explain:

## Checklist

* [ ] I have read CONTRIBUTING.md
* [ ] My changes follow the project architecture
* [ ] I added or updated tests where appropriate
* [ ] I updated documentation where necessary
* [ ] I tested my changes locally
* [ ] I did not introduce unnecessary external services
* [ ] I did not add hidden telemetry or data collection

````

---

# 🐛 Bug Reports

Before opening a bug report, search existing issues.

A useful bug report should contain:

```text
Environment
OS
Architecture
Hardware
Model
Version
Configuration
````

Then provide:

```text
Expected behavior
Actual behavior
Steps to reproduce
Logs
Minimal reproduction
```

For AI/RAG bugs, also include:

* Document type
* Approximate document size
* Model
* Embedding model
* Retrieval parameters
* Relevant query
* Expected source
* Actual source

**Never upload confidential documents or private data to an issue.**

Use a sanitized reproduction instead.

---

# 💡 Feature Requests

Feature requests are welcome.

A good proposal should explain:

1. What problem does it solve?
2. Who benefits from it?
3. Why should it belong in Cheeserag Studio?
4. How could it fit the current architecture?
5. Does it preserve the local-first philosophy?

For example:

```text
Problem:
Users cannot search scanned PDFs locally.

Proposal:
Add OCR indexing to the ingestion pipeline.

Why:
Makes scanned documents searchable without cloud OCR.

Privacy:
OCR runs entirely locally.
```

---

# 🏛️ Architectural Changes

Large architectural changes should be discussed before implementation.

Examples include:

* Replacing PomaiDB
* Replacing Cheesebrain
* Changing the RAG architecture
* Adding a new runtime service
* Introducing a distributed backend
* Changing the storage model
* Adding mandatory cloud dependencies

Open an issue with:

```text
## Problem

## Current Architecture

## Proposed Architecture

## Alternatives Considered

## Trade-offs

## Privacy Impact

## Performance Impact

## Migration Plan
```

The goal is to avoid spending weeks implementing a direction that does not fit the project.

---

# 🔄 Submodules

Cheeserag Studio contains important components as Git submodules.

When updating a submodule:

```bash
cd third_party/<component>

git fetch
git checkout <commit>

cd ../..

git add third_party/<component>
git commit -m "chore: update <component> submodule"
```

Do not modify third-party code directly inside the Cheeserag repository unless the change is intentionally part of the vendored/submodule workflow.

---

# 📖 Documentation

Documentation improvements are always welcome.

You can contribute:

* Installation guides
* API documentation
* Architecture explanations
* Tutorials
* Examples
* Troubleshooting
* Performance notes
* RAG research
* Deployment guides

Documentation should favor **clear examples over unnecessary theory**.

---

# 🔐 Responsible Security Disclosure

Please do **not** publicly disclose security vulnerabilities before they can be investigated.

If you discover a security issue involving:

* Authentication
* Data exposure
* Local file access
* Remote code execution
* API security
* Dependency vulnerabilities
* Privacy violations

contact the maintainers privately before creating a public issue.

Do not include real credentials, private documents, API keys, or personal information in reports.

---

# 🧹 Keep Changes Focused

A pull request should solve one problem.

Prefer:

```text
PR #1
Fix PDF citation offsets
```

over:

```text
PR #1
Fix PDF citations
Rewrite ingestion
Refactor API
Redesign UI
Upgrade dependencies
Rename modules
```

Small PRs are easier to:

* Review
* Test
* Understand
* Revert
* Maintain

> **Small focused change > giant rewrite.**

---

# ❤️ Design Principles

Contributors should keep these principles in mind:

### 1. Local First

If functionality can run locally, prefer the local implementation.

### 2. Privacy First

User documents belong to the user.

### 3. Deterministic Where Possible

Let software handle tasks that do not require an LLM.

### 4. Small Models Matter

Design the system so useful AI does not require enormous models.

### 5. Resource Awareness

Memory, CPU, disk I/O, and GPU resources are finite.

### 6. Keep It Understandable

Prefer simple architecture over unnecessary abstraction.

### 7. Measure Before Optimizing

Performance improvements should be demonstrated with measurements.

---

# 🌟 Good First Contributions

New contributors can start with:

* Documentation fixes
* Installation improvements
* Example applications
* Unit tests
* UI accessibility
* Error messages
* Small ingestion fixes
* Citation improvements
* CLI improvements
* Benchmark tooling

Look for issues labeled:

```text
good first issue
help wanted
documentation
```

---

# 🤝 Community Expectations

Contributors are expected to:

* Be respectful
* Discuss ideas constructively
* Explain technical decisions
* Accept review feedback
* Keep discussions focused
* Avoid personal attacks
* Respect different levels of experience

Technical disagreement is completely fine.

Personal hostility is not.

Please read [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) for the project's community standards.

---

# 🚀 From Idea to Merge

A typical contribution follows this workflow:

```text
                 Idea
                  │
                  ▼
            Search Issues
                  │
                  ▼
            Open Discussion
                  │
                  ▼
             Create Branch
                  │
                  ▼
              Implement
                  │
                  ▼
                Test
                  │
                  ▼
          Benchmark if needed
                  │
                  ▼
             Open PR
                  │
                  ▼
               Review
                  │
                  ▼
             Improvements
                  │
                  ▼
                Merge
```

---

# 🧀 Final Note

Cheeserag Studio is built around a simple idea:

> **Your knowledge should remain yours.**

If you are interested in **local AI, private RAG, embedded vector databases, small language models, AI agents, offline document processing, or edge AI**, there are many ways to contribute.

Whether you fix a typo, improve a retrieval algorithm, optimize C++, add a new document parser, improve the UI, or design a better agent strategy — **your contribution helps make local AI more practical.**

Thank you for building with us. 🧀

---

<div align="center">

### Build Local. Keep Private. Make AI Useful.

**Cheeserag Studio**

[⭐ Star the project](https://github.com/pomagrenate/cheeserag) ·
[🐛 Report a bug](https://github.com/pomagrenate/cheeserag/issues) ·
[💡 Request a feature](https://github.com/pomagrenate/cheeserag/issues)

</div>
