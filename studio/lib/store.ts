import { create } from 'zustand';
import type { Workspace, Citation, DocMeta } from './api';

// ─── Workspace store ───────────────────────────────────────────────────────

interface WorkspaceState {
  workspaces: Workspace[];
  activeId: string | null;
  setWorkspaces: (ws: Workspace[]) => void;
  addWorkspace: (ws: Workspace) => void;
  removeWorkspace: (id: string) => void;
  setActive: (id: string | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  activeId: null,
  setWorkspaces: (ws) => set({ workspaces: ws }),
  addWorkspace: (ws) => set((s) => ({ workspaces: [...s.workspaces, ws] })),
  removeWorkspace: (id) =>
    set((s) => ({
      workspaces: s.workspaces.filter((w) => w.id !== id),
      activeId: s.activeId === id ? null : s.activeId,
    })),
  setActive: (id) => set({ activeId: id }),
}));

// ─── Chat store ────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: (Citation | null)[];
  notFound?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  streaming: boolean;
  addMessage: (msg: ChatMessage) => void;
  appendToken: (id: string, token: string) => void;
  setCitations: (id: string, citations: (Citation | null)[]) => void;
  setStreaming: (v: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  streaming: false,
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  appendToken: (id, token) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, content: m.content + token } : m,
      ),
    })),
  setCitations: (id, citations) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === id ? { ...m, citations } : m,
      ),
    })),
  setStreaming: (v) => set({ streaming: v }),
  clearMessages: () => set({ messages: [] }),
}));

// ─── Sources store ─────────────────────────────────────────────────────────

interface IngestProgress {
  jobId: string;
  filename: string;
  progress: number;
  total: number;
  status: string;
}

interface SourcesState {
  docs: DocMeta[];
  ingestQueue: IngestProgress[];
  setDocs: (docs: DocMeta[]) => void;
  addDoc: (doc: DocMeta) => void;
  upsertProgress: (p: IngestProgress) => void;
  removeProgress: (jobId: string) => void;
}

export const useSourcesStore = create<SourcesState>((set) => ({
  docs: [],
  ingestQueue: [],
  setDocs: (docs) => set({ docs }),
  addDoc: (doc) => set((s) => ({ docs: [...s.docs, doc] })),
  upsertProgress: (p) =>
    set((s) => {
      const existing = s.ingestQueue.find((x) => x.jobId === p.jobId);
      if (existing) {
        return { ingestQueue: s.ingestQueue.map((x) => (x.jobId === p.jobId ? p : x)) };
      }
      return { ingestQueue: [...s.ingestQueue, p] };
    }),
  removeProgress: (jobId) =>
    set((s) => ({ ingestQueue: s.ingestQueue.filter((x) => x.jobId !== jobId) })),
}));

// ─── Notes store ───────────────────────────────────────────────────────────

interface NotesState {
  content: string;
  setContent: (c: string) => void;
  appendPin: (text: string, citation?: Citation | null) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  content: '',
  setContent: (c) => set({ content: c }),
  appendPin: (text, citation) =>
    set((s) => {
      const src = citation ? `\n> Source: ${citation.file}, page ${citation.page}` : '';
      return { content: s.content + `\n\n---\n${text}${src}` };
    }),
}));

// ─── Citation modal store ──────────────────────────────────────────────────

interface CitationModalState {
  open: boolean;
  citation: Citation | null;
  show: (c: Citation) => void;
  hide: () => void;
}

export const useCitationModal = create<CitationModalState>((set) => ({
  open: false,
  citation: null,
  show: (c) => set({ open: true, citation: c }),
  hide: () => set({ open: false, citation: null }),
}));
