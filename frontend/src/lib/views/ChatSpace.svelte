<script>
  import { 
    Send, 
    Bot, 
    User, 
    Sparkles, 
    ChevronDown, 
    Trash2,
    Copy,
    Check
  } from 'lucide-svelte';
  import { onMount, onDestroy } from 'svelte';
  import { getModels, getSwarmAgents, chatCompletion } from '../api.js';

  let messages = $state([
    { role: 'assistant', content: 'Welcome to AI Space. I am the Cheesecrab Engine. How can I assist you today?' }
  ]);
  let input = $state('');
  let isThinking = $state(false);
  let isResponding = $state(false);
  let scrollContainer = $state(null);
  let copiedId = $state(null);
  let activeModel = $state({ id: 'Searching...', status: 'idle' });
  let swarmAgents = $state([]);

  async function fetchActiveModel() {
    try {
      const models = await getModels();
      if (!Array.isArray(models) || models.length === 0) {
        activeModel = { id: 'No Active Model', status: 'idle' };
        return;
      }
      const statusVal = (m) => m?.status?.value ?? m?.status;
      const active = models.find(m => statusVal(m) === 'loaded');
      if (active && active.id) {
        activeModel = {
          id: String(active.id).split('/').pop().replace(/\.gguf$/i, ''),
          status: 'ready',
          rawId: active.id
        };
      } else {
        activeModel = { id: 'No Active Model', status: 'idle' };
      }
    } catch {
      activeModel = { id: 'No Active Model', status: 'idle' };
    }
  }

  async function fetchSwarmAgents() {
    try {
      const agents = await getSwarmAgents();
      swarmAgents = Array.isArray(agents) ? agents : [];
    } catch {
      swarmAgents = [];
    }
  }

  onMount(() => {
    fetchActiveModel();
    fetchSwarmAgents();
    const interval = setInterval(() => {
      fetchActiveModel();
      fetchSwarmAgents();
    }, 3000);
    return () => clearInterval(interval);
  });

  function scrollToBottom() {
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  $effect(() => {
    messages.length;
    setTimeout(scrollToBottom, 50);
  });

  function sendMessage() {
    if (!input.trim() || isThinking || isResponding) return;
    if (activeModel.status !== 'ready') {
      alert('Please load a model in the Plugin Store first.');
      return;
    }

    const userMsg = input;
    messages = [...messages, { role: 'user', content: userMsg }];
    input = '';
    isThinking = true;

    chatCompletion(
      { model: activeModel.rawId, messages: messages.map(m => ({ role: m.role, content: m.content })) },
      {
        onToken: (chunk) => {
          isThinking = false;
          const delta = chunk.choices?.[0]?.delta?.content || '';
          if (delta) {
            const lastMsg = messages[messages.length - 1];
            if (lastMsg && lastMsg.role === 'assistant' && isResponding) {
              lastMsg.content += delta;
              messages = [...messages];
            } else {
              messages = [...messages, { role: 'assistant', content: delta }];
              isResponding = true;
            }
          }
        },
        onError: (err) => {
          isThinking = false;
          isResponding = false;
          messages = [...messages, { role: 'assistant', content: `Error: ${err}` }];
        },
        onDone: () => {
          isThinking = false;
          isResponding = false;
        }
      }
    );
  }

  function clearChat() {
    messages = [{ role: 'assistant', content: 'Chat cleared. How can I help you now?' }];
  }

  function copyToClipboard(text, id) {
    navigator.clipboard.writeText(text);
    copiedId = id;
    setTimeout(() => copiedId = null, 2000);
  }
</script>

<div class="chat-space animate-fade">
  <header class="chat-header glass">
    <div class="model-info">
      <div class="status-indicator" class:active={activeModel.status === 'ready'}></div>
      <span class="model-name">{activeModel.id}</span>
      <ChevronDown size={14} />
    </div>
    <div class="swarm-info" class:active={swarmAgents.length > 0}>
      <Sparkles size={14} />
      {#if swarmAgents.length > 0}
        <span>{swarmAgents.length} agents in swarm</span>
      {:else}
        <span>Single agent</span>
      {/if}
    </div>
    <div class="header-actions">
      <button class="icon-btn" onclick={clearChat} title="Clear Chat">
        <Trash2 size={18} />
      </button>
    </div>
  </header>

  <div class="messages-container" bind:this={scrollContainer}>
    {#each messages as msg, i}
      <div class="message-wrapper" class:user={msg.role === 'user'}>
        <div class="message {msg.role}">
          <div class="avatar">
            {#if msg.role === 'assistant'}
              <Bot size={18} />
            {:else}
              <User size={18} />
            {/if}
          </div>
          <div class="bubble-wrapper">
            <div class="bubble">
              {msg.content}
            </div>
            <div class="bubble-actions">
              <button class="action-btn" onclick={() => copyToClipboard(msg.content, i)}>
                {#if copiedId === i}
                  <Check size={12} color="var(--accent-primary)" />
                {:else}
                  <Copy size={12} />
                {/if}
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
    {#if isThinking}
      <div class="message-wrapper">
        <div class="message assistant thinking">
          <div class="avatar"><Bot size={18} /></div>
          <div class="bubble thinking-bubble">
            <div class="dot-loader"></div>
          </div>
        </div>
      </div>
    {/if}
  </div>

  <div class="input-area">
    <div class="input-container glass" class:disabled={activeModel.status !== 'ready'}>
      <textarea 
        placeholder={activeModel.status === 'ready' ? "Ask anything..." : "Load a model to start chat"} 
        bind:value={input}
        disabled={activeModel.status !== 'ready' || isThinking || isResponding}
        onkeydown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
      ></textarea>
      <div class="input-footer">
        <div class="input-hints">
          <Sparkles size={12} />
          <span>Local Engine Ready</span>
        </div>
        <button class="send-btn" onclick={sendMessage} disabled={!input || isThinking || isResponding || activeModel.status !== 'ready'}>
          <Send size={18} />
        </button>
      </div>
    </div>
    <p class="disclaimer">Private. Local. Edge-native.</p>
  </div>
</div>

<style>
  .chat-space {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
  }

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-lg);
    margin-bottom: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .model-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.4rem 0.75rem;
    border-radius: var(--radius-md);
    transition: background var(--transition-fast);
  }

  .swarm-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-tertiary);
    padding: 0.3rem 0.75rem;
    border-radius: var(--radius-md);
    background: transparent;
    transition: background var(--transition-fast), color var(--transition-fast);
  }

  .swarm-info.active {
    color: var(--accent-secondary);
    background: var(--bg-surface-hover);
  }

  .model-info:hover {
    background: var(--bg-surface-hover);
  }

  .status-indicator {
    width: 8px;
    height: 8px;
    background: var(--text-tertiary);
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .status-indicator.active {
    background: #10b981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
  }

  .model-name {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .icon-btn {
    color: var(--text-tertiary);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
  }

  .icon-btn:hover {
    color: var(--accent-secondary);
    background: var(--bg-surface-hover);
  }

  .messages-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .message-wrapper {
    display: flex;
    width: 100%;
  }

  .message-wrapper.user {
    justify-content: flex-end;
  }

  .message {
    display: flex;
    gap: 1rem;
    max-width: 85%;
  }

  .message.user {
    flex-direction: row-reverse;
  }

  .avatar {
    width: 32px;
    height: 32px;
    min-width: 32px;
    border-radius: var(--radius-sm);
    background: var(--bg-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-subtle);
    color: var(--text-secondary);
  }

  .user .avatar {
    background: var(--accent-primary);
    color: white;
    border: none;
  }

  .bubble-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    position: relative;
  }

  .bubble {
    padding: 0.875rem 1.125rem;
    border-radius: var(--radius-lg);
    background: var(--bg-surface);
    line-height: 1.6;
    font-size: 0.95rem;
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    white-space: pre-wrap;
  }

  .user .bubble {
    background: var(--bg-surface-hover);
    border-color: var(--accent-primary);
  }

  .thinking-bubble {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    min-width: 60px;
    min-height: 40px;
  }

  .dot-loader {
    width: 8px;
    height: 8px;
    background: var(--accent-primary);
    border-radius: 50%;
    position: relative;
    animation: loader 1s infinite alternate ease-in-out;
  }

  @keyframes loader {
    from { transform: scale(0.5); opacity: 0.3; }
    to { transform: scale(1.5); opacity: 1; box-shadow: 0 0 10px var(--accent-glow); }
  }

  .bubble-actions {
    display: flex;
    opacity: 0;
    transition: opacity var(--transition-fast);
    padding: 0 0.25rem;
  }

  .message-wrapper:hover .bubble-actions {
    opacity: 1;
  }

  .action-btn {
    color: var(--text-tertiary);
    padding: 0.25rem;
  }

  .action-btn:hover {
    color: var(--text-primary);
  }

  .input-area {
    padding-top: 1.5rem;
    position: sticky;
    bottom: 0;
    background: linear-gradient(to top, var(--bg-main) 80%, transparent);
    z-index: 5;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    border-radius: var(--radius-xl);
    border: 1px solid var(--border-bold);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .input-container.disabled {
    opacity: 0.5;
    background: var(--bg-surface);
  }

  textarea {
    width: 100%;
    background: transparent;
    border: none;
    color: var(--text-primary);
    resize: none;
    min-height: 24px;
    max-height: 200px;
    font-size: 1rem;
    outline: none;
    padding: 0.5rem;
    line-height: 1.5;
  }

  .input-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--border-subtle);
  }

  .input-hints {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-tertiary);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .send-btn {
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

  .send-btn:hover:not(:disabled) {
    background: var(--accent-secondary);
    transform: translateY(-2px);
  }

  .send-btn:disabled {
    background: var(--bg-surface-hover);
    color: var(--text-tertiary);
    cursor: not-allowed;
    box-shadow: none;
  }

  .disclaimer {
    text-align: center;
    font-size: 0.7rem;
    color: var(--text-tertiary);
    margin-top: 0.75rem;
    padding-bottom: 0.5rem;
  }
</style>
