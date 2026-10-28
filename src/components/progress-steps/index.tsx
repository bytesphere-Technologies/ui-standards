"use client";
import { cn } from "../../lib/cn";

export function ProgressSteps({ steps, current }: { steps: string[]; current: number }) {
  return <ol className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }} aria-label="Progress">{steps.map((s, i) => <li key={s} className="relative pt-4 text-center" aria-current={i === current ? "step" : undefined}><span className="absolute inset-x-0 top-0 flex items-center"><span className={cn("h-0.5 flex-1", i === 0 ? "opacity-0" : i <= current ? "bg-action-primary" : "bg-[var(--color-subtle)]")} /><span className={cn("size-3 rounded-round border-2", i < current ? "border-action-primary bg-action-primary" : i === current ? "border-action-primary bg-surface-raised" : "border-control bg-surface-raised")} /><span className={cn("h-0.5 flex-1", i === steps.length - 1 ? "opacity-0" : i < current ? "bg-action-primary" : "bg-[var(--color-subtle)]")} /></span><span className={cn("mt-1 block text-caption", i <= current ? "font-medium text-primary" : "text-tertiary")}>{s}</span></li>)}</ol>;
}
