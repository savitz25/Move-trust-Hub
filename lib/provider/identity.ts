import { buildDedupIdentity, normalizeEntityName } from '@/lib/data-quality/entity-dedup';
import { normalizeMc, normalizeUsdot } from '@/lib/trust/license-verification';
import type { IdentityCollision } from '@/lib/provider/types';

export type IdentityRow = {
  id: string;
  name: string;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  headquarters?: string | null;
};

export function canonicalIdentityKey(row: IdentityRow): string | null {
  const usdot = normalizeUsdot(row.usdotNumber ?? '');
  if (usdot && usdot !== '0') return `usdot:${usdot}`;
  const mc = normalizeMc(row.mcNumber ?? '');
  if (mc) return `mc:${mc}`;
  return null;
}

/**
 * Name similarity may flag review, but never silently establishes identity.
 */
export function detectIdentityCollisions(rows: readonly IdentityRow[]): IdentityCollision[] {
  const byUsdot = new Map<string, string[]>();
  const byMc = new Map<string, string[]>();
  const byNamePlace = new Map<string, string[]>();

  for (const row of rows) {
    const usdot = normalizeUsdot(row.usdotNumber ?? '');
    if (usdot && usdot !== '0') {
      byUsdot.set(usdot, [...(byUsdot.get(usdot) ?? []), row.id]);
    }
    const mc = normalizeMc(row.mcNumber ?? '');
    if (mc) {
      byMc.set(mc, [...(byMc.get(mc) ?? []), row.id]);
    }
    const identity = buildDedupIdentity({
      name: row.name,
      usdot: row.usdotNumber,
      headquarters: row.headquarters,
    });
    if (!usdot && identity.nameKey) {
      const place = identity.placeKey || normalizeEntityName(row.headquarters ?? '');
      const key = `${identity.nameKey}|${place}`;
      byNamePlace.set(key, [...(byNamePlace.get(key) ?? []), row.id]);
    }
  }

  const collisions: IdentityCollision[] = [];
  for (const [key, ids] of byUsdot) {
    const unique = [...new Set(ids)];
    if (unique.length > 1) {
      collisions.push({ kind: 'usdot', key, companyIds: unique, resolution: 'REVIEW_REQUIRED' });
    }
  }
  for (const [key, ids] of byMc) {
    const unique = [...new Set(ids)];
    if (unique.length > 1) {
      collisions.push({ kind: 'mc', key, companyIds: unique, resolution: 'REVIEW_REQUIRED' });
    }
  }
  for (const [key, ids] of byNamePlace) {
    const unique = [...new Set(ids)];
    if (unique.length > 1) {
      collisions.push({
        kind: 'legal_name_address',
        key,
        companyIds: unique,
        resolution: 'REVIEW_REQUIRED',
      });
    }
  }
  return collisions;
}

export function shouldCreateCanonicalProfile(input: {
  existingCanonicalKey: string | null;
  incomingCanonicalKey: string | null;
}): 'same_identity' | 'new_identity' | 'REVIEW_REQUIRED' {
  if (!input.incomingCanonicalKey) return 'REVIEW_REQUIRED';
  if (!input.existingCanonicalKey) return 'new_identity';
  if (input.existingCanonicalKey === input.incomingCanonicalKey) return 'same_identity';
  return 'new_identity';
}
