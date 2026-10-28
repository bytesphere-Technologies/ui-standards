"use client";

export const TypingDots = ({ label = "Someone is typing" }: { label?: string }) => (
  <span role="status" aria-label={label} className="m-wave inline-flex items-end gap-1 rounded-round bg-surface-sunken px-3 py-2.5 text-tertiary" style={{ fontSize: 10 }}>{[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-round bg-current" style={{ ["--i" as string]: i }} />)}</span>);
