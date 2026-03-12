import React, { useState } from 'react';
import { Database, TerminalSquare, Cpu, Code2, StickyNote, Calendar, Box, Settings, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const STATIC_SPACES = [
    { id: 'ai_models', label: 'AI Models', icon: Database },
    { id: 'instances', label: 'Instances', icon: Cpu },
    { id: 'logs', label: 'Logs', icon: TerminalSquare },
    { id: 'coding', label: 'Coding Space', icon: Code2 },
];

const getPluginLabel = (id) => {
    return id.split(/[_-]/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getPluginIcon = (id) => {
    if (id === 'crabnote') return StickyNote;
    if (id === 'crabcalendar') return Calendar;
    return Box;
};

export default function Sidebar({ activeSpace, setActiveSpace, enabledPlugins = [] }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const spaces = [
        ...STATIC_SPACES,
        ...(enabledPlugins.map(id => ({
            id,
            label: getPluginLabel(id),
            icon: getPluginIcon(id)
        })))
    ];

    return (
        <div
            className={twMerge(
                'h-full bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col transition-all duration-300 relative',
                isCollapsed ? 'w-14' : 'w-52'
            )}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full p-1 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors z-10"
            >
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>

            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1.5 px-2">
                {spaces.map((space) => {
                    const Icon = space.icon;
                    const isActive = activeSpace === space.id;
                    return (
                        <button
                            key={space.id}
                            onClick={() => setActiveSpace(space.id)}
                            className={clsx(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group cursor-pointer border',
                                isActive
                                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                                    : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                            )}
                            title={isCollapsed ? space.label : undefined}
                        >
                            <Icon size={18} className={clsx(isActive ? 'text-white' : 'group-hover:text-[var(--accent)]', 'shrink-0')} />
                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                                    {space.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-1 p-2 border-t border-[var(--border-color)]">
                <button
                    onClick={() => setActiveSpace('store')}
                    className={clsx(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group cursor-pointer border',
                        activeSpace === 'store'
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    )}
                >
                    <ShoppingBag size={18} className={activeSpace === 'store' ? 'text-white' : 'group-hover:text-[var(--accent)]'} />
                    {!isCollapsed && <span className="font-medium text-sm">Store</span>}
                </button>
                <button
                    onClick={() => setActiveSpace('settings')}
                    className={clsx(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group cursor-pointer border',
                        activeSpace === 'settings'
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    )}
                >
                    <Settings size={18} className={activeSpace === 'settings' ? 'text-white' : 'group-hover:text-[var(--accent)]'} />
                    {!isCollapsed && <span className="font-medium text-sm">Settings</span>}
                </button>
            </div>
        </div>
    );
}
