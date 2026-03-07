cmake_minimum_required(VERSION 3.20)
project(pomai_cache LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(pomaicache SHARED
  src/engine/engine.cpp
  src/engine/ssd_store.cpp
  src/policy/policies.cpp
  src/server/ai_cache.cpp
  src/pomai_embedded.cc
  src/metrics/info_metrics.cpp
  src/util/time.cpp
  src/ds/bloom_filter.cpp
  src/ds/count_min_sketch.cpp
  src/ds/vector_index.cpp
  src/ds/dep_graph.cpp
  src/ds/compression.cpp
  src/engine/prompt_cache.cpp
  src/bindings/c_api.cc
)

target_include_directories(pomaicache PUBLIC include)
