import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { LocalMoverCard } from '@/components/local-movers/local-mover-card';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import { getLocalState } from '@/lib/local-movers/states';
import {
  buildCountyDescription,
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

  const title = buildCountyTitle(result.county, state.name);
  const description = buildCountyDescription(
    result.county,
    state.name,
    result.movers.length
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.movetrusthub.com${getCountyPath(stateSlug, countySlug)}`,
    },
    openGraph: { title, description },
  };
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
      />

      <div className="container mx-auto px-4 py-10 max-w-3xl">
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
            Best Local Movers in {countyLabel}
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
          {isRegionalFallback && (
            <p className="mt-3 text-xs text-muted-foreground rounded-lg border bg-muted/30 px-3 py-2">
              Movers listed serve the greater {county.metro?.replace(/-/g, ' ')} region
              including {county.name} County.
            </p>
          )}
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">
            Top local movers in {county.name} County
          </h2>
          {movers.length > 0 ? (
            <div className="space-y-4">
              {movers.map((mover, index) => (
                <LocalMoverCard key={mover.id} mover={mover} rank={index + 1} />
              ))}
            </div>
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
      </div>
    </>
  );
}