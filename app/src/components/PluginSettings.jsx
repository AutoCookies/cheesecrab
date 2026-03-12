import React, { useState, useEffect } from 'react';
import { ToggleRight, ToggleLeft, Box, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import { fetchAvailablePlugins, uninstallPlugin } from '../utils/api';

export default function PluginSettings({ enabledPlugins, onToggle }) {
    const [availablePlugins, setAvailablePlugins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlugins();
    }, []);

    const fetchPlugins = async () => {
        try {
            const plugins = await fetchAvailablePlugins();
            setAvailablePlugins(plugins);
        } catch (err) {
            console.error("Failed to fetch available plugins:", err);
            setError("Could not discover local plugins. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleUninstall = async (id, name) => {
        if (!window.confirm(`Are you sure you want to permanently uninstall ${name}? This will delete all plugin files.`)) {
            return;
        }

        try {
            await uninstallPlugin(id);
            await fetchPlugins();
            alert(`${name} uninstalled successfully.`);
        } catch (err) {
            console.error("Failed to uninstall plugin:", err);
            alert("Failed to uninstall plugin. See console for details.");
        }
    };

    if (loading) return <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto mb-4" size={48} /> Scanning Local Plugins...</div>;

    if (error) return (
        <div className="p-20 text-center text-red-400">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-bold">{error}</p>
        </div>
    );

    return (
        <div className="p-8 max-w-4xl mx-auto h-full overflow-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-black tracking-tighter text-[var(--text-primary)] mb-2 flex items-center gap-3">
                    <Box size={32} className="text-[var(--accent)]" />
                    Microkernel Plugin Manager
                </h1>
                <p className="text-[var(--text-secondary)] text-lg">
                    Enable or disable modules. Disabled plugins consume <strong>zero overhead</strong> and no memory.
                </p>
            </header>

            {availablePlugins.length === 0 ? (
                <div className="bg-black/20 border border-dashed border-[var(--border-color)] p-12 rounded-2xl text-center">
                    <p className="text-[var(--text-secondary)] mb-4 italic">No plugins found in the `plugins/` directory.</p>
                    <button
                        onClick={() => window.location.hash = '#store'}
                        className="bg-[var(--accent)] text-white px-6 py-2 rounded-lg font-bold"
                    >
                        Visit the Plugin Store
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availablePlugins.map(plugin => {
                        const isEnabled = enabledPlugins.includes(plugin.id);
                        return (
                            <div
                                key={plugin.id}
                                className={`p-6 rounded-2xl border transition-all duration-300 ${isEnabled
                                    ? 'bg-[var(--bg-tertiary)] border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10'
                                    : 'bg-[var(--bg-secondary)] border-[var(--border-color)] opacity-70 grayscale'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="text-3xl">
                                        {plugin.id === 'crabnote' ? '📝' : plugin.id === 'crabcalendar' ? '📅' : '🦀'}
                                    </div>
                                    <button
                                        onClick={() => onToggle(plugin.id)}
                                        className={`transition-colors ${isEnabled ? 'text-[var(--accent)]' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {isEnabled ? <ToggleRight size={48} /> : <ToggleLeft size={48} />}
                                    </button>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{plugin.name}</h3>
                                <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-2">
                                    {plugin.description || "A Cheesecrab Microkernel module."}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                                            {isEnabled ? 'Resident in Memory' : 'Dormant'}
                                        </span>
                                    </div>

                                    {!isEnabled && (
                                        <button
                                            onClick={() => handleUninstall(plugin.id, plugin.name)}
                                            className="text-red-500/50 hover:text-red-500 transition-colors p-1"
                                            title="Uninstall Plugin"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
