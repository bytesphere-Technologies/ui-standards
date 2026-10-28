"use client";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";

/* ───────── Stepper ───────── */
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="flex items-center gap-2" aria-label="Progress">
      {steps.map((s, i) => { const done = i < current, on = i === current; return (
        <li key={s} aria-current={on ? "step" : undefined} className="flex flex-1 items-center gap-2 last:flex-none">
          <span className={cn("tnum inline-flex size-6 shrink-0 items-center justify-center rounded-round text-caption font-semibold", done ? "bg-action-primary text-action-primary-fg" : on ? "border-2 border-action-primary text-primary" : "border border-control text-tertiary")}>{done ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : i + 1}<span className="sr-only">{done ? " complete" : ""}</span></span>
          <span className={cn("hidden text-body font-medium sm:inline", on ? "text-primary" : "text-secondary")}>{s}</span>
          {i < steps.length - 1 && <span className={cn("h-px flex-1", done ? "bg-action-primary" : "bg-[var(--color-subtle)]")} aria-hidden />}
        </li>); })}
    </ol>);
}
