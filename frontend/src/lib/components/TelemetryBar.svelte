<script>
  import { Activity, ShieldCheck, Cpu as CpuIcon, Database } from 'lucide-svelte';
  
  let cpu = $state(12);
  let ram = $state(4.2);
  let totalRam = 16;
  let status = $state('System Ready');

  // Mock telemetry updates
  $effect(() => {
    const interval = setInterval(() => {
      cpu = Math.floor(Math.random() * 25) + 5;
      ram = +(4.2 + (Math.random() * 0.3)).toFixed(1);
    }, 3000);
    return () => clearInterval(interval);
  });
</script>

<div class="telemetry-bar border-t glass">
  <div class="status-group">
    <div class="status-item">
      <div class="pulse-dot"></div>
      <ShieldCheck size={14} color="#10b981" />
      <span class="status-text">{status}</span>
    </div>
    <div class="separator-v"></div>
    <div class="status-item">
      <Activity size={14} />
      <span class="status-text">Network: Local Only</span>
    </div>
  </div>

  <div class="metrics-group">
    <div class="metric">
      <CpuIcon size={14} />
      <span class="metric-label">CPU</span>
      <div class="progress-container">
        <div class="progress-bg">
          <div class="progress-fill" style="width: {cpu}%"></div>
        </div>
      </div>
      <span class="metric-value">{cpu}%</span>
    </div>
    
    <div class="separator-v"></div>

    <div class="metric">
      <Database size={14} />
      <span class="metric-label">RAM</span>
      <div class="progress-container">
        <div class="progress-bg">
          <div class="progress-fill" style="width: {(ram / totalRam) * 100}%"></div>
        </div>
      </div>
      <span class="metric-value">{ram}G / {totalRam}G</span>
    </div>
  </div>
</div>

<style>
  .telemetry-bar {
    height: 36px;
    background: var(--bg-sidebar);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.25rem;
    font-size: 0.75rem;
    color: var(--text-tertiary);
    transition: all var(--transition-base);
  }

  .status-group, .metrics-group {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .status-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }

  .status-text {
    font-weight: 500;
    color: var(--text-secondary);
  }

  .separator-v {
    width: 1px;
    height: 14px;
    background: var(--border-subtle);
  }

  .metric {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .metric-label {
    font-weight: 700;
    color: var(--text-tertiary);
    width: 30px;
  }

  .progress-container {
    width: 80px;
  }

  .progress-bg {
    height: 4px;
    background: var(--bg-main);
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid var(--border-subtle);
  }

  .progress-fill {
    height: 100%;
    background: var(--accent-primary);
    transition: width 0.5s ease;
  }

  .metric-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.7rem;
    color: var(--text-secondary);
    min-width: 50px;
    text-align: right;
  }
</style>
