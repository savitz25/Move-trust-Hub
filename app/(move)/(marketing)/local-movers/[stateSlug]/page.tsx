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
import { StateHubTier1Links } from '@/components/local-movers/state-hub-tier1-links';
import { StateCountyMap } from '@/components/map/StateCountyMap';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';
import { getLocalState, localStates } from '@/lib/local-movers/states';
import {
  buildStateDescription,
  buildStatePageMetadata,
  buildStateTitle,
  getStatePath,
} from '@/lib/local-movers/index';
import {
  buildStateHubCountyRows,
  buildStateHubStats,
  pickTier1QuickLinks,
} from '@/lib/local-movers/state-hub-helpers';
import { getCountiesForState, stateHasCounties } from '@/lib/local-movers/geography/index';
import { ssgParams } from '@/lib/ssg/ssg-params';

type Props = { params: Promise<{ stateSlug: string }> };

export const dynamic = 'force-static';
export const dynamicParams = true;
/** ISR: pick up new approved local movers on county badges within ~5 minutes (also revalidated on publish). */
export const revalidate = 300;

export async function generateStaticParams() {
  return ssgParams(localStates.map((state) => ({ stateSlug: state.slug })));
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
  const hubRows = await buildStateHubCountyRows(stateSlug, counties);
  const hubStats = buildStateHubStats(hubRows);
  const tier1QuickLinks = pickTier1QuickLinks(hubRows, stateSlug === 'florida' ? 10 : 8);
  const hasCounties = stateHasCounties(stateSlug);
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
            {hasCounties
              ? description
              : `Independent local mover research for ${state.name}. Browse our interstate directory and moving calculator while county guides expand.`}
          </p>
          {hasCounties ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {hubStats.deepGuideCount > 0 ? `${hubStats.deepGuideCount} deep guides · ` : ''}
              {hubStats.tier1Count} Tier 1 · {hubStats.totalCounties} county guides
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
          <>
            <StateHubTier1Links stateName={state.name} links={tier1QuickLinks} />

            {state.slug !== 'district-of-columbia' ? (
              <section
                className="mb-12"
                aria-labelledby="state-county-map-heading"
              >
                <div className="mb-4">
                  <h2
                    id="state-county-map-heading"
                    className="text-2xl font-semibold tracking-tight text-slate-900"
                  >
                    Explore {state.name} on the map
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Click any county to open its local movers guide. Fully curated
                    states include deep county research and ratings.
                  </p>
                </div>
                <StateCountyMap
                  stateSlug={state.slug}
                  stateName={state.name}
                  countyMeta={hubRows.map((row) => ({
                    slug: row.county.slug,
                    label: buildCountyLabel(row.county),
                    moverCount: row.moverCount,
                    guideBadge: row.guideBadge,
                    isDeepGuide: row.isDeepGuide,
                  }))}
                />
              </section>
            ) : null}

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
                      : `${hubStats.totalCounties} county guides · ${hubStats.tier1Count} Tier 1 · ${hubStats.deepGuideCount} deep guides · Deep/Tier 1 listed first`}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2 text-[11px] text-slate-500">
                <span className="rounded-full bg-sky-50 px-2 py-1 font-semibold text-sky-900 ring-1 ring-sky-200/80">
                  Deep guide
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-800 ring-1 ring-emerald-200/80">
                  Tier 1
                </span>
                <span className="rounded-full bg-amber-50 px-2 py-1 font-semibold text-amber-800 ring-1 ring-amber-200/80">
                  Limited
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                {hubRows.map(({ county, moverCount, guideBadge, href }) => (
                  <CountyGridCard
                    key={county.slug}
                    href={href}
                    name={county.name}
                    seat={county.seat}
                    moverCount={moverCount}
                    guideBadge={guideBadge}
                  />
                ))}
              </div>
            </section>
          </>
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