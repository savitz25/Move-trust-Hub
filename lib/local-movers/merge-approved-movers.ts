import { isCuratedMover } from '@/lib/trust/curated-listing-policy';
import type { LocalMover } from '@/lib/local-movers/types';

export function mergeApprovedMovers(
  base: LocalMover[],
  approved: LocalMover[],
  displayLimit: number
): LocalMover[] {
  const merged = [...approved.filter((mover) => isCuratedMover(mover)), ...base];
  const seen = new Set<string>();
  const deduped: LocalMover[] = [];

  for (const mover of merged) {
    const key = mover.profileSlug ?? mover.id;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(mover);
    if (deduped.length >= displayLimit) break;
  }

  return deduped;
}