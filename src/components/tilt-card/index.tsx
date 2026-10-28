"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { reduced } from "../../lib/lab-shared";

/** @component TiltCard @category surfaces @use-when a feature or product card should tilt toward the pointer (max 6 degrees). Marketing only. */
export function TiltCard({ children, className, max = 6 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => { if (reduced() || e.pointerType === "touch") return; const r = ref.current!.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; ref.current!.style.transform = `perspective(700px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg)`; };
  return <div ref={ref} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }} className={cn("rounded-card border border-subtle bg-surface-raised p-5 transition-transform duration-150 ease-out will-change-transform", className)}>{children}</div>;
}
