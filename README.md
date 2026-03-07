# Cheese Crab

<img src="./media/cheesecrab0.png"/>

Unified **edge AI inference engine**: run local LLMs on low-resource devices with minimal RAM. Think of it as local AI as lightweight as a crab—optimized for edge, laptops, and machines where you want to run 8B–13B models in about 4GB RAM.

Cheese Crab is built on [cheese.cpp](https://github.com/AutoCookies/cheesebrain) and adds mandatory context compression, prompt caching, optional RAG, and vision-token reduction so that inference stays fast and memory use stays low.

---

## Main purposes

- **Edge and low-resource inference**  
  Run quantized LLMs (e.g. Q4_0, Q5_0) on CPU or GPU with small RAM footprint. Defaults (Q4_0 KV cache, context squeeze, vision squeeze) are tuned for ~4GB usage.

- **Context and vision squeeze**  
  - **Text:** Long prompts are compressed before tokenization (context squeezer) so the model sees fewer tokens.  
  - **Vision / video:** After the vision encoder, embeddings are reduced (merge or subsample) so the LLM gets fewer image/video tokens.  
  Both are built in and always enabled in the server/CLI path.

- **Prompt prefix caching**  
  Repeated prompt prefixes are cached (pomaicache) to avoid recomputing the same KV cache across turns or users.

- **Optional RAG (PomaiDB)**  
  When configured, the server can augment prompts with retrieved chunks from a local vector DB for retrieval-augmented generation.

- **Single stack: CLI + HTTP server**  
  Use the same binary for interactive chat (`cheese-cli`) or an OpenAI-compatible API (`cheese-server`).

---

## Build

Requirements: CMake 3.14+, C++17, and (optional) a GPU backend.

```bash
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build . -j
```

Binaries are produced under `build/bin/`, including:

- `cheese-cli` — interactive chat CLI  
- `cheese-server` — HTTP API server  
- `cheese-quantize` — quantize GGUF models  
- `cheese-mtmd-cli` — multimodal (image/audio) CLI  

---

## Usage examples

### 1. Interactive chat (CLI)

Run with a local GGUF model:

```bash
./build/bin/cheese-cli -m models/qwen0.5b.gguf
```

One-off completion with a prompt and token limit:

```bash
./build/bin/cheese-cli -m models/qwen0.5b.gguf -p "Hello, how are you?" -n 64
```

Start without a model and load or pull one from the prompt:

```bash
./build/bin/cheese-cli
# Then: /model load models/qwen0.5b.gguf
# Or:  /model pull user/repo:Q4_K_M
```

Use more context or GPU layers if you have the RAM/VRAM:

```bash
./build/bin/cheese-cli -m models/qwen0.5b.gguf -c 2048 -ngl 99
```

### 2. HTTP server (OpenAI-compatible API)

Serve a single model:

```bash
./build/bin/cheese-server -m models/qwen0.5b.gguf --host 0.0.0.0 --port 8080
```

With optional web UI:

```bash
./build/bin/cheese-server -m models/qwen0.5b.gguf --port 8080 --webui
```

Chat completions are then available at `http://localhost:8080/v1/chat/completions` (and other OpenAI-style routes).

### 3. Context and vision squeeze (defaults)

- **Text:** Context squeeze is enabled by default (aggressiveness 6, min length 4096 chars). Tune with:
  - `CHEESE_SQUEEZE_AGGRESSIVENESS` (0–10)  
  - Server/params: `contextsqueeze_aggressiveness`, `contextsqueeze_min_chars`

- **Vision:** Vision token squeeze runs after the encoder (default aggressiveness 1). Tune with:
  - `CHEESE_VISION_SQUEEZE_AGGRESSIVENESS` (0–9)  
  - Server/params: `vision_squeeze_aggressiveness`

### 4. RAG (PomaiDB)

When building with PomaiDB, set a RAG DB path and embedding dimension so the server can augment prompts with retrieved chunks:

- Server params: `rag_db_path`, `rag_dim`, `rag_topk`, `rag_token_budget`, `rag_membrane`  
- Only used when `rag_db_path` is non-empty.

### 5. Multimodal (image / audio)

Use the multimodal CLI with a vision-capable model and projector:

```bash
./build/bin/cheese-mtmd-cli -m /path/to/model.gguf --mmproj /path/to/mmproj.gguf --image image.png
```

Vision token squeeze applies automatically when the server or pipeline uses the mtmd path with a positive `vision_squeeze_aggressiveness`.

---

## Details

| Area            | Detail |
|-----------------|--------|
| **KV cache**    | Default type is Q4_0 (not F16) to save RAM. Override with `-ctk` / `-ctv` or env `CHEESE_ARG_CACHE_TYPE_K` / `CHEESE_ARG_CACHE_TYPE_V`. |
| **Models**      | Place GGUF files in `models/` (or any path). Use `-m path/to/model.gguf` or `/model load path`. |
| **Quantization**| Use `cheese-quantize` to produce Q4_0/Q5_0 etc. Quantized models are recommended for edge. |
| **Tests / benches** | From `build/`: `ctest -j4` runs tests; vendor benches: `./bin/bench-contextsqueezer`, `./bin/bench-pomaicache`, `./bin/bench-pomaidb-rag`. |

---

## Project layout (short)

- `src/` — Core library (cheese, KV cache, model loading).  
- `common/` — Shared CLI/server params, parsing, download.  
- `tools/cli/` — `cheese-cli`.  
- `tools/server/` — `cheese-server` and server logic.  
- `tools/mtmd/` — Multimodal (vision/audio) encode/decode.  
- `vendor/` — Vendored libs: contextsqueezer, pomaicache, pomaidb, etc.  

For more on the CLI and server (all flags, env vars), see:

- [tools/cli/README.md](tools/cli/README.md)  
- [tools/server/README.md](tools/server/README.md)
