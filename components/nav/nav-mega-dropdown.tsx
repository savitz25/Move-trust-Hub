'use client';

import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MegaMenuPanel } from '@/components/nav/mega-menu-panel';
import { useMegaMenuHoverBridge } from '@/components/nav/use-mega-menu-panel';
import type { NavMegaColumn } from '@/lib/nav/move-nav-config';
import { cn } from '@/lib/utils';

type NavMegaDropdownProps = {
  label: string;
  href?: string;
  columns: NavMegaColumn[];
  panelWidth?: 'sm' | 'md' | 'lg';
  /** Align wide panels to trigger end (e.g. rightmost Guides item). */
  align?: 'start' | 'end';
};

const PANEL_WIDTH_PX = {
  sm: 360,
  md: 480,
  lg: 560,
} as const;

export function NavMegaDropdown({
  label,
  href,
  columns,
  panelWidth = 'md',
  align = 'start',
}: NavMegaDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const { openMenu, scheduleClose } = useMegaMenuHoverBridge(setOpen);

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

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
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

      <MegaMenuPanel
        open={open}
        triggerRef={containerRef}
        panelWidthPx={PANEL_WIDTH_PX[panelWidth]}
        align={align}
        panelId={panelId}
        ariaLabel={`${label} navigation`}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
      >
        <div className="rounded-xl border bg-background shadow-lg p-4">
          <div className={cn('grid gap-5', columns.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
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
      </MegaMenuPanel>
    </div>
  );
}