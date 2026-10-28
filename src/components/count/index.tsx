"use client";
import { cn } from "../../lib/cn";

export const Count = ({ n, tone = "primary" }: { n: number; tone?: "primary" | "danger" | "neutral" }) => (
  <span className={cn("tnum inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-round px-1.5 text-[11px] font-semibold", tone === "primary" && "bg-action-primary text-action-primary-fg", tone === "danger" && "bg-action-danger text-action-danger-fg", tone === "neutral" && "bg-surface-sunken text-secondary")}>{n > 99 ? "99+" : n}</span>);
