"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Pills, counts, tags ───────── */
export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const pillTone: Record<Tone, string> = {
  success: "bg-status-success-bg border-status-success-border text-status-success-fg", warning: "bg-status-warning-bg border-status-warning-border text-status-warning-fg",
  danger: "bg-status-danger-bg border-status-danger-border text-status-danger-fg", info: "bg-status-info-bg border-status-info-border text-status-info-fg", neutral: "bg-status-neutral-bg border-status-neutral-border text-status-neutral-fg",
};

const dotTone: Record<Tone, string> = { success: "bg-status-success-dot", warning: "bg-status-warning-dot", danger: "bg-status-danger-dot", info: "bg-status-info-dot", neutral: "bg-status-neutral-dot" };

export function StatusPill({ tone = "neutral", dot = true, children, size = "md" }: { tone?: Tone; dot?: boolean; children: React.ReactNode; size?: "sm" | "md" }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-tag border px-2 text-caption font-semibold", size === "sm" ? "h-5 px-1.5 text-[11px]" : "h-[22px]", pillTone[tone])}>
      {dot && <span aria-hidden className={cn("size-1.5 rounded-round", dotTone[tone])} />}{children}</span>);
}
