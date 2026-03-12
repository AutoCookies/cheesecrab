const { ipcRenderer } = require('electron');

// SyntaxVoid / Atom intrinsically relies on this magical string being available right when the V8 context starts
// The main app passes this through an IPC sync call before the script evaluates.
try {
    const settings = ipcRenderer.sendSync('get-syntaxvoid-settings');
    window.loadSettingsJSON = JSON.stringify(settings);
} catch (e) {
    console.error("Failed to load syntaxvoid settings via sync IPC:", e);
}
