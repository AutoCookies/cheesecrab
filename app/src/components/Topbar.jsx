import React from 'react';
import { Minus, Square, X, Settings, Moon, Sun } from 'lucide-react';

export default function Topbar({ theme, toggleTheme }) {
    const handleMinimize = () => window.electronAPI?.windowMinimize();
    const handleMaximize = () => window.electronAPI?.windowMaximize();
    const handleClose = () => window.electronAPI?.windowClose();

    return (
        <div className="h-10 flex items-center justify-between drag-region bg-[var(--bg-secondary)] border-b border-[var(--border-color)] px-4">
            <div className="flex items-center space-x-2 text-[var(--accent)] font-bold text-base">
                <span>🦀 Cheesecrab Agent</span>
            </div>

            <div className="flex items-center space-x-1 no-drag">
                <button
                    onClick={toggleTheme}
                    className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mr-2"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                    className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mr-2"
                    title="Settings"
                >
                    <Settings size={18} />
                </button>

                <div className="h-5 w-px bg-[var(--border-color)] mx-1" />

                <button
                    onClick={handleMinimize}
                    className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <Minus size={18} />
                </button>
                <button
                    onClick={handleMaximize}
                    className="p-1.5 rounded-md hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <Square size requirements={16} />
                </button>
                <button
                    onClick={handleClose}
                    className="p-1.5 rounded-md hover:bg-red-500 hover:text-white text-[var(--text-secondary)] transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
