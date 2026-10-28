"use client";
import { cn } from "../../lib/cn";

/**
 * @component Loaders, extra set (L-10 to L-18)
 * @category loading
 * @use-when you need a loader that is not the brand mark: inline dots, audio-like bars, radar for scanning, ring for determinate progress.
 * All use brand colors via currentColor or --color-action-primary and fall back to a gentle pulse under reduced motion.
 */
export const DotsWave = ({ size = 8, className }: { size?: number; className?: string }) => (
  <span role="status" aria-label="Loading" className={cn("m-wave inline-flex items-end gap-1 text-link", className)} style={{ fontSize: size * 2 }}>{[0, 1, 2].map((i) => <span key={i} className="rounded-round bg-current" style={{ width: size, height: size, ["--i" as string]: i }} />)}</span>);
