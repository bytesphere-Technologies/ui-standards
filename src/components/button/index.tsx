"use client";
import * as React from "react";
import { BrandMark } from "../brand-mark";
import { cn } from "../../lib/cn";
import { Variant, btnSize } from "../../lib/ui-shared";

const btnVariant: Record<Variant, string> = {
  primary: "bg-action-primary text-action-primary-fg hover:bg-action-primary-hover active:bg-action-primary-active aria-disabled:bg-action-primary-disabled aria-disabled:text-action-primary-fg-disabled",
  secondary: "bg-action-secondary text-action-secondary-fg border border-action-secondary-border hover:bg-action-secondary-hover active:bg-action-secondary-active aria-disabled:text-disabled",
  ghost: "text-action-ghost-fg hover:bg-action-ghost-hover active:bg-action-ghost-active aria-disabled:text-disabled",
  subtle: "bg-action-subtle text-action-subtle-fg hover:bg-action-subtle-hover",
  danger: "bg-action-danger text-action-danger-fg hover:bg-action-danger-hover active:bg-action-danger-active",
  accent: "bg-action-accent text-action-accent-fg hover:bg-action-accent-hover",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: keyof typeof btnSize; loading?: boolean; reason?: string }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({ variant = "secondary", size = "md", loading, reason, className, children, onClick, type = "button", disabled, ...p }, ref) {
  const inert = loading || disabled || !!reason;
  return (
    <button ref={ref} type={type} title={reason} aria-busy={loading || undefined} aria-disabled={inert || undefined} onClick={inert ? (e) => e.preventDefault() : onClick}
      className={cn("press inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-control font-medium transition-colors duration-100 [&_svg:not([data-mark])]:size-4 [&_svg]:shrink-0 aria-disabled:cursor-not-allowed", btnVariant[variant], btnSize[size], className)} {...p}>
      {loading && <BrandMark mono animate="spin" size={16} />}
      {children}
    </button>);
});
