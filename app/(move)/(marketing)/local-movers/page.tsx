import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { StateSelector } from '@/components/local-movers/state-selector-loader';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { PageHeroCta } from '@/components/conversion/page-hero-cta';
import { TrustBadges } from '@/components/trust/trust-badges';
import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import { localStates } from '@/lib/local-movers/states';
import { getCountiesForState, stateHasCounties } from '@/lib/local-movers/geography/index';
import { buildHubPageMetadata } from '@/lib/local-movers/index';
import { getCountyPath } from '@/lib/local-movers/paths';
import { LocalMoversPlaceSearch } from '@/components/local-movers/local-movers-place-search';

export const dynamic = 'force-static';

export const metadata: Metadata = buildHubPageMetadata();

const featuredCounties = [
  { stateSlug: 'florida', countySlug: 'miami-dade', label: 'Miami-Dade, FL' },
  { stateSlug: 'georgia', countySlug: 'fulton', label: 'Fulton, GA' },
  { stateSlug: 'texas', countySlug: 'harris', label: 'Harris, TX' },
  { stateSlug: 'california', countySlug: 'los-angeles', label: 'Los Angeles, CA' },
  { stateSlug: 'new-york', countySlug: 'kings', label: 'Kings, NY' },
  { stateSlug: 'north-carolina', countySlug: 'mecklenburg', label: 'Mecklenburg, NC' },
];

export default function LocalMoversHubPage() {
  const statesForSelector = localStates.map((state) => {
    const hasCounties = stateHasCounties(state.slug);
    return {
      ...state,
      hasCounties,
      countyCount: hasCounties ? getCountiesForState(state.slug).length : 0,
    };
  });

  const totalCounties = statesForSelector.reduce(
    (sum, state) => sum + state.countyCount,
    0
  );

  return (
    <>
      <LocalMoversSchema
        title="Local Movers by State & County — Find Trusted Movers Near You 2026"
        description="Browse 3,100+ county-level local mover guides across all 50 states. FMCSA licensing, ratings, cost estimates, and moving tips."
        path="/local-movers"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Local Movers', path: '/local-movers' },
        ]}
      />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <LocalMoversBreadcrumbs
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Local Movers' }]}
        />

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            County-level local mover guides
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Local Movers Near You
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Compare top-rated local moving companies by county. Each guide includes
            ratings, services, FMCSA licensing details, and links to full mover profiles.
            Use our{' '}
            <Link href="/moving-calculator" className="text-primary font-medium hover:underline">
              moving calculator
            </Link>{' '}
            for interstate estimates or browse the{' '}
            <Link href="/companies" className="text-primary font-medium hover:underline">
              national directory
            </Link>
            .
          </p>
          <div className="mt-6">
            <PageHeroCta />
          </div>
          <div className="mt-6">
            <LocalMoversPlaceSearch />
          </div>
          <TrustBadges variant="compact" className="mt-6" />
        </div>

        <section className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Popular counties
          </h2>
          <div className="flex flex-wrap gap-2">
            {featuredCounties.map((item) => (
              <Link
                key={`${item.stateSlug}-${item.countySlug}`}
                href={getCountyPath(item.stateSlug, item.countySlug)}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {item.label}
                <ArrowRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Select your state
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            All 50 states covered — {totalCounties.toLocaleString()} county guides with
            5–10 vetted local movers each (major metros up to 10).
          </p>
          <StateSelector states={statesForSelector} />
        </section>

        <LocalMoversCta />
      </div>
    </>
  );
}