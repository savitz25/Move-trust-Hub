/**
 * County coverage metrics for conservative discovery (analysis only).
 * Does not publish. Does not write consumer edges.
 */
import { haversineMiles, type CountyCentroid } from '@/lib/state-hhg/calibration/counties';
import type {
  HomeCountyAuditRow,
  ProviderLocalDiscoveryEvidence,
} from '@/lib/state-hhg/discovery/types';

export type CountyCoverageStats = {
  countiesRepresented: number;
  providerCountyEdges: number;
  providersPerCounty: {
    min: number;
    median: number;
    p90: number;
    max: number;
  };
  countyFips: string[];
};

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted.length) - 1)
  );
  return sorted[idx];
}

export function computeCountyCoverage(
  edges: Array<{ providerId: string; countyFips: string }>
): CountyCoverageStats {
  const byCounty = new Map<string, Set<string>>();
  for (const e of edges) {
    const set = byCounty.get(e.countyFips) ?? new Set();
    set.add(e.providerId);
    byCounty.set(e.countyFips, set);
  }
  const counts = [...byCounty.values()].map((s) => s.size).sort((a, b) => a - b);
  return {
    countiesRepresented: byCounty.size,
    providerCountyEdges: edges.length,
    providersPerCounty: {
      min: counts[0] ?? 0,
      median: percentile(counts, 50),
      p90: percentile(counts, 90),
      max: counts[counts.length - 1] ?? 0,
    },
    countyFips: [...byCounty.keys()].sort(),
  };
}

export function homeCountyEdges(
  rows: readonly HomeCountyAuditRow[]
): Array<{ providerId: string; countyFips: string; stateCode: string }> {
  return rows
    .filter((r) => r.homeCountyEligible && r.countyFips)
    .map((r) => ({
      providerId: r.providerId,
      countyFips: r.countyFips!,
      stateCode: r.stateCode,
    }));
}

export function mergeHomeAndExplicitEdges(
  home: readonly HomeCountyAuditRow[],
  explicit: readonly ProviderLocalDiscoveryEvidence[]
): Array<{ providerId: string; countyFips: string; stateCode: string; bases: string[] }> {
  const map = new Map<
    string,
    { providerId: string; countyFips: string; stateCode: string; bases: Set<string> }
  >();
  for (const r of home) {
    if (!r.homeCountyEligible || !r.countyFips) continue;
    const key = `${r.providerId}|${r.countyFips}`;
    const cur = map.get(key) ?? {
      providerId: r.providerId,
      countyFips: r.countyFips,
      stateCode: r.stateCode,
      bases: new Set<string>(),
    };
    cur.bases.add('VERIFIED_HOME_COUNTY');
    map.set(key, cur);
  }
  for (const e of explicit) {
    if (
      (e.basis !== 'EXPLICIT_SERVICE_AREA' &&
        e.basis !== 'CURATED_VERIFIED' &&
        e.basis !== 'REGULATOR_TERRITORY') ||
      !e.consumerEligible
    ) {
      continue;
    }
    const key = `${e.providerId}|${e.countyFips}`;
    const cur = map.get(key) ?? {
      providerId: e.providerId,
      countyFips: e.countyFips,
      stateCode: e.stateCode,
      bases: new Set<string>(),
    };
    cur.bases.add('EXPLICIT_SERVICE_AREA');
    map.set(key, cur);
  }
  return [...map.values()].map((v) => ({
    providerId: v.providerId,
    countyFips: v.countyFips,
    stateCode: v.stateCode,
    bases: [...v.bases],
  }));
}

/**
 * EXPERIMENTAL / NOT APPROVED — home + touching counties by centroid proximity.
 * Analysis only. Never consumerEligible.
 */
export function experimentalAdjacentCoverage(
  homeRows: readonly HomeCountyAuditRow[],
  centroids: readonly CountyCentroid[],
  touchMiles = 45
): {
  label: 'EXPERIMENTAL_NOT_APPROVED';
  edges: Array<{ providerId: string; countyFips: string; stateCode: string }>;
  countiesRepresented: { FL: number; WA: number };
} {
  const byState = {
    FL: centroids.filter((c) => c.stateFips === '12'),
    WA: centroids.filter((c) => c.stateFips === '53'),
  };
  const edges: Array<{ providerId: string; countyFips: string; stateCode: string }> =
    [];
  const seen = new Set<string>();

  for (const r of homeRows) {
    if (!r.homeCountyEligible || !r.countyFips) continue;
    const home = centroids.find((c) => c.countyFips === r.countyFips);
    if (!home) continue;
    const pool = byState[r.stateCode];
    for (const c of pool) {
      const dist = haversineMiles(home.lat, home.lon, c.lat, c.lon);
      // Rough "touching" proxy: centroid within ~45mi or same county
      if (c.countyFips === r.countyFips || dist <= touchMiles) {
        const key = `${r.providerId}|${c.countyFips}`;
        if (seen.has(key)) continue;
        seen.add(key);
        edges.push({
          providerId: r.providerId,
          countyFips: c.countyFips,
          stateCode: r.stateCode,
        });
      }
    }
  }

  const fl = new Set(
    edges.filter((e) => e.stateCode === 'FL').map((e) => e.countyFips)
  );
  const wa = new Set(
    edges.filter((e) => e.stateCode === 'WA').map((e) => e.countyFips)
  );
  return {
    label: 'EXPERIMENTAL_NOT_APPROVED',
    edges,
    countiesRepresented: { FL: fl.size, WA: wa.size },
  };
}

/** Compare explicit positives vs home county location. */
export function compareExplicitVsHome(
  homeRows: readonly HomeCountyAuditRow[],
  explicit: readonly ProviderLocalDiscoveryEvidence[],
  centroids: readonly CountyCentroid[],
  adjacentMiles = 45
): {
  explicitEqualsHome: number;
  explicitAdjacentToHome: number;
  explicitNonAdjacent: number;
  providersWhereHomeMissesExplicit: number;
  relationships: number;
} {
  const homeByProvider = new Map(
    homeRows
      .filter((r) => r.homeCountyEligible && r.countyFips)
      .map((r) => [r.providerId, r])
  );
  let equals = 0;
  let adjacent = 0;
  let nonAdj = 0;
  const missProviders = new Set<string>();
  let relationships = 0;

  for (const e of explicit) {
    if (
      e.basis !== 'EXPLICIT_SERVICE_AREA' &&
      e.basis !== 'CURATED_VERIFIED' &&
      e.basis !== 'REGULATOR_TERRITORY'
    ) {
      continue;
    }
    relationships++;
    const home = homeByProvider.get(e.providerId);
    if (!home?.countyFips) {
      missProviders.add(e.providerId);
      nonAdj++;
      continue;
    }
    if (e.countyFips === home.countyFips) {
      equals++;
      continue;
    }
    missProviders.add(e.providerId);
    const h = centroids.find((c) => c.countyFips === home.countyFips);
    const t = centroids.find((c) => c.countyFips === e.countyFips);
    if (h && t && haversineMiles(h.lat, h.lon, t.lat, t.lon) <= adjacentMiles) {
      adjacent++;
    } else {
      nonAdj++;
    }
  }

  return {
    explicitEqualsHome: equals,
    explicitAdjacentToHome: adjacent,
    explicitNonAdjacent: nonAdj,
    providersWhereHomeMissesExplicit: missProviders.size,
    relationships,
  };
}

/** Scale estimate for future national layer (conservative edges). */
export function estimateConservativeScale(input: {
  sampleProviders: number;
  sampleHomeEdges: number;
  sampleExplicitExtraEdges: number;
  targets: number[];
}): Array<{
  providers: number;
  homeCountyOnlyEdges: number;
  homePlusExplicitEdges: number;
  note: string;
}> {
  const homeRate =
    input.sampleProviders > 0
      ? input.sampleHomeEdges / input.sampleProviders
      : 0;
  const extraRate =
    input.sampleProviders > 0
      ? input.sampleExplicitExtraEdges / input.sampleProviders
      : 0;
  return input.targets.map((n) => ({
    providers: n,
    homeCountyOnlyEdges: Math.round(n * homeRate),
    homePlusExplicitEdges: Math.round(n * (homeRate + extraRate)),
    note: 'Dramatically smaller than radius-generated millions of edges. Explainable 1:1 home + sparse explicit positives.',
  }));
}
