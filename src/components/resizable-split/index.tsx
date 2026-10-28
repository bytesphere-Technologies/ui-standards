"use client";
import * as React from "react";

/** @component ResizableSplit @category layout @use-when two panes where the user decides the ratio (list and detail, code and preview). Drag or arrow keys. */
export function ResizableSplit({ left, right, initial = 38 }: { left: React.ReactNode; right: React.ReactNode; initial?: number }) {
  const [p, setP] = React.useState(initial); const ref = React.useRef<HTMLDivElement>(null);
  return <div ref={ref} className="flex h-64 overflow-hidden rounded-card border border-subtle bg-surface-raised"><div className="overflow-auto p-3" style={{ width: `${p}%` }}>{left}</div>
    <div role="separator" aria-orientation="vertical" tabIndex={0} aria-valuenow={Math.round(p)} aria-valuemin={20} aria-valuemax={80} aria-label="Resize panes" onKeyDown={(e) => { if (e.key === "ArrowLeft") setP(Math.max(20, p - 3)); if (e.key === "ArrowRight") setP(Math.min(80, p + 3)); }} onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }} onPointerMove={(e) => { if (!e.buttons) return; const r = ref.current!.getBoundingClientRect(); setP(Math.max(20, Math.min(80, ((e.clientX - r.left) / r.width) * 100))); }} className="group relative w-1.5 shrink-0 cursor-col-resize touch-none bg-[var(--color-subtle)] hover:bg-action-primary focus-visible:bg-action-primary"><span className="absolute inset-y-0 -inset-x-2" /></div><div className="min-w-0 flex-1 overflow-auto p-3">{right}</div></div>;
}
