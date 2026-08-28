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
import { MOVE_HOME_INTEL_VERSION, type MoveHomeIntelligencePayload } from './home-types';

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
  const generatedAt = new Date().toISOString();
  const siteCoverage = buildMoveHomeSiteCoverage();

  if (!isSupabaseAdminConfigured()) {
    return emptyMoveHomePayload(generatedAt, true, siteCoverage);
  }

  const db = createAdminClient() as unknown as CountClient;

  const [
    publishable,
    active,
    notCurrent,
    unknownAuth,
    carrier,
    broker,
    dual,
    asOfRow,
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
  ]);

  const asOf = iso(
    (asOfRow as { data?: { fmcsa_last_checked?: string } | null })?.data
      ?.fmcsa_last_checked
  );

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

  return assembleMoveHomePayload({
    generatedAt,
    timedOut: false,
    asOf,
    publishableProfiles: publishable,
    entityClasses,
    authority,
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
