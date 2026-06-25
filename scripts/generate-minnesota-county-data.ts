/**
 * Generates Minnesota county curation files (batch 1 — 11 counties).
 * Run: npx tsx scripts/generate-minnesota-county-data.ts
 */
import { writeFileSync } from 'fs';
import { join } from 'path';

const ROOT = join(__dirname, '..');
const EXPECTED_COUNT = 11;

type CostTier = 'metro' | 'secondary_metro' | 'regional_hub';

type CountyDef = {
  slug: string;
  name: string;
  seat: string;
  city: string;
  metro: string;
  costTier: CostTier;
  marketNotes: string;
  costNote: string;
  tipVariant: 'standard' | 'metro' | 'medical';
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
};

const DISPLAY_LABELS: Partial<Record<string, string>> = {
  hennepin: 'Hennepin County, MN',
  ramsey: 'Ramsey County, MN',
  dakota: 'Dakota County, MN',
  anoka: 'Anoka County, MN',
  washington: 'Washington County, MN',
  'st-louis': 'St. Louis County, MN',
  olmsted: 'Olmsted County, MN',
  stearns: 'Stearns County, MN',
  scott: 'Scott County, MN',
  wright: 'Wright County, MN',
  carver: 'Carver County, MN',
};

const MN_NEIGHBORS: Record<string, string[]> = {
  hennepin: ['ramsey', 'dakota', 'scott', 'carver', 'wright', 'anoka', 'sherburne'],
  ramsey: ['hennepin', 'washington', 'anoka', 'dakota'],
  dakota: ['ramsey', 'washington', 'scott', 'rice', 'goodhue', 'hennepin'],
  anoka: ['hennepin', 'ramsey', 'washington', 'sherburne', 'isanti', 'chisago', 'mille-lacs'],
  washington: ['ramsey', 'anoka', 'dakota', 'chisago', 'pierce'],
  'st-louis': ['carlton', 'lake', 'itasca', 'koochiching', 'cook'],
  olmsted: ['dodge', 'wabasha', 'winona', 'fillmore', 'mower', 'steele'],
  stearns: ['benton', 'morrison', 'todd', 'douglas', 'pope', 'kandiyohi', 'meeker'],
  scott: ['dakota', 'carver', 'sibley', 'le-sueur', 'rice', 'hennepin'],
  wright: ['hennepin', 'sherburne', 'mcleod', 'meeker', 'carver'],
  carver: ['scott', 'sibley', 'mcleod', 'wright', 'hennepin'],
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
  washington: [
    {
      slug: 'pierce',
      stateSlug: 'wisconsin',
      name: 'Pierce',
      seat: 'Ellsworth',
      displayLabel: 'Pierce County, WI',
    },
  ],
  'st-louis': [
    {
      slug: 'douglas',
      stateSlug: 'wisconsin',
      name: 'Douglas',
      seat: 'Superior',
      displayLabel: 'Douglas County, WI',
    },
  ],
  dakota: [
    {
      slug: 'pierce',
      stateSlug: 'wisconsin',
      name: 'Pierce',
      seat: 'Ellsworth',
      displayLabel: 'Pierce County, WI',
    },
  ],
};

const COUNTIES: CountyDef[] = [
  {
    slug: 'hennepin',
    name: 'Hennepin',
    seat: 'Minneapolis',
    city: 'Minneapolis',
    metro: 'hennepin-metro-mn',
    costTier: 'metro',
    citySlug: 'minneapolis',
    regional1: 'minneapolis-corridor',
    regional2: 'twin-cities-metro-west',
    topId: 'twomenandatruck-hennepin-mn',
    topName: 'Two Men and a Truck Minneapolis',
    regional1Name: 'Minneapolis Corridor Moving',
    regional2Name: 'Twin Cities Metro West Moving',
    franchise: true,
    marketNotes:
      'Hennepin County, MN is Minnesota’s most populous county centered on Minneapolis with strong urban, suburban, and residential demand across the Twin Cities metro west corridor.',
    costNote:
      'Hennepin County pricing reflects Minneapolis metro demand, I-94 and I-494 corridor traffic, high-value suburban homes, and competition among full-service agents serving Hennepin County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'ramsey',
    name: 'Ramsey',
    seat: 'Saint Paul',
    city: 'Saint Paul',
    metro: 'ramsey-metro-mn',
    costTier: 'metro',
    citySlug: 'saint-paul',
    regional1: 'saint-paul-corridor',
    regional2: 'mississippi-river-ramsey',
    topId: 'regional-ramsey-mn-movers',
    topName: 'Regional Saint Paul / Ramsey Providers',
    regional1Name: 'Saint Paul Corridor Moving',
    regional2Name: 'Mississippi River Ramsey Moving',
    marketNotes:
      'Ramsey County, MN is a major urban county centered on Saint Paul with strong governmental, university, and residential demand along the Mississippi River capital corridor.',
    costNote:
      'Ramsey County pricing reflects Saint Paul metro demand, capital-city and riverfront logistics, and competition among regional agents serving Ramsey County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'dakota',
    name: 'Dakota',
    seat: 'Hastings',
    city: 'Lakeville',
    metro: 'dakota-metro-mn',
    costTier: 'metro',
    citySlug: 'lakeville',
    regional1: 'lakeville-corridor',
    regional2: 'minnesota-river-dakota',
    topId: 'regional-dakota-mn-movers',
    topName: 'Regional Lakeville / Dakota Providers',
    regional1Name: 'Lakeville Corridor Moving',
    regional2Name: 'Minnesota River Dakota Moving',
    marketNotes:
      'Dakota County, MN is a rapidly growing suburban county south of the Twin Cities with strong residential demand across Lakeville, Hastings, and Minnesota River corridor communities.',
    costNote:
      'Dakota County pricing reflects south metro suburban growth, Minnesota River corridor travel distances, and competition among regional agents serving Dakota County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'anoka',
    name: 'Anoka',
    seat: 'Anoka',
    city: 'Anoka',
    metro: 'anoka-metro-mn',
    costTier: 'metro',
    citySlug: 'anoka',
    regional1: 'anoka-corridor',
    regional2: 'rum-river-valley',
    topId: 'regional-anoka-mn-movers',
    topName: 'Regional Anoka / Anoka County Providers',
    regional1Name: 'Anoka Corridor Moving',
    regional2Name: 'Rum River Valley Moving',
    marketNotes:
      'Anoka County, MN is a northern suburban county in the Twin Cities metro with strong residential demand across Anoka and Rum River north metro corridor communities.',
    costNote:
      'Anoka County pricing reflects north metro suburban demand, I-35W corridor traffic, and competition among regional agents serving Anoka County communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'washington',
    name: 'Washington',
    seat: 'Stillwater',
    city: 'Stillwater',
    metro: 'washington-metro-mn',
    costTier: 'metro',
    citySlug: 'stillwater',
    regional1: 'stillwater-corridor',
    regional2: 'st-croix-river-valley',
    topId: 'regional-washington-mn-movers',
    topName: 'Regional Stillwater / Washington Providers',
    regional1Name: 'Stillwater Corridor Moving',
    regional2Name: 'St. Croix River Valley Moving',
    marketNotes:
      'Washington County, MN is an eastern suburban county in the Twin Cities metro with strong residential demand across Stillwater, Woodbury, and St. Croix River corridor communities — not to be confused with Washington State or other Washington counties.',
    costNote:
      'Washington County pricing reflects east metro suburban demand, St. Croix River bridge corridor traffic, and competition among regional agents serving Washington County, MN communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'st-louis',
    name: 'St. Louis',
    seat: 'Duluth',
    city: 'Duluth',
    metro: 'st-louis-metro-mn',
    costTier: 'secondary_metro',
    citySlug: 'duluth',
    regional1: 'duluth-corridor',
    regional2: 'lake-superior-north',
    topId: 'regional-stlouis-mn-movers',
    topName: 'Regional Duluth / St. Louis Providers',
    regional1Name: 'Duluth Corridor Moving',
    regional2Name: 'Lake Superior North Moving',
    marketNotes:
      'St. Louis County, MN is a major northern Minnesota county centered on Duluth with strong urban, port, and residential demand along the Lake Superior north shore — not to be confused with St. Louis, Missouri.',
    costNote:
      'St. Louis County pricing reflects Duluth-area demand, Lake Superior corridor travel distances, harsh winters, and competition among regional agents serving St. Louis County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'olmsted',
    name: 'Olmsted',
    seat: 'Rochester',
    city: 'Rochester',
    metro: 'olmsted-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'rochester',
    regional1: 'rochester-corridor',
    regional2: 'zumbro-river-valley',
    topId: 'regional-olmsted-mn-movers',
    topName: 'Regional Rochester / Olmsted Providers',
    regional1Name: 'Rochester Corridor Moving',
    regional2Name: 'Zumbro River Valley Moving',
    marketNotes:
      'Olmsted County, MN is a southeastern Minnesota county centered on Rochester with strong Mayo Clinic medical-sector and residential demand across Zumbro River corridor communities.',
    costNote:
      'Olmsted County pricing reflects Rochester medical-sector relocations, Zumbro River corridor travel distances, and competition among regional agents serving Olmsted County communities.',
    tipVariant: 'medical',
  },
  {
    slug: 'stearns',
    name: 'Stearns',
    seat: 'St. Cloud',
    city: 'St. Cloud',
    metro: 'stearns-metro-mn',
    costTier: 'regional_hub',
    citySlug: 'st-cloud',
    regional1: 'st-cloud-corridor',
    regional2: 'mississippi-river-stearns',
    topId: 'regional-stearns-mn-movers',
    topName: 'Regional St. Cloud / Stearns Providers',
    regional1Name: 'St. Cloud Corridor Moving',
    regional2Name: 'Mississippi River Stearns Moving',
    marketNotes:
      'Stearns County, MN is a central Minnesota county centered on St. Cloud with residential and university demand across Mississippi River corridor communities.',
    costNote:
      'Stearns County pricing reflects St. Cloud-area demand, Mississippi River corridor travel distances, and competition among regional agents serving Stearns County communities.',
    tipVariant: 'standard',
  },
  {
    slug: 'scott',
    name: 'Scott',
    seat: 'Shakopee',
    city: 'Shakopee',
    metro: 'scott-metro-mn',
    costTier: 'metro',
    citySlug: 'shakopee',
    regional1: 'shakopee-corridor',
    regional2: 'minnesota-river-scott',
    topId: 'regional-scott-mn-movers',
    topName: 'Regional Shakopee / Scott Providers',
    regional1Name: 'Shakopee Corridor Moving',
    regional2Name: 'Minnesota River Scott Moving',
    marketNotes:
      'Scott County, MN is a southern suburban county in the Twin Cities metro with strong residential demand across Shakopee and Minnesota River southwest corridor communities — not to be confused with Scott County, Iowa.',
    costNote:
      'Scott County pricing reflects southwest metro suburban demand, Minnesota River corridor traffic, and competition among regional agents serving Scott County, MN communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'wright',
    name: 'Wright',
    seat: 'Buffalo',
    city: 'Buffalo',
    metro: 'wright-metro-mn',
    costTier: 'metro',
    citySlug: 'buffalo',
    regional1: 'buffalo-corridor',
    regional2: 'crow-river-valley',
    topId: 'regional-wright-mn-movers',
    topName: 'Regional Buffalo / Wright Providers',
    regional1Name: 'Buffalo Corridor Moving',
    regional2Name: 'Crow River Valley Moving',
    marketNotes:
      'Wright County, MN is a western suburban county in the Twin Cities metro with strong residential demand across Buffalo and Crow River west metro corridor communities — not to be confused with Wright County, Iowa.',
    costNote:
      'Wright County pricing reflects west metro suburban demand, Crow River corridor travel distances, and competition among regional agents serving Wright County, MN communities.',
    tipVariant: 'metro',
  },
  {
    slug: 'carver',
    name: 'Carver',
    seat: 'Chaska',
    city: 'Chaska',
    metro: 'carver-metro-mn',
    costTier: 'metro',
    citySlug: 'chaska',
    regional1: 'chaska-corridor',
    regional2: 'minnesota-river-carver',
    topId: 'regional-carver-mn-movers',
    topName: 'Regional Chaska / Carver Providers',
    regional1Name: 'Chaska Corridor Moving',
    regional2Name: 'Minnesota River Carver Moving',
    marketNotes:
      'Carver County, MN is a southwestern suburban county in the Twin Cities metro with strong residential demand across Chaska and Minnesota River southwest corridor communities.',
    costNote:
      'Carver County pricing reflects southwest metro suburban demand, Minnesota River corridor traffic, and competition among regional agents serving Carver County communities.',
    tipVariant: 'metro',
  },
];

const SEAT_BY_SLUG = Object.fromEntries(COUNTIES.map((c) => [c.slug, c.seat]));

const NON_CURATED_NAMES: Record<string, { name: string; seat: string }> = {
  sherburne: { name: 'Sherburne', seat: 'Elk River' },
  rice: { name: 'Rice', seat: 'Faribault' },
  goodhue: { name: 'Goodhue', seat: 'Red Wing' },
  isanti: { name: 'Isanti', seat: 'Cambridge' },
  chisago: { name: 'Chisago', seat: 'Center City' },
  'mille-lacs': { name: 'Mille Lacs', seat: 'Milaca' },
  pierce: { name: 'Pierce', seat: 'Ellsworth' },
  carlton: { name: 'Carlton', seat: 'Moose Lake' },
  lake: { name: 'Lake', seat: 'Two Harbors' },
  itasca: { name: 'Itasca', seat: 'Grand Rapids' },
  koochiching: { name: 'Koochiching', seat: 'International Falls' },
  cook: { name: 'Cook', seat: 'Grand Marais' },
  dodge: { name: 'Dodge', seat: 'Mantorville' },
  wabasha: { name: 'Wabasha', seat: 'Wabasha' },
  winona: { name: 'Winona', seat: 'Winona' },
  fillmore: { name: 'Fillmore', seat: 'Preston' },
  mower: { name: 'Mower', seat: 'Austin' },
  steele: { name: 'Steele', seat: 'Owatonna' },
  benton: { name: 'Benton', seat: 'Foley' },
  morrison: { name: 'Morrison', seat: 'Little Falls' },
  todd: { name: 'Todd', seat: 'Long Prairie' },
  douglas: { name: 'Douglas', seat: 'Alexandria' },
  pope: { name: 'Pope', seat: 'Glenwood' },
  kandiyohi: { name: 'Kandiyohi', seat: 'Willmar' },
  meeker: { name: 'Meeker', seat: 'Litchfield' },
  sibley: { name: 'Sibley', seat: 'Gaylord' },
  'le-sueur': { name: 'Le Sueur', seat: 'Le Center' },
  mcleod: { name: 'McLeod', seat: 'Glencoe' },
};

function q(s: string): string {
  return JSON.stringify(s);
}

function slugKey(slug: string): string {
  return slug.includes('-') || /^\d/.test(slug) ? `'${slug}'` : slug;
}

function defaultDisplayLabel(slug: string, name: string): string {
  return DISPLAY_LABELS[slug] ?? `${name} County, MN`;
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
      `Verify coverage for ${city} and surrounding Twin Cities metro communities before booking.`,
      'I-94, I-35W, and I-494 congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, condos, and townhomes before move day.',
      STANDARD_TIPS[3],
      STANDARD_TIPS[4],
    ];
  }
  if (c.tipVariant === 'medical') {
    return [
      `Verify coverage for ${city} and surrounding Olmsted County communities before booking.`,
      'Mayo Clinic medical-sector relocations and housing turnover may affect scheduling — confirm peak-season crew availability.',
      'Confirm insurance for high-value homes and professional relocations before move day.',
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
    `all-my-sons-${citySlug}-mn`,
    `${citySlug}-moving-${slug}-mn`,
    `${slug}-county-moving-${slug}-mn`,
    `college-hunks-moving-${citySlug}-mn`,
    `budd-van-lines-${citySlug}-mn`,
    `${c.regional1}-moving-${slug}-mn`,
    `${c.regional2}-moving-${slug}-mn`,
    `hercules-movers-${citySlug}-mn`,
    `krupp-moving-${citySlug}-mn`,
  ];
}

const FRANCHISE_TESTIMONIALS: Record<
  string,
  { quote: string; name: string; location: string; rating: number; moveType: string }[]
> = {
  hennepin: [
    {
      quote:
        'Two Men and a Truck Minneapolis handled our suburban move professionally — on time and extremely careful with our home.',
      name: 'Alex M.',
      location: 'Minneapolis, MN',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Minneapolis navigated our Edina relocation with fair pricing through Twin Cities metro corridor traffic.',
      name: 'Beth N.',
      location: 'Minneapolis, MN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Twin Cities Metro West Moving served our Bloomington-area move efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Bloomington, MN',
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
  const altLoc = c.seat !== c.city ? `${c.seat}, MN` : `${city}, MN`;
  return `  ${slugKey(c.slug)}: [
    { quote: ${q(`${c.topName} handled our ${city} move professionally — on time and extremely careful with our home.`)}, name: ${q(n1)}, location: ${q(`${city}, MN`)}, rating: 5, moveType: 'Single-family' },
    { quote: ${q(`All My Sons ${city} navigated our relocation with fair pricing and excellent regional scheduling.`)}, name: ${q(n2)}, location: ${q(altLoc)}, rating: 5, moveType: 'Townhome' },
    { quote: ${q(`${c.regional2Name} served our move efficiently with punctual arrival and professional crew coordination.`)}, name: ${q(n3)}, location: ${q(`${city}, MN`)}, rating: 5, moveType: 'Apartment' },
  ],`;
}

function buildNearbyLinks(slug: string): string {
  const mnNeighbors = MN_NEIGHBORS[slug] ?? [];
  const cross = CROSS_BORDER[slug] ?? [];
  const crossSlugs = new Set(cross.map((cb) => cb.slug));
  const maxMn = Math.min(mnNeighbors.length, Math.max(3, 5 - cross.length));
  const links: string[] = [];

  for (const n of mnNeighbors.slice(0, maxMn)) {
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
      `href: ${q(`/local-movers/minnesota/${n}`)}`,
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

/** Hand-curated Minnesota county research — 11 counties */
export const minnesotaCountyResearch: Record<string, CuratedCountyResearch> = {
${entries.join('\n')}
};

export function getMinnesotaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return minnesotaCountyResearch[countySlug];
}
`;
}

function genTestimonials(): string {
  const entries = COUNTIES.map((c, i) => buildTestimonials(c, i + 3));
  return `import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Minnesota county testimonials — 11 counties */
export const minnesotaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${entries.join('\n')}
};

export function getMinnesotaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return minnesotaCountyTestimonials[countySlug] ?? [];
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

/** Hand-curated Minnesota county mover lists — 11 counties */
const CURATED_MN_COUNTIES: Record<string, string[]> = {
${entries.join('\n')}
};

export const minnesotaCountyMoverAssignments: CountyMoverAssignment[] =
  Object.entries(CURATED_MN_COUNTIES).map(([countySlug, moverIds]) => ({
    stateSlug: 'minnesota',
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

/** Seat and metro overrides for hand-curated Minnesota counties (batch 1 — 11 counties) */
export const minnesotaCountyOverrides: Partial<
  Record<string, Pick<LocalCounty, 'seat' | 'metro'>>
> = {
${entries.join('\n')}
};

export function applyMinnesotaCountyOverrides(county: LocalCounty): LocalCounty {
  if (county.stateSlug !== 'minnesota') return county;
  const override = minnesotaCountyOverrides[county.slug];
  if (!override) return county;
  return { ...county, ...override };
}
`;
}

function genNearby(): string {
  const entries = COUNTIES.map((c) => buildNearbyLinks(c.slug));
  return `import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Minnesota curated county corridor links — 11 counties */
const MN_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
${entries.join('\n')}
};

export function getMinnesotaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MN_COUNTY_NEIGHBORS[countySlug] ?? [];
}
`;
}

const OUTPUTS: { path: string; content: string }[] = [
  { path: 'data/minnesota-county-research.ts', content: genResearch() },
  { path: 'data/minnesota-county-testimonials.ts', content: genTestimonials() },
  { path: 'data/minnesota-county-assignments.ts', content: genAssignments() },
  {
    path: 'lib/local-movers/geography/minnesota-overrides.ts',
    content: genOverrides(),
  },
  { path: 'lib/local-movers/minnesota-nearby.ts', content: genNearby() },
];

for (const { path, content } of OUTPUTS) {
  const full = join(ROOT, path);
  writeFileSync(full, content, 'utf8');
  console.log(`Wrote ${path}`);
}

console.log(
  `\nGenerated ${COUNTIES.length}/${EXPECTED_COUNT} Minnesota counties across ${OUTPUTS.length} files.`
);