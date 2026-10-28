"use client";
import { Package, CircleCheck, ShoppingBag, Truck, Home } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

export function OrderTimeline({ steps, current }: { steps: { label: string; when?: string; icon?: React.ElementType }[]; current: number }) {
  return (
    <ol className="flex flex-col gap-0" aria-label="Order progress">{steps.map((s, i) => { const done = i < current, on = i === current; const I = s.icon ?? Package; return (
      <li key={s.label} aria-current={on ? "step" : undefined} className="relative flex gap-4 pb-6 last:pb-0">{i < steps.length - 1 && <span className={cn("absolute start-[15px] top-8 h-[calc(100%-2rem)] w-0.5", done ? "bg-action-primary" : "bg-[var(--color-subtle)]")} aria-hidden />}
        <span className={cn("relative z-10 grid size-8 shrink-0 place-items-center rounded-round border-2", done ? "border-action-primary bg-action-primary text-action-primary-fg" : on ? "border-action-primary bg-surface-raised text-link" : "border-control bg-surface-raised text-tertiary")}>{done ? <CircleCheck className="size-4" aria-hidden /> : <I className="size-4" aria-hidden />}</span>
        <div className="pt-1"><p className={cn("text-body", on ? "font-semibold" : done ? "font-medium" : "text-secondary")}>{s.label}</p>{s.when && <p className="text-body-sm text-tertiary">{s.when}</p>}</div></li>); })}</ol>);
}

export const trackingSteps = [{ label: "Order placed", when: "12 Mar, 09:14", icon: ShoppingBag }, { label: "Packed", when: "12 Mar, 15:40", icon: Package }, { label: "Shipped with DHL", when: "13 Mar, 08:05 · tracking 7740 2218", icon: Truck }, { label: "Out for delivery", when: "Expected 15 Mar", icon: Truck }, { label: "Delivered", icon: Home }];
