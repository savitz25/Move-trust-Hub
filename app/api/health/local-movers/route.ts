import { NextResponse } from 'next/server';
import { getAllApprovedMoversByCountyForHealth } from '@/lib/local-movers/approved-county-movers';
import { getMoversForCountyAsync } from '@/lib/local-movers/get-movers-for-county-async';
import {
  CANONICAL_SUPABASE_PROJECT_REF,
  extractSupabaseProjectRef,
  FORBIDDEN_SUPABASE_PROJECT_REF,
  isForbiddenSupabaseUrl,
} from '@/lib/supabase/canonical-project';
import {
  getSupabaseUrl,
  isSupabaseAdminConfigured,
  isSupabaseConfigured,
} from '@/lib/supabase/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SAMPLE_COUNTIES: Array<{ state: string; county: string }> = [
  { state: 'florida', county: 'broward' },
  { state: 'florida', county: 'miami-dade' },
  { state: 'florida', county: 'baker' },
  { state: 'texas', county: 'harris' },
  { state: 'california', county: 'los-angeles' },
  { state: 'new-york', county: 'kings' },
];

/**
 * GET /api/health/local-movers
 * Ops visibility: which Supabase project, sample county counts, mover source mode.
 */
export async function GET() {
  const url = getSupabaseUrl();
  const ref = extractSupabaseProjectRef(url);
  const forbidden = isForbiddenSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);

  const samples: Array<{
    state: string;
    county: string;
    total: number;
    approved: number;
    catalog: number;
    sourceMode: string;
    localOnly: number;
  }> = [];

  for (const { state, county } of SAMPLE_COUNTIES) {
    try {
      const result = await getMoversForCountyAsync(state, county);
      samples.push({
        state,
        county,
        total: result?.movers.length ?? 0,
        approved: result?.approvedCount ?? 0,
        catalog: result?.catalogCount ?? 0,
        sourceMode: result?.sourceMode ?? 'missing',
        localOnly: result?.movers.filter((m) => m.isLocalOnly).length ?? 0,
      });
    } catch (err) {
      samples.push({
        state,
        county,
        total: 0,
        approved: 0,
        catalog: 0,
        sourceMode: `error:${err instanceof Error ? err.message : String(err)}`,
        localOnly: 0,
      });
    }
  }

  const bulk = await getAllApprovedMoversByCountyForHealth();

  const flCounts = samples
    .filter((s) => s.state === 'florida')
    .map((s) => s.total);
  const flUniform =
    flCounts.length >= 2 && flCounts.every((n) => n === flCounts[0] && n > 0);

  const ok =
    !forbidden &&
    ref === CANONICAL_SUPABASE_PROJECT_REF &&
    isSupabaseConfigured() &&
    !flUniform &&
    !bulk.error;

  return NextResponse.json(
    {
      ok,
      at: new Date().toISOString(),
      supabase: {
        configured: isSupabaseConfigured(),
        adminConfigured: isSupabaseAdminConfigured(),
        projectRef: ref,
        canonicalRef: CANONICAL_SUPABASE_PROJECT_REF,
        forbiddenRef: FORBIDDEN_SUPABASE_PROJECT_REF,
        isForbidden: forbidden,
        isCanonical: ref === CANONICAL_SUPABASE_PROJECT_REF,
      },
      bulkApproved: bulk,
      samples,
      checks: {
        flCountyCountsDiffer: !flUniform,
        noForbiddenProject: !forbidden,
        canonicalProject: ref === CANONICAL_SUPABASE_PROJECT_REF,
      },
    },
    { status: ok ? 200 : 503 }
  );
}
