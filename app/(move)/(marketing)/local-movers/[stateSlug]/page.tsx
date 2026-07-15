import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { CountyGridCard } from '@/components/local-movers/county-grid-card';
import { CountyInternalLinks } from '@/components/local-movers/county-internal-links';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { PageHeroCta } from '@/components/conversion/page-hero-cta';
import { DirectorySearchEmbed } from '@/components/directory/directory-search-embed';

import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import { getLocalState, localStates } from '@/lib/local-movers/states';
import {
  buildStateDescription,
  buildStatePageMetadata,
  buildStateTitle,
  getCountyPath,
  getStatePath,
} from '@/lib/local-movers/index';
import {
  buildStateCountyGridEntries,
  sortCountyGridEntries,
  summarizeStateCountyGrid,
} from '@/lib/local-movers/state-county-grid';
import { getCountiesForState, stateHasCounties } from '@/lib/local-movers/geography/index';

type Props = { params: Promise<{ stateSlug: string }> };

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return localStates.map((state) => ({ stateSlug: state.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = getLocalState(stateSlug);
  if (!state) return {};

  const counties = getCountiesForState(stateSlug);
  return buildStatePageMetadata(
    state.name,
    state.code,
    counties.length,
    getStatePath(state.slug)
  );
}

export default async function LocalMoversStatePage({ params }: Props) {
  const { stateSlug } = await params;
  const state = getLocalState(stateSlug);
  if (!state) notFound();

  const counties = getCountiesForState(stateSlug);
  const hasCounties = stateHasCounties(stateSlug);
  const gridEntries = sortCountyGridEntries(buildStateCountyGridEntries(stateSlug));
  const gridSummary = summarizeStateCountyGrid(gridEntries);
  const title = buildStateTitle(state.name, counties.length);
  const description = buildStateDescription(state.name, counties.length);
  const path = `/local-movers/${state.slug}`;

  return (
    <>
      <LocalMoversSchema
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Local Movers', path: '/local-movers' },
          { name: state.name, path },
        ]}
        stateName={state.name}
      />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <LocalMoversBreadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Local Movers', href: '/local-movers' },
            { label: state.name },
          ]}
        />

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1 text-xs font-semibold text-primary mb-4">
            {state.code}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            Local Movers in {state.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {hasCounties ? description : `Independent local mover research for ${state.name}. Browse our interstate directory and moving calculator while county guides expand.`}
          </p>
          {hasCounties ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {gridSummary.deepGuides > 0
                ? `${gridSummary.deepGuides} deep guides · `
                : ''}
              {gridSummary.indexed} indexed counties · {gridSummary.total} total guides
            </p>
          ) : null}
          <div className="mt-6">
            <PageHeroCta
              tertiaryLabel={`Browse ${state.name} Counties`}
              tertiaryHref={`/local-movers/${state.slug}`}
            />
          </div>
        </div>

        <div className="mb-12">
          <DirectorySearchEmbed
            sourcePage={path}
            scope={{ stateCode: state.code, stateName: state.name }}
            heading={`Search movers in ${state.name}`}
            description="Uses the same nationwide directory as /companies. Optionally prefer movers serving this state."
          />
        </div>

        {hasCounties ? (
          <section className="mb-14">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {state.slug === 'district-of-columbia'
                    ? 'Washington, DC local mover guide'
                    : `Counties in ${state.name}`}
                </h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  {state.slug === 'district-of-columbia'
                    ? 'Curated local movers for the capital region'
                    : `${counties.length} county guides · deep guides and indexed counties sorted first`}
                </p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2 text-[11px] text-slate-500">
              <span className="rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-800 ring-1 ring-amber-200/90">
                Deep guide
              </span>
              <span className="rounded-full bg-sky-50 px-2 py-1 font-semibold text-[#004a8a] ring-1 ring-sky-200/80">
                50+ movers
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-1 font-semibold text-slate-700 ring-1 ring-slate-200/90">
                10–49 movers
              </span>
              <span className="rounded-full bg-slate-50 px-2 py-1 font-semibold text-slate-600 ring-1 ring-slate-200/80">
                1–9 movers
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
              {gridEntries.map((entry) => (
                <CountyGridCard
                  key={entry.county.slug}
                  href={getCountyPath(state.slug, entry.county.slug)}
                  name={entry.county.name}
                  seat={entry.county.seat}
                  moverCount={entry.moverCount}
                  isDeepGuide={entry.isDeepGuide && entry.indexTier === 'index'}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12 rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-2">County guides in progress</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Use our interstate mover directory and moving calculator while county-level
              guides for {state.name} are being expanded.
            </p>
            <Link
              href="/companies"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Browse interstate movers →
            </Link>
          </section>
        )}

        <CountyInternalLinks
          stateName={state.name}
          stateSlug={state.slug}
          countyLabel={state.name}
        />

        <LocalMoversCta countyName={state.name} stateSlug={state.slug} />
      </div>
    </>
  );
}