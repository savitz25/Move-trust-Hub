'use client';

import Link from 'next/link';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import {
  filterStateNavGroups,
  type StateNavGroup,
} from '@/lib/nav/destinations-menu-data';

type Props = {
  states: StateNavGroup[];
  onNavigate?: () => void;
  variant?: 'featured' | 'accordion';
  /** Focus search when mega menu opens (desktop A–Z column). */
  focusSearch?: boolean;
};

const linkHover =
  'rounded-md px-2 py-1 -mx-2 transition-colors hover:bg-muted/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

const StateCityLinks = memo(function StateCityLinks({
  state,
  cities,
  onNavigate,
}: {
  state: StateNavGroup;
  cities: StateNavGroup['featuredCities'];
  onNavigate?: () => void;
}) {
  if (!cities.length) return null;

  return (
    <ul className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-0.5 text-xs">
      {cities.map((city) => (
        <li key={city.href}>
          <Link
            prefetch={false}
            href={city.href}
            className={`block font-medium text-primary/90 ${linkHover}`}
            onClick={onNavigate}
          >
            {city.name}
          </Link>
        </li>
      ))}
      {state.cityCount > cities.length ? (
        <li className="col-span-2">
          <Link
            prefetch={false}
            href={state.hubPath}
            className={`inline-block text-muted-foreground text-[11px] ${linkHover}`}
            onClick={onNavigate}
          >
            +{state.cityCount - cities.length} more cities →
          </Link>
        </li>
      ) : null}
    </ul>
  );
});

export const DestinationsMegaMenuStates = memo(function DestinationsMegaMenuStates({
  states,
  onNavigate,
  variant = 'featured',
  focusSearch = false,
}: Props) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  const filteredStates = useMemo(
    () => (variant === 'accordion' ? filterStateNavGroups(states, query) : states),
    [states, query, variant]
  );

  useEffect(() => {
    if (focusSearch && variant === 'accordion') {
      const timer = window.setTimeout(() => searchRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
  }, [focusSearch, variant]);

  if (variant === 'featured') {
    return (
      <nav aria-label="Popular destination states">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          Popular States
        </div>
        <ul className="space-y-3">
          {states.map((state) => (
            <li key={state.cluster.slug}>
              <Link
                prefetch={false}
                href={state.hubPath}
                className={`font-medium text-sm inline-flex items-center gap-1 ${linkHover}`}
                onClick={onNavigate}
              >
                {state.cluster.displayName}
                <span className="text-muted-foreground font-normal text-xs">
                  ({state.cityCount} guides)
                </span>
              </Link>
              <StateCityLinks
                state={state}
                cities={state.featuredCities}
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="All destination states">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          All States A–Z
        </div>
        <span className="text-[10px] text-muted-foreground tabular-nums" aria-live="polite">
          {filteredStates.length}/{states.length}
        </span>
      </div>

      <label className="relative block mb-3">
        <span className="sr-only">Search destination states</span>
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search states (e.g. Florida, TX)…"
          aria-label="Search destination states"
          autoComplete="off"
          className="w-full rounded-lg border-2 border-primary/20 bg-primary/5 pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </label>
      <p className="text-[10px] text-muted-foreground mb-2 -mt-1">
        Press <kbd className="rounded border px-1 py-px text-[9px] font-mono">/</kbd> to focus search
      </p>

      <div
        className="max-h-[min(48vh,380px)] overflow-y-auto overscroll-contain pr-1 -mr-1"
        role="list"
      >
        {filteredStates.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center" role="status">
            No states match &ldquo;{query}&rdquo;
          </p>
        ) : (
          filteredStates.map((state) => (
            <details
              key={state.cluster.slug}
              className="group border-b border-border/40 last:border-0"
            >
              <summary className={`cursor-pointer list-none py-2.5 text-sm font-medium flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden ${linkHover}`}>
                <span>
                  {state.cluster.displayName}
                  <span className="text-muted-foreground font-normal text-xs ml-1.5">
                    {state.cityCount}
                  </span>
                </span>
                <ArrowRight
                  className="h-3 w-3 text-muted-foreground group-open:rotate-90 transition-transform duration-200 shrink-0"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-2 pl-1 animate-in fade-in-0 duration-150">
                <Link
                  prefetch={false}
                  href={state.hubPath}
                  className={`text-xs font-medium text-primary mb-1.5 inline-block ${linkHover}`}
                  onClick={onNavigate}
                >
                  {state.cluster.displayName} hub →
                </Link>
                <StateCityLinks
                  state={state}
                  cities={state.previewCities}
                  onNavigate={onNavigate}
                />
              </div>
            </details>
          ))
        )}
      </div>
    </nav>
  );
});