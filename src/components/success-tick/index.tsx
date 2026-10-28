"use client";

/** Success tick: stroke draw, 300ms. */
export const SuccessTick = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden><circle cx="20" cy="20" r="18" stroke="var(--color-status-success-solid)" strokeWidth="2" opacity=".35" /><path className="m-draw" d="M12 21l5.5 5.5L28 15" stroke="var(--color-status-success-solid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
