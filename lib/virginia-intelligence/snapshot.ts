import accepted from './accepted-snapshot.json';
import { VA_MOVE_INTEL_VERSION, VA_MOVE_PUBLIC_FINGERPRINT } from './publication';

export type VirginiaMoveSnapshot = typeof accepted;
export const VIRGINIA_MOVE_SNAPSHOT = accepted as VirginiaMoveSnapshot;

export function assertVirginiaMoveSnapshot(
  value: VirginiaMoveSnapshot = VIRGINIA_MOVE_SNAPSHOT,
): VirginiaMoveSnapshot {
  if (value.version !== VA_MOVE_INTEL_VERSION) {
    throw new Error(`Unexpected VA move contract ${value.version}`);
  }
  if (value.fingerprint !== VA_MOVE_PUBLIC_FINGERPRINT) {
    throw new Error('VA-MOVE-001 snapshot fingerprint mismatch');
  }
  if (value.authority_classes.HOUSEHOLD_GOODS_CERTIFICATE.legal_authority_document !== 'Certificate') {
    throw new Error('Household Goods legal authority is a certificate');
  }
  if (value.authority_classes.HOUSEHOLD_GOODS_CERTIFICATE.not_a_permit !== true) {
    throw new Error('Do not call the HHG certificate a permit');
  }
  if (value.property_roster.not_added_to_hhg_denominator !== true) {
    throw new Error('Property Carrier listings must not inflate HHG');
  }
  if (value.property_roster.not_called_movers !== true) {
    throw new Error('Property Carriers must not be labeled movers');
  }
  if (value.applications.not_added_to_authorized_roster !== true) {
    throw new Error('Applicants must not inflate authorized roster');
  }
  if (value.clocks.retrievedAt_is_not_sourceAsOf !== true) {
    throw new Error('retrievedAt is not sourceAsOf');
  }
  if (value.federal.name_only !== 'UNSAFE') {
    throw new Error('Name-only state↔FMCSA join is unsafe');
  }
  if (value.publication.rankings || value.publication.trustScore) {
    throw new Error('VA publication must not rank or score');
  }
  if (value.no_virginia_local_routes !== true) {
    throw new Error('Virginia local routes are forbidden');
  }
  if (value.expansion_ledger.NET_NEW_CANONICAL_ORGANIZATIONS !== 0) {
    throw new Error('Do not auto-publish Virginia identities as canonical organizations');
  }
  if (value.property_roster.null_identifier_row_is_not_state_identity !== true) {
    throw new Error('Blank Property authority numbers are not state identities');
  }
  if (value.identity.property_1276_status !== 'SOURCE_IDENTIFIER_CONFLICT') {
    throw new Error('Property 1276 must remain a source-identifier conflict');
  }
  if (value.expansion_ledger.identity_grain !== 'distinct_non_null_authority_number') {
    throw new Error('Identity grain is distinct non-null authority numbers');
  }
  if (value.expansion_ledger.credential_row_grain !== 'authorized_listing_row') {
    throw new Error('Credential grain is authorized listing rows');
  }
  if (value.expansion_ledger.identity_grain === value.expansion_ledger.credential_row_grain) {
    throw new Error('Identity grain must stay distinct from listing-row grain');
  }
  if (value.expansion_ledger.credential_rows_are_not_authority_identities !== true) {
    throw new Error('Credential rows and authority identities are different grains');
  }
  const identityTotal =
    value.hhg_roster.distinct_non_null_authority_numbers +
    value.property_roster.distinct_non_null_authority_numbers;
  const credentialTotal = value.hhg_roster.rows + value.property_roster.rows;
  if (value.expansion_ledger.NEW_VA_STATE_IDENTITIES !== identityTotal) {
    throw new Error('State identities must equal distinct non-null authority numbers');
  }
  if (value.expansion_ledger.NEW_STATE_CREDENTIAL_ROWS !== credentialTotal) {
    throw new Error('Credential rows must equal authorized listing rows');
  }
  if (!value.gate.passed) {
    throw new Error('VA-MOVE-001 publication gate failed');
  }
  return value;
}

export function fmtInt(n: number): string {
  return Number(n).toLocaleString('en-US');
}
