'use client';

import { useEffect, useRef, useState } from 'react';
import { useCitationModal } from '@/lib/store';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Use local worker via CDN (Next.js public dir alternative)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function CitationModal() {
  const { open, citation, hide } = useCitationModal();
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') hide();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [hide]);

  if (!open || !citation) return null;

  const isPdf = citation.file.toLowerCase().endsWith('.pdf');
  // Serve the file through the API's ingest storage — for now show metadata only if not PDF
  const fileUrl = isPdf
    ? `/api/v1/files/${encodeURIComponent(citation.file)}`
    : null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && hide()}
    >
      <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2d2d2d] shrink-0">
          <span className="text-sm font-medium truncate flex-1">{citation.file}</span>
          <span className="text-xs text-gray-500 bg-[#2a2a2a] px-2 py-0.5 rounded">Page {citation.page}</span>
          <button onClick={hide} className="text-gray-600 hover:text-gray-300 transition text-xl leading-none">×</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {isPdf && fileUrl ? (
            <Document
              file={fileUrl}
              onLoadSuccess={({ numPages: n }) => { setNumPages(n); setLoading(false); }}
              onLoadError={() => setLoading(false)}
              loading={<LoadingSpinner />}
            >
              <Page
                pageNumber={citation.page || 1}
                width={580}
                renderTextLayer
                renderAnnotationLayer
              />
            </Document>
          ) : (
            <div className="text-sm text-gray-400 space-y-2">
              <p className="font-medium">{citation.file}</p>
              <p>Page: <span className="text-cheese-400">{citation.page || '—'}</span></p>
              <p>Byte offset: <span className="text-cheese-400">{citation.byte_offset}</span></p>
              {citation.line > 0 && (
                <p>Line: <span className="text-cheese-400">{citation.line}</span></p>
              )}
              <p className="text-xs text-gray-600 mt-4">
                PDF viewer is available for .pdf files.
                For other formats, open the file at the reported offset.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="w-6 h-6 border-2 border-cheese-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
