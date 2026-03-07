#ifndef CONTEXTSQUEEZE_H
#define CONTEXTSQUEEZE_H

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct {
  const char* data;
  size_t len;
} csq_view;

typedef struct {
  char* data;
  size_t len;
} csq_buf;

typedef enum {
  CSQ_OK = 0,
  CSQ_ERR_INVALID_ARG = 1,
  CSQ_ERR_MALLOC = 2,
  CSQ_ERR_INTERNAL = 3,
  CSQ_ERR_INVALID_DATA = 4
} csq_error;

typedef void (*csq_progress_cb)(float percentage, void* user_data);

int csq_squeeze(csq_view in, csq_buf* out);
int csq_squeeze_ex(csq_view in, int aggressiveness, csq_buf* out);
int csq_squeeze_progress(csq_view in, int aggressiveness, csq_progress_cb cb, void* user_data, csq_buf* out);

void csq_free(csq_buf* buf);
const char* csq_version(void);
const char* csq_last_error(void);

/* Vision token squeeze: reduce embedding sequence length (merge or subsample).
 * in_embd: row-major n_tokens x n_embd. out_embd: allocated by callee; free with csq_free_vision_embd.
 * nx,ny: 2D layout (vision patch grid). If both > 0 use 2D pooling; else 1D.
 * out_nx, out_ny: optional; set when 2D mode so caller can use for M-RoPE.
 * Video: use the same API in 1D mode (flatten frame tokens to one sequence) or a future (t,h,w) extension. */
int csq_squeeze_vision_embd(const float* in_embd, size_t n_tokens, unsigned int n_embd,
                            int aggressiveness, size_t nx, size_t ny,
                            float** out_embd, size_t* out_n_tokens,
                            size_t* out_nx, size_t* out_ny);
void csq_free_vision_embd(float* embd);

#ifdef __cplusplus
}
#endif

#endif
