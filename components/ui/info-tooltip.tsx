'use client';

import Link from 'next/link';
import { Info } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export type InfoTooltipProps = {
  /** Short title shown at the top of the panel */
  title: string;
  /** 1–3 sentence explanation */
  description: string;
  /** Optional methodology / deep-dive link */
  learnMoreHref?: string;
  learnMoreLabel?: string;
  className?: string;
  /** Accessible name for the trigger (defaults to title) */
  triggerLabel?: string;
  /** Prefer open above the icon when true (e.g. near bottom of cards) */
  preferTop?: boolean;
};

/**
 * Shared Trust Hub info popover — hover (desktop) + tap (mobile).
 * Clean title + body + optional “Learn more” link; no native title truncation.
 */
export function InfoTooltip({
  title,
  description,
  learnMoreHref,
  learnMoreLabel = 'Learn more →',
  className,
  triggerLabel,
  preferTop = false,
}: InfoTooltipProps) {
  const id = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span
      ref={rootRef}
      className={cn('relative inline-flex items-center align-middle', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
          'text-muted-foreground/80 transition-colors',
          'hover:bg-muted hover:text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
        )}
        aria-label={triggerLabel ?? `About ${title}`}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open ? (
        <span
          id={id}
          role="tooltip"
          className={cn(
            'absolute left-1/2 z-[80] w-72 max-w-[min(18rem,calc(100vw-1.5rem))] -translate-x-1/2',
            'rounded-xl border border-border bg-popover p-3.5 text-popover-foreground shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-100',
            preferTop ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          <span className="block text-sm font-semibold leading-snug tracking-tight text-foreground">
            {title}
          </span>
          <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
            {description}
          </span>
          {learnMoreHref ? (
            <Link
              href={learnMoreHref}
              className="mt-2.5 inline-flex text-xs font-semibold text-primary underline-offset-2 hover:underline"
              onClick={() => setOpen(false)}
            >
              {learnMoreLabel}
            </Link>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}