import { isWave1Eligible, type StagedPublicationRow } from '@/lib/federal-hhg/wave-eligibility';

export type WaveSelectionOptions = {
  limit: number;
  perStateCap: number;
  maxBrokers?: number;
  maxDuals?: number;
};

function byRole(rows: StagedPublicationRow[], role: string) {
  return rows
    .filter((row) => row.classification === role)
    .sort((a, b) => a.usdot.localeCompare(b.usdot, 'en'));
}

/**
 * Round-robin by headquarters state so FL/CA/TX/NY cannot dominate.
 * Duals and brokers are filled first, then carriers, all sorted by USDOT.
 */
export function selectWaveCandidates(
  rows: readonly StagedPublicationRow[],
  options: WaveSelectionOptions
): StagedPublicationRow[] {
  const eligible = rows.filter((row) => isWave1Eligible(row).eligible);
  const selected: StagedPublicationRow[] = [];
  const used = new Set<string>();
  const perState = new Map<string, number>();

  const take = (pool: StagedPublicationRow[], max: number) => {
    const buckets = new Map<string, StagedPublicationRow[]>();
    for (const row of pool) {
      if (used.has(row.usdot)) continue;
      const state = (row.phy_state ?? '').trim().toUpperCase();
      buckets.set(state, [...(buckets.get(state) ?? []), row]);
    }
    const states = [...buckets.keys()].sort();
    let i = 0;
    let added = 0;
    while (added < max && selected.length < options.limit && states.length) {
      const state = states[i % states.length]!;
      const bucket = buckets.get(state) ?? [];
      const next = bucket.shift();
      i += 1;
      if (!next) continue;
      if ((perState.get(state) ?? 0) >= options.perStateCap) continue;
      used.add(next.usdot);
      perState.set(state, (perState.get(state) ?? 0) + 1);
      selected.push(next);
      added += 1;
    }
  };

  const duals = byRole(eligible, 'HHG_CARRIER_BROKER');
  const brokers = byRole(eligible, 'HHG_BROKER');
  const carriers = byRole(eligible, 'HHG_CARRIER');

  take(duals, options.maxDuals ?? duals.length);
  take(brokers, options.maxBrokers ?? brokers.length);
  take(carriers, options.limit);

  return selected.slice(0, options.limit);
}

export function waveSelectionStats(rows: readonly StagedPublicationRow[]) {
  const states = new Set(rows.map((row) => (row.phy_state ?? '').trim().toUpperCase()));
  return {
    total: rows.length,
    carrier: rows.filter((row) => row.classification === 'HHG_CARRIER').length,
    broker: rows.filter((row) => row.classification === 'HHG_BROKER').length,
    dual: rows.filter((row) => row.classification === 'HHG_CARRIER_BROKER').length,
    states: states.size,
  };
}
