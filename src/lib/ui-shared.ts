import * as React from "react";

export type Variant = "primary" | "secondary" | "ghost" | "subtle" | "danger" | "accent";

export const btnSize = { sm: "h-(--control-sm) px-3 text-body-sm gap-1.5", md: "h-(--control-md) px-3.5 gap-2", lg: "h-(--control-lg) px-5 gap-2", icon: "size-(--control-md) p-0", "icon-sm": "size-(--control-sm) p-0" };

export const inputCls = "flex h-(--control-md) w-full rounded-control border border-control bg-input px-3 text-body text-primary placeholder:text-placeholder transition-[border-color] duration-100 hover:border-secondary focus-visible:border-focus aria-[invalid=true]:border-status-danger-solid read-only:bg-input-readonly disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-disabled";

export function useDialog(open: boolean) {
  const ref = React.useRef<HTMLDialogElement>(null);
  React.useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close(); }, [open]);
  return ref;
}

export type ToastT = { id: number; tone: "success" | "error" | "info"; title: string; description?: string; action?: { label: string; onClick: () => void } };
