"use client";
import { cn } from "../../lib/cn";

export function Progress({ value, max = 100, label, valueText, tone = "primary" }: { value: number; max?: number; label: string; valueText?: string; tone?: "primary" | "warning" | "danger" }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-valuetext={valueText} className="h-1.5 overflow-hidden rounded-round bg-surface-sunken">
      <div className={cn("h-full rounded-round transition-[width] duration-300", tone === "primary" ? "bg-action-primary" : tone === "warning" ? "bg-status-warning-solid" : "bg-status-danger-solid")} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} /></div>);
}
