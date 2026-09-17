import accepted from './accepted-snapshot.json';
import { NC_MOVE_INTEL_VERSION, NC_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type NorthCarolinaMoveSnapshot = typeof accepted;
export const NORTH_CAROLINA_MOVE_SNAPSHOT = accepted as NorthCarolinaMoveSnapshot;

export function fmtInt(value: number | null | undefined): string {
  if (value == null) return 'Unknown';
  return value.toLocaleString('en-US');
}

export function assertNorthCarolinaMoveSnapshot(
  value: NorthCarolinaMoveSnapshot = NORTH_CAROLINA_MOVE_SNAPSHOT,
): NorthCarolinaMoveSnapshot {
  if (value.version !== NC_MOVE_INTEL_VERSION) throw new Error('NC move contract mismatch');
  if (value.fingerprint !== NC_MOVE_PUBLIC_FINGERPRINT) throw new Error('NC-MOVE-001 fingerprint mismatch');
  if (value.current_hhg_roster.NC_NCUC_HHG_LIST_ROWS !== 362) throw new Error('HHG list rows must stay 362');
  if (value.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS !== 362) {
    throw new Error('distinct C-numbers must stay 362');
  }
  if (value.current_hhg_roster.NC_NCUC_DISTINCT_T_NUMBERS !== 357) {
    throw new Error('distinct T-numbers must stay 357');
  }
  if (value.current_hhg_roster.NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL !== 361) {
    throw new Error('announced total must stay 361');
  }
  const announced = Number(value.current_hhg_roster.NC_NCUC_HHG_SOURCE_ANNOUNCED_TOTAL);
  const distinctC = Number(value.current_hhg_roster.NC_NCUC_DISTINCT_C_NUMBERS);
  if (announced === distinctC) {
    throw new Error('announced total must not silently equal parsed C-numbers');
  }
  if (value.current_hhg_roster.NC_NCUC_EXACT_C_TO_T_CROSSWALKS !== 357) {
    throw new Error('exact C↔T crosswalks must stay 357');
  }
  if (value.current_hhg_roster.NC_NCUC_TEMP_SUSPENDED_OBSERVATIONS !== 5) {
    throw new Error('temporarily suspended observations must stay 5');
  }
  if (value.brokers.NC_HHG_BROKER_ROWS !== null) throw new Error('HHG broker roster must stay null');
  if (value.territory.NC_NCUC_SERVICE_TERRITORY_ROWS !== null) throw new Error('territory must stay search-only');
  if (value.insurance.NC_NCUC_CURRENT_INSURANCE_ROWS !== null) {
    throw new Error('current insurance bulk must stay null');
  }
  if (value.federal.EXACT_NC_NCUC_TO_USDOT_CROSSWALKS !== 0) throw new Error('no exact NCUC→USDOT bridges');
  if (value.federal.EXACT_NC_NCUC_TO_MC_CROSSWALKS !== 0) throw new Error('no exact NCUC→MC bridges');
  if (value.complaints.NC_NCUC_HHG_COMPLAINT_ROWS !== null) throw new Error('complaint universe must stay null');
  if (value.enforcement.NC_NCUC_HHG_ENFORCEMENT_ROWS !== null) throw new Error('enforcement census must stay null');
  if (value.dockets.NC_NCUC_DOCKET_ROWS !== null) throw new Error('docket rows must stay null');
  if (value.expansion_ledger.GRAPH_WRITES !== 0) throw new Error('no graph writes');
  if (value.claimEligibilityBroadened !== false) throw new Error('claim eligibility unchanged');
  if (value.no_charlotte_page !== true) throw new Error('no Charlotte page');
  if (value.publication.rankings || value.publication.trustScore) throw new Error('no ranking or Trust Score');
  if (value.local_work_needed_now !== 'NO') throw new Error('local work must stay NO');
  if (value.tariff.NC_NCUC_MRT_VERSION !== 'NCUC HHG NO. 2') throw new Error('tariff version mismatch');
  return value;
}
