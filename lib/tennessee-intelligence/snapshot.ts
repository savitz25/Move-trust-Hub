import accepted from './accepted-snapshot.json';

export type TennesseeMoveSnapshot = typeof accepted;
export const TENNESSEE_MOVE_SNAPSHOT = accepted as TennesseeMoveSnapshot;

export function assertTennesseeMoveSnapshot(
  value: TennesseeMoveSnapshot = TENNESSEE_MOVE_SNAPSHOT,
): TennesseeMoveSnapshot {
  if (value.version !== 'move-tn-state-intel-v1') throw new Error('version');
  if (value.fingerprint !== 'aa892cceecbc7ad96f9e9df43f9f941e5e9df24f6622ff23bc1fb66751d63b69') {
    throw new Error('fingerprint');
  }
  if (value.publication.route !== '/tennessee') throw new Error('route');
  const roster = value.current_hhg_roster;
  if (roster.coverage !== 'NOT_ACQUIRED' || roster.TN_INTRASTATE_AUTHORITY_BULK !== 'NOT_ACQUIRED') throw new Error('roster coverage');
  if (roster.TN_INTRASTATE_AUTHORITY_ROWS !== null || roster.TN_INTRASTATE_AUTHORITY_DISTINCT_IDS !== null || roster.TN_HHG_AUTHORITY_ROWS !== null) {
    throw new Error('no fake population');
  }
  if (roster.TN_EXACT_USDOT_JOINS !== 0 || roster.TN_EXACT_MC_JOINS !== 0) throw new Error('joins');
  if (!roster.tennessee_address_is_not_state_authority || !roster.missing_is_not_zero) throw new Error('roster semantics');
  if (!value.authority_model.form_h_household_goods) throw new Error('Form H');
  if (value.rules.effective !== '2026-03-09' || value.rules.household_goods_rule_status !== 'REPEALED_EFFECTIVE_2026_03_09') throw new Error('rule clock');
  if (!value.rules.repealed_rules_are_not_current_protections) throw new Error('repealed rules are history');
  if (Object.values(value.rules.current_text_keyword_counts).some((n) => n !== 0)) throw new Error('current rule text');
  if (value.tariff.TN_TARIFF_INDEX !== 'NOT_ACQUIRED' || value.tariff.not_a_quote !== true || value.tariff.rate_sheets_parsed !== false) {
    throw new Error('tariff semantics');
  }
  if (value.clocks.sourceAsOf !== null || !value.clocks.do_not_use_retrieval_as_authority_effective_date) throw new Error('clocks');
  if (value.complaints.count !== null || value.complaints.intake !== 'KNOWN' || value.complaints.outcomes !== 'REQUEST_ONLY') throw new Error('complaints');
  if (!value.identity.tn_intrastate_authority_is_not_usdot || !value.identity.tn_intrastate_authority_is_not_mc) throw new Error('identity');
  if (value.identity.name_only_join !== 'UNSAFE') throw new Error('name-only');
  if (value.capabilities.combined_state_fmcsa_mover_count !== 'UNSUPPORTED') throw new Error('no combined count');
  if (value.expansion_ledger.GRAPH_WRITES !== 0 || value.expansion_ledger.PROFILE_ATTACHMENTS !== 0) throw new Error('graph');
  if (value.no_nashville_intelligence_page !== true || value.no_tennessee_local_routes !== true) throw new Error('local');
  return value;
}
