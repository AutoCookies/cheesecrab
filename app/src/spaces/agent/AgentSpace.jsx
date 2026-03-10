import React, { useState, useRef, useEffect } from 'react';
import { Send, StopCircle, Crab, Wrench, Eye, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { startServer, loadModelContext, checkLoadedModels } from '../utils/api';

const API_BASE = 'http://localhost:11435';

// ─── Event Card Components ──────────────────────────────────────────────────

function ThoughtCard({ payload, step }) {
    return (
        <div className="flex gap-3 items-start py-3 border-b border-[var(--border)]">
            <div className="mt-1 text-purple-400 shrink-0">🧠</div>
            <div>
                <div className="text-xs font-semibold text-purple-400 mb-1">Step {step + 1} · Reasoning</div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">{payload.reasoning}</p>
                {payload.plan && (
                    <p className="text-xs text-[var(--text-secondary)] mt-1 italic">Plan: {payload.plan}</p>
                )}
            </div>
        </div>
    );
}

function ToolCard({ payload, step }) {
    return (
        <div className="flex gap-3 items-start py-3 border-b border-[var(--border)]">
            <Wrench size={16} className="mt-1 text-amber-400 shrink-0" />
            <div>
                <div className="text-xs font-semibold text-amber-400 mb-1">
                    Step {step + 1} · Tool Call — <code className="bg-[var(--bg-secondary)] px-1 rounded">{payload.tool}</code>
                </div>
                <pre className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] p-2 rounded mt-1 overflow-x-auto">
                    {JSON.stringify(payload.args, null, 2)}
                </pre>
            </div>
        </div>
    );
}

function ObservationCard({ payload, step }) {
    return (
        <div className="flex gap-3 items-start py-3 border-b border-[var(--border)]">
            <Eye size={16} className="mt-1 text-cyan-400 shrink-0" />
            <div>
                <div className="text-xs font-semibold text-cyan-400 mb-1">Step {step + 1} · Observation</div>
                <pre className="text-xs text-[var(--text-primary)] whitespace-pre-wrap">{payload}</pre>
            </div>
        </div>
    );
}

function FinalCard({ payload }) {
    return (
        <div className="p-4 rounded-lg bg-green-900/20 border border-green-500/30 my-3">
            <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm font-semibold text-green-400">Path Completed 🦀</span>
            </div>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">{payload}</p>
        </div>
    );
}

function ApprovalCard({ payload, onDecision }) {
    return (
        <div className="p-4 rounded-lg bg-red-900/20 border border-red-500/40 my-3">
            <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-red-400" />
                <span className="text-sm font-semibold text-red-400">Approval Required — Dangerous Tool</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">Tool: <code>{payload.tool}</code></p>
            <pre className="text-xs text-[var(--text-primary)] bg-[var(--bg-secondary)] p-2 rounded mb-3 overflow-x-auto">
                {JSON.stringify(payload.args, null, 2)}
            </pre>
            <div className="flex gap-2">
                <button
                    onClick={() => onDecision(true)}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-red-600 text-white hover:bg-red-500 transition-colors"
                >
                    ✓ Approve
                </button>
                <button
                    onClick={() => onDecision(false)}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
                >
                    ✕ Reject
                </button>
            </div>
        </div>
    );
}

function ErrorCard({ payload }) {
    return (
        <div className="flex gap-3 items-start py-3 border-b border-red-800/40">
            <AlertCircle size={16} className="mt-1 text-red-400 shrink-0" />
            <div>
                <div className="text-xs font-semibold text-red-400 mb-1">Error</div>
                <p className="text-xs text-red-300">{payload}</p>
            </div>
        </div>
    );
}

// ─── Main Agent Space ────────────────────────────────────────────────────────

const NO_MODEL_MSG = 'no model loaded';

export default function AgentSpace() {
    const [goal, setGoal] = useState('');
    const [events, setEvents] = useState([]);
    const [running, setRunning] = useState(false);
    const [status, setStatus] = useState(null); // 'completed' | 'failed' | 'aborted'
    const [showNoModelBanner, setShowNoModelBanner] = useState(false);
    const streamRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [events]);

    const startAgent = async () => {
        if (!goal.trim() || running) return;

        setEvents([]);
        setStatus(null);
        setShowNoModelBanner(false);
        setRunning(true);

        try {
            const defaultModel = localStorage.getItem('defaultModel') || '';
            let modelToUse = defaultModel;
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
            const body = modelToUse ? { goal, model: modelToUse } : { goal };
            const resp = await fetch(`${API_BASE}/v1/spaces/agent/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            streamRef.current = reader;

            const pump = async () => {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    const text = decoder.decode(value);
                    const lines = text.split('\n');
                    for (const line of lines) {
                        if (!line.startsWith('data: ')) continue;
                        try {
                            const ev = JSON.parse(line.slice(6));
                            if (ev.type === 'path_complete') {
                                setStatus(ev.status);
                            } else {
                                if (ev.type === 'error' && typeof ev.payload === 'string' && ev.payload.toLowerCase().includes(NO_MODEL_MSG)) {
                                    setShowNoModelBanner(true);
                                }
                                setEvents(prev => [...prev, ev]);
                            }
                        } catch { /* skip malformed */ }
                    }
                }
                setRunning(false);
            };
            pump();
        } catch (err) {
            const msg = err.message || String(err);
            if (msg.toLowerCase().includes(NO_MODEL_MSG)) setShowNoModelBanner(true);
            setEvents(prev => [...prev, { type: 'error', step: 0, payload: msg }]);
            setRunning(false);
        }
    };

    const stopAgent = () => {
        streamRef.current?.cancel();
        setRunning(false);
        setStatus('aborted');
    };

    const renderEvent = (ev, i) => {
        switch (ev.type) {
            case 'thought': return <ThoughtCard key={i} payload={ev.payload} step={ev.step} />;
            case 'tool_call': return <ToolCard key={i} payload={ev.payload} step={ev.step} />;
            case 'observation': return <ObservationCard key={i} payload={ev.payload} step={ev.step} />;
            case 'final_answer': return <FinalCard key={i} payload={ev.payload} />;
            case 'approval_required': return (
                <ApprovalCard key={i} payload={ev.payload} onDecision={(approved) => {
                    console.log('[Agent] User decision:', approved, ev.payload.tool);
                }} />
            );
            case 'error': return <ErrorCard key={i} payload={ev.payload} />;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border)] shrink-0">
                <span className="text-xl">🦀</span>
                <div>
                    <h2 className="text-sm font-bold">CrabAgent</h2>
                    <p className="text-xs text-[var(--text-secondary)]">Local autonomous agent — 100% offline</p>
                </div>
                {running && (
                    <div className="ml-auto flex items-center gap-2 text-xs text-amber-400">
                        <Loader2 size={14} className="animate-spin" />
                        Crawling the path...
                    </div>
                )}
                {status === 'completed' && !running && (
                    <span className="ml-auto text-xs text-green-400">✓ Path completed</span>
                )}
                {status === 'failed' && !running && (
                    <span className="ml-auto text-xs text-red-400">Path failed</span>
                )}
            </div>

            {showNoModelBanner && (
                <div className="mx-4 mt-2 p-3 rounded-lg bg-amber-900/30 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <div>
                        <strong>No model loaded.</strong> Open <strong>AI Models</strong> in the sidebar, pull a GGUF model via a direct URL, then start the server (or set a default model). Then try the agent again.
                    </div>
                </div>
            )}

            {/* ── Reasoning Stream ── */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-0">
                {events.length === 0 && !running && (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                        <span className="text-5xl">🦀</span>
                        <p className="text-[var(--text-secondary)] text-sm max-w-sm leading-relaxed">
                            Give CrabAgent a goal and watch it reason, plan, and execute using your local tools.
                            <br /><br />
                            <span className="italic opacity-60">Examples: "List all Python files in ~/projects", "Summarize the README in /tmp/repo", "Commit all my changes with a descriptive message"</span>
                        </p>
                    </div>
                )}
                {events.map(renderEvent)}
                <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div className="px-4 py-3 border-t border-[var(--border)] shrink-0">
                <div className="flex items-end gap-2 bg-[var(--bg-secondary)] rounded-xl p-3">
                    <textarea
                        value={goal}
                        onChange={e => setGoal(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); startAgent(); } }}
                        placeholder="Enter a goal for CrabAgent... (Enter to send)"
                        rows={2}
                        className="flex-1 bg-transparent resize-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none"
                    />
                    <div className="flex gap-2 shrink-0">
                        {running ? (
                            <button
                                onClick={stopAgent}
                                className="p-2 rounded-lg bg-red-900/40 text-red-400 hover:bg-red-900/60 transition-colors"
                                title="Stop agent"
                            >
                                <StopCircle size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={startAgent}
                                disabled={!goal.trim()}
                                className="p-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity disabled:opacity-40"
                                title="Run agent"
                            >
                                <Send size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
