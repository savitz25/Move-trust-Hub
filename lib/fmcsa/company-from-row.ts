import {
  deriveUsdotStatus,
  extractEntityType,
  extractPowerUnits,
} from '@/lib/fmcsa/carrier-fields';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import type { UsdotStatusLabel } from '@/lib/fmcsa/preview-types';
import type { Company, ServiceType } from '@/types';

type CarrierLike = Record<string, unknown>;

function asCarrierLike(value: unknown): CarrierLike | null {
  return value && typeof value === 'object' ? (value as CarrierLike) : null;
}

export type FmcsaFieldsFromRow = {
  entityType: string | null;
  usdotStatus: UsdotStatusLabel | null;
  powerUnits: number | null;
  services: ServiceType[];
};

/** Extract FMCSA directory + compliance fields from a companies table row. */
export function extractFmcsaFieldsFromRow(
  row: Record<string, unknown>,
  existingServices: ServiceType[]
): FmcsaFieldsFromRow {
  const carrier = asCarrierLike(row.fmcsa_raw);
  const entityType = carrier ? extractEntityType(carrier) : null;

  let usdotStatus: UsdotStatusLabel | null = carrier
    ? deriveUsdotStatus(carrier)
    : null;
  if (!usdotStatus && row.out_of_service) {
    usdotStatus = 'OUT OF SERVICE';
  }

  const powerUnits = carrier ? extractPowerUnits(carrier) : null;
  const services = mergeServicesWithEntityType(existingServices, entityType);

  return { entityType, usdotStatus, powerUnits, services };
}