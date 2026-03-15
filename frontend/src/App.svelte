<script>
  import Sidebar from './lib/components/Sidebar.svelte';
  import TelemetryBar from './lib/components/TelemetryBar.svelte';
  import { onMount } from 'svelte';
  
  // Views
  import ChatSpace   from './lib/views/ChatSpace.svelte';
  import AgentSpace  from './lib/views/AgentSpace.svelte';
  import ModelsView  from './lib/views/ModelsView.svelte';
  import PluginsView from './lib/views/PluginsView.svelte';
  import CrabTableView from './lib/views/CrabTableView.svelte';
  import PluginHost  from './lib/components/workspace/PluginHost.svelte';

  let activeView = $state('chat');
  let installedPlugins = $state([]);
  let theme = $state('dark');

  // Initialize theme from localStorage
  onMount(() => {
    const savedTheme = localStorage.getItem('cheesecrab-theme') || 'dark';
    theme = savedTheme;
    document.documentElement.setAttribute('data-theme', theme);
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.getItem('cheesecrab-theme', theme);
  }

  // Fetch installed plugins from Wails backend
  $effect(() => {
    if (window.go && window.go.main && window.go.main.App) {
      window.go.main.App.GetInstalledPlugins().then(plugins => {
         installedPlugins = plugins || [];
      });
    }
  });

  const activePlugin = $derived(installedPlugins.find(p => p.id === activeView));
</script>

<main class="layout" data-theme={theme}>
  <Sidebar bind:activeView {installedPlugins} {theme} onToggleTheme={toggleTheme} />
  
  <div class="content-wrapper">
    <div class="main-content">
      <div class="view-wrapper" class:active={activeView === 'chat'}>
        <ChatSpace />
      </div>
      <div class="view-wrapper" class:active={activeView === 'agent'}>
        <AgentSpace />
      </div>
      <div class="view-wrapper" class:active={activeView === 'models'}>
        <ModelsView />
      </div>
      <div class="view-wrapper" class:active={activeView === 'plugins'}>
        <PluginsView onPluginInstalled={() => {
          window.go?.main?.App?.GetInstalledPlugins().then(p => { installedPlugins = p || []; });
        }} />
      </div>
      <div class="view-wrapper" class:active={activeView === 'crabtable'}>
        <CrabTableView />
      </div>
      
      {#if activePlugin}
        <div class="view-wrapper active">
          <PluginHost manifest={activePlugin} />
        </div>
      {/if}
    </div>
    
    <TelemetryBar />
  </div>
</main>

<style>
  .layout {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: var(--bg-main);
    color: var(--text-primary);
  }

  .content-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--bg-main);
  }

  .main-content {
    flex-grow: 1;
    overflow-y: auto;
    position: relative;
    padding: 1rem;
  }

  .view-wrapper {
    display: none;
    height: 100%;
  }

  .view-wrapper.active {
    display: block;
  }

  .h-full {
    height: 100%;
  }

  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-secondary);
  }

  .placeholder h1 {
    text-transform: capitalize;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
</style>
