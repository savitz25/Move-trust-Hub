import accepted from './accepted-snapshot.json';

export type GeorgiaMoveSnapshot = typeof accepted;
export const GEORGIA_MOVE_SNAPSHOT = accepted as GeorgiaMoveSnapshot;

export function assertGeorgiaMoveSnapshot(
  value: GeorgiaMoveSnapshot = GEORGIA_MOVE_SNAPSHOT,
): GeorgiaMoveSnapshot {
  if (value.version !== 'move-ga-state-intel-v1') throw new Error('version');
  if (value.fingerprint !== '5619950c36c6cdd7b3f6df516585920c2c7aa245c2a2e82b4f03bc1ec4275e6b') {
    throw new Error('fingerprint');
  }
  if (value.publication.route !== '/georgia') throw new Error('route');
  if (value.current_hhg_roster.GA_DPS_HHG_LISTING_ROWS !== 572) throw new Error('rows');
  if (value.current_hhg_roster.GA_DPS_HHG_DISTINCT_MCA !== 380) throw new Error('mca');
  if (value.current_hhg_roster.GA_DPS_HHG_EXACT_USDOT_JOINS !== 0) throw new Error('joins');
  if (value.tariff.number !== 7 || value.tariff.effective !== '2026-01-13') throw new Error('tariff');
  if (value.complaints.count !== null) throw new Error('complaints');
  if (value.expansion_ledger.GRAPH_WRITES !== 0) throw new Error('graph');
  if (value.no_atlanta_intelligence_page !== true) throw new Error('atlanta');
  return value;
}
