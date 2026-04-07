'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkspace, listWorkspaces, deleteWorkspace } from '@/lib/api';
import { useWorkspaceStore } from '@/lib/store';
import type { Workspace } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const { workspaces, setWorkspaces, addWorkspace, removeWorkspace } = useWorkspaceStore();
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listWorkspaces()
      .then(setWorkspaces)
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [setWorkspaces]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const ws = await createWorkspace(newName.trim());
      addWorkspace(ws);
      setNewName('');
    } catch (e) {
      setError(String(e));
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this workspace and all its documents?')) return;
    await deleteWorkspace(id);
    removeWorkspace(id);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <div className="text-center">
        <div className="text-5xl mb-2">🧀</div>
        <h1 className="text-3xl font-bold text-cheese-400">Cheeserag Studio</h1>
        <p className="text-sm text-gray-500 mt-1">Privacy-First Local Knowledge Workspace</p>
      </div>

      <form onSubmit={handleCreate} className="flex gap-3 w-full max-w-md">
        <input
          className="flex-1 bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-2 text-sm outline-none focus:border-cheese-500 transition"
          placeholder="New workspace name..."
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="submit"
          disabled={creating || !newName.trim()}
          className="bg-cheese-500 hover:bg-cheese-600 disabled:opacity-40 text-black font-semibold px-5 py-2 rounded-lg text-sm transition"
        >
          {creating ? '...' : 'Create'}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {loading ? (
        <p className="text-gray-500 text-sm">Loading workspaces...</p>
      ) : workspaces.length === 0 ? (
        <p className="text-gray-600 text-sm">No workspaces yet. Create one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
          {workspaces.map((ws) => (
            <WorkspaceCard
              key={ws.id}
              ws={ws}
              onOpen={() => router.push(`/workspace/${ws.id}`)}
              onDelete={() => handleDelete(ws.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WorkspaceCard({
  ws,
  onOpen,
  onDelete,
}: {
  ws: Workspace;
  onOpen: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="panel p-4 cursor-pointer hover:border-cheese-600 transition group relative"
      onClick={onOpen}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-sm truncate">{ws.name}</p>
          <p className="text-xs text-gray-500 mt-1">{ws.doc_count} documents</p>
          <p className="text-xs text-gray-600 mt-0.5">
            {new Date(ws.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition text-lg leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
