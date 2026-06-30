'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { getDestinationsMenuData } from '@/lib/nav/destinations-menu-data';
import { DestinationsMegaMenuTools } from '@/components/navbar/destinations-mega-menu-tools';
import { DestinationsMegaMenuStates } from '@/components/navbar/destinations-mega-menu-states';
import { DestinationsMegaMenuRoutes } from '@/components/navbar/destinations-mega-menu-routes';

export function DestinationsMegaMenu({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuData = useMemo(() => getDestinationsMenuData(), []);

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
    function handleSlashFocus(event: KeyboardEvent) {
      if (!open || event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      event.preventDefault();
      const search = panelRef.current?.querySelector<HTMLInputElement>(
        'input[type="search"]'
      );
      search?.focus();
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleSlashFocus);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleSlashFocus);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="inline-flex items-center gap-0.5 group/trigger">
        <Link
          prefetch={false}
          href="/moving-to"
          className="font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
          onClick={close}
          aria-haspopup="true"
          aria-expanded={open}
        >
          Destinations
        </Link>
        <button
          type="button"
          className="p-0.5 text-muted-foreground hover:text-foreground transition-colors min-h-[44px] min-w-[28px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-sm"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="destinations-mega-menu-panel"
          aria-label={open ? 'Close destinations menu' : 'Open destinations menu'}
          onClick={() => setOpen((prev) => !prev)}
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Fixed height + opacity toggle — zero layout shift on open */}
      <div
        className={`absolute left-0 top-full pt-2 z-50 w-[min(94vw,920px)] h-[min(72vh,540px)] transition-opacity duration-150 ${
          open
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden={!open}
      >
        <div
          ref={panelRef}
          id="destinations-mega-menu-panel"
          role="navigation"
          aria-label="Destinations navigation"
          className="rounded-xl border bg-background shadow-lg flex flex-col h-full"
        >
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(180px,200px)_1fr_1fr_1.15fr] gap-6 flex-1 min-h-0 overflow-hidden">
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-1 border-b sm:border-b lg:border-b-0 lg:border-r border-border/50 pb-4 sm:pb-4 lg:pb-0 lg:pr-4 min-h-0">
              <DestinationsMegaMenuTools tools={menuData.quickTools} onNavigate={close} />
            </div>

            <div className="min-w-0 overflow-y-auto overscroll-contain">
              <DestinationsMegaMenuStates
                states={menuData.featuredStates}
                onNavigate={close}
                variant="featured"
              />
            </div>

            <div className="min-w-0 overflow-y-auto overscroll-contain">
              <DestinationsMegaMenuRoutes
                routes={menuData.popularRoutes}
                onNavigate={close}
                limit={10}
              />
            </div>

            <div className="min-w-0 sm:col-span-2 lg:col-span-1 overflow-y-auto overscroll-contain">
              <DestinationsMegaMenuStates
                states={menuData.allStatesAlphabetical}
                onNavigate={close}
                variant="accordion"
                focusSearch={open}
              />
            </div>
          </div>

          <div className="border-t border-border/50 px-5 py-3 bg-muted/20 shrink-0">
            <Link
              prefetch={false}
              href="/moving-to"
              className="inline-flex items-center justify-center gap-1.5 w-full text-sm font-semibold text-primary hover:underline min-h-[40px] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              onClick={close}
            >
              Browse All Destinations
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}