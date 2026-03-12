#!/bin/bash
set -e

echo "🦀 Starting Cheesecrab Super..."

if [ ! -f "build/bin/cheese-server" ]; then
    echo "⚠️ build/bin/cheese-server not found. Run ./build.sh first."
    exit 1
fi
if [ ! -f "build/bin/cheesecrab-agent" ]; then
    echo "⚠️ build/bin/cheesecrab-agent not found. Run ./build.sh first."
    exit 1
fi
if [ ! -d "app/dist" ]; then
    echo "⚠️ app/dist not found (Electron app not built). Run ./build.sh first."
    exit 1
fi
if ! command -v yarn &>/dev/null; then
    echo "⚠️ yarn not found. Install Node.js and yarn, or run 'cd app && npm start' after building."
    exit 1
fi

# Kill any existing stray agents to avoid port conflicts
pkill -f cheesecrab-agent 2>/dev/null || true
pkill -f cheese-server 2>/dev/null || true

# Start the Go agent in the background
echo "Starting Cheesecrab Go Agent..."
export MODELS_DIR="./models"
./build/bin/cheesecrab-agent &
AGENT_PID=$!

# Ensure we kill the Go agent when this script exits
cleanup() {
    echo ""
    echo "Cleaning up..."
    echo "Stopping Cheesecrab Go Agent (PID $AGENT_PID)..."
    kill $AGENT_PID 2>/dev/null || true
    pkill -f cheese-server 2>/dev/null || true
    echo "Goodbye! 🦀"
}
trap cleanup EXIT INT TERM

# Wait for server to bind to port before opening UI
sleep 2

# Start the built Electron app natively
echo "Starting Electron Dashboard (Native)..."
cd app
yarn start
