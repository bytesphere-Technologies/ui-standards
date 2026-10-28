"use client";
import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { useDialog } from "../../lib/ui-shared";

export function Modal({ open, onClose, title, description, children, footer, width = "md", danger }: { open: boolean; onClose: () => void; title: string; description?: string; children?: React.ReactNode; footer: React.ReactNode; width?: "sm" | "md" | "lg"; danger?: boolean }) {
  const ref = useDialog(open); const id = React.useId();
  const w = { sm: "w-[min(25rem,calc(100vw-2rem))]", md: "w-[min(35rem,calc(100vw-2rem))]", lg: "w-[min(45rem,calc(100vw-2rem))]" }[width];
  return (
    <dialog ref={ref} onClose={onClose} onCancel={onClose} aria-labelledby={`${id}t`} aria-describedby={description ? `${id}d` : undefined} role={danger ? "alertdialog" : "dialog"} className={cn("m-pop m-auto rounded-modal border border-subtle bg-surface-overlay p-0 text-primary shadow-modal backdrop:bg-scrim max-sm:m-0 max-sm:mt-auto max-sm:max-h-[90dvh] max-sm:w-full max-sm:max-w-none max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0 max-sm:[animation-name:a-sheet-up]", w)}>
      <div className="p-6"><div className="flex items-start justify-between gap-4"><h2 id={`${id}t`} className="text-h4 font-semibold">{title}</h2>
        <button type="button" aria-label="Close" onClick={onClose} className="-mt-1.5 -me-2 inline-flex size-8 items-center justify-center rounded-control text-secondary hover:bg-action-ghost-hover"><X className="size-4" aria-hidden /></button></div>
        {description && <p id={`${id}d`} className="mt-1.5 text-body text-secondary">{description}</p>}{children && <div className="mt-5">{children}</div>}</div>
      <div className="pb-safe flex justify-end gap-2 border-t border-subtle bg-surface-sunken/60 px-6 py-3 max-sm:[&>button]:flex-1">{footer}</div>
    </dialog>);
}
