<script>
  import {
    MessageSquare,
    Settings,
    Puzzle,
    Sun,
    Moon,
    Cpu,
    BrainCircuit,
    Database,
    Table,
  } from 'lucide-svelte';

  let { 
    activeView = $bindable(), 
    installedPlugins = [], 
    theme = 'dark', 
    onToggleTheme 
  } = $props();

  const navItems = [
    { id: 'chat',      icon: MessageSquare, label: 'AI Space'      },
    { id: 'agent',     icon: BrainCircuit,  label: 'Agent Engine'  },
    { id: 'models',    icon: Database,      label: 'Models'        },
    { id: 'plugins',   icon: Puzzle,        label: 'Plugins'       },
    { id: 'crabtable', icon: Table,         label: 'Crab Table'    },
    { id: 'settings',  icon: Settings,      label: 'Settings'      },
  ];
</script>

<aside class="sidebar glass">
  <div class="logo">
    <div class="logo-box">
      <Cpu size={20} color="var(--accent-primary)" />
    </div>
    <span class="logo-text brand-font">Cheesecrab</span>
  </div>

  <nav class="nav-section">
    {#each navItems as item}
      <button 
        class="nav-item" 
        class:active={activeView === item.id}
        onclick={() => activeView = item.id}
      >
        <item.icon size={18} strokeWidth={activeView === item.id ? 2.5 : 2} />
        <span class="label">{item.label}</span>
      </button>
    {/each}
  </nav>

  <div class="separator"></div>

  <div class="nav-section plugins">
    <div class="section-header">
      <Puzzle size={14} />
      <span class="section-title">Plugins</span>
    </div>
    <div class="scroll-area">
      {#each installedPlugins as plugin}
        <button 
          class="nav-item plugin" 
          class:active={activeView === plugin.id}
          onclick={() => activeView = plugin.id}
        >
          <span class="plugin-icon">{plugin.icon || '🧩'}</span>
          <span class="label">{plugin.label}</span>
        </button>
      {/each}
      {#if installedPlugins.length === 0}
        <div class="empty-plugins">No plugins installed</div>
      {/if}
    </div>
  </div>

  <div class="bottom-actions">
    <button class="theme-toggle" onclick={onToggleTheme} title="Toggle Theme">
      {#if theme === 'dark'}
        <Sun size={18} />
        <span>Light Mode</span>
      {:else}
        <Moon size={18} />
        <span>Dark Mode</span>
      {/if}
    </button>
  </div>
</aside>

<style>
  .sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border-subtle);
    display: flex;
    flex-direction: column;
    padding: 1.5rem 0;
    transition: background var(--transition-base), border var(--transition-base);
    z-index: 100;
  }

  .logo {
    padding: 0 1.5rem 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-box {
    width: 32px;
    height: 32px;
    background: var(--accent-glow);
    border: 1px solid var(--accent-primary);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-text {
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--text-primary);
    letter-spacing: -0.02em;
  }

  .nav-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0 0.75rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-tertiary);
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.25rem;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-item:hover {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
  }

  .nav-item.active {
    background: var(--accent-glow);
    color: var(--accent-primary);
  }

  .separator {
    height: 1px;
    background: var(--border-subtle);
    margin: 1.5rem 1rem;
  }

  .scroll-area {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .plugin-icon {
    font-size: 1rem;
    width: 18px;
    text-align: center;
  }

  .empty-plugins {
    padding: 1rem 1.5rem;
    font-size: 0.8rem;
    color: var(--text-tertiary);
    font-style: italic;
  }

  .bottom-actions {
    padding: 1rem 0.75rem 0;
    margin-top: auto;
    border-top: 1px solid var(--border-subtle);
  }

  .theme-toggle {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem;
    border-radius: var(--radius-md);
    background: var(--bg-surface);
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 500;
    border: 1px solid var(--border-subtle);
  }

  .theme-toggle:hover {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
    border-color: var(--border-bold);
  }
</style>
