# llama.cpp Overview (Public Excerpt)

Source: https://raw.githubusercontent.com/ggml-org/llama.cpp/master/README.md

`llama.cpp` is an open-source project for running LLM inference in C/C++ with minimal setup.

Key points from the README:

- Goal: local and cloud inference with strong performance and low dependency overhead.
- Supports many hardware backends (CPU, Metal, CUDA, Vulkan, SYCL, and more).
- Supports quantized model formats to reduce memory and improve speed.
- Provides `llama-cli` and OpenAI-compatible `llama-server`.

Quick-start examples shown in README:

```sh
# Use a local model file
llama-cli -m my_model.gguf

# Or download and run from Hugging Face
llama-cli -hf ggml-org/gemma-3-1b-it-GGUF

# Launch OpenAI-compatible API server
llama-server -hf ggml-org/gemma-3-1b-it-GGUF
```

Additional README notes:

- The project tracks API changes for both `libllama` and `llama-server`.
- It lists broad model-family support (text and multimodal variants).
- It links installation guides for package manager, Docker, binary releases, and source builds.
