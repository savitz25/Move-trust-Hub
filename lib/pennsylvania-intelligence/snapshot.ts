import accepted from './accepted-snapshot.json';
import { PA_MOVE_INTEL_VERSION, PA_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type PennsylvaniaMoveSnapshot = typeof accepted;
export const PENNSYLVANIA_MOVE_SNAPSHOT = accepted as PennsylvaniaMoveSnapshot;

export function fmtInt(value: number | null | undefined): string {
  if (value == null) return 'Unknown';
  return value.toLocaleString('en-US');
}

export function assertPennsylvaniaMoveSnapshot(
  value: PennsylvaniaMoveSnapshot = PENNSYLVANIA_MOVE_SNAPSHOT,
): PennsylvaniaMoveSnapshot {
  if (value.version !== PA_MOVE_INTEL_VERSION) throw new Error('PA move contract mismatch');
  if (value.fingerprint !== PA_MOVE_PUBLIC_FINGERPRINT) throw new Error('PA-MOVE-001 fingerprint mismatch');
  if (value.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS !== 269) throw new Error('HHG list rows must stay 269');
  if (value.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES !== 267) {
    throw new Error('distinct Utility Codes must stay 267');
  }
  const listRows = Number(value.current_hhg_roster.PA_PUC_HHG_CARRIER_ROWS);
  const distinctUtilityCodes = Number(value.current_hhg_roster.PA_PUC_HHG_DISTINCT_UTILITY_CODES);
  if (listRows === distinctUtilityCodes) {
    throw new Error('list rows must not equal distinct Utility Codes in this freeze');
  }
  if (value.authorities.PA_PUC_HHG_ACTIVE_AUTHORITY_ROWS !== 269) {
    throw new Error('active HHG authority rows must stay 269');
  }
  if (value.authorities.PA_PUC_HHG_AUTHORITY_ROWS !== 270) throw new Error('HHG authority rows must stay 270');
  if (value.brokers.PA_PUC_HHG_BROKER_ROWS !== null) throw new Error('broker roster must stay null / OPEN_SEARCH_ONLY');
  if (value.territory.PA_PUC_SERVICE_TERRITORY_ROWS !== null) throw new Error('territory must stay search-only');
  if (value.federal.EXACT_PA_PUC_TO_USDOT_CROSSWALKS !== 0) throw new Error('no exact PUC→USDOT bridges');
  if (value.federal.EXACT_PA_PUC_TO_MC_CROSSWALKS !== 0) throw new Error('no exact PUC→MC bridges');
  if (value.complaints.PA_PUC_FORMAL_COMPLAINT_ROWS !== null) throw new Error('complaint universe must stay null');
  if (value.enforcement.PA_PUC_ENFORCEMENT_ROWS !== null) throw new Error('enforcement census must stay null');
  if (value.expansion_ledger.GRAPH_WRITES !== 0) throw new Error('no graph writes');
  if (value.claimEligibilityBroadened !== false) throw new Error('claim eligibility unchanged');
  if (value.no_philadelphia_page !== true) throw new Error('no Philadelphia page');
  if (value.publication.rankings || value.publication.trustScore) throw new Error('no ranking or Trust Score');
  if (value.clocks.sourceAsOf !== null) throw new Error('do not invent sourceAsOf from retrieval');
  if (value.local_work_needed_now !== 'NO') throw new Error('local work must stay NO');
  return value;
}
