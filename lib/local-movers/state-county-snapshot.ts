import 'server-only';

import { unstable_cache } from 'next/cache';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';
import type { CompleteStateSnapshot } from '@/lib/local-movers/state-county-fanout';

const memory = new Map<string, CompleteStateSnapshot>();
const pendingWrite = new Map<string, CompleteStateSnapshot>();

function readCached(stateSlug: string) {
  return unstable_cache(
    async () => {
      const snapshot = pendingWrite.get(stateSlug) ?? memory.get(stateSlug);
      if (!snapshot?.complete || snapshot.stateSlug !== stateSlug) {
        throw new Error(`state_snapshot_miss:${stateSlug}`);
      }
      return snapshot;
    },
    ['state-county-complete-v1', stateSlug],
    {
      revalidate: 86_400,
      tags: [APPROVED_COUNTY_MOVERS_TAG, 'state-county-complete'],
    }
  )();
}

export async function readCompleteStateSnapshot(
  stateSlug: string
): Promise<CompleteStateSnapshot | null> {
  const local = memory.get(stateSlug);
  if (local?.complete) return local;
  try {
    const stored = await readCached(stateSlug);
    if (stored?.complete && stored.stateSlug === stateSlug) {
      memory.set(stateSlug, stored);
      return stored;
    }
  } catch {
    return null;
  }
  return null;
}

/** Remember a fresh complete evaluation. Publication tag invalidation drops the shared copy. */
export async function writeCompleteStateSnapshot(snapshot: CompleteStateSnapshot): Promise<void> {
  memory.set(snapshot.stateSlug, snapshot);
  pendingWrite.set(snapshot.stateSlug, snapshot);
  try {
    await readCached(snapshot.stateSlug);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!message.startsWith('state_snapshot_miss:')) throw err;
  } finally {
    pendingWrite.delete(snapshot.stateSlug);
  }
}
