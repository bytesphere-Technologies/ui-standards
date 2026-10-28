"use client";
import * as React from "react";

/** @component RangeSlider @category forms @use-when a min and max (price, age, date window). Two thumbs, arrow keys, minimum gap. */
export function RangeSlider({ min = 0, max = 100, value, onChange, format = (n) => String(n), label = "Range" }: { min?: number; max?: number; value: [number, number]; onChange: (v: [number, number]) => void; format?: (n: number) => string; label?: string }) {
  const ref = React.useRef<HTMLDivElement>(null); const pct = (n: number) => ((n - min) / (max - min)) * 100;
  const drag = (i: 0 | 1) => (e: React.PointerEvent) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); };
  const move = (i: 0 | 1) => (e: React.PointerEvent) => { if (!e.buttons) return; const r = ref.current!.getBoundingClientRect(); const n = Math.round(min + Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * (max - min)); const v: [number, number] = [...value]; v[i] = i === 0 ? Math.min(n, value[1] - 1) : Math.max(n, value[0] + 1); onChange(v); };
  const key = (i: 0 | 1) => (e: React.KeyboardEvent) => { const d = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0; if (!d) return; e.preventDefault(); const v: [number, number] = [...value]; v[i] = Math.max(min, Math.min(max, v[i] + d * (e.shiftKey ? 10 : 1))); if (v[0] < v[1]) onChange(v); };
  return <div><div className="mb-2 flex justify-between text-body"><span className="font-medium">{label}</span><span className="tnum text-secondary">{format(value[0])} to {format(value[1])}</span></div>
    <div ref={ref} className="relative h-10 touch-none"><div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-round bg-surface-sunken" /><div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-round bg-action-primary" style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }} />
      {[0, 1].map((i) => <button key={i} type="button" role="slider" aria-label={i ? `${label} maximum` : `${label} minimum`} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value[i]} onPointerDown={drag(i as 0 | 1)} onPointerMove={move(i as 0 | 1)} onKeyDown={key(i as 0 | 1)} className="absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-round border-2 border-action-primary bg-surface shadow-raised active:cursor-grabbing" style={{ left: `${pct(value[i])}%` }} />)}</div></div>;
}
