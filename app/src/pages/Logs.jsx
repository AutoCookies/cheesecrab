import React, { useState, useEffect } from 'react';
import { TerminalSquare, Download, Trash2, StopCircle, PlayCircle } from 'lucide-react';
import { fetchLogs } from '../utils/api';

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [isTailing, setIsTailing] = useState(true);

    // Stub function as the Go backend doesn't currently stream logs natively over HTTP/WS.
    // In a real implementation we would open an SSE/WebSocket to /v1/spaces/os/logs.
    useEffect(() => {
        let interval;
        if (isTailing) {
            interval = setInterval(async () => {
                try {
                    const lgs = await fetchLogs();
                    if (lgs && lgs.length > 0) {
                        setLogs(lgs.map(lg => `[${new Date(lg.timestamp).toISOString().split('T')[1].slice(0, 12)}] ${lg.level}: ${lg.message} `));
                    }
                } catch (e) {
                    const now = new Date().toISOString().split('T')[1].slice(0, 12);
                    setLogs(prev => [...prev.slice(-99), `[${now}]ERROR: Lost connection to Agent API. - ${e.message} `]);
                }
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isTailing]);

    useEffect(() => {
        // Scroll to bottom
        const box = document.getElementById('log-box');
        if (box && isTailing) {
            box.scrollTop = box.scrollHeight;
        }
    }, [logs, isTailing]);

    return (
        <div className="flex flex-col h-full gap-4 max-w-6xl mx-auto pb-4">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">System Logs</h1>
                    <p className="text-[var(--text-secondary)] mt-1">Real-time output from the Go Agent Server and C++ inference engine. (Demo Polling)</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsTailing(!isTailing)}
                        className={`flex items - center gap - 2 px - 3 py - 1.5 rounded - md text - sm font - medium transition - colors ${isTailing ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                            } `}
                    >
                        {isTailing ? <StopCircle size={16} /> : <PlayCircle size={16} />}
                        {isTailing ? 'Pause' : 'Resume'}
                    </button>
                    <button
                        onClick={() => setLogs([])}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-red-500 rounded-md text-sm font-medium transition-colors border border-[var(--border-color)]"
                    >
                        <Trash2 size={16} /> Clear
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-md text-sm font-medium transition-colors border border-[var(--border-color)]">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div
                id="log-box"
                className="flex-1 bg-[#1e1e1e] rounded-xl p-4 overflow-y-auto font-mono text-xs shadow-inner border border-gray-800"
            >
                {logs.length === 0 ? (
                    <div className="text-gray-500 h-full flex items-center justify-center">
                        Waiting for logs...
                    </div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className={`py - 0.5 ${log.includes('ERROR') ? 'text-red-400' : log.includes('WARN') ? 'text-yellow-400' : 'text-gray-300'} `}>
                            <span className="opacity-50 mr-2">{i.toString().padStart(4, '0')}</span>
                            {log}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
