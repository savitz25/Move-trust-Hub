import type { Metadata } from 'next';
import {
  getCityHubContent,
} from '@/lib/destinations/content';
import { resolveCityHubSlug } from '@/lib/destinations/city-hub-slug-aliases';
import { getMarketBySlug, getMarketPath } from '@/lib/destinations/markets';
import { buildCityHubMetadata } from '@/lib/seo/destination-seo';
import type { CityHubContent, Market } from '@/lib/destinations/types';

/** Metadata when a city hub slug is unknown — never inherit root ZIP Planner title. */
export const CITY_HUB_NOT_FOUND_METADATA: Metadata = {
  title: 'Page Not Found',
  description: 'This destination city guide was not found.',
  robots: { index: false, follow: false },
};

export type ResolvedCityHubPage = {
  slug: string;
  resolvedSlug: string;
  market: Market;
  content: CityHubContent;
  /** True when request used an alias (e.g. miami-fl → miami). */
  usedAlias: boolean;
  canonicalPath: string;
};

/**
 * Resolve a city hub for a state route. Returns null when missing or wrong cluster.
 */
export function resolveCityHubForState(
  slug: string,
  expectedClusterParent: string
): ResolvedCityHubPage | null {
  const resolvedSlug = resolveCityHubSlug(slug);
  const content = getCityHubContent(resolvedSlug);
  const market = getMarketBySlug(resolvedSlug);

  if (!content || !market) return null;
  if (market.clusterParent !== expectedClusterParent) return null;

  return {
    slug,
    resolvedSlug,
    market,
    content,
    usedAlias: resolvedSlug !== slug,
    canonicalPath: getMarketPath(market),
  };
}

/** Standalone city hubs (no cluster parent state folder). */
export function resolveCityHubStandalone(slug: string): ResolvedCityHubPage | null {
  const resolvedSlug = resolveCityHubSlug(slug);
  const content = getCityHubContent(resolvedSlug);
  const market = getMarketBySlug(resolvedSlug);

  if (!content || !market) return null;

  return {
    slug,
    resolvedSlug,
    market,
    content,
    usedAlias: resolvedSlug !== slug,
    canonicalPath: getMarketPath(market),
  };
}

export function cityHubMetadataForSlug(slug: string): Metadata {
  const content = getCityHubContent(slug);
  const market = getMarketBySlug(slug);
  if (!content || !market) return CITY_HUB_NOT_FOUND_METADATA;
  return buildCityHubMetadata(content);
}
