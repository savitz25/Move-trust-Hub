/**
 * Deterministic company id + slug for state-only movers (no Google).
 */
import { slugifyCompanyName } from '@/lib/utils/slugify';

const TASK_TAG = '011D.2A';

export function normalizeAuthorityToken(
  stateCode: 'FL' | 'WA',
  authorityNumber: string
): string {
  const raw = authorityNumber.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (stateCode === 'FL') {
    const m = raw.match(/^IM?(\d+)$/) || raw.match(/^(\d+)$/);
    if (m) return `im-${m[1]}`;
    return raw.toLowerCase();
  }
  // WA: HG070844 → hg-070844
  const m = raw.match(/^HG?(\d+)$/) || raw.match(/^(\d+)$/);
  if (m) {
    const digits = m[1];
    return `hg-${digits}`;
  }
  return raw.toLowerCase();
}

/** e.g. fl-im-2736 / wa-hg-070844 */
export function buildStateOnlyCompanyId(
  stateCode: 'FL' | 'WA',
  authorityNumber: string
): string {
  const token = normalizeAuthorityToken(stateCode, authorityNumber);
  return `${stateCode.toLowerCase()}-${token}`;
}

export function buildDisplayName(legalName: string, dba: string | null): string {
  const d = dba?.trim();
  if (d && d.length >= 3) return d;
  return legalName.trim();
}

/**
 * Prefer DBA/public name slug; on collision use authority-based disambiguator.
 * Never overwrite an existing slug.
 */
export function allocateCompanySlug(input: {
  displayName: string;
  stateCode: 'FL' | 'WA';
  authorityNumber: string;
  takenSlugs: Set<string>;
}): { slug: string; collision: boolean } {
  const base = slugifyCompanyName(input.displayName) || 'company';
  if (!input.takenSlugs.has(base) && base !== 'company') {
    return { slug: base, collision: false };
  }
  const token = normalizeAuthorityToken(input.stateCode, input.authorityNumber);
  const disambiguated = `${base}-${input.stateCode.toLowerCase()}-${token}`.slice(0, 96);
  if (!input.takenSlugs.has(disambiguated)) {
    return { slug: disambiguated, collision: true };
  }
  // Extremely rare: append task tag hash fragment
  const fallback = `${disambiguated}-${TASK_TAG.toLowerCase().replace(/\./g, '')}`.slice(
    0,
    96
  );
  return { slug: fallback, collision: true };
}

export { TASK_TAG };
