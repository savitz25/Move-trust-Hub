import { getDeepCountyFaqExtras } from '@/data/deep-county-research';
import { sanitizeCountyResearchText } from '@/lib/local-movers/county-research-sanitizer';
import { buildCountyPageTitle } from '@/lib/local-movers/county-display-copy';
import { getCountyResearch } from '@/lib/local-movers/county-research';
import { getCaliforniaCountyResearch } from '@/data/california-county-research';
import { getFloridaCountyResearch } from '@/data/florida-county-research';
import { getNewJerseyCountyResearch } from '@/data/new-jersey-county-research';
import { getNewYorkCountyResearch } from '@/data/new-york-county-research';
import { getGeorgiaCountyResearch } from '@/data/georgia-county-research';
import { getSouthCarolinaCountyResearch } from '@/data/south-carolina-county-research';
import { getNorthCarolinaCountyResearch } from '@/data/north-carolina-county-research';
import { getAlabamaCountyResearch } from '@/data/alabama-county-research';
import { getMississippiCountyResearch } from '@/data/mississippi-county-research';
import { getLouisianaCountyResearch } from '@/data/louisiana-county-research';
import { getOklahomaCountyResearch } from '@/data/oklahoma-county-research';
import { getArkansasCountyResearch } from '@/data/arkansas-county-research';
import { getKansasCountyResearch } from '@/data/kansas-county-research';
import { getMissouriCountyResearch } from '@/data/missouri-county-research';
import { getIllinoisCountyResearch } from '@/data/illinois-county-research';
import { getMichiganCountyResearch } from '@/data/michigan-county-research';
import { getIndianaCountyResearch } from '@/data/indiana-county-research';
import { getOhioCountyResearch } from '@/data/ohio-county-research';
import { getKentuckyCountyResearch } from '@/data/kentucky-county-research';
import { getWestVirginiaCountyResearch } from '@/data/west-virginia-county-research';
import { getVirginiaCountyResearch } from '@/data/virginia-county-research';
import { getDistrictOfColumbiaCountyResearch } from '@/data/district-of-columbia-county-research';
import { getDelawareCountyResearch } from '@/data/delaware-county-research';
import { getMarylandCountyResearch } from '@/data/maryland-county-research';
import { getPennsylvaniaCountyResearch } from '@/data/pennsylvania-county-research';
import { getConnecticutCountyResearch } from '@/data/connecticut-county-research';
import { getMassachusettsCountyResearch } from '@/data/massachusetts-county-research';
import { getRhodeIslandCountyResearch } from '@/data/rhode-island-county-research';
import { getVermontCountyResearch } from '@/data/vermont-county-research';
import { getNewHampshireCountyResearch } from '@/data/new-hampshire-county-research';
import { getMaineCountyResearch } from '@/data/maine-county-research';
import { getHawaiiCountyResearch } from '@/data/hawaii-county-research';
import { getAlaskaCountyResearch } from '@/data/alaska-county-research';
import { getWashingtonCountyResearch } from '@/data/washington-county-research';
import { getOregonCountyResearch } from '@/data/oregon-county-research';
import { getNevadaCountyResearch } from '@/data/nevada-county-research';
import { getArizonaCountyResearch } from '@/data/arizona-county-research';
import { getNewMexicoCountyResearch } from '@/data/new-mexico-county-research';
import { getUtahCountyResearch } from '@/data/utah-county-research';
import { getColoradoCountyResearch } from '@/data/colorado-county-research';
import { getIdahoCountyResearch } from '@/data/idaho-county-research';
import { getMontanaCountyResearch } from '@/data/montana-county-research';
import { getWyomingCountyResearch } from '@/data/wyoming-county-research';
import { getNorthDakotaCountyResearch } from '@/data/north-dakota-county-research';
import { getSouthDakotaCountyResearch } from '@/data/south-dakota-county-research';
import { getNebraskaCountyResearch } from '@/data/nebraska-county-research';
import { getIowaCountyResearch } from '@/data/iowa-county-research';
import { getMinnesotaCountyResearch } from '@/data/minnesota-county-research';
import { getWisconsinCountyResearch } from '@/data/wisconsin-county-research';
import { getTennesseeCountyResearch } from '@/data/tennessee-county-research';
import { getTexasCountyResearch } from '@/data/texas-county-research';
import { buildAttributableCountyReviews } from '@/lib/trust/verified-reviews';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export { buildCountyLabel } from '@/lib/local-movers/schema-helpers';

const SEO_YEAR = '2026';

function hashKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickByHash<T>(items: T[], key: string): T {
  return items[hashKey(key) % items.length];
}

const LOCAL_MOVE_TIPS = [
  'Request in-home or video surveys so quotes reflect stairs, parking, and packing needs.',
  'Book at least 2â€“4 weeks ahead during summer and month-end â€” local crews fill up fast.',
  'Confirm whether your quote is hourly or flat-rate, and ask about minimum hour charges.',
  'Verify USDOT/MC licensing on FMCSA.gov, even for moves under 50 miles.',
  'Ask about valuation coverage before signing â€” released value may not cover high-value items.',
  'Check elevator, HOA, and street-parking restrictions if moving in or out of multi-unit buildings.',
  'Label boxes by room and keep essentials in a â€œfirst nightâ€ bag movers do not load.',
  'Compare at least three written estimates before choosing a local crew.',
];

const RURAL_TIPS = [
  'Confirm drive time and fuel surcharges for rural pickups â€” some crews price by zone.',
  'Ask whether a smaller truck or shuttle vehicle is needed for narrow roads or long driveways.',
  'Schedule mid-week moves when possible for better crew availability in less dense counties.',
];

const URBAN_TIPS = [
  'Reserve loading zones or building freight elevators early in metro areas.',
  'Ask about parking permits if your street has metered or restricted loading windows.',
  'Peak moving season in major metros can add 10â€“20% to local move pricing.',
];

export function getSeoYear(): string {
  return SEO_YEAR;
}

export function buildCountyTitle(county: LocalCounty, _stateName: string): string {
  return buildCountyPageTitle(county, SEO_YEAR);
}

export function buildCountyDescription(
  county: LocalCounty,
  stateName: string,
  moverCount: number
): string {
  const seat = county.seat ? ` near ${county.seat}` : '';
  const countyLabel = buildCountyLabel(county);
  const listingLine =
    moverCount > 0
      ? `Compare ${moverCount} FMCSA-licensed movers serving ${countyLabel}`
      : `Verified mover listings for ${countyLabel} are being expanded`;
  const marketSnippet = sanitizeCountyResearchText(buildCountyMarketNotes(county));
  const localContext = marketSnippet
    ? `${marketSnippet.split('.')[0]}. `
    : '';

  return `${listingLine}, ${county.stateCode}${seat}. ${localContext}Independent directory — FMCSA licensing, industry-reported ratings, and moving tips for ${SEO_YEAR}.`;
}

export function buildStateTitle(stateName: string, countyCount: number): string {
  if (stateName === 'District of Columbia') {
    return `Local Movers in Washington, DC â€” Premium Capital City Guide ${SEO_YEAR}`;
  }
  return `Local Movers in ${stateName} â€” ${countyCount} County Guides ${SEO_YEAR}`;
}

export function buildStateDescription(
  stateName: string,
  countyCount: number
): string {
  if (stateName === 'District of Columbia') {
    return `Find 15 curated local movers in Washington, DC â€” government, diplomatic, high-rise, and corporate relocation specialists with FMCSA licensing, DC cost guides, and capital-city moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Delaware') {
    return `Find curated local movers in all 3 Delaware counties â€” up to 12 ranked companies in New Castle (Wilmington metro), 8+ in Kent and Sussex, FMCSA licensing, county cost guides, and Delaware-specific moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Maryland') {
    return `Find curated local movers in all 24 Maryland jurisdictions â€” 10 ranked companies per county from DC suburbs (Montgomery, Prince George's, Howard, Anne Arundel) through Baltimore metro to the Eastern Shore and Western Maryland. FMCSA licensing, county cost guides, and regional moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Pennsylvania') {
    return `Find curated local movers in all 67 Pennsylvania counties â€” 10 ranked companies per county from Philadelphia and Pittsburgh metros through Harrisburg, Erie, Scranton, and rural regional markets statewide. FMCSA licensing, county cost guides, and regional moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Massachusetts') {
    return `Find curated local movers in all 14 Massachusetts counties â€” 10 ranked companies per county from Boston (Suffolk) and Middlesex through Worcester, Cape Cod, the Berkshires, and the islands. FMCSA licensing, county cost guides, and regional moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Rhode Island') {
    return `Find curated local movers in all 5 Rhode Island counties â€” 10 ranked companies per county from Providence and Kent through Washington, Newport, and Bristol. FMCSA licensing, county cost guides, and regional moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Vermont') {
    return `Find curated local movers in all 14 Vermont counties â€” up to 10 ranked companies in Chittenden (Burlington), 6â€“10 regional specialists in every county experienced with rural roads, winter conditions, ski-season and lakeside moves. FMCSA licensing, county cost guides, and Vermont-specific moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'New Hampshire') {
    return `Find curated local movers in all 10 New Hampshire counties â€” up to 10 ranked companies in Hillsborough (Manchesterâ€“Nashua) and Rockingham (Seacoast), 7â€“10 regional specialists in every county from southern suburban corridors through Lakes Region, White Mountains, and North Country. FMCSA licensing, county cost guides, and New Hampshire-specific moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Maine') {
    return `Find curated local movers in all 16 Maine counties â€” up to 10 ranked companies in Cumberland (Portland), 7â€“9 in York (Seacoast), and 6â€“10 regional specialists in every county experienced with rural roads, harsh winters, tourism/second-home moves, and long-distance relocations. FMCSA licensing, county cost guides, and Maine-specific moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Hawaii') {
    return `Find curated local movers in all 5 Hawaii counties â€” up to 10 ranked companies on Oahu (Honolulu) and Maui, 6â€“10 island specialists on Kauai and Hawaii Island (Big Island), experienced with inter-island shipping, military relocations, and mainland-to-Hawaii long-distance moves. FMCSA licensing, county cost guides, and Hawaii-specific island moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Alaska') {
    return `Find curated local movers across all 29 Alaska boroughs â€” up to 10 ranked companies in Anchorage Municipality, 8â€“10 in Fairbanks North Star and Matanuska-Susitna, and 5+ regional specialists statewide experienced with military PCS, oil & gas relocations, harsh winters, remote logistics, and Lower 48 long-distance moves via Washington. FMCSA licensing, borough cost guides, and Alaska-specific moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Washington') {
    return `Find curated local movers in all 39 Washington counties â€” up to 12 ranked companies in King County (Seattle metro), 10+ in Snohomish and Pierce, 9â€“10 in Spokane, and 6â€“10 regional specialists in every county. Western Washington guides cover tech-corridor, corporate, military (JBLM), and high-density moves; Eastern Washington guides cover suburban, rural, and agricultural markets. FMCSA licensing, county cost guides, and Washington-specific moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Oregon') {
    return `Find curated local movers in all 36 Oregon counties â€” up to 12 ranked companies in Portland metro (Multnomah, Washington, Clackamas), 9â€“10 in Lane and Marion, and 6â€“10 regional specialists in every county. Portland metro guides cover tech, corporate, and high-density urban moves; Willamette Valley, Central Oregon (Bend), coast, and eastern Oregon each have localized cost guides and moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Nevada') {
    return `Find curated local movers in all 17 Nevada counties â€” up to 12 ranked companies in Clark County (Las Vegas metro), 9â€“10 in Washoe (Renoâ€“Sparks), and 6â€“10 regional specialists in every county. Las Vegas guides cover tourism, corporate, military, and high-density moves; Reno guides cover tech, manufacturing, and logistics; rural Nevada guides cover mining, remote logistics, and long-distance regional hauls for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Arizona') {
    return `Find curated local movers in all 15 Arizona counties â€” up to 12 ranked companies in Maricopa County (Phoenix metro), 9â€“10 in Pima (Tucson), and 6â€“10 regional specialists in every county. Phoenix metro guides cover corporate growth, retirement/snowbird moves, and extreme heat logistics; Tucson guides cover university, Davis-Monthan AFB military PCS, and retirement moves; rural Arizona guides cover mining, border corridors, and long-distance regional hauls for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'New Mexico') {
    return `Find curated local movers in all 33 New Mexico counties â€” up to 11 ranked companies in Bernalillo County (Albuquerque metro), 8â€“9 in Santa Fe and DoÃ±a Ana (Las Cruces), and 5â€“7 regional specialists in every county. Albuquerque guides cover corporate, Kirtland AFB military PCS, and suburban moves; Santa Fe and Taos guides cover tourism, second-home, and retirement moves; southern New Mexico guides cover border and military corridors; rural counties emphasize long-distance hauls and remote logistics for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Utah') {
    return `Find curated local movers in all 29 Utah counties â€” up to 12 ranked companies in Salt Lake County (Salt Lake City metro), 9â€“10 in Utah County (Provo-Orem / Silicon Slopes), 8â€“9 in Davis, Weber, and Washington (St. George), and 6â€“8 regional specialists in every county. Wasatch Front guides cover tech growth, family moves, and military PCS; southern Utah guides cover retirement, tourism, and snowbird moves; rural counties emphasize long-distance hauls and outdoor-lifestyle logistics for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Colorado') {
    return `Find curated local movers in all 64 Colorado counties â€” up to 12 ranked companies in Denver metro (Denver, Arapahoe, Jefferson, Adams, Douglas), 10â€“11 in El Paso (Colorado Springs), 9â€“10 in Boulder, Larimer, and Weld, and 6â€“8 regional specialists in every county. Denver metro guides cover tech/corporate growth and outdoor-lifestyle family moves; Colorado Springs guides cover Fort Carson and Peterson SFB military PCS; mountain counties cover tourism and second-home logistics; eastern plains and Western Slope counties emphasize long-distance and agricultural hauls for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Idaho') {
    return `Find curated local movers in all 44 Idaho counties â€” up to 11 ranked companies in Ada County (Boise metro), 8â€“9 in Canyon (Nampaâ€“Caldwell), and 5â€“7 regional specialists in every county. Treasure Valley guides cover rapid suburban growth, corporate relocations, and family moves; northern Idaho guides cover Coeur d'Alene lakeside tourism and second-home logistics; Sun Valley and Teton Valley cover resort-season moves; rural counties emphasize agricultural hauls, long-distance relocations, and remote logistics for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Montana') {
    return `Find curated local movers in all 56 Montana counties â€” up to 11 ranked companies in Yellowstone County (Billings), 8â€“10 in Missoula and Gallatin (Bozeman), 8 in Cascade (Great Falls), and 5â€“7 regional specialists in every county. Billings guides cover regional hub, corporate, and agricultural moves; Missoula and Bozeman cover university, tourism, and outdoor-lifestyle growth; Great Falls covers Malmstrom AFB military PCS; Glacier and Yellowstone gateway counties emphasize tourism and second-home logistics; rural Hi-Line and plains counties emphasize harsh winters, remote logistics, and long-distance Lower 48 hauls for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Wyoming') {
    return `Find curated local movers in all 23 Wyoming counties â€” up to 10 ranked companies in Laramie County (Cheyenne), 8â€“9 in Natrona (Casper), 7â€“8 in Teton (Jackson Hole), and 5â€“7 regional specialists in every county. Cheyenne guides cover government, F.E. Warren AFB military PCS, and Front Range regional hub moves; Casper covers oil-and-gas energy-sector relocations; Jackson Hole covers luxury resort and second-home logistics; rural counties emphasize harsh winters, remote ranch properties, agricultural hauls, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'North Dakota') {
    return `Find curated local movers in all 53 North Dakota counties â€” up to 10 ranked companies in Cass County (Fargo metro), 8â€“9 in Burleigh (Bismarck), 7â€“8 in Williams (Williston / Bakken) and Grand Forks, and 5â€“7 regional specialists in every county. Fargo guides cover corporate, university, and suburban Red River Valley moves; Bismarck covers state government and regional hub relocations; Williston and McKenzie cover Bakken oil-and-gas workforce moves; rural counties emphasize agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'South Dakota') {
    return `Find curated local movers in all 66 South Dakota counties â€” up to 11 ranked companies in Minnehaha County (Sioux Falls metro), 9â€“10 in Pennington (Rapid City / Black Hills), 7â€“8 in Brown (Aberdeen), Codington (Watertown), and Lincoln, and 5â€“7 regional specialists in every county. Sioux Falls guides cover corporate, university, and suburban Big Sioux Valley moves; Rapid City covers Mount Rushmore tourism, Black Hills second-home logistics, and Ellsworth AFB military PCS; rural counties emphasize agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Nebraska') {
    return `Find curated local movers in all 93 Nebraska counties â€” up to 12 ranked companies in Douglas County (Omaha metro), 10 in Sarpy (Papillion / Bellevue) and Lancaster (Lincoln), 7â€“8 in Hall (Grand Island), Buffalo (Kearney), and Dodge (Fremont), and 5â€“7 regional specialists in every county. Omaha guides cover corporate, suburban family moves, and Offutt AFB military PCS; Lincoln covers University of Nebraska and state government relocations; rural counties emphasize agricultural hauls (corn, soybeans, cattle), harsh winters, remote logistics, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Iowa') {
    return `Find curated local movers in 73 Iowa county guides â€” up to 12 ranked companies in Polk County (Des Moines metro), 9â€“10 in Linn (Cedar Rapids), Johnson (Iowa City), and Scott (Quad Cities), 8 in Woodbury (Sioux City), and 5â€“7 regional specialists in every curated county. Des Moines guides cover insurance and finance headquarters, corporate relocations, and suburban family moves; the Cedar Rapidsâ€“Iowa City corridor covers manufacturing, University of Iowa campus turnover, and professional relocations; Quad Cities and Sioux City cover cross-border and agricultural processing logistics; rural counties emphasize corn/soybean/pork agricultural hauls, ethanol-industry corridors, harsh winters, remote logistics, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Wisconsin') {
    return `Find curated local movers in all 72 Wisconsin county guides â€” up to 12 ranked companies in Milwaukee and Waukesha counties, 9â€“10 in Dane (Madison), Brown (Green Bay), Racine, Kenosha, Outagamie, and Winnebago, and 5â€“7 regional specialists in every county. Milwaukee metro guides cover manufacturing, corporate, and high-density urban moves; Madison covers UWâ€“Madison campus and state government relocations; Green Bay and Fox Cities cover manufacturing and logistics; Door County and northwoods counties cover tourism and seasonal second-home logistics; rural counties emphasize dairy/agricultural hauls, harsh winters, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }
  if (stateName === 'Minnesota') {
    return `Find curated local movers in all 87 Minnesota county guides â€” up to 13 ranked companies in Hennepin (Minneapolis) and Ramsey (Saint Paul), 9â€“10 in Dakota, Anoka, Washington, Scott, Carver, and Olmsted (Rochester), 8â€“9 in St. Louis (Duluth), and 5â€“7 regional specialists in every county. Twin Cities metros cover Fortune 500 corporate headquarters, suburban family moves, and high-density urban logistics; Rochester covers Mayo Clinic medical professional relocations; Duluth and North Shore counties cover tourism, seasonal, and second-home logistics; lakes-country and rural counties emphasize agricultural hauls, harsh winters, remote logistics, and very long-distance Lower 48 moves for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
  }

  const moverRange =
    stateName === 'California' ||
    stateName === 'Florida' ||
    stateName === 'Georgia' ||
    stateName === 'New Jersey' ||
    stateName === 'New York' ||
    stateName === 'South Carolina' ||
    stateName === 'North Carolina' ||
    stateName === 'Tennessee' ||
    stateName === 'Alabama' ||
    stateName === 'Mississippi' ||
    stateName === 'Louisiana' ||
    stateName === 'Oklahoma' ||
    stateName === 'Arkansas' ||
    stateName === 'Kansas' ||
    stateName === 'Missouri' ||
    stateName === 'Illinois' ||
    stateName === 'Michigan' ||
    stateName === 'Indiana' ||
    stateName === 'Ohio' ||
    stateName === 'Kentucky' ||
    stateName === 'West Virginia' ||
    stateName === 'Virginia' ||
    stateName === 'Delaware' ||
    stateName === 'Texas'
      ? '5â€“10 curated movers per county'
      : 'vetted local movers per county';
  return `Find trusted local movers in all ${countyCount} ${stateName} counties â€” ${moverRange}, FMCSA licensing, county cost guides, and local moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
}

export type CountyFaqItem = {
  question: string;
  answer: string;
};

export function buildCountyFaqItems(
  county: LocalCounty,
  stateName: string,
  movers: LocalMover[]
): CountyFaqItem[] {
  const countyLabel = buildCountyLabel(county);
  const location = county.seat ?? countyLabel;
  const costs = buildCountyCostGuide(county, stateName);
  const eligibleTop = movers.filter(
    (m) => (m.rating ?? 0) >= 4.0 && (m.reviewCount ?? 0) >= 5
  );
  const topMovers = eligibleTop.slice(0, 3);
  const topMoverList = topMovers
    .map((m) => `${m.name} (${m.rating}★, ${m.reviewCount.toLocaleString()} reviews)`)
    .join(', ');

  const bestMoversAnswer =
    topMovers.length > 1
      ? `Among verified listings with real review volume serving ${location}, higher-rated options include ${topMoverList}. We prioritize true local/in-state signals when available, then ratings, licensing completeness, and review volume — never zero-review shells as “top-rated.”`
      : topMovers.length === 1
        ? `Among verified listings with real review volume serving ${location}, ${topMovers[0]!.name} currently shows ${topMovers[0]!.rating}★ from ${topMovers[0]!.reviewCount.toLocaleString()} industry-reported reviews. Compare full listings on this page and verify licensing before booking.`
        : `We do not label zero-review or unrated shells as top-rated. Compare verified movers on this page by licensing, local/in-state fit, and review basis — then confirm credentials on FMCSA.gov (and state public-mover rules for purely intrastate work).`;

  const licensingAnswer =
    county.stateSlug === 'new-jersey'
      ? `Interstate moves (crossing state lines) require active FMCSA USDOT and usually MC authority — verify on FMCSA SAFER. Purely local/intrastate New Jersey moves are regulated under New Jersey’s public movers framework (Division of Consumer Affairs), not FMCSA alone. FMCSA does not cover every local NJ job; confirm the correct authority for your move type.`
      : county.stateSlug === 'california'
        ? `Interstate moves require active FMCSA USDOT and usually MC authority — verify on FMCSA SAFER. Purely local/intrastate California moves are generally overseen by the California Bureau of Household Goods and Services (BHGS). FMCSA does not cover every in-state CA job; confirm BHGS vs FMCSA for your exact origin and destination before you deposit.`
        : county.stateSlug === 'florida'
          ? `Interstate moves require active FMCSA USDOT and usually MC authority — verify on FMCSA SAFER. Purely local/intrastate Florida household moves are generally subject to Florida Statutes Chapter 507 registration administered by the Florida Department of Agriculture and Consumer Services (FDACS). FMCSA does not cover every in-state Florida job; confirm FDACS registration vs FMCSA for your exact origin and destination before you deposit.`
          : county.stateSlug === 'texas'
            ? `Interstate moves require active FMCSA USDOT and usually MC authority — verify on FMCSA SAFER. Purely local/intrastate Texas household goods moves generally require active Texas Department of Motor Vehicles (TxDMV) household goods authority. FMCSA does not cover every in-state Texas job; confirm TxDMV authority vs FMCSA for your exact origin and destination before you deposit.`
            : `Interstate movers must hold active FMCSA USDOT and MC numbers. For purely local moves within ${stateName}, state rules may apply in addition to (or instead of) FMCSA. Always verify credentials before paying a deposit.`;

  const baseFaqs: CountyFaqItem[] = [
    {
      question: `How much do local movers cost in ${countyLabel}, ${stateName}?`,
      answer: `Local moves in ${countyLabel} typically range from ${costs.studioRange} for studio or one-bedroom apartments to ${costs.familyRange} for larger homes. ${costs.note} Use our moving calculator for interstate estimates or compare vetted movers in our directory.`,
    },
    {
      question: `What are the best local movers in ${countyLabel}?`,
      answer: bestMoversAnswer,
    },
    {
      question: `Do local movers in ${stateName} need an FMCSA license?`,
      answer: licensingAnswer,
    },
    {
      question: `How far in advance should I book movers in ${location}?`,
      answer: `For local moves in ${countyLabel}, book 2–4 weeks ahead for standard timing. Peak season (May–September), month-end turns, and weekends in ${location} may require 4–6 weeks lead time. Last-minute moves are sometimes available but cost more.`,
    },
    {
      question: `What is the difference between local and interstate movers in ${countyLabel}?`,
      answer: `Local and in-state movers handle in-county and short-distance relocations, often priced hourly or by crew size. National/long-distance carriers transport goods under FMCSA regulation when the move crosses state lines. Listings on this page separate local/in-state companies from national carriers serving ${countyLabel} so you can choose the right fit.`,
    },
    {
      question: `How do I avoid moving scams in ${countyLabel}?`,
      answer: `Get written estimates after an inventory survey, avoid large upfront deposits via wire or gift cards, verify USDOT numbers on FMCSA.gov (and NJ public-mover credentials for in-state-only jobs when applicable), and compare multiple companies. Read our guide on spotting red flags before booking movers in ${location}.`,
    },
  ];

  const extras = getDeepCountyFaqExtras(county.stateSlug, county.slug) ?? [];
  // Dedupe by normalized question text — deep extras must not repeat base FAQs.
  const seen = new Set<string>();
  const deduped: CountyFaqItem[] = [];
  for (const item of [...baseFaqs, ...extras]) {
    const key = item.question.trim().toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }
  return deduped;
}

export type CountyCostGuide = {
  studioRange: string;
  familyRange: string;
  avgHourly: string;
  note: string;
};

export function buildCountyMarketNotes(county: LocalCounty): string | undefined {
  const merged = getCountyResearch(county.stateSlug, county.slug);
  if (merged?.marketNotes) return merged.marketNotes;

  if (county.stateSlug === 'california') {
    return getCaliforniaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'florida') {
    return getFloridaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'new-jersey') {
    return getNewJerseyCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'new-york') {
    return getNewYorkCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'texas') {
    return getTexasCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'georgia') {
    return getGeorgiaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'south-carolina') {
    return getSouthCarolinaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'north-carolina') {
    return getNorthCarolinaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'tennessee') {
    return getTennesseeCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'alabama') {
    return getAlabamaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'mississippi') {
    return getMississippiCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'louisiana') {
    return getLouisianaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'oklahoma') {
    return getOklahomaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'arkansas') {
    return getArkansasCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'kansas') {
    return getKansasCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'missouri') {
    return getMissouriCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'illinois') {
    return getIllinoisCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'michigan') {
    return getMichiganCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'indiana') {
    return getIndianaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'ohio') {
    return getOhioCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'kentucky') {
    return getKentuckyCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'west-virginia') {
    return getWestVirginiaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'virginia') {
    return getVirginiaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'district-of-columbia') {
    return getDistrictOfColumbiaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'delaware') {
    return getDelawareCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'maryland') {
    return getMarylandCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'pennsylvania') {
    return getPennsylvaniaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'connecticut') {
    return getConnecticutCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'massachusetts') {
    return getMassachusettsCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'rhode-island') {
    return getRhodeIslandCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'vermont') {
    return getVermontCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'new-hampshire') {
    return getNewHampshireCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'maine') {
    return getMaineCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'hawaii') {
    return getHawaiiCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'alaska') {
    return getAlaskaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'washington') {
    return getWashingtonCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'oregon') {
    return getOregonCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'nevada') {
    return getNevadaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'arizona') {
    return getArizonaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'new-mexico') {
    return getNewMexicoCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'utah') {
    return getUtahCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'colorado') {
    return getColoradoCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'idaho') {
    return getIdahoCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'montana') {
    return getMontanaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'wyoming') {
    return getWyomingCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'north-dakota') {
    return getNorthDakotaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'south-dakota') {
    return getSouthDakotaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'nebraska') {
    return getNebraskaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'iowa') {
    return getIowaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'minnesota') {
    return getMinnesotaCountyResearch(county.slug)?.marketNotes;
  }
  if (county.stateSlug === 'wisconsin') {
    return getWisconsinCountyResearch(county.slug)?.marketNotes;
  }
  return undefined;
}

export function buildCountyCostGuide(
  county: LocalCounty,
  stateName: string
): CountyCostGuide {
  const merged = getCountyResearch(county.stateSlug, county.slug);
  if (merged?.costs) return merged.costs;

  if (county.stateSlug === 'california') {
    const curated = getCaliforniaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'florida') {
    const curated = getFloridaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'new-jersey') {
    const curated = getNewJerseyCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'new-york') {
    const curated = getNewYorkCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'texas') {
    const curated = getTexasCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'georgia') {
    const curated = getGeorgiaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'south-carolina') {
    const curated = getSouthCarolinaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'north-carolina') {
    const curated = getNorthCarolinaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'tennessee') {
    const curated = getTennesseeCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'alabama') {
    const curated = getAlabamaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'mississippi') {
    const curated = getMississippiCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'louisiana') {
    const curated = getLouisianaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'oklahoma') {
    const curated = getOklahomaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'arkansas') {
    const curated = getArkansasCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'kansas') {
    const curated = getKansasCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'missouri') {
    const curated = getMissouriCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'illinois') {
    const curated = getIllinoisCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'michigan') {
    const curated = getMichiganCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'indiana') {
    const curated = getIndianaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'ohio') {
    const curated = getOhioCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'kentucky') {
    const curated = getKentuckyCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'west-virginia') {
    const curated = getWestVirginiaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'virginia') {
    const curated = getVirginiaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'district-of-columbia') {
    const curated = getDistrictOfColumbiaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'delaware') {
    const curated = getDelawareCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'maryland') {
    const curated = getMarylandCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'pennsylvania') {
    const curated = getPennsylvaniaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'connecticut') {
    const curated = getConnecticutCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'massachusetts') {
    const curated = getMassachusettsCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'rhode-island') {
    const curated = getRhodeIslandCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'vermont') {
    const curated = getVermontCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'new-hampshire') {
    const curated = getNewHampshireCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'maine') {
    const curated = getMaineCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'hawaii') {
    const curated = getHawaiiCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'alaska') {
    const curated = getAlaskaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'washington') {
    const curated = getWashingtonCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'oregon') {
    const curated = getOregonCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'nevada') {
    const curated = getNevadaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'arizona') {
    const curated = getArizonaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'new-mexico') {
    const curated = getNewMexicoCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'utah') {
    const curated = getUtahCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'colorado') {
    const curated = getColoradoCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'idaho') {
    const curated = getIdahoCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'montana') {
    const curated = getMontanaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'wyoming') {
    const curated = getWyomingCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'north-dakota') {
    const curated = getNorthDakotaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'south-dakota') {
    const curated = getSouthDakotaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'nebraska') {
    const curated = getNebraskaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'iowa') {
    const curated = getIowaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'minnesota') {
    const curated = getMinnesotaCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }
  if (county.stateSlug === 'wisconsin') {
    const curated = getWisconsinCountyResearch(county.slug)?.costs;
    if (curated) return curated;
  }

  const isMetro = Boolean(county.metro);
  const key = `${county.stateSlug}-${county.slug}`;

  if (isMetro) {
    const tiers = [
      {
        studioRange: '$350â€“$900',
        familyRange: '$1,400â€“$3,800',
        avgHourly: '$110â€“$165/hr for a 2-person crew',
        note: `Metro-area pricing in ${county.name} County reflects parking, elevator access, and higher labor demand.`,
      },
      {
        studioRange: '$400â€“$1,000',
        familyRange: '$1,500â€“$4,200',
        avgHourly: '$120â€“$175/hr for a 2-person crew',
        note: `Moves near ${county.seat ?? county.name} often include building fees or shuttle truck costs.`,
      },
    ];
    return pickByHash(tiers, key);
  }

  const tiers = [
    {
      studioRange: '$250â€“$650',
      familyRange: '$900â€“$2,400',
      avgHourly: '$90â€“$140/hr for a 2-person crew',
      note: `Rural and smaller-market pricing in ${stateName} is generally lower than major metro areas.`,
    },
    {
      studioRange: '$280â€“$750',
      familyRange: '$1,000â€“$2,800',
      avgHourly: '$95â€“$150/hr for a 2-person crew',
      note: `Travel distance and crew availability can affect final pricing in ${county.name} County.`,
    },
  ];
  return pickByHash(tiers, key);
}

export function buildCountyTips(county: LocalCounty, _stateName: string): string[] {
  const merged = getCountyResearch(county.stateSlug, county.slug);
  if (merged?.tips?.length) return merged.tips;

  if (county.stateSlug === 'california') {
    const curated = getCaliforniaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'florida') {
    const curated = getFloridaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'new-jersey') {
    const curated = getNewJerseyCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'new-york') {
    const curated = getNewYorkCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'texas') {
    const curated = getTexasCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'georgia') {
    const curated = getGeorgiaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'south-carolina') {
    const curated = getSouthCarolinaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'north-carolina') {
    const curated = getNorthCarolinaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'tennessee') {
    const curated = getTennesseeCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'alabama') {
    const curated = getAlabamaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'mississippi') {
    const curated = getMississippiCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'louisiana') {
    const curated = getLouisianaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'oklahoma') {
    const curated = getOklahomaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'arkansas') {
    const curated = getArkansasCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'kansas') {
    const curated = getKansasCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'missouri') {
    const curated = getMissouriCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'illinois') {
    const curated = getIllinoisCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'michigan') {
    const curated = getMichiganCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'indiana') {
    const curated = getIndianaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'ohio') {
    const curated = getOhioCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'kentucky') {
    const curated = getKentuckyCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'west-virginia') {
    const curated = getWestVirginiaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'virginia') {
    const curated = getVirginiaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'district-of-columbia') {
    const curated = getDistrictOfColumbiaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'delaware') {
    const curated = getDelawareCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'maryland') {
    const curated = getMarylandCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'pennsylvania') {
    const curated = getPennsylvaniaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'connecticut') {
    const curated = getConnecticutCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'massachusetts') {
    const curated = getMassachusettsCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'rhode-island') {
    const curated = getRhodeIslandCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'vermont') {
    const curated = getVermontCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'new-hampshire') {
    const curated = getNewHampshireCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'maine') {
    const curated = getMaineCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'hawaii') {
    const curated = getHawaiiCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'alaska') {
    const curated = getAlaskaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'washington') {
    const curated = getWashingtonCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'oregon') {
    const curated = getOregonCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'nevada') {
    const curated = getNevadaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'arizona') {
    const curated = getArizonaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'new-mexico') {
    const curated = getNewMexicoCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'utah') {
    const curated = getUtahCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'colorado') {
    const curated = getColoradoCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'idaho') {
    const curated = getIdahoCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'montana') {
    const curated = getMontanaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'wyoming') {
    const curated = getWyomingCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'north-dakota') {
    const curated = getNorthDakotaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'south-dakota') {
    const curated = getSouthDakotaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'nebraska') {
    const curated = getNebraskaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'iowa') {
    const curated = getIowaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'minnesota') {
    const curated = getMinnesotaCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }
  if (county.stateSlug === 'wisconsin') {
    const curated = getWisconsinCountyResearch(county.slug)?.tips;
    if (curated?.length) return curated;
  }

  const key = `${county.stateSlug}-${county.slug}`;
  const base = pickByHash(LOCAL_MOVE_TIPS, key);
  const extra = county.metro
    ? pickByHash(URBAN_TIPS, key)
    : pickByHash(RURAL_TIPS, key);

  const tips = new Set<string>([base, extra]);
  for (let i = 0; i < LOCAL_MOVE_TIPS.length && tips.size < 5; i++) {
    tips.add(LOCAL_MOVE_TIPS[(hashKey(key) + i) % LOCAL_MOVE_TIPS.length]);
  }

  return Array.from(tips).slice(0, 5);
}

export type CountyTestimonial = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
  source?: string;
  date?: string;
  reviewId?: string;
  companyName?: string;
  companySlug?: string;
};

export type CountyTestimonialEntry = CountyTestimonial;

export function buildCountyTestimonials(
  _county: LocalCounty,
  _stateName: string,
  movers: LocalMover[] = []
): CountyTestimonial[] {
  return buildAttributableCountyReviews(movers, 3);
}

/** @deprecated Use buildCountyTestimonials */
export function buildCountyTestimonial(
  county: LocalCounty,
  stateName: string
): CountyTestimonial {
  return buildCountyTestimonials(county, stateName)[0];
}

export const STATE_CODE_TO_SLUG: Record<string, string> = {
  AL: 'alabama',
  AK: 'alaska',
  AZ: 'arizona',
  AR: 'arkansas',
  CA: 'california',
  CO: 'colorado',
  CT: 'connecticut',
  DE: 'delaware',
  FL: 'florida',
  GA: 'georgia',
  HI: 'hawaii',
  ID: 'idaho',
  IL: 'illinois',
  IN: 'indiana',
  IA: 'iowa',
  KS: 'kansas',
  KY: 'kentucky',
  LA: 'louisiana',
  ME: 'maine',
  MD: 'maryland',
  MA: 'massachusetts',
  MI: 'michigan',
  MN: 'minnesota',
  WI: 'wisconsin',
  MS: 'mississippi',
  MO: 'missouri',
  MT: 'montana',
  NE: 'nebraska',
  NV: 'nevada',
  NH: 'new-hampshire',
  NJ: 'new-jersey',
  NM: 'new-mexico',
  NY: 'new-york',
  NC: 'north-carolina',
  ND: 'north-dakota',
  OH: 'ohio',
  OK: 'oklahoma',
  OR: 'oregon',
  PA: 'pennsylvania',
  RI: 'rhode-island',
  SC: 'south-carolina',
  SD: 'south-dakota',
  TN: 'tennessee',
  TX: 'texas',
  UT: 'utah',
  VT: 'vermont',
  VA: 'virginia',
  DC: 'district-of-columbia',
  WA: 'washington',
  WV: 'west-virginia',
  WY: 'wyoming',
};

export function getStateSlugFromCode(code: string): string | undefined {
  return STATE_CODE_TO_SLUG[code.toUpperCase()];
}
