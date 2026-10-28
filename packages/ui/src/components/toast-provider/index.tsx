"use client";
import { CircleCheck, CircleX, Info, X } from "lucide-react";
import * as React from "react";
import { ToastT } from "../../lib/ui-shared";

const ToastCtx = React.createContext<(t: Omit<ToastT, "id">) => void>(() => {});

export const useToast = () => React.useContext(ToastCtx);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastT[]>([]); const idRef = React.useRef(0);
  const dismiss = (id: number) => setItems((l) => l.filter((x) => x.id !== id));
  const push = React.useCallback((t: Omit<ToastT, "id">) => { const id = ++idRef.current; setItems((l) => [...l, { ...t, id }].slice(-3)); if (t.tone !== "error") setTimeout(() => dismiss(id), 5000); }, []);
  const icon = { success: <CircleCheck className="size-4 text-status-success-solid" />, error: <CircleX className="size-4 text-status-danger-solid" />, info: <Info className="size-4 text-status-info-solid" /> };
  return (
    <ToastCtx.Provider value={push}>{children}
      <div role="region" aria-label="Notifications" className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:end-4">
        {items.map((t) => (
          <div key={t.id} role={t.tone === "error" ? "alert" : "status"} className="m-toast pointer-events-auto flex w-full items-start gap-3 rounded-card border border-subtle bg-surface-overlay py-3 ps-4 pe-2 shadow-dropdown sm:w-90">
            <span aria-hidden className="mt-0.5">{icon[t.tone]}</span>
            <div className="min-w-0 flex-1"><p className="text-body font-medium text-primary">{t.title}</p>{t.description && <p className="text-body-sm text-secondary">{t.description}</p>}</div>
            {t.action && <button type="button" onClick={() => { t.action!.onClick(); dismiss(t.id); }} className="rounded-control px-2 py-1 text-body-sm font-medium text-link hover:bg-action-ghost-hover">{t.action.label}</button>}
            <button type="button" aria-label="Dismiss" onClick={() => dismiss(t.id)} className="inline-flex size-7 items-center justify-center rounded-control text-tertiary hover:bg-action-ghost-hover"><X className="size-4" aria-hidden /></button>
          </div>))}
      </div>
    </ToastCtx.Provider>);
}
