// Unit test for pomaicache: verify it can cache (Set/Get and PromptPut/PromptGet).
#ifdef NDEBUG
#undef NDEBUG
#endif

#include "pomaicache.h"

#include <cassert>
#include <cstdio>
#include <cstring>
#include <memory>
#include <vector>

int main() {
    pomaicache::Config cfg;
    cfg.memory_limit_bytes = 4 * 1024 * 1024;
    cfg.data_dir = "./test_pomaicache_data";

    std::unique_ptr<pomaicache::PomaiCache> cache;
    try {
        cache = std::make_unique<pomaicache::PomaiCache>(cfg);
    } catch (const std::exception& e) {
        std::fprintf(stderr, "test-pomaicache: init failed: %s\n", e.what());
        return 1;
    }

    // K/V cache: Set then Get
    const char key[] = "test_key";
    const char val[] = "test_value";
    std::vector<std::byte> value;
    for (size_t i = 0; val[i] != '\0'; ++i) {
        value.push_back(static_cast<std::byte>(val[i]));
    }
    pomaicache::Ttl ttl;
    ttl.ms = 60000;

    bool set_ok = cache->Set(key, value, ttl);
    assert(set_ok);

    auto got = cache->Get(key);
    assert(got.has_value());
    assert(got->size() == value.size());
    assert(std::memcmp(got->data(), value.data(), value.size()) == 0);

    // Prompt cache: store serialized tokens as "prefix"; same tokens on get => prefix match => hit.
    // Default prefix_min_tokens is 50, so use at least 50 tokens.
    std::vector<std::uint64_t> tokens(64);
    for (size_t i = 0; i < tokens.size(); ++i) tokens[i] = static_cast<std::uint64_t>(i + 1);
    std::vector<std::byte> artifact(tokens.size() * sizeof(std::uint64_t));
    std::memcpy(artifact.data(), tokens.data(), artifact.size());

    bool put_ok = cache->PromptPut(tokens, artifact, ttl);
    assert(put_ok);

    pomaicache::PromptResult res = cache->PromptGet(tokens);
    assert(res.hit && "prompt cache must hit when query bytes match stored prefix");
    assert(res.cached_tokens > 0);

    std::printf("test-pomaicache: passed (kv cache + prompt cache hit)\n");
    return 0;
}
