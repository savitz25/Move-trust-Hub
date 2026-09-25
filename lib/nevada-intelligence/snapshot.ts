import accepted from './accepted-snapshot.json';
import { NV_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type NevadaMoveSnapshot = typeof accepted;
export const NEVADA_MOVE_SNAPSHOT = accepted as NevadaMoveSnapshot;

export function assertNevadaMoveSnapshot(value: NevadaMoveSnapshot = NEVADA_MOVE_SNAPSHOT): NevadaMoveSnapshot {
  if (value.version !== 'move-nv-state-intel-v1') throw new Error('version');
  if (value.fingerprint !== NV_MOVE_PUBLIC_FINGERPRINT) throw new Error('fingerprint');
  if (value.publication.route !== '/nevada') throw new Error('route');
  const roster = value.current_hhg_roster;
  if (roster.NV_NTA_HHG_ROWS !== 46 || roster.NV_NTA_HHG_DISTINCT_CPCN !== 46) throw new Error('hhg rows');
  if (roster.NV_NTA_ACTIVE_MOVER_CERTIFICATES !== 41) throw new Error('active movers');
  if (roster.NV_NTA_ACTIVE_MOVER_CERTIFICATES + roster.NV_NTA_HHG_DOCUMENT_EVIDENCE_NOT_ON_ACTIVE_LIST !== roster.NV_NTA_HHG_ROWS) {
    throw new Error('hhg evidence partition');
  }
  if (roster.NV_NTA_HHG_EXACT_USDOT_JOINS !== 0 || roster.NV_NTA_HHG_EXACT_MC_JOINS !== 0) throw new Error('joins');
  if (value.directory.NV_NTA_DIRECTORY_ROWS === roster.NV_NTA_HHG_ROWS) throw new Error('directory is not movers');
  if (value.tariff.not_a_quote !== true || value.tariff.rate_sheets_parsed !== false) throw new Error('tariff semantics');
  if (value.clocks.tariffs.effectiveDates !== 'NOT_ACQUIRED') throw new Error('tariff clock');
  if (value.clocks.sourceAsOf !== null) throw new Error('source clock is not invented');
  if (value.applications.application_is_not_a_cpcn !== true) throw new Error('applications');
  if (value.complaints.count !== null || value.complaints.intake !== 'KNOWN') throw new Error('complaints');
  if (value.capabilities.combined_nta_fmcsa_mover_count !== 'UNSUPPORTED') throw new Error('combined count');
  if (value.capabilities.name_only_nta_fmcsa_join !== 'UNSUPPORTED') throw new Error('name joins');
  if (value.expansion_ledger.GRAPH_WRITES !== 0 || value.expansion_ledger.PROFILE_ATTACHMENTS !== 0) throw new Error('graph');
  if (value.no_las_vegas_intelligence_page !== true || value.no_nevada_local_routes !== true) throw new Error('local');
  return value;
}
