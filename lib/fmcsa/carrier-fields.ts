import type { FmcsaEnrichedFields, UsdotStatusLabel } from '@/lib/fmcsa/preview-types';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';

export type { UsdotStatusLabel } from '@/lib/fmcsa/preview-types';

export type FmcsaBuiltPreview = FmcsaEnrichedFields & {
  legalName?: string;
  dbaName?: string;
  physicalAddress?: string;
  phone?: string;
  usdot?: string;
  mcNumber?: string;
  authorityStatus?: string;
  allowedToOperate?: string;
  safetyRating?: string;
  outOfService?: string;
  source: 'fmcsa_api' | 'directory' | 'none';
};

export type FmcsaAddressParts = {
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  combined: string | null;
};

export type FmcsaSupplementalData = {
  cargoCarried: unknown[];
  operationClassification: unknown[];
  authority: unknown[];
  oos: unknown[];
};

type CarrierLike = Record<string, unknown>;

function asRecord(value: unknown): CarrierLike | null {
  return value && typeof value === 'object' ? (value as CarrierLike) : null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function stringOrNull(value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;
  return String(value);
}

function numberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function decodeAuthorityCode(code: string): string {
  const c = code.trim().toUpperCase();
  if (c === 'A' || c === 'ACTIVE') return 'Active';
  if (c === 'I' || c === 'INACTIVE') return 'Inactive';
  if (c === 'N' || c === 'NONE') return 'None';
  return code;
}

export function deriveUsdotStatus(carrier: CarrierLike): UsdotStatusLabel {
  const supplemental = asRecord(carrier._supplemental);
  const oosRows = asArray(supplemental?.oos);
  const hasOosRow = oosRows.some((row) => {
    const oos = asRecord(asRecord(row)?.oos) ?? asRecord(row);
    return Boolean(oos?.oosDate ?? oos?.outOfServiceDate);
  });

  if (carrier.oosDate || carrier.outOfService === 'Y' || hasOosRow) {
    return 'OUT OF SERVICE';
  }

  const allowed = String(carrier.allowedToOperate ?? carrier.allowToOperate ?? '')
    .trim()
    .toUpperCase();
  return allowed === 'Y' ? 'ACTIVE' : 'INACTIVE';
}

export function extractEntityType(carrier: CarrierLike): string | null {
  const census = asRecord(carrier.censusTypeId);
  return (
    stringOrNull(census?.censusTypeDesc) ??
    stringOrNull(census?.censusType) ??
    stringOrNull(carrier.entityType) ??
    null
  );
}

export function buildAddressParts(carrier: CarrierLike): FmcsaAddressParts {
  const street = stringOrNull(carrier.phyStreet);
  const city = stringOrNull(carrier.phyCity);
  const state = stringOrNull(carrier.phyState ?? carrier.phyStateCode);
  const zip = stringOrNull(carrier.phyZipcode ?? carrier.phyZip);
  const combined = [street, city, state, zip].filter(Boolean).join(', ') || null;
  return { street, city, state, zip, combined };
}

export function extractCarrierOperation(carrier: CarrierLike): string | null {
  const op = asRecord(carrier.carrierOperation);
  const fromCarrier = stringOrNull(op?.carrierOperationDesc);

  const supplemental = asRecord(carrier._supplemental);
  const opRows = asArray(supplemental?.operationClassification);
  const fromSupplemental = opRows
    .map((row) => {
      const rec = asRecord(row);
      return (
        stringOrNull(rec?.operationClassDesc) ??
        stringOrNull(asRecord(rec?.id)?.operationClassDesc)
      );
    })
    .filter(Boolean) as string[];

  if (fromCarrier && fromSupplemental.length) {
    const merged = [fromCarrier, ...fromSupplemental.filter((d) => d !== fromCarrier)];
    return merged.join(', ');
  }

  if (fromCarrier) return fromCarrier;
  if (fromSupplemental.length) return fromSupplemental.join(', ');
  return null;
}

export function extractCargoCarried(carrier: CarrierLike): string | null {
  const supplemental = asRecord(carrier._supplemental);
  const rows = asArray(supplemental?.cargoCarried);
  const labels = rows
    .map((row) => {
      const rec = asRecord(row);
      return (
        stringOrNull(rec?.cargoClassDesc) ??
        stringOrNull(asRecord(rec?.id)?.cargoClassDesc)
      );
    })
    .filter(Boolean) as string[];

  if (labels.length) return labels.join(', ');

  const inline = carrier.cargoCarried;
  if (Array.isArray(inline)) {
    const inlineLabels = inline
      .map((row) => stringOrNull(asRecord(row)?.cargoClassDesc))
      .filter(Boolean) as string[];
    if (inlineLabels.length) return inlineLabels.join(', ');
  }

  return null;
}

export function extractMcs150Mileage(carrier: CarrierLike): string | null {
  const candidates = [
    carrier.mcs150Mileage,
    carrier.mcs150mileage,
    carrier.annualMileage,
    carrier.totalMileage,
    carrier.mileage,
  ];

  for (const value of candidates) {
    const n = numberOrNull(value);
    if (n !== null) return n.toLocaleString('en-US');
    const s = stringOrNull(value);
    if (s) return s;
  }

  return null;
}

export function formatAuthorityStatus(carrier: CarrierLike): string | null {
  const parts: string[] = [];
  const common = stringOrNull(carrier.commonAuthorityStatus);
  const contract = stringOrNull(carrier.contractAuthorityStatus);
  const broker = stringOrNull(carrier.brokerAuthorityStatus);

  if (common) parts.push(`Common: ${decodeAuthorityCode(common)}`);
  if (contract) parts.push(`Contract: ${decodeAuthorityCode(contract)}`);
  if (broker) parts.push(`Broker: ${decodeAuthorityCode(broker)}`);

  if (parts.length) return parts.join(' · ');

  const supplemental = asRecord(carrier._supplemental);
  const authorityRows = asArray(supplemental?.authority);
  const authLabels = authorityRows
    .map((row) => {
      const auth = asRecord(asRecord(row)?.carrierAuthority) ?? asRecord(row);
      if (!auth) return null;
      const label = stringOrNull(auth.authority);
      const prefix = stringOrNull(auth.prefix);
      const docket = stringOrNull(auth.docketNumber);
      if (label && docket) return `${prefix ?? ''}${docket}: ${label}`;
      return label;
    })
    .filter(Boolean) as string[];

  return authLabels.length ? authLabels.join(' · ') : null;
}

export function buildDerivedAuthorityStatus(
  snapshot: FmcsaCarrierSnapshot | null,
  carrier: CarrierLike
): string | null {
  const formatted = formatAuthorityStatus(carrier);
  if (formatted) return formatted;

  if (snapshot) {
    if (snapshot.authorityActive) return 'Active';
    if (snapshot.allowedToOperate) return 'Registered';
    return 'Inactive';
  }

  const allowed = String(carrier.allowedToOperate ?? '').trim().toUpperCase();
  if (allowed === 'Y') return 'Active';
  if (allowed) return allowed;
  return null;
}

export function extractPowerUnits(carrier: CarrierLike): number | null {
  return numberOrNull(carrier.totalPowerUnits ?? carrier.passengerVehicle);
}

export function fmcsaPreviewFromSnapshot(snapshot: FmcsaCarrierSnapshot): FmcsaBuiltPreview {
  const carrier = snapshot.raw;
  const address = buildAddressParts(carrier);

  return {
    legalName: snapshot.legalName,
    dbaName: snapshot.dbaName,
    physicalAddress: address.combined ?? undefined,
    addressStreet: address.street ?? undefined,
    addressCity: address.city ?? undefined,
    addressState: address.state ?? undefined,
    addressZip: address.zip ?? undefined,
    phone: stringOrNull(carrier.telephone) ?? undefined,
    usdot: snapshot.dotNumber?.replace(/\D/g, '') || undefined,
    mcNumber: snapshot.mcNumber,
    entityType: extractEntityType(carrier) ?? undefined,
    usdotStatus: deriveUsdotStatus(carrier),
    powerUnits: extractPowerUnits(carrier) ?? undefined,
    carrierOperation: extractCarrierOperation(carrier) ?? undefined,
    cargoCarried: extractCargoCarried(carrier) ?? undefined,
    mcs150Mileage: extractMcs150Mileage(carrier) ?? undefined,
    authorityStatus: buildDerivedAuthorityStatus(snapshot, carrier) ?? undefined,
    allowedToOperate: snapshot.allowedToOperate ? 'Y' : 'N',
    safetyRating: snapshot.safetyRating,
    outOfService: snapshot.outOfService ? 'Yes' : undefined,
    source: 'fmcsa_api',
  };
}

export function fmcsaPreviewToSuggestionPreview(
  preview: FmcsaBuiltPreview,
  displayNumber: string,
  usdot: string | null,
  mcNumber: string | null
): FmcsaSuggestionPreview {
  return {
    displayNumber,
    usdot,
    mcNumber,
    legalName: preview.legalName ?? null,
    dbaName: preview.dbaName ?? null,
    headquarters: preview.physicalAddress ?? null,
    addressStreet: preview.addressStreet ?? null,
    addressCity: preview.addressCity ?? null,
    addressState: preview.addressState ?? null,
    addressZip: preview.addressZip ?? null,
    phone: preview.phone ?? null,
    entityType: preview.entityType ?? null,
    usdotStatus: preview.usdotStatus ?? null,
    powerUnits: preview.powerUnits ?? null,
    carrierOperation: preview.carrierOperation ?? null,
    cargoCarried: preview.cargoCarried ?? null,
    mcs150Mileage: preview.mcs150Mileage ?? null,
    authorityStatus: preview.authorityStatus ?? null,
    safetyRating: preview.safetyRating ?? null,
    allowedToOperate: preview.allowedToOperate ?? null,
  };
}

export function formatCargoCarriedList(rows: unknown[]): string | null {
  const labels = rows
    .map((row) => stringOrNull(asRecord(row)?.cargoClassDesc))
    .filter(Boolean) as string[];
  return labels.length ? labels.join(', ') : null;
}

export function formatOperationClassificationList(rows: unknown[]): string | null {
  const labels = rows
    .map((row) => stringOrNull(asRecord(row)?.operationClassDesc))
    .filter(Boolean) as string[];
  return labels.length ? labels.join(', ') : null;
}