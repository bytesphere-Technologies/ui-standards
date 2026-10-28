"use client";
import { ChevronLeft } from "lucide-react";
import * as React from "react";
import { Breadcrumb } from "../breadcrumb";

/* ───────── Page header ───────── */
export function PageHeader({ title, desc, actions, crumbs, meta, back }: { title: string; desc?: string; actions?: React.ReactNode; crumbs?: { label: string; href?: string }[]; meta?: React.ReactNode; back?: { label: string; href: string } }) {
  return (
    <header className="mb-6 flex flex-col gap-3">
      {crumbs && <Breadcrumb items={crumbs} />}
      {back && !crumbs && <a href={back.href} className="inline-flex w-fit items-center gap-1 text-body-sm font-medium text-secondary hover:text-primary"><ChevronLeft className="size-4" aria-hidden />{back.label}</a>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0"><h1 className="truncate text-h2 font-semibold text-primary">{title}</h1>{desc && <p className="mt-1 max-w-[62ch] text-body text-secondary">{desc}</p>}{meta && <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-secondary">{meta}</div>}</div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
    </header>);
}
