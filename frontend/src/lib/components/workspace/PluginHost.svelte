<script>
  import { onMount, onDestroy } from 'svelte';

  /**
   * @typedef {Object} PluginManifest
   * @property {string} id
   * @property {string} name
   * @property {string} main_js
   * @property {string} entry_element
   */

  /** @type {{ manifest: PluginManifest }} */
  let { manifest } = $props();

  let container = $state(null);
  let scriptLoaded = $state(false);
  let mountedElement = $state(null);

  onMount(() => {
    loadPlugin();
  });

  onDestroy(() => {
    cleanup();
  });

  async function loadPlugin() {
    // 1. Inject script
    const scriptId = `script-plugin-${manifest.id}`;
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      // Use the custom plugin:// protocol
      script.src = `plugin://${manifest.id}/${manifest.main_js}`;
      
      script.onload = () => {
        scriptLoaded = true;
        mountComponent();
      };
      
      script.onerror = (err) => {
        console.error(`Failed to load plugin script: ${manifest.id}`, err);
      };

      document.body.appendChild(script);
    } else {
      // Script already exists in the DOM
      scriptLoaded = true;
      mountComponent();
    }
  }

  function mountComponent() {
    if (!scriptLoaded || !container) return;

    // 2. Clear container just in case
    container.innerHTML = '';

    // 3. Create and append the Web Component entry element
    try {
      const el = document.createElement(manifest.entry_element);
      // Pass any global configuration if needed via attributes/props
      // el.setAttribute('api-base', '...'); 
      
      container.appendChild(el);
      mountedElement = el;
      console.log(`Plugin mounted: ${manifest.id}`);
    } catch (err) {
      console.error(`Failed to mount plugin component: ${manifest.entry_element}`, err);
    }
  }

  function cleanup() {
    if (mountedElement && mountedElement.parentNode) {
      mountedElement.parentNode.removeChild(mountedElement);
    }
    // We don't necessarily want to remove the script tag to allow caching 
    // unless the plugin is uninstalled.
  }

  // Reactive effect to remount if container becomes available after script load
  $effect(() => {
    if (container && scriptLoaded && !mountedElement) {
      mountComponent();
    }
  });
</script>

<div class="plugin-host" bind:this={container}>
  {#if !scriptLoaded}
    <div class="loading">
      <span class="spinner">🦀</span>
      <p>Nibbling plugin files...</p>
    </div>
  {/if}
</div>

<style>
  .plugin-host {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #444;
    gap: 16px;
  }

  .spinner {
    font-size: 2rem;
    animation: bounce 1s infinite alternate;
  }

  @keyframes bounce {
    from { transform: translateY(0); }
    to { transform: translateY(-10px); }
  }

  /* Ensure the plugin's web component fills the container */
  .plugin-host :global(*) {
    flex-grow: 1;
    width: 100%;
    height: 100%;
  }
</style>
