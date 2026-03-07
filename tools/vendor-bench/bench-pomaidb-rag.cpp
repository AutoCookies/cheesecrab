// Benchmark for pomaidb RAG: exercises create membrane, put_chunk, search_rag, get_rag_chunk.
#include "pomai/c_api.h"

#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <string>
#include <vector>
#include <unistd.h>

static double now_sec() {
    using clock = std::chrono::high_resolution_clock;
    return 1e-9 * static_cast<double>(std::chrono::duration_cast<std::chrono::nanoseconds>(
        clock::now().time_since_epoch()).count());
}

int main() {
    std::string db_path = "/tmp/cheesecrab_bench_pomaidb_rag_";
    db_path += std::to_string(static_cast<unsigned long>(getpid()));

    pomai_options_t opts;
    pomai_options_init(&opts);
    opts.path = db_path.c_str();
    opts.shards = 1;
    opts.dim = 8;

    pomai_db_t* db = nullptr;
    pomai_status_t* st = pomai_open(&opts, &db);
    if (st) {
        std::fprintf(stderr, "bench-pomaidb-rag: pomai_open failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        return 1;
    }

    const char* membrane = "rag";
    st = pomai_create_rag_membrane(db, membrane, 8, 1);
    if (st) {
        std::fprintf(stderr, "bench-pomaidb-rag: create_rag_membrane failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        pomai_close(db);
        return 1;
    }

    // ---- Put chunks ----
    const int num_chunks = 200;
    std::vector<uint32_t> chunk_tokens = { 10, 20, 30, 40, 50, 60, 70, 80 };
    float vec[8] = { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f, 0.6f, 0.7f, 0.8f };

    double t0 = now_sec();
    int put_ok = 0;
    for (int i = 0; i < num_chunks; ++i) {
        pomai_rag_chunk_t chunk = {};
        chunk.struct_size = sizeof(pomai_rag_chunk_t);
        chunk.chunk_id = static_cast<uint64_t>(i + 1);
        chunk.doc_id = static_cast<uint64_t>(i / 10);
        chunk.token_ids = chunk_tokens.data();
        chunk.token_count = chunk_tokens.size();
        chunk.vector = vec;
        chunk.dim = 8;
        st = pomai_put_chunk(db, membrane, &chunk);
        if (!st) ++put_ok;
        else pomai_status_free(st);
    }
    double t1 = now_sec();
    std::printf("pomaidb put_chunk: %d/%d ok elapsed=%.3fs ops/sec=%.0f\n",
                put_ok, num_chunks, t1 - t0, num_chunks / (t1 - t0));
    if (put_ok != num_chunks) {
        std::fprintf(stderr, "bench-pomaidb-rag: put_chunk ok=%d expected %d\n", put_ok, num_chunks);
        pomai_close(db);
        return 1;
    }

    // ---- Search RAG ----
    pomai_rag_query_t query = {};
    query.struct_size = sizeof(pomai_rag_query_t);
    query.token_ids = chunk_tokens.data();
    query.token_count = chunk_tokens.size();
    query.vector = nullptr;
    query.dim = 0;
    query.topk = 10;

    pomai_rag_search_options_t search_opts = {};
    search_opts.struct_size = sizeof(pomai_rag_search_options_t);
    search_opts.candidate_budget = 500;
    search_opts.token_budget = 0;
    search_opts.enable_vector_rerank = false;

    const int search_iters = 100;
    int search_ok = 0;
    t0 = now_sec();
    for (int i = 0; i < search_iters; ++i) {
        pomai_rag_search_result_t result = {};
        result.hit_count = 0;
        result.hits = nullptr;
        st = pomai_search_rag(db, membrane, &query, &search_opts, &result);
        if (!st && result.hit_count > 0) ++search_ok;
        if (st) pomai_status_free(st);
        pomai_rag_search_result_free(&result);
    }
    t1 = now_sec();
    std::printf("pomaidb search_rag: %d/%d ok elapsed=%.3fs ops/sec=%.0f\n",
                search_ok, search_iters, t1 - t0, search_iters / (t1 - t0));
    if (search_ok != search_iters) {
        std::fprintf(stderr, "bench-pomaidb-rag: search_rag ok=%d expected %d\n", search_ok, search_iters);
        pomai_close(db);
        return 1;
    }

    // ---- Get chunk ----
    uint32_t* out_tokens = nullptr;
    size_t out_count = 0;
    st = pomai_get_rag_chunk(db, membrane, 1, &out_tokens, &out_count);
    if (st) {
        std::fprintf(stderr, "bench-pomaidb-rag: get_rag_chunk failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        pomai_close(db);
        return 1;
    }
    bool get_ok = (out_tokens && out_count == chunk_tokens.size());
    if (get_ok) {
        for (size_t i = 0; i < out_count; ++i) {
            if (out_tokens[i] != chunk_tokens[i]) { get_ok = false; break; }
        }
    }
    pomai_free(out_tokens);
    if (!get_ok) {
        std::fprintf(stderr, "bench-pomaidb-rag: get_rag_chunk data mismatch\n");
        pomai_close(db);
        return 1;
    }

    st = pomai_close(db);
    if (st) {
        pomai_status_free(st);
        return 1;
    }

    std::printf("bench-pomaidb-rag: passed (RAG store/search/get working correctly)\n");
    return 0;
}
