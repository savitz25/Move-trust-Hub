import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CountyEditorialTrust,
  FLORIDA_COUNTY_CONTENT_UPDATED,
  NEW_JERSEY_COUNTY_CONTENT_UPDATED,
  NEW_YORK_COUNTY_CONTENT_UPDATED,
} from '@/components/local-movers/county-editorial-trust';
import { CountyInternalLinks } from '@/components/local-movers/county-internal-links';
import { getFloridaNearbyCounties } from '@/lib/local-movers/florida-nearby';
import { getNewJerseyNearbyCounties } from '@/lib/local-movers/new-jersey-nearby';
import { getNewYorkNearbyCounties } from '@/lib/local-movers/new-york-nearby';
import {
  CountyCostSection,
  CountyFaqSection,
  CountyTestimonialSection,
  CountyTipsSection,
} from '@/components/local-movers/county-seo-sections';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { LocalMoverCard } from '@/components/local-movers/local-mover-card';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import { getLocalState } from '@/lib/local-movers/states';
import {
  buildCountyCostGuide,
  buildCountyDescription,
  buildCountyFaqItems,
  buildCountyH1,
  buildCountyMarketNotes,
  buildCountyPageMetadata,
  buildCountyTestimonials,
  buildCountyTips,
  buildCountyTitle,
  getAllCountyParams,
  getCountyPath,
  getMoversForCounty,
  getStatePath,
} from '@/lib/local-movers/index';

type Props = { params: Promise<{ stateSlug: string; countySlug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllCountyParams().map(({ stateSlug, countySlug }) => ({
    stateSlug,
    countySlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug, countySlug } = await params;
  const state = getLocalState(stateSlug);
  const result = getMoversForCounty(stateSlug, countySlug);
  if (!state || !result) return {};

  return buildCountyPageMetadata(
    result.county,
    state.name,
    result.movers,
    getCountyPath(stateSlug, countySlug)
  );
}

export default async function LocalMoversCountyPage({ params }: Props) {
  const { stateSlug, countySlug } = await params;
  const state = getLocalState(stateSlug);
  const result = getMoversForCounty(stateSlug, countySlug);

  if (!state || !result) notFound();

  const { county, movers, isRegionalFallback } = result;
  const title = buildCountyTitle(county, state.name);
  const description = buildCountyDescription(county, state.name, movers.length);
  const path = getCountyPath(stateSlug, countySlug);
  const countyLabel = `${county.name} County`;
  const faqItems = buildCountyFaqItems(county, state.name, movers);
  const costs = buildCountyCostGuide(county, state.name);
  const tips = buildCountyTips(county, state.name);
  const testimonials = buildCountyTestimonials(county, state.name);
  const marketNotes = buildCountyMarketNotes(county);
  const nearbyCounties =
    stateSlug === 'florida'
      ? getFloridaNearbyCounties(countySlug)
      : stateSlug === 'new-jersey'
        ? getNewJerseyNearbyCounties(countySlug)
        : stateSlug === 'new-york'
          ? getNewYorkNearbyCounties(countySlug)
          : [];

  return (
    <>
      <LocalMoversSchema
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Local Movers', path: '/local-movers' },
          { name: state.name, path: getStatePath(state.slug) },
          { name: countyLabel, path },
        ]}
        movers={movers}
        county={county}
        stateName={state.name}
        faqItems={faqItems}
        testimonials={testimonials}
      />

      <main className="container mx-auto px-4 py-10 max-w-3xl">
        <LocalMoversBreadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Local Movers', href: '/local-movers' },
            { label: state.name, href: getStatePath(state.slug) },
            { label: countyLabel },
          ]}
        />

        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            {state.name} · {county.stateCode}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            {buildCountyH1(county)}
          </h1>
          {county.seat && (
            <p className="text-muted-foreground mb-3">
              County seat: {county.seat}
            </p>
          )}
          <p className="text-muted-foreground leading-relaxed">
            Compare {movers.length} local moving companies serving {county.name}{' '}
            County. Ratings, services, and FMCSA licensing — plus links to full
            profiles in our{' '}
            <Link href="/companies" className="text-primary font-medium hover:underline">
              interstate directory
            </Link>
            .
          </p>
          {marketNotes && (
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed rounded-xl border bg-muted/20 px-4 py-3">
              {marketNotes}
            </p>
          )}
          {isRegionalFallback && (
            <p className="mt-3 text-xs text-muted-foreground rounded-lg border bg-muted/30 px-3 py-2">
              Movers listed serve the greater {county.metro?.replace(/-/g, ' ')} region
              including {county.name} County.
            </p>
          )}
        </header>

        <section className="mb-10" id="movers" aria-labelledby="movers-heading">
          <h2 id="movers-heading" className="text-2xl font-semibold tracking-tight mb-4">
            Best moving companies in {countyLabel}, {county.stateCode}
          </h2>
          {movers.length > 0 ? (
            <ol className="space-y-4 list-none p-0 m-0">
              {movers.map((mover, index) => (
                <li key={mover.id}>
                  <LocalMoverCard
                    mover={mover}
                    rank={index + 1}
                    countyLabel={countyLabel}
                    stateCode={county.stateCode}
                  />
                </li>
              ))}
            </ol>
          ) : (
            <div className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground">
              Mover listings for this county are being added. Browse{' '}
              <Link href="/companies" className="text-primary hover:underline">
                licensed interstate movers
              </Link>{' '}
              or use the{' '}
              <Link href="/moving-calculator" className="text-primary hover:underline">
                moving calculator
              </Link>{' '}
              in the meantime.
            </div>
          )}
        </section>

        <CountyCostSection countyLabel={countyLabel} stateName={state.name} costs={costs} />

        <CountyTipsSection countyLabel={countyLabel} tips={tips} />

        <CountyTestimonialSection
          testimonials={testimonials}
          countyLabel={countyLabel}
        />

        <CountyFaqSection countyLabel={countyLabel} faqItems={faqItems} />

        <CountyInternalLinks
          stateName={state.name}
          stateSlug={state.slug}
          countyLabel={countyLabel}
          nearbyCounties={nearbyCounties}
        />

        <CountyEditorialTrust
          countyLabel={countyLabel}
          stateName={state.name}
          lastUpdated={
            stateSlug === 'new-jersey'
              ? NEW_JERSEY_COUNTY_CONTENT_UPDATED
              : stateSlug === 'new-york'
                ? NEW_YORK_COUNTY_CONTENT_UPDATED
                : stateSlug === 'florida'
                  ? FLORIDA_COUNTY_CONTENT_UPDATED
                  : undefined
          }
        />

        <section className="mb-10 rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">How we rank local movers</h2>
          <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
            <li>• Customer ratings and review volume</li>
            <li>• FMCSA USDOT/MC licensing and safety rating when available</li>
            <li>• Service fit for local and short-distance moves</li>
            <li>• BBB standing where reported</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            Always verify current licensing on{' '}
            <a
              href="https://www.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              FMCSA.gov
            </a>{' '}
            before booking.
          </p>
        </section>

        <LocalMoversCta countyName={countyLabel} />
      </main>
    </>
  );
}