<script>
  import { Puzzle, ArrowRight, RefreshCw, Package } from 'lucide-svelte';

  /**
   * @typedef {{ id: string, name: string, description: string, author: string, version: string, download_url: string }} Plugin
   */

  let { onPluginInstalled = () => {} } = $props();

  /** @type {Plugin[]} */
  let plugins = $state([]);
  let loading = $state(true);

  /** @type {string | null} */
  let installingId = $state(null);

  // Mock remote registry — replace with a real fetch when the registry API exists
  $effect(() => {
    const t = setTimeout(() => {
      plugins = [
        {
          id: 'note',
          name: 'CrabNote',
          description: 'Zettelkasten-style neural notes with RAG auto-linking. Perfect for research.',
          author: 'Cheesecrab Labs',
          version: '1.2.0',
          download_url: 'https://example.com/plugins/crab-note.zip',
        },
        {
          id: 'calendar',
          name: 'CrabCalendar',
          description: 'AI-first scheduling. It learns your peak focus hours and manages tasks.',
          author: 'Cheesecrab Labs',
          version: '0.9.5',
          download_url: 'https://example.com/plugins/crab-calendar.zip',
        },
      ];
      loading = false;
    }, 400);
    return () => clearTimeout(t);
  });

  /** @param {Plugin} plugin */
  async function installPlugin(plugin) {
    if (installingId) return;
    installingId = plugin.id;
    try {
      if (window.go?.main?.App?.InstallPlugin) {
        await window.go.main.App.InstallPlugin(plugin.download_url);
        onPluginInstalled();
      } else {
        // Web mode: no-op simulation until a backend endpoint exists
        await new Promise((r) => setTimeout(r, 1200));
      }
    } catch (err) {
      console.error('install plugin failed:', err);
    } finally {
      installingId = null;
    }
  }
</script>

<div class="plugins-view animate-fade">
  <header class="page-header">
    <div class="header-content">
      <h1 class="brand-font">Plugins</h1>
      <p>Extend Cheesecrab with community-built modules and integrations.</p>
    </div>
    <div class="stat-pill">
      <Puzzle size={14} />
      <span>{plugins.length} available</span>
    </div>
  </header>

  {#if loading}
    <div class="loading-state">
      <RefreshCw size={22} class="spin" />
      <span>Syncing registry…</span>
    </div>
  {:else if plugins.length === 0}
    <div class="empty-state">
      <Package size={36} />
      <h3>No plugins available</h3>
      <p>Check back later as the registry grows.</p>
    </div>
  {:else}
    <div class="plugin-grid">
      {#each plugins as plugin (plugin.id)}
        <div class="plugin-card surface-card">
          <div class="card-header">
            <div class="plugin-identity">
              <span class="plugin-name">{plugin.name}</span>
              <span class="plugin-version">v{plugin.version}</span>
            </div>
            <div class="plugin-icon-wrap">
              <Puzzle size={20} />
            </div>
          </div>

          <p class="plugin-desc">{plugin.description}</p>

          <div class="card-footer">
            <span class="plugin-author">by {plugin.author}</span>
            <button
              class="btn-install"
              onclick={() => installPlugin(plugin)}
              disabled={!!installingId}
              title={installingId === plugin.id ? 'Installing…' : 'Install'}
              aria-label="Install {plugin.name}"
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
    </div>
  {/if}
</div>

<style>
  .plugins-view {
    max-width: 960px;
    margin: 0 auto;
    padding: 1rem 0 3rem;
  }

  /* ── Header ── */
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
    margin-bottom: 0.4rem;
    color: var(--text-primary);
  }

  .page-header p {
    color: var(--text-secondary);
    font-size: 0.95rem;
  }

  .stat-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary);
    background: var(--bg-surface);
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
    white-space: nowrap;
  }

  /* ── States ── */
  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 4rem;
    color: var(--text-tertiary);
    font-size: 0.95rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.875rem;
    padding: 4rem 2rem;
    text-align: center;
    background: var(--bg-surface);
    border-radius: var(--radius-lg);
    border: 1px dashed var(--border-bold);
    color: var(--text-tertiary);
  }

  .empty-state h3 { color: var(--text-secondary); margin: 0; font-size: 1.05rem; }
  .empty-state p  { font-size: 0.9rem; margin: 0; }

  /* ── Grid ── */
  .plugin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.25rem;
  }

  /* ── Plugin card ── */
  .plugin-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.875rem;
  }

  .plugin-identity {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .plugin-name {
    font-size: 1.05rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .plugin-version {
    font-size: 0.72rem;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .plugin-icon-wrap {
    color: var(--accent-primary);
    opacity: 0.75;
    flex-shrink: 0;
  }

  .plugin-desc {
    font-size: 0.875rem;
    line-height: 1.55;
    color: var(--text-secondary);
    flex: 1;
    margin-bottom: 1.25rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
  }

  .plugin-author {
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }

  .btn-install {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    background: var(--accent-primary);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px var(--accent-glow);
    transition: background var(--transition-fast), transform var(--transition-fast);
  }

  .btn-install:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: scale(1.1);
  }

  .btn-install:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── Spinner ── */
  :global(.spin) { animation: spin 1s linear infinite; }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
</style>
