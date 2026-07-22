import 'server-only';

import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { evaluateCountyIndexability } from '@/lib/local-movers/county-indexability';
import { isBatchTemplateCountyResearch } from '@/lib/local-movers/county-content-quality';
import { getCountyResearch } from '@/lib/local-movers/county-research';
import { getCountyGuideTierMeta } from '@/lib/local-movers/county-tier';
import { getCountyPath } from '@/lib/local-movers/index';
import { getMoversForCountyAsync } from '@/lib/local-movers/get-movers-for-county-async';
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

/**
 * Build county grid rows for /local-movers/[state].
 *
 * Mover counts use the same async path as county pages (static catalog + approved
 * directory locals from Supabase) so badges match after new locals are published.
 */
export async function buildStateHubCountyRows(
  stateSlug: string,
  counties: LocalCounty[]
): Promise<StateHubCountyRow[]> {
  const rows = await Promise.all(
    counties.map(async (county) => {
      const listed = await getMoversForCountyAsync(stateSlug, county.slug);
      // Canonical live count — same set of movers rendered on the county page.
      const listedCount = listed?.movers.length ?? 0;
      const mappedCount = getCountyMarketMoverCount(stateSlug, county.slug);
      const moverCount =
        listed != null
          ? listedCount
          : mappedCount !== null
            ? mappedCount
            : 0;

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
  );

  return rows.sort(
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
    enrichedCount: rows.filter(
      (r) => r.guideBadge === 'Enriched' || r.guideBadge === 'Deep guide'
    ).length,
    totalCounties: rows.length,
  };
}

export function pickTier1QuickLinks(
  rows: StateHubCountyRow[],
  limit = 8
): StateHubCountyRow[] {
  return rows.filter((r) => r.isTier1).slice(0, limit);
}
