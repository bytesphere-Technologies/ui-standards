"use client";
import { cn } from "../../lib/cn";

export const Radar = ({ size = 56, className }: { size?: number; className?: string }) => (
  <span role="status" aria-label="Searching" className={cn("relative inline-grid place-items-center text-link", className)} style={{ width: size, height: size }}>{[0, 1, 2].map((i) => <span key={i} className="m-radar absolute inset-0 rounded-round border-2 border-current" style={{ ["--i" as string]: i }} />)}<span className="size-2.5 rounded-round bg-current" /></span>);
