cmake_minimum_required(VERSION 3.16)
project(contextsqueeze_native LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(contextsqueeze
  src/contextsqueeze.cpp
  src/contextsqueeze_vision.cpp
  src/metrics.cpp
  internal/core/signature_registry.cpp
)

target_include_directories(contextsqueeze
  PUBLIC
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/internal
)
