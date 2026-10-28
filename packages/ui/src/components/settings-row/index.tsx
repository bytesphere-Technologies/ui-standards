"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── Settings layout bits ───────── */
export function SettingsRow({ title, desc, children, last }: { title: string; desc?: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={cn("grid gap-3 py-5 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-10", !last && "border-b border-subtle")}>
      <div><h3 className="text-body font-medium text-primary">{title}</h3>{desc && <p className="mt-0.5 text-body-sm text-secondary">{desc}</p>}</div><div className="min-w-0">{children}</div>
    </div>);
}
