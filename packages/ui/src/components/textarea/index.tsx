"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { useFieldProps } from "../../lib/field-context";
import { inputCls } from "../../lib/ui-shared";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...props }, ref) {
  const p = { ...useFieldProps(), ...props };
  return <textarea ref={ref} rows={3} className={cn(inputCls, "h-auto min-h-22 resize-y py-2", className)} {...p} />;
});
