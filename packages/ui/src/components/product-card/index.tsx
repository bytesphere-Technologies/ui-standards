"use client";
import { Heart, ShoppingBag, Plus } from "lucide-react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Product, usd } from "../../lib/commerce-shared";
import { Price } from "../price";
import { ProductArt } from "../product-art";
import { Rating } from "../rating";
import { StatusPill } from "../status-pill";
import { Swatches } from "../swatches";

const badgeTone = { New: "info", Sale: "danger", "Low stock": "warning", "Best seller": "success" } as const;

/* ───────── ProductCard ───────── */
export function ProductCard({ p, variant = "grid", onAdd, wished, onWish }: { p: Product; variant?: "grid" | "list" | "compact" | "featured" | "minimal"; onAdd?: (p: Product) => void; wished?: boolean; onWish?: (id: string) => void }) {
  const wish = <button type="button" aria-pressed={wished} aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} onClick={() => onWish?.(p.id)} className="grid size-8 place-items-center rounded-round bg-surface-raised/90 text-secondary shadow-raised hover:text-primary"><Heart className={cn("size-4", wished && "fill-[var(--color-status-danger-solid)] text-status-danger-solid")} /></button>;
  const badge = p.badge && <span className="inline-flex rounded-tag bg-surface-raised"><StatusPill tone={badgeTone[p.badge]} dot={false} size="sm">{p.badge}</StatusPill></span>;
  if (variant === "list") return (
    <article className="flex gap-4 rounded-card border border-subtle bg-surface-raised p-3 sm:gap-5 sm:p-4"><ProductArt kind={p.kind} tone={p.tone} className="aspect-square w-28 shrink-0 rounded-control sm:w-36" />
      <div className="flex min-w-0 flex-1 flex-col"><p className="text-body-sm text-secondary">{p.brand}</p><h3 className="text-h4 font-semibold"><a href="#/store/product" className="hover:text-link">{p.name}</a></h3><Rating value={p.rating} count={p.reviews} />{p.blurb && <p className="mt-1.5 line-clamp-2 hidden text-body text-secondary sm:block">{p.blurb}</p>}<div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3"><Price price={p.price} was={p.was} /><div className="flex items-center gap-2">{badge}<Button onClick={() => onAdd?.(p)}><ShoppingBag />Add to cart</Button></div></div></div></article>);
  if (variant === "compact") return (
    <a href="#/store/product" className="flex items-center gap-3 rounded-card border border-subtle bg-surface-raised p-2.5 hover:border-strong"><ProductArt kind={p.kind} tone={p.tone} className="size-14 shrink-0 rounded-control" /><div className="min-w-0 flex-1"><p className="truncate text-body font-medium">{p.name}</p><p className="text-body-sm text-secondary">{p.brand}</p></div><Price price={p.price} size="sm" /></a>);
  if (variant === "minimal") return (
    <article className="group"><div className="relative"><a href="#/store/product" aria-label={p.name}><ProductArt kind={p.kind} tone={p.tone} className="aspect-[4/5] rounded-card" /></a><div className="absolute end-2 top-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">{wish}</div></div><div className="mt-2.5 flex items-baseline justify-between gap-2"><h3 className="truncate text-body font-medium">{p.name}</h3><span className="tnum text-body text-secondary">{usd.format(p.price)}</span></div></article>);
  if (variant === "featured") return (
    <article className="grid overflow-hidden rounded-card border border-subtle bg-surface-raised sm:grid-cols-2"><ProductArt kind={p.kind} tone={p.tone} className="aspect-square sm:aspect-auto sm:min-h-72" /><div className="flex flex-col justify-center gap-3 p-6 sm:p-8"><div className="flex gap-2">{badge}</div><div><p className="text-body-sm text-secondary">{p.brand}</p><h3 className="font-display text-h2 font-semibold tracking-[-0.02em]">{p.name}</h3></div><p className="text-body text-secondary">{p.blurb}</p><Rating value={p.rating} count={p.reviews} /><Price price={p.price} was={p.was} size="lg" /><div className="flex gap-2"><Button variant="primary" size="lg" onClick={() => onAdd?.(p)}>Add to cart</Button><Button size="lg">Details</Button></div></div></article>);
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-subtle bg-surface-raised transition-[border-color,box-shadow] duration-150 hover:border-strong hover:shadow-raised"><div className="relative"><a href="#/store/product" aria-label={p.name}><ProductArt kind={p.kind} tone={p.tone} className="aspect-[4/3]" /></a><div className="absolute start-2 top-2">{badge}</div><div className="absolute end-2 top-2">{wish}</div></div>
      <div className="flex flex-1 flex-col gap-1.5 p-4"><p className="text-body-sm text-secondary">{p.brand}</p><h3 className="text-body font-semibold leading-5"><a href="#/store/product" className="hover:text-link">{p.name}</a></h3><Rating value={p.rating} count={p.reviews} />{p.colors && <Swatches colors={p.colors} size={14} />}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3"><Price price={p.price} was={p.was} /><Button size="sm" onClick={() => onAdd?.(p)} aria-label={`Add ${p.name} to cart`}><Plus />Add</Button></div></div></article>);
}
