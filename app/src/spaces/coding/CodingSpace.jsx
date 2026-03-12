import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

// Track whether the BrowserView has ever been created, so we
// can skip the spinner on subsequent visits to the tab.
let _syntaxVoidEverLoaded = false;

export default function CodingSpace({ theme, agentPanelOpen, agentPanelWidth = 0, onProjectOpen }) {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(_syntaxVoidEverLoaded);
    const [loadError, setLoadError] = useState(null);

    // Compute bounds, subtracting the agent panel width when it's open
    const getBounds = () => {
        if (!containerRef.current) return null;
        const rect = containerRef.current.getBoundingClientRect();
        const panelOffset = agentPanelOpen ? agentPanelWidth : 0;
        return {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width) - panelOffset,
            height: Math.round(rect.height),
        };
    };

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container || !window.electronAPI?.openSyntaxVoid) return;

        const bounds = getBounds();
        if (!bounds || bounds.width <= 0) return;

        if (_syntaxVoidEverLoaded) {
            console.log('[CodingSpace] Showing existing SyntaxVoid with bounds:', bounds);
            window.electronAPI.showSyntaxVoid(bounds);
        } else {
            console.log('[CodingSpace] Opening SyntaxVoid for the first time with bounds:', bounds);
            window.electronAPI.openSyntaxVoid(theme, bounds);
        }

        const observer = new ResizeObserver(() => {
            const b = getBounds();
            if (b && b.width > 0) window.electronAPI.resizeSyntaxVoid(b);
        });

        observer.observe(container);

        const fallback = setTimeout(() => {
            _syntaxVoidEverLoaded = true;
            setIsLoaded(true);
        }, 8000);

        return () => {
            observer.disconnect();
            clearTimeout(fallback);
            if (window.electronAPI?.hideSyntaxVoid) {
                window.electronAPI.hideSyntaxVoid();
            }
        };
    }, [theme]);

    // Re-sync bounds whenever the agent panel opens or closes
    useEffect(() => {
        const bounds = getBounds();
        if (bounds && bounds.width > 0 && window.electronAPI?.resizeSyntaxVoid) {
            window.electronAPI.resizeSyntaxVoid(bounds);
        }
    }, [agentPanelOpen, agentPanelWidth]);

    useEffect(() => {
        if (!window.electronAPI) return;

        const onReady = () => {
            console.log('[CodingSpace] Received ready signal from SyntaxVoid');
            _syntaxVoidEverLoaded = true;
            setIsLoaded(true);
        };
        const onError = (msg) => {
            console.error('[CodingSpace] Received error:', msg);
            setIsLoaded(true);
            setLoadError(msg);
        };

        window.electronAPI.onSyntaxVoidReady?.(onReady);
        window.electronAPI.onSyntaxVoidError?.(onError);

        return () => {
            window.electronAPI.offSyntaxVoidReady?.(onReady);
            window.electronAPI.offSyntaxVoidError?.(onError);
        };
    }, []);

    return (
        <div className="h-full w-full bg-[var(--bg-primary)] overflow-hidden flex flex-col p-0 m-0">
            <div
                ref={containerRef}
                id="syntaxvoid-container"
                className="flex-1 relative w-full h-full p-0 m-0"
                style={{ background: 'var(--bg-primary)' }}
            >
                {!isLoaded && (
                    <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center bg-[var(--bg-primary)] z-50">
                        <Loader2 size={40} className="animate-spin text-[var(--accent)]" />
                        <p className="text-sm text-[var(--text-secondary)] font-medium">Booting SyntaxVoid Editor…</p>
                    </div>
                )}
                {loadError && (
                    <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center p-8 text-center bg-[var(--bg-primary)] z-50">
                        <span className="text-red-400 text-sm font-medium">⚠ {loadError}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
