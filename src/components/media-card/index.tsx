"use client";
import { type LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { SurfaceCard } from "../surface-card";

/* ───────── Rectangle layouts ───────── */
const Art = ({ tone = "tint", icon: I }: { tone?: "tint" | "navy" | "azure"; icon?: LucideIcon }) => (
  <div className={cn("grid size-full min-h-28 place-items-center", tone === "tint" && "bg-selected text-link", tone === "navy" && "bg-action-accent text-action-accent-fg", tone === "azure" && "bg-action-primary text-action-primary-fg")}>{I && <I className="size-8" strokeWidth={1.5} aria-hidden />}</div>);

export function MediaCard({ title, meta, body, side = "left", icon, tone = "tint", action }: { title: string; meta?: string; body?: string; side?: "left" | "right" | "top"; icon?: LucideIcon; tone?: "tint" | "navy" | "azure"; action?: React.ReactNode }) {
  const media = <div className={cn("shrink-0 overflow-hidden", side === "top" ? "aspect-[16/9] w-full" : "w-36 self-stretch")}><Art tone={tone} icon={icon} /></div>;
  return (
    <SurfaceCard pad="none" className={cn("flex overflow-hidden", side === "top" ? "flex-col" : "flex-row", side === "right" && "flex-row-reverse")}>
      {media}<div className="flex min-w-0 flex-1 flex-col gap-1 p-4">{meta && <p className="text-caption font-medium text-tertiary">{meta}</p>}<h3 className="text-h4 font-semibold">{title}</h3>{body && <p className="text-body-sm text-secondary">{body}</p>}{action && <div className="mt-2">{action}</div>}</div>
    </SurfaceCard>);
}
