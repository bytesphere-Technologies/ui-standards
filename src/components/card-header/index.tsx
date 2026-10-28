"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export function CardHeader({ title, desc, action, flush }: { title: string; desc?: string; action?: React.ReactNode; flush?: boolean }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", flush && "border-b border-subtle px-(--card-pad) py-4")}>
      <div className="min-w-0"><h3 className="text-h4 font-semibold text-primary">{title}</h3>{desc && <p className="mt-0.5 text-body-sm text-secondary">{desc}</p>}</div>{action}
    </div>);
}
