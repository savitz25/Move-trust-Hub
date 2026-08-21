/**
 * Stable Florida Chapter 507 regulatory identities.
 * Never use business name as the primary key.
 * Google Places requests: 0.
 */

export type FdacsRegistrationKind = 'IM' | 'MB' | 'XX';

export function fdacsRegistrationKind(
  licenseNumber: string | null | undefined,
  licenseType?: string | null
): FdacsRegistrationKind {
  const raw = (licenseNumber ?? '').trim().toUpperCase();
  const prefix = raw.match(/^(IM|MB)/)?.[1];
  if (prefix === 'IM' || prefix === 'MB') return prefix;
  const type = (licenseType ?? '').toLowerCase();
  if (type.includes('broker')) return 'MB';
  if (type.includes('mover') || type.includes('intrastate')) return 'IM';
  return 'XX';
}

/** FL-FDACS-IM-2736 / FL-FDACS-MB-165 */
export function fdacsRegulatoryId(
  licenseNumber: string | null | undefined,
  licenseType?: string | null
): string | null {
  const raw = (licenseNumber ?? '').trim().toUpperCase().replace(/\s+/g, '');
  if (!raw) return null;
  const m = raw.match(/^(IM|MB)(\d+)$/);
  if (m) return `FL-FDACS-${m[1]}-${m[2]}`;
  const kind = fdacsRegistrationKind(raw, licenseType);
  const digits = raw.replace(/\D/g, '');
  if (!digits) return null;
  return `FL-FDACS-${kind}-${digits}`;
}

export function parseFdacsRegulatoryId(id: string): {
  kind: FdacsRegistrationKind;
  number: string;
} | null {
  const m = id.trim().toUpperCase().match(/^FL-FDACS-(IM|MB|XX)-(\d+)$/);
  if (!m) return null;
  return { kind: m[1] as FdacsRegistrationKind, number: m[2] };
}
