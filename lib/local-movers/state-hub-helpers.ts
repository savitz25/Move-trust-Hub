import 'server-only';

import { hasDeepCountyResearch } from '@/data/deep-county-research';
import { evaluateCountyIndexability } from '@/lib/local-movers/county-indexability';
import {
  resolveStateHubDirectoryBadge,
  type StateHubDirectoryBadge,
} from '@/lib/local-movers/county-guide-badge';
import { getCountyGuideTierMeta } from '@/lib/local-movers/county-tier';
import { getCountyPath } from '@/lib/local-movers/index';
import { getMoversForCountyAsync } from '@/lib/local-movers/get-movers-for-county-async';
import { getCountyMarketMoverCount } from '@/lib/local-movers/county-market-mover-counts';
import type { LocalCounty } from '@/lib/local-movers/types';

export type StateHubCountyRow = {
  county: LocalCounty;
  moverCount: number;
  /** Directory card badge — count-driven (Deep guide / Limited only). */
  guideBadge: StateHubDirectoryBadge;
  sortIndex: number;
  isTier1: boolean;
  /** True when deep research content exists (editorial signal, not the badge rule). */
  isDeepGuide: boolean;
  href: string;
};

export type StateHubStats = {
  tier1Count: number;
  deepGuideCount: number;
  /** Counties whose directory badge is Deep guide (count or editorial override). */
  enrichedCount: number;
  totalCounties: number;
};

/**
 * Build county grid rows for /local-movers/[state].
 *
 * Mover counts use the same async path as county pages (static catalog + approved
 * directory locals from Supabase) so badges match after new locals are published.
 *
 * Directory badge rule (centralized in `resolveStateHubDirectoryBadge`):
 *   >30 listed movers → "Deep guide"
 *   ≤30 listed movers → "Limited"
 * Strict — no deep-research editorial override this pass (FL 26–30 was mislabeled).
 *
 * Note: during `next build` (NEXT_PHASE=phase-production-build) approved Supabase
 * locals are skipped to avoid bulk SSG timeouts — both state hubs and county pages
 * share that skip, so counts stay consistent. ISR (revalidate=300 on state hubs,
 * 60 on counties) + publish revalidation tags refresh live counts after deploy.
 */
export async function buildStateHubCountyRows(
  stateSlug: string,
  counties: LocalCounty[]
): Promise<StateHubCountyRow[]> {
  const rows = await Promise.all(
    counties.map(async (county) => {
      const listed = await getMoversForCountyAsync(stateSlug, county.slug);
      // Canonical live count — same set of movers rendered on the county page.
      // Prefer listed length always when the county exists (do not fall back to
      // static market maps that can drift from the rendered list).
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
      const isTier2 = tierMeta.tier === 'tier2';
      const isDeepGuide = hasDeepCountyResearch(stateSlug, county.slug);

      // Directory card badge remains count-driven (Deep guide / Limited).
      // Phase 3 quality tier drives sort order (Premium → Standard → Development).
      const guideBadge = resolveStateHubDirectoryBadge(moverCount);

      let sortIndex = 0;
      if (isTier1 && (isDeepGuide || guideBadge === 'Deep guide')) sortIndex = 3;
      else if (isTier1) sortIndex = 2;
      else if (isTier2) sortIndex = 1;

      return {
        county,
        moverCount,
        guideBadge,
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
    deepGuideCount: rows.filter((r) => r.guideBadge === 'Deep guide').length,
    enrichedCount: rows.filter((r) => r.guideBadge === 'Deep guide').length,
    totalCounties: rows.length,
  };
}

export function pickTier1QuickLinks(
  rows: StateHubCountyRow[],
  limit = 8
): StateHubCountyRow[] {
  return rows.filter((r) => r.isTier1).slice(0, limit);
}
