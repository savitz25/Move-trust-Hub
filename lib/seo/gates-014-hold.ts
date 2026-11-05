/**
 * GATES-014 rating-incident hold.
 * These 48 slugs share a Google place_id with another company row.
 * cord-moving-storage and gouffon-moving-storage-2 are in this set.
 * true-friends is the live slug true-friends-moving-company-llc (no USDOT row
 * under the shorter name).
 */

export const GATES_014_SHARED_PLACE_SLUGS: readonly string[] = [
  '1st-moving-corp',
  '1st-moving-corp-2',
  '1st-moving-corp-3',
  'affordable-movers-usa',
  'affordable-moving-storage',
  'all-about-moving-tampa-bay',
  'america-first-moving-services-inc',
  'america-s-family-moving-and-storage-llc',
  'american-van-lines',
  'amerisafe-van-lines',
  'big-g-movers-inc',
  'big-g-movers-inc-2',
  'clark-moving-storage-of-albany',
  'clark-moving-storage-of-albany-2',
  'college-hunks-hauling-junk-3',
  'college-hunks-hauling-junk-moving-nashville',
  'cord-moving-storage',
  'cord-moving-storage-memphis',
  'dumbo-movers-inc',
  'dumbo-moving-storage',
  'express-moving',
  'express-moving-2',
  'family-affair-moving-inc',
  'family-affair-moving-inc-2',
  'firefighting-s-finest-moving-storage',
  'firefighting-s-finest-moving-storage-2',
  'firefighting-s-finest-moving-storage-inc',
  'flex-moving',
  'flex-moving-storage',
  'golden-sun-movers-riverside',
  'gouffon-moving-storage',
  'gouffon-moving-storage-2',
  'h-town-movers-houston',
  'h-town-movers-houston-2',
  'master-movers-llc',
  'moving-company',
  'moving-movers-riverside',
  'northern-michigan-moving',
  'northern-michigan-moving-2',
  'orange-county-moving-services',
  'orange-county-moving-services-2',
  'razorback-moving-tampa',
  'razorback-moving-tampa-2',
  'tampa-bay-moving-and-storage',
  'two-men-and-a-truck-fresno',
  'two-men-and-a-truck-moving',
  'unicorn-moving-storage-austin-movers',
  'unicorn-moving-storage-austin-movers-2',
] as const;

const SHARED_PLACE = new Set(GATES_014_SHARED_PLACE_SLUGS);

/** Named removals that are not all inside the shared-place set. */
const NAMED_SITEMAP_REMOVALS = new Set([
  'cord-moving-storage',
  'gouffon-moving-storage-2',
  'true-friends',
  'true-friends-moving-company-llc',
]);

export function isGates014HeldSlug(slug: string | null | undefined): boolean {
  const normalized = (slug ?? '').trim().toLowerCase();
  if (!normalized) return false;
  if (SHARED_PLACE.has(normalized) || NAMED_SITEMAP_REMOVALS.has(normalized)) return true;
  return normalized.startsWith('true-friends');
}
