'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronDown, FileText, Search, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  filterStateNavGroups,
  getDestinationsMenuData,
} from '@/lib/nav/destinations-menu-data';

type Props = {
  onClose: () => void;
  onRequestQuote?: () => void;
};

export function DestinationsMobileNav({ onClose, onRequestQuote }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [openSection, setOpenSection] = useState<'states' | 'routes' | 'all' | null>(null);
  const [openFeaturedState, setOpenFeaturedState] = useState<string | null>(null);
  const [stateQuery, setStateQuery] = useState('');
  const menuData = useMemo(() => getDestinationsMenuData(), []);

  const filteredAllStates = useMemo(
    () => filterStateNavGroups(menuData.allStatesAlphabetical, stateQuery),
    [menuData.allStatesAlphabetical, stateQuery]
  );

  const toggleSection = (section: 'states' | 'routes' | 'all') => {
    setOpenSection((current) => (current === section ? null : section));
  };

  return (
    <div className="border-b border-border/50 pb-2 mb-1">
      <button
        type="button"
        className="w-full py-3 min-h-[44px] flex items-center justify-between font-medium text-muted-foreground hover:text-foreground"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <span>Destinations</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {expanded ? (
        <div className="pl-1 pb-2 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              prefetch={false}
              href="/resources/fmcsa"
              className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs font-medium min-h-[44px]"
              onClick={onClose}
            >
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              Verify DOT
            </Link>
            <Link
              prefetch={false}
              href="/companies?sort=rating"
              className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2.5 text-xs font-medium min-h-[44px]"
              onClick={onClose}
            >
              <Star className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              Leave Review
            </Link>
          </div>

          <Button
            size="sm"
            className="w-full gap-2 min-h-[44px] bg-primary hover:bg-primary/90"
            onClick={() => {
              onRequestQuote?.();
              onClose();
            }}
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Get Free Moving Quotes
          </Button>

          <div className="rounded-lg border border-border/50 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20 min-h-[44px]"
              aria-expanded={openSection === 'states'}
              onClick={() => toggleSection('states')}
            >
              Popular States
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${openSection === 'states' ? 'rotate-180' : ''}`}
              />
            </button>
            {openSection === 'states' ? (
              <div className="px-2 pb-2 space-y-1">
                {menuData.featuredStates.map((state) => (
                  <div key={state.cluster.slug}>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between py-2 px-1 text-sm text-muted-foreground hover:text-primary min-h-[40px]"
                      aria-expanded={openFeaturedState === state.cluster.slug}
                      onClick={() =>
                        setOpenFeaturedState((s) =>
                          s === state.cluster.slug ? null : state.cluster.slug
                        )
                      }
                    >
                      <span>
                        {state.cluster.displayName}
                        <span className="text-xs ml-1">({state.cityCount})</span>
                      </span>
                      <ChevronDown
                        className={`h-3 w-3 transition-transform ${openFeaturedState === state.cluster.slug ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFeaturedState === state.cluster.slug ? (
                      <div className="pl-2 pb-1 space-y-1">
                        <Link
                          prefetch={false}
                          href={state.hubPath}
                          className="block py-1 text-xs font-medium text-primary"
                          onClick={onClose}
                        >
                          {state.cluster.displayName} hub →
                        </Link>
                        {state.featuredCities.map((city) => (
                          <Link
                            key={city.href}
                            prefetch={false}
                            href={city.href}
                            className="block py-1 text-xs text-muted-foreground hover:text-primary"
                            onClick={onClose}
                          >
                            {city.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-border/50 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20 min-h-[44px]"
              aria-expanded={openSection === 'routes'}
              onClick={() => toggleSection('routes')}
            >
              Popular Routes
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${openSection === 'routes' ? 'rotate-180' : ''}`}
              />
            </button>
            {openSection === 'routes' ? (
              <div className="px-2 pb-2 space-y-1">
                {menuData.popularRoutes.map((route) => (
                  <Link
                    key={route.href}
                    prefetch={false}
                    href={route.href}
                    className="block py-2 px-1 text-sm text-muted-foreground hover:text-primary"
                    onClick={onClose}
                  >
                    {route.label}
                    <span className="block text-[10px] text-muted-foreground">{route.distance}</span>
                  </Link>
                ))}
                <Link
                  prefetch={false}
                  href="/resources/routes"
                  className="block py-2 px-1 text-xs font-medium text-primary"
                  onClick={onClose}
                >
                  All route guides →
                </Link>
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-border/50 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted/20 min-h-[44px]"
              aria-expanded={openSection === 'all'}
              onClick={() => toggleSection('all')}
            >
              All States A–Z
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${openSection === 'all' ? 'rotate-180' : ''}`}
              />
            </button>
            {openSection === 'all' ? (
              <div className="px-2 pb-2">
                <label className="relative block my-2">
                  <Search
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={stateQuery}
                    onChange={(e) => setStateQuery(e.target.value)}
                    placeholder="Search states…"
                    aria-label="Search destination states"
                    className="w-full rounded-md border bg-background pl-8 pr-3 py-2 text-sm min-h-[40px]"
                  />
                </label>
                <div className="max-h-48 overflow-y-auto overscroll-contain space-y-1">
                  {filteredAllStates.map((state) => (
                    <Link
                      key={state.cluster.slug}
                      prefetch={false}
                      href={state.hubPath}
                      className="block py-1.5 px-1 text-sm text-muted-foreground hover:text-primary min-h-[36px]"
                      onClick={onClose}
                    >
                      {state.cluster.displayName}
                      <span className="text-xs ml-1">({state.cityCount})</span>
                    </Link>
                  ))}
                  {filteredAllStates.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-2 text-center">
                      No states match
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <Link
            prefetch={false}
            href="/moving-to"
            className="block text-center text-sm font-medium text-primary py-2 min-h-[44px] flex items-center justify-center"
            onClick={onClose}
          >
            Browse all destination guides →
          </Link>
        </div>
      ) : null}
    </div>
  );
}