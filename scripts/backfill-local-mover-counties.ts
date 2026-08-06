/**
 * Backfill coverage_counties + destination assignments for published local movers.
 *
 *   npm run backfill:local-mover-counties -- --dry-run
 *   npm run backfill:local-mover-counties -- --confirm
 *
 * Requires: vercel env pull .env.local (real Supabase service role)
 */
import { createClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { assignSelectedCounties } from '../lib/suggestions/assign-selected-counties';
import {
  normalizeSelectedCounties,
  type SelectedCounty,
} from '../lib/suggestions/service-scope';
import { resolveCityToCounty } from '../lib/local-movers/resolve-city-to-county';
import { localStates } from '../lib/local-movers/states';

loadEnvLocal();

const confirm = process.argv.includes('--confirm');
const dryRun = !confirm;

function requireKeys() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || '';
  if (
    !url ||
    url.includes('placeholder') ||
    url.includes('<project') ||
    !key ||
    key.startsWith('<') ||
    key.length < 40
  ) {
    console.error(
      'FATAL: need real NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.\n' +
        '  vercel env pull .env.local'
    );
    process.exit(1);
  }
  return { url, key };
}

async function main() {
  const { url, key } = requireKeys();
  const admin = createClient(url, key, { auth: { persistSession: false } });

  console.log(dryRun ? 'ΓöÇΓöÇ DRY-RUN backfill ΓöÇΓöÇ' : 'ΓöÇΓöÇ LIVE backfill ΓöÇΓöÇ');

  const { data: rows, error } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, service_scope, coverage_counties, is_verified'
    )
    .eq('service_scope', 'intrastate')
    .limit(5000);

  if (error) {
    console.error('Query failed:', error.message);
    process.exit(1);
  }

  const companies = rows ?? [];
  console.log(`Intrastate companies: ${companies.length}`);

  const byState: Record<string, { updated: number; unmapped: number; ok: number }> =
    {};
  const report: Array<Record<string, unknown>> = [];
  let updated = 0;
  let unmapped = 0;
  let alreadyOk = 0;

  for (const row of companies) {
    let counties = normalizeSelectedCounties(row.coverage_counties);
    let derived = false;

    if (!counties.length) {
      const resolved = resolveCityToCounty({ headquarters: row.headquarters });
      if (resolved) {
        counties = [resolved];
        derived = true;
      }
    }

    const primary = counties[0];
    const stateSlug = primary?.stateSlug || 'unknown';
    if (!byState[stateSlug]) byState[stateSlug] = { updated: 0, unmapped: 0, ok: 0 };

    if (!counties.length) {
      unmapped++;
      byState[stateSlug].unmapped++;
      report.push({
        slug: row.slug,
        status: 'unmapped',
        headquarters: row.headquarters,
      });
      continue;
    }

    const needsWrite =
      derived ||
      normalizeSelectedCounties(row.coverage_counties).length !== counties.length;

    if (!needsWrite && !derived) {
      // Still ensure assignments exist
    }

    if (dryRun) {
      report.push({
        slug: row.slug,
        status: derived ? 'would_derive' : 'would_ensure_assign',
        counties,
      });
      if (derived) {
        updated++;
        byState[stateSlug].updated++;
      } else {
        alreadyOk++;
        byState[stateSlug].ok++;
      }
      continue;
    }

    const patch: Record<string, unknown> = {
      coverage_counties: counties,
      service_scope: 'intrastate',
      is_verified: true,
      last_updated: new Date().toISOString().slice(0, 10),
    };

    const { error: upErr } = await admin
      .from('companies')
      .update(patch)
      .eq('id', row.id);
    if (upErr) {
      report.push({ slug: row.slug, status: 'update_error', error: upErr.message });
      continue;
    }

    try {
      await assignSelectedCounties({
        companyId: String(row.id),
        companySlug: row.slug,
        headquarters: row.headquarters,
        counties: counties as SelectedCounty[],
      });
    } catch (err) {
      report.push({
        slug: row.slug,
        status: 'assign_error',
        error: err instanceof Error ? err.message : String(err),
      });
      continue;
    }

    updated++;
    byState[stateSlug].updated++;
    report.push({ slug: row.slug, status: 'updated', counties, derived });
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const path = resolve(outDir, 'local-mover-county-backfill.json');
  writeFileSync(
    path,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        mode: dryRun ? 'dry-run' : 'confirm',
        totals: { companies: companies.length, updated, unmapped, alreadyOk },
        byState,
        report,
        states: localStates.map((s) => s.slug),
      },
      null,
      2
    )
  );

  console.log(`Updated/would-update: ${updated}`);
  console.log(`Unmapped: ${unmapped}`);
  console.log(`Already OK: ${alreadyOk}`);
  console.log(`Report: ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
