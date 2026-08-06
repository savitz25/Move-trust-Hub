/**
 * Migrate mover/ops data FREE (uvq) → PRO (are).
 * Never touches auth.users / identities / sessions or Save My Move tables by default.
 *
 * Env (see scripts/lib/supabase-dual-env.ts):
 *   SOURCE_SUPABASE_URL + SOURCE_SUPABASE_SERVICE_ROLE_KEY  (uvq)
 *   TARGET_SUPABASE_URL + TARGET_SUPABASE_SERVICE_ROLE_KEY  (are)
 *   or NEXT_PUBLIC_SUPABASE_* + SUPABASE_SERVICE_ROLE_KEY as TARGET
 *
 * Usage:
 *   npm run migrate:uvq-to-are -- --dry-run
 *   npm run migrate:uvq-to-are -- --confirm
 *   npm run migrate:uvq-to-are -- --schema-only   (write schema diff + print SQL path)
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import {
  loadEnvLocalFiles,
  redactUrl,
  resolveDualSupabaseConfig,
} from './lib/supabase-dual-env';

loadEnvLocalFiles();

const confirm = process.argv.includes('--confirm');
const dryRun = process.argv.includes('--dry-run') || !confirm;
const schemaOnly = process.argv.includes('--schema-only');
const PAGE = 500;

/** FK-safe order. Auth / saved_* intentionally omitted. */
const MIGRATE_TABLES: Array<{
  name: string;
  onConflict: string;
  /** Prefer these columns if select * fails schema lag */
  select?: string;
}> = [
  { name: 'companies', onConflict: 'id' },
  { name: 'company_destination_assignments', onConflict: 'id' },
  { name: 'company_suggestions', onConflict: 'id' },
  { name: 'reviews', onConflict: 'id' },
  { name: 'company_reviews', onConflict: 'id' },
  { name: 'dot_verifications', onConflict: 'id' },
  { name: 'fmcsa_refresh_runs', onConflict: 'id' },
  { name: 'fmcsa_change_log', onConflict: 'id' },
  { name: 'bbb_refresh_runs', onConflict: 'id' },
  { name: 'bbb_change_log', onConflict: 'id' },
  { name: 'suggestion_rate_limits', onConflict: 'id' },
  { name: 'review_rate_limits', onConflict: 'id' },
];

type TableProbe = {
  name: string;
  sourceExists: boolean;
  targetExists: boolean;
  sourceCount: number | null;
  targetCount: number | null;
  sourceError?: string;
  targetError?: string;
  sourceSampleKeys?: string[];
  targetSampleKeys?: string[];
};

type TableMigrateReport = {
  name: string;
  read: number;
  written: number;
  skipped: number;
  errors: string[];
  status: 'ok' | 'missing_source' | 'missing_target' | 'error' | 'dry-run';
};

function client(url: string, key: string): SupabaseClient {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function probeTable(
  sb: SupabaseClient,
  name: string
): Promise<{ exists: boolean; count: number | null; error?: string; keys?: string[] }> {
  const head = await sb.from(name).select('*', { count: 'exact', head: true });
  if (head.error) {
    const msg = head.error.message || '';
    if (/does not exist|schema cache|Could not find the table/i.test(msg)) {
      return { exists: false, count: null, error: msg };
    }
    return { exists: true, count: null, error: msg };
  }
  const sample = await sb.from(name).select('*').limit(1);
  const keys =
    sample.data?.[0] && typeof sample.data[0] === 'object'
      ? Object.keys(sample.data[0] as object)
      : [];
  return { exists: true, count: head.count ?? 0, keys };
}

async function fetchAllRows(
  sb: SupabaseClient,
  table: string
): Promise<{ rows: Record<string, unknown>[]; error?: string }> {
  const rows: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from(table)
      .select('*')
      .range(from, from + PAGE - 1);
    if (error) {
      return { rows, error: error.message };
    }
    if (!data?.length) break;
    rows.push(...(data as Record<string, unknown>[]));
    if (data.length < PAGE) break;
  }
  return { rows };
}

/** Discover target columns via PostgREST OpenAPI (handles empty tables). */
async function fetchTargetColumns(
  baseUrl: string,
  serviceKey: string,
  table: string
): Promise<Set<string> | null> {
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/rest/v1/`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Accept: 'application/openapi+json',
      },
    });
    if (!res.ok) return null;
    const spec = (await res.json()) as {
      definitions?: Record<string, { properties?: Record<string, unknown> }>;
      components?: { schemas?: Record<string, { properties?: Record<string, unknown> }> };
    };
    const props =
      spec.definitions?.[table]?.properties ||
      spec.components?.schemas?.[table]?.properties ||
      // PostgREST sometimes nests under paths
      null;
    if (props && typeof props === 'object') {
      return new Set(Object.keys(props));
    }
    // Fallback: scan definitions for table name variants
    const defs = spec.definitions || spec.components?.schemas || {};
    for (const [name, def] of Object.entries(defs)) {
      if (name === table || name.endsWith(`.${table}`) || name === `${table}s`) {
        if (def.properties) return new Set(Object.keys(def.properties));
      }
    }
  } catch {
    /* ignore */
  }
  return null;
}

function projectRows(
  rows: Record<string, unknown>[],
  allowed: Set<string> | null
): Record<string, unknown>[] {
  return rows.map((r) => {
    const o: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(r)) {
      if (v === undefined) continue;
      if (allowed && !allowed.has(k)) continue;
      o[k] = v;
    }
    return o;
  });
}

function missingColumnFromError(message: string): string | null {
  // Could not find the 'entity_type' column of 'companies'
  const m = message.match(/Could not find the '([^']+)' column/i);
  return m?.[1] ?? null;
}

async function upsertBatches(
  sb: SupabaseClient,
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
  allowedColumns: Set<string> | null
): Promise<{ written: number; errors: string[]; allowed: Set<string> | null }> {
  let written = 0;
  const errors: string[] = [];
  let allowed = allowedColumns ? new Set(allowedColumns) : null;

  for (let i = 0; i < rows.length; i += PAGE) {
    let batch = projectRows(rows.slice(i, i + PAGE), allowed);
    // eslint-disable-next-line no-constant-condition
    for (let attempt = 0; attempt < 12; attempt++) {
      const { error, count } = await sb
        .from(table)
        .upsert(batch as never, { onConflict, ignoreDuplicates: false, count: 'exact' });
      if (!error) {
        written += count ?? batch.length;
        break;
      }
      const missing = missingColumnFromError(error.message);
      if (missing) {
        if (!allowed) {
          // Start from keys present in this batch, drop missing
          allowed = new Set(batch.flatMap((r) => Object.keys(r)));
        }
        allowed.delete(missing);
        batch = projectRows(rows.slice(i, i + PAGE), allowed);
        console.log(`  strip missing column: ${table}.${missing}`);
        continue;
      }
      // Retry row-by-row
      for (const row of batch) {
        let r = { ...row };
        for (let ra = 0; ra < 8; ra++) {
          const one = await sb.from(table).upsert(r as never, { onConflict });
          if (!one.error) {
            written += 1;
            break;
          }
          const col = missingColumnFromError(one.error.message);
          if (col) {
            delete r[col];
            if (allowed) allowed.delete(col);
            continue;
          }
          errors.push(`${table}/${String(row.id ?? row.slug ?? '?')}: ${one.error.message}`);
          break;
        }
      }
      break;
    }
  }
  return { written, errors, allowed };
}

async function main() {
  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });

  let cfg;
  try {
    cfg = resolveDualSupabaseConfig();
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  console.log('── Supabase migrate FREE (uvq) → PRO (are) ──');
  console.log(`Mode: ${schemaOnly ? 'SCHEMA ONLY' : dryRun ? 'DRY-RUN' : 'LIVE CONFIRM'}`);
  console.log(`SOURCE: ${redactUrl(cfg.sourceUrl)} (${cfg.sourceRef})`);
  console.log(`TARGET: ${redactUrl(cfg.targetUrl)} (${cfg.targetRef})`);
  console.log('');

  const source = client(cfg.sourceUrl, cfg.sourceKey);
  const target = client(cfg.targetUrl, cfg.targetKey);

  // Phase 1 — schema probe
  const probes: TableProbe[] = [];
  for (const t of MIGRATE_TABLES) {
    const [s, d] = await Promise.all([
      probeTable(source, t.name),
      probeTable(target, t.name),
    ]);
    probes.push({
      name: t.name,
      sourceExists: s.exists,
      targetExists: d.exists,
      sourceCount: s.count,
      targetCount: d.count,
      sourceError: s.error,
      targetError: d.error,
      sourceSampleKeys: s.keys,
      targetSampleKeys: d.keys,
    });
    console.log(
      `  ${t.name.padEnd(36)} src=${s.exists ? String(s.count ?? '?') : 'MISSING'}  tgt=${d.exists ? String(d.count ?? '?') : 'MISSING'}`
    );
  }

  const schemaPath = resolve(outDir, 'supabase-schema-diff-uvq-are.json');
  const schemaSqlPath = resolve(
    process.cwd(),
    'supabase/migrations/20260806180000_are_mover_ops_schema_parity.sql'
  );
  writeFileSync(
    schemaPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        sourceRef: cfg.sourceRef,
        targetRef: cfg.targetRef,
        probes,
        schemaParitySql: existsSync(schemaSqlPath)
          ? 'supabase/migrations/20260806180000_are_mover_ops_schema_parity.sql'
          : null,
        note:
          'If TARGET tables are MISSING, run the schema parity SQL in Supabase Dashboard → SQL Editor on are, then re-run --confirm.',
      },
      null,
      2
    )
  );
  console.log(`\nSchema diff: ${schemaPath}`);
  if (existsSync(schemaSqlPath)) {
    console.log(`Schema SQL:  ${schemaSqlPath}`);
    console.log(
      '  Apply on TARGET (are) SQL Editor if any mover tables are MISSING before data migrate.'
    );
  }

  if (schemaOnly) {
    console.log('\nSchema-only mode — no data migration.');
    return;
  }

  const missingOnTarget = probes.filter((p) => p.sourceExists && !p.targetExists);
  if (missingOnTarget.length && !dryRun) {
    console.error(
      '\nFATAL: TARGET is missing tables that exist on SOURCE:\n  ' +
        missingOnTarget.map((p) => p.name).join(', ') +
        '\nApply supabase/migrations/20260806180000_are_mover_ops_schema_parity.sql on are first.'
    );
    process.exit(1);
  }

  // Phase 2 — data
  const reports: TableMigrateReport[] = [];
  for (const t of MIGRATE_TABLES) {
    const probe = probes.find((p) => p.name === t.name)!;
    if (!probe.sourceExists) {
      reports.push({
        name: t.name,
        read: 0,
        written: 0,
        skipped: 0,
        errors: [],
        status: 'missing_source',
      });
      continue;
    }
    if (!probe.targetExists) {
      reports.push({
        name: t.name,
        read: probe.sourceCount ?? 0,
        written: 0,
        skipped: probe.sourceCount ?? 0,
        errors: ['target table missing'],
        status: 'missing_target',
      });
      continue;
    }

    console.log(`\n▶ ${t.name} (source count ≈ ${probe.sourceCount ?? '?'})`);
    const { rows, error } = await fetchAllRows(source, t.name);
    if (error) {
      reports.push({
        name: t.name,
        read: rows.length,
        written: 0,
        skipped: 0,
        errors: [error],
        status: 'error',
      });
      console.log(`  ERROR read: ${error}`);
      continue;
    }
    console.log(`  read ${rows.length} rows`);

    if (dryRun) {
      reports.push({
        name: t.name,
        read: rows.length,
        written: 0,
        skipped: rows.length,
        errors: [],
        status: 'dry-run',
      });
      console.log(`  dry-run: would upsert ${rows.length}`);
      continue;
    }

    let allowed = await fetchTargetColumns(cfg.targetUrl, cfg.targetKey, t.name);
    if (allowed) {
      console.log(`  target columns: ${allowed.size} (from OpenAPI)`);
    } else if (probe.targetSampleKeys?.length) {
      allowed = new Set(probe.targetSampleKeys);
      console.log(`  target columns: ${allowed.size} (from sample row)`);
    } else {
      console.log('  target columns: unknown — will strip on error');
    }

    const { written, errors } = await upsertBatches(
      target,
      t.name,
      rows,
      t.onConflict,
      allowed
    );
    reports.push({
      name: t.name,
      read: rows.length,
      written,
      skipped: Math.max(0, rows.length - written),
      errors: errors.slice(0, 50),
      status: errors.length ? 'error' : 'ok',
    });
    console.log(`  written≈${written} errors=${errors.length}`);
    if (errors[0]) console.log(`  first error: ${errors[0]}`);
  }

  // Post counts
  const post: Record<string, { source: number | null; target: number | null }> = {};
  for (const t of MIGRATE_TABLES) {
    const [s, d] = await Promise.all([
      probeTable(source, t.name),
      probeTable(target, t.name),
    ]);
    post[t.name] = { source: s.count, target: d.count };
  }

  const reportPath = resolve(outDir, 'supabase-migrate-uvq-to-are.json');
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        mode: dryRun ? 'dry-run' : 'confirm',
        sourceRef: cfg.sourceRef,
        targetRef: cfg.targetRef,
        schemaDiffPath: schemaPath,
        reports,
        postCounts: post,
        authUntouched: true,
        savedMyMoveUntouched: true,
      },
      null,
      2
    )
  );

  console.log('\n── Summary ──');
  for (const r of reports) {
    console.log(
      `  ${r.name.padEnd(36)} status=${r.status} read=${r.read} written=${r.written} errors=${r.errors.length}`
    );
  }
  console.log(`\nReport: ${reportPath}`);
  console.log(
    '\nNext (after confirm):\n' +
      '  npm run backfill:local-mover-counties -- --confirm\n' +
      '  npm run audit:county-local-visibility -- --state=florida --county=broward'
  );

  if (!dryRun) {
    const companies = post.companies;
    if ((companies?.target ?? 0) === 0 && (companies?.source ?? 0) > 0) {
      console.error('\nWARNING: TARGET companies still 0 after migrate — check errors above.');
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
