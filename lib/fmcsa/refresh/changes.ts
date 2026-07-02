import type { CompanyRefreshRow, FieldChange } from '@/lib/fmcsa/refresh/types';
import type { FmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/types';

function severityForField(field: string, oldVal: string | null, newVal: string | null) {
  if (field === 'out_of_service' && newVal === 'true') return 'critical' as const;
  if (field === 'authority_active' && oldVal === 'true' && newVal === 'false') return 'critical' as const;
  if (field === 'fmcsa_safety_rating') {
    if (newVal === 'Unsatisfactory') return 'critical' as const;
    if (newVal === 'Conditional' && oldVal === 'Satisfactory') return 'warning' as const;
  }
  if (field === 'revocation_date' && newVal) return 'critical' as const;
  if (field === 'complaints_last_12m') {
    const oldN = Number(oldVal ?? 0);
    const newN = Number(newVal ?? 0);
    if (newN > oldN + 5) return 'warning' as const;
  }
  return 'info' as const;
}

export function detectFieldChanges(
  before: CompanyRefreshRow,
  snapshot: FmcsaCarrierSnapshot,
  dataHash: string
): FieldChange[] {
  const next = {
    fmcsa_safety_rating: snapshot.safetyRating,
    authority_active: String(snapshot.authorityActive),
    out_of_service: String(snapshot.outOfService),
    complaints_last_12m: String(snapshot.complaintsLast12m),
    fmcsa_complaints: String(snapshot.complaintsLast12m),
    revocation_date: snapshot.revocationDate ?? '',
    data_hash: dataHash,
    fmcsa_legal_name: snapshot.legalName ?? '',
  };

  const prev = {
    fmcsa_safety_rating: before.fmcsa_safety_rating ?? 'Not Rated',
    authority_active: String(before.authority_active ?? false),
    out_of_service: String(before.out_of_service ?? false),
    complaints_last_12m: String(before.complaints_last_12m ?? before.fmcsa_complaints ?? 0),
    fmcsa_complaints: String(before.fmcsa_complaints ?? 0),
    revocation_date: before.revocation_date ?? '',
    data_hash: before.data_hash ?? '',
    fmcsa_legal_name: '',
  };

  const changes: FieldChange[] = [];

  for (const [field, newValue] of Object.entries(next)) {
    const oldValue = prev[field as keyof typeof prev] ?? null;
    if (oldValue === newValue) continue;
    if (field === 'data_hash') continue;
    changes.push({
      field,
      oldValue,
      newValue,
      severity: severityForField(field, oldValue, newValue),
    });
  }

  return changes;
}