"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

/* ───────── TopBar ───────── */
export function TopBar({ left, center, right, className, tone = "surface" }: { left?: React.ReactNode; center?: React.ReactNode; right?: React.ReactNode; className?: string; tone?: "surface" | "nav" }) {
  return (
    <header className={cn("relative flex h-14 shrink-0 items-center gap-3 border-b px-4", tone === "nav" ? "border-[var(--nav-border)] bg-[var(--nav-bg)] text-[var(--nav-fg-strong)]" : "border-subtle bg-surface", className)}>
      <div className="flex items-center gap-2">{left}</div><div className="mx-auto hidden w-full max-w-md sm:block">{center}</div><div className="ms-auto flex items-center gap-0.5 sm:ms-0">{right}</div>
    </header>);
}
