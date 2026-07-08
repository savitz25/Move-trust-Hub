import {
  deriveUsdotStatus,
  extractEntityType,
  extractPowerUnits,
  formatAuthorityStatus,
} from '@/lib/fmcsa/carrier-fields';
import type { CompanyRefreshRow, FieldChange } from '@/lib/fmcsa/refresh/types';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';

export type FmcsaDisplayFields = {
  entityType: string | null;
  usdotStatus: string | null;
  powerUnits: string | null;
  mcNumber: string | null;
  authorityStatus: string | null;
  safetyRating: string | null;
  complaintsLast12m: string | null;
};

function asCarrier(raw: unknown): Record<string, unknown> | null {
  return raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : null;
}

function formatMc(value: string | null | undefined): string | null {
  if (!value) return null;
  const digits = value.replace(/\D/g, '');
  return digits ? digits : null;
}

export function extractDisplayFieldsFromRow(
  company: CompanyRefreshRow
): FmcsaDisplayFields {
  const carrier = asCarrier(company.fmcsa_raw);

  return {
    entityType: carrier ? extractEntityType(carrier) : null,
    usdotStatus: carrier
      ? deriveUsdotStatus(carrier)
      : company.out_of_service
        ? 'OUT OF SERVICE'
        : null,
    powerUnits:
      carrier && extractPowerUnits(carrier) !== null
        ? String(extractPowerUnits(carrier))
        : null,
    mcNumber: formatMc(company.mc_number),
    authorityStatus: carrier ? formatAuthorityStatus(carrier) : null,
    safetyRating: company.fmcsa_safety_rating ?? 'Not Rated',
    complaintsLast12m: String(
      company.complaints_last_12m ?? company.fmcsa_complaints ?? 0
    ),
  };
}

export function extractDisplayFieldsFromSnapshot(
  snapshot: FmcsaCarrierSnapshot
): FmcsaDisplayFields {
  const carrier = snapshot.raw;

  return {
    entityType: extractEntityType(carrier),
    usdotStatus: deriveUsdotStatus(carrier),
    powerUnits:
      extractPowerUnits(carrier) !== null
        ? String(extractPowerUnits(carrier))
        : null,
    mcNumber: formatMc(snapshot.mcNumber ?? null),
    authorityStatus: formatAuthorityStatus(carrier),
    safetyRating: snapshot.safetyRating,
    complaintsLast12m: String(snapshot.complaintsLast12m),
  };
}

function severityForBatchField(
  field: string,
  oldVal: string | null,
  newVal: string | null
) {
  if (field === 'usdotStatus' && newVal === 'OUT OF SERVICE') return 'critical' as const;
  if (field === 'safetyRating') {
    if (newVal === 'Unsatisfactory') return 'critical' as const;
    if (newVal === 'Conditional' && oldVal === 'Satisfactory') return 'warning' as const;
  }
  if (field === 'complaintsLast12m') {
    const oldN = Number(oldVal ?? 0);
    const newN = Number(newVal ?? 0);
    if (newN > oldN + 5) return 'warning' as const;
  }
  return 'info' as const;
}

const DISPLAY_FIELD_LABELS: Record<keyof FmcsaDisplayFields, string> = {
  entityType: 'entity_type',
  usdotStatus: 'usdot_status',
  powerUnits: 'power_units',
  mcNumber: 'mc_number',
  authorityStatus: 'authority_status',
  safetyRating: 'fmcsa_safety_rating',
  complaintsLast12m: 'complaints_last_12m',
};

export function detectBatchFieldChanges(
  before: CompanyRefreshRow,
  snapshot: FmcsaCarrierSnapshot
): FieldChange[] {
  const prev = extractDisplayFieldsFromRow(before);
  const next = extractDisplayFieldsFromSnapshot(snapshot);
  const changes: FieldChange[] = [];

  for (const key of Object.keys(DISPLAY_FIELD_LABELS) as (keyof FmcsaDisplayFields)[]) {
    const field = DISPLAY_FIELD_LABELS[key];
    const oldValue = prev[key];
    const newValue = next[key];
    if (oldValue === newValue) continue;
    if (oldValue === null && newValue === null) continue;
    changes.push({
      field,
      oldValue,
      newValue,
      severity: severityForBatchField(field, oldValue, newValue),
    });
  }

  const authorityChanged =
    String(before.authority_active ?? false) !== String(snapshot.authorityActive);
  if (authorityChanged) {
    changes.push({
      field: 'authority_active',
      oldValue: String(before.authority_active ?? false),
      newValue: String(snapshot.authorityActive),
      severity: before.authority_active && !snapshot.authorityActive ? 'critical' : 'info',
    });
  }

  const oosChanged =
    String(before.out_of_service ?? false) !== String(snapshot.outOfService);
  if (oosChanged) {
    changes.push({
      field: 'out_of_service',
      oldValue: String(before.out_of_service ?? false),
      newValue: String(snapshot.outOfService),
      severity: snapshot.outOfService ? 'critical' : 'info',
    });
  }

  return changes;
}