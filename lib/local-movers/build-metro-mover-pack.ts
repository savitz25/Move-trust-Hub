import { directoryMoverIdsByReputation } from '@/data/directory-local-movers';
import { fullMoversCatalog } from '@/lib/local-movers/catalog';
import { getLocalState } from '@/lib/local-movers/states';
import { isCuratedMover } from '@/lib/trust/curated-listing-policy';

const CORE_NATIONAL_IDS = [
  'amerisafe-van-lines',
  'international-van-lines',
  'american-van-lines',
  'colonial-van-lines',
  'moving-apt',
] as const;

const DEFAULT_METRO_PACK_SIZE = 10;

/**
 * Build a FMCSA-verified mover pack for premium metro county assignments.
 * Prioritizes directory-linked interstate carriers, then state-local curated movers.
 */
export function buildMetroMoverPack(
  stateSlug: string,
  countySlug: string,
  targetSize = DEFAULT_METRO_PACK_SIZE
): string[] {
  const stateCode = getLocalState(stateSlug)?.code?.toLowerCase() ?? stateSlug.slice(0, 2);
  const ids: string[] = [];
  const seen = new Set<string>();

  const add = (id: string) => {
    const mover = fullMoversCatalog[id];
    if (!mover || !isCuratedMover(mover) || seen.has(id)) return;
    seen.add(id);
    ids.push(id);
  };

  for (const id of CORE_NATIONAL_IDS) add(id);
  for (const id of directoryMoverIdsByReputation) {
    if (ids.length >= targetSize) break;
    add(id);
  }

  const stateCandidates = Object.entries(fullMoversCatalog)
    .filter(([id, mover]) => {
      if (!isCuratedMover(mover)) return false;
      if (id.includes(countySlug)) return true;
      if (id.endsWith(`-${stateCode}`)) return true;
      return false;
    })
    .sort((a, b) => b[1].reviewCount - a[1].reviewCount);

  for (const [id] of stateCandidates) {
    if (ids.length >= targetSize) break;
    add(id);
  }

  return ids.slice(0, targetSize);
}