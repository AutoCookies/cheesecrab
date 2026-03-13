<script>
  import {
    BrainCircuit,
    Play,
    StopCircle,
    ChevronDown,
    ChevronRight,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Terminal,
    Eye,
    Lightbulb,
    Wrench,
    History,
    Trash2,
    Check,
    X,
    Loader,
    Copy,
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { agentRun, agentApprove, getAgentPaths, getModels } from '../api.js';

  // ── State ────────────────────────────────────────────────────────────────────
  let goal = $state('');
  let strategy = $state('react');
  let maxSteps = $state(20);
  let activeModel = $state({ id: 'Searching...', status: 'idle', rawId: '' });

  let running = $state(false);
  let sessionId = $state(null);
  let cancelFn = $state(null);

  // Timeline events rendered in the UI
  let timeline = $state([]);

  // Path history (past completed runs)
  let history = $state([]);
  let showHistory = $state(false);

  // Pending approval state
  let pendingApproval = $state(null); // { toolName, args, step }

  let goalInput = $state(null);

  // ── Model discovery ───────────────────────────────────────────────────────────
  async function fetchActiveModel() {
    try {
      const models = await getModels();
      const statusVal = (m) => m?.status?.value ?? m?.status;
      const active = Array.isArray(models) ? models.find(m => statusVal(m) === 'loaded') : null;
      if (active?.id) {
        activeModel = {
          id: String(active.id).split('/').pop().replace(/\.gguf$/i, ''),
          status: 'ready',
          rawId: active.id,
        };
      } else {
        activeModel = { id: 'No Model Loaded', status: 'idle', rawId: '' };
      }
    } catch {
      activeModel = { id: 'No Model Loaded', status: 'idle', rawId: '' };
    }
  }

  onMount(() => {
    fetchActiveModel();
    loadHistory();
    const t = setInterval(fetchActiveModel, 5000);
    return () => clearInterval(t);
  });

  async function loadHistory() {
    history = await getAgentPaths();
  }

  // ── Run agent ─────────────────────────────────────────────────────────────────
  function runAgent() {
    if (!goal.trim() || running) return;
    if (activeModel.status !== 'ready') {
      alert('Please load a model in the Plugin Store first.');
      return;
    }

    timeline = [];
    sessionId = null;
    pendingApproval = null;
    running = true;

    const { cancel } = agentRun(
      { goal: goal.trim(), model: activeModel.rawId, strategy, max_steps: maxSteps },
      {
        onEvent: handleEvent,
        onError: (err) => {
          running = false;
          timeline = [...timeline, { type: 'error', step: -1, payload: err, id: uid() }];
        },
        onDone: () => {
          running = false;
          loadHistory();
        },
      }
    );
    cancelFn = cancel;
  }

  function stopAgent() {
    if (cancelFn) cancelFn();
    running = false;
    cancelFn = null;
    timeline = [...timeline, { type: 'error', step: -1, payload: 'Run cancelled by user.', id: uid() }];
  }

  // ── Event dispatcher ─────────────────────────────────────────────────────────
  function handleEvent(ev) {
    if (ev.type === 'session_start') {
      sessionId = ev.session_id ?? ev.payload ?? null;
      return;
    }
    if (ev.type === 'stream_token') return; // ignore raw tokens — thoughts capture them

    // Merge consecutive stream_token into the last 'thinking' card
    if (ev.type === 'thinking') {
      // Remove any previous thinking card for this step
      timeline = [...timeline.filter(e => !(e.type === 'thinking' && e.step === ev.step)),
        { ...ev, id: uid() }];
      return;
    }

    if (ev.type === 'approval_required') {
      const tc = ev.payload ?? {};
      pendingApproval = { toolName: tc.tool ?? '?', args: tc.args ?? {}, step: ev.step };
    }

    // Remove thinking spinner once we have a real event for this step
    if (['thought', 'tool_call', 'observation', 'final_answer', 'approval_required'].includes(ev.type)) {
      timeline = timeline.filter(e => !(e.type === 'thinking' && e.step === ev.step));
    }

    timeline = [...timeline, { ...ev, id: uid() }];
  }

  // ── Approval handlers ─────────────────────────────────────────────────────────
  async function approve(approved) {
    if (!sessionId) return;
    try {
      await agentApprove(sessionId, approved);
    } catch (e) {
      console.warn('approve error:', e);
    }
    pendingApproval = null;
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────
  let _uidCounter = 0;
  function uid() { return ++_uidCounter; }

  function fmtArgs(args) {
    try { return JSON.stringify(args, null, 2); } catch { return String(args); }
  }

  function clearTimeline() {
    timeline = [];
    sessionId = null;
    pendingApproval = null;
  }

  let expandedSteps = $state(new Set());
  function toggleExpand(id) {
    const s = new Set(expandedSteps);
    s.has(id) ? s.delete(id) : s.add(id);
    expandedSteps = s;
  }

  let copiedId = $state(null);
  function copyText(text, id) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => copiedId = null, 2000);
  }
</script>

<div class="agent-space animate-fade">
  <!-- Header -->
  <header class="agent-header glass">
    <div class="header-left">
      <BrainCircuit size={20} color="var(--accent-primary)" />
      <span class="header-title brand-font">Agent Engine</span>
    </div>
    <div class="model-status">
      <div class="status-dot" class:active={activeModel.status === 'ready'}></div>
      <span class="model-name">{activeModel.id}</span>
    </div>
    <div class="header-actions">
      <button
        class="icon-btn"
        onclick={() => { showHistory = !showHistory; if (showHistory) loadHistory(); }}
        title="Run history"
        class:active={showHistory}
      >
        <History size={18} />
      </button>
      <button class="icon-btn" onclick={clearTimeline} title="Clear timeline" disabled={running}>
        <Trash2 size={18} />
      </button>
    </div>
  </header>

  <div class="workspace">
    <!-- Timeline -->
    <div class="timeline-column">
      {#if timeline.length === 0 && !running}
        <div class="empty-state">
          <BrainCircuit size={48} color="var(--text-tertiary)" />
          <p class="empty-title">Ready to run</p>
          <p class="empty-sub">Enter a goal below and press Run</p>
        </div>
      {/if}

      {#each timeline as ev (ev.id)}
        <!-- THINKING -->
        {#if ev.type === 'thinking'}
          <div class="timeline-card thinking-card">
            <div class="card-icon spin"><Loader size={16} /></div>
            <span class="card-label muted">Thinking — step {ev.step + 1}</span>
          </div>

        <!-- THOUGHT -->
        {:else if ev.type === 'thought'}
          {@const thought = ev.payload ?? {}}
          <div class="timeline-card thought-card">
            <div class="card-header" onclick={() => toggleExpand(ev.id)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && toggleExpand(ev.id)}>
              <div class="card-icon"><Lightbulb size={16} /></div>
              <span class="card-label">
                {thought.is_final ? 'Final reasoning' : `Thought — step ${ev.step + 1}`}
              </span>
              <span class="card-plan muted">{thought.plan ?? ''}</span>
              <div class="expand-icon">
                {#if expandedSteps.has(ev.id)}<ChevronDown size={14} />{:else}<ChevronRight size={14} />{/if}
              </div>
            </div>
            {#if expandedSteps.has(ev.id)}
              <div class="card-body">
                <p class="reasoning-text">{thought.reasoning ?? ''}</p>
              </div>
            {/if}
          </div>

        <!-- TOOL_CALL -->
        {:else if ev.type === 'tool_call'}
          {@const tc = ev.payload ?? {}}
          <div class="timeline-card tool-card">
            <div class="card-header" onclick={() => toggleExpand(ev.id)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && toggleExpand(ev.id)}>
              <div class="card-icon"><Wrench size={16} /></div>
              <span class="card-label"><code>{tc.tool ?? '?'}</code></span>
              {#if tc.dangerous}
                <span class="badge danger"><AlertTriangle size={11} /> dangerous</span>
              {/if}
              <div class="expand-icon">
                {#if expandedSteps.has(ev.id)}<ChevronDown size={14} />{:else}<ChevronRight size={14} />{/if}
              </div>
            </div>
            {#if expandedSteps.has(ev.id)}
              <div class="card-body">
                <pre class="code-block">{fmtArgs(tc.args ?? {})}</pre>
              </div>
            {/if}
          </div>

        <!-- APPROVAL_REQUIRED -->
        {:else if ev.type === 'approval_required'}
          {@const tc = ev.payload ?? {}}
          <div class="timeline-card approval-card">
            <div class="card-header">
              <div class="card-icon warning"><AlertTriangle size={16} /></div>
              <span class="card-label">Approval required — <code>{tc.tool ?? '?'}</code></span>
            </div>
            <div class="card-body">
              <p class="approval-msg">This tool is marked <strong>dangerous</strong> and requires your approval before running.</p>
              <pre class="code-block">{fmtArgs(tc.args ?? {})}</pre>
              {#if pendingApproval && pendingApproval.step === ev.step}
                <div class="approval-buttons">
                  <button class="approve-btn" onclick={() => approve(true)}>
                    <Check size={14} /> Approve
                  </button>
                  <button class="deny-btn" onclick={() => approve(false)}>
                    <X size={14} /> Deny
                  </button>
                </div>
              {:else}
                <div class="approval-resolved muted">
                  <CheckCircle size={14} /> Decision sent
                </div>
              {/if}
            </div>
          </div>

        <!-- OBSERVATION -->
        {:else if ev.type === 'observation'}
          <div class="timeline-card obs-card">
            <div class="card-header" onclick={() => toggleExpand(ev.id)} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && toggleExpand(ev.id)}>
              <div class="card-icon"><Eye size={16} /></div>
              <span class="card-label">Observation — step {ev.step + 1}</span>
              <div class="expand-icon">
                {#if expandedSteps.has(ev.id)}<ChevronDown size={14} />{:else}<ChevronRight size={14} />{/if}
              </div>
            </div>
            {#if expandedSteps.has(ev.id)}
              <div class="card-body">
                <pre class="code-block">{ev.payload ?? ''}</pre>
              </div>
            {/if}
          </div>

        <!-- FINAL_ANSWER -->
        {:else if ev.type === 'final_answer'}
          <div class="timeline-card answer-card">
            <div class="card-header">
              <div class="card-icon success"><CheckCircle size={16} /></div>
              <span class="card-label">Final Answer</span>
              <button class="icon-btn small" onclick={() => copyText(ev.payload ?? '', ev.id)} title="Copy">
                {#if copiedId === ev.id}<Check size={12} />{:else}<Copy size={12} />{/if}
              </button>
            </div>
            <div class="card-body">
              <p class="answer-text">{ev.payload ?? ''}</p>
            </div>
          </div>

        <!-- ERROR -->
        {:else if ev.type === 'error'}
          <div class="timeline-card error-card">
            <div class="card-header">
              <div class="card-icon error"><XCircle size={16} /></div>
              <span class="card-label">Error</span>
            </div>
            <div class="card-body">
              <p class="error-text">{ev.payload ?? ''}</p>
            </div>
          </div>
        {/if}
      {/each}
    </div>

    <!-- History sidebar -->
    {#if showHistory}
      <aside class="history-panel glass">
        <div class="history-header">
          <History size={14} />
          <span>Past Runs</span>
        </div>
        {#if history.length === 0}
          <p class="history-empty">No completed runs yet.</p>
        {:else}
          {#each [...history].reverse() as run}
            <div class="history-item" onclick={() => { goal = run.goal; showHistory = false; }}>
              <span class="history-status" class:done={run.status === 'completed'} class:fail={run.status !== 'completed'}>
                {run.status === 'completed' ? '✓' : '✗'}
              </span>
              <span class="history-goal">{run.goal}</span>
            </div>
          {/each}
        {/if}
      </aside>
    {/if}
  </div>

  <!-- Input area -->
  <div class="input-area">
    <!-- Options row -->
    <div class="options-row">
      <label class="option-label">
        Strategy
        <select class="option-select" bind:value={strategy} disabled={running}>
          <option value="react">ReAct</option>
          <option value="function_calling">Function Calling</option>
        </select>
      </label>
      <label class="option-label">
        Max steps
        <input class="option-input" type="number" min="1" max="50" bind:value={maxSteps} disabled={running} />
      </label>
    </div>

    <!-- Goal input + controls -->
    <div class="goal-container glass" class:disabled={activeModel.status !== 'ready'}>
      <textarea
        bind:this={goalInput}
        class="goal-input"
        placeholder={activeModel.status === 'ready'
          ? 'Describe your goal… e.g. "List all Go files and count lines"'
          : 'Load a model in Plugin Store to start'}
        bind:value={goal}
        disabled={activeModel.status !== 'ready' || running}
        onkeydown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), runAgent())}
      ></textarea>
      <div class="goal-footer">
        <div class="goal-hints">
          <Terminal size={12} />
          <span>Local · Private · {strategy === 'react' ? 'ReAct' : 'Function Calling'}</span>
        </div>
        {#if running}
          <button class="stop-btn" onclick={stopAgent}>
            <StopCircle size={18} />
          </button>
        {:else}
          <button
            class="run-btn"
            onclick={runAgent}
            disabled={!goal.trim() || activeModel.status !== 'ready'}
          >
            <Play size={18} />
          </button>
        {/if}
      </div>
    </div>
    <p class="disclaimer">Agent has access to your filesystem and shell. Review dangerous tool approvals carefully.</p>
  </div>
</div>

<style>
  .agent-space {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    gap: 0.75rem;
  }

  /* ── Header ── */
  .agent-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-lg);
    flex-shrink: 0;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-title {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-primary);
  }

  .model-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
    font-size: 0.82rem;
    color: var(--text-secondary);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--text-tertiary);
    transition: background 0.3s;
  }

  .status-dot.active {
    background: #10b981;
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
  }

  .model-name {
    font-size: 0.82rem;
    font-weight: 600;
  }

  .header-actions {
    display: flex;
    gap: 0.25rem;
  }

  /* ── Workspace ── */
  .workspace {
    flex-grow: 1;
    display: flex;
    gap: 1rem;
    overflow: hidden;
    min-height: 0;
  }

  /* ── Timeline ── */
  .timeline-column {
    flex-grow: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.25rem 0.25rem 1rem;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    height: 100%;
    color: var(--text-tertiary);
  }

  .empty-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .empty-sub {
    font-size: 0.85rem;
  }

  /* ── Timeline cards ── */
  .timeline-card {
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
    background: var(--bg-surface);
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .timeline-card:hover {
    border-color: var(--border-bold);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.875rem;
    cursor: pointer;
    user-select: none;
  }

  .card-header:focus-visible {
    outline: 2px solid var(--accent-primary);
    outline-offset: -2px;
  }

  .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: var(--radius-sm);
    color: var(--text-secondary);
    background: var(--bg-surface-hover);
    flex-shrink: 0;
  }

  .card-icon.success { color: #10b981; background: rgba(16,185,129,0.12); }
  .card-icon.error   { color: #f87171; background: rgba(248,113,113,0.12); }
  .card-icon.warning { color: #f59e0b; background: rgba(245,158,11,0.12); }
  .card-icon.spin    { animation: spin 1s linear infinite; }

  @keyframes spin { to { transform: rotate(360deg); } }

  .card-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-primary);
    flex-grow: 1;
  }

  .card-label code {
    font-family: var(--font-mono, monospace);
    background: var(--bg-surface-hover);
    padding: 0.1em 0.4em;
    border-radius: 3px;
    font-size: 0.82rem;
  }

  .card-plan {
    font-size: 0.78rem;
    flex-shrink: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 240px;
  }

  .expand-icon {
    color: var(--text-tertiary);
    flex-shrink: 0;
  }

  .card-body {
    padding: 0.75rem 0.875rem;
    border-top: 1px solid var(--border-subtle);
  }

  .reasoning-text {
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--text-secondary);
    white-space: pre-wrap;
  }

  .code-block {
    font-family: var(--font-mono, monospace);
    font-size: 0.8rem;
    background: var(--bg-main);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    padding: 0.6rem 0.75rem;
    overflow-x: auto;
    color: var(--text-secondary);
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 280px;
  }

  .answer-text {
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--text-primary);
    white-space: pre-wrap;
  }

  .error-text {
    font-size: 0.85rem;
    color: #f87171;
    white-space: pre-wrap;
  }

  /* ── Card variants ── */
  .thinking-card {
    background: transparent;
    border-color: var(--border-subtle);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0.875rem;
  }

  .thought-card { border-left: 2px solid var(--accent-primary); }
  .tool-card    { border-left: 2px solid #a78bfa; }
  .obs-card     { border-left: 2px solid #60a5fa; }
  .answer-card  { border-left: 3px solid #10b981; background: rgba(16,185,129,0.05); }
  .error-card   { border-left: 2px solid #f87171; background: rgba(248,113,113,0.05); }
  .approval-card { border-left: 3px solid #f59e0b; background: rgba(245,158,11,0.06); }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.15em 0.5em;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 600;
  }

  .badge.danger {
    background: rgba(248,113,113,0.15);
    color: #f87171;
    border: 1px solid rgba(248,113,113,0.3);
  }

  /* ── Approval ── */
  .approval-msg {
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-bottom: 0.75rem;
  }

  .approval-buttons {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .approve-btn, .deny-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
  }

  .approve-btn {
    background: rgba(16,185,129,0.15);
    color: #10b981;
    border: 1px solid rgba(16,185,129,0.3);
  }

  .approve-btn:hover { background: rgba(16,185,129,0.25); }

  .deny-btn {
    background: rgba(248,113,113,0.12);
    color: #f87171;
    border: 1px solid rgba(248,113,113,0.25);
  }

  .deny-btn:hover { background: rgba(248,113,113,0.22); }

  .approval-resolved {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.5rem;
    font-size: 0.82rem;
  }

  /* ── History panel ── */
  .history-panel {
    width: 240px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .history-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-tertiary);
    border-bottom: 1px solid var(--border-subtle);
  }

  .history-empty {
    padding: 1rem;
    font-size: 0.82rem;
    color: var(--text-tertiary);
    font-style: italic;
  }

  .history-item {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid var(--border-subtle);
    transition: background 0.15s;
  }

  .history-item:hover { background: var(--bg-surface-hover); }

  .history-status {
    font-size: 0.8rem;
    flex-shrink: 0;
    padding-top: 1px;
  }

  .history-status.done { color: #10b981; }
  .history-status.fail { color: #f87171; }

  .history-goal {
    font-size: 0.82rem;
    color: var(--text-secondary);
    line-height: 1.4;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /* ── Input area ── */
  .input-area {
    padding-top: 0.5rem;
    flex-shrink: 0;
    background: linear-gradient(to top, var(--bg-main) 80%, transparent);
  }

  .options-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 0.6rem;
  }

  .option-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
    color: var(--text-tertiary);
    font-weight: 500;
  }

  .option-select, .option-input {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-sm);
    color: var(--text-primary);
    font-size: 0.82rem;
    padding: 0.25rem 0.5rem;
    outline: none;
  }

  .option-input {
    width: 64px;
    text-align: center;
  }

  .option-select:focus, .option-input:focus {
    border-color: var(--accent-primary);
  }

  .option-select:disabled, .option-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .goal-container {
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-bold);
    padding: 0.75rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }

  .goal-container.disabled { opacity: 0.5; background: var(--bg-surface); }

  .goal-input {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--text-primary);
    resize: none;
    min-height: 28px;
    max-height: 160px;
    font-size: 1rem;
    outline: none;
    padding: 0.4rem 0.5rem;
    line-height: 1.5;
  }

  .goal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    margin-top: 0.4rem;
    border-top: 1px solid var(--border-subtle);
  }

  .goal-hints {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-tertiary);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .run-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--accent-primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px var(--accent-glow);
  }

  .run-btn:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-1px);
  }

  .run-btn:disabled {
    background: var(--bg-surface-hover);
    color: var(--text-tertiary);
    cursor: not-allowed;
    box-shadow: none;
  }

  .stop-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: rgba(248,113,113,0.15);
    color: #f87171;
    border: 1px solid rgba(248,113,113,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stop-btn:hover { background: rgba(248,113,113,0.25); }

  .disclaimer {
    text-align: center;
    font-size: 0.7rem;
    color: var(--text-tertiary);
    margin-top: 0.5rem;
    padding-bottom: 0.25rem;
  }

  /* ── Utility ── */
  .muted { color: var(--text-tertiary); }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    border-radius: var(--radius-sm);
    color: var(--text-tertiary);
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .icon-btn:hover { background: var(--bg-surface-hover); color: var(--text-primary); }
  .icon-btn.active { color: var(--accent-primary); }
  .icon-btn.small { width: 22px; height: 22px; padding: 0.2rem; }
  .icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }
</style>
