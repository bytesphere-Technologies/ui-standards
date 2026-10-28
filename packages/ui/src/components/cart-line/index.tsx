"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Product, usd } from "../../lib/commerce-shared";
import { ProductArt } from "../product-art";
import { QuantityStepper } from "../quantity-stepper";

export function CartLine({ p, qty, onQty, onRemove, compact }: { p: Product; qty: number; onQty: (n: number) => void; onRemove: () => void; compact?: boolean }) {
  return (
    <li className={cn("flex gap-4 border-b border-subtle last:border-0", compact ? "py-3" : "py-5")}><ProductArt kind={p.kind} tone={p.tone} className={cn("shrink-0 rounded-control", compact ? "size-16" : "size-24")} />
      <div className="flex min-w-0 flex-1 flex-col"><div className="flex justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-body font-medium">{p.name}</h3><p className="text-body-sm text-secondary">{p.brand}{p.colors && " · Graphite"}</p></div><span className="tnum text-body font-semibold">{usd.format(p.price * qty)}</span></div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2"><QuantityStepper value={qty} onChange={onQty} label={`Quantity of ${p.name}`} /><Button size="sm" variant="ghost" onClick={onRemove} aria-label={`Remove ${p.name}`}><Trash2 /><span className="max-sm:sr-only">Remove</span></Button></div></div></li>);
}
