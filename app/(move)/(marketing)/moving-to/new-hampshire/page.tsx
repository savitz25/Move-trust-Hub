import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { DestinationClusterHeroCta } from '@/components/destinations/destination-cluster-hero-cta';
import {
  newHampshireClusterContent,
  type NewHampshireCorridorCity,
} from '@/lib/destinations/content/new-hampshire-nh';
import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import {
  getClusterMarkets,
  getMarketBySlug,
  getMarketPath,
} from '@/lib/destinations/markets';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildNewHampshireClusterSchemaGraph } from '@/lib/seo/build-destination-index-schema';
import { SITE_URL, buildOpenGraph, buildTwitter } from '@/lib/seo/site-metadata';

const content = newHampshireClusterContent;

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
  cities: NewHampshireCorridorCity[];
  published: Set<string>;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {cities.map((city) => {
        const market = getMarketBySlug(city.slug);
        const isLive = published.has(city.slug);
        const path = market ? getMarketPath(market) : `/moving-to/new-hampshire/${city.slug}`;

        return (
          <div
            key={city.slug}
            className="rounded-xl border bg-card p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg">
                {isLive ? (
                  <Link href={path} className="hover:text-primary transition-colors">
                    {city.displayName}, NH
                  </Link>
                ) : (
                  <span>{city.displayName}, NH</span>
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

export default function NewHampshireClusterPage() {
  const published = new Set(getPublishedCityHubSlugs());
  const otherNewHampshireCities = getClusterMarkets('new-hampshire').filter(
    (market) => !published.has(market.slug)
  );

  return (
    <>
      <JsonLd
        data={buildNewHampshireClusterSchemaGraph(
          content.seo.title,
          content.seo.description,
          content.seo.canonicalPath
        )}
      />
      <div className="min-h-screen">
        <section className="container mx-auto max-w-6xl border-b px-4 py-10" aria-labelledby="nh-hhg-authority">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">New Hampshire household-goods regulation</p>
          <h2 id="nh-hhg-authority" className="mt-2 text-2xl font-semibold">Intrastate mover authority and what this page verifies</h2>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            New Hampshire does require state authority for household-goods carriers transporting for hire between points within the state. RSA 359-T:2 requires a Department of Safety certificate; RSA 359-T:4 separately provides a contract-carrier permit. The Department of Safety Bureau of Road Toll Operations administers these authorities under Saf-C 4600.
          </p>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            That intrastate authority is separate from FMCSA interstate operating authority and USDOT identity. General motor-carrier safety rules, household-goods insurance filings, annual vehicle registration, complaint investigations, hearings or orders, and rates or tariffs are separate regulatory records. This route's existing local mover listings are destination information; they are not confirmed certificate or permit holders.
          </p>
          <p className="mt-3 max-w-4xl text-muted-foreground">
            The Bureau publishes application and annual-report forms, but a current public certificate-holder roster and dated certificate rows were not acquired in this pass. Current holder count: NOT_ACQUIRED, not zero. No New Hampshire-address FMCSA list is substituted for state authority.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm">
            <li><a className="underline" href="https://gc.nh.gov/RSA/html/XXXI/359-T/359-T-mrg.htm" rel="noopener noreferrer" target="_blank">RSA 359-T: household-goods carrier certificates, permits, insurance, vehicles, complaints and hearings</a></li>
            <li><a className="underline" href="https://gc.nh.gov/rules/state_agencies/saf-c4600.html" rel="noopener noreferrer" target="_blank">Saf-C 4600 household-goods carrier rules and required annual report</a></li>
            <li><a className="underline" href="https://www.nh.gov/safety/divisions/administration/roadtoll/documents/NewOperationsHouseholdGoodsCarrierApplicationChecklist-2023-10-05-INTERIMRULES.pdf" rel="noopener noreferrer" target="_blank">Bureau of Road Toll Operations intrastate authority application checklist</a></li>
            <li><a className="underline" href="https://www.nh.gov/safety/divisions/administration/roadtoll/documents/DSAD5-HARHouseholdGoodsCarrierAnnualReport-2023-12.pdf" rel="noopener noreferrer" target="_blank">Household Goods Carrier Annual Report form (DSAD 5-HAR)</a></li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Official statutory and agency sources checked October 12, 2026. Application and annual-report forms revised December 2023. Current certificate-holder rows, carrier-specific insurance filings, filed tariff records, complaints and enforcement orders: NOT_ACQUIRED.</p>
        </section>
        <section className="relative border-b bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <LocalMoversBreadcrumbs
              crumbs={[
                { label: 'Home', href: '/' },
                { label: 'Popular Destinations', href: '/moving-to' },
                { label: 'New Hampshire' },
              ]}
            />

            <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              New Hampshire Cluster · Updated 2026
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

            <DestinationClusterHeroCta clusterSlug="new-hampshire" clusterLabel="New Hampshire" />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Southern Border — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Nashua, Bedford, Merrimack, and Amherst — Massachusetts-border commuter value, top
              schools, and Everett Turnpike corridor suburban growth.
            </p>
            <CorridorCityGrid cities={content.southernBorderCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Manchester Metro — City Guide
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Manchester — New Hampshire&apos;s largest city with Millyard revitalization, tech and
              healthcare hiring, and airport connectivity.
            </p>
            <CorridorCityGrid cities={content.manchesterMetroCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Seacoast — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Portsmouth and Dover — upscale historic seaport prestige and fast-growing riverside
              downtown revival along I-95.
            </p>
            <CorridorCityGrid cities={content.seacoastCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Capital Region — City Guide
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Concord — walkable state capital with government employment stability and Merrimack
              County value.
            </p>
            <CorridorCityGrid cities={content.capitalCorridor} published={published} />
          </div>
        </section>

        <section className="py-12 md:py-16 border-b">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">
              Upper Valley — City Guides
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              Hanover and Lebanon — Dartmouth College intellectual enclave and Dartmouth-Hitchcock
              medical corridor along I-89.
            </p>
            <CorridorCityGrid cities={content.upperValleyCorridor} published={published} />
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

        {otherNewHampshireCities.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-semibold tracking-tight mb-6">
                More New Hampshire Cities 
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherNewHampshireCities.map((market) => (
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
              New Hampshire Moving Resources
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
