import accepted from './accepted-snapshot.json';
import { OR_MOVE_INTEL_VERSION, OR_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type OregonMoveSnapshot = typeof accepted;
export const OREGON_MOVE_SNAPSHOT = accepted as OregonMoveSnapshot;

export function fmtInt(value: number | null | undefined): string {
  if (value == null) return 'Unknown';
  return value.toLocaleString('en-US');
}

export function assertOregonMoveSnapshot(
  value: OregonMoveSnapshot = OREGON_MOVE_SNAPSHOT,
): OregonMoveSnapshot {
  if (value.version !== OR_MOVE_INTEL_VERSION) throw new Error('OR move contract mismatch');
  if (value.fingerprint !== OR_MOVE_PUBLIC_FINGERPRINT) throw new Error('OR-MOVE-001 fingerprint mismatch');
  if (value.current_hhg_roster.coverage !== 'ACQUIRED_CURRENT_SNAPSHOT') {
    throw new Error('Current OR HHG roster must remain ACQUIRED_CURRENT_SNAPSHOT');
  }
  if (value.current_hhg_roster.rows !== 113) throw new Error('OR authorized list rows must stay 113');
  if (value.current_hhg_roster.distinctAuthorityIds !== 113) {
    throw new Error('OR distinct certificate IDs must stay 113');
  }
  if (value.current_hhg_roster.blankIds !== 0) throw new Error('Blank certificate rows must be zero');
  if (value.current_hhg_roster.duplicates !== 0) throw new Error('Duplicate certificate IDs must be zero');
  if (value.clocks.sourceAsOf !== null) throw new Error('Do not invent sourceAsOf from retrieval');
  if (value.federal.exact_state_to_usdot_crosswalks !== 0) throw new Error('No exact OR→USDOT bridges');
  if (value.federal.exact_state_to_mc_crosswalks !== 0) throw new Error('No exact OR→MC bridges');
  if (value.federal.name_only !== 'UNSAFE') throw new Error('Name-only join must stay unsafe');
  if (value.complaints.OR_STATE_COMPLAINT_OBSERVATIONS !== null) {
    throw new Error('Oregon complaint observations must stay null');
  }
  if (value.enforcement.OR_STATE_ENFORCEMENT_OBSERVATIONS !== null) {
    throw new Error('Oregon enforcement observations must stay null');
  }
  if (value.enforcement.ENFORCEMENT_FRAMEWORK_PRESENT !== true) {
    throw new Error('2026 enforcement framework must be recorded as present');
  }
  if (value.expansion_ledger.NET_NEW_CANONICAL_ORGANIZATIONS !== 0) {
    throw new Error('Do not mint canonical orgs');
  }
  if (value.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES !== 0) {
    throw new Error('Do not mint public profiles');
  }
  if (value.expansion_ledger.GRAPH_WRITES !== 0) throw new Error('No graph writes');
  if (value.claimEligibilityBroadened !== false) throw new Error('Claim eligibility must stay unchanged');
  if (value.no_portland_page !== true) throw new Error('No Portland page');
  if (value.publication.rankings || value.publication.trustScore) throw new Error('No ranking or Trust Score');
  if (value.authority_classes.OR_LOCAL_CARTAGE_ROWS === value.authority_classes.OR_OTHER_THAN_LOCAL_ROWS) {
    throw new Error('Do not flatten local cartage into other-than-local');
  }
  if (value.local_work_needed_now !== 'NO') throw new Error('Local work must stay NO');
  return value;
}
