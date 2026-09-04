import accepted from './accepted-snapshot.json';
import { WA_MOVE_INTEL_VERSION, WA_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type WashingtonMoveSnapshot = typeof accepted;
export const WASHINGTON_MOVE_SNAPSHOT = accepted as WashingtonMoveSnapshot;

export function assertWashingtonMoveSnapshot(
  value: WashingtonMoveSnapshot = WASHINGTON_MOVE_SNAPSHOT,
): WashingtonMoveSnapshot {
  if (value.version !== WA_MOVE_INTEL_VERSION) {
    throw new Error(`Unexpected WA move contract ${value.version}`);
  }
  if (value.fingerprint !== WA_MOVE_PUBLIC_FINGERPRINT) {
    throw new Error('WA-MOVE-001 snapshot fingerprint mismatch');
  }
  if (value.directory.active_result_count !== 284) {
    throw new Error('UTC Active Household Goods directory count drifted');
  }
  if (value.bulk.utc_hhg_bulk_roster !== 'SOURCE_NOT_ACQUIRED') {
    throw new Error('UTC bulk roster was not acquired');
  }
  if (value.crosswalk.coverage !== 'PARTIAL_RECORD_LEVEL') {
    throw new Error('Statewide UTC↔USDOT crosswalk must stay partial/record-level');
  }
  if (value.publication.rankings || value.publication.trustScore) {
    throw new Error('WA publication must not rank or score');
  }
  if (!value.gate.passed) {
    throw new Error('WA-MOVE-001 publication gate failed');
  }
  return value;
}
