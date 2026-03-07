// Unit test for context squeezer vision API: reduce embedding tokens (1D and 2D).
#ifdef NDEBUG
#undef NDEBUG
#endif

#include "contextsqueeze.h"

#include <cassert>
#include <cstdio>
#include <cstring>
#include <vector>

int main() {
    const unsigned int n_embd = 64;
    std::vector<float> dummy;

    // ---- 1D: 100 tokens ----
    size_t n_1d = 100;
    dummy.resize(n_1d * n_embd);
    for (size_t i = 0; i < n_1d * n_embd; ++i)
        dummy[i] = static_cast<float>(i % 17);

    float* out_1d = nullptr;
    size_t out_n_1d = 0;

    // Aggressiveness 0: no change
    int rc = csq_squeeze_vision_embd(dummy.data(), n_1d, n_embd, 0, 0, 0, &out_1d, &out_n_1d, nullptr, nullptr);
    assert(rc == CSQ_OK && out_1d != nullptr && out_n_1d == n_1d);
    csq_free_vision_embd(out_1d);
    out_1d = nullptr;

    // Aggressiveness 1: 1D subsample stride 2 -> 50 tokens
    rc = csq_squeeze_vision_embd(dummy.data(), n_1d, n_embd, 1, 0, 0, &out_1d, &out_n_1d, nullptr, nullptr);
    assert(rc == CSQ_OK && out_1d != nullptr && out_n_1d == 50);
    csq_free_vision_embd(out_1d);
    out_1d = nullptr;

    // ---- 2D: 16x16 = 256 tokens ----
    size_t nx = 16, ny = 16;
    size_t n_2d = nx * ny;
    dummy.resize(n_2d * n_embd);
    for (size_t i = 0; i < n_2d * n_embd; ++i)
        dummy[i] = static_cast<float>(i % 31);

    float* out_2d = nullptr;
    size_t out_n_2d = 0;
    size_t out_nx = 0, out_ny = 0;

    // Aggressiveness 0: no change
    rc = csq_squeeze_vision_embd(dummy.data(), n_2d, n_embd, 0, nx, ny, &out_2d, &out_n_2d, &out_nx, &out_ny);
    assert(rc == CSQ_OK && out_2d != nullptr && out_n_2d == n_2d && out_nx == nx && out_ny == ny);
    csq_free_vision_embd(out_2d);
    out_2d = nullptr;

    // Aggressiveness 1: 2x2 pool -> 8x8 = 64 tokens
    rc = csq_squeeze_vision_embd(dummy.data(), n_2d, n_embd, 1, nx, ny, &out_2d, &out_n_2d, &out_nx, &out_ny);
    assert(rc == CSQ_OK && out_2d != nullptr && out_n_2d == 64 && out_nx == 8 && out_ny == 8);
    csq_free_vision_embd(out_2d);
    out_2d = nullptr;

    // Aggressiveness 4: 4x4 pool -> 4x4 = 16 tokens
    rc = csq_squeeze_vision_embd(dummy.data(), n_2d, n_embd, 4, nx, ny, &out_2d, &out_n_2d, &out_nx, &out_ny);
    assert(rc == CSQ_OK && out_2d != nullptr && out_n_2d == 16 && out_nx == 4 && out_ny == 4);
    csq_free_vision_embd(out_2d);

    std::printf("test-contextsqueezer-vision: passed (1D and 2D squeeze, shape consistent)\n");
    return 0;
}
