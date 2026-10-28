"use client";
import { MARK_VIEWBOX, MARK_NAVY, MARK_AZURE } from "../../lib/mark";
import { cn } from "../../lib/cn";

/** The ByteSphere mark. `mono` paints both halves with currentColor (second half at 55%) for use inside buttons and on brand fills. */
export function BrandMark({ size = 24, mono, className, animate, title }: { size?: number; mono?: boolean; className?: string; animate?: "swirl" | "split" | "spin" | "trace" | "orbit" | "bloom"; title?: string }) {
  const a = mono ? "currentColor" : "var(--t-color-brand-mark-a)";
  const b = mono ? "currentColor" : "var(--t-color-brand-mark-b)";
  const g = animate === "swirl" ? "m-swirl" : animate === "spin" ? "m-spin" : undefined;
  return (
    <svg viewBox={MARK_VIEWBOX} width={size} height={size} className={cn("shrink-0", className)} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <g className={g} style={g ? { transformBox: "fill-box", transformOrigin: "50% 50%" } : undefined}>
        <path d={MARK_NAVY} fill={a} className={animate === "split" ? "m-split-a" : animate === "trace" ? "m-trace-a" : animate === "orbit" ? "m-orbit-a" : animate === "bloom" ? "m-bloom-a" : undefined} opacity={mono ? 1 : 1} />
        <path d={MARK_AZURE} fill={b} className={animate === "split" ? "m-split-b" : animate === "trace" ? "m-trace-b" : animate === "orbit" ? "m-orbit-b" : animate === "bloom" ? "m-bloom-b" : undefined} opacity={mono ? 0.55 : 1} />
      </g>
    </svg>
  );
}
