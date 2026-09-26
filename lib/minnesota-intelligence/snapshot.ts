import accepted from './accepted-snapshot.json';
import { MN_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type MinnesotaMoveSnapshot = typeof accepted;
export const MINNESOTA_MOVE_SNAPSHOT = accepted as MinnesotaMoveSnapshot;

export function assertMinnesotaMoveSnapshot(value: MinnesotaMoveSnapshot = MINNESOTA_MOVE_SNAPSHOT): MinnesotaMoveSnapshot {
  if (value.version !== 'move-mn-state-intel-v1') throw new Error('version');
  if (value.fingerprint !== MN_MOVE_PUBLIC_FINGERPRINT) throw new Error('fingerprint');
  if (value.publication.route !== '/minnesota') throw new Error('route');
  const roster = value.current_hhg_roster;
  if (roster.coverage !== 'NOT_ACQUIRED' || roster.MN_HHG_PERMIT_ROSTER !== 'NOT_ACQUIRED') throw new Error('roster coverage');
  if (roster.MN_HHG_PERMIT_ROWS !== null || roster.MN_HHG_DISTINCT_PERMITS !== null) throw new Error('no invented population');
  if (roster.MN_EXACT_PERMIT_USDOT_BRIDGES !== 0 || roster.MN_EXACT_MC_JOINS !== 0) throw new Error('joins');
  if (roster.verification !== 'KNOWN' || !roster.missing_is_not_zero) throw new Error('verification semantics');
  if (!value.permit_framework.statewide.includes('may operate statewide')) throw new Error('statewide authority');
  if (!value.permit_framework.no_synthetic_license_status) throw new Error('no synthetic status');
  if (value.insurance.limits.length !== 3 || !value.insurance.insurance_is_not_quality) throw new Error('insurance');
  if (value.rates_and_records.not_a_quote !== true || value.rates_and_records.rate_sheets_parsed !== false) throw new Error('tariff semantics');
  if (value.rates_and_records.MN_TARIFF_REPOSITORY !== 'NOT_ACQUIRED') throw new Error('tariff repository');
  if (value.clocks.sourceAsOf !== null || value.clocks.statutes_edition !== '2025 Minnesota Statutes') throw new Error('clocks');
  if (value.complaints.count !== null || value.complaints.intake !== 'KNOWN' || value.complaints.outcomes !== 'REQUEST_ONLY') {
    throw new Error('complaints');
  }
  if (!value.identity.mn_permit_is_not_usdot || !value.identity.mn_permit_is_not_mc || value.identity.name_only_join !== 'UNSAFE') {
    throw new Error('identity');
  }
  if (value.capabilities.combined_state_fmcsa_mover_count !== 'UNSUPPORTED') throw new Error('no combined count');
  if (value.expansion_ledger.GRAPH_WRITES !== 0 || value.expansion_ledger.PROFILE_ATTACHMENTS !== 0) throw new Error('graph');
  if (value.no_minneapolis_intelligence_page !== true || value.no_minnesota_local_routes !== true) throw new Error('local');
  return value;
}
