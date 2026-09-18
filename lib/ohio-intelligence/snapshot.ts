import accepted from './accepted-snapshot.json';
import { OH_MOVE_INTEL_VERSION, OH_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type OhioMoveSnapshot = typeof accepted;
export const OHIO_MOVE_SNAPSHOT = accepted as OhioMoveSnapshot;

export function fmtInt(value: number | null | undefined): string {
  if (value == null) return 'Unknown';
  return value.toLocaleString('en-US');
}

export function assertOhioMoveSnapshot(value: OhioMoveSnapshot = OHIO_MOVE_SNAPSHOT): OhioMoveSnapshot {
  if (value.version !== OH_MOVE_INTEL_VERSION) throw new Error('OH move contract mismatch');
  if (value.fingerprint !== OH_MOVE_PUBLIC_FINGERPRINT) throw new Error('OH-MOVE-001 fingerprint mismatch');
  if (value.publication.route !== '/ohio') throw new Error('Ohio path must be /ohio');
  if (value.current_hhg_roster.OH_PUCO_HHG_ROSTER_STATUS !== 'OPEN_SEARCH_ONLY') {
    throw new Error('PUCO HHG roster must stay OPEN_SEARCH_ONLY');
  }
  if (value.current_hhg_roster.OH_PUCO_HHG_ROWS !== null) throw new Error('PUCO HHG rows must stay null');
  if (value.current_hhg_roster.OH_PUCO_DISTINCT_CERTIFICATE_NUMBERS !== null) {
    throw new Error('distinct certificates must stay null');
  }
  if (value.tariff.not_nc_statewide_maximum_rate_tariff !== true) {
    throw new Error('Ohio must not be a statewide Maximum Rate Tariff');
  }
  if (value.tariff.OH_PUCO_TARIFF_DOCUMENT_ROWS !== null) throw new Error('tariff document census must stay null');
  if (value.federal.EXACT_PUCO_TO_USDOT_CROSSWALKS !== 0) throw new Error('no exact PUCO→USDOT bridges');
  if (value.federal.EXACT_PUCO_TO_MC_CROSSWALKS !== 0) throw new Error('no exact PUCO→MC bridges');
  if (value.complaints.OH_PUCO_HHG_COMPLAINT_ROWS !== null) throw new Error('complaint universe must stay null');
  if (value.enforcement.OH_PUCO_HHG_ENFORCEMENT_ROWS !== null) throw new Error('enforcement census must stay null');
  if (value.unauthorized.OH_UNAUTHORIZED_MOVER_ROWS !== null) throw new Error('unauthorized roster must stay null');
  if (value.expansion_ledger.GRAPH_WRITES !== 0) throw new Error('no graph writes');
  if (value.claimEligibilityBroadened !== false) throw new Error('claim eligibility unchanged');
  if (value.no_columbus_page !== true) throw new Error('no Columbus page');
  if (value.publication.rankings || value.publication.trustScore) throw new Error('no ranking or Trust Score');
  if (value.local_work_needed_now !== 'NO') throw new Error('local work must stay NO');
  return value;
}
