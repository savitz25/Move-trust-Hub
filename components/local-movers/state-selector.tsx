'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';
import type { LocalState } from '@/lib/local-movers/types';
import { getStatePath, stateHasCounties } from '@/lib/local-movers/index';
import { getCountiesForState } from '@/lib/local-movers/geography/index';

export function StateSelector({ states }: { states: LocalState[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return states;
    return states.filter(
      (state) =>
        state.name.toLowerCase().includes(q) ||
        state.code.toLowerCase().includes(q)
    );
  }, [query, states]);

  return (
    <div>
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search states..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Search states"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((state) => {
          const hasCounties = stateHasCounties(state.slug);
          const countyCount = hasCounties
            ? getCountiesForState(state.slug).length
            : 0;

          return (
            <Link
              key={state.slug}
              href={getStatePath(state.slug)}
              className="group rounded-xl border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-primary/70 tracking-wider">
                  {state.code}
                </span>
                {hasCounties && (
                  <span className="text-[10px] text-muted-foreground">
                    {countyCount} counties
                  </span>
                )}
              </div>
              <div className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug">
                {state.name}
              </div>
              {!hasCounties && (
                <div className="text-[10px] text-muted-foreground mt-1">Coming soon</div>
              )}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No states match &ldquo;{query}&rdquo;
        </p>
      )}

      <div className="mt-8 rounded-xl border bg-muted/30 p-4 flex items-start gap-3">
        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          All <strong className="text-foreground">50 states</strong> include county-level
          local mover guides with 5–10 vetted companies per county. Select a state above
          to browse counties in your area.
        </p>
      </div>
    </div>
  );
}