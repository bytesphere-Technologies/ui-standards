"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component SpotlightCard @category surfaces @use-when a card should show a soft brand glow following the cursor. */
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  return <div ref={ref} onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`); ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`); }} className={cn("group relative overflow-hidden rounded-card border border-subtle bg-surface-raised p-5", className)}>
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--color-action-primary) 14%, transparent), transparent 70%)" }} /><div className="relative">{children}</div></div>;
}
