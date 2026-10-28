"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { reduced } from "../../lib/lab-shared";

/** @component RippleButton @category forms @use-when a primary touch action should acknowledge the exact tap point. */
export function RippleButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = React.useRef<HTMLButtonElement>(null);
  return <button ref={ref} type="button" onClick={(e) => { onClick?.(); if (reduced()) return; const b = ref.current!; const r = b.getBoundingClientRect(); const s = Math.max(r.width, r.height) * 2; const d = document.createElement("span"); d.className = "m-ripple"; Object.assign(d.style, { width: `${s}px`, height: `${s}px`, left: `${e.clientX - r.left - s / 2}px`, top: `${e.clientY - r.top - s / 2}px` }); b.appendChild(d); setTimeout(() => d.remove(), 560); }}
    className={cn("relative inline-flex h-(--control-lg) items-center justify-center gap-2 overflow-hidden rounded-control bg-action-primary px-5 text-body font-medium text-action-primary-fg hover:bg-action-primary-hover", className)}>{children}</button>;
}
