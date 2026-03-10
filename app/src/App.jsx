import React, { useState } from 'react';
import Layout from './components/Layout';
import AIModels from './pages/AIModels';
import Instances from './pages/Instances';
import Logs from './pages/Logs';
import CodingSpace from './spaces/coding/CodingSpace';
import AgentOverlay from './spaces/agent/AgentOverlay';

// Panel width in pixels — BrowserView will be shrunk by this when panel is open
export const AGENT_PANEL_WIDTH = 360;

export default function App() {
  const [activeSpace, setActiveSpace] = useState('coding');
  const [theme, setTheme] = useState('dark');
  const [spaceContext, setSpaceContext] = useState({});
  const [agentOpen, setAgentOpen] = useState(false);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleAgent = () => setAgentOpen(prev => !prev);

  const renderActiveSpace = () => {
    switch (activeSpace) {
      case 'ai_models': return <AIModels />;
      case 'instances': return <Instances />;
      case 'logs': return <Logs />;
      case 'coding': return (
        <CodingSpace
          theme={theme}
          agentPanelOpen={agentOpen}
          agentPanelWidth={AGENT_PANEL_WIDTH}
          onProjectOpen={(path) => setSpaceContext({ projectPath: path })}
        />
      );
      case 'notion': return <div className="p-8"><h2 className="text-xl">Notion Space (Stub)</h2><p>Coming soon!</p></div>;
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
      >
        {renderActiveSpace()}
      </Layout>

      {/* AgentOverlay is a right-side rail panel, outside Layout so it's never
          clipped by overflow:auto. In Coding Space it floats above the BrowserView
          in the uncovered right rail (BrowserView is shrunk to accommodate). */}
      <AgentOverlay
        activeSpace={activeSpace}
        spaceContext={spaceContext}
        open={agentOpen}
        onClose={() => setAgentOpen(false)}
      />
    </div>
  );
}
