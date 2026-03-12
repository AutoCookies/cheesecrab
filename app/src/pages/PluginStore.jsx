import React, { useState, useEffect } from 'react';
import { ShoppingBag, Download, CheckCircle, Loader2, Globe, Server, AlertCircle } from 'lucide-react';
import { fetchAvailablePlugins, installPlugin } from '../utils/api';
import axios from 'axios'; // Still needed for the Registry fetch which is external

const REGISTRY_URL = 'https://raw.githubusercontent.com/AutoCookies/cheesecrab-registry/main/registry.json';

export default function PluginStore({ onInstallSuccess }) {
    const [plugins, setPlugins] = useState([]);
    const [availableIds, setAvailableIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [installing, setInstalling] = useState(null);
    const [error, setError] = useState(null);
    const [lastSync, setLastSync] = useState(null);

    useEffect(() => {
        initStore();
    }, []);

    const initStore = async () => {
        setLoading(true);
        setError(null);
        await Promise.all([fetchRegistry(), fetchAvailable()]);
        setLoading(false);
    };

    const fetchAvailable = async () => {
        try {
            const plugins = await fetchAvailablePlugins();
            setAvailableIds(plugins.map(p => p.id));
            setLastSync(new Date().toLocaleTimeString());
        } catch (err) {
            console.error("Store: Failed to fetch available plugins", err);
            setError(`Failed to sync with local agent: ${err.message}. Check if server is running on port 11435.`);
        }
    };

    const fetchRegistry = async () => {
        try {
            const resp = await axios.get(REGISTRY_URL).catch(() => ({
                data: {
                    plugins: [
                        { id: 'crabnote', name: 'Crab Note', repository: 'https://github.com/AutoCookies/crabnote.git', description: 'Blazing-fast, strictly local note-taking.' },
                        { id: 'crabcalendar', name: 'Crab Calendar', repository: 'https://github.com/AutoCookies/crabcalendar.git', description: 'Secure, offline-first scheduling.' },
                    ]
                }
            }));
            setPlugins(resp.data.plugins);
        } catch (err) {
            console.error("Store: Failed to fetch registry");
        }
    };

    const handleInstall = async (plugin) => {
        if (availableIds.includes(plugin.id)) {
            alert("Plugin is already installed!");
            return;
        }

        setInstalling(plugin.id);
        try {
            await installPlugin(plugin.id, plugin.repository);
            await fetchAvailable();
            if (onInstallSuccess) await onInstallSuccess();
            alert(`${plugin.name} installed successfully!`);
        } catch (err) {
            const msg = err.response?.data?.error || err.message;
            alert(`Installation failed: ${msg}`);
        } finally {
            setInstalling(null);
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" size={48} /> Syncing Store...</div>;

    if (error) return (
        <div className="p-20 text-center text-red-400">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold mb-2">Connection Error</p>
            <p className="max-w-md mx-auto opacity-80">{error}</p>
            <button
                onClick={() => initStore()}
                className="mt-6 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-bold transition-all"
            >
                Retry Connection
            </button>
        </div>
    );

    return (
        <div className="p-8 max-w-6xl mx-auto h-full overflow-auto">
            <header className="mb-12">
                <div className="flex items-center gap-4 mb-4">
                    <ShoppingBag size={40} className="text-[#ffd700]" />
                    <h1 className="text-5xl font-black tracking-tighter text-white">Plugin Store</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)] bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-color)] w-fit group relative">
                        <Globe size={16} />
                        <span className="text-xs font-mono">{REGISTRY_URL}</span>
                        <button
                            onClick={async () => {
                                try {
                                    const health = await axios.get('http://127.0.0.1:11435/v1/spaces/os/health');
                                    alert(`Connection Success! Agent is healthy: ${JSON.stringify(health.data)}`);
                                } catch (e) {
                                    alert(`Connection Failed: ${e.message}\nBaseURL: http://127.0.0.1:11435/v1`);
                                }
                            }}
                            className="absolute -right-12 top-0 p-3 bg-white/5 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Debug Connection"
                        >
                            <Server size={14} />
                        </button>
                    </div>
                    <div className="text-[var(--text-secondary)] text-sm flex items-center gap-4 px-1">
                        <div className="flex items-center gap-2">
                            <Server size={14} className="text-green-500" />
                            {availableIds.length} plugins currently found on disk
                        </div>
                        {lastSync && (
                            <div className="text-[10px] opacity-40 italic">
                                Last Sync: {lastSync}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plugins.map(plugin => {
                    const isInstalled = availableIds.includes(plugin.id);
                    return (
                        <div key={plugin.id} className={`bg-[var(--bg-secondary)] border p-6 rounded-2xl flex flex-col transition-all group shadow-xl ${isInstalled ? 'border-green-500/30' : 'border-[var(--border-color)] hover:border-[var(--accent)]'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-black/30 rounded-xl flex items-center justify-center text-2xl">
                                    {plugin.id === 'crabnote' ? '📝' : plugin.id === 'crabcalendar' ? '📅' : '🦀'}
                                </div>
                                {isInstalled && (
                                    <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-[10px] uppercase font-black flex items-center gap-1">
                                        <CheckCircle size={10} /> Local
                                    </div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{plugin.name}</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-6 flex-1 italic leading-relaxed">
                                {plugin.description}
                            </p>

                            <button
                                onClick={() => handleInstall(plugin)}
                                disabled={installing === plugin.id || isInstalled}
                                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isInstalled
                                    ? 'bg-green-600/20 text-green-400 border border-green-500/30 cursor-default'
                                    : installing === plugin.id
                                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                        : 'bg-[var(--accent)] text-white hover:scale-[1.03] active:scale-[0.98]'
                                    }`}
                            >
                                {installing === plugin.id ? (
                                    <><Loader2 className="animate-spin" size={18} /> Installing...</>
                                ) : isInstalled ? (
                                    <><CheckCircle size={18} /> Installed</>
                                ) : (
                                    <><Download size={18} /> Install Plugin</>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
