"use client";
import { Backdrop } from "../backdrop";
import { cn } from "../../lib/cn";

export function PortraitCard({ title, meta, tone = "navy" }: { title: string; meta: string; tone?: "navy" | "azure" | "tint" }) {
  return (
    <div className={cn("relative flex aspect-[2/3] flex-col justify-end overflow-hidden rounded-card p-4", tone === "navy" && "bg-action-accent text-action-accent-fg", tone === "azure" && "bg-action-primary text-action-primary-fg", tone === "tint" && "bg-selected text-primary")}>
      <Backdrop variant="waves" subtle />
      <div className="relative"><p className="text-caption font-medium opacity-90">{meta}</p><h3 className="mt-0.5 text-h3 font-semibold leading-tight">{title}</h3></div>
    </div>);
}
