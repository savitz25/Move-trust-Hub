import accepted from './accepted-snapshot.json';
import { NY_MOVE_INTEL_VERSION, NY_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type NewYorkMoveSnapshot = typeof accepted;
export const NEW_YORK_MOVE_SNAPSHOT = accepted as NewYorkMoveSnapshot;

export function fmtInt(value: number | null | undefined): string {
  if (value == null) return 'Unknown';
  return value.toLocaleString('en-US');
}

export function assertNewYorkMoveSnapshot(
  value: NewYorkMoveSnapshot = NEW_YORK_MOVE_SNAPSHOT,
): NewYorkMoveSnapshot {
  if (value.version !== NY_MOVE_INTEL_VERSION) throw new Error('NY move contract mismatch');
  if (value.fingerprint !== NY_MOVE_PUBLIC_FINGERPRINT) throw new Error('NY-MOVE-001 fingerprint mismatch');
  if (value.current_hhg_roster.coverage !== 'OPEN_SEARCH_ONLY') {
    throw new Error('Current NY HHG roster must remain OPEN_SEARCH_ONLY');
  }
  if (value.current_hhg_roster.rows !== null) throw new Error('Current NY HHG rows must be null, not zero');
  if (value.bulletin_2026.issues !== 36) throw new Error('2026 bulletin issue count drifted');
  if (value.bulletin_2026.hhgApplicationObservations !== 108) throw new Error('HHG bulletin observations drifted');
  if (value.bulletin_2026.application_ne_authority !== true) throw new Error('Application must stay distinct from authority');
  if (value.bulletin_2026.application_ne_current_mover !== true) {
    throw new Error('Bulletin application must not become a current mover');
  }
  if (value.federal.exact_state_to_federal_crosswalks !== 0) throw new Error('No exact NYDOT→FMCSA bridges');
  if (value.federal.name_only !== 'UNSAFE') throw new Error('Name-only join must stay unsafe');
  if (value.identity.usdot_alone_is_not_ny_intrastate_authority !== true) {
    throw new Error('USDOT alone is not NY intrastate authority');
  }
  if (value.federal.nydot_authority_ne_usdot !== true) {
    throw new Error('NYDOT authority must stay distinct from USDOT');
  }
  if (value.expansion_ledger.NET_NEW_CANONICAL_ORGANIZATIONS !== 0) throw new Error('Do not mint canonical orgs');
  if (value.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES !== 0) throw new Error('Do not mint public profiles');
  if (value.expansion_ledger.EXISTING_ORGANIZATIONS_ENRICHED !== 0) throw new Error('No graph enrichment');
  if (value.claimEligibilityBroadened !== false) throw new Error('Claim eligibility must stay unchanged');
  if (value.no_new_york_local_routes !== true) throw new Error('No local New York routes');
  if (value.publication.rankings || value.publication.trustScore) throw new Error('No ranking or Trust Score');
  if (value.uiGrains.hhgBulletinObservations !== 'VISIBLE_PUBLIC_METRIC') {
    throw new Error('HHG bulletin observations must be visible');
  }
  return value;
}
