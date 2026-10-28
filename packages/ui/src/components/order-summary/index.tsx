"use client";
import { Tag } from "lucide-react";
import * as React from "react";
import { Button } from "../button";
import { cn } from "../../lib/cn";
import { usd } from "../../lib/commerce-shared";
import { Input } from "../input";

export function OrderSummary({ subtotal, shipping, tax, discount = 0, cta, note }: { subtotal: number; shipping: number; tax: number; discount?: number; cta?: React.ReactNode; note?: string }) {
  const total = subtotal + shipping + tax - discount; const [code, setCode] = React.useState("");
  const Row = ({ k, v, strong }: { k: string; v: string; strong?: boolean }) => <div className={cn("flex justify-between", strong ? "text-body font-semibold" : "text-body text-secondary")}><dt>{k}</dt><dd className="tnum text-primary">{v}</dd></div>;
  return (
    <div className="rounded-card border border-subtle bg-surface-raised p-5"><h2 className="text-h4 font-semibold">Order summary</h2>
      <dl className="mt-4 flex flex-col gap-2.5"><Row k="Subtotal" v={usd.format(subtotal)} /><Row k="Shipping" v={shipping ? usd.format(shipping) : "Free"} />{discount > 0 && <Row k="Discount" v={`−${usd.format(discount)}`} />}<Row k="Estimated tax" v={usd.format(tax)} /><div className="my-1 border-t border-subtle" /><Row k="Total" v={usd.format(total)} strong /></dl>
      <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}><Input aria-label="Promo code" placeholder="Promo code" value={code} onChange={(e) => setCode(e.target.value)} start={<Tag />} /><Button disabled={!code}>Apply</Button></form>
      {cta && <div className="mt-4">{cta}</div>}{note && <p className="mt-3 text-body-sm text-tertiary">{note}</p>}</div>);
}
