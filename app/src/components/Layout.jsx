import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function Layout({ children, activeSpace, setActiveSpace, theme, toggleTheme, agentOpen, onToggleAgent }) {
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <Topbar theme={theme} toggleTheme={toggleTheme} agentOpen={agentOpen} onToggleAgent={onToggleAgent} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeSpace={activeSpace} setActiveSpace={setActiveSpace} />
                <main className={`flex-1 overflow-auto bg-[var(--bg-primary)] ${activeSpace === 'coding' ? 'p-0' : 'p-4'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
