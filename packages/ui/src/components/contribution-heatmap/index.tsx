"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component ContributionHeatmap @category data @use-when activity over weeks (commits, scans, logins). Intensity from 5 steps, tooltip on hover and focus. */
export function ContributionHeatmap({ weeks = 20, seed = 7 }: { weeks?: number; seed?: number }) {
  const [tip, setTip] = React.useState<string | null>(null); const val = (w: number, d: number) => Math.max(0, Math.round((Math.sin((w + 1) * (d + 2) * seed) * 0.5 + 0.5) * 4 * (d === 0 || d === 6 ? 0.4 : 1)));
  const shade = ["bg-surface-sunken", "bg-[color-mix(in_srgb,var(--color-action-primary)_22%,transparent)]", "bg-[color-mix(in_srgb,var(--color-action-primary)_42%,transparent)]", "bg-[color-mix(in_srgb,var(--color-action-primary)_68%,transparent)]", "bg-action-primary"];
  return <div><div className="flex gap-1 overflow-x-auto pb-1">{Array.from({ length: weeks }, (_, w) => <div key={w} className="flex flex-col gap-1">{Array.from({ length: 7 }, (_, d) => { const v = val(w, d); const label = `${v * 3} scans, week ${w + 1}, ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d]}`; return <button key={d} type="button" aria-label={label} onMouseEnter={() => setTip(label)} onFocus={() => setTip(label)} onMouseLeave={() => setTip(null)} className={cn("size-3.5 rounded-[3px] transition-transform hover:scale-125", shade[Math.min(4, v)])} />; })}</div>)}</div>
    <div className="mt-2 flex items-center justify-between text-caption text-secondary"><span aria-live="polite" className="min-h-4">{tip ?? "Hover a day"}</span><span className="flex items-center gap-1">Less{shade.map((s, i) => <span key={i} className={cn("size-3 rounded-[3px]", s)} />)}More</span></div></div>;
}
