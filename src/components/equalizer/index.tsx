"use client";
import { cn } from "../../lib/cn";

export const Equalizer = ({ bars = 5, height = 24, className }: { bars?: number; height?: number; className?: string }) => (
  <span role="status" aria-label="Loading" className={cn("m-eq inline-flex items-end gap-[3px] text-link", className)} style={{ height }}>{Array.from({ length: bars }, (_, i) => <span key={i} className="w-[4px] rounded-tag bg-current" style={{ height: "100%", ["--i" as string]: i }} />)}</span>);
