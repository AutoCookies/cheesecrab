import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';

export default function Layout({ children, activeSpace, setActiveSpace, theme, toggleTheme, agentOpen, onToggleAgent, enabledPlugins }) {
    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            <Topbar theme={theme} toggleTheme={toggleTheme} agentOpen={agentOpen} onToggleAgent={onToggleAgent} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeSpace={activeSpace} setActiveSpace={setActiveSpace} enabledPlugins={enabledPlugins} />
                <main className={`flex-1 overflow-hidden bg-[var(--bg-primary)] ${(activeSpace === 'coding' || enabledPlugins.includes(activeSpace)) ? 'p-0' : 'p-4'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
