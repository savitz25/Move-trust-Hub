import { normalizeUsdot } from '@/lib/trust/license-verification';

export type UsdotCollision = {
  usdot: string;
  companyIds: string[];
  companyNames: string[];
  brandKeys: string[];
};

function normalizeCompanyIdentity(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\b(llc|inc|corp|co|company|the|of)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Franchise / multi-location brand stems that legitimately share a parent USDOT
 * across city listings. These are not "wrong number attached to wrong company"
 * render bugs — they are network data patterns.
 */
const FRANCHISE_BRAND_STEMS = [
  'two men and a truck',
  'all my sons',
  'gentle giant',
  'college hunks',
  'little guys movers',
  'little guys',
  'meathead movers',
  'armstrong relocation',
  'coleman worldwide',
  'apple moving',
  'miracle movers',
  'corrigan moving',
  'good guys moving',
  'north american van lines',
  'national van lines',
] as const;

/** Brand family key for collision comparison. */
export function brandIdentityKey(name: string): string {
  const n = normalizeCompanyIdentity(name);
  for (const stem of FRANCHISE_BRAND_STEMS) {
    if (n === stem || n.startsWith(stem + ' ') || n.includes(' ' + stem + ' ')) {
      return stem;
    }
    if (n.startsWith(stem)) return stem;
  }
  // First three significant tokens for independent carriers
  return n.split(' ').filter(Boolean).slice(0, 3).join(' ');
}

/**
 * Same USDOT attached to two different brand identities = QA fail.
 * Franchise city variants of the same brand are not collisions.
 * Distinct van lines incorrectly sharing one DOT (e.g. Allied + Mayflower
 * both stamped 125563) are collisions.
 */
export function findUsdotIdentityCollisions(
  movers: Array<{ id: string; name: string; usdotNumber?: string | null }>
): UsdotCollision[] {
  const byUsdot = new Map<
    string,
    Array<{ id: string; name: string; brandKey: string }>
  >();

  for (const m of movers) {
    const usdot = normalizeUsdot(m.usdotNumber ?? undefined);
    if (!usdot || usdot === '0') continue;
    const brandKey = brandIdentityKey(m.name);
    if (!brandKey) continue;
    const list = byUsdot.get(usdot) ?? [];
    list.push({ id: m.id, name: m.name, brandKey });
    byUsdot.set(usdot, list);
  }

  const collisions: UsdotCollision[] = [];
  for (const [usdot, rows] of byUsdot) {
    const brands = new Set(rows.map((r) => r.brandKey));
    if (brands.size < 2) continue;
    collisions.push({
      usdot,
      companyIds: [...new Set(rows.map((r) => r.id))],
      companyNames: [...new Set(rows.map((r) => r.name))],
      brandKeys: [...brands],
    });
  }
  return collisions;
}

/** True when each displayed mover’s USDOT is unique to that brand identity set. */
export function pageUsdotDisplayIsClean(
  movers: Array<{ id: string; name: string; usdotNumber?: string | null }>
): boolean {
  return findUsdotIdentityCollisions(movers).length === 0;
}
