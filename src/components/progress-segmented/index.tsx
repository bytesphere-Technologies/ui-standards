"use client";
import { cn } from "../../lib/cn";
import { PTone, fill } from "../../lib/data-kit-shared";

export function ProgressSegmented({ value, segments = 5, label, tone = "primary" }: { value: number; segments?: number; label: string; tone?: PTone }) {
  return <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={segments} aria-valuenow={value} className="flex gap-1">{Array.from({ length: segments }, (_, i) => <span key={i} className={cn("h-2 flex-1 rounded-tag transition-colors duration-200", i < value ? fill[tone] : "bg-surface-sunken ring-1 ring-inset ring-[var(--color-subtle)]/60")} />)}</div>;
}
