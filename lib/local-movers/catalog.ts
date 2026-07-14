import {
  generatedMetroPools,
  generatedMoversCatalog,
} from '@/data/generated/index';
import { directoryLocalMovers } from '@/data/directory-local-movers';
import { activeDirectoryMovers } from '@/data/active-directory-movers';
import { localMoversCatalog, metroMoverPools } from '@/data/local-movers-seed';
import type { LocalMover } from '@/lib/local-movers/types';

export const fullMoversCatalog: Record<string, LocalMover> = {
  ...localMoversCatalog,
  ...directoryLocalMovers,
  // Active Supabase directory companies (overrides seed when same id)
  ...activeDirectoryMovers,
  ...generatedMoversCatalog,
  // Re-apply active on top of generated so active directory always wins
  ...activeDirectoryMovers,
};

export const fullMetroPools: Record<string, string[]> = {
  ...Object.fromEntries(
    Object.entries(metroMoverPools).map(([key, pool]) => [key, pool.moverIds])
  ),
  ...generatedMetroPools,
};