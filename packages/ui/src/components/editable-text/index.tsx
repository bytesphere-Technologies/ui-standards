"use client";
import { Pencil, Check, X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";

/** @component EditableText @category forms @use-when a title or value is edited in place. Click or Enter to edit, Enter saves, Escape cancels. */
export function EditableText({ value, onSave, label = "Edit text", className }: { value: string; onSave: (v: string) => void; label?: string; className?: string }) {
  const [edit, setEdit] = React.useState(false); const [v, setV] = React.useState(value); const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => { if (edit) ref.current?.select(); }, [edit]);
  const save = () => { const t = v.trim(); if (t && t !== value) onSave(t); else setV(value); setEdit(false); };
  if (!edit) return <button type="button" aria-label={`${label}: ${value}. Press to edit`} onClick={() => { setV(value); setEdit(true); }} className={cn("group -mx-2 inline-flex items-center gap-2 rounded-control px-2 py-1 text-start hover:bg-action-ghost-hover", className)}>{value}<Pencil className="size-3.5 text-tertiary opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100" aria-hidden /></button>;
  return <span className="-mx-1 inline-flex items-center gap-1"><input ref={ref} aria-label={label} value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") save(); if (e.key === "Escape") { setV(value); setEdit(false); } }} onBlur={save} className={cn("h-(--control-md) rounded-control border border-action-primary bg-input px-2", className)} /><button type="button" aria-label="Save" onMouseDown={(e) => e.preventDefault()} onClick={save} className="grid size-8 place-items-center rounded-control text-status-success-fg hover:bg-action-ghost-hover"><Check className="size-4" /></button><button type="button" aria-label="Cancel" onMouseDown={(e) => e.preventDefault()} onClick={() => { setV(value); setEdit(false); }} className="grid size-8 place-items-center rounded-control text-secondary hover:bg-action-ghost-hover"><X className="size-4" /></button></span>;
}
