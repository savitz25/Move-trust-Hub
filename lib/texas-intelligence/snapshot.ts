import accepted from './accepted-snapshot.json';
import { TX_MOVE_INTEL_VERSION, TX_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type TexasMoveSnapshot = typeof accepted;
export const TEXAS_MOVE_SNAPSHOT = accepted as TexasMoveSnapshot;

export function assertTexasMoveSnapshot(
  value: TexasMoveSnapshot = TEXAS_MOVE_SNAPSHOT,
): TexasMoveSnapshot {
  if (value.version !== TX_MOVE_INTEL_VERSION) {
    throw new Error(`Unexpected TX move contract ${value.version}`);
  }
  if (value.fingerprint !== TX_MOVE_PUBLIC_FINGERPRINT) {
    throw new Error('TX-MOVE-001 snapshot fingerprint mismatch');
  }
  if (value.authority.license_count_published !== null) {
    throw new Error('Missing Texas HHG roster must stay unknown, not a published count');
  }
  if (value.tow.hero_inclusion) {
    throw new Error('Tow-company rows must not enter the HHG hero');
  }
  if (value.publication.rankings || value.publication.trustScore) {
    throw new Error('TX publication must not rank or score');
  }
  if (value.crosswalk.coverage !== 'SOURCE_NOT_ACQUIRED') {
    throw new Error('Statewide TxDMV↔USDOT crosswalk was not acquired');
  }
  return value;
}
