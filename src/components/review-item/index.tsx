"use client";
import { Rating } from "../rating";

export function ReviewItem({ name, id, rating, title, body, when }: { name: string; id: string; rating: number; title: string; body: string; when: string }) {
  return <article className="border-b border-subtle py-5 last:border-0"><div className="flex items-center justify-between"><Rating value={rating} /><span className="text-body-sm text-tertiary">{when}</span></div><h3 className="mt-2 text-body font-semibold">{title}</h3><p className="mt-1 text-body text-secondary">{body}</p><p className="mt-2 text-body-sm text-tertiary">{name} · <span className="sr-only">{id}</span>Verified purchase</p></article>;
}
