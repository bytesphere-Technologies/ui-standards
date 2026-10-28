"use client";
import { type LucideIcon, Info, CircleCheck, TriangleAlert, CircleX, X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Banner ───────── */
const bannerTone: Record<"info" | "success" | "warning" | "danger", { cls: string; Icon: LucideIcon }> = {
  info: { cls: "bg-status-info-banner-bg border-status-info-banner-border text-status-info-banner-fg", Icon: Info }, success: { cls: "bg-status-success-banner-bg border-status-success-banner-border text-status-success-banner-fg", Icon: CircleCheck },
  warning: { cls: "bg-status-warning-banner-bg border-status-warning-banner-border text-status-warning-banner-fg", Icon: TriangleAlert }, danger: { cls: "bg-status-danger-banner-bg border-status-danger-banner-border text-status-danger-banner-fg", Icon: CircleX },
};

export function Banner({ tone, title, children, action, onDismiss, callout }: { tone: keyof typeof bannerTone; title?: string; children: React.ReactNode; action?: React.ReactNode; onDismiss?: () => void; callout?: boolean }) {
  const { cls, Icon } = bannerTone[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex items-start gap-3 border px-4 py-3 text-body", callout ? "rounded-card" : "border-x-0 border-t-0", cls)}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden /><div className="flex-1">{title && <p className="font-semibold">{title}</p>}<p className={title ? "mt-0.5" : undefined}>{children}</p></div>{action}
      {onDismiss && <button type="button" aria-label="Dismiss" onClick={onDismiss} className="-my-1 -me-1 inline-flex size-7 items-center justify-center rounded-control hover:bg-action-ghost-hover"><X className="size-4" aria-hidden /></button>}
    </div>);
}
