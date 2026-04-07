'use client';

import { useParams, useRouter } from 'next/navigation';
import SourcePanel from '@/components/SourcePanel';
import ChatPanel from '@/components/ChatPanel';
import NotesPanel from '@/components/NotesPanel';
import CitationModal from '@/components/CitationModal';

export default function WorkspacePage() {
  const params = useParams();
  const wsId = params.id as string;
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 py-2 border-b border-[#2d2d2d] shrink-0">
        <button
          onClick={() => router.push('/')}
          className="text-gray-500 hover:text-cheese-400 transition text-sm"
        >
          ← Workspaces
        </button>
        <span className="text-gray-700">|</span>
        <span className="text-cheese-400 font-semibold text-sm">🧀 Cheeserag Studio</span>
        <span className="ml-auto text-xs text-gray-600 font-mono">{wsId}</span>
      </header>

      {/* 3-panel layout */}
      <div className="flex flex-1 overflow-hidden gap-2 p-2">
        <div className="w-72 shrink-0 overflow-hidden">
          <SourcePanel wsId={wsId} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatPanel wsId={wsId} />
        </div>
        <div className="w-80 shrink-0 overflow-hidden">
          <NotesPanel />
        </div>
      </div>

      <CitationModal />
    </div>
  );
}
