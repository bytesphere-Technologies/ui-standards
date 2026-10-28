"use client";
import { ProgressBar } from "../progress-bar";

export function ProgressGoal({ value, goal, label, unit = "" }: { value: number; goal: number; label: string; unit?: string }) {
  const p = Math.min(100, (value / goal) * 100);
  return <div><div className="mb-1.5 flex items-baseline justify-between"><span className="text-body font-medium">{label}</span><span className="tnum text-body-sm text-secondary"><b className="font-semibold text-primary">{value.toLocaleString("en-US")}{unit}</b> of {goal.toLocaleString("en-US")}{unit}</span></div><div className="relative"><ProgressBar value={value} max={goal} label={label} size="md" tone={p >= 100 ? "success" : "primary"} />{[25, 50, 75].map((m) => <span key={m} aria-hidden className="absolute top-0 h-2 w-px bg-[var(--color-surface-raised)]" style={{ insetInlineStart: `${m}%` }} />)}</div></div>;
}
