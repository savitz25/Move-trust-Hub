/**
 * MOVE-THIN-PAGES-INDEXING-001
 * Kept vs dropped county and city URLs. Seed catalog only. No invented listings.
 */

import { getPublishedCityHubSlugs } from '@/lib/destinations/content';
import { getMarketBySlug, getMarketPath } from '@/lib/destinations/markets';
import { evaluateCountyIndexabilityFromResult } from '@/lib/local-movers/county-indexability';
import { getCountiesForState } from '@/lib/local-movers/geography/index';
import { getMoversForCounty } from '@/lib/local-movers';
import { localStates } from '@/lib/local-movers/states';
import { evaluateCityHubIndexability } from '@/lib/seo/city-indexability';
import { isForbiddenMoveSitemapPath } from '@/lib/seo/move-sitemap-paths';

export type StateUrlRollup = {
  state: string;
  kept: string[];
  dropped: string[];
};

export function countyIndexRollup(): StateUrlRollup[] {
  return localStates.map((state) => {
    const kept: string[] = [];
    const dropped: string[] = [];
    for (const county of getCountiesForState(state.slug)) {
      const url = `/local-movers/${state.slug}/${county.slug}`;
      const result = getMoversForCounty(state.slug, county.slug);
      const decision = evaluateCountyIndexabilityFromResult(state.slug, county.slug, result);
      if (decision.tier === 'index') kept.push(url);
      else dropped.push(url);
    }
    kept.sort();
    dropped.sort();
    return { state: state.slug, kept, dropped };
  });
}

/** City pages only. Cluster landings (/moving-to/<state>) stay on their own rule. */
export function cityIndexRollup(): StateUrlRollup[] {
  const byState = new Map<string, StateUrlRollup>();
  for (const slug of getPublishedCityHubSlugs()) {
    const market = getMarketBySlug(slug);
    if (!market || market.isClusterParent) continue;
    const state = (market.clusterParent ?? market.stateCode).toLowerCase();
    const row = byState.get(state) ?? { state, kept: [], dropped: [] };
    const url = getMarketPath(market);
    if (evaluateCityHubIndexability(market).tier === 'index') row.kept.push(url);
    else row.dropped.push(url);
    byState.set(state, row);
  }
  return [...byState.values()]
    .map((row) => ({
      ...row,
      kept: [...row.kept].sort(),
      dropped: [...row.dropped].sort(),
    }))
    .sort((a, b) => a.state.localeCompare(b.state));
}

export function collectMoveSitemapPaths(county: StateUrlRollup[], city: StateUrlRollup[]): string[] {
  const paths = [
    ...county.flatMap((row) => row.kept),
    ...city.flatMap((row) => row.kept),
  ];
  return paths;
}

export function forbiddenSitemapPaths(paths: readonly string[]): string[] {
  return paths.filter((path) => isForbiddenMoveSitemapPath(path));
}
