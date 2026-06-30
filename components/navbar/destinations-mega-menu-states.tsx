'use client';

import Link from 'next/link';
import { memo, useMemo, useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import {
  filterStateNavGroups,
  type StateNavGroup,
} from '@/lib/nav/destinations-menu-data';

type Props = {
  states: StateNavGroup[];
  onNavigate?: () => void;
  variant?: 'featured' | 'accordion';
};

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
    <ul className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
      {cities.map((city) => (
        <li key={city.href}>
          <Link
            prefetch={false}
            href={city.href}
            className="text-primary hover:underline font-medium"
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
            className="text-muted-foreground hover:text-primary text-[11px]"
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
}: Props) {
  const [query, setQuery] = useState('');

  const filteredStates = useMemo(
    () => (variant === 'accordion' ? filterStateNavGroups(states, query) : states),
    [states, query, variant]
  );

  if (variant === 'featured') {
    return (
      <div>
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
                className="font-medium text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
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
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          All States A–Z
        </div>
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {filteredStates.length}/{states.length}
        </span>
      </div>

      <label className="relative block mb-3">
        <Search
          className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search states…"
          aria-label="Search destination states"
          className="w-full rounded-md border bg-background pl-8 pr-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </label>

      <div className="max-h-[min(52vh,420px)] overflow-y-auto overscroll-contain pr-1 -mr-1">
        {filteredStates.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">
            No states match &ldquo;{query}&rdquo;
          </p>
        ) : (
          filteredStates.map((state) => (
            <details
              key={state.cluster.slug}
              className="group border-b border-border/40 last:border-0"
            >
              <summary className="cursor-pointer list-none py-2 text-sm font-medium hover:text-primary transition-colors flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <span>
                  {state.cluster.displayName}
                  <span className="text-muted-foreground font-normal text-xs ml-1.5">
                    {state.cityCount}
                  </span>
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground group-open:rotate-90 transition-transform shrink-0" />
              </summary>
              <div className="pb-2 pl-1">
                <Link
                  prefetch={false}
                  href={state.hubPath}
                  className="text-xs font-medium text-primary hover:underline mb-1.5 inline-block"
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
    </div>
  );
});