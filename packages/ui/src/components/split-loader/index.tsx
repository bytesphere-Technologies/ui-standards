"use client";
import { BrandMark } from "../brand-mark";

/** L2 · Split: the halves part and meet. For background work and sync states, quieter than the swirl. */
export const SplitLoader = ({ size = 40, label }: { size?: number; label?: string }) => (
  <span role="status" className="inline-flex items-center gap-3 text-secondary"><BrandMark size={size} animate="split" />{label && <span className="text-body">{label}</span>}{!label && <span className="sr-only">Syncing</span>}</span>
);
