import type { CountyMoversResult } from '@/lib/local-movers/get-movers-for-county-async';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export const STATE_COUNTY_LOAD_CONCURRENCY = 4;

export type CountyLoadStatus = 'ok' | 'failed' | 'fallback';

export type FreshCountyLoad = {
  county: LocalCounty;
  result: CountyMoversResult | null;
  loadStatus: 'ok' | 'failed';
  failureReason?: 'timeout' | 'error' | 'unavailable';
};

export type CompleteCountySnapshot = {
  countySlug: string;
  result: CountyMoversResult;
};

export type CompleteStateSnapshot = {
  stateSlug: string;
  complete: true;
  entries: CompleteCountySnapshot[];
  storedAt: string;
};

export type PublicationRecheck =
  | { status: 'ok'; publishedSlugs: ReadonlySet<string> }
  | { status: 'failed' };

export type SettledCountyLoad = {
  county: LocalCounty;
  result: CountyMoversResult | null;
  loadStatus: CountyLoadStatus;
  failureReason?: FreshCountyLoad['failureReason'];
};

/**
 * Keep a snapshot mover only when its profile is still publishable.
 * A mover with no slug cannot be rechecked, so it is dropped.
 * Nothing is added from outside that county's snapshot.
 */
export function retainValidatedSnapshotMovers(
  movers: readonly LocalMover[],
  publishedSlugs: ReadonlySet<string>
): LocalMover[] {
  return movers.filter((mover) => {
    const slug = mover.profileSlug?.trim();
    return Boolean(slug && publishedSlugs.has(slug));
  });
}

export function settleStateCountyLoads(input: {
  fresh: readonly FreshCountyLoad[];
  snapshot: CompleteStateSnapshot | null;
  publication: PublicationRecheck | null;
}): {
  settled: SettledCountyLoad[];
  freshComplete: boolean;
  usedFallback: boolean;
  cacheable: boolean;
  failedCounties: string[];
} {
  const freshComplete = input.fresh.every((row) => row.loadStatus === 'ok');
  const canUseSnapshot =
    !freshComplete &&
    input.snapshot?.complete === true &&
    input.publication?.status === 'ok';
  const published = canUseSnapshot && input.publication?.status === 'ok'
    ? input.publication.publishedSlugs
    : null;
  const previous = new Map(
    (input.snapshot?.entries ?? []).map((entry) => [entry.countySlug, entry.result])
  );

  let usedFallback = false;
  const settled: SettledCountyLoad[] = input.fresh.map((row) => {
    if (row.loadStatus === 'ok') {
      return {
        county: row.county,
        result: row.result,
        loadStatus: 'ok',
        failureReason: row.failureReason,
      };
    }
    const prior = published ? previous.get(row.county.slug) : undefined;
    if (!prior || !published) {
      return {
        county: row.county,
        result: row.result,
        loadStatus: 'failed',
        failureReason: row.failureReason ?? 'unavailable',
      };
    }
    usedFallback = true;
    return {
      county: row.county,
      result: {
        ...prior,
        movers: retainValidatedSnapshotMovers(prior.movers, published),
        loadStatus: 'ok',
        loadFailure: undefined,
      },
      loadStatus: 'fallback',
    };
  });

  return {
    settled,
    freshComplete,
    usedFallback,
    cacheable: freshComplete,
    failedCounties: settled
      .filter((row) => row.loadStatus === 'failed')
      .map((row) => row.county.slug),
  };
}
