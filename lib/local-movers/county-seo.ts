import { getCaliforniaCountyResearch } from '@/data/california-county-research';
import { getCaliforniaCountyTestimonials } from '@/data/california-county-testimonials';
import { getFloridaCountyResearch } from '@/data/florida-county-research';
import { getFloridaCountyTestimonials } from '@/data/florida-county-testimonials';
import { getNewJerseyCountyResearch } from '@/data/new-jersey-county-research';
import { getNewJerseyCountyTestimonials } from '@/data/new-jersey-county-testimonials';
import { getNewYorkCountyResearch } from '@/data/new-york-county-research';
import { getNewYorkCountyTestimonials } from '@/data/new-york-county-testimonials';
import { testimonials } from '@/lib/trust/trust-data';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

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
  'Book at least 2–4 weeks ahead during summer and month-end — local crews fill up fast.',
  'Confirm whether your quote is hourly or flat-rate, and ask about minimum hour charges.',
  'Verify USDOT/MC licensing on FMCSA.gov, even for moves under 50 miles.',
  'Ask about valuation coverage before signing — released value may not cover high-value items.',
  'Check elevator, HOA, and street-parking restrictions if moving in or out of multi-unit buildings.',
  'Label boxes by room and keep essentials in a “first night” bag movers do not load.',
  'Compare at least three written estimates before choosing a local crew.',
];

const RURAL_TIPS = [
  'Confirm drive time and fuel surcharges for rural pickups — some crews price by zone.',
  'Ask whether a smaller truck or shuttle vehicle is needed for narrow roads or long driveways.',
  'Schedule mid-week moves when possible for better crew availability in less dense counties.',
];

const URBAN_TIPS = [
  'Reserve loading zones or building freight elevators early in metro areas.',
  'Ask about parking permits if your street has metered or restricted loading windows.',
  'Peak moving season in major metros can add 10–20% to local move pricing.',
];

export function getSeoYear(): string {
  return SEO_YEAR;
}

export function buildCountyTitle(county: LocalCounty, stateName: string): string {
  const seat = county.seat ? ` (${county.seat})` : '';
  return `Top Local Movers in ${county.name} County${seat}, ${county.stateCode} ${SEO_YEAR}`;
}

export function buildCountyDescription(
  county: LocalCounty,
  stateName: string,
  moverCount: number
): string {
  const seat = county.seat ? ` near ${county.seat}` : '';
  const countyLabel = `${county.name} County`;
  const topMover =
    moverCount > 0 ? `Compare ${moverCount} top-rated local movers` : 'Find vetted local movers';
  const marketSnippet = buildCountyMarketNotes(county);
  const localContext = marketSnippet
    ? `${marketSnippet.split('.')[0]}. `
    : '';

  return `${topMover} in ${countyLabel}, ${county.stateCode}${seat}. ${localContext}FMCSA licensing, Google ratings, ${countyLabel} cost estimates, and expert moving tips for ${SEO_YEAR}. Free quotes.`;
}

export function buildStateTitle(stateName: string, countyCount: number): string {
  return `Local Movers in ${stateName} — ${countyCount} County Guides ${SEO_YEAR}`;
}

export function buildStateDescription(
  stateName: string,
  countyCount: number
): string {
  const moverRange =
    stateName === 'California' ||
    stateName === 'Florida' ||
    stateName === 'New Jersey' ||
    stateName === 'New York'
      ? '5–10 curated movers per county'
      : 'vetted local movers per county';
  return `Find trusted local movers in all ${countyCount} ${stateName} counties — ${moverRange}, FMCSA licensing, county cost guides, and local moving tips for ${SEO_YEAR}. Use our free moving calculator and interstate directory.`;
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
  const countyLabel = `${county.name} County`;
  const location = county.seat ?? countyLabel;
  const costs = buildCountyCostGuide(county, stateName);
  const topMovers = movers.slice(0, 3);
  const topMover = movers[0];
  const topMoverList = topMovers.map((m) => `${m.name} (${m.rating}★)`).join(', ');

  return [
    {
      question: `How much do local movers cost in ${countyLabel}, ${stateName}?`,
      answer: `Local moves in ${countyLabel} typically range from ${costs.studioRange} for studio or one-bedroom apartments to ${costs.familyRange} for larger homes. ${costs.note} Use our moving calculator for interstate estimates or request free quotes from vetted movers.`,
    },
    {
      question: `What are the best local movers in ${countyLabel}?`,
      answer: topMovers.length > 1
        ? `Top-rated movers serving ${location} include ${topMoverList}. We rank companies by Google ratings, FMCSA licensing, review volume, and service fit for ${countyLabel}, ${county.stateCode}.`
        : topMover
          ? `Top-rated options serving ${location} include ${topMover.name} (${topMover.rating}★ from ${topMover.reviewCount.toLocaleString()} reviews). We rank movers by customer ratings, FMCSA licensing, review volume, and service fit for ${countyLabel}.`
          : `We rank local movers in ${countyLabel} by customer ratings, FMCSA USDOT/MC licensing, review volume, and BBB standing. Compare companies on this page and verify current licensing on FMCSA.gov before booking.`,
    },
    {
      question: `Do local movers in ${stateName} need an FMCSA license?`,
      answer: `Interstate movers must hold active FMCSA USDOT and MC numbers. For purely local moves within ${stateName}, requirements vary — but reputable companies still carry proper licensing and insurance. Always verify credentials on FMCSA.gov before paying a deposit.`,
    },
    {
      question: `How far in advance should I book movers in ${location}?`,
      answer: `For local moves in ${countyLabel}, book 2–4 weeks ahead for standard timing. Peak season (May–September), month-end turns, and weekends in ${location} may require 4–6 weeks lead time. Last-minute moves are sometimes available but cost more.`,
    },
    {
      question: `What is the difference between local and interstate movers in ${countyLabel}?`,
      answer: `Local movers handle in-county and short-distance relocations, often priced hourly or by crew size. Interstate movers transport goods across state lines under FMCSA regulation. If your move leaves ${stateName}, use our interstate directory and moving calculator to compare licensed long-distance carriers.`,
    },
    {
      question: `How do I avoid moving scams in ${countyLabel}?`,
      answer: `Get written estimates after an inventory survey, avoid large upfront deposits via wire or gift cards, verify USDOT numbers on FMCSA.gov, and compare multiple companies. Read our guide on spotting red flags before booking movers in ${location}.`,
    },
  ];
}

export type CountyCostGuide = {
  studioRange: string;
  familyRange: string;
  avgHourly: string;
  note: string;
};

export function buildCountyMarketNotes(county: LocalCounty): string | undefined {
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
  return undefined;
}

export function buildCountyCostGuide(
  county: LocalCounty,
  stateName: string
): CountyCostGuide {
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

  const isMetro = Boolean(county.metro);
  const key = `${county.stateSlug}-${county.slug}`;

  if (isMetro) {
    const tiers = [
      {
        studioRange: '$350–$900',
        familyRange: '$1,400–$3,800',
        avgHourly: '$110–$165/hr for a 2-person crew',
        note: `Metro-area pricing in ${county.name} County reflects parking, elevator access, and higher labor demand.`,
      },
      {
        studioRange: '$400–$1,000',
        familyRange: '$1,500–$4,200',
        avgHourly: '$120–$175/hr for a 2-person crew',
        note: `Moves near ${county.seat ?? county.name} often include building fees or shuttle truck costs.`,
      },
    ];
    return pickByHash(tiers, key);
  }

  const tiers = [
    {
      studioRange: '$250–$650',
      familyRange: '$900–$2,400',
      avgHourly: '$90–$140/hr for a 2-person crew',
      note: `Rural and smaller-market pricing in ${stateName} is generally lower than major metro areas.`,
    },
    {
      studioRange: '$280–$750',
      familyRange: '$1,000–$2,800',
      avgHourly: '$95–$150/hr for a 2-person crew',
      note: `Travel distance and crew availability can affect final pricing in ${county.name} County.`,
    },
  ];
  return pickByHash(tiers, key);
}

export function buildCountyTips(county: LocalCounty, _stateName: string): string[] {
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
};

export function buildCountyTestimonials(
  county: LocalCounty,
  _stateName: string
): CountyTestimonial[] {
  if (county.stateSlug === 'california') {
    const curated = getCaliforniaCountyTestimonials(county.slug);
    if (curated.length) return curated;
  }
  if (county.stateSlug === 'florida') {
    const curated = getFloridaCountyTestimonials(county.slug);
    if (curated.length) return curated;
  }
  if (county.stateSlug === 'new-jersey') {
    const curated = getNewJerseyCountyTestimonials(county.slug);
    if (curated.length) return curated;
  }
  if (county.stateSlug === 'new-york') {
    const curated = getNewYorkCountyTestimonials(county.slug);
    if (curated.length) return curated;
  }

  const key = `${county.stateSlug}-${county.slug}`;
  const base = pickByHash(testimonials, key);
  const location = county.seat
    ? `${county.seat}, ${county.stateCode}`
    : `${county.name} County, ${county.stateCode}`;

  return [
    {
      quote: base.quote,
      name: base.name,
      location,
      rating: base.rating,
    },
  ];
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
  WA: 'washington',
  WV: 'west-virginia',
  WI: 'wisconsin',
  WY: 'wyoming',
};

export function getStateSlugFromCode(code: string): string | undefined {
  return STATE_CODE_TO_SLUG[code.toUpperCase()];
}