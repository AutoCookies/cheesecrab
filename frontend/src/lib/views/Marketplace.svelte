<script>
  import { 
    Download, 
    Box, 
    Puzzle, 
    Search, 
    ArrowRight, 
    CheckCircle2, 
    AlertCircle,
    Info,
    Database,
    Cpu,
    Zap,
    RefreshCw
  } from 'lucide-svelte';
  import { getModels, pullModel, loadModel } from '../api.js';

  let { onPluginInstalled } = $props();

  let plugins = $state([]);
  let loading = $state(true);
  let installingId = $state(null);

  // Model Pulling State
  let modelName = $state('');
  let pullProgress = $state(null); // { status, completed, total }
  let pullError = $state(null);
  let isPulling = $state(false);

  // Local Models State
  let localModels = $state([]);
  let loadingModels = $state(true);
  let loadingModelId = $state(null);

  async function fetchLocalModels() {
    try {
      const models = await getModels();
      localModels = models || [];
    } catch (err) {
      console.error('Failed to fetch local models:', err);
    } finally {
      loadingModels = false;
    }
  }

  $effect(() => {
    fetchLocalModels();
    const interval = setInterval(fetchLocalModels, 5000);
    return () => clearInterval(interval);
  });

  // Mock remote registry fetch
  $effect(() => {
    setTimeout(() => {
      plugins = [
        { 
          id: 'note', 
          name: 'CrabNote', 
          description: 'Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.',
          author: 'Cheesecrab Labs',
          version: '1.2.0',
          download_url: 'https://example.com/plugins/crab-note.zip'
        },
        { 
          id: 'calendar', 
          name: 'CrabCalendar', 
          description: 'AI-first scheduling. It learns your peak focus hours and manages tasks.',
          author: 'Cheesecrab Labs',
          version: '0.9.5',
          download_url: 'https://example.com/plugins/crab-calendar.zip'
        }
      ];
      loading = false;
    }, 500);
  });

  async function installPlugin(plugin) {
    if (installingId) return;
    installingId = plugin.id;
    try {
      if (window.go && window.go.main && window.go.main.App) {
        await window.go.main.App.InstallPlugin(plugin.download_url);
        onPluginInstalled?.();
      } else {
        await new Promise(r => setTimeout(r, 1500));
      }
    } catch (err) {
      console.error(err);
    } finally {
      installingId = null;
    }
  }

  function doPullModel() {
    if (!modelName || isPulling) return;
    pullError = null;
    pullProgress = { status: 'Initializing...', completed: 0, total: 100 };
    isPulling = true;
    pullModel(modelName, {
      onProgress: (data) => {
        pullProgress = data;
        isPulling = true;
        if (data && data.status === 'success') {
          isPulling = false;
          pullProgress = null;
          fetchLocalModels();
        }
      },
      onError: (err) => {
        pullError = err;
        isPulling = false;
      }
    });
  }

  async function doLoadModel(name) {
    if (loadingModelId) return;
    loadingModelId = name;
    try {
      await loadModel(name);
      fetchLocalModels();
    } catch (err) {
      console.error(err);
    } finally {
      loadingModelId = null;
    }
  }
</script>

<div class="marketplace animate-fade">
  <header class="page-header">
    <div class="header-content">
      <h1 class="brand-font">Registry</h1>
      <p>Discover and deploy edge-native AI models and specialized modules.</p>
    </div>
    <div class="header-stats">
      <div class="stat-item">
        <Database size={14} />
        <span>{localModels.length} Models</span>
      </div>
      <div class="stat-item">
        <Puzzle size={14} />
        <span>{plugins.length} Plugins</span>
      </div>
    </div>
  </header>

  <div class="layout-grid">
    <div class="main-column">
      <section class="section">
        <div class="section-title">
          <Download size={18} />
          <h2>Model Puller</h2>
        </div>
        <div class="surface-card puller-card">
          <p class="instruction">Download high-performance GGUF models directly to your machine.</p>
          <div class="input-row">
            <div class="input-wrapper">
              <Search size={16} class="input-icon" />
              <input 
                type="text" 
                placeholder="Paste Hugging Face URL or Registry Tag..." 
                bind:value={modelName}
                disabled={isPulling}
              />
            </div>
            <button class="primary-btn" onclick={doPullModel} disabled={isPulling || !modelName}>
              {#if isPulling}
                <RefreshCw size={16} class="spin" />
                <span>Pulling...</span>
              {:else}
                <Download size={16} />
                <span>Pull Model</span>
              {/if}
            </button>
          </div>

          {#if pullProgress}
            <div class="progress-zone">
              <div class="progress-meta">
                <span class="status">{pullProgress.status}</span>
                <span class="percent">{Math.round((pullProgress.completed / pullProgress.total) * 100) || 0}%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: {(pullProgress.completed / pullProgress.total) * 100}%"></div>
              </div>
            </div>
          {/if}

          {#if pullError}
            <div class="error-zone">
              <AlertCircle size={16} />
              <span>{pullError}</span>
            </div>
          {/if}

          <div class="hints">
            <Info size={12} />
            <span>Supported: huggingface.co, docker.io, oci://</span>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-title">
          <Cpu size={18} />
          <h2>Local Engine Models</h2>
        </div>
        
        {#if loadingModels}
          <div class="loading-box">
             <RefreshCw size={24} class="spin" />
             <p>Scanning persistent storage...</p>
          </div>
        {:else if localModels.length === 0}
          <div class="empty-box">
            <Box size={32} />
            <h3>No Models Found</h3>
            <p>Your local repository is empty. Pull your first model above.</p>
          </div>
        {:else}
          <div class="models-grid">
            {#each localModels as model}
              <div class="model-card surface-card">
                <div class="card-top">
                  <div class="model-meta">
                    <span class="status-tag" class:active={model.status.value === 'loaded'}>
                      {model.status.value === 'loaded' ? 'Active' : 'Standby'}
                    </span>
                  </div>
                  <button class="settings-btn"><Info size={14} /></button>
                </div>
                <div class="model-id">{model.id.split('/').pop()}</div>
                <div class="model-repo">{model.id.includes('/') ? model.id.split('/').slice(0,-1).join('/') : 'Local Archive'}</div>
                
                <div class="card-footer">
                  {#if model.status.value !== 'loaded'}
                    <button 
                      class="load-btn" 
                      onclick={() => doLoadModel(model.id)}
                      disabled={loadingModelId === model.id}
                    >
                      {#if loadingModelId === model.id}
                        <RefreshCw size={14} class="spin" />
                        <span>Booting...</span>
                      {:else}
                        <Zap size={14} />
                        <span>Load Engine</span>
                      {/if}
                    </button>
                  {:else}
                    <div class="engine-ready">
                      <CheckCircle2 size={14} />
                      <span>Ready for Inference</span>
                    </div>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    </div>

    <div class="side-column">
      <section class="section">
        <div class="section-title">
          <Puzzle size={18} />
          <h2>Plugin Store</h2>
        </div>
        <div class="plugin-list">
          {#if loading}
            <div class="loading-state">Syncing store...</div>
          {:else}
            {#each plugins as plugin}
              <div class="plugin-card surface-card">
                <div class="plugin-header">
                  <div class="plugin-info">
                    <h3>{plugin.name}</h3>
                    <span class="version">v{plugin.version}</span>
                  </div>
                  <div class="plugin-brand">
                    <Puzzle size={20} />
                  </div>
                </div>
                <p class="description">{plugin.description}</p>
                <div class="plugin-footer">
                  <span class="author">by {plugin.author}</span>
                  <button 
                    class="install-btn" 
                    onclick={() => installPlugin(plugin)}
                    disabled={installingId === plugin.id}
                  >
                    {#if installingId === plugin.id}
                      <RefreshCw size={14} class="spin" />
                    {:else}
                      <ArrowRight size={14} />
                    {/if}
                  </button>
                </div>
              </div>
            {/each}
          {/if}
        </div>
      </section>
    </div>
  </div>
</div>

<style>
  .marketplace {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 0;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2.5rem;
    padding: 0 0.5rem;
  }

  .page-header h1 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .page-header p {
    color: var(--text-secondary);
    font-size: 1rem;
    max-width: 500px;
  }

  .header-stats {
    display: flex;
    gap: 1.5rem;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    background: var(--bg-surface);
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
  }

  .layout-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 2.5rem;
  }

  .section {
    margin-bottom: 3rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    color: var(--text-secondary);
  }

  .section-title h2 {
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .puller-card {
    padding: 2rem;
  }

  .instruction {
    font-size: 0.95rem;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .input-row {
    display: flex;
    gap: 1rem;
  }

  .input-wrapper {
    position: relative;
    flex-grow: 1;
  }

  .input-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
  }

  input {
    width: 100%;
    background: var(--bg-main);
    border: 1px solid var(--border-bold);
    color: var(--text-primary);
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    transition: all var(--transition-fast);
  }

  input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .primary-btn {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: var(--accent-primary);
    color: #fff;
    font-weight: 600;
    padding: 0 1.5rem;
    border-radius: var(--radius-md);
    white-space: nowrap;
  }

  .primary-btn:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-1px);
  }

  .primary-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .progress-zone {
    margin-top: 1.5rem;
    padding: 1.25rem;
    background: var(--bg-main);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.85rem;
  }

  .status { font-weight: 600; color: var(--text-primary); }
  .percent { color: var(--accent-primary); font-weight: 700; }

  .progress-bar {
    height: 6px;
    background: var(--border-subtle);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    transition: width 0.3s ease;
  }

  .error-zone {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
  }

  .hints {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.25rem;
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }

  .models-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1.25rem;
  }

  .model-card {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    min-height: 160px;
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .status-tag {
    font-size: 0.65rem;
    font-weight: 800;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: var(--bg-main);
    color: var(--text-tertiary);
    border: 1px solid var(--border-subtle);
  }

  .status-tag.active {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.2);
  }

  .settings-btn {
    color: var(--text-tertiary);
  }

  .model-id {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: var(--text-primary);
    word-break: break-all;
  }

  .model-repo {
    font-size: 0.8rem;
    color: var(--text-tertiary);
    margin-bottom: 1.5rem;
  }

  .card-footer {
    margin-top: auto;
  }

  .load-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem;
    background: var(--bg-main);
    border: 1px solid var(--border-bold);
    border-radius: var(--radius-md);
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .load-btn:hover {
    background: var(--bg-surface-hover);
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }

  .engine-ready {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: #10b981;
  }

  .plugin-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .plugin-card {
    padding: 1.25rem;
  }

  .plugin-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .plugin-info h3 {
    font-size: 1.05rem;
    font-weight: 700;
  }

  .version {
    font-size: 0.7rem;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .plugin-brand {
    color: var(--accent-primary);
    opacity: 0.8;
  }

  .description {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
  }

  .plugin-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .author {
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }

  .install-btn {
    width: 32px;
    height: 32px;
    background: var(--accent-primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px var(--accent-glow);
  }

  .loading-box, .empty-box {
    padding: 4rem 2rem;
    text-align: center;
    background: var(--bg-surface);
    border-radius: var(--radius-lg);
    border: 1px dashed var(--border-bold);
    color: var(--text-tertiary);
  }

  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .empty-box h3 {
    color: var(--text-secondary);
    margin: 0;
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
