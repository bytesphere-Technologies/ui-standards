"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { reduced } from "../../lib/lab-shared";

/** @component Reveal @category layout @use-when content should fade and rise once when scrolled into view. */
export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null); const [on, setOn] = React.useState(reduced());
  React.useEffect(() => { const el = ref.current; if (!el || on) return; const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.15 }); io.observe(el); return () => io.disconnect(); }, [on]);
  return <div ref={ref} className={cn("transition-[opacity,transform] duration-500 ease-out", on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
