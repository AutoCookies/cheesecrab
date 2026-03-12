CHEESEBRAIN_DIR := cheesebrain
CHEESEBRAIN_BUILD := $(CHEESEBRAIN_DIR)/build
CHEESEBRAIN_BIN := $(CHEESEBRAIN_BUILD)/bin/cheese-server
GO_BIN := cheesecrab

.PHONY: all build run clean

all: build

# Build both the cheesebrain C++ server and the Go daemon.
build: $(CHEESEBRAIN_BIN) $(GO_BIN)

$(CHEESEBRAIN_BIN):
	cmake -S $(CHEESEBRAIN_DIR) -B $(CHEESEBRAIN_BUILD)
	cmake --build $(CHEESEBRAIN_BUILD) --config Release

$(GO_BIN):
	GO111MODULE=on go build -o $(GO_BIN) ./cmd/cheesecrab

# Build everything and run the daemon.
run: build
	./$(GO_BIN)

clean:
	rm -rf $(CHEESEBRAIN_BUILD) $(GO_BIN)

