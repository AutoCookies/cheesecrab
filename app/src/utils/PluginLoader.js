export class PluginLoader {
    constructor() {
        this.activePlugins = new Map(); // id -> { module, container }
    }

    async mountPlugin(pluginId, containerElement) {
        if (this.activePlugins.has(pluginId)) return;

        console.log(`[Microkernel] Loading isolated plugin sandbox: ${pluginId}...`);

        try {
            const iframe = document.createElement('iframe');
            iframe.id = `plugin-sandbox-${pluginId}`;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.backgroundColor = 'transparent';

            // Allow same-origin for IndexedDB and scripts for logic
            iframe.setAttribute('sandbox', 'allow-scripts allow-forms allow-same-origin allow-popups allow-downloads');

            // The iframe points to the plugin's standard entry point
            // This ensures all original CSS, JS, and assets are loaded in context
            iframe.src = `/plugins/${pluginId}/dist/index.html`;

            containerElement.appendChild(iframe);
            this.activePlugins.set(pluginId, { iframe, container: containerElement });

            console.log(`[Microkernel] Successfully sandboxed '${pluginId}'.`);
        } catch (err) {
            console.error(`[Microkernel] Failed to sandbox plugin '${pluginId}':`, err);
            containerElement.innerHTML = `<div class="p-4 text-red-500">Failed to load plugin sandbox: ${err.message}</div>`;
        }
    }

    async unmountPlugin(pluginId) {
        const plugin = this.activePlugins.get(pluginId);
        if (!plugin) return;

        console.log(`[Microkernel] Purging plugin sandbox: ${pluginId}...`);

        try {
            if (plugin.iframe && plugin.iframe.parentNode) {
                plugin.iframe.parentNode.removeChild(plugin.iframe);
            }
        } catch (err) {
            console.error(`[Microkernel] Error during purge of '${pluginId}':`, err);
        } finally {
            this.activePlugins.delete(pluginId);
            console.log(`[Microkernel] Sandbox for '${pluginId}' fully dismantled.`);
        }
    }

    isLoaded(pluginId) {
        return this.activePlugins.has(pluginId);
    }
}

// Singleton instance for the app
export const pluginLoader = new PluginLoader();
