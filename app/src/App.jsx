import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AIModels from './pages/AIModels';
import Instances from './pages/Instances';
import Logs from './pages/Logs';
import CodingSpace from './spaces/coding/CodingSpace';
import AgentOverlay from './spaces/agent/AgentOverlay';
import PluginSettings from './components/PluginSettings';
import PluginHost from './components/PluginHost';
import PluginStore from './pages/PluginStore';
import { fetchActivePlugins, togglePlugin as togglePluginApi } from './utils/api';

// Panel width in pixels — BrowserView will be shrunk by this when panel is open
export const AGENT_PANEL_WIDTH = 360;

export default function App() {
  const [activeSpace, setActiveSpace] = useState('coding');
  const [theme, setTheme] = useState('dark');
  const [spaceContext, setSpaceContext] = useState({});
  const [agentOpen, setAgentOpen] = useState(false);
  const [enabledPlugins, setEnabledPlugins] = useState([]);

  const syncActivePlugins = async () => {
    try {
      const active = await fetchActivePlugins();
      setEnabledPlugins(active);
    } catch (err) {
      console.error("Initial plugin sync failed:", err);
    }
  };

  useEffect(() => {
    syncActivePlugins();
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleAgent = () => setAgentOpen(prev => !prev);

  const togglePlugin = async (id) => {
    const isEnabling = !enabledPlugins.includes(id);
    const updated = isEnabling
      ? [...enabledPlugins, id]
      : enabledPlugins.filter(p => p !== id);

    // Optimistic update
    setEnabledPlugins(updated);

    try {
      await togglePluginApi(id, isEnabling);
    } catch (err) {
      console.error("Failed to toggle plugin on backend:", err);
      // Rollback on failure
      setEnabledPlugins(enabledPlugins);
      alert("Failed to update plugin state. See console for details.");
    }
  };

  const renderActiveSpace = () => {
    if (enabledPlugins.includes(activeSpace)) {
      return <PluginHost pluginId={activeSpace} theme={theme} />;
    }

    switch (activeSpace) {
      case 'ai_models': return <AIModels />;
      case 'instances': return <Instances />;
      case 'logs': return <Logs />;
      case 'settings': return <PluginSettings enabledPlugins={enabledPlugins} onToggle={togglePlugin} />;
      case 'store': return <PluginStore onInstallSuccess={syncActivePlugins} />;
      case 'coding': return (
        <CodingSpace
          theme={theme}
          agentPanelOpen={agentOpen}
          agentPanelWidth={AGENT_PANEL_WIDTH}
          onProjectOpen={(path) => setSpaceContext({ projectPath: path })}
        />
      );
      default: return <AIModels />;
    }
  };

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${theme}`}>
      <Layout
        activeSpace={activeSpace}
        setActiveSpace={setActiveSpace}
        theme={theme}
        toggleTheme={toggleTheme}
        agentOpen={agentOpen}
        onToggleAgent={toggleAgent}
        enabledPlugins={enabledPlugins}
      >
        {renderActiveSpace()}
      </Layout>

      <AgentOverlay
        activeSpace={activeSpace}
        spaceContext={spaceContext}
        open={agentOpen}
        onClose={() => setAgentOpen(false)}
      />
    </div>
  );
}
