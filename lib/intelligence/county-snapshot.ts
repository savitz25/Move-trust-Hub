/**
 * Florida County Intelligence payload — cached aggregation for canonical county routes.
 * Living numbers come from the DB. Page copy must not hardcode production counts.
 */
import 'server-only';
import { unstable_cache } from 'next/cache';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { catalogEntryForCounty } from './county-catalog';
import {
  buildCountyMoveIntelligencePayload,
  MTH_FL_COUNTY_INTEL_VERSION,
  type CountyLiveCounts,
  type CountyProgramRow,
} from './county-payload';
import { isFloridaResearchCounty } from './coverage';
import type { CountyMoveIntelligencePayload } from './payload-types';

export type { CountyMoveIntelligencePayload } from './payload-types';
export { MTH_FL_COUNTY_INTEL_VERSION, publicCountyMetrics } from './county-payload';

const REVALIDATE_SEC = 1_800;
const TIMEOUT_MS = 6_000;

type CountClient = {
  from: (table: string) => any;
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

async function loadLive(countySlug: string): Promise<CountyMoveIntelligencePayload> {
  const generatedAt = new Date().toISOString();
  const catalog = catalogEntryForCounty(countySlug);
  if (!catalog) {
    throw new Error(`Unknown Florida research county: ${countySlug}`);
  }

  const empty = (timedOut: boolean) =>
    buildCountyMoveIntelligencePayload({
      countySlug,
      generatedAt,
      timedOut,
      counts: null,
    });

  if (!isSupabaseAdminConfigured()) {
    return empty(true);
  }

  if (!catalog.sourceKey) {
    return buildCountyMoveIntelligencePayload({
      countySlug,
      generatedAt,
      timedOut: false,
      counts: { published: null, internalOnly: null, total: null, program: null },
    });
  }

  const db = createAdminClient() as unknown as CountClient;
  const sourceKey = catalog.sourceKey;

  const [published, internalOnly, total, programRes] = await Promise.all([
    exactCount(() =>
      db
        .from('provider_county_credential')
        .select('id', { count: 'exact', head: true })
        .eq('source', sourceKey)
        .eq('evidence_publication_state', 'PUBLISHED')
    ),
    exactCount(() =>
      db
        .from('provider_county_credential')
        .select('id', { count: 'exact', head: true })
        .eq('source', sourceKey)
        .eq('evidence_publication_state', 'INTERNAL_ONLY')
    ),
    exactCount(() =>
      db
        .from('provider_county_credential')
        .select('id', { count: 'exact', head: true })
        .eq('source', sourceKey)
    ),
    db
      .from('county_regulatory_program')
      .select(
        'agency_name, program_name, credential_type, source_key, source_url, retrieved_at, county_name'
      )
      .eq('source_key', sourceKey)
      .maybeSingle(),
  ]);

  const program = (programRes?.data ?? null) as CountyProgramRow | null;
  if (program?.retrieved_at) {
    program.retrieved_at = iso(program.retrieved_at);
  }

  const counts: CountyLiveCounts = {
    published,
    internalOnly,
    total,
    program,
  };

  return buildCountyMoveIntelligencePayload({
    countySlug,
    generatedAt,
    timedOut: false,
    counts,
  });
}

async function loadWithTimeout(countySlug: string): Promise<CountyMoveIntelligencePayload> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const timed = new Promise<CountyMoveIntelligencePayload>((resolve) => {
      timer = setTimeout(() => {
        resolve(
          buildCountyMoveIntelligencePayload({
            countySlug,
            generatedAt: new Date().toISOString(),
            timedOut: true,
            counts: null,
          })
        );
      }, TIMEOUT_MS);
    });
    return await Promise.race([loadLive(countySlug), timed]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function getFloridaCountyIntelligenceSnapshot(
  countySlug: string
): Promise<CountyMoveIntelligencePayload> {
  if (!isFloridaResearchCounty(countySlug)) {
    throw new Error(`County Intelligence snapshot is only defined for research counties: ${countySlug}`);
  }
  return unstable_cache(
    () => loadWithTimeout(countySlug),
    ['mth-fl-county-intel-v1', countySlug],
    {
      revalidate: REVALIDATE_SEC,
      tags: ['florida-county-intelligence', `florida-county-intelligence-${countySlug}`],
    }
  )();
}
