import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Route } from 'lucide-react';
import { priorityMarketsForNav } from '@/lib/destinations/markets';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { DestinationClusterCard } from '@/components/destinations/destination-cluster-card';
import { PageHeroCta } from '@/components/conversion/page-hero-cta';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildDestinationsIndexSchemaGraph } from '@/lib/seo/build-destination-index-schema';
import { buildDestinationsIndexMetadata } from '@/lib/seo/destination-seo';
import { getDestinationsMenuData } from '@/lib/nav/destinations-menu-data';

export const dynamic = 'force-static';

export const metadata: Metadata = buildDestinationsIndexMetadata();

export default function MovingToIndexPage() {
  const published = new Set(getPublishedCityHubSlugs());
  const { popularRoutes } = getDestinationsMenuData();
  const topMarkets = priorityMarketsForNav.filter(
    (market) => market.isClusterParent || !market.clusterParent
  );

  return (
    <>
      <JsonLd data={buildDestinationsIndexSchemaGraph()} />
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            Popular Destinations · 2026
          </div>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            Moving Destinations: City Guides, Costs &amp; Trusted Movers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6">
            High-intent inbound guides for America&apos;s fastest-growing relocation markets.
            Each hub includes cost tables, route calculators, county-level mover directories,
            and trusted mover research tools from FMCSA-licensed carriers.
          </p>
          <PageHeroCta
            tertiaryLabel="Explore Destination Guides"
            tertiaryHref="/moving-to"
          />
        </div>

        <section className="mb-10 rounded-2xl border bg-muted/20 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            <Route className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            Popular interstate routes
          </div>
          <div className="flex flex-wrap gap-2">
            {popularRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="inline-flex items-center rounded-full border bg-background px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="/resources/routes"
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              All route guides
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topMarkets.map((market) => (
            <DestinationClusterCard
              key={market.slug}
              market={market}
              publishedSlugs={published}
            />
          ))}
        </div>
      </div>
    </>
  );
}