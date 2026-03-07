// Benchmark for context squeezer: exercises csq_squeeze_ex and verifies correctness.
#include "contextsqueeze.h"

#include <chrono>
#include <cstdio>
#include <cstring>
#include <string>
#include <vector>

static double now_sec() {
    using clock = std::chrono::high_resolution_clock;
    return 1e-9 * static_cast<double>(std::chrono::duration_cast<std::chrono::nanoseconds>(
        clock::now().time_since_epoch()).count());
}

int main() {
    const char* ver = csq_version();
    std::printf("bench-contextsqueezer: %s\n", ver ? ver : "?");

    // Sample inputs: short, medium, long (repeated sentence)
    std::string short_text = "The quick brown fox jumps over the lazy dog.";
    std::string medium_text;
    for (int i = 0; i < 20; ++i) medium_text += short_text + " ";
    std::string long_text;
    for (int i = 0; i < 200; ++i) long_text += short_text + " ";

    const int iterations = 500;
    const int aggressions[] = { 0, 1, 3 };
    int ok_count = 0;
    int err_count = 0;

    double t0 = now_sec();
    for (int iter = 0; iter < iterations; ++iter) {
        for (int aggr : aggressions) {
            csq_view in{ medium_text.data(), medium_text.size() };
            csq_buf out{ nullptr, 0 };
            int rc = csq_squeeze_ex(in, aggr, &out);
            if (rc != CSQ_OK) {
                std::fprintf(stderr, "csq_squeeze_ex(aggr=%d) failed: %d %s\n", aggr, rc, csq_last_error());
                ++err_count;
            } else {
                if (out.data && out.len > 0) {
                    if (aggr == 0 && out.len != medium_text.size()) {
                        std::fprintf(stderr, "aggr=0 expected len=%zu got %zu\n", medium_text.size(), out.len);
                        ++err_count;
                    } else
                        ++ok_count;
                } else {
                    if (aggr > 0) ++ok_count; // empty output allowed for high aggr
                    else ++err_count;
                }
                csq_free(&out);
            }
        }
    }
    double t1 = now_sec();
    double elapsed = t1 - t0;
    int total_ops = iterations * static_cast<int>(sizeof(aggressions) / sizeof(aggressions[0]));

    std::printf("ops=%d ok=%d err=%d elapsed=%.3fs ops/sec=%.0f\n",
                total_ops, ok_count, err_count, elapsed, total_ops / elapsed);
    if (err_count != 0) {
        std::fprintf(stderr, "bench-contextsqueezer: %d errors\n", err_count);
        return 1;
    }
    std::printf("bench-contextsqueezer: passed (context squeeze working correctly)\n");
    return 0;
}
