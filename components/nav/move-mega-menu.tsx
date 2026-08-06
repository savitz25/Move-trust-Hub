'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MegaMenuPanel } from '@/components/nav/mega-menu-panel';
import { useMegaMenuHoverBridge } from '@/components/nav/use-mega-menu-panel';
import type { MoveMegaNavItem } from '@/lib/nav/move-mega-menu-config';
import { cn } from '@/lib/utils';

const PANEL_WIDTH_PX = {
  sm: 380,
  md: 520,
  lg: 640,
} as const;

type Props = {
  item: MoveMegaNavItem;
  /** Active route highlight on trigger */
  active?: boolean;
};

/** Desktop primary nav ink — brand navy (must beat muted header utilities) */
const NAV_INK = '#0A2540';
const NAV_ORANGE = '#FF5A1F';

/**
 * Move mega menu — design system: high-contrast navy text, orange accents,
 * soft elevation, independent-research tone.
 */
export function MoveMegaMenu({ item, active = false }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const { openMenu, scheduleClose } = useMegaMenuHoverBridge(setOpen, 100);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      const panel = document.getElementById(panelId);
      if (panel?.contains(target)) return;
      setOpen(false);
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
  }, [panelId]);

  const isHot = active || open;
  const navColor = isHot ? NAV_ORANGE : NAV_INK;

  const triggerClass = cn(
    'font-medium whitespace-nowrap rounded-sm transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    isHot && 'font-semibold',
    // Hover/focus orange — !important so utilities cannot leave links washed out
    'hover:!text-[#FF5A1F] focus-visible:!text-[#FF5A1F]'
  );

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <div className="inline-flex items-center gap-0.5">
        <Link
          prefetch={false}
          href={item.href}
          className={triggerClass}
          style={{ color: navColor }}
          aria-current={active ? 'page' : undefined}
          onClick={close}
        >
          {item.label}
        </Link>
        <button
          type="button"
          className={cn(
            'flex min-h-11 min-w-9 items-center justify-center rounded-sm p-0.5 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'hover:!text-[#FF5A1F] focus-visible:!text-[#FF5A1F]'
          )}
          style={{ color: navColor }}
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          aria-label={open ? `Close ${item.label} menu` : `Open ${item.label} menu`}
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown
            className={cn(
              'h-3.5 w-3.5 transition-transform duration-200',
              open && 'rotate-180'
            )}
            style={{ color: 'inherit' }}
            aria-hidden
          />
        </button>
      </div>

      <MegaMenuPanel
        open={open}
        triggerRef={containerRef}
        panelWidthPx={PANEL_WIDTH_PX[item.panelWidth ?? 'md']}
        align="start"
        panelId={panelId}
        ariaLabel={`${item.label} menu`}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div
          className={cn(
            'overflow-hidden rounded-2xl border border-border/80 bg-white',
            'shadow-[0_12px_40px_-12px_rgb(10_37_64_/_0.18),0_4px_12px_-4px_rgb(10_37_64_/_0.08)]',
            'ring-1 ring-primary/10'
          )}
        >
          {/* Orange top accent */}
          <div
            className="h-1 w-full bg-gradient-to-r from-primary via-[#FF7A4D] to-primary"
            aria-hidden
          />

          <div className="p-4 sm:p-5">
            <div
              className={cn(
                'grid gap-5',
                item.columns.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'
              )}
            >
              {item.columns.map((column) => (
                <div key={column.title}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-800">
                    {column.title}
                  </p>
                  <ul className="space-y-0.5" role="list">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          prefetch={false}
                          href={link.href}
                          className={cn(
                            'group flex min-h-[44px] flex-col rounded-xl border border-transparent px-2.5 py-2',
                            'transition-colors hover:border-primary/20 hover:bg-primary/[0.04]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
                          )}
                          onClick={close}
                        >
                          <span className="text-sm font-semibold text-slate-800 group-hover:text-primary">
                            {link.label}
                          </span>
                          {link.description ? (
                            <span className="mt-0.5 text-xs leading-snug text-slate-600">
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

            {item.note ? (
              <p className="mt-4 border-t border-border/70 pt-3 text-xs leading-relaxed text-slate-600">
                {item.note}
              </p>
            ) : null}

            {item.cta ? (
              <div className={cn(item.note ? 'mt-3' : 'mt-4 border-t border-border/70 pt-3')}>
                <Link
                  prefetch={false}
                  href={item.cta.href}
                  onClick={close}
                  className={cn(
                    'move-cta inline-flex min-h-10 w-full items-center justify-center rounded-xl px-4',
                    'text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2'
                  )}
                  style={{ backgroundColor: '#FF5A1F', color: '#FFFFFF' }}
                >
                  {item.cta.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </MegaMenuPanel>
    </div>
  );
}
