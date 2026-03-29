FROM python:3.12-slim

# Install build dependencies for PomaiDB C++ core
RUN apt-get update && apt-get install -y cmake g++ git && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . /app

# Build the PomaiDB embedded database library
RUN cd third_party/pomaidb && \
    cmake -S . -B build -DCMAKE_BUILD_TYPE=Release && \
    cmake --build build -j$(nproc)

# Install FastAPI and AI dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Configure environment for the Local AI OS
ENV POMAI_C_LIB=/app/third_party/pomaidb/build/libpomai_c.so
ENV PYTHONPATH=/app/third_party/pomaidb/python
ENV RAG_DB_PATH=/data/rag_db

# Create data directory for volume mounting
RUN mkdir -p /data/rag_db

EXPOSE 9090

# Start the FastAPI Orchestrator
CMD ["uvicorn", "cheese_api.server:app", "--host", "0.0.0.0", "--port", "9090"]
