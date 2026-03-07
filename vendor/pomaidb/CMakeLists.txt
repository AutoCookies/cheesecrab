cmake_minimum_required(VERSION 3.20)
project(pomai VERSION 0.1.0 LANGUAGES C CXX)

# =========================
# Global build settings
# =========================
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

option(POMAI_BUILD_TESTS "Build tests" OFF)
option(POMAI_BUILD_BENCH "Build benchmarks" OFF)

# Prefer integer (SQ8/FP16) distance paths where data is quantized; reduces float use on embedded.
option(POMAI_PREFER_INTEGER_MATH "Prefer integer/SQ8/FP16 paths for distance (embedded)" ON)

# Edge-oriented build profile for constrained devices.
# When enabled, we bias towards smaller binaries and lower memory/debug overhead.
option(POMAI_EDGE_BUILD "Optimize PomaiDB build for edge devices (size/footprint)" OFF)

# Strict build mode: treat project warnings as errors (useful for CI/hardening).
# We keep a couple of warning categories non-fatal to tolerate intentional diagnostics
# from some vendored headers included by the core.
option(POMAI_STRICT "Treat warnings as errors for PomaiDB code" OFF)

# Ensure POMAI_PREFER_INTEGER_MATH is defined for source code (0 or 1)
add_compile_definitions(POMAI_PREFER_INTEGER_MATH=$<BOOL:${POMAI_PREFER_INTEGER_MATH}>)

if (POMAI_EDGE_BUILD)
  add_compile_definitions(POMAI_EDGE_BUILD=1)
  # Favor size over speed and strip most debug info in edge builds.
  add_compile_options(-Os -g0)
endif()


# =========================
# Native HNSW (Replaces FAISS HNSW)
# =========================
message(STATUS "[pomai] Native HNSW: enabled")


# =========================
# Library: pomai
# =========================
add_library(pomai STATIC
  src/api/db.cc
  src/database.cc
  src/core/vector_engine/vector_engine.cc
  src/core/shard/runtime.cc
  src/core/shard/layer_lookup.cc
  src/core/shard/iterator.cc
  src/core/shard/manifest.cc
  src/core/membrane/manager.cc
  src/table/memtable.cc
  src/storage/wal/wal.cc
  src/storage/manifest/manifest.cc
  src/storage/storage_engine.cc
  src/table/segment.cc
  src/core/storage/compaction_manager.cc

  src/core/quantization/scalar_quantizer.cc
  src/core/quantization/half_float_quantizer.cc
  src/core/index/ivf_coarse.cc
  src/core/index/ivf_flat.cc
  src/core/distance.cc

  src/core/routing/routing_table.cc
  src/core/routing/kmeans_lite.cc
  src/core/routing/routing_persist.cc
  src/core/rag/rag_engine.cc

  # Phase 2: Product Quantizer
  src/core/quantization/pomai_pq.cc

  # Phase 3 (Milvus-Lite inspired): BitsetMask pre-computed filter bitset
  src/core/bitset_mask.cc

  src/core/index/hnsw_index.cc
  third_party/pomaidb_hnsw/hnsw.cc

  # Gate #1/#2 utilities (linked into libpomai)
  src/util/posix_file.cc
  src/util/crc32c.cc
  src/util/logging.cc
)

target_include_directories(pomai
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${CMAKE_CURRENT_SOURCE_DIR}/src
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}
  SYSTEM PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/third_party
)

# Vendored code: keep strict warnings for PomaiDB, but avoid breaking builds on
# third_party sources when POMAI_STRICT is enabled.
if (POMAI_STRICT AND NOT MSVC)
  set_source_files_properties(third_party/pomaidb_hnsw/hnsw.cc PROPERTIES COMPILE_OPTIONS
    "-Wno-error;-Wno-shadow;-Wno-unused-parameter;-Wno-unused-but-set-variable")
endif()

# OpenMP for parallel builds if needed
find_package(OpenMP QUIET)
if (OpenMP_CXX_FOUND)
  target_link_libraries(pomai PRIVATE OpenMP::OpenMP_CXX)
endif()

if (MSVC)
  target_compile_options(pomai PRIVATE /W4 /permissive-)
else()
  # Strict warnings for pomaidb code; then suppress vendored third_party (simd) warnings.
  # We do not use / -Werror globally because some third_party headers intentionally emit #warning.
  target_compile_options(pomai PRIVATE
    -Wall -Wextra -Wpedantic -Wconversion -Wshadow
    -Wunused-parameter -Wunused-variable
    -Wno-cpp -Wno-unknown-pragmas -Wno-conversion -Wno-float-conversion -Wno-unused-function
  )
endif()

if (POMAI_STRICT)
  if (MSVC)
    target_compile_options(pomai PRIVATE /WX)
  else()
    target_compile_options(pomai PRIVATE
      -Werror
      # Some vendored headers use extensions that trigger pedantic/cpp warnings.
      -Wno-error=pedantic
      -Wno-error=cpp
      # third_party/simd uses #warning; pre-C++23 this triggers -Wc++23-extensions.
      # We disable that warning category entirely to keep strict builds usable.
      -Wno-c++23-extensions
    )
  endif()
endif()


# =========================
# Library: pomai_c (C ABI)
# =========================
set(POMAI_C_API_SOURCES
  src/capi/capi_status.cc
  src/capi/capi_db.cc
  src/capi/capi_scan.cc
)

add_library(pomai_c SHARED ${POMAI_C_API_SOURCES})
add_library(pomai_c_static STATIC ${POMAI_C_API_SOURCES})

set_target_properties(pomai_c_static PROPERTIES OUTPUT_NAME pomai_c)

target_link_libraries(pomai_c PRIVATE pomai)
target_link_libraries(pomai_c_static PRIVATE pomai)

# Export C API symbols when building shared library on Windows.
target_compile_definitions(pomai_c PRIVATE POMAI_C_BUILD_DLL)

target_include_directories(pomai_c
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)
target_include_directories(pomai_c_static
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/src
)

if (MSVC)
  target_compile_options(pomai_c PRIVATE /W4 /permissive-)
  target_compile_options(pomai_c_static PRIVATE /W4 /permissive-)
else()
  target_compile_options(pomai_c PRIVATE
    -Wall -Wextra -Wpedantic -Wconversion -Wshadow
    -Wunused-parameter -Wunused-variable
  )
  target_compile_options(pomai_c_static PRIVATE
    -Wall -Wextra -Wpedantic -Wconversion -Wshadow
    -Wunused-parameter -Wunused-variable
  )
endif()

if (POMAI_STRICT)
  if (MSVC)
    target_compile_options(pomai_c PRIVATE /WX)
    target_compile_options(pomai_c_static PRIVATE /WX)
  else()
    target_compile_options(pomai_c PRIVATE -Werror -Wno-error=pedantic -Wno-error=cpp -Wno-c++23-extensions)
    target_compile_options(pomai_c_static PRIVATE -Werror -Wno-error=pedantic -Wno-error=cpp -Wno-c++23-extensions)
  endif()
endif()
