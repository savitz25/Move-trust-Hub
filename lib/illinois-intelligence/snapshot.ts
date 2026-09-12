import accepted from './accepted-snapshot.json';
import { IL_MOVE_INTEL_VERSION, IL_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type IllinoisMoveSnapshot = typeof accepted;
export const ILLINOIS_MOVE_SNAPSHOT = accepted as IllinoisMoveSnapshot;

export function fmtInt(value: number | null | undefined): string {
  if (value == null) return 'Unknown';
  return value.toLocaleString('en-US');
}

export function assertIllinoisMoveSnapshot(
  value: IllinoisMoveSnapshot = ILLINOIS_MOVE_SNAPSHOT,
): IllinoisMoveSnapshot {
  if (value.version !== IL_MOVE_INTEL_VERSION) throw new Error('IL move contract mismatch');
  if (value.fingerprint !== IL_MOVE_PUBLIC_FINGERPRINT) throw new Error('IL-MOVE-001 fingerprint mismatch');
  if (value.current_hhg_roster.coverage !== 'OPEN_SEARCH_ONLY') {
    throw new Error('Current IL HHG roster must remain OPEN_SEARCH_ONLY');
  }
  if (value.current_hhg_roster.rows !== null) throw new Error('Current IL HHG rows must be null, not zero');
  if (value.identity.namespace !== null) throw new Error('Do not invent IL-ICC-HHG until a bulk roster exists');
  if (value.federal.exact_state_to_usdot_crosswalks !== 0) throw new Error('No exact ILCC→USDOT bridges');
  if (value.federal.exact_state_to_mc_crosswalks !== 0) throw new Error('No exact ILCC→MC bridges');
  if (value.federal.name_only !== 'UNSAFE') throw new Error('Name-only join must stay unsafe');
  if (value.identity.usdot_alone_is_not_il_intrastate_authority !== true) {
    throw new Error('USDOT alone is not Illinois intrastate authority');
  }
  if (value.expansion_ledger.NET_NEW_CANONICAL_ORGANIZATIONS !== 0) throw new Error('Do not mint canonical orgs');
  if (value.expansion_ledger.NET_NEW_PUBLIC_MOVE_PROFILES !== 0) throw new Error('Do not mint public profiles');
  if (value.expansion_ledger.EXISTING_ORGANIZATIONS_ENRICHED !== 0) throw new Error('No graph enrichment');
  if (value.expansion_ledger.GRAPH_WRITES !== 0) throw new Error('No graph writes');
  if (value.claimEligibilityBroadened !== false) throw new Error('Claim eligibility must stay unchanged');
  if (value.no_illinois_local_routes !== true) throw new Error('No local Illinois routes');
  if (value.no_chicago_page !== true) throw new Error('No Chicago page');
  if (value.publication.rankings || value.publication.trustScore) throw new Error('No ranking or Trust Score');
  if (value.complaints.do_not_substitute_fmcsa_complaints !== true) {
    throw new Error('Do not substitute FMCSA complaints for ICC complaints');
  }
  return value;
}
