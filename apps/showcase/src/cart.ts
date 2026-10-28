import * as React from "react";
import { products } from "./data";
/** Tiny cart store (module state + useSyncExternalStore). In a real app replace with server state; the UI contract stays the same. */
type Line = { id: string; qty: number };
let lines: Line[] = [{ id: "p1", qty: 2 }, { id: "p4", qty: 1 }];
const subs = new Set<() => void>(); const emit = () => subs.forEach((f) => f());
export const cart = {
  add(id: string, qty = 1) { const l = lines.find((x) => x.id === id); lines = l ? lines.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x)) : [...lines, { id, qty }]; emit(); },
  set(id: string, qty: number) { lines = lines.map((x) => (x.id === id ? { ...x, qty } : x)); emit(); },
  remove(id: string) { lines = lines.filter((x) => x.id !== id); emit(); },
  clear() { lines = []; emit(); },
};
let snap = { lines, count: 0, subtotal: 0 };
function compute() { const items = lines.map((l) => ({ ...l, p: products.find((p) => p.id === l.id)! })); snap = { lines: items as never, count: lines.reduce((a, l) => a + l.qty, 0), subtotal: items.reduce((a, l) => a + l.p.price * l.qty, 0) } as never; }
compute(); subs.add(compute);
export function useCart() { return React.useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => snap) as unknown as { lines: { id: string; qty: number; p: (typeof products)[number] }[]; count: number; subtotal: number }; }
