// Benchmark for pomaicache: exercises Set/Get and PromptPut/PromptGet, verifies correctness.
#include "pomaicache.h"

#include <chrono>
#include <cstdio>
#include <cstring>
#include <memory>
#include <vector>

static double now_sec() {
    using clock = std::chrono::high_resolution_clock;
    return 1e-9 * static_cast<double>(std::chrono::duration_cast<std::chrono::nanoseconds>(
        clock::now().time_since_epoch()).count());
}

int main() {
    pomaicache::Config cfg;
    cfg.memory_limit_bytes = 32 * 1024 * 1024;
    cfg.data_dir = "./bench_pomaicache_data";

    std::unique_ptr<pomaicache::PomaiCache> cache;
    try {
        cache = std::make_unique<pomaicache::PomaiCache>(cfg);
    } catch (const std::exception& e) {
        std::fprintf(stderr, "bench-pomaicache: init failed: %s\n", e.what());
        return 1;
    }

    pomaicache::Ttl ttl;
    ttl.ms = 60000;

    // ---- K/V bench ----
    const int kv_iters = 2000;
    std::vector<std::byte> value(256, std::byte{0xab});
    int kv_ok = 0;
    double t0 = now_sec();
    for (int i = 0; i < kv_iters; ++i) {
        char key[64];
        std::snprintf(key, sizeof(key), "kv_%d", i);
        if (!cache->Set(key, value, ttl)) continue;
        auto got = cache->Get(key);
        if (got.has_value() && got->size() == value.size() && std::memcmp(got->data(), value.data(), value.size()) == 0)
            ++kv_ok;
    }
    double t1 = now_sec();
    std::printf("pomaicache kv: ops=%d ok=%d elapsed=%.3fs ops/sec=%.0f\n",
                kv_iters, kv_ok, t1 - t0, kv_iters / (t1 - t0));
    if (kv_ok != kv_iters) {
        std::fprintf(stderr, "bench-pomaicache: kv ok=%d expected %d\n", kv_ok, kv_iters);
        return 1;
    }

    // ---- Prompt cache bench ----
    const int prompt_iters = 500;
    const size_t num_tokens = 64;
    std::vector<std::uint64_t> tokens(num_tokens);
    for (size_t i = 0; i < num_tokens; ++i) tokens[i] = static_cast<std::uint64_t>(i + 1);
    std::vector<std::byte> artifact(tokens.size() * sizeof(std::uint64_t));
    std::memcpy(artifact.data(), tokens.data(), artifact.size());

    int put_ok = 0, get_hits = 0;
    t0 = now_sec();
    for (int i = 0; i < prompt_iters; ++i) {
        if (cache->PromptPut(tokens, artifact, ttl)) ++put_ok;
        auto res = cache->PromptGet(tokens);
        if (res.hit && res.cached_tokens > 0) ++get_hits;
    }
    t1 = now_sec();
    std::printf("pomaicache prompt: put_ok=%d get_hits=%d/%d elapsed=%.3fs\n",
                put_ok, get_hits, prompt_iters, t1 - t0);
    if (put_ok != prompt_iters || get_hits != prompt_iters) {
        std::fprintf(stderr, "bench-pomaicache: prompt put_ok=%d get_hits=%d expected %d\n", put_ok, get_hits, prompt_iters);
        return 1;
    }

    std::printf("bench-pomaicache: passed (cache working correctly)\n");
    return 0;
}
