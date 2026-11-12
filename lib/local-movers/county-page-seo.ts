import 'server-only';

import { type CountyIndexDecision } from '@/lib/local-movers/county-indexability';
import { publishedCountyEvaluation } from '@/lib/local-movers/county-indexability-async';
import { buildCountyPageMetadata } from '@/lib/local-movers/seo-metadata';
import { getCountyPath } from '@/lib/local-movers/index';
import { getLocalState } from '@/lib/local-movers/states';
import type { LocalCounty, LocalMover, LocalState } from '@/lib/local-movers/types';
import type { Metadata } from 'next';

export type CountyPageSeoContext = {
  state: LocalState;
  stateName: string;
  stateSlug: string;
  county: LocalCounty;
  movers: LocalMover[];
  isRegionalFallback: boolean;
  path: string;
  indexDecision: CountyIndexDecision;
  metadata: Metadata;
  title: string;
  description: string;
  sourceMode: 'db' | 'seed' | 'hybrid' | 'degraded';
  approvedCount: number;
};

/** Single canonical SEO resolver — used by generateMetadata and county page body. */
export async function resolveCountyPageSeo(
  stateSlug: string,
  countySlug: string
): Promise<CountyPageSeoContext | null> {
  const state = getLocalState(stateSlug);
  const evaluated = await publishedCountyEvaluation(stateSlug, countySlug);
  const result = evaluated?.result ?? null;
  if (!state || !result || !evaluated) return null;

  const path = getCountyPath(stateSlug, countySlug);
  const indexDecision = evaluated.decision;
  const metadata = buildCountyPageMetadata(
    result.county,
    state.name,
    result.movers,
    path,
    indexDecision
  );

  const title = typeof metadata.title === 'string' ? metadata.title : '';
  const description = metadata.description ?? '';

  return {
    state,
    stateName: state.name,
    stateSlug: state.slug,
    county: result.county,
    movers: result.movers,
    isRegionalFallback: result.isRegionalFallback,
    path,
    indexDecision,
    metadata,
    title,
    description,
    sourceMode: result.sourceMode,
    approvedCount: result.approvedCount,
  };
}