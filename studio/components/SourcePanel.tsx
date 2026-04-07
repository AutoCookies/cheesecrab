'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ingestFile, listWorkspaceDocs, streamJobProgress } from '@/lib/api';
import { useSourcesStore } from '@/lib/store';
import type { DocMeta } from '@/lib/api';

interface Props { wsId: string; }

let _docIdCounter = Date.now();

export default function SourcePanel({ wsId }: Props) {
  const { docs, setDocs, addDoc, ingestQueue, upsertProgress, removeProgress } = useSourcesStore();
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listWorkspaceDocs(wsId)
      .then(setDocs)
      .catch(() => {});
  }, [wsId, setDocs]);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setError(null);
      for (const file of Array.from(files)) {
        const docId = ++_docIdCounter;
        try {
          const { job_id } = await ingestFile(file, docId, wsId);
          upsertProgress({ jobId: job_id, filename: file.name, progress: 0, total: 0, status: 'pending' });

          const stop = streamJobProgress(job_id, (msg) => {
            const progress = (msg.progress as number) ?? 0;
            const total = (msg.total as number) ?? 0;
            const status = (msg.status as string) ?? '';

            upsertProgress({ jobId: job_id, filename: file.name, progress, total, status });

            if (msg._done) {
              stop();
              removeProgress(job_id);
              // Add a placeholder doc entry
              const docMeta: DocMeta = {
                doc_id: docId,
                name: file.name,
                mime: file.type || 'application/octet-stream',
                size: file.size,
                ingested_at: new Date().toISOString(),
                workspace_id: wsId,
              };
              addDoc(docMeta);
            }
          });
        } catch (e) {
          setError(String(e));
        }
      }
    },
    [wsId, upsertProgress, removeProgress, addDoc],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <div className="panel h-full flex flex-col overflow-hidden">
      <div className="px-3 py-2 border-b border-[#2d2d2d] shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Sources</h2>
      </div>

      {/* Drop zone */}
      <div
        className={`mx-3 mt-3 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition shrink-0 ${
          dragging ? 'border-cheese-400 bg-cheese-900/20' : 'border-[#444] hover:border-[#666]'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <p className="text-xs text-gray-500">
          Drop PDFs, TXT, CSV here
          <br />
          <span className="text-cheese-500 underline cursor-pointer">or click to browse</span>
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept=".pdf,.txt,.md,.csv"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <p className="mx-3 mt-2 text-red-400 text-xs">{error}</p>
      )}

      {/* Active ingestion jobs */}
      {ingestQueue.length > 0 && (
        <div className="mx-3 mt-2 space-y-2 shrink-0">
          {ingestQueue.map((job) => (
            <IngestionProgress key={job.jobId} job={job} />
          ))}
        </div>
      )}

      {/* Document list */}
      <div className="flex-1 overflow-y-auto mt-2 px-3 pb-3 space-y-1">
        {docs.length === 0 ? (
          <p className="text-xs text-gray-600 text-center mt-4">No documents yet</p>
        ) : (
          docs.map((doc) => <DocRow key={doc.doc_id} doc={doc} />)
        )}
      </div>
    </div>
  );
}

function IngestionProgress({ job }: { job: { jobId: string; filename: string; progress: number; total: number; status: string } }) {
  const pct = job.total > 0 ? Math.round((job.progress / job.total) * 100) : 0;
  return (
    <div className="bg-[#1e1e1e] rounded p-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400 truncate max-w-[160px]">{job.filename}</span>
        <span className="text-xs text-cheese-400">{pct}%</span>
      </div>
      <div className="w-full bg-[#333] rounded-full h-1">
        <div
          className="bg-cheese-500 h-1 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-600 mt-0.5 capitalize">{job.status}</p>
    </div>
  );
}

function DocRow({ doc }: { doc: DocMeta }) {
  const icon = doc.name.endsWith('.pdf') ? '📄' : doc.name.endsWith('.csv') ? '📊' : '📝';
  const size = doc.size < 1024 ? `${doc.size}B` : doc.size < 1048576 ? `${(doc.size / 1024).toFixed(1)}KB` : `${(doc.size / 1048576).toFixed(1)}MB`;
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2a2a2a] transition">
      <span className="text-sm">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs truncate">{doc.name}</p>
        <p className="text-xs text-gray-600">{size}</p>
      </div>
    </div>
  );
}
