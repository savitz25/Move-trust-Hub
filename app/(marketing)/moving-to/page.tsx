import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import {
  getClusterMarkets,
  getMarketPath,
  priorityMarketsForNav,
} from '@/lib/destinations/markets';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildDestinationsIndexSchemaGraph } from '@/lib/seo/build-destination-index-schema';
import { buildDestinationsIndexMetadata } from '@/lib/seo/destination-seo';

export const metadata: Metadata = buildDestinationsIndexMetadata();

export default function MovingToIndexPage() {
  const published = new Set(getPublishedCityHubSlugs());
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
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          High-intent inbound guides for America&apos;s fastest-growing relocation markets.
          Each hub includes cost tables, route calculators, county-level mover directories,
          and free quote matching from FMCSA-licensed carriers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topMarkets.map((market) => {
          const path = getMarketPath(market);
          const isLive = published.has(market.slug);
          const subCities = market.isClusterParent
            ? getClusterMarkets(market.slug)
            : [];

          return (
            <div
              key={market.slug}
              className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="font-semibold text-lg">
                  {isLive || (market.isClusterParent && subCities.some((s) => published.has(s.slug))) ? (
                    <Link
                      href={isLive ? path : `/moving-to/${market.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {market.displayName}
                      {market.stateCode ? `, ${market.stateCode}` : ''}
                    </Link>
                  ) : (
                    <span>
                      {market.displayName}
                      {market.stateCode ? `, ${market.stateCode}` : ''}
                    </span>
                  )}
                </h2>
                {isLive || (market.isClusterParent && subCities.some((s) => published.has(s.slug))) ? (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 shrink-0">
                    {isLive ? 'Live' : 'Partial'}
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
                    Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{market.inboundGrowthStat}</p>
              {isLive || (market.isClusterParent && subCities.some((s) => published.has(s.slug))) ? (
                <Link
                  href={isLive ? path : `/moving-to/${market.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {isLive ? 'View guide' : 'View cluster'}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ) : null}
              {subCities.length > 0 && (
                <ul className="mt-3 pt-3 border-t text-xs text-muted-foreground space-y-1">
                  {subCities.slice(0, 6).map((sub) => {
                    const subPath = getMarketPath(sub);
                    const subLive = published.has(sub.slug);
                    return (
                      <li key={sub.slug}>
                        {subLive ? (
                          <Link
                            href={subPath}
                            className="text-primary hover:underline font-medium"
                          >
                            {sub.displayName}
                          </Link>
                        ) : (
                          sub.displayName
                        )}
                      </li>
                    );
                  })}
                  {subCities.length > 6 && (
                    <li>+{subCities.length - 6} more cities</li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}