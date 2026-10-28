"use client";
import { cn } from "../../lib/cn";

export const GridPulse = ({ n = 3, size = 10, className }: { n?: number; size?: number; className?: string }) => (
  <span role="status" aria-label="Loading" className={cn("inline-grid gap-1 text-link", className)} style={{ gridTemplateColumns: `repeat(${n}, ${size}px)` }}>{Array.from({ length: n * n }, (_, i) => <span key={i} className="m-pulse rounded-tag bg-current" style={{ height: size, animationDelay: `${((i % n) + Math.floor(i / n)) * 120}ms`, animationDuration: "1.2s", animationIterationCount: "infinite" }} />)}</span>);
