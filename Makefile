CHEESEBRAIN_DIR := cheesebrain
CHEESEBRAIN_BUILD := $(CHEESEBRAIN_DIR)/build
CHEESEBRAIN_BIN := $(CHEESEBRAIN_BUILD)/bin/cheese-server
UI_BIN := cheesecrab
DAEMON_BIN := cheesecrab-daemon

.PHONY: all build run clean

all: build

# Build the C++ server, the Wails UI, and the Go daemon.
build: $(CHEESEBRAIN_BIN) $(UI_BIN) $(DAEMON_BIN)

$(CHEESEBRAIN_BIN):
	cmake -S $(CHEESEBRAIN_DIR) -B $(CHEESEBRAIN_BUILD)
	cmake --build $(CHEESEBRAIN_BUILD) --config Release

$(UI_BIN):
	mkdir -p local_pkgconfig
	[ -f local_pkgconfig/webkit2gtk-4.0.pc ] || ln -s /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.1.pc local_pkgconfig/webkit2gtk-4.0.pc
	PKG_CONFIG_PATH=$(shell pwd)/local_pkgconfig GO111MODULE=on go build -o $(UI_BIN) -tags desktop,production,webkit2gtk_4_1 .
	rm -rf local_pkgconfig

$(DAEMON_BIN):
	GO111MODULE=on go build -o $(DAEMON_BIN) ./cmd/cheesecrab

# Build everything and run the UI.
run: build
	./$(UI_BIN)

clean:
	rm -rf $(CHEESEBRAIN_BUILD) $(UI_BIN) $(DAEMON_BIN)
