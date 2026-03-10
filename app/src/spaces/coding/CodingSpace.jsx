import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function CodingSpace({ theme }) {
    const containerRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const updateBounds = () => {
        if (!containerRef.current || !window.electronAPI?.resizeSyntaxVoid) return;
        const rect = containerRef.current.getBoundingClientRect();
        const bounds = {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        };
        window.electronAPI.resizeSyntaxVoid(bounds);
    };

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container || !window.electronAPI?.openSyntaxVoid) return;

        // Perform initial measurement and open the view
        const rect = container.getBoundingClientRect();
        const bounds = {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        };

        console.log('[CodingSpace] Opening SyntaxVoid with bounds:', bounds);
        window.electronAPI.openSyntaxVoid(theme, bounds);

        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const screenRect = entry.target.getBoundingClientRect();
                const newBounds = {
                    x: Math.round(screenRect.left),
                    y: Math.round(screenRect.top),
                    width: Math.round(screenRect.width),
                    height: Math.round(screenRect.height),
                };
                window.electronAPI.resizeSyntaxVoid(newBounds);
            }
        });

        observer.observe(container);

        // Safety timeout to ensure we show the view if the ready signal is lost
        const fallback = setTimeout(() => setIsLoaded(true), 8000);

        return () => {
            observer.disconnect();
            clearTimeout(fallback);
            if (window.electronAPI?.closeSyntaxVoid) {
                window.electronAPI.closeSyntaxVoid();
            }
        };
    }, [theme]);

    useEffect(() => {
        if (!window.electronAPI) return;

        const onReady = () => {
            console.log('[CodingSpace] Received ready signal from SyntaxVoid');
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
