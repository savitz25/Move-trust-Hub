import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { CountyInternalLinks } from '@/components/local-movers/county-internal-links';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import { getLocalState, localStates } from '@/lib/local-movers/states';
import {
  buildStateDescription,
  buildStatePageMetadata,
  buildStateTitle,
  getCountyPath,
  getStatePath,
} from '@/lib/local-movers/index';
import { getCountiesForState, stateHasCounties } from '@/lib/local-movers/geography/index';

type Props = { params: Promise<{ stateSlug: string }> };

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
              ? state.slug === 'california' ||
                state.slug === 'florida' ||
                state.slug === 'georgia' ||
                state.slug === 'new-jersey' ||
                state.slug === 'new-york' ||
                state.slug === 'south-carolina' ||
                state.slug === 'north-carolina' ||
                state.slug === 'tennessee' ||
                state.slug === 'alabama' ||
                state.slug === 'mississippi' ||
                state.slug === 'louisiana' ||
                state.slug === 'oklahoma' ||
                state.slug === 'arkansas' ||
                state.slug === 'kansas' ||
                state.slug === 'missouri' ||
                state.slug === 'illinois' ||
                state.slug === 'michigan' ||
                state.slug === 'indiana' ||
                state.slug === 'ohio' ||
                state.slug === 'kentucky' ||
                state.slug === 'west-virginia' ||
                state.slug === 'virginia' ||
                state.slug === 'district-of-columbia' ||
                state.slug === 'delaware' ||
                state.slug === 'maryland' ||
                state.slug === 'pennsylvania' ||
                state.slug === 'connecticut' ||
                state.slug === 'massachusetts' ||
                state.slug === 'rhode-island' ||
                state.slug === 'vermont' ||
                state.slug === 'new-hampshire' ||
                state.slug === 'maine' ||
                state.slug === 'hawaii' ||
                state.slug === 'alaska' ||
                state.slug === 'washington' ||
                state.slug === 'oregon' ||
                state.slug === 'nevada' ||
                state.slug === 'arizona' ||
                state.slug === 'new-mexico' ||
                state.slug === 'texas'
                ? state.slug === 'district-of-columbia'
                  ? 'Washington, DC local mover guide — 15 curated companies experienced with government, diplomatic, high-rise, and corporate relocations. FMCSA licensing, DC cost estimates, and capital-city moving tips.'
                  : state.slug === 'delaware'
                    ? 'Browse all 3 Delaware county guides — up to 12 curated movers in New Castle (Wilmington metro), 8+ in Kent and Sussex. FMCSA licensing, cost estimates, and county-specific tips for corporate, beach, and retirement moves.'
                    : state.slug === 'maryland'
                      ? 'Browse all 24 Maryland jurisdiction guides — 10 curated movers in every county and Baltimore City. FMCSA licensing, cost estimates, and local moving tips from DC suburbs to the Eastern Shore and Western Maryland.'
                      : state.slug === 'pennsylvania'
                        ? 'Browse all 67 Pennsylvania county guides — 10 curated movers in every county from Philadelphia and Pittsburgh to Harrisburg, Erie, Scranton, and rural regional markets statewide. FMCSA licensing, cost estimates, and local moving tips.'
                        : state.slug === 'connecticut'
                          ? 'Browse all 8 Connecticut county guides — up to 12 curated movers in Fairfield County (NYC corridor and Gold Coast), 8–10 movers in Hartford, New Haven, and coastal counties. FMCSA licensing, cost estimates, and county-specific moving tips.'
                          : state.slug === 'massachusetts'
                            ? 'Browse all 14 Massachusetts county guides — 10 curated movers per county from Boston and Middlesex through Worcester, Cape Cod, the Berkshires, and the islands. FMCSA licensing, cost estimates, and county-specific moving tips.'
                            : state.slug === 'rhode-island'
                              ? 'Browse all 5 Rhode Island county guides — 10 curated movers per county from Providence and Kent through Washington, Newport, and Bristol. FMCSA licensing, cost estimates, and county-specific moving tips.'
                              : state.slug === 'vermont'
                                ? 'Browse all 14 Vermont county guides — up to 10 curated movers in Chittenden (Burlington), 6–10 regional specialists in every county experienced with rural roads, winter weather, and seasonal moves. FMCSA licensing, cost estimates, and county-specific moving tips.'
                                : state.slug === 'new-hampshire'
                                  ? 'Browse all 10 New Hampshire county guides — up to 10 curated movers in Hillsborough (Manchester–Nashua) and Rockingham (Seacoast), 7–10 regional specialists in every county from southern suburban corridors through Lakes Region, White Mountains, and North Country. FMCSA licensing, cost estimates, and county-specific moving tips.'
                                  : state.slug === 'maine'
                                    ? 'Browse all 16 Maine county guides — up to 10 curated movers in Cumberland (Portland), 7–9 in York (Seacoast), and 6–10 regional specialists in every county experienced with rural roads, harsh winters, and tourism/second-home moves. FMCSA licensing, cost estimates, and county-specific moving tips.'
                                    : state.slug === 'hawaii'
                                      ? 'Browse all 5 Hawaii county guides — up to 10 curated movers on Oahu (Honolulu) and Maui, 6–10 island specialists on Kauai and Hawaii Island (Big Island), experienced with inter-island shipping, military moves, and mainland-to-Hawaii relocations. FMCSA licensing, cost estimates, and island-specific moving tips.'
                                      : state.slug === 'alaska'
                                        ? 'Browse all 29 Alaska borough guides — up to 10 curated movers in Anchorage Municipality, 8–10 in Fairbanks North Star and Matanuska-Susitna, and 5+ regional specialists in every borough experienced with military PCS, oil & gas relocations, harsh winters, and Lower 48 long-distance moves. FMCSA licensing, cost estimates, and Alaska-specific moving tips.'
                                        : state.slug === 'washington'
                                          ? 'Browse all 39 Washington county guides — up to 12 curated movers in King County (Seattle metro), 10+ in Snohomish and Pierce, 9–10 in Spokane, and 6–10 regional specialists in every county. Western Washington covers tech-corridor, corporate, military (JBLM), and high-density moves; Eastern Washington covers suburban, rural, and agricultural markets. FMCSA licensing, cost estimates, and Washington-specific moving tips.'
                                          : state.slug === 'oregon'
                                            ? 'Browse all 36 Oregon county guides — up to 12 curated movers in Portland metro (Multnomah, Washington, Clackamas), 9–10 in Lane and Marion, and 6–10 regional specialists in every county. Portland metro covers tech, corporate, and high-density moves; Willamette Valley, Central Oregon (Bend), coast, and eastern Oregon each have localized guides. FMCSA licensing, cost estimates, and Oregon-specific moving tips.'
                                            : state.slug === 'nevada'
                                              ? 'Browse all 17 Nevada county guides — up to 12 curated movers in Clark County (Las Vegas metro), 9–10 in Washoe (Reno–Sparks), and 6–10 regional specialists in every county. Las Vegas covers tourism, corporate, military, and high-density moves; Reno covers tech, manufacturing, and logistics; rural Nevada covers mining and remote regional hauls. FMCSA licensing, cost estimates, and Nevada-specific moving tips.'
                                              : state.slug === 'arizona'
                                                ? 'Browse all 15 Arizona county guides — up to 12 curated movers in Maricopa County (Phoenix metro), 9–10 in Pima (Tucson), and 6–10 regional specialists in every county. Phoenix metro covers corporate growth, retirement/snowbird moves, and extreme heat logistics; Tucson covers university, Davis-Monthan AFB military PCS, and retirement moves; rural Arizona covers mining, border corridors, and long-distance regional hauls. FMCSA licensing, cost estimates, and Arizona-specific moving tips.'
                                                : state.slug === 'new-mexico'
                                                  ? 'Browse 33 New Mexico county guides — 10 curated movers in Bernalillo (Albuquerque), Doña Ana (Las Cruces), Sandoval (Rio Rancho), Santa Fe, San Juan (Farmington), Valencia, Lea (Hobbs), Otero (Alamogordo), McKinley (Gallup), Eddy (Carlsbad), and Chaves (Roswell). Albuquerque metro covers urban and suburban moves; southern New Mexico covers border and military corridors; southeastern counties cover energy-sector relocations. FMCSA licensing, cost estimates, and New Mexico-specific moving tips.'
                                                  : `Browse all ${counties.length} ${state.name} county guides — 5–10 curated local movers per county, FMCSA licensing, cost estimates, and county-specific moving tips. Major metros include up to 10 ranked companies.`
                : `Browse ${counties.length} county guides for local moving companies in ${state.name}. Each page lists top-rated movers with FMCSA info and profile links.`
              : `County-level local mover guides for ${state.name} are coming soon. In the meantime, use our interstate directory and moving calculator.`}
          </p>
        </div>

        {hasCounties ? (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {state.slug === 'district-of-columbia'
                ? 'Washington, DC local mover guide'
                : `Counties in ${state.name}`}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {counties.map((county) => (
                <Link
                  key={county.slug}
                  href={getCountyPath(state.slug, county.slug)}
                  className="group rounded-xl border bg-card p-4 hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {county.name}
                  </div>
                  {county.seat && (
                    <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden="true" />
                      {county.seat}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-12 rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-xl font-semibold mb-2">County guides coming soon</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              We&apos;re expanding local mover coverage state by state. Add county
              geography data and mover assignments to scale — no new page templates needed.
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

        <LocalMoversCta />
      </div>
    </>
  );
}