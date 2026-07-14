import { isGeneratedTemplateMover } from '@/lib/trust/curated-listing-policy';
import { isPlaceholderMoverId } from '@/lib/trust/license-verification';

/**
 * IDs that must never appear in county assignments or public mover lists.
 * Runtime display is also gated by isCuratedMover() — this catches assignment sources early.
 */
export function isFabricatedMoverId(id: string): boolean {
  const normalized = id.trim().toLowerCase();
  if (!normalized) return true;
  if (isPlaceholderMoverId(normalized)) return true;
  if (isGeneratedTemplateMover(normalized)) return true;
  if (normalized.startsWith('all-my-sons-')) return true;
  if (normalized.includes('-county-moving-')) return true;
  if (/-moving-[a-z0-9-]+-(wy|sd|nd|ne|ia|mn|wi|mt|id)$/i.test(normalized)) return true;
  if (normalized.startsWith('college-hunks-moving-')) return true;
  if (/^two-men-and-a-truck-/.test(normalized)) return true;
  return false;
}

export function filterAssignmentMoverIds(ids: string[]): string[] {
  return ids.filter((id) => !isFabricatedMoverId(id));
}