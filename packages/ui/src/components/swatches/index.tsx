"use client";
import { cn } from "../../lib/cn";

export function Swatches({ colors, value, onChange, size = 20 }: { colors: string[]; value?: string; onChange?: (c: string) => void; size?: number }) {
  return <div role="radiogroup" aria-label="Color" className="flex gap-2">{colors.map((c) => <button key={c} type="button" role="radio" aria-checked={value === c} aria-label={c} onClick={() => onChange?.(c)} style={{ background: c, width: size, height: size }} className={cn("rounded-round ring-offset-2 ring-offset-[var(--color-surface-raised)]", value === c ? "ring-2 ring-[var(--color-action-primary)]" : "ring-1 ring-[var(--color-subtle)]")} />)}</div>;
}
