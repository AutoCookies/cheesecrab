import React, { useState } from 'react';
import { Database, TerminalSquare, Cpu, Code2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const SPACES = [
    { id: 'ai_models', label: 'AI Models', icon: Database },
    { id: 'instances', label: 'Instances', icon: Cpu },
    { id: 'logs', label: 'Logs', icon: TerminalSquare },
    { id: 'coding', label: 'Coding (Stub)', icon: Code2 },
    { id: 'notion', label: 'Notion (Stub)', icon: BookOpen },
];

export default function Sidebar({ activeSpace, setActiveSpace }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={twMerge(
                'h-full bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col transition-all duration-300 relative',
                isCollapsed ? 'w-16' : 'w-64'
            )}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-6 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-full p-1 text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors z-10"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-2">
                {SPACES.map((space) => {
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
                            <Icon size={20} className={clsx(isActive ? 'text-white' : 'group-hover:text-[var(--accent)]', 'shrink-0')} />
                            {!isCollapsed && (
                                <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                    {space.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
