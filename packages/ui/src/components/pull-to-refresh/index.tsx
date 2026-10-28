"use client";
import * as React from "react";

/** @component PullToRefresh @category feedback @use-when mobile feeds. Pull down past 64 px to refresh; a visible Refresh button must also exist. */
export function PullToRefresh({ onRefresh, children }: { onRefresh: () => Promise<void> | void; children: React.ReactNode }) {
  const [y, setY] = React.useState(0); const [busy, setBusy] = React.useState(false); const s = React.useRef<number | null>(null); const box = React.useRef<HTMLDivElement>(null);
  const end = async () => { const go = y >= 64; s.current = null; if (go) { setBusy(true); setY(48); await onRefresh(); setBusy(false); } setY(0); };
  return <div ref={box} tabIndex={0} aria-label="Feed. Pull down to refresh" className="relative h-64 touch-pan-x overflow-y-auto overscroll-contain rounded-card border border-subtle bg-surface-sunken" onPointerDown={(e) => { if (box.current!.scrollTop === 0 && !busy) s.current = e.clientY; }} onPointerMove={(e) => { if (s.current !== null && e.buttons) setY(Math.max(0, Math.min(96, (e.clientY - s.current) * 0.5))); }} onPointerUp={end} onPointerLeave={() => s.current !== null && end()}>
    <div className="absolute inset-x-0 top-0 grid h-12 place-items-center text-body-sm text-secondary" style={{ transform: `translateY(${y - 48}px)`, transition: s.current === null ? "transform 200ms var(--ease-enter)" : "none" }}>{busy ? "Refreshing" : y >= 64 ? "Release to refresh" : "Pull to refresh"}</div>
    <div style={{ transform: `translateY(${y}px)`, transition: s.current === null ? "transform 200ms var(--ease-enter)" : "none" }}>{children}</div></div>;
}
