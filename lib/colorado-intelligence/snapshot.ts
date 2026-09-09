import accepted from './accepted-snapshot.json';
import { CO_MOVE_INTEL_VERSION, CO_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type ColoradoMoveSnapshot = typeof accepted;
export const COLORADO_MOVE_SNAPSHOT = accepted as ColoradoMoveSnapshot;

export function assertColoradoMoveSnapshot(
  value: ColoradoMoveSnapshot = COLORADO_MOVE_SNAPSHOT,
): ColoradoMoveSnapshot {
  if (value.version !== CO_MOVE_INTEL_VERSION) {
    throw new Error(`Unexpected CO move contract ${value.version}`);
  }
  if (value.fingerprint !== CO_MOVE_PUBLIC_FINGERPRINT) {
    throw new Error('CO-MOVE-001 snapshot fingerprint mismatch');
  }
  if (value.active_universe.official_total_permits !== 203) {
    throw new Error('Colorado Active HHG permit total drifted from accepted OPR PDF');
  }
  if (value.active_universe.do_not_sum_historical_statuses !== true) {
    throw new Error('Historical statuses must not be summed into the active universe');
  }
  if (value.crosswalk.name_only !== 'UNSAFE') {
    throw new Error('Name-only HHG↔USDOT join must stay unsafe');
  }
  if (value.authority.colorado_active_is_not_fmcsa_active !== true) {
    throw new Error('Colorado ACTIVE must not equal FMCSA ACTIVE');
  }
  if (value.publication.rankings || value.publication.trustScore) {
    throw new Error('CO publication must not rank or score');
  }
  if (value.no_denver_work !== true || value.no_colorado_counties !== true) {
    throw new Error('Denver/county work is forbidden in CO-MOVE-001');
  }
  if (!value.gate.passed) {
    throw new Error('CO-MOVE-001 publication gate failed');
  }
  return value;
}

export function fmtInt(n: number): string {
  return n.toLocaleString('en-US');
}
