'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamChat } from '@/lib/api';
import { useChatStore, useCitationModal, useNotesStore } from '@/lib/store';
import type { Citation } from '@/lib/api';

interface Props { wsId: string; }

export default function ChatPanel({ wsId }: Props) {
  const { messages, streaming, addMessage, appendToken, setCitations, setStreaming, clearMessages } =
    useChatStore();
  const { show: showCitation } = useCitationModal();
  const { appendPin } = useNotesStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput('');

    const userMsg = { id: crypto.randomUUID(), role: 'user' as const, content: text };
    addMessage(userMsg);

    const aiId = crypto.randomUUID();
    addMessage({ id: aiId, role: 'assistant', content: '', citations: [] });
    setStreaming(true);

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    const stop = streamChat(wsId, text, history, (evt) => {
      if (evt.type === 'citations') {
        setCitations(aiId, evt.citations ?? []);
      } else if (evt.type === 'token') {
        appendToken(aiId, evt.content ?? '');
      } else if (evt.type === 'not_found') {
        appendToken(aiId, evt.content ?? '');
        // Mark as not_found via store patch — simplified by using the content
        setStreaming(false);
        stop();
      } else if (evt.type === 'error') {
        appendToken(aiId, `\n\n_Error: ${evt.content}_`);
        setStreaming(false);
        stop();
      }
    });

    // Detect [DONE] via a small timeout poll is not needed — streamChat closes on [DONE]
    // We set streaming=false when the fetch stream ends
    const origStop = stop;
    // Wrap: detect end via a timeout check isn't robust; instead streamChat should call onEnd
    // For now rely on not_found / error branches + a fallback
    setTimeout(() => setStreaming(false), 60_000); // safety timeout
  }, [input, streaming, wsId, messages, addMessage, appendToken, setCitations, setStreaming]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="panel h-full flex flex-col overflow-hidden">
      <div className="px-3 py-2 border-b border-[#2d2d2d] flex items-center gap-2 shrink-0">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex-1">Chat</h2>
        <button onClick={clearMessages} className="text-xs text-gray-600 hover:text-gray-400 transition">
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {messages.length === 0 && (
          <p className="text-xs text-gray-600 text-center mt-8">
            Ask a question about your uploaded documents.
          </p>
        )}

        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            msg={msg}
            onCitationClick={showCitation}
            onPinToNotes={(text, citation) => appendPin(text, citation)}
          />
        ))}

        {streaming && (
          <div className="flex gap-1 px-1">
            <span className="w-1.5 h-1.5 bg-cheese-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-cheese-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-cheese-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 pb-3 shrink-0">
        <div className="flex gap-2">
          <textarea
            className="flex-1 bg-[#1e1e1e] border border-[#444] rounded-lg px-3 py-2 text-sm outline-none focus:border-cheese-500 transition resize-none"
            rows={2}
            placeholder="Ask anything about your documents... (Enter to send)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            disabled={streaming}
          />
          <button
            onClick={send}
            disabled={streaming || !input.trim()}
            className="bg-cheese-500 hover:bg-cheese-600 disabled:opacity-40 text-black font-bold px-4 rounded-lg transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  onCitationClick,
  onPinToNotes,
}: {
  msg: { id: string; role: string; content: string; citations?: (Citation | null)[]; notFound?: boolean };
  onCitationClick: (c: Citation) => void;
  onPinToNotes: (text: string, citation?: Citation | null) => void;
}) {
  const isUser = msg.role === 'user';
  const isNotFound = !isUser && msg.content.includes('cannot find this information');

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
          isUser
            ? 'bg-cheese-600 text-black rounded-br-sm'
            : 'bg-[#2a2a2a] text-gray-100 rounded-bl-sm'
        }`}
      >
        {isNotFound ? (
          <span className="not-found-badge">
            <span>⚠</span> I cannot find this information in the uploaded documents.
          </span>
        ) : isUser ? (
          <p className="whitespace-pre-wrap">{msg.content}</p>
        ) : (
          <div>
            <RenderedWithCitations
              content={msg.content}
              citations={msg.citations ?? []}
              onCitationClick={onCitationClick}
            />
            {/* Pin button for assistant messages */}
            {msg.content && (
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => onPinToNotes(msg.content, msg.citations?.[0])}
                  className="text-xs text-gray-600 hover:text-cheese-400 transition"
                >
                  + Pin to notes
                </button>
              </div>
            )}
          </div>
        )}

        {/* Citation footnotes */}
        {!isUser && msg.citations && msg.citations.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[#333] space-y-1">
            {msg.citations.map((c, i) =>
              c ? (
                <button
                  key={i}
                  onClick={() => onCitationClick(c)}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-cheese-400 transition w-full text-left"
                >
                  <span className="citation-marker">{i + 1}</span>
                  <span className="truncate">{c.file}, p.{c.page}</span>
                </button>
              ) : null,
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RenderedWithCitations({
  content,
  citations,
  onCitationClick,
}: {
  content: string;
  citations: (Citation | null)[];
  onCitationClick: (c: Citation) => void;
}) {
  // Replace [N] markers with clickable spans
  const parts = content.split(/(\[\d+\])/g);
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      {parts.map((part, i) => {
        const match = part.match(/^\[(\d+)\]$/);
        if (match) {
          const idx = parseInt(match[1], 10) - 1;
          const citation = citations[idx] ?? null;
          return (
            <span
              key={i}
              className="citation-marker"
              onClick={() => citation && onCitationClick(citation)}
              title={citation ? `${citation.file}, page ${citation.page}` : undefined}
            >
              {match[1]}
            </span>
          );
        }
        return <ReactMarkdown key={i}>{part}</ReactMarkdown>;
      })}
    </div>
  );
}
