"use client";
import { MARK_VIEWBOX, MARK_NAVY, MARK_AZURE } from "../../lib/mark";
import * as React from "react";

/** L4 · Fill: determinate. The mark fills from the bottom as work completes (uploads, exports, imports). */
export function FillLoader({ value, size = 64, label }: { value: number; size?: number; label?: string }) {
  const id = React.useId();
  const h = 202.15, y0 = 883.64;
  return (
    <div className="inline-flex items-center gap-4" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)} aria-label={label ?? "Progress"}>
      <svg viewBox={MARK_VIEWBOX} width={size} height={size} aria-hidden>
        <defs><clipPath id={id}><rect x="2611" width="205" y={y0 + h * (1 - value / 100)} height={h + 4} style={{ transition: "y 300ms cubic-bezier(.2,0,0,1)" }} /></clipPath></defs>
        <g opacity=".16"><path d={MARK_NAVY} fill="var(--t-color-brand-mark-a)" /><path d={MARK_AZURE} fill="var(--t-color-brand-mark-b)" /></g>
        <g clipPath={`url(#${id})`}><path d={MARK_NAVY} fill="var(--t-color-brand-mark-a)" /><path d={MARK_AZURE} fill="var(--t-color-brand-mark-b)" /></g>
      </svg>
      <div><p className="tnum text-h3 font-semibold text-primary">{Math.round(value)}%</p>{label && <p className="text-body-sm text-secondary">{label}</p>}</div>
    </div>
  );
}
