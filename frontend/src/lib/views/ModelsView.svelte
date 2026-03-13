<script>
  import {
    Download,
    Box,
    Search,
    AlertCircle,
    Info,
    Cpu,
    Zap,
    CheckCircle2,
    RefreshCw,
    Database,
  } from 'lucide-svelte';
  import { getModels, pullModel, loadModel } from '../api.js';

  /**
   * @typedef {{ value: 'loaded' | 'standby' }} ModelStatus
   * @typedef {{ id: string, object: string, size: number, status: ModelStatus }} ModelEntry
   * @typedef {{ status: string, completed: number, total: number, error?: string }} PullProgress
   */

  /** @type {ModelEntry[]} */
  let localModels = $state([]);
  let loadingModels = $state(true);

  /** @type {string | null} */
  let loadingModelId = $state(null);
  /** @type {string | null} */
  let loadError = $state(null);

  // ── Pull state ────────────────────────────────────────────────────────────
  let pullUrl = $state('');
  /** @type {PullProgress | null} */
  let pullProgress = $state(null);
  /** @type {string | null} */
  let pullError = $state(null);
  let isPulling = $state(false);

  // ── Model list (auto-refresh every 5 s) ──────────────────────────────────
  async function fetchModels() {
    try {
      const data = await getModels();
      localModels = /** @type {ModelEntry[]} */ (data || []);
    } catch {
      // silently ignore transient errors
    } finally {
      loadingModels = false;
    }
  }

  $effect(() => {
    fetchModels();
    const id = setInterval(fetchModels, 5000);
    return () => clearInterval(id);
  });

  // ── URL normalisation ─────────────────────────────────────────────────────
  /** @param {string} raw @returns {string} */
  function normalizeUrl(raw) {
    const s = raw.trim();
    if (s.includes('huggingface.co')) {
      return s.replace('/blob/', '/resolve/').replace('/tree/', '/resolve/');
    }
    return s;
  }

  /** @param {number} n @returns {string} */
  function fmtBytes(n) {
    if (!n) return '';
    if (n < 1024) return `${n} B`;
    if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 ** 3) return `${(n / 1024 ** 2).toFixed(1)} MB`;
    return `${(n / 1024 ** 3).toFixed(2)} GB`;
  }

  // ── Pull a model ──────────────────────────────────────────────────────────
  function doPull() {
    if (!pullUrl || isPulling) return;
    const url = normalizeUrl(pullUrl);
    pullError = null;
    pullProgress = { status: 'connecting', completed: 0, total: 0 };
    isPulling = true;

    pullModel(url, {
      onProgress: (/** @type {PullProgress} */ data) => {
        pullProgress = data;
        if (data?.status === 'success') {
          isPulling = false;
          setTimeout(() => {
            pullProgress = null;
            fetchModels();
          }, 1500);
        } else if (data?.status === 'error') {
          pullError = data.error ?? 'Download failed';
          isPulling = false;
          pullProgress = null;
        }
      },
      onError: (/** @type {string} */ err) => {
        pullError = err;
        isPulling = false;
        pullProgress = null;
      },
    });
  }

  // ── Load / switch engine ──────────────────────────────────────────────────
  /** @param {string} modelId */
  async function doLoad(modelId) {
    if (loadingModelId) return;
    loadingModelId = modelId;
    loadError = null;
    try {
      await loadModel(modelId);
      await fetchModels();
    } catch (err) {
      loadError = /** @type {Error} */ (err)?.message ?? String(err);
    } finally {
      loadingModelId = null;
    }
  }
</script>

<div class="models-view animate-fade">
  <header class="page-header">
    <div class="header-content">
      <h1 class="brand-font">Models</h1>
      <p>Pull GGUF models and manage the local inference engine.</p>
    </div>
    <div class="stat-pill">
      <Database size={14} />
      <span>{localModels.length} installed</span>
    </div>
  </header>

  <!-- ── Pull ──────────────────────────────────────────────────────────── -->
  <section class="section">
    <div class="section-title">
      <Download size={18} />
      <h2>Pull Model</h2>
    </div>

    <div class="surface-card pull-card">
      <p class="hint-text">
        Paste a HuggingFace URL (<code>/blob/</code> or <code>/resolve/</code>) or an Ollama tag.
      </p>

      <div class="input-row">
        <div class="input-wrap">
          <Search size={16} class="input-icon" />
          <input
            type="text"
            placeholder="https://huggingface.co/…/model.gguf"
            bind:value={pullUrl}
            disabled={isPulling}
            onkeydown={(e) => e.key === 'Enter' && doPull()}
          />
        </div>
        <button class="btn-primary" onclick={doPull} disabled={isPulling || !pullUrl}>
          {#if isPulling}
            <RefreshCw size={16} class="spin" />
            <span>Pulling…</span>
          {:else}
            <Download size={16} />
            <span>Pull</span>
          {/if}
        </button>
      </div>

      {#if pullProgress}
        {@const pct = pullProgress.total > 0
          ? Math.round((pullProgress.completed / pullProgress.total) * 100)
          : 0}
        {@const done = pullProgress.status === 'success'}
        <div class="progress-zone" class:done>
          <div class="progress-meta">
            <span class="prog-status">
              {#if done}
                ✓ Download complete
              {:else if pullProgress.status === 'connecting'}
                Connecting…
              {:else}
                {fmtBytes(pullProgress.completed)}{pullProgress.total > 0
                  ? ' / ' + fmtBytes(pullProgress.total)
                  : ''}
              {/if}
            </span>
            {#if pullProgress.total > 0}
              <span class="prog-pct">{pct}%</span>
            {/if}
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:{done ? 100 : pct}%"></div>
          </div>
        </div>
      {/if}

      {#if pullError}
        <div class="error-banner">
          <AlertCircle size={16} />
          <span>{pullError}</span>
        </div>
      {/if}
    </div>
  </section>

  <!-- ── Local models ───────────────────────────────────────────────────── -->
  <section class="section">
    <div class="section-title">
      <Cpu size={18} />
      <h2>Local Models</h2>
    </div>

    {#if loadingModels}
      <div class="empty-state">
        <RefreshCw size={24} class="spin" />
        <p>Scanning storage…</p>
      </div>
    {:else if localModels.length === 0}
      <div class="empty-state">
        <Box size={32} />
        <h3>No models found</h3>
        <p>Pull a model above to get started.</p>
      </div>
    {:else}
      <div class="models-grid">
        {#each localModels as model (model.id)}
          {@const isActive = model.status.value === 'loaded'}
          {@const isBooting = loadingModelId === model.id}
          <div class="model-card surface-card">
            <div class="card-top">
              <span
                class="status-tag"
                class:active={isActive}
                class:booting={isBooting}
              >
                {#if isBooting}Starting…
                {:else if isActive}Active
                {:else}Standby
                {/if}
              </span>
              <span class="model-size">{fmtBytes(model.size)}</span>
            </div>

            <div class="model-name">{model.id.split('/').pop()}</div>
            <div class="model-source">
              {model.id.includes('/') ? model.id.split('/').slice(0, -1).join('/') : 'Local'}
            </div>

            <div class="card-footer">
              {#if isActive}
                <div class="engine-ready">
                  <CheckCircle2 size={14} />
                  <span>Ready for inference</span>
                </div>
              {:else}
                <button
                  class="btn-load"
                  onclick={() => doLoad(model.id)}
                  disabled={!!loadingModelId}
                  title={loadingModelId && !isBooting ? 'Another model is loading…' : undefined}
                >
                  {#if isBooting}
                    <RefreshCw size={14} class="spin" />
                    <span>Starting engine…</span>
                  {:else}
                    <Zap size={14} />
                    <span>Load Engine</span>
                  {/if}
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      {#if loadError}
        <div class="error-banner" style="margin-top:1rem">
          <AlertCircle size={16} />
          <span>Engine failed to start: {loadError}</span>
        </div>
      {/if}
    {/if}
  </section>

  <!-- small bottom hint -->
  <div class="footer-hint">
    <Info size={12} />
    <span>Models are stored in <code>~/.cheesecrab/models/</code></span>
  </div>
</div>

<style>
  .models-view {
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

  /* ── Section ── */
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
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ── Pull card ── */
  .pull-card {
    padding: 1.75rem;
  }

  .hint-text {
    font-size: 0.9rem;
    color: var(--text-secondary);
    margin-bottom: 1.25rem;
    line-height: 1.5;
  }

  .hint-text code {
    font-family: monospace;
    font-size: 0.85em;
    background: var(--bg-main);
    padding: 0.1em 0.35em;
    border-radius: 3px;
    border: 1px solid var(--border-subtle);
  }

  .input-row {
    display: flex;
    gap: 0.75rem;
  }

  .input-wrap {
    position: relative;
    flex: 1;
  }

  .input-wrap :global(.input-icon) {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    pointer-events: none;
  }

  input {
    width: 100%;
    background: var(--bg-main);
    border: 1px solid var(--border-bold);
    color: var(--text-primary);
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    border-radius: var(--radius-md);
    font-size: 0.95rem;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  }

  input:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  input:disabled { opacity: 0.55; }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    background: var(--accent-primary);
    color: #fff;
    font-weight: 600;
    padding: 0 1.5rem;
    border-radius: var(--radius-md);
    white-space: nowrap;
    transition: background var(--transition-fast), transform var(--transition-fast);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-1px);
  }

  .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

  /* ── Progress ── */
  .progress-zone {
    margin-top: 1.25rem;
    padding: 1rem 1.25rem;
    background: var(--bg-main);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
  }

  .progress-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.625rem;
    font-size: 0.85rem;
  }

  .prog-status { font-weight: 600; color: var(--text-primary); }
  .prog-pct    { color: var(--accent-primary); font-weight: 700; }

  .progress-bar {
    height: 5px;
    background: var(--border-subtle);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    transition: width 0.35s ease;
  }

  .progress-zone.done .progress-fill { background: linear-gradient(90deg, #22c55e, #16a34a); }
  .progress-zone.done .prog-status   { color: #22c55e; }

  /* ── Error banner ── */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border-radius: var(--radius-md);
    font-size: 0.85rem;
  }

  /* ── Empty / loading states ── */
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

  .empty-state h3 {
    color: var(--text-secondary);
    margin: 0;
    font-size: 1.05rem;
  }

  .empty-state p { font-size: 0.9rem; margin: 0; }

  /* ── Models grid ── */
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
    font-size: 0.62rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background: var(--bg-main);
    color: var(--text-tertiary);
    border: 1px solid var(--border-subtle);
  }

  .status-tag.active  { background: rgba(16,185,129,.1); color: #10b981; border-color: rgba(16,185,129,.2); }
  .status-tag.booting { background: rgba(251,146,60,.1);  color: #fb923c; border-color: rgba(251,146,60,.2); }

  .model-size {
    font-size: 0.75rem;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .model-name {
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    word-break: break-all;
    margin-bottom: 0.2rem;
  }

  .model-source {
    font-size: 0.78rem;
    color: var(--text-tertiary);
    margin-bottom: 1.25rem;
  }

  .card-footer { margin-top: auto; }

  .btn-load {
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
    transition: background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast);
  }

  .btn-load:hover:not(:disabled) {
    background: var(--bg-surface-hover);
    border-color: var(--accent-primary);
    color: var(--accent-primary);
  }

  .btn-load:disabled { opacity: 0.55; cursor: not-allowed; }

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

  /* ── Footer hint ── */
  .footer-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-tertiary);
    padding: 0 0.5rem;
  }

  .footer-hint code {
    font-family: monospace;
    font-size: 0.85em;
  }

  /* ── Spinner ── */
  :global(.spin) { animation: spin 1s linear infinite; }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
</style>
