#include "pomai/c_api.h"

#include <algorithm>
#include <cctype>
#include <chrono>
#include <cstddef>
#include <cstdlib>
#include <cstring>
#include <span>
#include <string>
#include <vector>

#include "palloc_compat.h"
#include "capi_utils.h"
#include "core/membrane/manager.h"
#include "core/memory/pin_manager.h"
#include "pomai/options.h"
#include "pomai/pomai.h"
#include "pomai/rag.h"
#include "pomai/version.h"

namespace {

constexpr const char* kDefaultMembrane = "__default__";

struct RecordWrapper {
    pomai_record_t pub{};
    std::vector<float> vec_data;
    std::vector<uint8_t> meta_data;
};

struct SearchResultsWrapper {
    pomai_search_results_t pub{};
    std::vector<uint64_t> ids;
    std::vector<float> scores;
    std::vector<uint32_t> shard_ids;
};

constexpr uint32_t MinOptionsStructSize() {
    return static_cast<uint32_t>(offsetof(pomai_options_t, hnsw_ef_search) + sizeof(uint32_t));
}

constexpr uint32_t MinUpsertStructSize() {
    return static_cast<uint32_t>(offsetof(pomai_upsert_t, metadata_len) + sizeof(uint32_t));
}

constexpr uint32_t MinQueryStructSize() {
    return static_cast<uint32_t>(offsetof(pomai_query_t, alpha) + sizeof(float));
}


bool DeadlineExceeded(uint32_t deadline_ms) {
    if (deadline_ms == 0) {
        return false;
    }
    const auto now_ms = std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch());
    return now_ms.count() >= deadline_ms;
}

bool ParseTenantFilter(const char* expr, pomai::SearchOptions* out_opts) {
    if (expr == nullptr || *expr == '\0') {
        return true;
    }

    std::string s(expr);
    const auto eq = s.find('=');
    if (eq == std::string::npos) {
        return false;
    }
    auto field = s.substr(0, eq);
    auto value = s.substr(eq + 1);
    auto trim = [](std::string* v) {
        while (!v->empty() && std::isspace(static_cast<unsigned char>(v->front()))) v->erase(v->begin());
        while (!v->empty() && std::isspace(static_cast<unsigned char>(v->back()))) v->pop_back();
    };
    trim(&field);
    trim(&value);
    if (field != "tenant") {
        return false;
    }
    out_opts->filters.push_back(pomai::Filter(field, value));
    return true;
}

pomai::Metadata ToMetadata(const pomai_upsert_t& item) {
    if (item.metadata == nullptr || item.metadata_len == 0) {
        return pomai::Metadata();
    }
    return pomai::Metadata(std::string(reinterpret_cast<const char*>(item.metadata), item.metadata_len));
}

}  // namespace

extern "C" {

const char* pomai_version_string(void) {
    static const std::string kVersion =
        std::to_string(POMAI_VERSION_MAJOR) + "." + std::to_string(POMAI_VERSION_MINOR) + "." + std::to_string(POMAI_VERSION_PATCH);
    return kVersion.c_str();
}

uint32_t pomai_abi_version(void) {
    return POMAI_ABI_VERSION;
}

void pomai_options_init(pomai_options_t* opts) {
    if (opts == nullptr) {
        return;
    }
    opts->struct_size = static_cast<uint32_t>(sizeof(pomai_options_t));
    opts->path = nullptr;
    opts->shards = 4;
    opts->dim = 512;
    opts->search_threads = 0;
    opts->fsync_policy = POMAI_FSYNC_POLICY_NEVER;
    opts->memory_budget_bytes = 0;
    opts->deadline_ms = 0;
    opts->index_type = 0; // IVF
    opts->hnsw_m = 32;
    opts->hnsw_ef_construction = 200;
    opts->hnsw_ef_search = 64;
    opts->adaptive_threshold = 5000;
    opts->metric = 0; // L2
}

void pomai_scan_options_init(pomai_scan_options_t* opts) {
    if (opts == nullptr) {
        return;
    }
    opts->struct_size = static_cast<uint32_t>(sizeof(pomai_scan_options_t));
    opts->start_id = 0;
    opts->has_start_id = false;
    opts->deadline_ms = 0;
}

pomai_status_t* pomai_open(const pomai_options_t* opts, pomai_db_t** out_db) {
    if (opts == nullptr || out_db == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "opts/out_db must be non-null");
    }
    if (opts->struct_size < MinOptionsStructSize()) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "options.struct_size is too small");
    }
    if (DeadlineExceeded(opts->deadline_ms)) {
        return MakeStatus(POMAI_STATUS_DEADLINE_EXCEEDED, "deadline exceeded before open");
    }
    if (opts->path == nullptr || opts->path[0] == '\0') {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "options.path must be non-empty");
    }

    pomai::DBOptions db_opts;
    db_opts.path = opts->path;
    db_opts.shard_count = (opts->shards > 0) ? opts->shards : 1u;
    db_opts.dim = opts->dim;
    db_opts.search_threads = opts->search_threads;
    db_opts.fsync = (opts->fsync_policy == POMAI_FSYNC_POLICY_ALWAYS)
                        ? pomai::FsyncPolicy::kAlways
                        : pomai::FsyncPolicy::kNever;
    db_opts.metric = (opts->metric == 1) ? pomai::MetricType::kInnerProduct : pomai::MetricType::kL2;
    db_opts.index_params.adaptive_threshold = opts->adaptive_threshold;
    if (opts->index_type == 1) {
        db_opts.index_params.type = pomai::IndexType::kHnsw;
        db_opts.index_params.hnsw_m = opts->hnsw_m;
        db_opts.index_params.hnsw_ef_construction = opts->hnsw_ef_construction;
        db_opts.index_params.hnsw_ef_search = opts->hnsw_ef_search;
    } else {
        db_opts.index_params.type = pomai::IndexType::kIvfFlat;
    }
    if (opts->memory_budget_bytes != 0) {
        db_opts.max_memtable_mb = static_cast<uint32_t>(opts->memory_budget_bytes / (1024 * 1024));
    }

    std::unique_ptr<pomai::DB> db;
    auto st = pomai::DB::Open(db_opts, &db);
    if (!st.ok()) {
        return ToCStatus(st);
    }

    void* raw = palloc_malloc_aligned(sizeof(pomai_db_t), alignof(pomai_db_t));
    if (!raw) return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "db handle allocation failed");
    *out_db = new (raw) pomai_db_t{std::move(db)};
    return nullptr;
}

pomai_status_t* pomai_close(pomai_db_t* db) {
    if (db == nullptr) {
        return nullptr;
    }
    auto st = db->db->Close();
    db->~pomai_db_t();
    palloc_free(db);
    return ToCStatus(st);
}

pomai_status_t* pomai_put(pomai_db_t* db, const pomai_upsert_t* item) {
    if (db == nullptr || item == nullptr || item->vector == nullptr || item->dim == 0) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "invalid put arguments");
    }
    if (item->struct_size < MinUpsertStructSize()) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "upsert.struct_size is too small");
    }
    std::span<const float> vec(item->vector, item->dim);
    return ToCStatus(db->db->PutVector(item->id, vec, ToMetadata(*item)));
}

pomai_status_t* pomai_put_batch(pomai_db_t* db, const pomai_upsert_t* items, size_t n) {
    if (db == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db must be non-null");
    }
    if (n == 0) {
        return nullptr;
    }
    if (items == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "items must be non-null");
    }

    std::vector<pomai::VectorId> ids;
    std::vector<std::span<const float>> vecs;
    ids.reserve(n);
    vecs.reserve(n);

    for (size_t i = 0; i < n; ++i) {
        if (items[i].struct_size < MinUpsertStructSize()) {
            return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "all batch items require valid struct_size");
        }
        if (items[i].vector == nullptr || items[i].dim == 0) {
            return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "all batch items require vector and dim");
        }
        ids.push_back(items[i].id);
        vecs.emplace_back(items[i].vector, items[i].dim);
    }
    return ToCStatus(db->db->PutBatch(ids, vecs));
}

pomai_status_t* pomai_delete(pomai_db_t* db, uint64_t id) {
    if (db == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db must be non-null");
    }
    return ToCStatus(db->db->Delete(id));
}

pomai_status_t* pomai_freeze(pomai_db_t* db) {
    if (db == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db must be non-null");
    }
    return ToCStatus(db->db->Freeze(pomai::core::MembraneManager::kDefaultMembrane));
}

pomai_status_t* pomai_get(pomai_db_t* db, uint64_t id, pomai_record_t** out_record) {
    if (db == nullptr || out_record == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db/out_record must be non-null");
    }

    std::vector<float> vec;
    pomai::Metadata meta;
    auto st = db->db->Get(id, &vec, &meta);
    if (!st.ok()) {
        return ToCStatus(st);
    }

    void* raw = palloc_malloc_aligned(sizeof(RecordWrapper), alignof(RecordWrapper));
    if (!raw) return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "record allocation failed");
    auto* w = new (raw) RecordWrapper();
    w->vec_data = std::move(vec);
    w->meta_data.assign(meta.tenant.begin(), meta.tenant.end());

    w->pub.struct_size = static_cast<uint32_t>(sizeof(pomai_record_t));
    w->pub.id = id;
    w->pub.dim = static_cast<uint32_t>(w->vec_data.size());
    w->pub.vector = w->vec_data.data();
    w->pub.metadata = w->meta_data.empty() ? nullptr : w->meta_data.data();
    w->pub.metadata_len = static_cast<uint32_t>(w->meta_data.size());
    w->pub.is_deleted = false;

    *out_record = &w->pub;
    return nullptr;
}

void pomai_record_free(pomai_record_t* record) {
    if (record) {
        auto* w = reinterpret_cast<RecordWrapper*>(record);
        w->~RecordWrapper();
        palloc_free(w);
    }
}

pomai_status_t* pomai_exists(pomai_db_t* db, uint64_t id, bool* out_exists) {
    if (db == nullptr || out_exists == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db/out_exists must be non-null");
    }
    return ToCStatus(db->db->Exists(id, out_exists));
}

pomai_status_t* pomai_search(pomai_db_t* db, const pomai_query_t* query, pomai_search_results_t** out) {
    if (db == nullptr || query == nullptr || out == nullptr || query->vector == nullptr || query->dim == 0 || query->topk == 0) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "invalid search args");
    }
    if (query->struct_size < MinQueryStructSize()) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "query.struct_size is too small");
    }
    if (DeadlineExceeded(query->deadline_ms)) {
        return MakeStatus(POMAI_STATUS_DEADLINE_EXCEEDED, "deadline exceeded before search");
    }

    pomai::SearchResult res;
    pomai::SearchOptions opts;
    if (!ParseTenantFilter(query->filter_expression, &opts)) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "filter_expression must use tenant=<value>");
    }
    if (query->flags & POMAI_QUERY_FLAG_ZERO_COPY) {
        opts.zero_copy = true;
    }

    auto st = db->db->Search(std::span<const float>(query->vector, query->dim), query->topk, opts, &res);
    if (!st.ok() && st.code() != pomai::ErrorCode::kPartial) {
        return ToCStatus(st);
    }

    if (DeadlineExceeded(query->deadline_ms)) {
        return MakeStatus(POMAI_STATUS_DEADLINE_EXCEEDED, "deadline exceeded after search");
    }

    void* raw = palloc_malloc_aligned(sizeof(SearchResultsWrapper), alignof(SearchResultsWrapper));
    if (!raw) return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "search results allocation failed");
    auto* w = new (raw) SearchResultsWrapper();
    w->ids.reserve(res.hits.size());
    w->scores.reserve(res.hits.size());
    w->shard_ids.reserve(res.hits.size());
    for (const auto& hit : res.hits) {
        w->ids.push_back(hit.id);
        w->scores.push_back(hit.score);
        w->shard_ids.push_back(UINT32_MAX);
    }

    w->pub.struct_size = static_cast<uint32_t>(sizeof(pomai_search_results_t));
    w->pub.count = w->ids.size();
    w->pub.ids = w->ids.data();
    w->pub.scores = w->scores.data();
    w->pub.shard_ids = w->shard_ids.data();
    if (opts.zero_copy && !res.zero_copy_pointers.empty()) {
        size_t n = res.zero_copy_pointers.size();
        w->pub.zero_copy_pointers = static_cast<pomai_semantic_pointer_t*>(
            palloc_malloc_aligned(n * sizeof(pomai_semantic_pointer_t), alignof(pomai_semantic_pointer_t)));
        if (w->pub.zero_copy_pointers) {
            for (size_t i = 0; i < n; ++i) {
                w->pub.zero_copy_pointers[i].struct_size = sizeof(pomai_semantic_pointer_t);
                w->pub.zero_copy_pointers[i].raw_data_ptr = res.zero_copy_pointers[i].raw_data_ptr;
                w->pub.zero_copy_pointers[i].dim = res.zero_copy_pointers[i].dim;
                w->pub.zero_copy_pointers[i].quant_min = res.zero_copy_pointers[i].quant_min;
                w->pub.zero_copy_pointers[i].quant_inv_scale = res.zero_copy_pointers[i].quant_inv_scale;
                w->pub.zero_copy_pointers[i].session_id = res.zero_copy_pointers[i].session_id;
            }
        } else {
            w->pub.zero_copy_pointers = nullptr;
        }
    } else {
        w->pub.zero_copy_pointers = nullptr;
    }
    *out = &w->pub;

    if (st.code() == pomai::ErrorCode::kPartial) {
        return MakeStatus(POMAI_STATUS_PARTIAL_FAILURE, st.message());
    }
    if (!res.errors.empty()) {
        return MakeStatus(POMAI_STATUS_PARTIAL_FAILURE, "partial shard failures");
    }
    return nullptr;
}

pomai_status_t* pomai_search_batch(pomai_db_t* db, const pomai_query_t* queries, size_t num_queries, pomai_search_results_t** out) {
    if (db == nullptr || queries == nullptr || out == nullptr || num_queries == 0) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "invalid batch search args");
    }
    if (queries[0].struct_size < MinQueryStructSize()) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "query.struct_size is too small");
    }
    
    // We assume all queries in the batch have the same dimensions and options.
    const uint32_t dim = queries[0].dim;
    const uint32_t topk = queries[0].topk;
    
    pomai::SearchOptions opts;
    if (!ParseTenantFilter(queries[0].filter_expression, &opts)) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "filter_expression must use tenant=<value>");
    }
    if (queries[0].flags & POMAI_QUERY_FLAG_ZERO_COPY) {
        opts.zero_copy = true;
    }

    std::vector<float> flat_queries;
    flat_queries.reserve(num_queries * dim);
    for (size_t i = 0; i < num_queries; ++i) {
        if (queries[i].vector == nullptr || queries[i].dim != dim || queries[i].topk != topk) {
            return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "batch queries must have identical dim and topk");
        }
        flat_queries.insert(flat_queries.end(), queries[i].vector, queries[i].vector + dim);
    }

    std::vector<pomai::SearchResult> batch_res;
    auto st = db->db->SearchBatch(std::span<const float>(flat_queries.data(), flat_queries.size()), static_cast<uint32_t>(num_queries), topk, opts, &batch_res);
    
    if (!st.ok() && st.code() != pomai::ErrorCode::kPartial) {
        return ToCStatus(st);
    }

    // Allocate array of results (palloc, no new)
    pomai_search_results_t* arr = static_cast<pomai_search_results_t*>(
        palloc_malloc_aligned(num_queries * sizeof(pomai_search_results_t), alignof(pomai_search_results_t)));
    if (!arr) {
        return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "batch results allocation failed");
    }
    std::memset(arr, 0, num_queries * sizeof(pomai_search_results_t));
    *out = arr;

    for (size_t q = 0; q < num_queries; ++q) {
        const auto& res = batch_res[q];
        pomai_search_results_t& pub = arr[q];

        pub.struct_size = static_cast<uint32_t>(sizeof(pomai_search_results_t));
        pub.count = res.hits.size();

        pub.ids = static_cast<uint64_t*>(palloc_malloc_aligned(pub.count * sizeof(uint64_t), alignof(uint64_t)));
        pub.scores = static_cast<float*>(palloc_malloc_aligned(pub.count * sizeof(float), alignof(float)));
        pub.shard_ids = static_cast<uint32_t*>(palloc_malloc_aligned(pub.count * sizeof(uint32_t), alignof(uint32_t)));
        if (!pub.ids || !pub.scores || !pub.shard_ids) {
            pomai_search_batch_free(arr, num_queries);
            return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "batch hit array allocation failed");
        }

        for (size_t i = 0; i < pub.count; ++i) {
            pub.ids[i] = res.hits[i].id;
            pub.scores[i] = res.hits[i].score;
            pub.shard_ids[i] = UINT32_MAX;
        }

        if (opts.zero_copy && !res.zero_copy_pointers.empty()) {
            size_t n = res.zero_copy_pointers.size();
            pub.zero_copy_pointers = static_cast<pomai_semantic_pointer_t*>(
                palloc_malloc_aligned(n * sizeof(pomai_semantic_pointer_t), alignof(pomai_semantic_pointer_t)));
            if (pub.zero_copy_pointers) {
                for (size_t i = 0; i < n; ++i) {
                    pub.zero_copy_pointers[i].struct_size = sizeof(pomai_semantic_pointer_t);
                    pub.zero_copy_pointers[i].raw_data_ptr = res.zero_copy_pointers[i].raw_data_ptr;
                    pub.zero_copy_pointers[i].dim = res.zero_copy_pointers[i].dim;
                    pub.zero_copy_pointers[i].quant_min = res.zero_copy_pointers[i].quant_min;
                    pub.zero_copy_pointers[i].quant_inv_scale = res.zero_copy_pointers[i].quant_inv_scale;
                    pub.zero_copy_pointers[i].session_id = res.zero_copy_pointers[i].session_id;
                }
            }
        } else {
            pub.zero_copy_pointers = nullptr;
        }
    }

    if (st.code() == pomai::ErrorCode::kPartial) {
        return MakeStatus(POMAI_STATUS_PARTIAL_FAILURE, st.message());
    }
    return nullptr;
}

void pomai_search_results_free(pomai_search_results_t* results) {
    if (!results) return;
    if (results->zero_copy_pointers) {
        palloc_free(results->zero_copy_pointers);
    }
    auto* w = reinterpret_cast<SearchResultsWrapper*>(results);
    w->~SearchResultsWrapper();
    palloc_free(w);
}

// RAG
pomai_status_t* pomai_create_rag_membrane(pomai_db_t* db, const char* name, uint32_t dim, uint32_t shard_count) {
    if (db == nullptr || db->db == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db must be non-null");
    }
    if (name == nullptr || name[0] == '\0') {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "name must be non-empty");
    }
    if (dim == 0 || shard_count == 0) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "dim and shard_count must be > 0");
    }
    pomai::MembraneSpec spec;
    spec.name = name;
    spec.dim = dim;
    spec.shard_count = shard_count;
    spec.kind = pomai::MembraneKind::kRag;
    return ToCStatus(db->db->CreateMembrane(spec));
}

pomai_status_t* pomai_put_chunk(pomai_db_t* db, const char* membrane_name, const pomai_rag_chunk_t* chunk) {
    if (db == nullptr || db->db == nullptr || membrane_name == nullptr || chunk == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db, membrane_name, chunk must be non-null");
    }
    if (chunk->token_ids == nullptr && chunk->token_count != 0) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "token_ids required for RAG chunk");
    }
    pomai::RagChunk cpp_chunk;
    cpp_chunk.chunk_id = chunk->chunk_id;
    cpp_chunk.doc_id = chunk->doc_id;
    if (chunk->token_count > 0 && chunk->token_ids != nullptr) {
        cpp_chunk.tokens.assign(chunk->token_ids, chunk->token_ids + chunk->token_count);
    }
    if (chunk->dim > 0 && chunk->vector != nullptr) {
        cpp_chunk.vec = pomai::VectorView(chunk->vector, chunk->dim);
    }
    return ToCStatus(db->db->PutChunk(membrane_name, cpp_chunk));
}

pomai_status_t* pomai_search_rag(pomai_db_t* db, const char* membrane_name, const pomai_rag_query_t* query,
                                 const pomai_rag_search_options_t* opts, pomai_rag_search_result_t* out_result) {
    if (db == nullptr || db->db == nullptr || membrane_name == nullptr || query == nullptr || out_result == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db, membrane_name, query, out_result must be non-null");
    }
    if ((query->token_ids == nullptr || query->token_count == 0) && (query->vector == nullptr || query->dim == 0)) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "query must have tokens or vector");
    }
    out_result->hit_count = 0;
    out_result->hits = nullptr;

    pomai::RagQuery cpp_query;
    if (query->token_count > 0 && query->token_ids != nullptr) {
        cpp_query.tokens = std::span<const pomai::TokenId>(query->token_ids, query->token_count);
    }
    if (query->dim > 0 && query->vector != nullptr) {
        cpp_query.vec = pomai::VectorView(query->vector, query->dim);
    }
    cpp_query.topk = query->topk > 0 ? query->topk : 10u;

    pomai::RagSearchOptions cpp_opts;
    if (opts != nullptr && opts->struct_size >= sizeof(pomai_rag_search_options_t)) {
        cpp_opts.candidate_budget = opts->candidate_budget;
        cpp_opts.token_budget = opts->token_budget;
        cpp_opts.enable_vector_rerank = opts->enable_vector_rerank;
    }

    pomai::RagSearchResult cpp_result;
    auto st = db->db->SearchRag(membrane_name, cpp_query, cpp_opts, &cpp_result);
    if (!st.ok()) {
        return ToCStatus(st);
    }

    if (cpp_result.hits.empty()) {
        return nullptr;
    }
    size_t n = cpp_result.hits.size();
    pomai_rag_hit_t* hits = static_cast<pomai_rag_hit_t*>(
        palloc_malloc_aligned(n * sizeof(pomai_rag_hit_t), alignof(pomai_rag_hit_t)));
    if (!hits) {
        return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "RAG search result allocation failed");
    }
    for (size_t i = 0; i < n; ++i) {
        hits[i].chunk_id = cpp_result.hits[i].chunk_id;
        hits[i].doc_id = cpp_result.hits[i].doc_id;
        hits[i].score = cpp_result.hits[i].score;
        hits[i].token_matches = cpp_result.hits[i].token_matches;
    }
    out_result->hit_count = n;
    out_result->hits = hits;
    return nullptr;
}

pomai_status_t* pomai_get_rag_chunk(pomai_db_t* db, const char* membrane_name, uint64_t chunk_id, uint32_t** out_token_ids, size_t* out_count) {
    if (db == nullptr || db->db == nullptr || membrane_name == nullptr || out_token_ids == nullptr || out_count == nullptr) {
        return MakeStatus(POMAI_STATUS_INVALID_ARGUMENT, "db, membrane_name, out_token_ids, out_count must be non-null");
    }
    *out_token_ids = nullptr;
    *out_count = 0;
    pomai::TokenBlob tokens;
    auto st = db->db->GetRagChunk(membrane_name, chunk_id, &tokens);
    if (!st.ok()) {
        return ToCStatus(st);
    }
    if (tokens.empty()) {
        return nullptr;
    }
    uint32_t* buf = static_cast<uint32_t*>(palloc_malloc_aligned(tokens.size() * sizeof(uint32_t), alignof(uint32_t)));
    if (!buf) {
        return MakeStatus(POMAI_STATUS_RESOURCE_EXHAUSTED, "get_rag_chunk allocation failed");
    }
    std::memcpy(buf, tokens.data(), tokens.size() * sizeof(uint32_t));
    *out_token_ids = buf;
    *out_count = tokens.size();
    return nullptr;
}

void pomai_rag_search_result_free(pomai_rag_search_result_t* result) {
    if (result == nullptr) return;
    palloc_free(result->hits);
    result->hits = nullptr;
    result->hit_count = 0;
}

void pomai_search_batch_free(pomai_search_results_t* results, size_t num_queries) {
    if (!results) return;
    for (size_t i = 0; i < num_queries; ++i) {
        palloc_free(results[i].ids);
        palloc_free(results[i].scores);
        palloc_free(results[i].shard_ids);
        palloc_free(results[i].zero_copy_pointers);
    }
    palloc_free(results);
}

void pomai_release_pointer(uint64_t session_id) {
    pomai::core::MemoryPinManager::Instance().Unpin(session_id);
}

void pomai_free(void* p) {
    palloc_free(p);
}

}  // extern "C"
