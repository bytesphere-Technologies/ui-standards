"use client";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb"><ol className="flex flex-wrap items-center gap-1 text-body-sm text-secondary">
      {items.map((it, i) => (<li key={it.label} className="flex items-center gap-1">{i > 0 && <ChevronRight className="size-3.5 text-tertiary" aria-hidden />}
        {i < items.length - 1 && it.href ? <a href={it.href} className="rounded-tag hover:text-primary hover:underline">{it.label}</a> : <span aria-current={i === items.length - 1 ? "page" : undefined} className={i === items.length - 1 ? "font-medium text-primary" : undefined}>{it.label}</span>}</li>))}
    </ol></nav>);
}
