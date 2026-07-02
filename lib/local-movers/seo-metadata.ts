import type { Metadata } from 'next';
import { evaluateCountyIndexability } from '@/lib/local-movers/county-indexability';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';
import {
  buildCountyDescription,
  buildCountyTitle,
  buildStateDescription,
  buildStateTitle,
  getSeoYear,
} from '@/lib/local-movers/county-seo';

const SITE_URL = 'https://www.movetrusthub.com';
const SITE_NAME = 'Move Trust Hub';

function buildOpenGraph(title: string, description: string, path: string): Metadata['openGraph'] {
  return {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
  };
}

function buildTwitter(title: string, description: string): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title,
    description,
  };
}

const BASE_LOCAL_KEYWORDS = [
  'local movers',
  'moving companies',
  'local moving companies',
  'FMCSA licensed movers',
  'moving cost estimate',
  'free moving quotes',
];

export function buildCountyKeywords(
  county: LocalCounty,
  stateName: string,
  movers: LocalMover[]
): string[] {
  const countyLabel = buildCountyLabel(county);
  const seat = county.seat;
  const code = county.stateCode;
  const topNames = movers.slice(0, 3).map((m) => m.name);

  const keywords = new Set<string>([
    ...BASE_LOCAL_KEYWORDS,
    `local movers ${countyLabel}`,
    `local movers ${countyLabel} ${code}`,
    `${countyLabel} movers`,
    `${countyLabel} moving companies`,
    `moving companies ${countyLabel}`,
    `best movers ${countyLabel}`,
    `top movers ${countyLabel} ${getSeoYear()}`,
    `${stateName} local movers`,
    `local movers ${stateName}`,
    `${code} local movers`,
    `affordable movers ${countyLabel}`,
    `residential movers ${countyLabel}`,
  ]);

  if (seat) {
    keywords.add(`movers ${seat}`);
    keywords.add(`movers ${seat} ${code}`);
    keywords.add(`moving companies ${seat}`);
    keywords.add(`local movers ${seat}`);
    keywords.add(`best movers in ${seat}`);
    keywords.add(`${seat} moving company`);
  }

  for (const name of topNames) {
    keywords.add(name);
    keywords.add(`${name} ${countyLabel}`);
  }

  return Array.from(keywords);
}

export function buildCountyPageMetadata(
  county: LocalCounty,
  stateName: string,
  movers: LocalMover[],
  path: string
): Metadata {
  const title = buildCountyTitle(county, stateName);
  const description = buildCountyDescription(county, stateName, movers.length);
  const keywords = buildCountyKeywords(county, stateName, movers).slice(0, 12);
  const indexDecision = evaluateCountyIndexability(county.stateSlug, county.slug);
  const shouldIndex = indexDecision.tier === 'index';

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: buildOpenGraph(title, description, path),
    twitter: buildTwitter(title, description),
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
    category: 'Local Moving Services',
  };
}

export function buildStateKeywords(
  stateName: string,
  stateCode: string,
  countyCount: number
): string[] {
  return [
    ...BASE_LOCAL_KEYWORDS,
    `local movers ${stateName}`,
    `${stateName} moving companies`,
    `${stateCode} local movers`,
    `${stateName} county movers`,
    `movers by county ${stateName}`,
    `${stateName} moving guide`,
    `${countyCount} counties ${stateName} movers`,
    `best local movers ${stateName} ${getSeoYear()}`,
  ];
}

export function buildStatePageMetadata(
  stateName: string,
  stateCode: string,
  countyCount: number,
  path: string
): Metadata {
  const title = buildStateTitle(stateName, countyCount);
  const description = buildStateDescription(stateName, countyCount);
  const keywords = buildStateKeywords(stateName, stateCode, countyCount);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: buildOpenGraph(title, description, path),
    twitter: buildTwitter(title, description),
    robots: { index: true, follow: true },
    category: 'Local Moving Services',
  };
}

export function buildHubKeywords(): string[] {
  return [
    ...BASE_LOCAL_KEYWORDS,
    'local movers by county',
    'local movers by state',
    'county moving guides',
    'find movers near me',
    'USA local movers directory',
    `local movers directory ${getSeoYear()}`,
    '50 states moving companies',
  ];
}

export function buildHubPageMetadata(): Metadata {
  const title = 'Local Movers by State & County — Find Trusted Movers Near You 2026';
  const description =
    'Browse 3,100+ county-level local mover guides across all 50 states. FMCSA licensing, ratings, cost estimates, and moving tips. Compare trusted movers in our independent directory.';
  const path = '/local-movers';

  return {
    title,
    description,
    keywords: buildHubKeywords(),
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: buildOpenGraph(title, description, path),
    twitter: buildTwitter(title, description),
    robots: { index: true, follow: true },
    category: 'Local Moving Services',
  };
}

export function buildCountyH1(county: LocalCounty): string {
  const countyLabel = buildCountyLabel(county);
  const seat = county.seat ? ` (${county.seat})` : '';
  return `Top Local Movers in ${countyLabel}${seat}, ${county.stateCode}`;
}