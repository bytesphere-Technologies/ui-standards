"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export function Specimen({ title, note, doc, children, className, pad = true }: { title: string; note?: string; doc?: string; children: React.ReactNode; className?: string; pad?: boolean }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4"><div className="flex items-baseline gap-3"><h2 className="text-h4 font-semibold text-primary">{title}</h2>{note && <p className="text-body-sm text-secondary">{note}</p>}</div>{doc && <code className="font-mono text-caption text-tertiary">{doc}</code>}</div>
      <div className={cn("rounded-card border border-subtle bg-surface-raised", pad && "p-5", className)}>{children}</div>
    </section>);
}
