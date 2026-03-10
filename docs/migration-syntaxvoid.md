# SyntaxVoid Migration Guide

This document outlines how the **SyntaxVoid** codebase (an Atom editor fork) was migrated and embedded into the Cheesecrab Super monorepo as the "Coding Space".

## 1. What was Kept 100% Intact
The entire original SyntaxVoid source tree was preserved exactly as it was. No original files were deleted, refactored, or simplified.

- `src/` (Core editor logic, Babel setups, Window management)
- `packages/` (All default Atom/SyntaxVoid plugins, including `syntaxvoid-terminal`, `tree-view`, language grammars)
- `static/` (The main `index.html` entry, Less bootstrap styles, icons)
- `keymaps/`, `menus/`, `locales/`
- `package.json`

Because the source is untouched, future updates from the upstream `syntaxvoid` repository can be merged seamlessly.

## 2. What was Changed (Style Overrides & Wrappers)

### Folder Restructuring
SyntaxVoid was moved from the root of the monorepo into the Electron frontend application:
`~/pomaieco/cheesecrab/syntaxvoid` ➡️ `/app/src/spaces/coding/syntaxvoid/`

### The `<CodingSpace />` Wrapper
Instead of attempting to mangle SyntaxVoid's complex Webpack/Babel build into Vite, it is embedded using Electron's native `<webview>` tag, enabled in `/app/electron/main.cjs`.

- The wrapper component (`/app/src/spaces/coding/CodingSpace.jsx`) loads the legacy `static/index.html` file into an isolated webview process.
- **Style Injection:** Rather than modifying SyntaxVoid's `.less` files, the wrapper dynamically injects CSS variables matching the Cheesecrab Tailwind theme (`light`/`dark`) into the webview upon `dom-ready`. This forces the original editor UI to seamlessly match the outer dashboard.

### Go Backend Integration
- The header above the embedded editor provides context on AI readiness.
- SyntaxVoid packages (like `syntaxvoid-impact` or `syntaxvoid-risk-overlay`) will now hit `localhost:11435` (the Go agent proxy) using the active model selected in the AI Models Space.

## 3. How to Update SyntaxVoid in the Future

To pull the latest changes from the upstream SyntaxVoid repository without breaking the integration:

1. Navigate to the embedded folder:
   ```bash
   cd app/src/spaces/coding/syntaxvoid
   ```
2. Add the remote if not present or pull directly:
   ```bash
   git remote add upstream https://github.com/syntaxvoid-edit/syntaxvoid.git
   git pull upstream main
   ```
3. Run the installer to restore dependencies:
   ```bash
   yarn install
   ```

## 4. Build and Run Notes

The monorepo's `build.sh` script has been updated to automatically traverse into the embedded syntaxvoid directory and run `yarn install` or `npm install` before building the React frontend.

1. **To build:** Run `./build.sh` from the monorepo root.
2. **To run:** Run `./run.sh` from the monorepo root.

The Coding Space will dynamically initialize the electron webview instance when opened for the first time.
