import { get } from '@vercel/edge-config';
import {
  DEFAULT_PERFORMANCE_FLAGS,
  type PerformanceFlags,
} from '@/lib/edge-config/types';

function mergeFlags(remote: Partial<PerformanceFlags> | null | undefined): PerformanceFlags {
  if (!remote || typeof remote !== 'object') {
    return DEFAULT_PERFORMANCE_FLAGS;
  }
  return { ...DEFAULT_PERFORMANCE_FLAGS, ...remote };
}

/**
 * Reads `performance` from Vercel Edge Config.
 * Safe in middleware (Edge) and Server Components (Node).
 * Falls back to defaults when EDGE_CONFIG is unset (local dev).
 */
export async function getPerformanceFlags(): Promise<PerformanceFlags> {
  if (!process.env.EDGE_CONFIG) {
    return DEFAULT_PERFORMANCE_FLAGS;
  }

  try {
    const remote = await get<Partial<PerformanceFlags>>('performance');
    return mergeFlags(remote);
  } catch {
    return DEFAULT_PERFORMANCE_FLAGS;
  }
}