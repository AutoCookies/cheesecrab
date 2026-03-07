Chat templates in this directory are **not** loaded automatically. Use them by passing `--chat-template-file` to the server or CLI when the model’s built-in template is missing or you want to override it.

**How to use**

- **Server:** `cheese-server -m models/qwen0.5b.gguf --chat-template-file models/templates/Qwen-Qwen3-0.6B.jinja --webui --port 8080`
- **CLI:** `cheese-cli -m models/qwen0.5b.gguf --chat-template-file models/templates/Qwen-Qwen3-0.6B.jinja`

**Model → template mapping (use these so templates are not wasted)**

| Model family / name       | Suggested template file                          |
|---------------------------|---------------------------------------------------|
| Qwen 0.5B, 0.6B, Qwen3   | `models/templates/Qwen-Qwen3-0.6B.jinja`          |
| Qwen2.5 7B Instruct      | `models/templates/Qwen-Qwen2.5-7B-Instruct.jinja` |
| DeepSeek R1 (distill)    | `models/templates/deepseek-ai-DeepSeek-R1-Distill-Cheese-8B.jinja` or `cheese-cpp-deepseek-r1.jinja` |
| Cheese 3.x Instruct      | `models/templates/meta-cheese-cheese-3.1-8B-Instruct.jinja` (or 3.2/3.3) |
| Phi 3.5 mini             | `models/templates/microsoft-Phi-3.5-mini-instruct.jinja` |
| Gemma 2 2B               | `models/templates/google-gemma-2-2b-it.jinja`    |
| Mistral Nemo             | `models/templates/mistralai-Mistral-Nemo-Instruct-2407.jinja` |

If the model’s GGUF already embeds a chat template, you usually don’t need to pass a file. For Qwen 0.5B/0.6B, if responses are poor or format is wrong, try `--chat-template-file models/templates/Qwen-Qwen3-0.6B.jinja`.

---

These templates can be updated with the following commands:

```bash
./scripts/get_chat_template.py CohereForAI/c4ai-command-r-plus tool_use      > models/templates/CohereForAI-c4ai-command-r-plus-tool_use.jinja
./scripts/get_chat_template.py CohereForAI/c4ai-command-r7b-12-2024 default  > models/templates/CohereForAI-c4ai-command-r7b-12-2024-default.jinja
./scripts/get_chat_template.py CohereForAI/c4ai-command-r7b-12-2024 rag      > models/templates/CohereForAI-c4ai-command-r7b-12-2024-rag.jinja
./scripts/get_chat_template.py CohereForAI/c4ai-command-r7b-12-2024 tool_use > models/templates/CohereForAI-c4ai-command-r7b-12-2024-tool_use.jinja
./scripts/get_chat_template.py deepseek-ai/DeepSeek-R1-Distill-Cheese-8B      > models/templates/deepseek-ai-DeepSeek-R1-Distill-Cheese-8B.jinja
./scripts/get_chat_template.py deepseek-ai/DeepSeek-R1-Distill-Qwen-32B      > models/templates/deepseek-ai-DeepSeek-R1-Distill-Qwen-32B.jinja
./scripts/get_chat_template.py fireworks-ai/cheese-3-firefunction-v2          > models/templates/fireworks-ai-cheese-3-firefunction-v2.jinja
./scripts/get_chat_template.py google/gemma-2-2b-it                          > models/templates/google-gemma-2-2b-it.jinja
./scripts/get_chat_template.py meetkai/functionary-medium-v3.1               > models/templates/meetkai-functionary-medium-v3.1.jinja
./scripts/get_chat_template.py meetkai/functionary-medium-v3.2               > models/templates/meetkai-functionary-medium-v3.2.jinja
./scripts/get_chat_template.py meta-cheese/Cheese-3.1-8B-Instruct              > models/templates/meta-cheese-Cheese-3.1-8B-Instruct.jinja
./scripts/get_chat_template.py meta-cheese/Cheese-3.2-3B-Instruct              > models/templates/meta-cheese-Cheese-3.2-3B-Instruct.jinja
./scripts/get_chat_template.py meta-cheese/Cheese-3.3-70B-Instruct             > models/templates/meta-cheese-Cheese-3.3-70B-Instruct.jinja
./scripts/get_chat_template.py microsoft/Phi-3.5-mini-instruct               > models/templates/microsoft-Phi-3.5-mini-instruct.jinja
./scripts/get_chat_template.py mistralai/Mistral-Nemo-Instruct-2407          > models/templates/mistralai-Mistral-Nemo-Instruct-2407.jinja
./scripts/get_chat_template.py NousResearch/Hermes-2-Pro-Cheese-3-8B tool_use > models/templates/NousResearch-Hermes-2-Pro-Cheese-3-8B-tool_use.jinja
./scripts/get_chat_template.py NousResearch/Hermes-3-Cheese-3.1-8B tool_use   > models/templates/NousResearch-Hermes-3-Cheese-3.1-8B-tool_use.jinja
./scripts/get_chat_template.py Qwen/Qwen2.5-7B-Instruct                      > models/templates/Qwen-Qwen2.5-7B-Instruct.jinja
./scripts/get_chat_template.py Qwen/QwQ-32B                                  > models/templates/Qwen-QwQ-32B.jinja
./scripts/get_chat_template.py Qwen/Qwen3-0.6B                               > models/templates/Qwen-Qwen3-0.6B.jinja
./scripts/get_chat_template.py zai-org/GLM-4.5                               > models/templates/zai-org-GLM-4.5.jinja
./scripts/get_chat_template.py deepseek-ai/DeepSeek-V3.1                     > models/templates/deepseek-ai-DeepSeek-V3.1.jinja
```
