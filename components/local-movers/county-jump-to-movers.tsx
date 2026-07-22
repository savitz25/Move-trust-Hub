'use client';

import { useCallback, useEffect, useState } from 'react';
import { ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  countyLabel: string;
  moverCount?: number;
  /** DOM id of the listings section */
  targetId?: string;
  className?: string;
};

/**
 * In-hero jump control + sticky bar that stays visible until the
 * local movers list enters the viewport. Shared by all county pages.
 */
export function CountyJumpToMovers({
  countyLabel,
  moverCount,
  targetId = 'movers',
  className,
}: Props) {
  const [showSticky, setShowSticky] = useState(false);

  const scrollToMovers = useCallback(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Improve keyboard / AT focus after jump
    if (typeof el.focus === 'function') {
      const previousTabIndex = el.getAttribute('tabindex');
      if (previousTabIndex === null) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      if (previousTabIndex === null) {
        el.addEventListener(
          'blur',
          () => el.removeAttribute('tabindex'),
          { once: true }
        );
      }
    }
  }, [targetId]);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Sticky while the listings section is still below the viewport.
    // Hide once it intersects (or the user has scrolled past it).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const stillAbove =
          !entry.isIntersecting && entry.boundingClientRect.top > 0;
        setShowSticky(stillAbove);
      },
      {
        // Account for sticky site header so "reached" feels natural
        rootMargin: '-96px 0px 0px 0px',
        threshold: 0,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  const label =
    moverCount && moverCount > 0
      ? `View Local Movers in ${countyLabel} (${moverCount}) ↓`
      : `View Local Movers in ${countyLabel} ↓`;

  const shortLabel =
    moverCount && moverCount > 0
      ? `View ${moverCount} Local Movers ↓`
      : 'View Local Movers ↓';

  return (
    <>
      <div className={cn('flex flex-col gap-2', className)}>
        <button
          type="button"
          onClick={scrollToMovers}
          className={cn(
            'inline-flex w-full sm:w-auto items-center justify-center gap-2',
            'rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground',
            'hover:bg-primary/90 transition-colors shadow-sm',
            'min-h-[48px] focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
        >
          <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{label}</span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-90" aria-hidden="true" />
        </button>
        <p className="text-xs text-muted-foreground">
          Jump straight to verified listings — county costs, tips, and local rules stay below.
        </p>
      </div>

      {/* Sticky bar: mobile-first bottom bar; also works on desktop */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 pointer-events-none',
          'transition-transform duration-200 ease-out',
          showSticky ? 'translate-y-0' : 'translate-y-full'
        )}
        aria-hidden={!showSticky}
      >
        <div
          className={cn(
            'pointer-events-auto border-t bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_rgba(0,0,0,0.08)]',
            'px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
          )}
        >
          <div className="mx-auto max-w-3xl">
            <button
              type="button"
              onClick={scrollToMovers}
              tabIndex={showSticky ? 0 : -1}
              className={cn(
                'inline-flex w-full items-center justify-center gap-2',
                'rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground',
                'hover:bg-primary/90 transition-colors min-h-[48px]',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="sm:hidden">{shortLabel}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
