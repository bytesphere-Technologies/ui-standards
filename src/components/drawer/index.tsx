"use client";
import { X } from "lucide-react";
import * as React from "react";
import { useDialog } from "../../lib/ui-shared";

export function Drawer({ open, onClose, title, description, children, footer, width = 440 }: { open: boolean; onClose: () => void; title: string; description?: string; children: React.ReactNode; footer?: React.ReactNode; width?: number }) {
  const ref = useDialog(open); const id = React.useId();
  return (
    <dialog ref={ref} onClose={onClose} onCancel={onClose} aria-labelledby={`${id}t`} className="m-sheet-right ms-auto me-0 mt-0 mb-0 h-dvh max-h-dvh rounded-none border-s border-subtle bg-surface-overlay p-0 text-primary shadow-modal backdrop:bg-scrim" style={{ width: `min(${width}px, 100vw)` }}>
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-subtle px-6 py-4"><div><h2 id={`${id}t`} className="text-h4 font-semibold">{title}</h2>{description && <p className="mt-0.5 text-body-sm text-secondary">{description}</p>}</div>
          <button type="button" aria-label="Close" onClick={onClose} className="-me-2 inline-flex size-8 items-center justify-center rounded-control text-secondary hover:bg-action-ghost-hover"><X className="size-4" aria-hidden /></button></div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-subtle px-6 py-3">{footer}</div>}
      </div>
    </dialog>);
}
