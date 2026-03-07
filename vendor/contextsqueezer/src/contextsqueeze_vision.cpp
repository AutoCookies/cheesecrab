// Vision token squeeze: reduce number of vision embeddings by subsampling or mean-pooling.
// Video: same API in 1D mode (flatten frame tokens) or extend later with (t,h,w) pooling.
#include "contextsqueeze.h"

#include <algorithm>
#include <cstdlib>
#include <cstring>

namespace {

// 1D: subsample every stride-th token
static int squeeze_1d_subsample(const float* in, size_t n_tokens, unsigned int n_embd,
                                int stride, float** out_embd, size_t* out_n_tokens) {
  if (stride <= 1) {
    *out_n_tokens = n_tokens;
    float* buf = static_cast<float*>(std::malloc(n_tokens * n_embd * sizeof(float)));
    if (!buf) return CSQ_ERR_MALLOC;
    std::memcpy(buf, in, n_tokens * n_embd * sizeof(float));
    *out_embd = buf;
    return CSQ_OK;
  }
  size_t n_out = (n_tokens + stride - 1) / stride;
  if (n_out == 0) n_out = 1;
  float* buf = static_cast<float*>(std::malloc(n_out * n_embd * sizeof(float)));
  if (!buf) return CSQ_ERR_MALLOC;
  for (size_t i = 0; i < n_out; ++i) {
    size_t src = i * stride;
    if (src >= n_tokens) src = n_tokens - 1;
    std::memcpy(buf + i * n_embd, in + src * n_embd, n_embd * sizeof(float));
  }
  *out_embd = buf;
  *out_n_tokens = n_out;
  return CSQ_OK;
}

// 1D: mean-pool over windows of size pool_size
static int squeeze_1d_pool(const float* in, size_t n_tokens, unsigned int n_embd,
                           size_t pool_size, float** out_embd, size_t* out_n_tokens) {
  if (pool_size <= 1 || n_tokens == 0) {
    return squeeze_1d_subsample(in, n_tokens, n_embd, 1, out_embd, out_n_tokens);
  }
  size_t n_out = (n_tokens + pool_size - 1) / pool_size;
  if (n_out == 0) n_out = 1;
  float* buf = static_cast<float*>(std::malloc(n_out * n_embd * sizeof(float)));
  if (!buf) return CSQ_ERR_MALLOC;
  std::memset(buf, 0, n_out * n_embd * sizeof(float));
  for (size_t i = 0; i < n_out; ++i) {
    size_t start = i * pool_size;
    size_t end = std::min(start + pool_size, n_tokens);
    size_t count = end - start;
    float* row = buf + i * n_embd;
    for (size_t t = start; t < end; ++t) {
      const float* src = in + t * n_embd;
      for (unsigned int d = 0; d < n_embd; ++d)
        row[d] += src[d];
    }
    for (unsigned int d = 0; d < n_embd; ++d)
      row[d] /= static_cast<float>(count);
  }
  *out_embd = buf;
  *out_n_tokens = n_out;
  return CSQ_OK;
}

// 2D: mean-pool over pool_w x pool_h windows
static int squeeze_2d_pool(const float* in, size_t nx, size_t ny, unsigned int n_embd,
                           size_t pool_w, size_t pool_h,
                           float** out_embd, size_t* out_n_tokens,
                           size_t* out_nx, size_t* out_ny) {
  if (pool_w <= 1 && pool_h <= 1) {
    size_t n = nx * ny;
    float* buf = static_cast<float*>(std::malloc(n * n_embd * sizeof(float)));
    if (!buf) return CSQ_ERR_MALLOC;
    std::memcpy(buf, in, n * n_embd * sizeof(float));
    *out_embd = buf;
    *out_n_tokens = n;
    if (out_nx) *out_nx = nx;
    if (out_ny) *out_ny = ny;
    return CSQ_OK;
  }
  size_t dim_x = (nx + pool_w - 1) / pool_w;
  size_t dim_y = (ny + pool_h - 1) / pool_h;
  if (dim_x == 0) dim_x = 1;
  if (dim_y == 0) dim_y = 1;
  size_t n_out = dim_x * dim_y;
  float* buf = static_cast<float*>(std::malloc(n_out * n_embd * sizeof(float)));
  if (!buf) return CSQ_ERR_MALLOC;
  std::memset(buf, 0, n_out * n_embd * sizeof(float));
  for (size_t oy = 0; oy < dim_y; ++oy) {
    for (size_t ox = 0; ox < dim_x; ++ox) {
      size_t y0 = oy * pool_h;
      size_t y1 = std::min(y0 + pool_h, ny);
      size_t x0 = ox * pool_w;
      size_t x1 = std::min(x0 + pool_w, nx);
      size_t count = 0;
      float* row = buf + (oy * dim_x + ox) * n_embd;
      for (size_t y = y0; y < y1; ++y) {
        for (size_t x = x0; x < x1; ++x) {
          size_t idx = (y * nx + x);
          const float* src = in + idx * n_embd;
          for (unsigned int d = 0; d < n_embd; ++d)
            row[d] += src[d];
          ++count;
        }
      }
      if (count > 0) {
        for (unsigned int d = 0; d < n_embd; ++d)
          row[d] /= static_cast<float>(count);
      }
    }
  }
  *out_embd = buf;
  *out_n_tokens = n_out;
  if (out_nx) *out_nx = dim_x;
  if (out_ny) *out_ny = dim_y;
  return CSQ_OK;
}

}  // namespace

extern "C" {

int csq_squeeze_vision_embd(const float* in_embd, size_t n_tokens, unsigned int n_embd,
                            int aggressiveness, size_t nx, size_t ny,
                            float** out_embd, size_t* out_n_tokens,
                            size_t* out_nx, size_t* out_ny) {
  if (in_embd == nullptr || out_embd == nullptr || out_n_tokens == nullptr)
    return CSQ_ERR_INVALID_ARG;
  if (n_embd == 0)
    return CSQ_ERR_INVALID_ARG;
  *out_embd = nullptr;
  *out_n_tokens = 0;
  if (out_nx) *out_nx = 0;
  if (out_ny) *out_ny = 0;

  if (aggressiveness <= 0 || n_tokens == 0) {
    float* buf = static_cast<float*>(std::malloc(n_tokens * n_embd * sizeof(float)));
    if (!buf && n_tokens > 0) return CSQ_ERR_MALLOC;
    if (n_tokens > 0)
      std::memcpy(buf, in_embd, n_tokens * n_embd * sizeof(float));
    *out_embd = buf;
    *out_n_tokens = n_tokens;
    if (out_nx) *out_nx = nx;
    if (out_ny) *out_ny = ny;
    return CSQ_OK;
  }

  int aggr = aggressiveness;
  if (aggr > 9) aggr = 9;

  if (nx > 0 && ny > 0) {
    size_t pool;
    if (aggr <= 3) pool = 2;
    else if (aggr <= 6) pool = 4;
    else pool = 8;
    return squeeze_2d_pool(in_embd, nx, ny, n_embd, pool, pool, out_embd, out_n_tokens, out_nx, out_ny);
  }

  if (aggr <= 3) {
    int stride = 1 + aggr;
    return squeeze_1d_subsample(in_embd, n_tokens, n_embd, stride, out_embd, out_n_tokens);
  }
  size_t pool_size = static_cast<size_t>(2 + (aggr - 3) / 2);
  if (pool_size > n_tokens) pool_size = n_tokens;
  return squeeze_1d_pool(in_embd, n_tokens, n_embd, pool_size, out_embd, out_n_tokens);
}

void csq_free_vision_embd(float* embd) {
  std::free(embd);
}

}  // extern "C"
