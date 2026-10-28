"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { SurfaceCard } from "../surface-card";

export function HeaderStripCard({ title, strip = "primary", children }: { title: string; strip?: "primary" | "navy" | "success" | "warning" | "danger"; children: React.ReactNode }) {
  const c = { primary: "bg-action-primary", navy: "bg-action-accent", success: "bg-status-success-solid", warning: "bg-status-warning-solid", danger: "bg-status-danger-solid" }[strip];
  return <SurfaceCard pad="none" className="overflow-hidden"><div className={cn("h-1", c)} aria-hidden /><div className="p-5"><h3 className="text-h4 font-semibold">{title}</h3><div className="mt-2 text-body text-secondary">{children}</div></div></SurfaceCard>;
}
