const { app, BrowserWindow, BrowserView, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

let mainWindow;
let syntaxVoidView = null;

// Use the app's root directory as the base for all paths
const APP_ROOT = app.getAppPath();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const isDev = process.env.VITE_DEV_SERVER_URL;
  if (isDev) {
    mainWindow.loadURL(isDev);
  } else {
    mainWindow.loadFile(path.join(APP_ROOT, 'dist/index.html'));
  }

  // ── Window controls ──────────────────────────────────────────────────────
  ipcMain.on('window-minimize', () => mainWindow.minimize());
  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) mainWindow.restore();
    else mainWindow.maximize();
  });
  ipcMain.on('window-close', () => mainWindow.close());

  // ── Atom/SyntaxVoid IPC handlers (ipc-helpers.js respondTo pattern) ──────
  // These are called by SyntaxVoid's internal application-delegate.js via
  // ipcHelpers.call(channel, responseChannel, ...args).
  // They MUST reply on responseChannel or the promise will hang forever.
  const atomIpcHandler = (channel, handler) => {
    ipcMain.on(channel, async (event, responseChannel, ...args) => {
      try {
        const result = await handler(event, ...args);
        if (!event.sender.isDestroyed()) {
          event.sender.send(responseChannel, result ?? null);
        }
      } catch (err) {
        console.error(`[Main][${channel}] Error:`, err);
        if (!event.sender.isDestroyed()) {
          event.sender.send(responseChannel, null);
        }
      }
    });
  };

  // Generic window method dispatcher
  atomIpcHandler('window-method', (event, method, ...args) => {
    console.log(`[Main] window-method: ${method}`, args);
    try {
      if (mainWindow && typeof mainWindow[method] === 'function') {
        return mainWindow[method](...args);
      }
    } catch (e) {
      console.warn(`[Main] window-method ${method} failed:`, e.message);
    }
    return null;
  });

  // Specific window management handlers that SyntaxVoid calls during startup
  atomIpcHandler('set-window-size', (event, width, height) => {
    console.log(`[Main] set-window-size: ${width}x${height} (no-op in embedded mode)`);
    return null; // No-op: we're embedded in a BrowserView, not a real window
  });

  atomIpcHandler('set-window-position', (event, x, y) => {
    console.log(`[Main] set-window-position: ${x},${y} (no-op in embedded mode)`);
    return null; // No-op
  });

  atomIpcHandler('center-window', () => {
    return null; // No-op
  });

  atomIpcHandler('focus-window', () => {
    if (syntaxVoidView) syntaxVoidView.webContents.focus();
    return null;
  });

  // ── pick-folder: Ctrl+Shift+O in SyntaxVoid calls this to open a directory ─
  atomIpcHandler('pick-folder', async (_event) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Open Folder',
      properties: ['openDirectory', 'multiSelections'],
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    return result.filePaths;
  });

  // These are sent by application:open-folder and application:open-file
  ipcMain.on('open-chosen-folder', async (event, defaultPath) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Open Folder',
      defaultPath: defaultPath,
      properties: ['openDirectory', 'createDirectory'],
    });
    if (!result.canceled && result.filePaths.length > 0) {
      // Re-use the existing 'open' logic by calling it with the path
      ipcMain.emit('open', event, { pathsToOpen: result.filePaths });
    }
  });

  ipcMain.on('open-chosen-file', async (event, defaultPath) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Open File',
      defaultPath: defaultPath,
      properties: ['openFile', 'multiSelections'],
    });
    if (!result.canceled && result.filePaths.length > 0) {
      ipcMain.emit('open', event, { pathsToOpen: result.filePaths });
    }
  });

  // Generic open-dialog (some Atom code paths use this directly)
  atomIpcHandler('show-open-dialog', async (_event, opts = {}) => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: opts.properties ?? ['openFile'],
      filters: opts.filters ?? [],
      title: opts.title ?? 'Open',
    });
    if (result.canceled) return null;
    return result.filePaths;
  });

  atomIpcHandler('show-window', () => {
    return null; // No-op: BrowserView is always shown when set
  });

  atomIpcHandler('hide-window', () => {
    return null; // No-op
  });

  // Temporary window state (used for window state persistence)
  let _temporaryWindowState = null;
  atomIpcHandler('get-temporary-window-state', () => {
    return _temporaryWindowState;
  });

  atomIpcHandler('set-temporary-window-state', (event, stateJSON) => {
    _temporaryWindowState = stateJSON;
    return null;
  });

  // Command installer (atom/apm CLI commands — no-op in embedded mode)
  ipcMain.on('install-shell-commands', (event, responseChannel) => {
    if (!event.sender.isDestroyed()) event.sender.send(responseChannel, null);
  });

  ipcMain.on('pick-folder', async (event, responseChannel) => {
    try {
      const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory', 'createDirectory', 'multiSelections']
      });
      if (!event.sender.isDestroyed()) {
        event.sender.send(responseChannel, canceled ? null : filePaths);
      }
    } catch (err) {
      console.error('[Main] pick-folder error:', err);
      if (!event.sender.isDestroyed()) {
        event.sender.send(responseChannel, null);
      }
    }
  });

  ipcMain.on('open', async (event, params = {}) => {
    // If pathsToOpen aren't provided, show dialog
    let pathsToOpen = params.pathsToOpen;
    if (!pathsToOpen || pathsToOpen.length === 0) {
      try {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
          properties: ['openFile', 'openDirectory', 'createDirectory', 'multiSelections']
        });
        if (!canceled && filePaths.length > 0) {
          pathsToOpen = filePaths;
        } else {
          return;
        }
      } catch (err) {
        console.error('[Main] open error:', err);
        return;
      }
    }

    // Once paths are resolved, tell SyntaxVoid to open them via syntaxvoid-preload or atom instance
    if (syntaxVoidView && pathsToOpen && pathsToOpen.length > 0) {
      // In embedded mode, since we don't spawn new windows, we instruct the current Atom instance
      // to open the provided paths. We can execute JS directly on the page since we own the BrowserView.
      const jsonPaths = JSON.stringify(pathsToOpen);
      const code = `if (typeof atom !== 'undefined' && atom.project) { atom.project.addPath(${jsonPaths}[0]); }`;
      syntaxVoidView.webContents.executeJavaScript(code).catch(e => console.error('[Main] Failed to open path in Atom:', e));
    }
  });

  ipcMain.handle('getScrollbarStyle', () => {
    return 'legacy';
  });

  // ── SyntaxVoid settings (used by syntaxvoid-preload.cjs) ─────────────────
  ipcMain.on('get-syntaxvoid-settings', (event) => {
    const resourcePath = path.join(APP_ROOT, 'src/spaces/coding/syntaxvoid');
    const atomHome = path.join(APP_ROOT, '.cheesecrab-syntaxvoid');

    try { fs.mkdirSync(atomHome, { recursive: true }); } catch (_) { }

    event.returnValue = {
      resourcePath,
      devMode: false,
      atomHome,
      appVersion: '1.130.1-dev',
      appName: 'SyntaxVoid',
      windowInitializationScript: path.join(resourcePath, 'src', 'initialize-application-window.js'),
      userSettings: { core: { useLegacySessionStore: true } },
      safeMode: false,
      clearWindowState: false,
      hasOpenFiles: false,
      initialProjectRoots: [],
    };
  });

  // ── window:loaded signal from Atom → tell React to hide the spinner ───────
  ipcMain.on('window-command', (event, cmd) => {
    if (
      syntaxVoidView &&
      event.sender === syntaxVoidView.webContents &&
      cmd === 'window:loaded' &&
      mainWindow && !mainWindow.isDestroyed()
    ) {
      console.log('[Main] SyntaxVoid reported window:loaded');
      mainWindow.webContents.send('syntaxvoid-ready');
    }
  });

  // ── Open SyntaxVoid ───────────────────────────────────────────────────────
  ipcMain.on('open-syntaxvoid', (event, { theme, bounds }) => {
    if (!bounds || bounds.width <= 0 || bounds.height <= 0) {
      console.error('[SyntaxVoid] Invalid bounds received from renderer:', bounds);
      return;
    }

    if (syntaxVoidView) {
      mainWindow.setBrowserView(syntaxVoidView);
      syntaxVoidView.setBounds(bounds);
      syntaxVoidView.webContents.focus();
      return;
    }

    console.log('[Main] Creating SyntaxVoid BrowserView with bounds:', bounds);

    syntaxVoidView = new BrowserView({
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'syntaxvoid-preload.cjs'),
      },
    });

    remoteMain.enable(syntaxVoidView.webContents);

    // Use dark theme background if applicable
    syntaxVoidView.setBackgroundColor(theme === 'dark' ? '#111827' : '#ffffff');

    mainWindow.setBrowserView(syntaxVoidView);
    syntaxVoidView.setBounds(bounds);

    // Focus the view immediately to avoid 'is-blurred' state
    syntaxVoidView.webContents.focus();

    // Open DevTools in detached mode for debugging if needed
    // syntaxVoidView.webContents.openDevTools({ mode: 'detach' });

    syntaxVoidView.webContents.on('console-message', (_e, level, message) => {
      console.log(`[SyntaxVoid renderer][${level}]`, message);
    });

    syntaxVoidView.webContents.on('did-fail-load', (_e, code, desc, url) => {
      console.error('[SyntaxVoid] did-fail-load:', code, desc, url);
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('syntaxvoid-load-error', desc || `Load failed (${code})`);
      }
    });

    const htmlPath = path.join(APP_ROOT, 'src/spaces/coding/syntaxvoid/static/index.html');
    const fileUrl = pathToFileURL(htmlPath).href;

    console.log('[SyntaxVoid] Loading URL:', fileUrl);
    syntaxVoidView.webContents.loadURL(fileUrl)
      .then(() => {
        console.log('[SyntaxVoid] loadURL OK');
        // Ensure focus after load
        if (syntaxVoidView) syntaxVoidView.webContents.focus();
      })
      .catch(err => {
        console.error('[SyntaxVoid] load error:', err?.message || err);
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('syntaxvoid-load-error', err?.message || 'Load failed');
        }
      });

    syntaxVoidView.webContents.on('dom-ready', () => {
      console.log('[SyntaxVoid] DOM Ready, skipping external CSS injection to preserve isolated themes.');
    });
  });

  ipcMain.on('resize-syntaxvoid', (_e, bounds) => {
    if (syntaxVoidView && bounds && bounds.width > 0) {
      console.log('[Main] Resizing SyntaxVoid to:', bounds);
      syntaxVoidView.setBounds(bounds);
    }
  });

  // ── Hide: detach BrowserView from window but keep it alive in memory ────────
  ipcMain.on('hide-syntaxvoid', () => {
    if (syntaxVoidView) {
      console.log('[Main] Hiding SyntaxVoid BrowserView (tab switch)');
      mainWindow.removeBrowserView(syntaxVoidView);
    }
  });

  // ── Show: re-attach existing BrowserView and sync bounds ────────────────────
  ipcMain.on('show-syntaxvoid', (_e, bounds) => {
    if (!syntaxVoidView) return;
    console.log('[Main] Showing SyntaxVoid BrowserView with bounds:', bounds);
    mainWindow.setBrowserView(syntaxVoidView);
    if (bounds && bounds.width > 0) {
      syntaxVoidView.setBounds(bounds);
    }
    syntaxVoidView.webContents.focus();
  });

  ipcMain.on('close-syntaxvoid', () => {
    if (syntaxVoidView) {
      console.log('[Main] Closing SyntaxVoid BrowserView');
      mainWindow.removeBrowserView(syntaxVoidView);
      syntaxVoidView = null;
    }
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
