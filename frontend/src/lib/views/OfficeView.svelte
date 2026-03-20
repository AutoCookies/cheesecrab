<script>
  import { FileText, X, Loader2, AlertCircle } from 'lucide-svelte';
  import { selectAndOpenOfficeDocument, closeOfficeDocument } from '../api';

  let currentFile = $state("");
  let isLoading = $state(false);
  let error = $state("");

  async function handleOpen() {
    error = "";
    isLoading = true;
    try {
      const filename = await selectAndOpenOfficeDocument();
      if (filename) {
        currentFile = filename;
      }
    } catch (err) {
      error = err.message || "Failed to open document";
      console.error(err);
    } finally {
      isLoading = false;
    }
  }

  async function handleClose() {
    await closeOfficeDocument();
    currentFile = "";
  }
</script>

<div class="office-container">
  <div class="header">
    <div class="title-group">
      <FileText size={20} />
      <h2>Cheese Office</h2>
      {#if currentFile}
        <span class="file-badge">{currentFile}</span>
      {/if}
    </div>
    
    {#if currentFile}
      <button class="btn-icon" onclick={handleClose} title="Close Document">
        <X size={20} />
      </button>
    {/if}
  </div>
  
  <div class="content card shadow-lg">
    {#if isLoading}
      <div class="loading-state">
        <Loader2 class="spinner" size={48} />
        <p>Opening document...</p>
      </div>
    {:else if error}
      <div class="error-state">
        <AlertCircle size={48} color="var(--error)" />
        <h3>Error</h3>
        <p>{error}</p>
        <button class="btn-secondary" onclick={() => error = ""}>Clear Error</button>
      </div>
    {:else if currentFile}
      <div class="rendering-placeholder">
        <div class="doc-icon">
          <FileText size={80} color="var(--accent-primary)" />
        </div>
        <h3>{currentFile}</h3>
        <p>LOKit Tile Rendering Coming Soon...</p>
        <div class="hint">The backend handles are active, but tile visualization is being implemented.</div>
      </div>
    {:else}
      <div class="welcome-screen">
        <div class="hero-icon">
          <FileText size={64} color="var(--accent-primary)" />
        </div>
        <h3>Welcome to Cheese Office</h3>
        <p>The integrated LibreOffice experience within Cheesecrab.</p>
        
        <div class="actions">
          <button class="btn-primary" onclick={handleOpen}>Open Document</button>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .office-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1.5rem;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .header h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .file-badge {
    background: var(--bg-surface-elevated);
    color: var(--text-primary);
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    border: 1px solid var(--border-subtle);
    font-family: monospace;
  }

  .content {
    flex-grow: 1;
    background: var(--bg-surface);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-subtle);
    position: relative;
    overflow: hidden;
  }

  .welcome-screen, .loading-state, .error-state, .rendering-placeholder {
    text-align: center;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .hero-icon, .doc-icon {
    margin-bottom: 1rem;
  }

  .hero-icon {
    animation: pulse 2s infinite ease-in-out;
  }

  .rendering-placeholder .hint {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    margin-top: 1rem;
    font-style: italic;
  }

  .spinner {
    animation: spin 1s linear infinite;
    color: var(--accent-primary);
    margin-bottom: 1rem;
  }

  .error-state h3 {
    color: var(--error);
    margin: 0;
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
  }

  .btn-icon {
    background: none;
    border: none;
    color: var(--text-tertiary);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    transition: all 0.2s ease;
  }

  .btn-icon:hover {
    background: var(--bg-surface-elevated);
    color: var(--error);
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
