"use client";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { inputCls } from "../../lib/ui-shared";

export function TagInput({ id, label, value, onChange }: { id: string; label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [t, setT] = React.useState("");
  return (
    <div className={cn(inputCls, "h-auto min-h-(--control-md) flex-wrap items-center gap-1.5 py-1.5")}>
      {value.map((v) => <span key={v} className="inline-flex h-6 items-center gap-1 rounded-tag bg-surface-sunken ps-2 pe-0.5 text-body-sm font-medium">{v}<button type="button" aria-label={`Remove ${v}`} onClick={() => onChange(value.filter((x) => x !== v))} className="grid size-5 place-items-center rounded-tag text-tertiary hover:bg-action-ghost-hover"><X className="size-3.5" /></button></span>)}
      <input id={id} aria-label={label} value={t} onChange={(e) => setT(e.target.value)} placeholder={value.length ? "" : "Add an email and press Enter"} className="min-w-32 flex-1 bg-transparent text-body outline-none placeholder:text-placeholder"
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === ",") && t.trim()) { e.preventDefault(); onChange([...value, t.trim()]); setT(""); } if (e.key === "Backspace" && !t && value.length) onChange(value.slice(0, -1)); }} />
    </div>);
}
