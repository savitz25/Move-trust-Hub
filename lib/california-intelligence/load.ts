import 'server-only';
import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import {
  assertCaliforniaMoveSnapshot,
  CALIFORNIA_MOVE_SNAPSHOT,
  type CaliforniaMoveSnapshot,
} from './snapshot';

export type CaliforniaMoveIntelligencePayload = {
  snapshot: CaliforniaMoveSnapshot;
  federalHqPublishable: number | null;
  federalTimedOut: boolean;
};

const REVALIDATE_SEC = 1_800;
const TIMEOUT_MS = 6_000;

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
      .ilike('headquarters', '%, CA%');
    if (error || typeof count !== 'number') return { count: null, timedOut: false };
    return { count, timedOut: false };
  } catch {
    return { count: null, timedOut: true };
  }
}

async function loadLive(): Promise<CaliforniaMoveIntelligencePayload> {
  const snapshot = assertCaliforniaMoveSnapshot(CALIFORNIA_MOVE_SNAPSHOT);
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

export const getCaliforniaMoveIntelligenceSnapshot = unstable_cache(
  loadLive,
  ['ca-move-intel-v1'],
  { revalidate: REVALIDATE_SEC },
);
