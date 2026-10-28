"use client";
import * as React from "react";

export const Kbd = ({ children }: { children: React.ReactNode }) => <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-tag border border-subtle bg-surface-raised px-1 font-mono text-[11px] text-secondary">{children}</kbd>;
