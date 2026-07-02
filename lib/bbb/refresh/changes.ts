import type { BbbBusinessSnapshot, CompanyRefreshRow, FieldChange } from '@/lib/bbb/refresh/types';

const RATING_ORDER = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F', 'NR'];

function ratingIndex(rating: string): number {
  const idx = RATING_ORDER.indexOf(rating);
  return idx === -1 ? RATING_ORDER.length : idx;
}

function severityForField(field: string, oldVal: string | null, newVal: string | null) {
  if (field === 'bbb_accredited' && oldVal === 'true' && newVal === 'false') {
    return 'critical' as const;
  }
  if (field === 'bbb_rating') {
    const oldIdx = ratingIndex(oldVal ?? 'NR');
    const newIdx = ratingIndex(newVal ?? 'NR');
    if (newIdx > oldIdx + 1) return 'critical' as const;
    if (newIdx > oldIdx) return 'warning' as const;
  }
  if (field === 'bbb_alert_count') {
    const newN = Number(newVal ?? 0);
    if (newN > 0) return 'warning' as const;
  }
  if (field === 'complaints_last_36m') {
    const oldN = Number(oldVal ?? 0);
    const newN = Number(newVal ?? 0);
    if (newN >= oldN + 10) return 'critical' as const;
    if (newN > oldN + 3) return 'warning' as const;
  }
  return 'info' as const;
}

export function detectFieldChanges(
  before: CompanyRefreshRow,
  snapshot: BbbBusinessSnapshot,
  dataHash: string
): FieldChange[] {
  const businessId = `${snapshot.bbbId}-${snapshot.businessId}`;

  const next = {
    bbb_rating: snapshot.rating,
    bbb_accredited: String(snapshot.accredited),
    complaints_last_36m: String(snapshot.complaintsLast36m),
    bbb_customer_reviews: String(snapshot.customerReviews),
    bbb_alert_count: String(snapshot.alertCount),
    bbb_business_id: businessId,
    bbb_data_hash: dataHash,
  };

  const prev = {
    bbb_rating: before.bbb_rating ?? 'NR',
    bbb_accredited: String(before.bbb_accredited ?? false),
    complaints_last_36m: String(before.complaints_last_36m ?? 0),
    bbb_customer_reviews: String(before.bbb_customer_reviews ?? 0),
    bbb_alert_count: String(before.bbb_alert_count ?? 0),
    bbb_business_id: before.bbb_business_id ?? '',
    bbb_data_hash: before.bbb_data_hash ?? '',
  };

  const changes: FieldChange[] = [];

  for (const [field, newValue] of Object.entries(next)) {
    const oldValue = prev[field as keyof typeof prev] ?? null;
    if (oldValue === newValue) continue;
    if (field === 'bbb_data_hash') continue;
    changes.push({
      field,
      oldValue,
      newValue,
      severity: severityForField(field, oldValue, newValue),
    });
  }

  return changes;
}