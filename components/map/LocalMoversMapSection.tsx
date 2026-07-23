import Link from 'next/link';
import { CheckCircle2, MapPin } from 'lucide-react';
import { LocalMoversMapLazy } from '@/components/map/LocalMoversMapLazy';
import { buildStatesMeta } from '@/lib/map/build-search-index';
import { isCuratedState } from '@/lib/local-movers/curated-states';
import { JsonLd } from '@/lib/seo/json-ld';

const SITE_URL = 'https://www.movetrusthub.com';

export function LocalMoversMapSection() {
  const statesMeta = buildStatesMeta();

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
      className="border-y bg-muted/20 py-14 md:py-16"
      aria-labelledby="local-movers-map-heading"
    >
      <JsonLd data={schema} />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Local mover coverage map
          </div>
          <h2
            id="local-movers-map-heading"
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-3"
          >
            Browse Local Movers by State &amp; County
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Click any state to open its full local movers landing page — county guides,
            mover counts, and tools. Use the list below if you prefer text links.
          </p>
        </div>

        <LocalMoversMapLazy statesMeta={statesMeta} />

        <nav
          className="mt-10 pt-8 border-t"
          aria-label="Browse local movers by state"
        >
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            All states
          </h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {statesMeta.map((state) => (
              <li key={state.slug}>
                <Link
                  href={state.href}
                  className="group flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-sm hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <span className="font-bold text-primary/70 text-xs tracking-wider shrink-0">
                    {state.code}
                  </span>
                  <span className="truncate group-hover:text-primary">{state.name}</span>
                  {isCuratedState(state.slug) && (
                    <CheckCircle2
                      className="h-3.5 w-3.5 text-emerald-600 shrink-0 ml-auto"
                      aria-label="Fully curated"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}