/**
 * NewJerseyPmwAdapter — NJ DCA Public Movers & Warehousemen.
 *
 * Official classes (FAQ): PM move-only, PW warehouse-only, PC combined.
 * Current roster is SOURCE_AVAILABLE_BY_REQUEST (not in MyLicense bulk).
 * Verification: RGB Custom Portal OPEN_SEARCH_ONLY. Do not scrape.
 * NJ intrastate authority is not FMCSA interstate authority.
 * Google Places requests: 0.
 */
import type {
  NormalizedStateMoverRecord,
  ProviderStateAuthorityRecord,
  StateAdapterSourceMetadata,
  StateAuthorityStatus,
  StateMoverAdapter,
} from '@/lib/state-hhg/types';
import { hashEvidence, normalizeLegalName } from '@/lib/state-hhg/normalize';

export const NJ_PMW_FAQ_URL = 'https://www.njconsumeraffairs.gov/pmw/Pages/FAQ.aspx';
export const NJ_PMW_HOME_URL = 'https://www.njconsumeraffairs.gov/pmw';
export const NJ_RGB_PUBLIC_VIEW_URL = 'https://rgbportal.dca.njoag.gov/public-view/';
export const NJ_MYLICENSE_BULK_URL = 'https://newjersey.mylicense.com/Verification_Bulk/';

export const NJ_PMW_LICENSE_CLASSES = {
  PM: {
    raw: 'PM',
    label: 'public mover / move-only',
    authorityType: 'intrastate_public_mover' as const,
    roleClass: 'mover' as const,
    consumerMoverSearch: true,
  },
  PW: {
    raw: 'PW',
    label: 'public warehouseman / warehouse-only',
    authorityType: 'intrastate_public_warehouseman' as const,
    roleClass: 'warehouse' as const,
    consumerMoverSearch: false,
  },
  PC: {
    raw: 'PC',
    label: 'combined public mover and warehouseman',
    authorityType: 'intrastate_public_mover_and_warehouseman' as const,
    roleClass: 'mover' as const,
    consumerMoverSearch: true,
  },
} as const;

export type NjPmwClass = keyof typeof NJ_PMW_LICENSE_CLASSES;

export function pwOnlyAppearsInConsumerMoverSearch(): false {
  return false;
}

export function njLicenseImpliesFmcsaInterstate(): false {
  return false;
}

export function fmcsaActiveImpliesNjLicensed(): false {
  return false;
}

export function mapNjPmwClass(raw: string | null | undefined): (typeof NJ_PMW_LICENSE_CLASSES)[NjPmwClass] | null {
  const token = String(raw ?? '')
    .trim()
    .toUpperCase();
  if (token === 'PM' || token === 'PW' || token === 'PC') return NJ_PMW_LICENSE_CLASSES[token];
  return null;
}

export class NewJerseyPmwAdapter implements StateMoverAdapter {
  readonly stateCode = 'NJ';
  private readonly retrievedAt: string;

  constructor(retrievedAt = new Date().toISOString()) {
    this.retrievedAt = retrievedAt;
  }

  getSourceMetadata(): StateAdapterSourceMetadata {
    return {
      stateCode: 'NJ',
      regulator: 'New Jersey Division of Consumer Affairs — Public Movers and Warehousemen',
      sourceName: 'NJ_DCA_PMW',
      sourceUrl: NJ_RGB_PUBLIC_VIEW_URL,
      retrievedAt: this.retrievedAt,
      accessTier: 'D',
      googlePlacesRequests: 0,
    };
  }

  async fetchOrLoadRegistry(): Promise<readonly Record<string, unknown>[]> {
    return [];
  }

  normalizeRecord(raw: Record<string, unknown>): NormalizedStateMoverRecord {
    const licenseClass = mapNjPmwClass(String(raw.licenseClass ?? ''));
    return {
      stateCode: 'NJ',
      authorityNumber: raw.licenseNumber ? String(raw.licenseNumber) : null,
      legalName: normalizeLegalName(String(raw.legalName ?? '')) || String(raw.legalName ?? ''),
      dba: raw.dba ? String(raw.dba) : null,
      status: (raw.status as StateAuthorityStatus) || 'unknown',
      issueDate: raw.issueDate ? String(raw.issueDate) : null,
      expirationDate: raw.expirationDate ? String(raw.expirationDate) : null,
      physicalAddress: raw.physicalAddress ? String(raw.physicalAddress) : null,
      mailingAddress: raw.mailingAddress ? String(raw.mailingAddress) : null,
      city: raw.city ? String(raw.city) : null,
      postalCode: raw.postalCode ? String(raw.postalCode) : null,
      phone: raw.phone ? String(raw.phone) : null,
      email: raw.email ? String(raw.email) : null,
      website: raw.website ? String(raw.website) : null,
      usdot: raw.usdot ? String(raw.usdot) : null,
      raw: { ...raw, njPmwClass: licenseClass?.raw ?? null, consumerMoverSearch: licenseClass?.consumerMoverSearch ?? false },
    };
  }

  resolveAuthority(record: NormalizedStateMoverRecord): ProviderStateAuthorityRecord {
    const mapped = mapNjPmwClass(String(record.raw.njPmwClass ?? ''));
    return {
      providerId: '',
      stateCode: 'NJ',
      authorityType: (mapped?.authorityType as ProviderStateAuthorityRecord['authorityType']) || 'other',
      authorityNumber: record.authorityNumber,
      status: record.status,
      issueDate: record.issueDate,
      expirationDate: record.expirationDate,
      legalName: record.legalName,
      dba: record.dba,
      regulator: 'NJ_DCA_PMW',
      source: 'NJ_DCA_PMW',
      sourceUrl: NJ_RGB_PUBLIC_VIEW_URL,
      retrievedAt: this.retrievedAt,
      evidenceHash: hashEvidence(record),
      verificationState: 'UNRESOLVED',
    };
  }

  resolveBrokerRole(): boolean {
    return false;
  }

  resolveStatus(record: NormalizedStateMoverRecord): StateAuthorityStatus {
    return record.status;
  }

  resolveIdentityEvidence(record: NormalizedStateMoverRecord) {
    return { legalName: record.legalName, dba: record.dba, usdot: record.usdot };
  }

  resolveContactEvidence(record: NormalizedStateMoverRecord) {
    return { phone: record.phone, email: record.email, website: record.website };
  }
}
