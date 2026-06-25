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
                state.slug === 'utah' ||
                state.slug === 'colorado' ||
                state.slug === 'idaho' ||
                state.slug === 'montana' ||
                state.slug === 'wyoming' ||
                state.slug === 'north-dakota' ||
                state.slug === 'south-dakota' ||
                state.slug === 'nebraska' ||
                state.slug === 'iowa' ||
                state.slug === 'minnesota' ||
                state.slug === 'wisconsin' ||
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
                                                  ? 'Browse all 33 New Mexico county guides — up to 11 curated movers in Bernalillo County (Albuquerque metro), 8–9 in Santa Fe and Doña Ana (Las Cruces), and 5–7 regional specialists in every county. Albuquerque covers corporate, Kirtland AFB military PCS, and suburban moves; Santa Fe and Taos cover tourism, second-home, and retirement moves; southern New Mexico covers border and military corridors; rural counties emphasize long-distance hauls and remote logistics. FMCSA licensing, cost estimates, and New Mexico-specific moving tips.'
                                                  : state.slug === 'utah'
                                                    ? 'Browse all 29 Utah county guides — up to 12 curated movers in Salt Lake County (Salt Lake City metro), 9–10 in Utah County (Provo-Orem / Silicon Slopes), 8–9 in Davis, Weber, and Washington (St. George), and 6–8 regional specialists in every county. Wasatch Front metros cover tech growth, family moves, and Hill AFB military PCS; southern Utah covers retirement, tourism, and snowbird moves; rural counties emphasize long-distance hauls and outdoor-lifestyle logistics. FMCSA licensing, cost estimates, and Utah-specific moving tips.'
                                                    : state.slug === 'colorado'
                                                      ? 'Browse all 64 Colorado county guides — up to 12 curated movers in Denver metro (Denver, Arapahoe, Jefferson, Adams, Douglas), 10–11 in El Paso (Colorado Springs), 9–10 in Boulder, Larimer, and Weld, and 6–8 regional specialists in every county. Denver metro covers tech/corporate growth and outdoor-lifestyle family moves; Colorado Springs covers Fort Carson and Peterson SFB military PCS; mountain counties cover tourism and second-home logistics; eastern plains and Western Slope counties emphasize long-distance and agricultural hauls. FMCSA licensing, cost estimates, and Colorado-specific moving tips.'
                                                      : state.slug === 'idaho'
                                                        ? 'Browse all 44 Idaho county guides — up to 11 curated movers in Ada County (Boise metro), 8–9 in Canyon (Nampa–Caldwell), and 5–7 regional specialists in every county. Treasure Valley guides cover rapid suburban growth, corporate relocations, and family moves; northern Idaho covers Coeur d\'Alene lakeside tourism and second-home logistics; Sun Valley and Teton Valley cover resort-season moves; rural counties emphasize agricultural hauls, long-distance relocations, and remote logistics. FMCSA licensing, cost estimates, and Idaho-specific moving tips.'
                                                        : state.slug === 'montana'
                                                          ? 'Browse all 56 Montana county guides — up to 11 curated movers in Yellowstone County (Billings), 8–10 in Missoula and Gallatin (Bozeman), 8 in Cascade (Great Falls), and 5–7 regional specialists in every county. Billings covers regional hub, corporate, and agricultural moves; Missoula and Bozeman cover university, tourism, and outdoor-lifestyle growth; Great Falls covers Malmstrom AFB military PCS; Glacier and Yellowstone gateway counties emphasize tourism and second-home logistics; rural Hi-Line and plains counties emphasize harsh winters, remote logistics, and long-distance Lower 48 hauls. FMCSA licensing, cost estimates, and Montana-specific moving tips.'
                                                          : state.slug === 'wyoming'
                                                            ? 'Browse all 23 Wyoming county guides — up to 10 curated movers in Laramie County (Cheyenne), 8–9 in Natrona (Casper), 7–8 in Teton (Jackson Hole), and 5–7 regional specialists in every county. Cheyenne covers government, F.E. Warren AFB military PCS, and Front Range regional hub moves; Casper covers oil-and-gas energy-sector relocations; Jackson Hole covers luxury resort and second-home logistics; Campbell, Sweetwater, and Albany cover energy-basin and university demand; rural counties emphasize harsh winters, remote ranch properties, and very long-distance Lower 48 hauls. FMCSA licensing, cost estimates, and Wyoming-specific moving tips.'
                                                            : state.slug === 'north-dakota'
                                                              ? 'Browse all 53 North Dakota county guides — up to 10 curated movers in Cass County (Fargo), 8–9 in Burleigh (Bismarck), 7–8 in Williams (Williston / Bakken) and Grand Forks, and 5–7 regional specialists in every county. Fargo covers corporate, university, and suburban Red River Valley moves; Bismarck covers state government and regional hub relocations; Bakken counties (Williams, McKenzie, Mountrail) emphasize oil-and-gas energy-sector relocations; rural counties emphasize agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves. FMCSA licensing, cost estimates, and North Dakota-specific moving tips.'
                                                              : state.slug === 'south-dakota'
                                                                ? 'Browse all 66 South Dakota county guides — up to 11 curated movers in Minnehaha County (Sioux Falls), 9–10 in Pennington (Rapid City / Black Hills), 7–8 in Brown (Aberdeen), Codington (Watertown), and Lincoln, and 5–7 regional specialists in every county. Sioux Falls covers corporate, university, and suburban Big Sioux Valley moves; Rapid City covers Mount Rushmore tourism, Black Hills second-home logistics, and Ellsworth AFB military PCS; Black Hills counties (Lawrence, Custer, Meade) emphasize tourism and seasonal demand; rural counties emphasize agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves. FMCSA licensing, cost estimates, and South Dakota-specific moving tips.'
                                                                : state.slug === 'nebraska'
                                                                  ? 'Browse all 93 Nebraska county guides — up to 12 curated movers in Douglas County (Omaha), 10 in Sarpy (Papillion / Bellevue) and Lancaster (Lincoln), 7–8 in Hall (Grand Island), Buffalo (Kearney), and Dodge (Fremont), and 5–7 regional specialists in every county. Omaha covers corporate, suburban family moves, and Offutt AFB military PCS; Lincoln covers University of Nebraska and state government relocations; central Platte Valley counties cover agricultural and I-80 corridor demand; rural counties emphasize corn/soybean/cattle agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves. FMCSA licensing, cost estimates, and Nebraska-specific moving tips.'
                                                                  : state.slug === 'iowa'
                                                                    ? 'Browse 73 Iowa county guides — up to 12 curated movers in Polk County (Des Moines), 9–10 in Linn (Cedar Rapids), Johnson (Iowa City), and Scott (Quad Cities), 8 in Woodbury (Sioux City), and 5–7 regional specialists in every curated county. Des Moines covers insurance and finance headquarters, corporate relocations, and suburban family moves; the Cedar Rapids–Iowa City corridor covers manufacturing, University of Iowa campus turnover, and professional relocations; Quad Cities and Sioux City cover cross-border and agricultural processing logistics; rural counties emphasize corn/soybean/pork agricultural hauls, ethanol-industry corridors, harsh winters, remote logistics, and very long-distance Lower 48 moves. FMCSA licensing, cost estimates, and Iowa-specific moving tips.'
                                                                    : state.slug === 'wisconsin'
                                                                      ? 'Browse 50 Wisconsin county guides — 10 curated movers per county across Milwaukee and Madison metros, Fox Cities and Green Bay, Kenosha and Chicago–Milwaukee corridor, Twin Cities fringe (St. Croix, Pierce), Duluth–Superior (Douglas), Door Peninsula tourism markets, Chippewa Valley, Driftless Area counties, and northwoods lakes-country guides. FMCSA licensing, cost estimates, and Wisconsin-specific moving tips.'
                                                                    : state.slug === 'minnesota'
                                                                      ? 'Browse all 87 Minnesota county guides — up to 13 curated movers in Hennepin (Minneapolis) and Ramsey (Saint Paul), 9–10 in Dakota, Anoka, Washington, Scott, Carver, and Olmsted (Rochester), 8–9 in St. Louis (Duluth), and 5–7 regional specialists in every county. Twin Cities metros cover Fortune 500 corporate headquarters, suburban family moves, and high-density urban logistics; Rochester covers Mayo Clinic medical professional relocations; Duluth and North Shore counties cover tourism, seasonal, and second-home logistics; lakes-country and rural counties emphasize agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves. FMCSA licensing, cost estimates, and Minnesota-specific moving tips.'
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