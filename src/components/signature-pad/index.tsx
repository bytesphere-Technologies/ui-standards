"use client";
import { RotateCcw } from "lucide-react";
import * as React from "react";
import { Button } from "../button";

/** @component SignaturePad @category forms @use-when a drawn signature (approvals, delivery proof). Pointer and touch, clear and undo, outputs a data URL. */
export function SignaturePad({ onChange }: { onChange?: (png: string | null) => void }) {
  const c = React.useRef<HTMLCanvasElement>(null); const [empty, setEmpty] = React.useState(true); const down = React.useRef(false);
  const pos = (e: React.PointerEvent) => { const r = c.current!.getBoundingClientRect(); return [(e.clientX - r.left) * (c.current!.width / r.width), (e.clientY - r.top) * (c.current!.height / r.height)]; };
  return <div><canvas ref={c} width={600} height={180} aria-label="Signature area. Draw with a pointer or finger." className="h-36 w-full touch-none rounded-control border border-dashed border-strong bg-input" onPointerDown={(e) => { down.current = true; const g = c.current!.getContext("2d")!; g.lineWidth = 3; g.lineCap = "round"; g.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--color-primary") || "#000"; const [x, y] = pos(e); g.beginPath(); g.moveTo(x, y); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }} onPointerMove={(e) => { if (!down.current) return; const g = c.current!.getContext("2d")!; const [x, y] = pos(e); g.lineTo(x, y); g.stroke(); setEmpty(false); }} onPointerUp={() => { down.current = false; onChange?.(empty ? null : c.current!.toDataURL("image/png")); }} />
    <div className="mt-2 flex items-center justify-between"><span className="text-body-sm text-secondary">{empty ? "Sign above" : "Looks good"}</span><Button size="sm" disabled={empty} onClick={() => { c.current!.getContext("2d")!.clearRect(0, 0, 600, 180); setEmpty(true); onChange?.(null); }}><RotateCcw />Clear</Button></div></div>;
}
