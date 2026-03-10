import React, { useState } from 'react';
import Layout from './components/Layout';
import AIModels from './pages/AIModels';
import Instances from './pages/Instances';
import Logs from './pages/Logs';

export default function App() {
  const [activeSpace, setActiveSpace] = useState('ai_models');
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const renderActiveSpace = () => {
    switch (activeSpace) {
      case 'ai_models': return <AIModels />;
      case 'instances': return <Instances />;
      case 'logs': return <Logs />;
      case 'coding': return <div className="p-8"><h2 className="text-xl">Coding Space (Stub)</h2><p>Coming soon!</p></div>;
      case 'notion': return <div className="p-8"><h2 className="text-xl">Notion Space (Stub)</h2><p>Coming soon!</p></div>;
      default: return <AIModels />;
    }
  };

  return (
    <Layout
      activeSpace={activeSpace}
      setActiveSpace={setActiveSpace}
      theme={theme}
      toggleTheme={toggleTheme}
    >
      {renderActiveSpace()}
    </Layout>
  );
}
