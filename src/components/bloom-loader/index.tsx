"use client";
import { BrandMark } from "../brand-mark";

/** L3c · Bloom: the halves breathe in turn. For idle-but-alive states (listening, syncing, waiting for a device). */
export const BloomLoader = ({ size = 40, label }: { size?: number; label?: string }) => (
  <span role="status" className="inline-flex items-center gap-3 text-secondary"><BrandMark size={size} animate="bloom" />{label ? <span className="text-body">{label}</span> : <span className="sr-only">Waiting</span>}</span>
);
