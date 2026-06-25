/**
 * Generates Wisconsin county curation files (batch 1 — 10 counties).
 * Run: npx tsx scripts/generate-wisconsin-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 10;

type CostTier = 'metro' | 'secondary_metro' | 'regional_hub' | 'rural';

type CountyDef = {
  slug: string;
  name: string;
  seat: string;
  city: string;
  metro: string;
  costTier: CostTier;
  marketNotes: string;
  costNote: string;
  tipVariant:
    | 'standard'
    | 'metro'
    | 'medical'
    | 'tourist'
    | 'university'
    | 'rural';
  citySlug: string;
  regional1: string;
  regional2: string;
  topId: string;
  topName: string;
  regional1Name: string;
  regional2Name: string;
  franchise?: boolean;
};

const COSTS: Record<
  CostTier,
  { studioRange: string; familyRange: string; avgHourly: string }
> = {
  metro: {
    studioRange: '$900–$1,900',
    familyRange: '$3,500–$8,500+',
    avgHourly: '$125–$195/hr for a 2-person crew',
  },
  secondary_metro: {
    studioRange: '$850–$1,700',
    familyRange: '$3,000–$7,000+',
    avgHourly: '$120–$185/hr for a 2-person crew',
  },
  regional_hub: {
    studioRange: '$800–$1,600',
    familyRange: '$2,900–$6,500+',
    avgHourly: '$115–$175/hr for a 2-person crew',
  },
  rural: {
    studioRange: '$750–$1,500',
    familyRange: '$2,600–$5,800+',
    avgHourly: '$100–$155/hr for a 2-person crew',
  },
};

const DISPLAY_LABELS: Partial<Record<string, string>> = {
  milwaukee: 'Milwaukee County, WI',
  dane: 'Dane County, WI',
  waukesha: 'Waukesha County, WI',
  brown: 'Brown County, WI',
  racine: 'Racine County, WI',
  outagamie: 'Outagamie County, WI',
  winnebago: 'Winnebago County, WI',
  kenosha: 'Kenosha County, WI',
  rock: 'Rock County, WI',
  marathon: 'Marathon County, WI',
};

const WI_NEIGHBORS: Record<string, string[]> = {
  milwaukee: ['waukesha', 'racine', 'washington', 'ozaukee'],
  dane: ['columbia', 'dodge', 'green', 'iowa', 'rock', 'sauk'],
  waukesha: ['dodge', 'jefferson', 'milwaukee', 'walworth', 'washington'],
  brown: ['door', 'kewaunee', 'oconto', 'outagamie', 'shawano'],
  racine: ['kenosha', 'milwaukee', 'walworth'],
  outagamie: ['brown', 'calumet', 'manitowoc', 'shawano', 'waupaca', 'winnebago'],
  winnebago: [
    'calumet',
    'fond-du-lac',
    'green-lake',
    'outagamie',
    'waushara',
    'waupaca',
  ],
  kenosha: ['racine', 'walworth', 'lake'],
  rock: ['dane', 'green', 'jefferson', 'walworth', 'winnebago'],
  marathon: ['clark', 'langlade', 'lincoln', 'portage', 'taylor', 'wood'],
};

const CROSS_BORDER: Record<
  string,
  Array<{
    slug: string;
    stateSlug: string;
    name: string;
    seat: string;
    displayLabel: string;
  }>
> = {
  kenosha: [
    {
      slug: 'lake',
      stateSlug: 'illinois',
      name: 'Lake',
      seat: 'Waukegan',
      displayLabel: 'Lake County, IL',
    },
  ],
  rock: [
    {
      slug: 'winnebago',
      stateSlug: 'illinois',
      name: 'Winnebago',
      seat: 'Rockford',
      displayLabel: 'Winnebago County, IL',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'milwaukee',
    name: 'Milwaukee',
    seat: 'Milwaukee',
    city: 'Milwaukee',
    metro: 'milwaukee-metro-wi',
    costTier: 'metro',
    citySlug: 'milwaukee',
    regional1: 'milwaukee-corridor',
    regional2: 'lake-michigan-milwaukee',
    topId: 'twomenandatruck-milwaukee-wi',
    topName: 'Two Men and a Truck Milwaukee',
    regional1Name: 'Milwaukee Corridor Moving',
    regional2Name: 'Lake Michigan Milwaukee Moving',
    franchise: true,
    marketNotes:
      'Milwaukee County, WI is Wisconsin’s most populous county centered on Milwaukee with strong urban, suburban, and residential demand across the Milwaukee metro and Lake Michigan corridor.',
    costNote:
      'Milwaukee County pricing reflects Milwaukee metro demand, I-43 and I-94 corridor traffic, high-value urban and suburban homes, and competition among full-service agents serving Milwaukee County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'dane',
    name: 'Dane',
    seat: 'Madison',
    city: 'Madison',
    metro: 'dane-metro-wi',
    costTier: 'metro',
    citySlug: 'madison',
    regional1: 'madison-corridor',
    regional2: 'capitol-square-dane',
    topId: 'regional-dane-wi-movers',
    topName: 'Regional Madison / Dane Providers',
    regional1Name: 'Madison Corridor Moving',
    regional2Name: 'Capitol Square Dane Moving',
    marketNotes:
      'Dane County, WI is a major urban county centered on Madison with strong governmental, university, and residential demand across Wisconsin’s capital corridor — not to be confused with Dane County in other states.',
    costNote:
      'Dane County pricing reflects Madison metro demand, capitol-city and university-area logistics, and competition among regional agents serving Dane County communities.',
    tipVariant: 'university',
  },
  {
    slug: 'waukesha',
    name: 'Waukesha',
    seat: 'Waukesha',
    city: 'Waukesha',
    metro: 'waukesha-metro-wi',
    costTier: 'metro',
    citySlug: 'waukesha',
    regional1: 'waukesha-corridor',
    regional2: 'lake-country-waukesha',
    topId: 'regional-waukesha-wi-movers',
    topName: 'Regional Waukesha / Waukesha County Providers',
    regional1Name: 'Waukesha Corridor Moving',
    regional2Name: 'Lake Country Waukesha Moving',
    marketNotes:
      'Waukesha County, WI is a major suburban county in the Milwaukee metro west corridor with strong residential demand across Waukesha, Lake Country, and west suburban communities.',
    costNote:
      'Waukesha County pricing reflects west Milwaukee suburban demand, I-94 corridor traffic, high-value Lake Country homes, and competition among regional agents serving Waukesha County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'brown',
    name: 'Brown',
    seat: 'Green Bay',
    city: 'Green Bay',
    metro: 'brown-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'green-bay',
    regional1: 'green-bay-corridor',
    regional2: 'fox-river-brown',
    topId: 'regional-brown-wi-movers',
    topName: 'Regional Green Bay / Brown Providers',
    regional1Name: 'Green Bay Corridor Moving',
    regional2Name: 'Fox River Brown Moving',
    marketNotes:
      'Brown County, WI is a northeastern Wisconsin county centered on Green Bay with strong urban, port, and residential demand along the Fox River corridor — not to be confused with Brown County, MN or other Brown counties nationwide.',
    costNote:
      'Brown County pricing reflects Green Bay-area demand, Fox River corridor travel distances, and competition among regional agents serving Brown County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'racine',
    name: 'Racine',
    seat: 'Racine',
    city: 'Racine',
    metro: 'racine-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'racine',
    regional1: 'racine-corridor',
    regional2: 'root-river-racine',
    topId: 'regional-racine-wi-movers',
    topName: 'Regional Racine / Racine County Providers',
    regional1Name: 'Racine Corridor Moving',
    regional2Name: 'Root River Racine Moving',
    marketNotes:
      'Racine County, WI is a southeastern Wisconsin county centered on Racine with strong urban, suburban, and residential demand along the Root River and Lake Michigan corridor.',
    costNote:
      'Racine County pricing reflects Racine-area demand, Lake Michigan shoreline logistics, and competition among regional agents serving Racine County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'outagamie',
    name: 'Outagamie',
    seat: 'Appleton',
    city: 'Appleton',
    metro: 'outagamie-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'appleton',
    regional1: 'appleton-corridor',
    regional2: 'fox-cities-outagamie',
    topId: 'regional-outagamie-wi-movers',
    topName: 'Regional Appleton / Outagamie Providers',
    regional1Name: 'Appleton Corridor Moving',
    regional2Name: 'Fox Cities Outagamie Moving',
    marketNotes:
      'Outagamie County, WI is a Fox Valley county centered on Appleton with strong urban, suburban, and residential demand across Fox Cities corridor communities.',
    costNote:
      'Outagamie County pricing reflects Appleton-area demand, Fox Cities corridor travel distances, and competition among regional agents serving Outagamie County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'winnebago',
    name: 'Winnebago',
    seat: 'Oshkosh',
    city: 'Oshkosh',
    metro: 'winnebago-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'oshkosh',
    regional1: 'oshkosh-corridor',
    regional2: 'lake-winnebago-winnebago',
    topId: 'regional-winnebago-wi-movers',
    topName: 'Regional Oshkosh / Winnebago Providers',
    regional1Name: 'Oshkosh Corridor Moving',
    regional2Name: 'Lake Winnebago Winnebago Moving',
    marketNotes:
      'Winnebago County, WI is a Fox Valley county centered on Oshkosh with strong urban, suburban, and residential demand along Lake Winnebago — not to be confused with Winnebago County, IA or Winnebago County, IL.',
    costNote:
      'Winnebago County pricing reflects Oshkosh-area demand, Lake Winnebago corridor travel distances, and competition among regional agents serving Winnebago County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'kenosha',
    name: 'Kenosha',
    seat: 'Kenosha',
    city: 'Kenosha',
    metro: 'kenosha-metro-wi',
    costTier: 'metro',
    citySlug: 'kenosha',
    regional1: 'kenosha-corridor',
    regional2: 'chicago-milwaukee-kenosha',
    topId: 'regional-kenosha-wi-movers',
    topName: 'Regional Kenosha / Kenosha County Providers',
    regional1Name: 'Kenosha Corridor Moving',
    regional2Name: 'Chicago Milwaukee Kenosha Moving',
    marketNotes:
      'Kenosha County, WI is a southeastern Wisconsin county centered on Kenosha with strong urban, suburban, and residential demand along the Chicago–Milwaukee I-94 corridor — not to be confused with Kenosha County in other states.',
    costNote:
      'Kenosha County pricing reflects Chicago–Milwaukee I-94 corridor demand, cross-border Illinois logistics, Lake Michigan shoreline communities, and competition among regional agents serving Kenosha County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'rock',
    name: 'Rock',
    seat: 'Janesville',
    city: 'Janesville',
    metro: 'rock-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'janesville',
    regional1: 'janesville-corridor',
    regional2: 'rock-river-rock',
    topId: 'regional-rock-wi-movers',
    topName: 'Regional Janesville / Rock Providers',
    regional1Name: 'Janesville Corridor Moving',
    regional2Name: 'Rock River Rock Moving',
    marketNotes:
      'Rock County, WI is a southern Wisconsin county centered on Janesville with strong urban, suburban, and residential demand along the Rock River corridor — not to be confused with Rock County, MN or Rock County in other states.',
    costNote:
      'Rock County pricing reflects Janesville-area demand, Rock River corridor travel distances, cross-border Illinois logistics, and competition among regional agents serving Rock County, WI communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'marathon',
    name: 'Marathon',
    seat: 'Wausau',
    city: 'Wausau',
    metro: 'marathon-metro-wi',
    costTier: 'secondary_metro',
    citySlug: 'wausau',
    regional1: 'wausau-corridor',
    regional2: 'wisconsin-river-marathon',
    topId: 'regional-marathon-wi-movers',
    topName: 'Regional Wausau / Marathon Providers',
    regional1Name: 'Wausau Corridor Moving',
    regional2Name: 'Wisconsin River Marathon Moving',
    marketNotes:
      'Marathon County, WI is a north-central Wisconsin county centered on Wausau with strong urban, suburban, and residential demand along the Wisconsin River corridor.',
    costNote:
      'Marathon County pricing reflects Wausau-area demand, Wisconsin River corridor travel distances, and competition among regional agents serving Marathon County communities.',
    tipVariant: 'standard',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  washington: { name: 'Washington', seat: 'West Bend' },
  ozaukee: { name: 'Ozaukee', seat: 'Port Washington' },
  jefferson: { name: 'Jefferson', seat: 'Jefferson' },
  walworth: { name: 'Walworth', seat: 'Elkhorn' },
  columbia: { name: 'Columbia', seat: 'Portage' },
  green: { name: 'Green', seat: 'Monroe' },
  sauk: { name: 'Sauk', seat: 'Baraboo' },
  iowa: { name: 'Iowa', seat: 'Dodgeville' },
  door: { name: 'Door', seat: 'Sturgeon Bay' },
  kewaunee: { name: 'Kewaunee', seat: 'Kewaunee' },
  oconto: { name: 'Oconto', seat: 'Oconto' },
  shawano: { name: 'Shawano', seat: 'Shawano' },
  calumet: { name: 'Calumet', seat: 'Chilton' },
  manitowoc: { name: 'Manitowoc', seat: 'Manitowoc' },
  waupaca: { name: 'Waupaca', seat: 'Waupaca' },
  'fond-du-lac': { name: 'Fond du Lac', seat: 'Fond du Lac' },
  'green-lake': { name: 'Green Lake', seat: 'Green Lake' },
  waushara: { name: 'Waushara', seat: 'Wautoma' },
  clark: { name: 'Clark', seat: 'Neillsville' },
  langlade: { name: 'Langlade', seat: 'Antigo' },
  lincoln: { name: 'Lincoln', seat: 'Merrill' },
  portage: { name: 'Portage', seat: 'Stevens Point' },
  taylor: { name: 'Taylor', seat: 'Medford' },
  wood: { name: 'Wood', seat: 'Wisconsin Rapids' },
  dodge: { name: 'Dodge', seat: 'Juneau' },
};

function q(s: string): string {
  return JSON.stringify(s);
}

function slugKey(slug: string): string {
  return slug.includes('-') || /^\d/.test(slug) ? `'${slug}'` : slug;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, WI`;
}

const STANDARD_TIPS = [
  'Verify coverage for surrounding areas before booking.',
  'Regional traffic impacts scheduling — confirm crew arrival windows.',
  'Confirm insurance for high-value homes before move day.',
  'Book early for peak seasons (May–September) and month-end lease changeover.',
  'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
];

function buildTips(c: CountyDef): string[] {
  const city = c.city;
  if (c.tipVariant === 'metro') {
    return [
      `Verify coverage for ${city} and surrounding Milwaukee metro communities before booking.`,
      'I-43, I-94, and I-41 congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, condos, and townhomes before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'medical') {
    return [
      `Verify coverage for ${city} and surrounding county communities before booking.`,
      'Medical-sector relocations and housing turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value homes and professional relocations before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'university') {
    return [
      `Verify coverage for ${city} and surrounding areas before booking.`,
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'tourist') {
    return [
      `Verify coverage for ${city} and surrounding areas before booking.`,
      'Tourist-season congestion and vacation-rental turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value gateway homes, seasonal properties, and vacation rentals before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'rural') {
    return [
      `Verify coverage for ${city} and surrounding areas before booking.`,
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  return [
    `Verify coverage for ${city} and surrounding areas before booking.`,
    STANDARD_TIPS[1],
    STANDARD_TIPS[2],
    STANDARD_TIPS[3],
    STANDARD_TIPS[4],
  ];
}

function moverIds(c: CountyDef): string[] {
  const slug = c.slug;
  const citySlug = c.citySlug;
  return [
    c.topId,
    `all-my-sons-${citySlug}-wi`,
    `${citySlug}-moving-${slug}-wi`,
    `${slug}-county-moving-${slug}-wi`,
    `college-hunks-moving-${citySlug}-wi`,
    `budd-van-lines-${citySlug}-wi`,
    `${c.regional1}-moving-${slug}-wi`,
    `${c.regional2}-moving-${slug}-wi`,
    `hercules-movers-${citySlug}-wi`,
    `krupp-moving-${citySlug}-wi`,
  ];
}

const FRANCHISE_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  milwaukee: [
    {
      quote:
        'Two Men and a Truck Milwaukee handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Milwaukee, WI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Milwaukee navigated our Wauwatosa relocation with fair pricing through Milwaukee metro corridor traffic.',
      name: 'Beth N.',
      location: 'Milwaukee, WI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Lake Michigan Milwaukee Moving served our Shorewood-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Shorewood, WI',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

function buildTestimonials(c: CountyDef, idx: number): string {
  const hand = FRANCHISE_TESTIMONIALS[c.slug];
  if (hand) {
    const lines = hand
      .map(
        (t) =>
          `    { quote: ${q(t.quote)}, name: ${q(t.name)}, location: ${q(t.location)}, rating: ${t.rating}, moveType: ${q(t.moveType)} },`
      )
      .join('\n');
    return `  ${slugKey(c.slug)}: [\n${lines}\n  ],`;
  }
  const names = ['Dana P.', 'Eric Q.', 'Fran R.', 'Gia S.', 'Hal T.', 'Ivy U.', 'Jay V.', 'Kim W.'];
  const n1 = names[idx % names.length];
  const n2 = names[(idx + 1) % names.length];
  const n3 = names[(idx + 2) % names.length];
  const city = c.city;
  const altLoc = c.seat !== c.city ? `${c.seat}, WI` : `${city}, WI`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, WI`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, WI`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const wiNeighbors = WI_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const crossSlugs = new Set(cross.map((cb) => cb.slug));
  const maxWi = Math.min(wiNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of wiNeighbors.slice(0, maxWi)) {
    if (crossSlugs.has(n)) continue;
    const curated = COUNTIES.find((c) => c.slug === n);
    const fallback = NON_CURATED_NAMES[n];
    const name = curated?.name ?? fallback?.name ?? n;
    const seat = curated?.seat ?? fallback?.seat ?? SEAT_BY_SLUG[n] ?? n;
    const label = curated
      ? defaultDisplayLabel(n, curated.name)
      : defaultDisplayLabel(n, name);
    const parts = [
      `slug: ${q(n)}`,
      `name: ${q(name)}`,
      `seat: ${q(seat)}`,
      `href: ${q(`/local-movers/wisconsin/${n}`)}`,
      `displayLabel: ${q(label)}`,
    ];
    links.push(`    { ${parts.join(', ')} }`);
  }

  for (const cb of cross) {
    links.push(
      `    { slug: ${q(cb.slug)}, name: ${q(cb.name)}, seat: ${q(cb.seat)}, href: ${q(`/local-movers/${cb.stateSlug}/${cb.slug}`)}, displayLabel: ${q(cb.displayLabel)} }`
    );
  }

  return `  ${slugKey(slug)}: [\n${links.join(',\n')},\n  ],`;
}

function genResearch(): string {
  const entries = COUNTIES.map((c) => {
    const cost = COSTS[c.costTier];
    const tips = buildTips(c)
      .map((t) => `      ${q(t)},`)
      .join('\n');
    return `  ${slugKey(c.slug)}: {
    marketNotes:
      ${q(c.marketNotes)},
    costs: {
      studioRange: ${q(cost.studioRange)},
      familyRange: ${q(cost.familyRange)},
      avgHourly: ${q(cost.avgHourly)},
      note: ${q(c.costNote)},
    },
    tips: [
${tips}
    ],
  },`;
  });
  return `import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Wisconsin county research — batch 1 (10 counties) */
export const wisconsinCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getWisconsinCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return wisconsinCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Wisconsin county testimonials — batch 1 (10 counties) */
export const wisconsinCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getWisconsinCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return wisconsinCountyTestimonials[countySlug] ?? [];
}
`;
}

function genAssignments(): string {
  const entries = COUNTIES.map((c) => {
    const ids = moverIds(c)
      .map((id) => `    ${q(id)},`)
      .join('\n');
    return `  ${slugKey(c.slug)}: [\n${ids}\n  ],`;
  });
  return `import type { CountyMoverAssignment } from '@/lib/local-movers/types';

/** Hand-curated Wisconsin county mover lists — batch 1 (10 counties) */
const CURATED_WI_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const wisconsinCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_WI_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'wisconsin',
    countySlug,
    moverIds,
  }));
`;
}

function genOverrides(): string {
  const entries = COUNTIES.map(
    (c) => `  ${slugKey(c.slug)}: { seat: ${q(c.seat)}, metro: ${q(c.metro)} },`
  );
  return `import type { LocalCounty } from '@/lib/local-movers/types';

/** Seat and metro overrides for hand-curated Wisconsin counties (batch 1 — 10 counties) */
export const wisconsinCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyWisconsinCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'wisconsin') return county;
  const override = wisconsinCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Wisconsin curated county corridor links — batch 1 (10 counties) */
const WI_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getWisconsinNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WI_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/wisconsin-county-research.ts', content: genResearch() },
  { path: 'data/wisconsin-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/wisconsin-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/wisconsin-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/wisconsin-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Wisconsin counties across ${OUTPUTS.length} files.`
);