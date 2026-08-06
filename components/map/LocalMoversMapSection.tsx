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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Browse Local Movers by State & County',
    description:
      'Interactive map of U.S. states and counties linking to local mover guides with vetted companies, ratings, and FMCSA licensing data.',
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
      className="border-y border-border/60 bg-gradient-to-b from-background via-orange-50/20 to-muted/15 py-14 md:py-16"
      aria-labelledby="local-movers-map-heading"
    >
      <JsonLd data={schema} />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center md:mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Local mover coverage map
          </div>
          <h2
            id="local-movers-map-heading"
            className="mb-3 text-3xl font-semibold tracking-tight text-[#0A2540] md:text-4xl dark:text-white"
          >
            Browse local movers by state &amp; county
          </h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">
            Click any state for county guides, mover counts, and FMCSA research tools.
            Prefer text? Use the directory grid below.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            {curatedCount} fully curated states · {statesMeta.length} total landings
          </p>
        </div>

        <LocalMoversMapLazy
          statesMeta={statesMeta}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
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
                {viewMode === 'curated'
                  ? `Showing ${listedStates.length} fully curated guides`
                  : `Showing all ${listedStates.length} states`}
              </p>
            </div>
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
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {listedStates.map((state) => (
              <li key={state.slug}>
                <Link
                  href={state.href}
                  className={cn(
                    'group move-card-glow flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-3 py-2.5 text-sm',
                    'transition-colors hover:border-primary/40 hover:text-primary',
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
                      aria-label="Fully curated"
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
