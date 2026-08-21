import { normalizeUsdot } from '@/lib/federal-hhg/normalize';
import { isWave1Eligible, type StagedPublicationRow } from '@/lib/federal-hhg/wave-eligibility';
import type { Wave2Candidate } from '@/lib/federal-hhg/wave2-manifest';
import { selectWave2Canary } from '@/lib/federal-hhg/wave2-manifest';

export function loadWave4ManifestUsdots(
  candidates: readonly { usdot: string }[]
): Set<string> {
  return new Set(candidates.map((row) => normalizeUsdot(row.usdot)).filter(Boolean));
}

export function revalidateWave4Candidate(
  staged: StagedPublicationRow,
  manifest: ReadonlySet<string>,
  existingDots: ReadonlySet<string>
): { ok: boolean; reason: string } {
  const usdot = normalizeUsdot(staged.usdot);
  if (!usdot || !manifest.has(usdot)) {
    return { ok: false, reason: 'not_in_manifest' };
  }
  if (existingDots.has(usdot)) {
    return { ok: false, reason: 'canonical_usdot_collision' };
  }
  if (staged.disposition !== 'NEW_CANONICAL_CANDIDATE') {
    return { ok: false, reason: 'identity_review_disposition' };
  }
  const gate = isWave1Eligible(staged);
  if (!gate.eligible) return { ok: false, reason: gate.reason };
  if (staged.classification !== 'HHG_CARRIER') {
    return { ok: false, reason: 'wave4_carriers_only' };
  }
  if (!staged.hhg_carrier_verified) {
    return { ok: false, reason: 'carrier_not_verified' };
  }
  return { ok: true, reason: 'ok' };
}

/** Wave 4 canary: geographic carriers only (no brokers). */
export function selectWave4Canary<T extends Wave2Candidate>(
  candidates: readonly T[],
  limit: number
): T[] {
  return selectWave2Canary(candidates, { limit, maxBrokers: 0 });
}
