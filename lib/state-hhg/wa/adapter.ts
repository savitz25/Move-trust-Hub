/**
 * WashingtonStateMoverAdapter — WA UTC Household Goods Carriers.
 * Official source: https://www.utc.wa.gov/companies?exposed_select_industry=568
 * Google Places requests: 0.
 */
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import type {
  NormalizedStateMoverRecord,
  ProviderStateAuthorityRecord,
  StateAdapterSourceMetadata,
  StateAuthorityStatus,
  StateMoverAdapter,
} from '@/lib/state-hhg/types';
import {
  hashEvidence,
  normalizeEmail,
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
  parseCityStateZipFromLocation,
} from '@/lib/state-hhg/normalize';

export const UTC_HHG_LIST_URL =
  'https://www.utc.wa.gov/companies?combine=&usdot=&exposed_select_industry=568&regulatory_status=1';
export const UTC_COMPANY_URL = (nodeId: string) =>
  `https://www.utc.wa.gov/company/${nodeId}`;

export type UtcHhgRawRecord = {
  companyNodeId: string;
  utcId: string | null;
  legalName: string | null;
  dba: string | null;
  ubi: string | null;
  usdot: string | null;
  industries: string | null;
  status: string | null;
  phone: string | null;
  email: string | null;
  physicalAddress: string | null;
  mailingAddress: string | null;
  permitNumber: string | null;
  permitKind: string | null;
  contactName: string | null;
  contactTitle: string | null;
  sourceUrl: string;
};

export function mapUtcStatus(statusRaw: string | null | undefined): StateAuthorityStatus {
  const s = String(statusRaw ?? '')
    .trim()
    .toLowerCase();
  // Check inactive before active — "inactive".includes("active") is true.
  if (s.includes('inactive')) return 'inactive';
  if (s.includes('suspend')) return 'suspended';
  if (s.includes('revok')) return 'revoked';
  if (s.includes('expir')) return 'expired';
  if (/\bactive\b/.test(s) || s.includes('[active]')) return 'active';
  if (s.includes('active')) return 'active';
  return 'unknown';
}

export function utcRawSourceKey(rec: {
  companyNodeId?: string | null;
  utcId?: string | null;
  permitNumber?: string | null;
}): string {
  const permit = (rec.permitNumber || '').trim().toUpperCase();
  const utcId = (rec.utcId || '').trim();
  const node = (rec.companyNodeId || '').trim();
  if (permit) return `WA_UTC:PERMIT:${permit}`;
  if (utcId) return `WA_UTC:ID:${utcId}`;
  return `WA_UTC:NODE:${node}`;
}

export class WashingtonStateMoverAdapter implements StateMoverAdapter {
  readonly stateCode = 'WA';
  private readonly retrievedAt: string;
  private readonly snapshotPath: string;

  constructor(options?: { snapshotPath?: string; retrievedAt?: string }) {
    this.retrievedAt = options?.retrievedAt ?? new Date().toISOString();
    this.snapshotPath =
      options?.snapshotPath ??
      resolve(process.cwd(), 'data/state-hhg/wa/utc-hhg-active-raw.json');
  }

  getSourceMetadata(): StateAdapterSourceMetadata {
    return {
      stateCode: 'WA',
      regulator: 'Washington Utilities and Transportation Commission (UTC)',
      sourceName: 'UTC Household Goods Carriers company registry (HTML)',
      sourceUrl: UTC_HHG_LIST_URL,
      retrievedAt: this.retrievedAt,
      accessTier: 'A',
      googlePlacesRequests: 0,
    };
  }

  async fetchOrLoadRegistry(): Promise<readonly Record<string, unknown>[]> {
    if (!existsSync(this.snapshotPath)) {
      throw new Error(
        `WA UTC snapshot missing at ${this.snapshotPath}. Run scripts/fetch-wa-utc-registry.ts first.`
      );
    }
    const parsed = JSON.parse(readFileSync(this.snapshotPath, 'utf8')) as {
      records?: UtcHhgRawRecord[];
      retrievedAt?: string;
    };
    const records = parsed.records ?? [];
    return records.map((r) => ({
      ...r,
      _rawSourceKey: utcRawSourceKey(r),
      _retrievedAt: parsed.retrievedAt ?? this.retrievedAt,
      _sourceKind: 'wa_utc_html',
    }));
  }

  normalizeRecord(raw: Record<string, unknown>): NormalizedStateMoverRecord {
    const r = raw as unknown as UtcHhgRawRecord & { _rawSourceKey?: string };
    const loc = parseCityStateZipFromLocation(r.physicalAddress);
    const status = mapUtcStatus(r.status);
    const authorityNumber = r.permitNumber || r.utcId || r.companyNodeId || null;
    return {
      stateCode: 'WA',
      authorityNumber,
      legalName: r.legalName || 'UNKNOWN',
      dba: r.dba || null,
      status,
      issueDate: null,
      expirationDate: null,
      physicalAddress: r.physicalAddress || loc.addressLine,
      mailingAddress: r.mailingAddress || null,
      city: loc.city,
      postalCode: loc.postalCode,
      phone: r.phone || null,
      email: r.email || null,
      website: null,
      usdot: normalizeUsdot(r.usdot),
      raw: {
        ...raw,
        statusRaw: r.status,
        ubi: r.ubi,
        utcId: r.utcId,
        companyNodeId: r.companyNodeId,
        permitNumber: r.permitNumber,
        permitKind: r.permitKind,
        industries: r.industries,
        contactName: r.contactName,
        contactTitle: r.contactTitle,
        legalNameNorm: normalizeLegalName(r.legalName),
        dbaNorm: normalizeLegalName(r.dba),
        phoneNorm: normalizePhone(r.phone),
        emailNorm: normalizeEmail(r.email),
        usdotNorm: normalizeUsdot(r.usdot),
        roleClass: 'mover',
        authorityType: 'intrastate_hhg_carrier',
        rawSourceKey: r._rawSourceKey ?? utcRawSourceKey(r),
      },
    };
  }

  resolveAuthority(record: NormalizedStateMoverRecord): ProviderStateAuthorityRecord {
    return {
      providerId: '',
      stateCode: 'WA',
      authorityType: 'intrastate_hhg_carrier',
      authorityNumber: record.authorityNumber,
      status: record.status,
      issueDate: record.issueDate,
      expirationDate: record.expirationDate,
      legalName: record.legalName,
      dba: record.dba,
      regulator: 'WA UTC',
      source: 'wa_utc_hhg_html',
      sourceUrl: String(record.raw.sourceUrl ?? UTC_HHG_LIST_URL),
      retrievedAt: this.retrievedAt,
      evidenceHash: hashEvidence({
        state: 'WA',
        authorityNumber: record.authorityNumber,
        usdot: record.usdot,
        legalName: record.legalName,
        status: record.status,
      }),
      verificationState: 'UNRESOLVED',
    };
  }

  resolveBrokerRole(_record: NormalizedStateMoverRecord): boolean {
    return false;
  }

  resolveStatus(record: NormalizedStateMoverRecord): StateAuthorityStatus {
    return record.status;
  }

  resolveIdentityEvidence(record: NormalizedStateMoverRecord) {
    return {
      legalName: record.legalName,
      dba: record.dba,
      usdot: record.usdot,
    };
  }

  resolveContactEvidence(record: NormalizedStateMoverRecord) {
    return {
      phone: record.phone,
      email: record.email,
      website: record.website,
    };
  }
}
