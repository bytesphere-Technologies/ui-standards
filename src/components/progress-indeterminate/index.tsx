"use client";

export const ProgressIndeterminate = ({ label }: { label: string }) => <div role="progressbar" aria-label={label} className="relative h-1.5 overflow-hidden rounded-round bg-surface-sunken"><div className="m-bar absolute inset-y-0 w-2/5 rounded-round bg-action-primary" /></div>;
