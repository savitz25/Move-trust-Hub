/**
 * Deterministic pilot cohort selection (ASK-SEARCH-006A).
 * Stable sort by network_entity_id — no payment/popularity bias.
 */

import type { NetworkDiscoveryEntity } from './types';

/** Target band 100–250; take all eligible when below band (documented). */
export const PILOT_TARGET_MIN = 100;
export const PILOT_TARGET_MAX = 250;

export function selectPilotCohort(eligible: NetworkDiscoveryEntity[]): NetworkDiscoveryEntity[] {
  const sorted = [...eligible].sort((a, b) =>
    a.network_entity_id.localeCompare(b.network_entity_id)
  );
  if (sorted.length <= PILOT_TARGET_MAX) return sorted;
  // Deterministic truncation: first N by stable ID order
  return sorted.slice(0, PILOT_TARGET_MAX);
}
