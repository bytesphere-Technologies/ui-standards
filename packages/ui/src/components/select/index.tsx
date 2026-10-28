"use client";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/cn";
import { useFieldProps } from "../../lib/field-context";
import { inputCls } from "../../lib/ui-shared";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, children, ...props }, ref) {
  const p = { ...useFieldProps(), ...props };
  return (
    <div className="relative"><select ref={ref} className={cn(inputCls, "appearance-none pe-9", className)} {...p}>{children}</select>
      <ChevronDown className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-tertiary" aria-hidden /></div>);
});
