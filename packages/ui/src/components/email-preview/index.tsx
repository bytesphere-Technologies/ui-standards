"use client";
import { Mail } from "lucide-react";
import * as React from "react";

export function EmailPreview({ subject, preheader, children }: { subject: string; preheader: string; children: React.ReactNode }) {
  return <div className="w-full max-w-md overflow-hidden rounded-card border border-subtle bg-white text-[#000913]"><div className="border-b border-[#ECEDEE] bg-[#F7F7F8] px-4 py-2.5 text-body-sm"><p className="flex items-center gap-1.5 font-semibold"><Mail className="size-3.5 text-[#116CB3]" aria-hidden />{subject}</p><p className="truncate text-[#5E6D78]">{preheader}</p></div><div className="p-5 text-body">{children}</div></div>;
}
