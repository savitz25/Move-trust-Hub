/**
 * Backfill service_scope + coverage_counties for local movers.
 *
 * Sources of "local" identity (nationwide):
 *  1) companies.service_scope = 'intrastate'
 *  2) company_destination_assignments with local sources
 *     (local_intrastate_selection, onboarding_coverage, etc.)
 *
 *   npm run backfill:local-mover-counties -- --dry-run
 *   npm run backfill:local-mover-counties -- --confirm
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import {
  normalizeSelectedCounties,
  type SelectedCounty,
} from '../lib/suggestions/service-scope';
import { resolveCityToCounty } from '../lib/local-movers/resolve-city-to-county';
import { localStates } from '../lib/local-movers/states';

loadEnvLocal();

const confirm = process.argv.includes('--confirm');
const dryRun = !confirm;
const PAGE = 1000;

const LOCAL_ASSIGNMENT_SOURCES = new Set([
  'local_intrastate_selection',
  'onboarding_coverage',
  'onboarding_approval', // HQ-based local placement from approve path
]);

function requireKeys() {
  // Prefer PRO/are explicitly if set
  const url = (
    process.env.TARGET_SUPABASE_URL ||
    process.env.PRO_SUPABASE_URL ||
    process.env.ARE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    ''
  ).trim();
  const key = (
    process.env.TARGET_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.PRO_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ARE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ''
  ).trim();

  const urlOk =
    Boolean(url) &&
    url.includes('supabase.co') &&
    !url.includes('placeholder') &&
    !url.includes('<');
  const keyOk =
    Boolean(key) &&
    !key.startsWith('<') &&
    (key.startsWith('sb_secret_') ? key.length >= 30 : key.length > 80);

  if (!urlOk || !keyOk) {
    console.error(
      'FATAL: need real Supabase URL + service role for TARGET (are).\n' +
        '  NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (are project)'
    );
    process.exit(1);
  }
  return { url, key };
}

async function fetchAll(
  admin: SupabaseClient,
  table: string,
  select: string,
  filter?: (q: ReturnType<SupabaseClient['from']>) => unknown
): Promise<Record<string, unknown>[]> {
  const rows: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = admin.from(table).select(select).range(from, from + PAGE - 1);
    if (filter) q = filter(q as never) as typeof q;
    const { data, error } = await q;
    if (error) throw new Error(`${table}: ${error.message}`);
    if (!data?.length) break;
    rows.push(...(data as Record<string, unknown>[]));
    if (data.length < PAGE) break;
  }
  return rows;
}

async function main() {
  const { url, key } = requireKeys();
  const admin = createClient(url, key, { auth: { persistSession: false } });

  console.log(dryRun ? '── DRY-RUN backfill ──' : '── LIVE backfill ──');
  console.log(`Target: ${url.replace(/https:\/\/([^.]+)\..*/, '$1')}`);

  // 1) Load local-oriented assignments and group by company
  let assignmentRows: Record<string, unknown>[] = [];
  try {
    assignmentRows = await fetchAll(
      admin,
      'company_destination_assignments',
      'company_id, company_slug, state_slug, county_slug, source'
    );
  } catch (err) {
    console.error(
      'Assignments load failed:',
      err instanceof Error ? err.message : String(err)
    );
    process.exit(1);
  }

  const countiesByCompany = new Map<string, SelectedCounty[]>();
  const localCompanyIds = new Set<string>();

  for (const a of assignmentRows) {
    const companyId = String(a.company_id || '');
    const stateSlug = String(a.state_slug || '').toLowerCase();
    const countySlug = String(a.county_slug || '').toLowerCase();
    const source = String(a.source || '');
    if (!companyId || !stateSlug || !countySlug) continue;

    // Prefer explicit local sources; still collect all counties for those companies later
    if (LOCAL_ASSIGNMENT_SOURCES.has(source)) {
      localCompanyIds.add(companyId);
    }

    const list = countiesByCompany.get(companyId) ?? [];
    if (!list.some((c) => c.stateSlug === stateSlug && c.countySlug === countySlug)) {
      list.push({ stateSlug, countySlug });
    }
    countiesByCompany.set(companyId, list);
  }

  // Companies that only have destination hub assignments (interstate) should NOT all become local.
  // Only mark local when they have at least one local_* source assignment.
  console.log(`Assignment rows: ${assignmentRows.length}`);
  console.log(`Companies with local assignment sources: ${localCompanyIds.size}`);

  // 2) Also include companies already tagged intrastate
  let intrastateRows: Record<string, unknown>[] = [];
  try {
    const { data, error } = await admin
      .from('companies')
      .select('id, slug, name, headquarters, service_scope, coverage_counties, is_verified')
      .eq('service_scope', 'intrastate')
      .limit(5000);
    if (error) {
      if (!/service_scope|does not exist/i.test(error.message)) {
        throw new Error(error.message);
      }
      console.log('service_scope column missing — assignment-only mode');
    } else {
      intrastateRows = (data ?? []) as Record<string, unknown>[];
    }
  } catch (err) {
    console.warn(
      'Intrastate query skipped:',
      err instanceof Error ? err.message : String(err)
    );
  }

  for (const row of intrastateRows) {
    localCompanyIds.add(String(row.id));
  }

  // 3) Load company rows for all local candidates
  const ids = [...localCompanyIds];
  const companiesById = new Map<string, Record<string, unknown>>();

  for (let i = 0; i < ids.length; i += 100) {
    const chunk = ids.slice(i, i + 100);
    const { data, error } = await admin
      .from('companies')
      .select('id, slug, name, headquarters, service_scope, coverage_counties, is_verified')
      .in('id', chunk);
    if (error) {
      console.error('Companies load failed:', error.message);
      process.exit(1);
    }
    for (const row of data ?? []) {
      companiesById.set(String(row.id), row as Record<string, unknown>);
    }
  }

  // Merge pre-loaded intrastate rows that might not be in assignment set
  for (const row of intrastateRows) {
    if (!companiesById.has(String(row.id))) {
      companiesById.set(String(row.id), row);
    }
  }

  console.log(`Local company rows loaded: ${companiesById.size}`);

  const byState: Record<string, { updated: number; unmapped: number; ok: number }> =
    {};
  const report: Array<Record<string, unknown>> = [];
  let updated = 0;
  let unmapped = 0;
  let alreadyOk = 0;
  let errors = 0;

  for (const [companyId, row] of companiesById) {
    const slug = String(row.slug || companyId);
    let counties = countiesByCompany.get(companyId) ?? [];
    counties = [...counties];

    // Merge existing coverage_counties JSON
    const existing = normalizeSelectedCounties(row.coverage_counties);
    for (const c of existing) {
      if (!counties.some((x) => x.stateSlug === c.stateSlug && x.countySlug === c.countySlug)) {
        counties.push(c);
      }
    }

    let derived = false;
    if (!counties.length) {
      const resolved = resolveCityToCounty({
        headquarters: String(row.headquarters || ''),
      });
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
        slug,
        status: 'unmapped',
        headquarters: row.headquarters,
      });
      continue;
    }

    const alreadyIntrastate = row.service_scope === 'intrastate';
    const existingNorm = normalizeSelectedCounties(row.coverage_counties);
    const coverageSame =
      existingNorm.length === counties.length &&
      counties.every((c) =>
        existingNorm.some(
          (e) => e.stateSlug === c.stateSlug && e.countySlug === c.countySlug
        )
      );

    if (alreadyIntrastate && coverageSame && row.is_verified) {
      alreadyOk++;
      byState[stateSlug].ok++;
      report.push({ slug, status: 'already_ok', counties });
      continue;
    }

    if (dryRun) {
      updated++;
      byState[stateSlug].updated++;
      report.push({
        slug,
        status: derived ? 'would_derive' : 'would_mark_intrastate',
        counties,
      });
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
      .eq('id', companyId);

    if (upErr) {
      errors++;
      report.push({ slug, status: 'update_error', error: upErr.message });
      continue;
    }

    // Ensure assignment rows exist for each county (idempotent upsert)
    for (const c of counties) {
      const { error: aErr } = await admin.from('company_destination_assignments').upsert(
        {
          company_id: companyId,
          company_slug: slug,
          state_slug: c.stateSlug,
          county_slug: c.countySlug,
          headquarters: row.headquarters ?? null,
          source: 'local_intrastate_selection',
          updated_at: new Date().toISOString(),
        } as never,
        { onConflict: 'company_id,state_slug,county_slug' }
      );
      if (aErr) {
        // Unique constraint name may differ — try without onConflict
        const retry = await admin.from('company_destination_assignments').upsert({
          company_id: companyId,
          company_slug: slug,
          state_slug: c.stateSlug,
          county_slug: c.countySlug,
          headquarters: row.headquarters ?? null,
          source: 'local_intrastate_selection',
          updated_at: new Date().toISOString(),
        } as never);
        if (retry.error) {
          report.push({
            slug,
            status: 'assign_warn',
            county: `${c.stateSlug}/${c.countySlug}`,
            error: retry.error.message,
          });
        }
      }
    }

    updated++;
    byState[stateSlug].updated++;
    report.push({ slug, status: 'updated', counties, derived });
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
        targetUrl: url,
        totals: {
          localCandidates: companiesById.size,
          updated,
          unmapped,
          alreadyOk,
          errors,
        },
        byState,
        report,
        states: localStates.map((s) => s.slug),
      },
      null,
      2
    )
  );

  console.log(`Local candidates: ${companiesById.size}`);
  console.log(`Updated: ${updated}`);
  console.log(`Already OK: ${alreadyOk}`);
  console.log(`Unmapped: ${unmapped}`);
  console.log(`Errors: ${errors}`);
  console.log(`Report: ${path}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
