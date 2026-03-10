const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  windowMaximize: () => ipcRenderer.send('window-maximize'),
  windowClose: () => ipcRenderer.send('window-close'),

  // Expose app path so React can build absolute paths if needed
  getAppPath: () => process.env.VITE_DEV_SERVER_URL ? process.cwd() : process.resourcesPath + '/app',

  // SyntaxVoid BrowserView controls — bounds are measured by the React component
  openSyntaxVoid: (theme, bounds) => ipcRenderer.send('open-syntaxvoid', { theme, bounds }),
  closeSyntaxVoid: () => ipcRenderer.send('close-syntaxvoid'),
  resizeSyntaxVoid: (bounds) => ipcRenderer.send('resize-syntaxvoid', bounds),

  // Events coming back from the main process
  onSyntaxVoidReady: (cb) => ipcRenderer.on('syntaxvoid-ready', (_e) => cb()),
  onSyntaxVoidError: (cb) => ipcRenderer.on('syntaxvoid-load-error', (_e, msg) => cb(msg)),
  offSyntaxVoidReady: (cb) => ipcRenderer.removeListener('syntaxvoid-ready', cb),
  offSyntaxVoidError: (cb) => ipcRenderer.removeListener('syntaxvoid-load-error', cb),
});
