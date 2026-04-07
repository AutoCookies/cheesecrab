import sys
import time
import os
import requests
from watchdog.observers.polling import PollingObserver
from watchdog.events import FileSystemEventHandler
from loguru import logger

class ASTIndexerHandler(FileSystemEventHandler):
    def __init__(self, endpoint: str, api_key: str):
        super().__init__()
        self.endpoint = endpoint
        self.api_key = api_key

    def process_event(self, event):
        if event.is_directory:
            return
        
        path = event.src_path
        # Only index targeted source files
        if not path.endswith((".py", ".go", ".cpp", ".c", ".h")):
            return
            
        # Ignore git/build dirs
        if ".git" in path or "build" in path or ".venv" in path or "third_party" in path:
            return

        logger.info(f"File modified: {path} - Triggering AST chunk synchronization...")
        
        headers = {
            "Content-Type": "application/json",
            "X-API-Key": self.api_key
        }
        payload = {"filepath": path}

        try:
            resp = requests.post(self.endpoint, json=payload, headers=headers, timeout=5)
            if resp.status_code == 200:
                data = resp.json()
                logger.success(f"Successfully synced {path}! Added {data.get('code_blocks_indexed', 0)} AST chunks.")
            else:
                logger.error(f"Failed to sync {path}. Server returned {resp.status_code}: {resp.text}")
        except Exception as e:
            logger.error(f"Error reaching Cheeserag API for {path}: {e}")

    def on_modified(self, event):
        self.process_event(event)
        
    def on_created(self, event):
        self.process_event(event)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        watch_path = sys.argv[1]
    else:
        watch_path = "."
        
    # Read orchestrator config from env
    host = os.environ.get("RAG_FACADE_HOST", "127.0.0.1")
    port = os.environ.get("RAG_FACADE_PORT", "9090")
    api_key = os.environ.get("CHEESE_API_KEY", "cheese-admin-key")
    
    endpoint = f"http://{host}:{port}/v1/index_file"

    event_handler = ASTIndexerHandler(endpoint=endpoint, api_key=api_key)
    
    # We use PollingObserver in case the environment is virtualized or doesn't support inotify well
    observer = PollingObserver()
    observer.schedule(event_handler, watch_path, recursive=True)
    
    logger.info(f"Starting PomaiDB Background AST Watcher on '{watch_path}'...")
    logger.info(f"Target API Endpoint: {endpoint}")
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Stopping AST Watcher...")
        observer.stop()
    observer.join()
