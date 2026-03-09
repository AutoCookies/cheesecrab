.PHONY: all build-core build-go run clean

# Default to building everything
all: build-core build-go

# Build the C++ core cheesecrab-server
build-core:
	@echo "Building cheesecrab core (C++)..."
	mkdir -p build && cd build && cmake .. -DCMAKE_BUILD_TYPE=Release && cmake --build . --config Release -j 4
	@echo "Core build complete. Binaries are in build/bin/"

# Build the Go agent server
build-go:
	@echo "Building Go agent server..."
	cd server && go mod tidy && go build -o ../build/bin/cheesecrab-agent main.go
	@echo "Go build complete. Binary is in build/bin/cheesecrab-agent"

# Run the Go agent (assuming the core is already built)
run:
	@echo "Running cheesecrab-agent..."
	./build/bin/cheesecrab-agent

# Clean builds
clean:
	rm -rf build/
	rm -f server/cheesecrab-agent
