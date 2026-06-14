'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// three.js is heavy and DOM-only: load it on the client, after mount.
const Scene = dynamic(() => import('./Scene'), { ssr: false });

/** Static gradient shown on mobile, for reduced-motion users, or while loading. */
function GradientFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute right-[12%] top-[20%] h-[34rem] w-[34rem] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute left-[8%] top-[55%] h-[26rem] w-[26rem] rounded-full bg-accent-2/10 blur-[140px]" />
    </div>
  );
}

/**
 * A single persistent scene fixed behind the entire app. Subtle by design so
 * content stays readable; reacts to scroll and pointer.
 */
export function SceneBackground({ enabled }: { enabled: boolean }) {
  const [render3d, setRender3d] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    setRender3d(!prefersReduced && !isSmall);
  }, [enabled]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <GradientFallback />
      {render3d ? (
        <div className="absolute inset-0 opacity-80">
          <Scene />
        </div>
      ) : null}
      {/* Vignette to keep text legible over the scene. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,transparent_55%,rgb(var(--bg)/0.85)_100%)]" />
    </div>
  );
}
