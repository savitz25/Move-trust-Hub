import {
  buildAddressParts,
  deriveUsdotStatus,
  extractEntityType,
  extractPowerUnits,
} from '@/lib/fmcsa/carrier-fields';
import { formatEntityTypeLabel } from '@/lib/fmcsa/entity-type-display';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import type { UsdotStatusLabel } from '@/lib/fmcsa/preview-types';
import type { Company, ServiceType } from '@/types';

type CarrierLike = Record<string, unknown>;

function asCarrierLike(value: unknown): CarrierLike | null {
  return value && typeof value === 'object' ? (value as CarrierLike) : null;
}

function stringOrNull(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  return s.length > 0 ? s : null;
}

export type FmcsaFieldsFromRow = {
  entityType: string | null;
  usdotStatus: UsdotStatusLabel | null;
  powerUnits: number | null;
  services: ServiceType[];
  /** Prefer persisted columns; fall back to fmcsa_raw */
  physicalAddress: string | null;
  phone: string | null;
};

/** Extract physical address + phone from an FMCSA carrier object. */
export function extractContactFromFmcsaRaw(raw: unknown): {
  physicalAddress: string | null;
  phone: string | null;
} {
  const carrier = asCarrierLike(raw);
  if (!carrier) return { physicalAddress: null, phone: null };
  const address = buildAddressParts(carrier);
  // QCMobile census often omits telephone; check nested/common aliases.
  const nested =
    asCarrierLike(carrier.carrier) ??
    asCarrierLike(carrier.content) ??
    asCarrierLike(asCarrierLike(carrier.content)?.carrier);
  const phone =
    stringOrNull(carrier.telephone) ??
    stringOrNull(carrier.phone) ??
    stringOrNull(carrier.phoneNumber) ??
    stringOrNull(carrier.cellPhone) ??
    stringOrNull(carrier.businessPhone) ??
    (nested
      ? stringOrNull(nested.telephone) ??
        stringOrNull(nested.phone) ??
        stringOrNull(nested.phoneNumber)
      : null);
  return {
    physicalAddress: address.combined,
    phone,
  };
}

/** Extract FMCSA directory + compliance fields from a companies table row. */
export function extractFmcsaFieldsFromRow(
  row: Record<string, unknown>,
  existingServices: ServiceType[]
): FmcsaFieldsFromRow {
  const carrier = asCarrierLike(row.fmcsa_raw);
  const persisted =
    typeof row.entity_type === 'string' ? formatEntityTypeLabel(row.entity_type) : null;
  const fromRaw = carrier ? formatEntityTypeLabel(extractEntityType(carrier)) : null;
  const entityType = persisted ?? fromRaw;

  let usdotStatus: UsdotStatusLabel | null = carrier
    ? deriveUsdotStatus(carrier)
    : null;
  if (!usdotStatus && row.out_of_service) {
    usdotStatus = 'OUT OF SERVICE';
  }

  const powerUnits = carrier ? extractPowerUnits(carrier) : null;
  const services = mergeServicesWithEntityType(existingServices, entityType);
  const fromRawContact = extractContactFromFmcsaRaw(row.fmcsa_raw);
  // Prefer legacy google_data column, then verification_sources.google (production path).
  const googlePhone =
    phoneFromGoogleData(row.google_data) ||
    phoneFromGoogleData(
      row.verification_sources && typeof row.verification_sources === 'object'
        ? (row.verification_sources as Record<string, unknown>).google
        : null
    );
  const googleAddress = addressFromGoogleData(
    row.google_data ||
      (row.verification_sources && typeof row.verification_sources === 'object'
        ? (row.verification_sources as Record<string, unknown>).google
        : null)
  );

  return {
    entityType,
    usdotStatus,
    powerUnits,
    services,
    physicalAddress:
      stringOrNull(row.physical_address) ||
      fromRawContact.physicalAddress ||
      googleAddress ||
      stringOrNull(row.headquarters),
    // Prefer column → FMCSA raw → Google Places (verification_sources or google_data)
    phone: stringOrNull(row.phone) || fromRawContact.phone || googlePhone,
  };
}

/** Exported for profile/contact mapping when google lives only under verification_sources. */
export function phoneFromGoogleData(google: unknown): string | null {
  if (!google || typeof google !== 'object') return null;
  const g = google as Record<string, unknown>;
  const direct = stringOrNull(g.phone);
  if (direct) return direct;
  const raw = g.raw_response;
  if (raw && typeof raw === 'object') {
    const r = raw as Record<string, unknown>;
    return (
      stringOrNull(r.nationalPhoneNumber) ||
      stringOrNull(r.internationalPhoneNumber) ||
      stringOrNull(r.formattedPhoneNumber) ||
      stringOrNull(r.phone)
    );
  }
  return null;
}

function addressFromGoogleData(google: unknown): string | null {
  if (!google || typeof google !== 'object') return null;
  return stringOrNull((google as Record<string, unknown>).formatted_address);
}