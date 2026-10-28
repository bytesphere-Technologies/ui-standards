"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { useFieldProps } from "../../lib/field-context";
import { inputCls } from "../../lib/ui-shared";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { start?: React.ReactNode; end?: React.ReactNode }>(function Input({ className, start, end, ...props }, ref) {
  const p = { ...useFieldProps(), ...props };
  if (!start && !end) return <input ref={ref} className={cn(inputCls, className)} {...p} />;
  return (
    <div className="relative flex items-center">
      {start && <span className="pointer-events-none absolute start-3 text-tertiary [&_svg]:size-4">{start}</span>}
      <input ref={ref} className={cn(inputCls, !!start && "ps-9", !!end && "pe-10", className)} {...p} />
      {end && <span className="absolute end-1.5 flex items-center text-tertiary [&_svg]:size-4">{end}</span>}
    </div>);
});
