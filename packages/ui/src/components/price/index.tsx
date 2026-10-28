"use client";
import { cn } from "../../lib/cn";
import { usd } from "../../lib/commerce-shared";

export const Price = ({ price, was, size = "md" }: { price: number; was?: number; size?: "sm" | "md" | "lg" }) => (
  <span className="tnum inline-flex items-baseline gap-2"><span className={cn("font-semibold", size === "lg" ? "text-h3" : size === "sm" ? "text-body" : "text-h4")}>{usd.format(price)}</span>{was && <><s className="text-body-sm text-tertiary"><span className="sr-only">Was </span>{usd.format(was)}</s><span className="text-body-sm font-medium text-status-danger-fg">−{Math.round((1 - price / was) * 100)}%</span></>}</span>);
