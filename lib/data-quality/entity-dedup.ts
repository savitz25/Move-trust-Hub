/**
 * Phase 2 — entity identity for deduplication.
 * Primary key: USDOT. Secondary: normalized name + locality.
 */

import { normalizeCompanyUsdot } from '@/lib/utils/company-slug';
import { normalizeLocationLabel } from '@/lib/data-quality/location';

export type DedupIdentity = {
  usdot: string | null;
  nameKey: string;
  placeKey: string;
  compositeKey: string;
};

export function normalizeEntityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(llc|inc|corp|co|company|ltd|limited|the)\b/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function buildDedupIdentity(params: {
  name: string;
  usdot?: string | null;
  city?: string | null;
  stateCode?: string | null;
  headquarters?: string | null;
}): DedupIdentity {
  const usdot = normalizeCompanyUsdot(params.usdot);
  const nameKey = normalizeEntityName(params.name);
  const place =
    params.city ||
    (params.headquarters ? params.headquarters.split(',')[0] : '') ||
    '';
  const placeKey = [
    normalizeLocationLabel(place),
    (params.stateCode || '').toLowerCase(),
  ]
    .filter(Boolean)
    .join('|');

  return {
    usdot,
    nameKey,
    placeKey,
    compositeKey: usdot
      ? `usdot:${usdot}`
      : `name:${nameKey}|place:${placeKey}`,
  };
}

/**
 * Prefer the "best" of two duplicate candidates as canonical:
 * verified, more complete USDOT, no -N slug suffix, higher reputation.
 */
export function pickCanonicalEntity<
  T extends {
    slug: string;
    usdotNumber?: string | null;
    isVerified?: boolean;
    reputationScore?: number;
    reviewCount?: number;
  },
>(a: T, b: T): T {
  const score = (c: T) => {
    let s = 0;
    if (c.isVerified) s += 100;
    if (normalizeCompanyUsdot(c.usdotNumber)) s += 50;
    if (!/-\d+$/.test(c.slug)) s += 30;
    s += Number(c.reputationScore) || 0;
    s += Math.min(Number(c.reviewCount) || 0, 200) / 10;
    // Prefer shorter slug (no suffix)
    s -= c.slug.length * 0.01;
    return s;
  };
  return score(a) >= score(b) ? a : b;
}

/** Strip numeric collision suffix: "acme-movers-2" → "acme-movers" */
export function stripSlugCollisionSuffix(slug: string): string {
  return slug.replace(/-\d+$/, '');
}

/**
 * Detect likely duplicate slug pair (same base, different -N suffix).
 */
export function areSlugCollisionDuplicates(a: string, b: string): boolean {
  if (a === b) return true;
  return stripSlugCollisionSuffix(a) === stripSlugCollisionSuffix(b);
}

/**
 * Collapse a list to unique entities by USDOT then name+place.
 * Keeps first-seen order among winners.
 */
export function dedupeEntitiesByIdentity<
  T extends {
    slug: string;
    name: string;
    usdotNumber?: string | null;
    headquarters?: string;
    isVerified?: boolean;
    reputationScore?: number;
    reviewCount?: number;
  },
>(items: T[]): { unique: T[]; suppressed: T[] } {
  const byKey = new Map<string, T>();
  const suppressed: T[] = [];

  for (const item of items) {
    const id = buildDedupIdentity({
      name: item.name,
      usdot: item.usdotNumber,
      headquarters: item.headquarters,
    });
    const key = id.compositeKey;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, item);
      continue;
    }
    const winner = pickCanonicalEntity(existing, item);
    const loser = winner === existing ? item : existing;
    byKey.set(key, winner);
    suppressed.push(loser);
  }

  return { unique: [...byKey.values()], suppressed };
}
