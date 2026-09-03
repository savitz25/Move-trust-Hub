import 'server-only';
import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import {
  NJ_MOVE_PUBLIC_SNAPSHOT,
  assertNjMovePublicSnapshot,
  type NjMovePublicSnapshot,
} from '@/lib/state-hhg/nj/publication';

export const MTH_NJ_STATE_INTEL_VERSION = 'nj-move-002-public-v1';
const REVALIDATE_SEC = 1_800;
const TIMEOUT_MS = 6_000;

export type NjMoveIntelligencePayload = {
  snapshot: NjMovePublicSnapshot;
  federalHqPublishable: number | null;
  federalTimedOut: boolean;
};

type CountClient = {
  from: (table: string) => {
    select: (cols: string, opts?: { count?: 'exact'; head?: boolean }) => any;
  };
};

async function loadFederalHq(): Promise<{ count: number | null; timedOut: boolean }> {
  if (!isSupabaseAdminConfigured()) {
    return { count: null, timedOut: true };
  }
  const db = createAdminClient() as unknown as CountClient;
  try {
    const { count, error } = await db
      .from('companies')
      .select('id', { count: 'exact', head: true })
      .eq('publication_state', 'PUBLISHABLE')
      .ilike('headquarters', '% NJ%');
    if (error || typeof count !== 'number') return { count: null, timedOut: false };
    return { count, timedOut: false };
  } catch {
    return { count: null, timedOut: true };
  }
}

async function loadLive(): Promise<NjMoveIntelligencePayload> {
  const snapshot = assertNjMovePublicSnapshot(NJ_MOVE_PUBLIC_SNAPSHOT);
  const federal = await Promise.race([
    loadFederalHq(),
    new Promise<{ count: number | null; timedOut: boolean }>((resolve) =>
      setTimeout(() => resolve({ count: null, timedOut: true }), TIMEOUT_MS),
    ),
  ]);
  return {
    snapshot,
    federalHqPublishable: federal.count,
    federalTimedOut: federal.timedOut,
  };
}

export const getNjMoveIntelligenceSnapshot = unstable_cache(loadLive, ['nj-move-intel-v1'], {
  revalidate: REVALIDATE_SEC,
});
