'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { LocalMoversMapLazy } from '@/components/map/LocalMoversMapLazy';
import { buildStatesMeta } from '@/lib/map/build-search-index';
import { isCuratedState } from '@/lib/local-movers/curated-states';
import { JsonLd } from '@/lib/seo/json-ld';
import { cn } from '@/lib/utils';

const SITE_URL = 'https://www.movetrusthub.com';

/**
 * Homepage Phase 3 — Local mover coverage map + clean state directory.
 * Soft orange curated fills; curated / all-states toggle; compact grid.
 */
export function LocalMoversMapSection() {
  const statesMeta = useMemo(() => buildStatesMeta(), []);
  const [viewMode, setViewMode] = useState<'all' | 'curated'>('all');

  const listedStates = useMemo(() => {
    const sorted = [...statesMeta].sort((a, b) => a.name.localeCompare(b.name));
    if (viewMode === 'curated') return sorted.filter((s) => s.curated);
    return sorted;
  }, [statesMeta, viewMode]);

  const curatedCount = useMemo(
    () => statesMeta.filter((s) => s.curated).length,
    [statesMeta]
  );
  const allLandingsEquivalent = curatedCount === statesMeta.length;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Browse Local Movers by State & County',
    description:
      'Interactive map of U.S. states and counties linking to local mover research guides and FMCSA tools. Color marks a landing page, not a ranking.',
    numberOfItems: statesMeta.length,
    itemListElement: statesMeta.map((state, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: state.name,
      url: `${SITE_URL}${state.href}`,
    })),
  };

  return (
    <section
      className="move-section border-y border-border/60 bg-gradient-to-b from-background via-orange-50/15 to-muted/10"
      aria-label="State research map and directory"
    >
      <JsonLd data={schema} />

      <div className="move-section-inner">
        <div className="flex flex-col gap-8">
        <nav
          className="order-1 md:order-2 border-t border-border/70 pt-2 md:mt-0 md:border-t-0 md:pt-0"
          aria-label="Browse local movers by state"
        >
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                State directory
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {allLandingsEquivalent
                  ? `Showing ${listedStates.length} state and D.C. research landings`
                  : viewMode === 'curated'
                    ? `Showing ${listedStates.length} fully curated guides`
                    : `Showing all ${listedStates.length} states`}
              </p>
            </div>
            {allLandingsEquivalent ? null : (
            <div
              className="inline-flex rounded-xl border border-border/80 bg-background p-1"
              role="group"
              aria-label="State list filter"
            >
              <button
                type="button"
                onClick={() => setViewMode('curated')}
                className={cn(
                  'min-h-11 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  viewMode === 'curated'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-pressed={viewMode === 'curated'}
              >
                Fully curated
              </button>
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={cn(
                  'min-h-11 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
                  viewMode === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-pressed={viewMode === 'all'}
              >
                All states
              </button>
            </div>
            )}
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {listedStates.map((state) => (
              <li key={state.slug}>
                <Link
                  href={state.href}
                  data-intel-event="move_intel_state_click"
                  className={cn(
                    'group move-surface-card flex items-center gap-1.5 !rounded-xl px-3 py-2.5 text-sm',
                    'hover:text-primary',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  )}
                >
                  <span className="shrink-0 text-xs font-bold tracking-wider text-primary/80">
                    {state.code}
                  </span>
                  <span className="truncate font-medium group-hover:text-primary">
                    {state.name}
                  </span>
                  {!allLandingsEquivalent && isCuratedState(state.slug) ? (
                    <CheckCircle2
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-primary"
                      aria-label="State guide available"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-center text-sm">
            <Link
              href="/local-movers"
              className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              View full local movers hub →
            </Link>
          </p>
        </nav>
        <div className="order-2 md:order-1">
          <p className="mb-3 text-xs text-muted-foreground">
            {statesMeta.length} state and D.C. research landings. Map color marks a landing page — not quality.
            Prefer the directory list {allLandingsEquivalent ? 'above on small screens' : 'alongside the map'}.
          </p>
          <LocalMoversMapLazy
            statesMeta={statesMeta}
            viewMode={allLandingsEquivalent ? 'all' : viewMode}
            onViewModeChange={allLandingsEquivalent ? undefined : setViewMode}
            hideCoverageToggle={allLandingsEquivalent}
          />
        </div>
        </div>
      </div>
    </section>
  );
}
