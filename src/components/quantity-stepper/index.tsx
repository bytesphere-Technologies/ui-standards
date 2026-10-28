"use client";
import { Minus, Plus } from "lucide-react";

export function QuantityStepper({ value, onChange, min = 1, max = 99, label = "Quantity" }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label?: string }) {
  return <div role="group" aria-label={label} className="inline-flex h-9 items-center rounded-control border border-control bg-input max-sm:h-11"><button type="button" aria-label="Decrease" disabled={value <= min} onClick={() => onChange(value - 1)} className="grid size-9 place-items-center max-sm:size-11 rounded-s-control hover:bg-action-ghost-hover disabled:text-disabled"><Minus className="size-4" /></button><span className="tnum w-9 text-center text-body font-medium" aria-live="polite">{value}</span><button type="button" aria-label="Increase" disabled={value >= max} onClick={() => onChange(value + 1)} className="grid size-9 place-items-center max-sm:size-11 rounded-e-control hover:bg-action-ghost-hover disabled:text-disabled"><Plus className="size-4" /></button></div>;
}
