import {
  generatedMetroPools,
  generatedMoversCatalog,
} from '@/data/generated/index';
import { localMoversCatalog, metroMoverPools } from '@/data/local-movers-seed';
import type { LocalMover } from '@/lib/local-movers/types';

export const fullMoversCatalog: Record<string, LocalMover> = {
  ...localMoversCatalog,
  ...generatedMoversCatalog,
};

export const fullMetroPools: Record<string, string[]> = {
  ...Object.fromEntries(
    Object.entries(metroMoverPools).map(([key, pool]) => [key, pool.moverIds])
  ),
  ...generatedMetroPools,
};