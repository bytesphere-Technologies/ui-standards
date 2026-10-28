"use client";
import { cn } from "../../lib/cn";
import { PTone, fill } from "../../lib/data-kit-shared";

export function ProgressBar({ value, max = 100, label, size = "md", tone = "primary", showValue, className, valueText }: { value: number; max?: number; label: string; size?: "xs" | "sm" | "md" | "lg"; tone?: PTone; showValue?: boolean; className?: string; valueText?: string }) {
  const h = { xs: "h-1", sm: "h-1.5", md: "h-2", lg: "h-3" }[size];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={valueText} className={cn("w-full overflow-hidden rounded-round bg-surface-sunken ring-1 ring-inset ring-[var(--color-subtle)]/50", h)}><div className={cn("h-full rounded-round transition-[width] duration-300", fill[tone])} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>
      {showValue && <span className="tnum w-10 shrink-0 text-end text-body-sm font-medium">{Math.round((value / max) * 100)}%</span>}
    </div>);
}
