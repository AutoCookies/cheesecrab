import React, { useEffect, useRef } from 'react';
import { pluginLoader } from '../utils/PluginLoader';

export default function PluginHost({ pluginId, theme }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Zero-overhead lifecycle: Mount only when the space becomes active
        pluginLoader.mountPlugin(pluginId, containerRef.current);

        return () => {
            // Cleanup: Completely unmount and sever refs when switching spaces
            pluginLoader.unmountPlugin(pluginId);
        };
    }, [pluginId]);

    return (
        <div
            className={`plugin-host-container w-full h-full overflow-hidden ${theme}`}
            ref={containerRef}
        />
    );
}
