"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { reduced } from "../../lib/lab-shared";

/** @component AnimatedNumber @category data @use-when a KPI should count up once when it appears. Respects reduced motion. */
export function AnimatedNumber({ value, format = (n) => Math.round(n).toLocaleString("en-US"), duration = 900, className }: { value: number; format?: (n: number) => string; duration?: number; className?: string }) {
  const [n, setN] = React.useState(reduced() ? value : 0); const from = React.useRef(0);
  React.useEffect(() => { if (reduced()) { setN(value); return; } const s = performance.now(); const f = from.current; let r = 0; const tick = (t: number) => { const p = Math.min(1, (t - s) / duration); const e = 1 - Math.pow(1 - p, 3); setN(f + (value - f) * e); if (p < 1) r = requestAnimationFrame(tick); else from.current = value; }; r = requestAnimationFrame(tick); return () => cancelAnimationFrame(r); }, [value, duration]);
  return <span className={cn("tnum", className)}>{format(n)}</span>;
}
