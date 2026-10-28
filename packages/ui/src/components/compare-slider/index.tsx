"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

/** @component CompareSlider @category media @use-when before and after (design, scan result, photo). Drag or use arrow keys. */
export function CompareSlider({ before, after }: { before: React.ReactNode; after: React.ReactNode }) {
  const [p, setP] = React.useState(50); const ref = React.useRef<HTMLDivElement>(null);
  const at = (x: number) => { const r = ref.current!.getBoundingClientRect(); setP(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))); };
  return <div ref={ref} className="relative h-56 touch-none select-none overflow-hidden rounded-card border border-subtle" onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); at(e.clientX); }} onPointerMove={(e) => e.buttons && at(e.clientX)}>
    <div className="absolute inset-0">{after}</div><div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>{before}</div>
    <div className="absolute inset-y-0 w-0.5 bg-white shadow-dropdown" style={{ left: `${p}%` }}><button type="button" role="slider" aria-label="Compare position" aria-valuenow={Math.round(p)} aria-valuemin={0} aria-valuemax={100} onKeyDown={(e) => { if (e.key === "ArrowLeft") setP(Math.max(0, p - 5)); if (e.key === "ArrowRight") setP(Math.min(100, p + 5)); }} className="absolute top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-round bg-white text-[#21346E] shadow-dropdown"><ChevronLeft className="size-3.5" /><ChevronRight className="-ms-1.5 size-3.5" /></button></div></div>;
}
