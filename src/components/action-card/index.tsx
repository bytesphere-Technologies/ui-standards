"use client";
import { Button } from "../button";
import { SurfaceCard } from "../surface-card";

export function ActionCard({ title, body, primary, secondary }: { title: string; body: string; primary: string; secondary?: string }) {
  return <SurfaceCard variant="dashed" className="flex flex-col items-start gap-3"><div><h3 className="text-h4 font-semibold">{title}</h3><p className="mt-1 text-body text-secondary">{body}</p></div><div className="flex gap-2"><Button variant="primary" size="sm">{primary}</Button>{secondary && <Button size="sm" variant="ghost">{secondary}</Button>}</div></SurfaceCard>;
}
