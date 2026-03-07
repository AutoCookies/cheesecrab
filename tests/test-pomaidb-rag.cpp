// Unit test for pomaidb RAG: verify it can store and retrieve RAG data.
#ifdef NDEBUG
#undef NDEBUG
#endif

#include "pomai/c_api.h"

#include <cassert>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <string>
#include <vector>
#include <unistd.h>

int main() {
    std::string db_path;
    const char* env_path = std::getenv("TEST_POMAI_RAG_DB");
    if (env_path && env_path[0]) {
        db_path = env_path;
    } else {
        db_path = "/tmp/cheesecrab_test_pomaidb_rag_";
        db_path += std::to_string(static_cast<unsigned long>(getpid()));
    }

    pomai_options_t opts;
    pomai_options_init(&opts);
    opts.path = db_path.c_str();
    opts.shards = 1;
    opts.dim = 4;

    pomai_db_t* db = nullptr;
    pomai_status_t* st = pomai_open(&opts, &db);
    if (st) {
        std::fprintf(stderr, "test-pomaidb-rag: pomai_open failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        return 1;
    }
    assert(db != nullptr);

    const char* membrane = "rag";
    st = pomai_create_rag_membrane(db, membrane, 4, 1);
    if (st) {
        std::fprintf(stderr, "test-pomaidb-rag: create_rag_membrane failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        pomai_close(db);
        return 1;
    }

    // Put a RAG chunk (tokens + optional vector)
    std::vector<uint32_t> chunk_tokens = { 100, 101, 102, 103, 104 };
    float vec[] = { 0.1f, 0.2f, 0.3f, 0.4f };
    pomai_rag_chunk_t chunk = {};
    chunk.struct_size = sizeof(pomai_rag_chunk_t);
    chunk.chunk_id = 1;
    chunk.doc_id = 10;
    chunk.token_ids = chunk_tokens.data();
    chunk.token_count = chunk_tokens.size();
    chunk.vector = vec;
    chunk.dim = 4;

    st = pomai_put_chunk(db, membrane, &chunk);
    if (st) {
        std::fprintf(stderr, "test-pomaidb-rag: put_chunk failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        pomai_close(db);
        return 1;
    }

    // Search RAG by token overlap (same tokens => should find chunk)
    pomai_rag_query_t query = {};
    query.struct_size = sizeof(pomai_rag_query_t);
    query.token_ids = chunk_tokens.data();
    query.token_count = chunk_tokens.size();
    query.vector = nullptr;
    query.dim = 0;
    query.topk = 5;

    pomai_rag_search_options_t search_opts = {};
    search_opts.struct_size = sizeof(pomai_rag_search_options_t);
    search_opts.candidate_budget = 100;
    search_opts.token_budget = 0;
    search_opts.enable_vector_rerank = false;

    pomai_rag_search_result_t result = {};
    result.hit_count = 0;
    result.hits = nullptr;

    st = pomai_search_rag(db, membrane, &query, &search_opts, &result);
    if (st) {
        std::fprintf(stderr, "test-pomaidb-rag: search_rag failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        pomai_close(db);
        return 1;
    }
    assert(result.hit_count >= 1);
    assert(result.hits != nullptr);
    assert(result.hits[0].chunk_id == 1);
    assert(result.hits[0].doc_id == 10);

    // Get chunk token IDs by chunk_id
    uint32_t* out_tokens = nullptr;
    size_t out_count = 0;
    st = pomai_get_rag_chunk(db, membrane, 1, &out_tokens, &out_count);
    if (st) {
        std::fprintf(stderr, "test-pomaidb-rag: get_rag_chunk failed: %s\n", pomai_status_message(st));
        pomai_status_free(st);
        pomai_rag_search_result_free(&result);
        pomai_close(db);
        return 1;
    }
    assert(out_tokens != nullptr);
    assert(out_count == chunk_tokens.size());
    for (size_t i = 0; i < out_count; ++i) {
        assert(out_tokens[i] == chunk_tokens[i]);
    }
    pomai_free(out_tokens);

    pomai_rag_search_result_free(&result);
    st = pomai_close(db);
    if (st) {
        pomai_status_free(st);
        return 1;
    }

    std::printf("test-pomaidb-rag: passed (store + search + get RAG data)\n");
    return 0;
}
