"use client";
import { Trash2 } from "lucide-react";
import * as React from "react";

/** @component SwipeRow @category data @use-when mobile list rows with a hidden action (archive, delete). Drag left to reveal; the action is also reachable by button. */
export function SwipeRow({ children, onAction, label = "Archive" }: { children: React.ReactNode; onAction: () => void; label?: string }) {
  const [x, setX] = React.useState(0); const start = React.useRef<number | null>(null); const W = 88;
  return <div className="relative overflow-hidden"><div className="absolute inset-y-0 end-0 grid w-[88px] place-items-center bg-status-danger-fg text-white"><button type="button" onClick={onAction} className="grid size-full place-items-center text-body-sm font-medium"><Trash2 className="size-4" aria-hidden />{label}</button></div>
    <div className="relative touch-pan-y bg-surface-raised" style={{ transform: `translateX(${x}px)`, transition: start.current === null ? "transform 200ms var(--ease-enter)" : "none" }} onPointerDown={(e) => { start.current = e.clientX - x; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }} onPointerMove={(e) => { if (start.current !== null) setX(Math.max(-W - 16, Math.min(0, e.clientX - start.current))); }} onPointerUp={() => { start.current = null; setX(x < -W / 2 ? -W : 0); }} onKeyDown={(e) => { if (e.key === "ArrowLeft") setX(-W); if (e.key === "ArrowRight" || e.key === "Escape") setX(0); }}>{children}</div></div>;
}
