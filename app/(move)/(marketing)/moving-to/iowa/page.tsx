import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { DestinationClusterHeroCta } from '@/components/destinations/destination-cluster-hero-cta';
import {
  iowaClusterContent,
  type IowaCorridorCity,
} from '@/lib/destinations/content/iowa-ia';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterMarkets,
  getMarketBySlug,
  getMarketPath,
} from '@/lib/destinations/markets';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildIowaClusterSchemaGraph } from '@/lib/seo/build-destination-index-schema';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

const content = iowaClusterContent;

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: `${content.seo.title} | Move Trust Hub` },
  description: content.seo.description,
  alternates: { canonical: `${SITE_URL}${content.seo.canonicalPath}` },
  openGraph: buildOpenGraph({
    title: content.seo.title,
    description: content.seo.description,
    url: `${SITE_URL}${content.seo.canonicalPath}`,
  }),
  twitter: buildTwitter({
    title: content.seo.title,
    description: content.seo.description,
  }),
  robots: { index: true, follow: true },
  category: 'Moving Destination Guides',
};

function CorridorCityGrid({
  cities,
  published,
}: {
  cities: IowaCorridorCity[];
  published: Set<string>;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cities.map((city) => {
        const market = getMarketBySlug(city.slug);
        const isLive = published.has(city.slug);
        const path = market ? getMarketPath(market) : `/moving-to/iowa/${city.slug}`;

        return (
          <div
            key={city.slug}
            className="rounded-xl border bg-card p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg">
                {isLive ? (
                  <Link href={path} className="hover:text-primary transition-colors">
                    {city.displayName}, IA
                  </Link>
                ) : (
                  <span>{city.displayName}, IA</span>
                )}
              </h3>
              {isLive ? (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 shrink-0">
                  Live
                </span>
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground shrink-0">
                  Soon
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-1">ZIP {city.zip}</p>
            <p className="text-sm text-muted-foreground mb-4">{city.tagline}</p>
            {isLive && market ? (
              <div className="flex flex-wrap gap-3">
                <Link
                  href={path}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View guide
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href={`/moving-calculator?toZip=${market.defaultToZip}&dest=${market.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Open calculator
                </Link>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function IowaClusterPage() {
  const published = new Set(getPublishedCityHubSlugs());
  const otherIowaCities = getClusterMarkets('iowa').filter(
    (market) => !published.has(market.slug)
  );

  return (
    <>
      <JsonLd
        data={buildIowaClusterSchemaGraph(
          content.seo.title,
          content.seo.description,
          content.seo.canonicalPath
        )}
      />
      <div className="min-h-screen">
        <section className="relative border-b bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <LocalMoversBreadcrumbs
              crumbs={[
                { label: 'Home', href: '/' },
                { label: 'Popular Destinations', href: '/moving-to' },
                { label: 'Iowa' },
              ]}
            />

            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Iowa Cluster · Updated 2026
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 max-w-4xl">
              {content.h1}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-4">
              {content.heroSubheadline}
            </p>

            {content.introParagraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-4"
              >
                {paragraph}
              </p>
            ))}

            <DestinationClusterHeroCta clusterSlug="iowa" clusterLabel="Iowa" />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Des Moines Metro — Live City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Ankeny, West Des Moines, Des Moines, and Waukee — Prairie Trail growth,
              Jordan Creek corporate power, capital-city riverwalk, and Dallas County trails.
            </p>
            <CorridorCityGrid cities={content.desMoinesMetroCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              University & Innovation — Live City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Iowa City and Ames — UNESCO literary culture, University of Iowa energy,
              and Iowa State innovation in bike-friendly campus towns.
            </p>
            <CorridorCityGrid cities={content.universityInnovationCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Eastern Corridor — Live City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Cedar Rapids and Dubuque — Five Seasons affordability, Czech Village culture,
              and Mississippi bluff riverfront architecture.
            </p>
            <CorridorCityGrid cities={content.easternCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Driftless & Heritage — Live City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Decorah and Pella — Driftless Region outdoor trails, craft-beer culture,
              Tulip Time Dutch heritage, and Vermeer corporate roots.
            </p>
            <CorridorCityGrid cities={content.driftlessHeritageCorridor} published={published} />
          </div>
        </section>

        {content.bodySections.map((section) => (
          <section key={section.heading} className="py-10 border-b">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight mb-3">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}

        {otherIowaCities.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">
                More Iowa Cities — Coming Soon
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherIowaCities.map((market) => (
                  <div key={market.slug} className="rounded-xl border bg-card p-5">
                    <h3 className="font-semibold mb-1">
                      {market.displayName}, {market.stateCode}
                    </h3>
                    <p className="text-sm text-muted-foreground">{market.inboundGrowthStat}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-semibold tracking-tight mb-8">
              Iowa Moving Resources
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.resourceLinks.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="rounded-xl border bg-card p-5 hover:border-primary/40 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}