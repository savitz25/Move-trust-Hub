/**
 * National homepage intelligence payload — cached aggregation for /.
 * Living numbers come from the DB. Copy must not hardcode production counts.
 */
import 'server-only';
import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { assembleMoveHomePayload, emptyMoveHomePayload } from './home-assemble';
import {
  DIRECTORY_BROKER_ENTITY_TYPES,
  DIRECTORY_CARRIER_ENTITY_TYPES,
  DIRECTORY_DUAL_ENTITY_TYPES,
} from './home-classify';
import { buildMoveHomeSiteCoverage } from './home-site-coverage';
import {
  MOVE_HOME_INTEL_VERSION,
  type MoveHomeFreshnessBucket,
  type MoveHomeIntelligencePayload,
} from './home-types';

export type { MoveHomeIntelligencePayload } from './home-types';
export { MOVE_HOME_INTEL_VERSION, MOVE_HOME_H1 } from './home-types';

const REVALIDATE_SEC = 1_800;
const TIMEOUT_MS = 6_000;

/** Matches isConsumerVisibleCompany without changing publication rules. */
const INTERNAL_PUBLICATION_STATES = 'REVIEW_REQUIRED,INACTIVE,INGESTED,CLASSIFIED';
const VISIBLE_OR = `publication_state.is.null,publication_state.not.in.(${INTERNAL_PUBLICATION_STATES})`;

type CountClient = {
  from: (table: string) => {
    select: (cols: string, opts?: { count?: 'exact'; head?: boolean }) => any;
  };
};

function iso(d: string | null | undefined): string | null {
  if (!d) return null;
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt.toISOString();
}

function daysAgoIso(days: number, nowMs: number): string {
  return new Date(nowMs - days * 86_400_000).toISOString();
}

const FRESHNESS_BUCKET_LABELS: Record<MoveHomeFreshnessBucket['id'], string> = {
  '0-30': '0–30 days since last recorded refresh',
  '31-60': '31–60 days',
  '61-90': '61–90 days',
  '91-365': '91–365 days',
  '>365': 'More than 365 days',
  unknown: 'No refresh date recorded',
};

async function exactCount(
  run: () => PromiseLike<{ count: number | null; error: { message: string } | null }>
): Promise<number | null> {
  const { count, error } = await run();
  if (error) return null;
  return typeof count === 'number' ? count : null;
}

function visible(db: CountClient) {
  return db.from('companies').select('id', { count: 'exact', head: true }).or(VISIBLE_OR);
}

async function loadLive(): Promise<MoveHomeIntelligencePayload> {
  const nowMs = Date.now();
  const generatedAt = new Date(nowMs).toISOString();
  const siteCoverage = buildMoveHomeSiteCoverage();

  if (!isSupabaseAdminConfigured()) {
    return emptyMoveHomePayload(generatedAt, true, siteCoverage);
  }

  const db = createAdminClient() as unknown as CountClient;
  const d30 = daysAgoIso(30, nowMs);
  const d60 = daysAgoIso(60, nowMs);
  const d90 = daysAgoIso(90, nowMs);
  const d365 = daysAgoIso(365, nowMs);

  const [
    publishable,
    active,
    notCurrent,
    unknownAuth,
    carrier,
    broker,
    dual,
    latestRow,
    oldestRow,
    withRefresh,
    withoutRefresh,
    b0_30,
    b31_60,
    b61_90,
    b91_365,
    b365plus,
  ] = await Promise.all([
    exactCount(() => visible(db)),
    exactCount(() => visible(db).eq('authority_active', true)),
    exactCount(() => visible(db).eq('authority_active', false)),
    exactCount(() => visible(db).is('authority_active', null)),
    exactCount(() =>
      visible(db).in('entity_type', [...DIRECTORY_CARRIER_ENTITY_TYPES])
    ),
    exactCount(() =>
      visible(db).in('entity_type', [...DIRECTORY_BROKER_ENTITY_TYPES])
    ),
    exactCount(() => visible(db).in('entity_type', [...DIRECTORY_DUAL_ENTITY_TYPES])),
    db
      .from('companies')
      .select('fmcsa_last_checked')
      .or(VISIBLE_OR)
      .not('fmcsa_last_checked', 'is', null)
      .order('fmcsa_last_checked', { ascending: false })
      .limit(1)
      .maybeSingle(),
    db
      .from('companies')
      .select('fmcsa_last_checked')
      .or(VISIBLE_OR)
      .not('fmcsa_last_checked', 'is', null)
      .order('fmcsa_last_checked', { ascending: true })
      .limit(1)
      .maybeSingle(),
    exactCount(() => visible(db).not('fmcsa_last_checked', 'is', null)),
    exactCount(() => visible(db).is('fmcsa_last_checked', null)),
    exactCount(() => visible(db).gte('fmcsa_last_checked', d30)),
    exactCount(() =>
      visible(db).gte('fmcsa_last_checked', d60).lt('fmcsa_last_checked', d30)
    ),
    exactCount(() =>
      visible(db).gte('fmcsa_last_checked', d90).lt('fmcsa_last_checked', d60)
    ),
    exactCount(() =>
      visible(db).gte('fmcsa_last_checked', d365).lt('fmcsa_last_checked', d90)
    ),
    exactCount(() => visible(db).lt('fmcsa_last_checked', d365)),
  ]);

  const latestObserved = iso(
    (latestRow as { data?: { fmcsa_last_checked?: string } | null })?.data
      ?.fmcsa_last_checked
  );
  const oldestObserved = iso(
    (oldestRow as { data?: { fmcsa_last_checked?: string } | null })?.data
      ?.fmcsa_last_checked
  );
  // Latest observed refresh is a completeness clock, not a whole-cohort as-of.
  const asOf = latestObserved;

  const entityClasses =
    publishable !== null &&
    carrier !== null &&
    broker !== null &&
    dual !== null &&
    carrier + broker + dual <= publishable
      ? [
          { class: 'Carrier' as const, count: carrier },
          { class: 'Broker' as const, count: broker },
          { class: 'Carrier/Broker' as const, count: dual },
          {
            class: 'Unknown' as const,
            count: Math.max(0, publishable - carrier - broker - dual),
          },
        ]
      : null;

  const authority =
    publishable !== null &&
    active !== null &&
    notCurrent !== null &&
    unknownAuth !== null &&
    active + notCurrent + unknownAuth === publishable
      ? {
          active,
          notCurrent,
          unknown: unknownAuth,
          total: publishable,
        }
      : null;

  const rawBuckets: MoveHomeFreshnessBucket[] | null =
    b0_30 !== null &&
    b31_60 !== null &&
    b61_90 !== null &&
    b91_365 !== null &&
    b365plus !== null &&
    withoutRefresh !== null
      ? (
          [
            { id: '0-30', count: b0_30 },
            { id: '31-60', count: b31_60 },
            { id: '61-90', count: b61_90 },
            { id: '91-365', count: b91_365 },
            { id: '>365', count: b365plus },
            { id: 'unknown', count: withoutRefresh },
          ] as const
        ).map((row) => ({
          id: row.id,
          label: FRESHNESS_BUCKET_LABELS[row.id],
          count: row.count,
        }))
      : null;

  const fmcsaClock =
    publishable !== null &&
    withRefresh !== null &&
    withoutRefresh !== null &&
    latestObserved &&
    oldestObserved &&
    withRefresh + withoutRefresh === publishable
      ? {
          latestObservedRefresh: latestObserved,
          oldestObservedRefresh: oldestObserved,
          withRefreshDate: withRefresh,
          withoutRefreshDate: withoutRefresh,
          total: publishable,
          buckets: rawBuckets,
        }
      : null;

  return assembleMoveHomePayload({
    generatedAt,
    timedOut: false,
    asOf,
    publishableProfiles: publishable,
    entityClasses,
    authority,
    fmcsaClock,
    siteCoverage,
  });
}

async function loadWithTimeout(): Promise<MoveHomeIntelligencePayload> {
  const siteCoverage = buildMoveHomeSiteCoverage();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timed = new Promise<MoveHomeIntelligencePayload>((resolve) => {
      timer = setTimeout(() => {
        resolve(emptyMoveHomePayload(new Date().toISOString(), true, siteCoverage));
      }, TIMEOUT_MS);
    });
    return await Promise.race([loadLive(), timed]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function getMoveHomeIntelligenceSnapshot(): Promise<MoveHomeIntelligencePayload> {
  return unstable_cache(loadWithTimeout, ['move-home-intel-v1'], {
    revalidate: REVALIDATE_SEC,
    tags: ['move-home-intelligence'],
  })();
}
