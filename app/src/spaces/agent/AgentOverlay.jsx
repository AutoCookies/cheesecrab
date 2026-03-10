import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle, X, Wrench, Eye, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { startServer, loadModelContext, checkLoadedModels } from '../../utils/api';

const API_BASE = 'http://localhost:11435';
const TOPBAR_H = 40; // px — must match Topbar height

function buildContext(activeSpace, spaceContext) {
    switch (activeSpace) {
        case 'coding': return spaceContext?.projectPath
            ? `You are in the Coding Space. Open project: ${spaceContext.projectPath}. Default all file ops to that path.`
            : `You are in the Coding Space. No project is open yet.`;
        case 'ai_models': return `You are in the AI Models Space. Help manage, select, and configure local GGUF models.`;
        case 'notion': return `You are in the Notion-like notes Space. Help the user read, write, and organise notes.`;
        case 'logs': return `You are in the Logs Space. Help the user interpret logs and diagnose issues.`;
        case 'instances': return `You are in the Instances Space. Help manage running model servers and processes.`;
        default: return `You are CrabAgent, a general-purpose local AI agent.`;
    }
}

// ─── Event cards ─────────────────────────────────────────────────────────────
const ThoughtCard = ({ payload, step }) => (
    <div className="py-2 border-b border-white/5">
        <div className="text-[10px] font-semibold text-purple-400 mb-0.5">Step {step + 1} · Thinking</div>
        <p className="text-xs text-[var(--text-primary)] leading-relaxed">{payload.reasoning}</p>
        {payload.plan && <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 italic">→ {payload.plan}</p>}
    </div>
);
const ToolCard = ({ payload, step }) => (
    <div className="py-2 border-b border-white/5 flex gap-2 items-start">
        <Wrench size={12} className="text-amber-400 mt-0.5 shrink-0" />
        <div className="min-w-0">
            <div className="text-[10px] font-semibold text-amber-400">{payload.tool} <span className="font-normal text-[var(--text-secondary)]">step {step + 1}</span></div>
            <pre className="text-[10px] text-[var(--text-secondary)] bg-black/20 px-1.5 py-1 rounded mt-0.5 overflow-x-auto max-h-20 whitespace-pre-wrap">{JSON.stringify(payload.args, null, 2)}</pre>
        </div>
    </div>
);
const ObservationCard = ({ payload, step }) => (
    <div className="py-2 border-b border-white/5 flex gap-2 items-start">
        <Eye size={12} className="text-cyan-400 mt-0.5 shrink-0" />
        <div className="min-w-0">
            <div className="text-[10px] font-semibold text-cyan-400">Observation · step {step + 1}</div>
            <pre className="text-[10px] text-[var(--text-primary)] whitespace-pre-wrap max-h-24 overflow-y-auto mt-0.5">{payload}</pre>
        </div>
    </div>
);
const FinalCard = ({ payload }) => (
    <div className="p-2 rounded-lg bg-green-900/20 border border-green-500/20 my-2">
        <div className="flex items-center gap-1.5 mb-1"><CheckCircle size={12} className="text-green-400" /><span className="text-[10px] font-semibold text-green-400">Done 🦀</span></div>
        <p className="text-xs text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">{payload}</p>
    </div>
);
const ApprovalCard = ({ payload, onDecision }) => (
    <div className="p-2 rounded-lg bg-red-900/20 border border-red-500/30 my-2">
        <div className="flex items-center gap-1.5 mb-1"><Shield size={12} className="text-red-400" /><span className="text-[10px] font-semibold text-red-400">Approval — {payload.tool}</span></div>
        <pre className="text-[10px] bg-black/20 p-1 rounded mb-2 overflow-x-auto">{JSON.stringify(payload.args, null, 2)}</pre>
        <div className="flex gap-1.5">
            <button onClick={() => onDecision(true)} className="px-2 py-0.5 text-[10px] font-semibold rounded bg-red-600 text-white hover:bg-red-500">✓ Approve</button>
            <button onClick={() => onDecision(false)} className="px-2 py-0.5 text-[10px] rounded bg-black/30 text-[var(--text-secondary)] hover:bg-black/50">✕ Reject</button>
        </div>
    </div>
);
const ErrorCard = ({ payload }) => (
    <div className="py-2 flex gap-2 items-start border-b border-red-900/30">
        <AlertCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
        <p className="text-[10px] text-red-300">{payload}</p>
    </div>
);

const ThinkingCard = ({ step }) => (
    <div className="py-2 border-b border-white/5 flex items-center gap-2">
        <div className="flex gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <span className="text-[10px] text-purple-400">Step {step + 1} · Generating…</span>
    </div>
);

// StreamBubble: grows in real time as tokens arrive
const StreamBubble = ({ text, step }) => (
    <div className="py-2 border-b border-white/5">
        <div className="text-[10px] font-semibold text-purple-400 mb-0.5">Step {step + 1} · Typing…</div>
        <p className="text-xs text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap font-mono">
            {text}<span className="animate-pulse">▍</span>
        </p>
    </div>
);

// ─── Main overlay ─────────────────────────────────────────────────────────────
export default function AgentOverlay({ activeSpace, spaceContext, open, onClose }) {
    const [goal, setGoal] = useState('');
    const [events, setEvents] = useState([]);
    const [streamingText, setStreamingText] = useState(''); // live token accumulator
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(null); // 'completed' | 'failed' | null
    const [showNoModelBanner, setShowNoModelBanner] = useState(false);
    const streamRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [events, open, streamingText]); // Added streamingText to dependencies

    const startAgent = async () => {
        if (!goal.trim() || running) return;
        setEvents([]);
        setStreamingText('');
        setStatus(null);
        setShowNoModelBanner(false);
        setRunning(true);
        const ctx = buildContext(activeSpace, spaceContext);
        const fullGoal = `[Context: ${ctx}]\n\nUser: ${goal}`;
        let modelToUse = localStorage.getItem('defaultModel') || '';
        if (!modelToUse) {
            try {
                const loaded = await checkLoadedModels();
                if (loaded?.length) modelToUse = loaded[0].id;
            } catch (_) { /* no models */ }
        }
        try {
            await startServer();
            if (modelToUse) await loadModelContext(modelToUse);
        } catch (warmErr) {
            console.warn('[Agent] Pre-load model:', warmErr?.message || warmErr);
        }
        try {
            const resp = await fetch(`${API_BASE}/v1/spaces/agent/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ goal: fullGoal, model: modelToUse }),
            });

            if (!resp.ok) {
                let errorText = `HTTP ${resp.status}`;
                try {
                    const errorJson = await resp.json();
                    errorText = errorJson.error || errorJson.message || JSON.stringify(errorJson);
                } catch (_) {
                    errorText = await resp.text();
                }
                setEvents([{ type: 'error', payload: `Agent failed to start: ${errorText}` }]);
                setStatus('failed');
                setRunning(false);
                return;
            }

            const reader = resp.body.getReader();
            streamRef.current = reader;
            const dec = new TextDecoder();
            const pump = async () => {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    for (const line of dec.decode(value).split('\n')) {
                        if (!line.startsWith('data: ')) continue;
                        try {
                            const ev = JSON.parse(line.slice(6));
                            if (ev.type === 'path_complete') {
                                setStatus(ev.status || null);
                            } else if (ev.type === 'stream_token') {
                                setStreamingText(prev => prev + ev.payload);
                            } else if (ev.type === 'thinking') {
                                setStreamingText('');
                                setEvents(prev => [...prev, ev]);
                            } else if (ev.type === 'thought') {
                                setStreamingText('');
                                setEvents(prev => [...prev, ev]);
                            } else {
                                if (ev.type === 'error' && typeof ev.payload === 'string' && ev.payload.toLowerCase().includes('no model loaded')) {
                                    setShowNoModelBanner(true);
                                }
                                if (ev.type !== 'path_complete') setEvents(prev => [...prev, ev]);
                            }
                        } catch { /* skip */ }
                    }
                }
                setStreamingText('');
                setRunning(false);
            };
            pump();
        } catch (err) {
            const msg = err.message || String(err);
            if (msg.toLowerCase().includes('no model loaded')) setShowNoModelBanner(true);
            setEvents(prev => [...prev, { type: 'error', step: 0, payload: msg }]);
            setStreamingText('');
            setRunning(false);
        }
    };

    const stop = () => { streamRef.current?.cancel(); setRunning(false); };

    const renderEvent = (ev, i) => {
        switch (ev.type) {
            case 'thinking': return <ThinkingCard key={i} step={ev.step} />;
            case 'thought': return <ThoughtCard key={i} payload={ev.payload} step={ev.step} />;
            case 'tool_call': return <ToolCard key={i} payload={ev.payload} step={ev.step} />;
            case 'observation': return <ObservationCard key={i} payload={ev.payload} step={ev.step} />;
            case 'final_answer': return <FinalCard key={i} payload={ev.payload} />;
            case 'approval_required': return <ApprovalCard key={i} payload={ev.payload} onDecision={(a) => console.log('decision', a)} />;
            case 'error': return <ErrorCard key={i} payload={ev.payload} />;
            case 'stream_token': return null; // handled by streamingText accumulator
            default: return null;
        }
    };

    if (!open) return null;

    const spaceBadge = { coding: '💻 Coding', ai_models: '🤖 AI Models', notion: '📝 Notion', logs: '📋 Logs', instances: '⚡ Instances' }[activeSpace] ?? '🌐 Global';

    return (
        // Right-side rail panel, starts below the 40px topbar.
        // Width matches AGENT_PANEL_WIDTH in App.jsx (360px).
        // The BrowserView in Coding Space is shrunk to leave exactly this space uncovered.
        <div
            className="fixed right-0 flex flex-col border-l border-[var(--border-color)] shadow-2xl"
            style={{ top: TOPBAR_H, bottom: 0, width: 360, background: 'var(--bg-secondary)', zIndex: 9999 }}
        >
            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--border-color)] shrink-0"
                style={{ background: 'var(--bg-tertiary)' }}>
                <span className="text-sm">🦀</span>
                <span className="text-xs font-bold flex-1">CrabAgent</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--accent)]/20 text-[var(--accent)] font-medium">{spaceBadge}</span>
                {running && <Loader2 size={12} className="animate-spin text-amber-400" />}
                {status === 'failed' && !running && <span className="text-[10px] text-red-400">Failed</span>}
                <button onClick={() => { stop(); onClose(); }} className="text-[var(--text-secondary)] hover:text-red-400 ml-1"><X size={14} /></button>
            </div>

            {showNoModelBanner && (
                <div className="mx-2 mt-1 p-2 rounded bg-amber-900/30 border border-amber-500/40 text-amber-200 text-[10px] flex gap-1.5">
                    <AlertCircle size={12} className="shrink-0 mt-0.5" />
                    <span>No model loaded. Open <strong>AI Models</strong>, pull a GGUF via URL, start the server or set a default model, then try again.</span>
                </div>
            )}

            {/* Stream */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
                {events.length === 0 && !running && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center py-8">
                        <span className="text-4xl">🦀</span>
                        <p className="text-[var(--text-secondary)] text-xs leading-relaxed max-w-[240px]">
                            I have context about your current <strong>{spaceBadge}</strong>.<br /><br />
                            <span className="opacity-60 italic">Ask me to help with what you're working on.</span>
                        </p>
                    </div>
                )}
                {events.map(renderEvent)}
                {/* Live streaming bubble — shown while model is generating tokens */}
                {streamingText && (
                    <StreamBubble text={streamingText} step={events.filter(e => e.type === 'thinking').length} />
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-2 border-t border-[var(--border-color)] shrink-0">
                <div className="flex items-end gap-1.5 bg-black/20 rounded-xl px-3 py-2">
                    <textarea
                        value={goal}
                        onChange={e => setGoal(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); startAgent(); } }}
                        placeholder={`Ask about ${spaceBadge}...`}
                        rows={2}
                        className="flex-1 bg-transparent resize-none text-xs text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
                    />
                    {running
                        ? <button onClick={stop} className="p-1.5 rounded-lg bg-red-900/40 text-red-400 hover:bg-red-900/60"><StopCircle size={15} /></button>
                        : <button onClick={startAgent} disabled={!goal.trim()} className="p-1.5 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 disabled:opacity-40"><Send size={15} /></button>
                    }
                </div>
            </div>
        </div>
    );
}
