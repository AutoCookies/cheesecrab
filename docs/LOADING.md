# Cheesecrab loading behavior

## Engine (cheesebrain)

| Mode        | When engine starts | Behavior |
|------------|--------------------|----------|
| **Web server** (`./cheesecrab-server`) | **Lazy** by default | Engine stays offline until the user clicks **Load Engine** in the Models page (or you set `CHEESEBRAIN_MODEL` to start it on boot). |
| **Web server** with `CHEESEBRAIN_MODEL` | Eager | Engine starts as soon as the server starts. |
| **Desktop** (Wails) | **Eager** | Engine starts in router mode as soon as the app starts (`app.go` `startup()`). |

## Frontend (web UI)

| What | Behavior |
|------|----------|
| **View components** (Chat, Agent, Models, Plugins, Crab Table) | **Eager** | All views are statically imported in `App.svelte`, so their code is in the initial bundle and loaded at once. |
| **Crab Table (Luckysheet)** | **Lazy** | Scripts and styles for the spreadsheet are loaded in `onMount` when you open the Crab Table view. |

## Summary

- **Server:** Engine is **lazy** (load on demand) unless `CHEESEBRAIN_MODEL` is set.
- **Desktop:** Engine is **eager** (starts on app startup).
- **UI:** View code is **eager**; only Crab Table’s heavy assets are **lazy**.

To make view code lazy (smaller initial load, load each view when first opened), the app would need to use dynamic imports (e.g. Svelte’s `{#await import(...)}`) for each view.
