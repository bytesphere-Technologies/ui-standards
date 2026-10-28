"use client";
import { CircleX } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { FieldContext } from "../../lib/field-context";

/* ───────── Fields ───────── */
export function Field({ id, label, hint, error, optional, children, className }: { id: string; label: string; hint?: string; error?: string; optional?: boolean; className?: string; children: ((p: { id: string; "aria-describedby"?: string; "aria-invalid"?: boolean }) => React.ReactNode) | React.ReactNode }) {
  const describedBy = [hint && !error && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-body font-medium text-primary">{label}{optional && <span className="ms-1.5 font-normal text-tertiary">Optional</span>}</label>
      <div className={error ? "m-shake" : undefined} key={error ? "e" : "n"}>{(() => { const p = { id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined }; return <FieldContext.Provider value={p}>{typeof children === "function" ? children(p) : children}</FieldContext.Provider>; })()}</div>
      {hint && !error && <p id={`${id}-hint`} className="text-body-sm text-secondary">{hint}</p>}
      {error && <p id={`${id}-err`} className="flex items-start gap-1.5 text-body-sm text-status-danger-fg"><CircleX className="mt-px size-4 shrink-0" aria-hidden />{error}</p>}
    </div>
  );
}
