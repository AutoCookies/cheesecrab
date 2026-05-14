# Cheeserag Extensions

Cheeserag can load project-local skills and installed plugins at agent startup. Skills belong to each project under `.cheese/`; plugins belong to the CheeseRAG installation under `plugins/`.

## Skills

Create a folder under `.cheese/skills/` with a `SKILL.md` file:

```text
.cheese/
  skills/
    my-skill/
      SKILL.md
```

The agent lists installed skills in its prompt. It can call `list_skills` and `read_skill` when a task matches a skill. In chat mode, use:

```text
/skills
/skill my-skill
```

Use `--skills-dir <path>` or `CHEESERAG_SKILLS_DIR=<path>` to load skills from another directory. If `.cheese/skills` does not exist, Cheeserag falls back to a legacy `skills/` folder when present.

## Plugins

Install plugins directly inside the CheeseRAG installation:

```text
plugins/
  my-plugin/
    plugin.json
    run.py
```

Example manifest:

```json
{
  "name": "my-plugin",
  "description": "Describe what this plugin does.",
  "command": "python3 run.py",
  "dangerous": true,
  "timeout_sec": 120,
  "args_schema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Input query." }
    },
    "required": ["query"]
  }
}
```

The agent exposes each plugin as a tool named `plugin_<name>`, with dashes converted to underscores. Plugin arguments are passed as JSON on stdin and in the `CHEESERAG_PLUGIN_ARGS` environment variable.

Use `--plugins-dir <path>` or `CHEESERAG_PLUGINS_DIR=<path>` to load plugins from another directory. Set `CHEESERAG_HOME=<path-to-cheeserag>` if you launch the binary from outside the CheeseRAG repo and want the default plugin directory to resolve to that installation.

Plugins are dangerous by default because they execute local commands. Set `"dangerous": false` only for read-only commands you trust.
