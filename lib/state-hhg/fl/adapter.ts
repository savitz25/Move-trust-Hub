/**
 * FloridaStateMoverAdapter — FDACS official license lookup.
 *
 * Primary bulk source (011B): FDACS legacy Business License Lookup HTML-XLS export
 *   https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx
 *   Programs: IM-Intrastate Mover, MB-Moving Broker
 *
 * Supplemental: new PowerApps portal CSV (partial during 2026 migration)
 *   https://cslicense.powerappsportals.us/Business-Search/
 *
 * Google Places requests: 0.
 */
import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import type {
  NormalizedStateMoverRecord,
  ProviderStateAuthorityRecord,
  StateAdapterSourceMetadata,
  StateAuthorityStatus,
  StateAuthorityType,
  StateMoverAdapter,
} from '@/lib/state-hhg/types';
import {
  hashEvidence,
  normalizeEmail,
  normalizeLegalName,
  normalizePhone,
  normalizeUsdot,
  parseCityStateZipFromLocation,
  parseFdacsDate,
} from '@/lib/state-hhg/normalize';
import {
  loadFdacsLegacyXls,
  parseFdacsLegacyDate,
  type FdacsLegacyRow,
} from '@/lib/state-hhg/fl/legacy-xls';

export const FDACS_MOVER_LICENSE_TYPE_ID = '59947e55-f1d9-f011-8544-001dd806cf6f';
export const FDACS_BROKER_LICENSE_TYPE_ID = '3be3e408-f2d9-f011-8544-001dd806cf6f';
export const FDACS_LEGACY_LOOKUP_URL =
  'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx';
export const FDACS_LOOKUP_URL =
  'https://cslicense.powerappsportals.us/Business-Search/';
export const FDACS_MOVING_COMPANIES_URL =
  'https://www.fdacs.gov/Business-Services/Moving-Companies';

export type FdacsCsvRow = {
  businessName: string;
  location: string;
  phone: string;
  email: string;
  licenseNumber: string;
  licenseType: string;
  status: string;
  issueDate: string;
  expireDate: string;
  dbaOtherNames: string;
  contractedMovers: string;
};

function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(cell);
      cell = '';
    } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      if (ch === '\r') i++;
    } else if (ch === '\r') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += ch;
    }
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => c.trim().length));
}

export function parseFdacsCsv(content: string): FdacsCsvRow[] {
  const rows = parseCsv(content);
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name.toLowerCase());
  const iName = idx('Business Name');
  const iLoc = idx('Location');
  const iPhone = idx('Phone');
  const iEmail = idx('Email');
  const iLic = idx('License Number');
  const iType = idx('License Type');
  const iStatus = idx('Status');
  const iIssue = idx('Issue Date');
  const iExp = idx('Expire Date');
  const iDba = idx('DBA/Other Names');
  const iContracted = idx('Contracted Movers');
  return rows.slice(1).map((r) => ({
    businessName: (r[iName] ?? '').trim(),
    location: (r[iLoc] ?? '').trim(),
    phone: (r[iPhone] ?? '').trim(),
    email: (r[iEmail] ?? '').trim(),
    licenseNumber: (r[iLic] ?? '').trim(),
    licenseType: (r[iType] ?? '').trim(),
    status: (r[iStatus] ?? '').trim(),
    issueDate: (r[iIssue] ?? '').trim(),
    expireDate: (r[iExp] ?? '').trim(),
    dbaOtherNames: (r[iDba] ?? '').trim(),
    contractedMovers: (r[iContracted] ?? '').trim(),
  }));
}

export function mapFdacsStatus(statusRaw: string): StateAuthorityStatus {
  const s = statusRaw.trim().toLowerCase();
  if (s === 'registered' || s === 'active' || s === 'current') return 'active';
  if (s === 'expired') return 'expired';
  if (s === 'suspended') return 'suspended';
  if (s === 'revoked' || s === 'cancelled' || s === 'canceled') return 'revoked';
  if (s === 'inactive') return 'inactive';
  return 'unknown';
}

export function mapFdacsAuthorityType(licenseType: string): StateAuthorityType {
  const t = licenseType.trim().toLowerCase();
  if (t.includes('broker')) return 'intrastate_hhg_broker';
  if (t.includes('intrastate') || t.includes('mover')) {
    return 'intrastate_mover_registration';
  }
  return 'other';
}

export function isFdacsBroker(licenseType: string): boolean {
  return /broker/i.test(licenseType);
}

export function fdacsRawSourceKey(licenseType: string, licenseNumber: string): string {
  const lic = licenseNumber.trim().toUpperCase();
  const type = licenseType.trim().toUpperCase().replace(/\s+/g, '_');
  return `FDACS:${type}:${lic}`;
}

function legacyToRaw(row: FdacsLegacyRow, sourcePath: string, retrievedAt: string) {
  return {
    businessName: row.name,
    location: row.address,
    phone: row.phone,
    email: row.email,
    licenseNumber: row.licenseNumber,
    licenseType: row.licenseType,
    status: row.licenseStatus,
    issueDate: row.issuedDate,
    expireDate: row.expiredDate,
    dbaOtherNames: row.dbaOtherName,
    contractedMovers: '',
    cityRaw: row.city,
    stateRaw: row.state,
    _sourcePath: sourcePath,
    _sourceKind: 'fdacs_legacy_xls',
    _rawSourceKey: fdacsRawSourceKey(row.licenseType, row.licenseNumber),
    _retrievedAt: retrievedAt,
  };
}

export class FloridaStateMoverAdapter implements StateMoverAdapter {
  readonly stateCode = 'FL';
  private readonly retrievedAt: string;
  private readonly legacyXlsPaths: string[];
  private readonly csvPaths: string[];

  constructor(options?: {
    legacyXlsPaths?: string[];
    csvPaths?: string[];
    retrievedAt?: string;
  }) {
    this.retrievedAt = options?.retrievedAt ?? new Date().toISOString();
    this.legacyXlsPaths = options?.legacyXlsPaths ?? [
      resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-im-active.xls'),
      resolve(process.cwd(), 'data/state-hhg/fl/fdacs-legacy-mb-active.xls'),
    ];
    this.csvPaths = options?.csvPaths ?? [
      resolve(process.cwd(), 'data/state-hhg/fl/fdacs-intrastate-movers-newdb.csv'),
      resolve(process.cwd(), 'data/state-hhg/fl/fdacs-moving-brokers-newdb.csv'),
    ];
  }

  getSourceMetadata(): StateAdapterSourceMetadata {
    return {
      stateCode: 'FL',
      regulator: 'Florida Department of Agriculture and Consumer Services (FDACS)',
      sourceName:
        'FDACS legacy Business License Lookup HTML-XLS export (IM + MB); supplemental new portal CSV',
      sourceUrl: FDACS_LEGACY_LOOKUP_URL,
      retrievedAt: this.retrievedAt,
      accessTier: 'A',
      googlePlacesRequests: 0,
    };
  }

  async fetchOrLoadRegistry(): Promise<readonly Record<string, unknown>[]> {
    const byKey = new Map<string, Record<string, unknown>>();

    for (const path of this.legacyXlsPaths) {
      if (!existsSync(path)) continue;
      for (const row of loadFdacsLegacyXls(path)) {
        const raw = legacyToRaw(row, path, this.retrievedAt);
        byKey.set(String(raw._rawSourceKey), raw);
      }
    }

    // Supplemental new-portal rows fill gaps / fresher issue dates when present.
    for (const path of this.csvPaths) {
      if (!existsSync(path)) continue;
      const content = readFileSync(path, 'utf8');
      for (const row of parseFdacsCsv(content)) {
        if (!row.licenseNumber || !row.businessName) continue;
        const key = fdacsRawSourceKey(row.licenseType, row.licenseNumber);
        if (byKey.has(key)) continue;
        byKey.set(key, {
          ...row,
          _sourcePath: path,
          _sourceKind: 'fdacs_new_portal_csv',
          _rawSourceKey: key,
          _retrievedAt: this.retrievedAt,
        });
      }
    }

    return [...byKey.values()];
  }

  normalizeRecord(raw: Record<string, unknown>): NormalizedStateMoverRecord {
    const row = raw as unknown as FdacsCsvRow & {
      _rawSourceKey?: string;
      cityRaw?: string;
    };
    const loc = parseCityStateZipFromLocation(row.location);
    const status = mapFdacsStatus(row.status);
    const issueDate =
      parseFdacsLegacyDate(row.issueDate) ?? parseFdacsDate(row.issueDate);
    const expirationDate =
      parseFdacsLegacyDate(row.expireDate) ?? parseFdacsDate(row.expireDate);
    return {
      stateCode: 'FL',
      authorityNumber: row.licenseNumber || null,
      legalName: row.businessName,
      dba: row.dbaOtherNames || null,
      status,
      issueDate,
      expirationDate,
      physicalAddress: loc.addressLine ?? row.location ?? null,
      mailingAddress: null,
      city: loc.city ?? row.cityRaw ?? null,
      postalCode: loc.postalCode,
      phone: row.phone || null,
      email: row.email || null,
      website: null,
      usdot: null,
      raw: {
        ...raw,
        licenseType: row.licenseType,
        statusRaw: row.status,
        contractedMovers: row.contractedMovers,
        legalNameNorm: normalizeLegalName(row.businessName),
        dbaNorm: normalizeLegalName(row.dbaOtherNames),
        phoneNorm: normalizePhone(row.phone),
        emailNorm: normalizeEmail(row.email),
        usdotNorm: normalizeUsdot(null),
        roleClass: isFdacsBroker(row.licenseType) ? 'broker' : 'mover',
        authorityType: mapFdacsAuthorityType(row.licenseType),
        rawSourceKey:
          row._rawSourceKey ?? fdacsRawSourceKey(row.licenseType, row.licenseNumber),
      },
    };
  }

  resolveAuthority(record: NormalizedStateMoverRecord): ProviderStateAuthorityRecord {
    const authorityType =
      (record.raw.authorityType as StateAuthorityType) ?? 'intrastate_mover_registration';
    return {
      providerId: '',
      stateCode: 'FL',
      authorityType,
      authorityNumber: record.authorityNumber,
      status: record.status,
      issueDate: record.issueDate,
      expirationDate: record.expirationDate,
      legalName: record.legalName,
      dba: record.dba,
      regulator: 'FDACS',
      source: String(record.raw._sourceKind ?? 'fdacs_legacy_xls'),
      sourceUrl: FDACS_LEGACY_LOOKUP_URL,
      retrievedAt: this.retrievedAt,
      evidenceHash: hashEvidence({
        state: 'FL',
        authorityNumber: record.authorityNumber,
        legalName: record.legalName,
        status: record.status,
        expirationDate: record.expirationDate,
      }),
      verificationState: 'UNRESOLVED',
    };
  }

  resolveBrokerRole(record: NormalizedStateMoverRecord): boolean {
    return record.raw.roleClass === 'broker';
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

/** Content checksum for snapshot provenance (not crypto-secret). */
export function snapshotChecksum(content: string): string {
  return createHash('sha256').update(content).digest('hex').slice(0, 16);
}
