/**
 * Audit eligible Supabase locals vs static county page seed merge.
 *
 *   npm run audit:county-local-visibility -- --state=florida --county=broward
 *   npm run audit:county-local-visibility -- --all-states
 */
import { createClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { getMoversForCounty } from '../lib/local-movers/index';
import { segmentCountyMovers } from '../lib/local-movers/segment-county-movers';
import { getCountiesForState } from '../lib/local-movers/geography/index';
import { localStates } from '../lib/local-movers/states';
import { normalizeSelectedCounties } from '../lib/suggestions/service-scope';
loadEnvLocal();

const allStates = process.argv.includes('--all-states');
const stateArg =
  process.argv.find((a) => a.startsWith('--state='))?.split('=')[1] ??
  (allStates ? null : 'florida');
const countyArg =
  process.argv.find((a) => a.startsWith('--county='))?.split('=')[1] ?? null;

function requireKeys() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    '';
  if (
    !url ||
    url.includes('placeholder') ||
    url.includes('<') ||
    !url.includes('supabase.co') ||
    !key ||
    key.startsWith('<') ||
    key.length < 40
  ) {
    console.error(
      'FATAL: need real Supabase URL + key (anon or service role).\n' +
        '  vercel env pull .env.local\n' +
        '  Values must not include angle brackets or nested https:// prefixes.'
    );
    process.exit(1);
  }
  return { url, key };
}

async function main() {
  const { url, key } = requireKeys();
  const client = createClient(url, key, { auth: { persistSession: false } });

  const selectAttempts = [
    'id, slug, name, headquarters, service_scope, coverage_counties, is_verified, overall_rating, review_count, usdot_number, mc_number, fmcsa_safety_rating, bbb_rating, services, specialties, last_updated',
    'id, slug, name, headquarters, service_scope, coverage_counties, is_verified, overall_rating, review_count, last_updated',
    'id, slug, name, headquarters, service_scope, coverage_counties, is_verified',
  ];

  let companies: Array<Record<string, unknown>> | null = null;
  let lastError: string | null = null;
  for (const cols of selectAttempts) {
    const { data, error } = await client
      .from('companies')
      .select(cols)
      .eq('service_scope', 'intrastate')
      .limit(5000);
    if (!error) {
      companies = (data ?? []) as Array<Record<string, unknown>>;
      lastError = null;
      break;
    }
    lastError = error.message;
  }

  if (lastError || !companies) {
    console.error('companies query failed:', lastError);
    process.exit(1);
  }

  const locals = companies ?? [];
  const byState: Record<
    string,
    { companies: number; withCoverage: number; withoutCoverage: number }
  > = {};

  for (const c of locals) {
    const counties = normalizeSelectedCounties(c.coverage_counties);
    const stateSlug = counties[0]?.stateSlug || 'unknown';
    if (!byState[stateSlug]) {
      byState[stateSlug] = { companies: 0, withCoverage: 0, withoutCoverage: 0 };
    }
    byState[stateSlug].companies++;
    if (counties.length) byState[stateSlug].withCoverage++;
    else byState[stateSlug].withoutCoverage++;
  }

  type Sample = {
    stateSlug: string;
    countySlug: string;
    seedMovers: number;
    seedLocalSegment: number;
    supabaseEligible: number;
    gap: number;
  };

  const samples: Sample[] = [];
  const proofCounties: Array<{ state: string; county: string }> = countyArg
    ? [{ state: stateArg!, county: countyArg }]
    : allStates
      ? localStates.flatMap((s) =>
          getCountiesForState(s.slug)
            .slice(0, 3)
            .map((c) => ({ state: s.slug, county: c.slug }))
        )
      : [
          { state: 'florida', county: 'broward' },
          { state: 'florida', county: 'miami-dade' },
          { state: 'florida', county: 'orange' },
          { state: 'new-jersey', county: 'bergen' },
          { state: 'new-jersey', county: 'essex' },
          { state: 'texas', county: 'harris' },
          { state: 'texas', county: 'travis' },
          { state: 'california', county: 'los-angeles' },
          { state: 'california', county: 'orange' },
          { state: 'new-york', county: 'kings' },
          { state: 'new-york', county: 'nassau' },
          { state: 'georgia', county: 'fulton' },
          { state: 'illinois', county: 'cook' },
          { state: 'washington', county: 'king' },
        ];

  for (const { state, county } of proofCounties) {
    if (stateArg && !allStates && state !== stateArg && !countyArg) continue;
    const base = getMoversForCounty(state, county);
    if (!base) continue;
    const segs = segmentCountyMovers(base.movers, base.county);
    const eligible = locals.filter((c) => {
      const counties = normalizeSelectedCounties(c.coverage_counties);
      return counties.some((x) => x.stateSlug === state && x.countySlug === county);
    });
    samples.push({
      stateSlug: state,
      countySlug: county,
      seedMovers: base.movers.length,
      seedLocalSegment: segs.localInState.length,
      supabaseEligible: eligible.length,
      gap: Math.max(0, eligible.length - segs.localInState.length),
    });
  }

  const rca =
    'RCA: County pages merge Supabase locals only via getApprovedMoversForCounty, which previously required service-role bulk load (often empty/timeout) and approveSuggestionToCompany never wrote company_destination_assignments ΓÇö only coverage_counties JSON. Static getMoversForCounty() never queries Supabase.';

  const out = {
    generatedAt: new Date().toISOString(),
    rca,
    totals: {
      intrastateCompanies: locals.length,
      withCoverage: locals.filter(
        (c) => normalizeSelectedCounties(c.coverage_counties).length > 0
      ).length,
      withoutCoverage: locals.filter(
        (c) => normalizeSelectedCounties(c.coverage_counties).length === 0
      ).length,
    },
    byState,
    samples,
    topGaps: [...samples].sort((a, b) => b.gap - a.gap).slice(0, 20),
  };

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const path = resolve(outDir, 'local-movers-county-gap-national.json');
  writeFileSync(path, JSON.stringify(out, null, 2));

  console.log(JSON.stringify(out, null, 2));
  console.log(`\nWrote ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
