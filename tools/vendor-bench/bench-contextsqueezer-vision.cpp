// Benchmark for context squeezer vision API: synthetic grid, report throughput.
#include "contextsqueeze.h"

#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <vector>

static double now_sec() {
    using clock = std::chrono::high_resolution_clock;
    return 1e-9 * static_cast<double>(std::chrono::duration_cast<std::chrono::nanoseconds>(
        clock::now().time_since_epoch()).count());
}

int main() {
    const unsigned int n_embd = 256;
    const size_t nx = 64, ny = 64;
    const size_t n_tokens = nx * ny;
    std::vector<float> grid(n_tokens * n_embd);
    for (size_t i = 0; i < grid.size(); ++i)
        grid[i] = static_cast<float>(rand()) / RAND_MAX;

    const int iterations = 100;
    int ok = 0, err = 0;

    double t0 = now_sec();
    for (int i = 0; i < iterations; ++i) {
        float* out = nullptr;
        size_t out_n = 0;
        size_t out_nx = 0, out_ny = 0;
        int rc = csq_squeeze_vision_embd(grid.data(), n_tokens, n_embd, 2, nx, ny, &out, &out_n, &out_nx, &out_ny);
        if (rc != CSQ_OK || !out || out_n == 0) {
            ++err;
        } else {
            ++ok;
            csq_free_vision_embd(out);
        }
    }
    double t1 = now_sec();
    double elapsed = t1 - t0;

    std::printf("bench-contextsqueezer-vision: %dx%dx%d embd, aggr=2, ops=%d ok=%d err=%d elapsed=%.3fs ops/sec=%.0f\n",
                (int)nx, (int)ny, (int)n_embd, iterations, ok, err, elapsed, iterations / elapsed);
    if (err != 0) {
        std::fprintf(stderr, "bench-contextsqueezer-vision: %d errors\n", err);
        return 1;
    }
    std::printf("bench-contextsqueezer-vision: passed\n");
    return 0;
}
