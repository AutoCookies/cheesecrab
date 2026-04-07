const BASE = '/api';

const KEY = process.env.NEXT_PUBLIC_API_KEY ?? 'cheese-admin-key';

const headers = () => ({ 'X-API-Key': KEY, 'Content-Type': 'application/json' });

// ─── Types ────────────────────────────────────────────────────────────────

export interface Workspace {
  id: string;
  name: string;
  created_at: string;
  doc_count: number;
}

export interface DocMeta {
  doc_id: number;
  name: string;
  mime: string;
  size: number;
  ingested_at: string;
  workspace_id: string | null;
}

export interface Citation {
  file: string;
  page: number;
  byte_offset: number;
  line: number;
}

export interface Hit {
  chunk_id: number;
  score: number;
  text: string;
  citation: Citation | null;
}

export interface IngestResponse {
  job_id: string;
  doc_id: number;
}

export interface JobStatus {
  job_id: string;
  status: string;
  progress: number;
  total: number;
  chunks_added: number;
  error: string | null;
}

// ─── Workspaces ───────────────────────────────────────────────────────────

export async function createWorkspace(name: string): Promise<Workspace> {
  const r = await fetch(`${BASE}/v1/workspaces`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function listWorkspaces(): Promise<Workspace[]> {
  const r = await fetch(`${BASE}/v1/workspaces`, { headers: headers() });
  if (!r.ok) throw new Error(await r.text());
  const data = await r.json();
  return data.workspaces;
}

export async function deleteWorkspace(id: string): Promise<void> {
  const r = await fetch(`${BASE}/v1/workspaces/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (!r.ok && r.status !== 204) throw new Error(await r.text());
}

export async function listWorkspaceDocs(wsId: string): Promise<DocMeta[]> {
  const r = await fetch(`${BASE}/v1/workspaces/${wsId}/docs`, { headers: headers() });
  if (!r.ok) throw new Error(await r.text());
  const data = await r.json();
  return data.docs;
}

// ─── Ingest ───────────────────────────────────────────────────────────────

export async function ingestFile(
  file: File,
  docId: number,
  workspaceId: string,
): Promise<IngestResponse> {
  const form = new FormData();
  form.append('file', file);
  form.append('doc_id', String(docId));
  form.append('workspace_id', workspaceId);
  const r = await fetch(`${BASE}/v1/ingest`, {
    method: 'POST',
    headers: { 'X-API-Key': KEY },
    body: form,
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export function streamJobProgress(
  jobId: string,
  onProgress: (msg: Record<string, unknown>) => void,
): () => void {
  const es = new EventSource(`${BASE}/v1/jobs/${jobId}/stream?X-API-Key=${KEY}`);
  es.onmessage = (e) => {
    if (e.data === '[DONE]') { es.close(); return; }
    try {
      const msg = JSON.parse(e.data);
      onProgress(msg);
      if (msg._done) es.close();
    } catch {}
  };
  es.onerror = () => es.close();
  return () => es.close();
}

// ─── Chat ─────────────────────────────────────────────────────────────────

export interface ChatStreamEvent {
  type: 'citations' | 'token' | 'not_found' | 'error';
  content?: string;
  citations?: (Citation | null)[];
}

export function streamChat(
  workspaceId: string,
  message: string,
  history: { role: string; content: string }[],
  onEvent: (evt: ChatStreamEvent) => void,
): () => void {
  let closed = false;
  fetch(`${BASE}/v1/chat`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ workspace_id: workspaceId, message, history }),
  }).then(async (r) => {
    if (!r.ok || !r.body) { onEvent({ type: 'error', content: await r.text() }); return; }
    const reader = r.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    while (!closed) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n');
      buf = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const payload = line.slice(6);
        if (payload === '[DONE]') { closed = true; break; }
        try { onEvent(JSON.parse(payload)); } catch {}
      }
    }
  }).catch((e) => onEvent({ type: 'error', content: String(e) }));

  return () => { closed = true; };
}
