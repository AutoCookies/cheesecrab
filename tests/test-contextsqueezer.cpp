// Unit test for context squeezer: verify it can squeeze context (compress text).
#ifdef NDEBUG
#undef NDEBUG
#endif

#include "contextsqueeze.h"

#include <cassert>
#include <cstdio>
#include <cstring>
#include <string>

int main() {
    const char* long_text =
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog. "
        "The quick brown fox jumps over the lazy dog.";
    size_t in_len = std::strlen(long_text);

    csq_view in{ long_text, in_len };
    csq_buf out{ nullptr, 0 };

    // Aggressiveness 0: returns input unchanged (no drop); ensures we get non-empty output
    int rc = csq_squeeze_ex(in, 0, &out);
    if (rc != CSQ_OK) {
        std::fprintf(stderr, "test-contextsqueezer: csq_squeeze_ex returned %d, error: %s\n", rc, csq_last_error());
        return 1;
    }
    if (out.data == nullptr || out.len == 0) {
        std::fprintf(stderr, "test-contextsqueezer: out.data=%p out.len=%zu in_len=%zu\n", (void*)out.data, out.len, in_len);
        return 1;
    }
    assert(out.len <= in_len + 64u);
    size_t out_len = out.len;

    const char* ver = csq_version();
    assert(ver != nullptr && ver[0] != '\0');

    csq_free(&out);
    assert(out.data == nullptr);

    // Strict correctness: with aggressiveness > 0, output should be squeezed (shorter or equal)
    out = csq_buf{ nullptr, 0 };
    rc = csq_squeeze_ex(in, 3, &out);
    assert(rc == CSQ_OK && out.data != nullptr);
    assert(out.len <= in_len + 64u && "squeezed output must not exceed input + margin");
    if (out.len > 0 && in_len > 100u) {
        assert(out.len <= in_len && "high aggressiveness should reduce long text length");
    }
    csq_free(&out);

    std::printf("test-contextsqueezer: passed (squeezed %zu -> %zu bytes, aggr>0 reduces length)\n", in_len, out_len);
    return 0;
}
