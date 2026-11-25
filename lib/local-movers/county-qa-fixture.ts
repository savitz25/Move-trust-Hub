import type { Metadata } from 'next';
import {
  COUNTY_QA_CONTROL_LABEL,
  COUNTY_QA_CONTROL_PATH,
  COUNTY_QA_CONTROL_SLUG,
  COUNTY_QA_STATE_SLUG,
  COUNTY_QA_TARGET_LABEL,
  COUNTY_QA_TARGET_PATH,
  COUNTY_QA_TARGET_SLUG,
  countyQaFixtureActive,
  isCountyQaFixturePath,
} from '@/lib/local-movers/county-qa-fixture-gate';
import { getCountyPath } from '@/lib/local-movers/paths';
import { getLocalState } from '@/lib/local-movers/states';
import type { LocalCounty, LocalMover, LocalState } from '@/lib/local-movers/types';

const FIXTURE_ORIGIN = 'https://www.movetrusthub.com';

export type CountyQaStaticParam = { stateSlug: string; countySlug: string };

export type CountyQaRenderMarker = {
  marker: string;
  label: string;
};

type FixtureSeo = {
  state: LocalState;
  stateName: string;
  stateSlug: string;
  county: LocalCounty;
  movers: LocalMover[];
  isRegionalFallback: boolean;
  path: string;
  indexDecision: { tier: 'noindex'; reason: 'qa_cache_fixture' };
  metadata: Metadata;
  title: string;
  description: string;
  sourceMode: 'seed';
  approvedCount: number;
};

function fixtureLabel(pathname: string): string | null {
  if (pathname === COUNTY_QA_TARGET_PATH) return COUNTY_QA_TARGET_LABEL;
  if (pathname === COUNTY_QA_CONTROL_PATH) return COUNTY_QA_CONTROL_LABEL;
  return null;
}

function fixtureMover(countySlug: string): LocalMover {
  const control = countySlug === COUNTY_QA_CONTROL_SLUG;
  return {
    id: control ? 'qa-control-carrier' : 'qa-fixture-carrier',
    name: control ? 'QA Control Carrier' : 'QA Fixture Carrier',
    rating: 0,
    reviewCount: 0,
    shortDescription: 'In-memory QA fixture carrier. Not a published mover.',
    services: ['Local moving'],
    city: 'Miami',
    headquartersState: 'FL',
    listingSource: 'catalog',
    profilePublished: false,
    isLocalOnly: true,
  };
}

/**
 * In-memory SEO for the two fixture slugs.
 * Returns null unless the gate is on, so the real evaluator still runs.
 * This module returns before the live county evaluator. It does not open a database client.
 * The label is display text. It is not a cache tag and it does not purge.
 */
export function countyQaFixtureSeo(stateSlug: string, countySlug: string): FixtureSeo | null {
  if (!countyQaFixtureActive()) return null;
  const path = getCountyPath(stateSlug, countySlug);
  const label = fixtureLabel(path);
  if (!label || !isCountyQaFixturePath(path)) return null;
  const state = getLocalState(COUNTY_QA_STATE_SLUG);
  if (!state || stateSlug !== state.slug) return null;

  const county: LocalCounty = {
    slug: countySlug,
    name: countySlug === COUNTY_QA_CONTROL_SLUG ? 'QA Cache Control' : 'QA Cache Fixture',
    stateCode: state.code,
    stateSlug: state.slug,
    seat: 'Miami',
  };
  const movers = [fixtureMover(countySlug)];
  const title = `${label} | Move Trust Hub`;
  const description = 'In-memory county QA fixture. Not a published county page.';
  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: `${FIXTURE_ORIGIN}${path}` },
    robots: { index: false, follow: false },
  };

  return {
    state,
    stateName: state.name,
    stateSlug: state.slug,
    county,
    movers,
    isRegionalFallback: false,
    path,
    indexDecision: { tier: 'noindex', reason: 'qa_cache_fixture' },
    metadata,
    title,
    description,
    sourceMode: 'seed',
    approvedCount: 0,
  };
}

export function countyQaStaticParams(): CountyQaStaticParam[] {
  return [
    { stateSlug: COUNTY_QA_STATE_SLUG, countySlug: COUNTY_QA_TARGET_SLUG },
    { stateSlug: COUNTY_QA_STATE_SLUG, countySlug: COUNTY_QA_CONTROL_SLUG },
  ];
}

/** When the fixture is on, prerender only the two fixture slugs. */
export async function countyGenerateStaticParams<T extends CountyQaStaticParam>(
  loadRealParams: () => T[] | Promise<T[]>
): Promise<T[] | CountyQaStaticParam[]> {
  if (countyQaFixtureActive()) return countyQaStaticParams();
  return loadRealParams();
}

/** New marker on every server render. Null when the fixture is off or the path is real. */
export function countyQaRenderMarker(stateSlug: string, countySlug: string): CountyQaRenderMarker | null {
  if (!countyQaFixtureActive()) return null;
  const path = getCountyPath(stateSlug, countySlug);
  const label = fixtureLabel(path);
  if (!label) return null;
  return { marker: crypto.randomUUID(), label };
}
