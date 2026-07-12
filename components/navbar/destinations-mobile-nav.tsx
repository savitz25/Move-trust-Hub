'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ChevronDown,
  Calculator,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DestinationsCollapsibleSection } from '@/components/navbar/destinations-collapsible-section';
import {
  filterStateNavGroups,
  getDestinationsMenuData,
} from '@/lib/nav/destinations-menu-data';

type Props = {
  onClose: () => void;
};

const tapTarget =
  'min-h-[48px] flex items-center rounded-md px-2 -mx-2 transition-colors hover:bg-muted/40 active:bg-muted/60';

export function DestinationsMobileNav({ onClose }: Props) {
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
    <div className="border-b border-border/50 pb-3 mb-1">
      <button
        type="button"
        className={`w-full ${tapTarget} justify-between font-medium text-muted-foreground hover:text-foreground`}
        aria-expanded={expanded}
        aria-controls="destinations-mobile-panel"
        onClick={() => setExpanded((v) => !v)}
      >
        <span>Destinations</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="destinations-mobile-panel"
        role="navigation"
        aria-label="Destinations navigation"
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pl-1 pb-3 space-y-4 pt-1">
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                prefetch={false}
                href="/verify-dot"
                className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 text-xs font-medium min-h-[48px] active:bg-muted/50 transition-colors"
                onClick={onClose}
                aria-label="Verify a DOT number on FMCSA"
              >
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                Verify DOT
              </Link>
              <Link
                prefetch={false}
                href="/review"
                className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 text-xs font-medium min-h-[48px] active:bg-muted/50 transition-colors"
                onClick={onClose}
                aria-label="Leave a review for a moving company"
              >
                <Star className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                Leave Review
              </Link>
            </div>

            <Button
              size="default"
              className="w-full gap-2 min-h-[52px] bg-primary hover:bg-primary/90 shadow-md text-sm font-semibold"
              asChild
            >
              <Link
                prefetch={false}
                href="/moving-calculator"
                onClick={onClose}
                aria-label="Use free moving calculator"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                Free Moving Calculator
              </Link>
            </Button>

            <DestinationsCollapsibleSection
              title="Popular States"
              open={openSection === 'states'}
              onToggle={() => toggleSection('states')}
            >
              <div className="space-y-1">
                {menuData.featuredStates.map((state) => (
                  <div key={state.cluster.slug}>
                    <button
                      type="button"
                      className={`w-full justify-between text-sm text-muted-foreground hover:text-primary ${tapTarget}`}
                      aria-expanded={openFeaturedState === state.cluster.slug}
                      onClick={() =>
                        setOpenFeaturedState((s) =>
                          s === state.cluster.slug ? null : state.cluster.slug
                        )
                      }
                    >
                      <span>
                        {state.cluster.displayName}
                        <span className="text-xs ml-1 text-muted-foreground">
                          ({state.cityCount})
                        </span>
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          openFeaturedState === state.cluster.slug ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        openFeaturedState === state.cluster.slug
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-3 pb-2 space-y-0.5">
                          <Link
                            prefetch={false}
                            href={state.hubPath}
                            className={`text-xs font-medium text-primary ${tapTarget}`}
                            onClick={onClose}
                          >
                            {state.cluster.displayName} hub →
                          </Link>
                          {state.featuredCities.map((city) => (
                            <Link
                              key={city.href}
                              prefetch={false}
                              href={city.href}
                              className={`text-sm text-muted-foreground hover:text-primary ${tapTarget}`}
                              onClick={onClose}
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DestinationsCollapsibleSection>

            <DestinationsCollapsibleSection
              title="Popular Routes"
              open={openSection === 'routes'}
              onToggle={() => toggleSection('routes')}
            >
              <div className="space-y-1">
                {menuData.popularRoutes.map((route) => (
                  <Link
                    key={route.href}
                    prefetch={false}
                    href={route.href}
                    className={`text-sm hover:text-primary ${tapTarget} ${
                      route.featured
                        ? 'border border-primary/20 bg-primary/5 rounded-lg px-3 -mx-1'
                        : 'text-muted-foreground'
                    }`}
                    onClick={onClose}
                    aria-label={
                      route.featured
                        ? `${route.label}, high-demand corridor, ${route.distance}`
                        : `${route.label}, ${route.distance}`
                    }
                  >
                    <span className="flex flex-col gap-0.5 w-full">
                      <span className="flex items-center gap-1.5 font-medium">
                        {route.label}
                        {route.featured ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-px text-[9px] font-semibold uppercase text-primary">
                            <TrendingUp className="h-2.5 w-2.5" aria-hidden="true" />
                            Top
                          </span>
                        ) : null}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-normal">
                        {route.distance}
                      </span>
                    </span>
                  </Link>
                ))}
                <Link
                  prefetch={false}
                  href="/resources/routes"
                  className={`text-xs font-medium text-primary ${tapTarget}`}
                  onClick={onClose}
                >
                  All route guides →
                </Link>
              </div>
            </DestinationsCollapsibleSection>

            <DestinationsCollapsibleSection
              title="All States A–Z"
              open={openSection === 'all'}
              onToggle={() => toggleSection('all')}
            >
              <label className="relative block mb-3">
                <span className="sr-only">Search destination states</span>
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={stateQuery}
                  onChange={(e) => setStateQuery(e.target.value)}
                  placeholder="Search states…"
                  aria-label="Search destination states"
                  autoComplete="off"
                  className="w-full rounded-lg border-2 border-primary/20 bg-primary/5 pl-10 pr-3 py-3 text-sm min-h-[48px] focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <div
                className="max-h-52 overflow-y-auto overscroll-contain space-y-0.5"
                aria-live="polite"
              >
                {filteredAllStates.map((state) => (
                  <Link
                    key={state.cluster.slug}
                    prefetch={false}
                    href={state.hubPath}
                    className={`text-sm text-muted-foreground hover:text-primary ${tapTarget}`}
                    onClick={onClose}
                  >
                    {state.cluster.displayName}
                    <span className="text-xs ml-1">({state.cityCount})</span>
                  </Link>
                ))}
                {filteredAllStates.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-3 text-center" role="status">
                    No states match
                  </p>
                ) : null}
              </div>
            </DestinationsCollapsibleSection>

            <Link
              prefetch={false}
              href="/moving-to"
              className={`justify-center text-sm font-semibold text-primary border border-primary/20 bg-primary/5 rounded-lg ${tapTarget}`}
              onClick={onClose}
            >
              Browse All Destinations
              <ArrowRight className="h-4 w-4 ml-1.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}