"use client";
import { Check, Copy } from "lucide-react";
import * as React from "react";
import { Button } from "../button";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [done, setDone] = React.useState(false);
  return <Button size="sm" variant="secondary" onClick={() => { navigator.clipboard?.writeText(value).catch(() => {}); setDone(true); setTimeout(() => setDone(false), 1800); }} aria-live="polite">{done ? <><Check />Copied</> : <><Copy />{label}</>}</Button>;
}
