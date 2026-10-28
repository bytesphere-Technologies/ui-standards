"use client";
import { type LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── State panel ───────── */
export function StatePanel({ art, icon: Icon, title, description, action, tone = "default", compact }: { art?: React.ReactNode; icon?: LucideIcon; title: string; description?: string; action?: React.ReactNode; tone?: "default" | "error"; compact?: boolean }) {
  return (
    <div role={tone === "error" ? "alert" : "status"} className={cn("mx-auto flex max-w-96 flex-col items-center gap-2 px-4 text-center", compact ? "py-8" : "py-12")}>
      {art}{Icon && !art && <Icon className={cn("mb-1 size-6", tone === "error" ? "text-status-danger-fg" : "text-tertiary")} aria-hidden />}
      <h3 className="text-h4 font-semibold text-primary">{title}</h3>
      {description && <p className="text-body text-secondary">{description}</p>}
      {action && <div className="mt-3 flex items-center gap-2">{action}</div>}
    </div>);
}
