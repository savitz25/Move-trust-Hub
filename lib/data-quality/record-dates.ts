/**
 * Phase 2 — separate real review/sync events from page generation.
 * Never treat deploy time as “last reviewed.”
 */

export type RecordDateKind =
  | 'editorial_reviewed'
  | 'regulatory_refreshed'
  | 'review_snapshot_refreshed'
  | 'profile_updated'
  | 'page_generated';

export type RecordDateStamp = {
  kind: RecordDateKind;
  iso: string;
  label: string;
};

function isValidIso(iso: string | null | undefined): iso is string {
  if (!iso?.trim()) return false;
  const t = Date.parse(iso);
  return Number.isFinite(t) && t > 0;
}

export function formatRecordDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Build honest freshness stamps for a company profile.
 * Omits kinds without a real source timestamp.
 */
export function buildCompanyDateStamps(params: {
  fmcsaLastChecked?: string | null;
  bbbLastChecked?: string | null;
  lastUpdated?: string | null;
  googleSyncedAt?: string | null;
}): RecordDateStamp[] {
  const stamps: RecordDateStamp[] = [];

  if (isValidIso(params.fmcsaLastChecked)) {
    stamps.push({
      kind: 'regulatory_refreshed',
      iso: params.fmcsaLastChecked,
      label: 'Regulatory data refreshed (FMCSA)',
    });
  }

  if (isValidIso(params.bbbLastChecked)) {
    stamps.push({
      kind: 'regulatory_refreshed',
      iso: params.bbbLastChecked,
      label: 'BBB public data refreshed',
    });
  }

  if (isValidIso(params.googleSyncedAt)) {
    stamps.push({
      kind: 'review_snapshot_refreshed',
      iso: params.googleSyncedAt,
      label: 'Review snapshot refreshed',
    });
  }

  // Profile updated only when distinct from FMCSA check (avoid decorative twin dates)
  if (
    isValidIso(params.lastUpdated) &&
    params.lastUpdated !== params.fmcsaLastChecked
  ) {
    stamps.push({
      kind: 'profile_updated',
      iso: params.lastUpdated,
      label: 'Profile record updated',
    });
  }

  return stamps;
}

/** Prefer regulatory refresh for “data freshness”; never invent deploy-time review. */
export function primaryRegulatoryDate(params: {
  fmcsaLastChecked?: string | null;
  lastUpdated?: string | null;
}): string | null {
  if (isValidIso(params.fmcsaLastChecked)) return params.fmcsaLastChecked;
  return null;
}
