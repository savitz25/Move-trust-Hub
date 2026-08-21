/**
 * Task 011A — derived service-area architecture (design helpers only).
 * Never creates regulatory eligibility. Not consumer-published.
 */
import {
  EXPERIMENTAL_POWER_UNIT_RADIUS_BANDS,
  SERVICE_AREA_EVIDENCE_PRIORITY,
  type ServiceAreaEvidenceType,
} from '@/lib/state-hhg/types';

export function experimentalRadiusMilesForPowerUnits(
  powerUnits: number | null | undefined
): number | null {
  if (powerUnits == null || powerUnits < 0) return null;
  for (const band of EXPERIMENTAL_POWER_UNIT_RADIUS_BANDS) {
    if (band.powerUnitsMax == null || powerUnits <= band.powerUnitsMax) {
      return band.candidateRadiusMiles;
    }
  }
  return null;
}

/** Explicit verified evidence outranks derived estimates. */
export function pickWinningServiceAreaEvidence(
  available: readonly ServiceAreaEvidenceType[]
): ServiceAreaEvidenceType | null {
  for (const rank of SERVICE_AREA_EVIDENCE_PRIORITY) {
    if (available.includes(rank)) return rank;
  }
  return null;
}

/**
 * Scale estimate for future provider↔county edges.
 * Does not create edges.
 */
export function estimateProviderCountyEdgeScale(input: {
  providers: number;
  avgCountiesLow: number;
  avgCountiesBase: number;
  avgCountiesHigh: number;
}) {
  return {
    low: Math.round(input.providers * input.avgCountiesLow),
    base: Math.round(input.providers * input.avgCountiesBase),
    high: Math.round(input.providers * input.avgCountiesHigh),
    recommendation:
      'Use keyed (provider_id, county_fips) table with coverage_type + evidence_type indexes; partition by state_code when exceeding ~2M edges.',
  };
}
