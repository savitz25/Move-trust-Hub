import { normalizeUsdot } from '@/lib/federal-hhg/normalize';
import { isWave1Eligible, type StagedPublicationRow } from '@/lib/federal-hhg/wave-eligibility';

export type Wave2Candidate = {
  usdot: string;
  classification: string;
  selection_rank: number;
  state?: string;
};

export function loadManifestUsdots(candidates: readonly Wave2Candidate[]): Set<string> {
  return new Set(candidates.map((row) => normalizeUsdot(row.usdot)).filter(Boolean));
}

export function isWave2ManifestMember(
  usdot: string,
  manifest: ReadonlySet<string>
): boolean {
  const n = normalizeUsdot(usdot);
  return Boolean(n && manifest.has(n));
}

/** Canary: first maxBrokers by rank, then carriers round-robin by state until limit. */
export function selectWave2Canary<T extends Wave2Candidate>(
  candidates: readonly T[],
  options: { limit: number; maxBrokers: number }
): T[] {
  const brokers = [...candidates]
    .filter((row) => row.classification === 'HHG_BROKER')
    .sort((a, b) => a.selection_rank - b.selection_rank);
  const carriers = [...candidates]
    .filter((row) => row.classification === 'HHG_CARRIER')
    .sort((a, b) => a.selection_rank - b.selection_rank);

  const selected: T[] = brokers.slice(0, options.maxBrokers);
  const used = new Set(selected.map((row) => normalizeUsdot(row.usdot)));
  const buckets = new Map<string, T[]>();
  for (const row of carriers) {
    const state = (row.state ?? '').trim().toUpperCase() || 'ZZ';
    buckets.set(state, [...(buckets.get(state) ?? []), row]);
  }
  const states = [...buckets.keys()].sort();
  let i = 0;
  let idle = 0;
  while (selected.length < options.limit && states.length && idle < states.length) {
    const state = states[i % states.length]!;
    i += 1;
    const bucket = buckets.get(state) ?? [];
    const next = bucket.shift();
    if (!next || used.has(normalizeUsdot(next.usdot))) {
      idle += 1;
      continue;
    }
    used.add(normalizeUsdot(next.usdot));
    selected.push(next);
    idle = 0;
  }
  return selected.slice(0, options.limit);
}

export function revalidateWave2Candidate(
  staged: StagedPublicationRow,
  manifest: ReadonlySet<string>,
  existingDots: ReadonlySet<string>
): { ok: boolean; reason: string } {
  const usdot = normalizeUsdot(staged.usdot);
  if (!isWave2ManifestMember(usdot, manifest)) {
    return { ok: false, reason: 'not_in_manifest' };
  }
  if (existingDots.has(usdot)) return { ok: false, reason: 'canonical_usdot_collision' };
  const gate = isWave1Eligible(staged);
  if (!gate.eligible) return { ok: false, reason: gate.reason };
  if (staged.classification === 'HHG_CARRIER_BROKER') {
    return { ok: false, reason: 'unexpected_dual_in_wave2_manifest' };
  }
  return { ok: true, reason: 'ok' };
}
