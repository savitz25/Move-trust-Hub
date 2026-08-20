import { normalizeUsdot } from '@/lib/federal-hhg/normalize';

export const WAVE_ID = 'FEDERAL_HHG_2026_08_WAVE_1';
export const WAVE_2_ID = 'FEDERAL_HHG_2026_08_WAVE_2_CANDIDATE';
export const WAVE_2_PUBLICATION_ID = 'FEDERAL_HHG_2026_08_WAVE_2';
export const WAVE_3_ID = 'FEDERAL_HHG_2026_08_WAVE_3_CANDIDATE';

export const US_STATES_AND_DC = new Set([
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
]);

export type StagedPublicationRow = {
  usdot: string;
  mc: string | null;
  legal_name: string | null;
  dba_name: string | null;
  phy_city: string | null;
  phy_state: string | null;
  phone: string | null;
  classification: string;
  disposition: string;
  hhg_carrier_verified: boolean;
  hhg_broker_verified: boolean;
  retrieved_at?: string | Date | null;
};

export type EligibilityResult = {
  eligible: boolean;
  reason: string;
};

export function isWave1Eligible(row: StagedPublicationRow): EligibilityResult {
  if (row.disposition !== 'NEW_CANONICAL_CANDIDATE') {
    return { eligible: false, reason: 'disposition_not_new_canonical' };
  }
  if (
    row.classification !== 'HHG_CARRIER' &&
    row.classification !== 'HHG_BROKER' &&
    row.classification !== 'HHG_CARRIER_BROKER'
  ) {
    return { eligible: false, reason: 'classification_not_active_hhg' };
  }
  if (row.classification === 'HHG_CARRIER' && !row.hhg_carrier_verified) {
    return { eligible: false, reason: 'carrier_not_verified' };
  }
  if (row.classification === 'HHG_BROKER' && !row.hhg_broker_verified) {
    return { eligible: false, reason: 'broker_not_verified' };
  }
  if (
    row.classification === 'HHG_CARRIER_BROKER' &&
    (!row.hhg_carrier_verified || !row.hhg_broker_verified)
  ) {
    return { eligible: false, reason: 'dual_not_fully_verified' };
  }
  const usdot = normalizeUsdot(row.usdot);
  if (!usdot) return { eligible: false, reason: 'missing_usdot' };
  if (!row.legal_name?.trim()) return { eligible: false, reason: 'missing_legal_name' };
  if (!row.phy_city?.trim()) return { eligible: false, reason: 'missing_city' };
  const state = (row.phy_state ?? '').trim().toUpperCase();
  if (!US_STATES_AND_DC.has(state)) {
    return { eligible: false, reason: 'geography_not_us_or_dc' };
  }
  return { eligible: true, reason: 'ok' };
}

export function publicDisplayName(row: StagedPublicationRow): string {
  const dba = row.dba_name?.trim() ?? '';
  const legal = row.legal_name?.trim() ?? '';
  if (dba.length >= 3 && dba.toUpperCase() !== legal.toUpperCase()) return dba;
  return legal;
}

export function waveCompanyId(usdot: string): string {
  return `usdot-${normalizeUsdot(usdot)}`;
}

export function waveSlug(displayName: string, usdot: string, taken: Set<string>): string {
  const base =
    displayName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72) || `usdot-${normalizeUsdot(usdot)}`;
  if (!taken.has(base)) return base;
  return `${base}-usdot-${normalizeUsdot(usdot)}`.slice(0, 96);
}

export function entityTypeForClassification(classification: string): string {
  if (classification === 'HHG_BROKER') return 'Broker';
  if (classification === 'HHG_CARRIER_BROKER') return 'Carrier/Broker';
  return 'Carrier';
}

export function servicesForClassification(classification: string): string[] {
  if (classification === 'HHG_BROKER') return ['Broker'];
  if (classification === 'HHG_CARRIER_BROKER') return ['Carrier', 'Broker'];
  return ['Carrier'];
}

export function capabilitiesForClassification(
  classification: string
): Array<'hhg_interstate_carrier' | 'hhg_broker'> {
  if (classification === 'HHG_BROKER') return ['hhg_broker'];
  if (classification === 'HHG_CARRIER_BROKER') return ['hhg_interstate_carrier', 'hhg_broker'];
  return ['hhg_interstate_carrier'];
}
