"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export const ShimmerText = ({ children, className }: { children: React.ReactNode; className?: string }) => <span role="status" className={cn("m-shimmer-text font-medium", className)}>{children}</span>;
