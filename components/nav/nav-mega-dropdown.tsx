'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { NavMegaColumn } from '@/lib/nav/move-nav-config';
import { cn } from '@/lib/utils';

type NavMegaDropdownProps = {
  label: string;
  /** Optional landing page when clicking the label (dropdown still opens on chevron/hover). */
  href?: string;
  columns: NavMegaColumn[];
  panelWidth?: 'sm' | 'md' | 'lg';
};

const WIDTH_CLASS = {
  sm: 'w-[min(92vw,360px)]',
  md: 'w-[min(92vw,480px)]',
  lg: 'w-[min(92vw,560px)]',
} as const;

/**
 * Reusable mega-dropdown for Find Movers and Guides.
 * Hover opens on desktop; click toggles for keyboard and touch.
 */
export function NavMegaDropdown({
  label,
  href,
  columns,
  panelWidth = 'md',
}: NavMegaDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="inline-flex items-center gap-0.5">
        {href ? (
          <Link
            prefetch={false}
            href={href}
            className="font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            onClick={close}
          >
            {label}
          </Link>
        ) : (
          <span className="font-medium text-muted-foreground whitespace-nowrap">{label}</span>
        )}
        <button
          type="button"
          className="p-0.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[28px] flex items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          aria-label={open ? `Close ${label} menu` : `Open ${label} menu`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown
            className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </div>

      <div
        className={cn(
          'absolute left-0 top-full pt-2 z-50 transition-opacity duration-150',
          WIDTH_CLASS[panelWidth],
          open ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        )}
        aria-hidden={!open}
      >
        <div
          id={panelId}
          role="navigation"
          aria-label={`${label} navigation`}
          className="rounded-xl border bg-background shadow-lg p-4"
        >
          <div
            className={cn(
              'grid gap-5',
              columns.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'
            )}
          >
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {column.title}
                </p>
                <ul className="space-y-1" role="list">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        prefetch={false}
                        href={link.href}
                        className="group flex flex-col rounded-lg px-2 py-2 min-h-[44px] hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                        onClick={close}
                      >
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        {link.description ? (
                          <span className="text-xs text-muted-foreground leading-snug">
                            {link.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}