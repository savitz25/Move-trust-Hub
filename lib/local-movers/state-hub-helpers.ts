import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { evaluateCountyIndexability } from '@/lib/local-movers/county-indexability';
import { isBatchTemplateCountyResearch } from '@/lib/local-movers/county-content-quality';
import { getCountyResearch } from '@/lib/local-movers/county-research';
import { getCountyGuideTierMeta } from '@/lib/local-movers/county-tier';
import { getCountyPath, getMoversForCounty } from '@/lib/local-movers/index';
import { getCountyMarketMoverCount } from '@/lib/local-movers/county-market-mover-counts';
import type { LocalCounty } from '@/lib/local-movers/types';

export type StateHubCountyRow = {
  county: LocalCounty;
  moverCount: number;
  guideBadge: string;
  sortIndex: number;
  isTier1: boolean;
  isDeepGuide: boolean;
  href: string;
};

export type StateHubStats = {
  tier1Count: number;
  deepGuideCount: number;
  enrichedCount: number;
  totalCounties: number;
};

export function buildStateHubCountyRows(
  stateSlug: string,
  counties: LocalCounty[]
): StateHubCountyRow[] {
  return counties
    .map((county) => {
      const listedCount =
        getMoversForCounty(stateSlug, county.slug)?.movers.length ?? 0;
      const mappedCount = getCountyMarketMoverCount(stateSlug, county.slug);
      const moverCount =
        listedCount > 0 ? listedCount : mappedCount !== null ? mappedCount : 0;
      const indexDecision = evaluateCountyIndexability(stateSlug, county.slug);
      const tierMeta = getCountyGuideTierMeta(
        indexDecision,
        stateSlug,
        county.slug
      );
      const isTier1 = tierMeta.tier === 'tier1';
      const isDeepGuide = hasDeepCountyResearch(stateSlug, county.slug);
      const enriched = Boolean(
        getCountyResearch(stateSlug, county.slug) &&
          !isBatchTemplateCountyResearch(stateSlug, county.slug)
      );

      let sortIndex = 0;
      if (isTier1 && isDeepGuide) sortIndex = 3;
      else if (isTier1 && enriched) sortIndex = 2;
      else if (isTier1) sortIndex = 1;

      return {
        county,
        moverCount,
        guideBadge: tierMeta.badge,
        sortIndex,
        isTier1,
        isDeepGuide,
        href: getCountyPath(stateSlug, county.slug),
      };
    })
    .sort(
      (a, b) =>
        b.sortIndex - a.sortIndex ||
        b.moverCount - a.moverCount ||
        a.county.name.localeCompare(b.county.name)
    );
}

export function buildStateHubStats(rows: StateHubCountyRow[]): StateHubStats {
  return {
    tier1Count: rows.filter((r) => r.isTier1).length,
    deepGuideCount: rows.filter((r) => r.isDeepGuide).length,
    enrichedCount: rows.filter((r) => r.guideBadge === 'Enriched' || r.guideBadge === 'Deep guide').length,
    totalCounties: rows.length,
  };
}

export function pickTier1QuickLinks(
  rows: StateHubCountyRow[],
  limit = 8
): StateHubCountyRow[] {
  return rows.filter((r) => r.isTier1).slice(0, limit);
}