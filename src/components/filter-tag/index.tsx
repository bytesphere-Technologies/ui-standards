"use client";
import { X } from "lucide-react";

export function FilterTag({ k, v, onRemove }: { k: string; v: string; onRemove: () => void }) {
  return (
    <span className="inline-flex h-6 items-center gap-1 rounded-tag border border-subtle bg-surface-raised ps-2 pe-0.5 text-caption font-medium text-primary"><span className="text-secondary">{k}</span>{v}
      <button type="button" aria-label={`Remove filter ${k}: ${v}`} onClick={onRemove} className="inline-flex size-5 items-center justify-center rounded-tag text-tertiary hover:bg-action-ghost-hover hover:text-primary"><X className="size-3.5" aria-hidden /></button></span>);
}
