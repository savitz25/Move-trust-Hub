import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { DestinationClusterHeroCta } from '@/components/destinations/destination-cluster-hero-cta';
import {
  maineClusterContent,
  type MaineCorridorCity,
} from '@/lib/destinations/content/maine-me';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterMarkets,
  getMarketBySlug,
  getMarketPath,
} from '@/lib/destinations/markets';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildMaineClusterSchemaGraph } from '@/lib/seo/build-destination-index-schema';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

const content = maineClusterContent;

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: content.seo.title },
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
  cities: MaineCorridorCity[];
  published: Set<string>;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cities.map((city) => {
        const market = getMarketBySlug(city.slug);
        const isLive = published.has(city.slug);
        const path = market ? getMarketPath(market) : `/moving-to/maine/${city.slug}`;

        return (
          <div
            key={city.slug}
            className="rounded-xl border bg-card p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg">
                {isLive ? (
                  <Link href={path} className="hover:text-primary transition-colors">
                    {city.displayName}, ME
                  </Link>
                ) : (
                  <span>{city.displayName}, ME</span>
                )}
              </h3>
              
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

export default function MaineClusterPage() {
  const published = new Set(getPublishedCityHubSlugs());
  const otherMaineCities = getClusterMarkets('maine').filter(
    (market) => !published.has(market.slug)
  );

  return (
    <>
      <JsonLd
        data={buildMaineClusterSchemaGraph(
          content.seo.title,
          content.seo.description,
          content.seo.canonicalPath
        )}
      />
      <div className="min-h-screen">
        <section
          className="container mx-auto max-w-6xl px-4 py-10"
          aria-labelledby="maine-regulatory-model"
        >
          <h2 id="maine-regulatory-model" className="text-2xl font-semibold">
            Maine moving regulation: what the state sources establish
          </h2>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            Maine&apos;s current motor-carrier framework is not a statewide household-goods mover
            certificate roster. The former operating-authority license provision, 29-A M.R.S.
            §552, is repealed. Maine still adopts federal motor-carrier safety rules and administers
            vehicle, USDOT-number and UCR requirements for applicable carriers. Those requirements
            are not a mover-specific license census, and some intrastate USDOT exemptions apply.
          </p>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            The Maine Attorney General explains federal consumer rules for interstate household
            moves and says those federal rules do not apply to moves wholly within Maine. This page
            does not substitute Maine-address FMCSA records for state authority, or treat insurance,
            tariffs, complaints, USDOT numbers, or general motor-carrier registration as a Maine
            mover license. No current mover-specific statewide roster was identified in the cited
            state sources; no Maine intrastate license count is asserted.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <a
                className="underline"
                href="https://legislature.maine.gov/statutes/29-A/title29-Ach5sec0.html"
              >
                Maine Title 29-A, Chapter 5
              </a>{" "}
              (including repealed §552).
            </li>
            <li>
              <a
                className="underline"
                href="https://www.maine.gov/sos/bmv/vehicles/commercial-vehicles-motor-carrier-services/united-states-department-of-transportation-number"
              >
                Maine BMV USDOT-number requirements and intrastate exceptions
              </a>.
            </li>
            <li>
              <a
                className="underline"
                href="https://www.maine.gov/sos/bmv/vehicles/commercial-vehicles-motor-carrier-services/unified-carrier-registration"
              >
                Maine BMV Unified Carrier Registration
              </a>.
            </li>
            <li>
              <a
                className="underline"
                href="https://www.maine.gov/ag/consumer-protection/consumer-help-topics/housing/movers-and-self-service-storage"
              >
                Maine Attorney General: movers and self-service storage
              </a>.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Source review checked October 12, 2026. State HHG roster: NOT_ACQUIRED / not identified
            in the reviewed official framework. Interstate FMCSA authority remains a separate
            federal population.
          </p>
        </section>
        <section className="relative border-b bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <LocalMoversBreadcrumbs
              crumbs={[
                { label: 'Home', href: '/' },
                { label: 'Popular Destinations', href: '/moving-to' },
                { label: 'Maine' },
              ]}
            />

            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Maine Cluster · Updated 2026
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

            <DestinationClusterHeroCta clusterSlug="maine" clusterLabel="Maine" />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Greater Portland — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Portland, South Portland, and Falmouth — Old Port culinary epicenter,
              Willard Beach family balance, and top-tier suburban school districts.
            </p>
            <CorridorCityGrid cities={content.greaterPortlandCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Southern Coast — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Biddeford and Kennebunk — resurgent mill-district creative revival and
              historic Kennebunkport coastal luxury.
            </p>
            <CorridorCityGrid cities={content.southernCoastCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Midcoast — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Brunswick and Camden — Bowdoin College intellectual culture and Camden&apos;s
              scenic harbor-and-mountain jewel.
            </p>
            <CorridorCityGrid cities={content.midcoastCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Central Maine — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Augusta, Lewiston/Auburn, and Bangor — Kennebec River capital value,
              twin-city industrial affordability, and northern Acadia gateway practicality.
            </p>
            <CorridorCityGrid cities={content.centralMaineCorridor} published={published} />
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

        {otherMaineCities.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">
                More Maine Cities 
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherMaineCities.map((market) => (
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
            <h2 className="text-2xl font-semibold tracking-tight mb-8">Maine Moving Resources</h2>
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
