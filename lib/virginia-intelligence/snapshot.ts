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
  if (!value.gate.passed) {
    throw new Error('VA-MOVE-001 publication gate failed');
  }
  return value;
}

export function fmtInt(n: number): string {
  return Number(n).toLocaleString('en-US');
}
