import { isCuratedMover } from '@/lib/trust/curated-listing-policy';
import type { LocalMover } from '@/lib/local-movers/types';

/**
 * Merge onboarded directory/local movers with seed catalog.
 * Approved (directory) listings always win order + dedupe so county counts include them.
 */
export function mergeApprovedMovers(
  base: LocalMover[],
  approved: LocalMover[],
  displayLimit: number
): LocalMover[] {
  const curatedApproved = approved.filter((mover) => isCuratedMover(mover));
  // Catalog entries are never "directory" — mark for clarity when missing.
  const baseTagged = base.map((m) =>
    m.listingSource ? m : { ...m, listingSource: 'catalog' as const }
  );

  // Directory / local first (already sorted by recency), then catalog fill.
  const merged = [...curatedApproved, ...baseTagged];
  const seen = new Set<string>();
  const deduped: LocalMover[] = [];

  for (const mover of merged) {
    const key = (mover.profileSlug || mover.id).toLowerCase();
    const nameKey = mover.name.trim().toLowerCase();
    if (seen.has(key) || seen.has(nameKey)) continue;
    seen.add(key);
    if (nameKey) seen.add(nameKey);
    deduped.push(mover);
    if (deduped.length >= displayLimit) break;
  }

  return deduped;
}