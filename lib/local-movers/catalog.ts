import {
  generatedMetroPools,
  generatedMoversCatalog,
} from '@/data/generated/index';
import { directoryLocalMovers } from '@/data/directory-local-movers';
import { activeDirectoryMovers } from '@/data/active-directory-movers';
import { localMoversCatalog, metroMoverPools } from '@/data/local-movers-seed';
import { sanitizeMoverDescription } from '@/lib/local-movers/sanitize-mover-description';
import type { LocalMover } from '@/lib/local-movers/types';

/** Scrub placeholder / scrape descriptions before any page can render them. */
function scrubCatalogDescriptions(
  catalog: Record<string, LocalMover>
): Record<string, LocalMover> {
  const out: Record<string, LocalMover> = {};
  for (const [id, mover] of Object.entries(catalog)) {
    out[id] = {
      ...mover,
      shortDescription: sanitizeMoverDescription(
        mover.name,
        mover.shortDescription,
        mover.usdotNumber
      ),
    };
  }
  return out;
}

const mergedCatalog: Record<string, LocalMover> = {
  ...localMoversCatalog,
  ...directoryLocalMovers,
  // Active Supabase directory companies (overrides seed when same id)
  ...activeDirectoryMovers,
  ...generatedMoversCatalog,
  // Re-apply active on top of generated so active directory always wins
  ...activeDirectoryMovers,
};

export const fullMoversCatalog: Record<string, LocalMover> =
  scrubCatalogDescriptions(mergedCatalog);

export const fullMetroPools: Record<string, string[]> = {
  ...Object.fromEntries(
    Object.entries(metroMoverPools).map(([key, pool]) => [key, pool.moverIds])
  ),
  ...generatedMetroPools,
};