'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNotesStore } from '@/lib/store';

export default function NotesPanel() {
  const { content, setContent } = useNotesStore();
  const [preview, setPreview] = useState(false);

  function handleExport() {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notes-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="panel h-full flex flex-col overflow-hidden">
      <div className="px-3 py-2 border-b border-[#2d2d2d] flex items-center gap-2 shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex-1">Notes</h2>
        <button
          onClick={() => setPreview((p) => !p)}
          className="text-xs text-gray-600 hover:text-gray-400 transition"
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
        <button
          onClick={handleExport}
          disabled={!content.trim()}
          className="text-xs bg-cheese-700 hover:bg-cheese-600 disabled:opacity-30 text-white px-2 py-0.5 rounded transition"
        >
          Export .md
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {preview ? (
          <div className="h-full overflow-y-auto p-3 prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{content || '_No notes yet. Pin AI responses or write here._'}</ReactMarkdown>
          </div>
        ) : (
          <textarea
            className="w-full h-full bg-transparent px-3 py-3 text-sm outline-none resize-none text-gray-200 placeholder-gray-600 font-mono leading-relaxed"
            placeholder="Your notes appear here. Pin AI responses or write freely. Supports Markdown."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </div>

      <div className="px-3 py-1.5 border-t border-[#2d2d2d] shrink-0">
        <p className="text-xs text-gray-700">{content.length} chars</p>
      </div>
    </div>
  );
}
