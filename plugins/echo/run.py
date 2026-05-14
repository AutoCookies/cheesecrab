import json
import os


args = json.loads(os.environ.get("CHEESERAG_PLUGIN_ARGS", "{}"))
print(args.get("message", ""))
