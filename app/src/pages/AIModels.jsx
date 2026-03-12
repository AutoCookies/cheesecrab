import React, { useEffect, useState } from 'react';
import { fetchAIModels, pullAIModel, deleteAIModel, checkLoadedModels } from '../utils/api';
import { DownloadCloud, Trash2, Cpu, Play, Loader2 } from 'lucide-react';

export default function AIModels() {
    const [models, setModels] = useState([]);
    const [loadedModels, setLoadedModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pulling, setPulling] = useState(false);
    const [pullUrl, setPullUrl] = useState('');
    const [pullFilename, setPullFilename] = useState('');

    const loadData = async () => {
        setLoading(true);
        try {
            let dbModels = [];
            try { dbModels = await fetchAIModels() || []; } catch (e) { console.error(e); }

            let loaded = [];
            try { loaded = await checkLoadedModels() || []; } catch (e) { console.error(e); }

            // Merge unique models. Proxy models might lack size.
            const modelMap = new Map();
            if (Array.isArray(dbModels)) dbModels.forEach(m => modelMap.set(m.name, m));
            if (Array.isArray(loaded)) loaded.forEach(m => {
                if (!modelMap.has(m.id)) {
                    modelMap.set(m.id, { name: m.id, size: 0, fromProxy: true });
                }
            });

            setModels(Array.from(modelMap.values()));
            setLoadedModels(loaded);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handlePullUrlChange = (e) => {
        const url = e.target.value;
        setPullUrl(url);
        if (!pullFilename && url.includes('.gguf')) {
            const parts = url.split('/');
            setPullFilename(parts[parts.length - 1]);
        }
    };

    const handlePull = async (e) => {
        e.preventDefault();
        if (!pullUrl || !pullFilename) return;
        setPulling(true);
        try {
            await pullAIModel(pullUrl, pullFilename);
            setPullUrl('');
            setPullFilename('');
            // Toast notification would go here
        } catch (e) {
            alert("Error pulling model: " + e.message);
        } finally {
            setPulling(false);
        }
    };

    const handleDelete = async (filename) => {
        if (!window.confirm(`Are you sure you want to delete ${filename}?`)) return;
        try {
            await deleteAIModel(filename);
            loadData();
        } catch (e) {
            alert("Error deleting model: " + e.message);
        }
    };

    const isModelLoaded = (filename) => {
        return loadedModels.some(m => m?.id === filename && m?.status?.value !== 'unloaded');
    };

    return (
        <div className="flex flex-col h-full gap-6 max-w-6xl mx-auto pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">AI Models Space</h1>
                <p className="text-[var(--text-secondary)] mt-1">Manage your local GGUF models. Pull new models directly from HuggingFace, and track what's currently loaded into memory.</p>
            </div>

            {/* Pull Section */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DownloadCloud size={20} className="text-[var(--accent)]" /> Pull New Model
                </h2>
                <form onSubmit={handlePull} className="flex gap-3 items-end">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Direct GGUF URL</label>
                        <input
                            type="url"
                            required
                            placeholder="https://huggingface.co/owner/repo/resolve/main/model.gguf"
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)] transition-colors"
                            value={pullUrl}
                            onChange={handlePullUrlChange}
                            disabled={pulling}
                        />
                    </div>
                    <div className="w-1/4">
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Save As</label>
                        <input
                            type="text"
                            required
                            placeholder="model.gguf"
                            className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md px-3 py-2 outline-none focus:border-[var(--accent)] transition-colors"
                            value={pullFilename}
                            onChange={(e) => setPullFilename(e.target.value)}
                            disabled={pulling}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={pulling || !pullUrl}
                        className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-2 rounded-md font-medium transition-colors h-[42px] flex items-center gap-2 disabled:opacity-50"
                    >
                        {pulling ? <Loader2 size={16} className="animate-spin" /> : <DownloadCloud size={16} />}
                        {pulling ? "Starting Pull..." : "Pull"}
                    </button>
                </form>
            </div>

            {/* Models Grid */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Cpu size={20} className="text-[var(--text-secondary)]" /> Local Library
                </h2>

                {loading && models.length === 0 ? (
                    <div className="flex justify-center p-10">
                        <Loader2 size={32} className="animate-spin text-[var(--accent)]" />
                    </div>
                ) : models.length === 0 ? (
                    <div className="text-center p-10 border border-dashed border-[var(--border-color)] rounded-xl">
                        <p className="text-[var(--text-secondary)]">No local models found. Use the pull tool above to download one.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {models.map(model => {
                            const loaded = isModelLoaded(model.name);
                            return (
                                <div key={model.name} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 hover:border-[var(--accent)] transition-colors flex flex-col group shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg text-[var(--text-primary)] break-all pr-2 leading-tight">
                                            {model.name}
                                        </h3>
                                        {loaded && (
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap shadow-sm border border-green-200">
                                                Loaded
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-[var(--text-secondary)] mt-auto flex justify-between items-end pt-4">
                                        <span>
                                            Size: {model.size > 0
                                                ? `${(model.size / 1024 / 1024 / 1024).toFixed(2)} GB`
                                                : "Unknown"}
                                        </span>
                                        <div className="flex gap-2 items-center">
                                            {!model.fromProxy && (
                                                <button
                                                    className="p-1.5 text-[var(--text-secondary)] hover:text-red-500 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-md transition-colors"
                                                    title="Delete Model"
                                                    onClick={() => handleDelete(model.name)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                            {localStorage.getItem('defaultModel') === model.name ? (
                                                <span className="px-3 py-1.5 text-xs font-bold text-green-600 bg-green-100 border border-green-200 rounded-md flex items-center gap-1 cursor-default">
                                                    Default Set
                                                </span>
                                            ) : (
                                                <button
                                                    className="px-3 py-1.5 text-xs font-bold text-white bg-[var(--text-primary)] hover:bg-[var(--accent)] rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                                                    title="Set as Default Model for Future Chats"
                                                    onClick={() => {
                                                        localStorage.setItem('defaultModel', model.name);
                                                        // Force a re-render by calling loadData or just localized state
                                                        loadData();
                                                    }}
                                                >
                                                    Set Default
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

        </div>
    );
}
