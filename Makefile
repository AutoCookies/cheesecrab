CHEESEBRAIN_DIR  := cheesebrain
CHEESEBRAIN_BUILD := $(CHEESEBRAIN_DIR)/build
CHEESEBRAIN_BIN  := $(CHEESEBRAIN_BUILD)/bin/cheese-server
UI_BIN           := cheesecrab
DAEMON_BIN       := cheesecrab-daemon
SERVER_BIN       := cheesecrab-server

.PHONY: all build build-server frontend run run-server start clean

all: build

# ── Full desktop + daemon build ───────────────────────────────────────────────
build: $(CHEESEBRAIN_BIN) $(UI_BIN) $(DAEMON_BIN)

$(CHEESEBRAIN_BIN):
	cmake -S $(CHEESEBRAIN_DIR) -B $(CHEESEBRAIN_BUILD)
	cmake --build $(CHEESEBRAIN_BUILD) --config Release

$(UI_BIN):
	mkdir -p local_pkgconfig
	[ -f local_pkgconfig/webkit2gtk-4.0.pc ] || \
		ln -s /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.1.pc local_pkgconfig/webkit2gtk-4.0.pc
	PKG_CONFIG_PATH=$(shell pwd)/local_pkgconfig GO111MODULE=on \
		go build -o $(UI_BIN) -tags desktop,production,webkit2gtk_4_1 .
	rm -rf local_pkgconfig

$(DAEMON_BIN):
	GO111MODULE=on go build -o $(DAEMON_BIN) ./cmd/cheesecrab

# ── Self-contained server binary (build once, run anywhere) ──────────────────
# Builds the Svelte frontend, embeds it into the Go binary.
# Result: a single $(SERVER_BIN) binary that serves the full web UI + agent API.
build-server: frontend
	GO111MODULE=on go build -tags prod -o $(SERVER_BIN) ./cmd/cheesecrab
	@echo ""
	@echo "✓ Built $(SERVER_BIN)"
	@echo "  Run:  ./$(SERVER_BIN)"
	@echo "  Then: open http://127.0.0.1:8080 in your browser"

# Build the Svelte frontend only
frontend:
	cd frontend && npm run build

# ── Run targets ───────────────────────────────────────────────────────────────
run: build
	./$(UI_BIN)

# Run the self-contained server (dev mode: serves frontend/dist from disk)
run-server:
	GO111MODULE=on go run ./cmd/cheesecrab

# Build then run the server binary (production)
start: build-server
	./$(SERVER_BIN)

clean:
	rm -rf $(CHEESEBRAIN_BUILD) $(UI_BIN) $(DAEMON_BIN) $(SERVER_BIN)
