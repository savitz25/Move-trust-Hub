import { createHash } from 'node:crypto';
import { getAllCountyParams } from '../../lib/local-movers/geography/index';
import type { LiveCountyProbe } from './live-county-audit';

/** Reproducible 32-bit seed from deploy commit hash (first 8 hex chars). */
export function seedFromCommitHash(commitHash: string): number {
  const normalized = commitHash.trim().toLowerCase().replace(/[^a-f0-9]/g, '');
  if (normalized.length < 8) {
    throw new Error(`commit hash too short for seeded sample: ${commitHash}`);
  }
  return Number.parseInt(normalized.slice(0, 8), 16) >>> 0;
}

/** Mulberry32 PRNG — deterministic shuffle for audit sampling. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: readonly T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const SEEDED_SAMPLE_SIZE = 7;

export const SEEDED_SAMPLE_SELECTION_CODE = `seedFromCommitHash(commitHash) → mulberry32 → Fisher-Yates shuffle of getAllCountyParams() → take first 7 after excluding named probes`;

export function buildSeededCountyProbes(
  commitHash: string,
  exclude: ReadonlyArray<{ stateSlug: string; countySlug: string }>
): { seed: number; selectionCode: string; probes: LiveCountyProbe[] } {
  const seed = seedFromCommitHash(commitHash);
  const excludeKeys = new Set(exclude.map((p) => `${p.stateSlug}/${p.countySlug}`));
  const pool = getAllCountyParams().filter(
    (p) => !excludeKeys.has(`${p.stateSlug}/${p.countySlug}`)
  );
  const shuffled = seededShuffle(pool, seed);
  const picked = shuffled.slice(0, SEEDED_SAMPLE_SIZE);

  return {
    seed,
    selectionCode: SEEDED_SAMPLE_SELECTION_CODE,
    probes: picked.map(({ stateSlug, countySlug }) => ({
      stateSlug,
      countySlug,
      label: `${countySlug} ${stateSlug} (seeded)`,
      path: `/local-movers/${stateSlug}/${countySlug}`,
    })),
  };
}

/** Stable digest of the 7-county sample for report reproducibility checks. */
export function sampleDigest(probes: LiveCountyProbe[]): string {
  const payload = probes.map((p) => p.path).sort().join('\n');
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}