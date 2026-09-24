import accepted from './accepted-snapshot.json';

export type MassachusettsMoveSnapshot = typeof accepted;
export const MASSACHUSETTS_MOVE_SNAPSHOT = accepted as MassachusettsMoveSnapshot;

export function assertMassachusettsMoveSnapshot(
  value: MassachusettsMoveSnapshot = MASSACHUSETTS_MOVE_SNAPSHOT,
): MassachusettsMoveSnapshot {
  if (value.version !== 'move-ma-state-intel-v1') throw new Error('version');
  if (value.fingerprint !== '4d716b593ec05ba56cdf69c87a33d307aa941ead0bf3967074b8dacc1a7d92ff') {
    throw new Error('fingerprint');
  }
  if (value.publication.route !== '/massachusetts') throw new Error('route');
  const roster = value.current_hhg_roster;
  if (roster.MA_DPU_HHG_LISTING_ROWS !== 309) throw new Error('rows');
  if (roster.MA_DPU_HHG_DISTINCT_CERTIFICATES !== 308) throw new Error('certificates');
  if (roster.MA_DPU_HHG_ROWS_MISSING_CERTIFICATE !== 1) throw new Error('missing certificate');
  if (roster.MA_DPU_HHG_DUPLICATE_CERTIFICATES !== 0) throw new Error('duplicate certificates');
  if (roster.MA_DPU_HHG_EXACT_USDOT_JOINS !== 0 || roster.MA_DPU_HHG_EXACT_MC_JOINS !== 0) throw new Error('joins');
  if (value.tariff.MA_DPU_TARIFF_POSTED_ROWS + value.tariff.MA_DPU_TARIFF_PENDING_ROWS !== roster.MA_DPU_HHG_LISTING_ROWS) {
    throw new Error('tariff rows');
  }
  if (value.tariff.not_a_quote !== true || value.tariff.rate_sheets_parsed !== false) throw new Error('tariff semantics');
  if (value.clocks.sourceAsOf !== '2026-06-16') throw new Error('source clock');
  if (value.clocks.tariffs.effectiveDates !== 'NOT_ACQUIRED_AT_LIST_GRAIN') throw new Error('tariff clock');
  if (value.complaints.count !== null || value.complaints.coverage !== 'NOT_ACQUIRED') throw new Error('complaints');
  if (value.expansion_ledger.GRAPH_WRITES !== 0 || value.expansion_ledger.PROFILE_ATTACHMENTS !== 0) throw new Error('graph');
  if (value.no_boston_intelligence_page !== true) throw new Error('boston');
  return value;
}
