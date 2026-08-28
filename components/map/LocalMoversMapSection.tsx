'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MapPin } from 'lucide-react';
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
      aria-labelledby="local-movers-map-heading"
    >
      <JsonLd data={schema} />

      <div className="move-section-inner">
        <div className="mb-7 text-center md:mb-9">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Local mover coverage map
          </div>
          <h2
            id="local-movers-map-heading"
            className="mb-3 text-3xl font-semibold tracking-tight text-[#0A2540] md:text-4xl dark:text-white"
          >
            Explore moving research by state
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
            Click any state for county guides and FMCSA research tools.
            Prefer text? Use the directory grid below. Map color marks a landing page — not quality.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {statesMeta.length} state and D.C. research landings
          </p>
        </div>

        <LocalMoversMapLazy
          statesMeta={statesMeta}
          viewMode={allLandingsEquivalent ? 'all' : viewMode}
          onViewModeChange={allLandingsEquivalent ? undefined : setViewMode}
          hideCoverageToggle={allLandingsEquivalent}
        />

        <nav
          className="mt-10 border-t border-border/70 pt-8"
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
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
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
                  'rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
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
                  {isCuratedState(state.slug) ? (
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
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              View full local movers hub →
            </Link>
          </p>
        </nav>
      </div>
    </section>
  );
}
