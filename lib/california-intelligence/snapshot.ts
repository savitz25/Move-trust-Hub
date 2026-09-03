import accepted from './accepted-snapshot.json';
import { CA_MOVE_INTEL_VERSION, CA_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type CaliforniaMoveSnapshot = typeof accepted;
export const CALIFORNIA_MOVE_SNAPSHOT = accepted as CaliforniaMoveSnapshot;

export function assertCaliforniaMoveSnapshot(
  value: CaliforniaMoveSnapshot = CALIFORNIA_MOVE_SNAPSHOT,
): CaliforniaMoveSnapshot {
  if (value.version !== CA_MOVE_INTEL_VERSION) {
    throw new Error(`Unexpected CA move contract ${value.version}`);
  }
  if (value.fingerprint !== CA_MOVE_PUBLIC_FINGERPRINT) {
    throw new Error('CA-MOVE-001 snapshot fingerprint mismatch');
  }
  if (value.authority.license_count_published !== null) {
    throw new Error('Missing CAL-T roster must stay unknown, not a published count');
  }
  if (value.enforcement.rows !== 132) {
    throw new Error('BHGS 19237 citation count drifted');
  }
  if (value.publication.rankings || value.publication.trustScore) {
    throw new Error('CA publication must not rank or score');
  }
  return value;
}
