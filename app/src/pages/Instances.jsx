import React, { useEffect, useState } from 'react';
import { fetchOSHealth, startServer, stopServer, checkLoadedModels } from '../utils/api';
import { Cpu, MemoryStick, Activity, Play, Square, Loader2 } from 'lucide-react';

export default function Instances() {
    const [health, setHealth] = useState(null);
    const [loadedModels, setLoadedModels] = useState([]);
    const [serverStatus, setServerStatus] = useState('checking'); // 'running', 'stopped', 'checking'

    const loadData = async () => {
        try {
            const h = await fetchOSHealth();
            setHealth(h);

            const loaded = await checkLoadedModels();
            if (loaded && Array.isArray(loaded)) {
                const activeModels = loaded.filter(m => m?.status?.value !== 'unloaded');
                setLoadedModels(activeModels);
            } else {
                setLoadedModels([]);
            }
            setServerStatus('running');
        } catch (e) {
            if (e.response?.status === 500 || e.message === 'Network Error') {
                setServerStatus('stopped');
                setLoadedModels([]);
            }
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleStart = async () => {
        setServerStatus('checking');
        try {
            await startServer();
            await loadData();
        } catch (e) {
            alert("Failed to start server: " + e.message);
            setServerStatus('stopped');
        }
    };

    const handleStop = async () => {
        setServerStatus('checking');
        try {
            await stopServer();
            await loadData();
        } catch (e) {
            alert("Failed to stop server: " + e.message);
            setServerStatus('running');
        }
    };

    return (
        <div className="flex flex-col h-full gap-6 max-w-6xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">System Instances</h1>
                <p className="text-[var(--text-secondary)] mt-1">Manage the Cheesecrab core server and monitor hardware resource consumption.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Core Server Control */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Activity size={20} className="text-[var(--accent)]" />
                        Core Inference Engine
                    </h2>

                    <div className="flex-1 flex flex-col justify-center items-center py-6">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${serverStatus === 'running' ? 'bg-green-100 text-green-600' :
                            serverStatus === 'stopped' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 animate-pulse'
                            }`}>
                            <Activity size={48} />
                        </div>

                        <h3 className="text-2xl font-bold mb-1 capitalize text-[var(--text-primary)]">
                            {serverStatus === 'checking' ? 'Connecting...' : serverStatus}
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-6 text-center text-sm px-4">
                            {serverStatus === 'running'
                                ? "The cheese-server router is active and ready to swap models dynamically on port 8081."
                                : "The core engine is currently stopped. It will auto-start on the first API request, or you can start it manually."}
                        </p>

                        <div className="flex gap-4 w-full px-12">
                            <button
                                onClick={handleStart}
                                disabled={serverStatus === 'running' || serverStatus === 'checking'}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Play size={18} /> Start
                            </button>
                            <button
                                onClick={handleStop}
                                disabled={serverStatus === 'stopped' || serverStatus === 'checking'}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Square size={18} /> Stop
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hardware Status */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm flex flex-col">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Cpu size={20} className="text-[var(--text-secondary)]" />
                        Hardware Utilization
                    </h2>

                    {health ? (
                        <div className="flex flex-col gap-6 flex-1 justify-center">
                            {/* RAM Usage */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
                                        <MemoryStick size={18} className="text-[var(--text-secondary)]" /> RAM Usage
                                    </span>
                                    <span className="text-sm font-semibold text-[var(--text-secondary)]">
                                        {(health.total_ram_gb - health.free_ram_gb).toFixed(1)} / {health.total_ram_gb.toFixed(1)} GB
                                    </span>
                                </div>
                                <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${health.used_ram_percent > 85 ? 'bg-red-500' : health.used_ram_percent > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                        style={{ width: `${health.used_ram_percent}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* CPU Usage */}
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
                                        <Cpu size={18} className="text-[var(--text-secondary)]" /> CPU Usage
                                    </span>
                                    <span className="text-sm font-semibold text-[var(--text-secondary)]">
                                        {health.cpu_usage_percent.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${health.cpu_usage_percent > 85 ? 'bg-red-500' : health.cpu_usage_percent > 60 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                                        style={{ width: `${health.cpu_usage_percent}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Active Contexts / Models */}
                            <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                                <span className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Currently Loaded Models</span>
                                {loadedModels.length === 0 ? (
                                    <div className="text-[var(--text-secondary)] text-sm italic py-2">
                                        No models currently loaded.
                                    </div>
                                ) : (
                                    loadedModels.map(m => (
                                        <div
                                            key={m.id}
                                            className="bg-[var(--bg-primary)] border border-red-900/30 rounded-md p-3 flex items-center gap-3 shadow-inner"
                                        >
                                            <div className="text-red-500">
                                                <Activity size={16} className="animate-pulse" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-red-400">{m.id}</div>
                                                <div className="text-xs text-[var(--text-secondary)] mt-0.5 mt-capitalize flex gap-2">
                                                    <span>Status: <span className="text-green-400">{m.status?.value || 'unknown'}</span></span>
                                                    <span className="text-[var(--border-color)]">•</span>
                                                    {m.size ? (
                                                        <span>Size: {(m.size / 1024 / 1024 / 1024).toFixed(2)} GB</span>
                                                    ) : (
                                                        <span>Size: Unknown</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 size={32} className="animate-spin text-[var(--accent)]" />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
