import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';
import { DEFAULT_PERFORMANCE_FLAGS, type PerformanceFlags } from '@/lib/edge-config/types';

/** Module cache — Edge middleware + Node RSC share one TTL bucket. */
let cachedFlags: PerformanceFlags | null = null;
let cachedAt = 0;
const TTL_MS = 60_000;

export async function getCachedPerformanceFlags(): Promise<PerformanceFlags> {
  if (!process.env.EDGE_CONFIG) {
    return DEFAULT_PERFORMANCE_FLAGS;
  }

  const now = Date.now();
  if (cachedFlags && now - cachedAt < TTL_MS) {
    return cachedFlags;
  }

  const flags = await getPerformanceFlags();
  cachedFlags = flags;
  cachedAt = now;
  return flags;
}