/**
 * Remaining FREE (uvq) → PRO (are) table parity (ops / lenders / reviews / rate limits).
 *
 * npm run migrate:uvq-to-are:remaining -- --dry-run
 * npm run migrate:uvq-to-are:remaining -- --confirm
 * npm run migrate:uvq-to-are:remaining -- --confirm --include-quotes
 *
 * Never touches auth.* or Save My Move user tables.
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
const includeQuotes = process.argv.includes('--include-quotes');
const PAGE = 400;

type TableSpec = {
  name: string;
  onConflict: string;
  /** Skip if true unless --include-quotes */
  quotesOnly?: boolean;
  /** Parent table that must contain FK ids */
  fkParent?: { table: string; childKey: string; parentKey?: string };
  /** Skip rows when parent missing */
  skipOrphans?: boolean;
  /** View — recreate only, no upsert */
  isView?: boolean;
};

/**
 * Move-Trust-Hub only. NEVER include lenders / lender_onboarding_* —
 * those belong on Lender-Trust-Hub (hidcrbexurginnuqgjpx), not are.
 */
const TABLES: TableSpec[] = [
  { name: 'moving_companies', onConflict: 'id' },
  {
    name: 'company_reviews',
    onConflict: 'id',
    fkParent: { table: 'moving_companies', childKey: 'company_id' },
    skipOrphans: true,
  },
  { name: 'company_verification_backfill_runs', onConflict: 'id' },
  // company_verification_status is a VIEW — SQL only
  { name: 'bbb_refresh_runs', onConflict: 'id' },
  { name: 'bbb_change_log', onConflict: 'id' },
  { name: 'fmcsa_refresh_runs', onConflict: 'id' },
  { name: 'fmcsa_change_log', onConflict: 'id' },
  { name: 'magic_link_rate_limits', onConflict: 'email_hash' },
  { name: 'magic_link_ip_rate_limits', onConflict: 'ip_hash' },
  {
    name: 'my_move_activity_events',
    onConflict: 'id',
    // user_id must exist in TARGET auth.users — filter at insert time
    skipOrphans: true,
    fkParent: { table: 'user_profiles', childKey: 'user_id', parentKey: 'id' },
  },
  { name: 'quote_requests', onConflict: 'id', quotesOnly: true },
  { name: 'portal_claim_rate_limits', onConflict: 'id' },
  { name: 'providers', onConflict: 'id' },
];

/** Explicit never-migrate list (documented + logged). */
const NEVER_ON_ARE = [
  'lenders',
  'lender_onboarding_submissions',
  'lender_onboarding_rate_limits',
] as const;

type Report = {
  name: string;
  source_count: number;
  target_before: number | null;
  target_after: number | null;
  inserted_or_upserted: number;
  skipped: number;
  errors: string[];
  status: string;
};

function client(url: string, key: string) {
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function count(sb: SupabaseClient, table: string): Promise<number | null> {
  const r = await sb.from(table).select('*', { count: 'exact', head: true });
  if (r.error) return null;
  return r.count ?? 0;
}

async function tableExists(sb: SupabaseClient, table: string): Promise<boolean> {
  const r = await sb.from(table).select('*', { count: 'exact', head: true });
  if (!r.error) return true;
  return !/does not exist|schema cache|Could not find the table/i.test(r.error.message);
}

async function fetchAll(sb: SupabaseClient, table: string) {
  const rows: Record<string, unknown>[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from(table)
      .select('*')
      .range(from, from + PAGE - 1);
    if (error) return { rows, error: error.message };
    if (!data?.length) break;
    rows.push(...(data as Record<string, unknown>[]));
    if (data.length < PAGE) break;
  }
  return { rows };
}

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
      spec.components?.schemas?.[table]?.properties;
    if (props) return new Set(Object.keys(props));
  } catch {
    /* ignore */
  }
  return null;
}

function project(
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

function missingCol(msg: string): string | null {
  const m = msg.match(/Could not find the '([^']+)' column/i);
  return m?.[1] ?? null;
}

async function upsertBatches(
  sb: SupabaseClient,
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
  allowedIn: Set<string> | null
): Promise<{ written: number; errors: string[] }> {
  let written = 0;
  const errors: string[] = [];
  let allowed = allowedIn ? new Set(allowedIn) : null;

  for (let i = 0; i < rows.length; i += PAGE) {
    let batch = project(rows.slice(i, i + PAGE), allowed);
    for (let attempt = 0; attempt < 15; attempt++) {
      const { error, count } = await sb
        .from(table)
        .upsert(batch as never, { onConflict, count: 'exact' });
      if (!error) {
        written += count ?? batch.length;
        break;
      }
      const col = missingCol(error.message);
      if (col) {
        if (!allowed) allowed = new Set(batch.flatMap((r) => Object.keys(r)));
        allowed.delete(col);
        batch = project(rows.slice(i, i + PAGE), allowed);
        console.log(`  strip ${table}.${col}`);
        continue;
      }
      // row-by-row
      for (const row of batch) {
        let r = { ...row };
        let ok = false;
        for (let ra = 0; ra < 10; ra++) {
          const one = await sb.from(table).upsert(r as never, { onConflict });
          if (!one.error) {
            written += 1;
            ok = true;
            break;
          }
          const c = missingCol(one.error.message);
          if (c) {
            delete r[c];
            continue;
          }
          errors.push(`${table}/${String(row.id ?? '?')}: ${one.error.message}`);
          break;
        }
        if (!ok && errors.length > 200) break;
      }
      break;
    }
  }
  return { written, errors };
}

async function main() {
  let cfg;
  try {
    cfg = resolveDualSupabaseConfig();
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  }

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });

  console.log('── Remaining migrate FREE → PRO (Move-only) ──');
  console.log(`Mode: ${dryRun ? 'DRY-RUN' : 'LIVE CONFIRM'}`);
  console.log(`SOURCE: ${redactUrl(cfg.sourceUrl)}`);
  console.log(`TARGET: ${redactUrl(cfg.targetUrl)}`);
  console.log(`include-quotes: ${includeQuotes}`);
  console.log(
    `NEVER on are (Lender-Trust-Hub project): ${NEVER_ON_ARE.join(', ')}`
  );

  const source = client(cfg.sourceUrl, cfg.sourceKey);
  const target = client(cfg.targetUrl, cfg.targetKey);

  // Inventory refresh
  const inventoryPath = resolve(outDir, 'supabase-table-parity-uvq-are.json');
  if (existsSync(inventoryPath)) {
    console.log(`Inventory present: ${inventoryPath}`);
  }

  const reports: Report[] = [];
  const schemaSql = resolve(
    process.cwd(),
    'supabase/migrations/20260806190000_are_remaining_ops_tables.sql'
  );

  for (const t of TABLES) {
    if (t.quotesOnly && !includeQuotes) {
      const sc = await count(source, t.name);
      const tc = await count(target, t.name);
      if ((sc ?? 0) > 0 && (tc ?? 0) === 0) {
        console.log(
          `\n▶ ${t.name}: SOURCE has ${sc}, TARGET empty — pass --include-quotes to copy`
        );
      }
      reports.push({
        name: t.name,
        source_count: sc ?? 0,
        target_before: tc,
        target_after: tc,
        inserted_or_upserted: 0,
        skipped: sc ?? 0,
        errors: [],
        status: 'skipped_no_quotes_flag',
      });
      continue;
    }

    const srcExists = await tableExists(source, t.name);
    if (!srcExists) {
      reports.push({
        name: t.name,
        source_count: 0,
        target_before: null,
        target_after: null,
        inserted_or_upserted: 0,
        skipped: 0,
        errors: [],
        status: 'missing_source',
      });
      continue;
    }

    const tgtExists = await tableExists(target, t.name);
    const source_count = (await count(source, t.name)) ?? 0;
    const target_before = await count(target, t.name);

    console.log(
      `\n▶ ${t.name} src=${source_count} tgt_before=${target_before ?? 'MISSING'}`
    );

    if (!tgtExists) {
      console.log(
        `  TARGET table missing — apply ${schemaSql} then re-run --confirm`
      );
      reports.push({
        name: t.name,
        source_count,
        target_before: null,
        target_after: null,
        inserted_or_upserted: 0,
        skipped: source_count,
        errors: ['target table missing'],
        status: 'missing_target',
      });
      continue;
    }

    if (source_count === 0) {
      reports.push({
        name: t.name,
        source_count: 0,
        target_before,
        target_after: target_before,
        inserted_or_upserted: 0,
        skipped: 0,
        errors: [],
        status: 'empty_source',
      });
      console.log('  empty source — skip');
      continue;
    }

    const { rows, error } = await fetchAll(source, t.name);
    if (error) {
      reports.push({
        name: t.name,
        source_count,
        target_before,
        target_after: target_before,
        inserted_or_upserted: 0,
        skipped: 0,
        errors: [error],
        status: 'read_error',
      });
      console.log('  read error', error);
      continue;
    }

    let filtered = rows;
    let skipped = 0;

    if (t.skipOrphans && t.fkParent) {
      const parentKey = t.fkParent.parentKey || 'id';
      const childKey = t.fkParent.childKey;
      const parentIds = new Set<string>();
      // load parent ids in pages
      for (let from = 0; ; from += PAGE) {
        const { data, error: pe } = await target
          .from(t.fkParent.table)
          .select(parentKey)
          .range(from, from + PAGE - 1);
        if (pe) {
          console.log(`  parent load ${t.fkParent.table}: ${pe.message}`);
          break;
        }
        if (!data?.length) break;
        for (const p of data) {
          parentIds.add(String((p as Record<string, unknown>)[parentKey]));
        }
        if (data.length < PAGE) break;
      }
      const before = filtered.length;
      filtered = filtered.filter((r) =>
        parentIds.has(String(r[childKey] ?? ''))
      );
      skipped = before - filtered.length;
      console.log(
        `  orphan filter: keep ${filtered.length}/${before} (parent ${t.fkParent.table})`
      );
    }

    if (dryRun) {
      reports.push({
        name: t.name,
        source_count,
        target_before,
        target_after: target_before,
        inserted_or_upserted: 0,
        skipped: skipped + (rows.length - filtered.length),
        errors: [],
        status: 'dry-run',
      });
      console.log(`  dry-run: would upsert ${filtered.length}`);
      continue;
    }

    const allowed = await fetchTargetColumns(cfg.targetUrl, cfg.targetKey, t.name);
    if (allowed) console.log(`  target cols: ${allowed.size}`);

    const { written, errors } = await upsertBatches(
      target,
      t.name,
      filtered,
      t.onConflict,
      allowed
    );
    const target_after = await count(target, t.name);
    reports.push({
      name: t.name,
      source_count,
      target_before,
      target_after,
      inserted_or_upserted: written,
      skipped,
      errors: errors.slice(0, 40),
      status: errors.length ? 'error' : 'ok',
    });
    console.log(`  written≈${written} skipped=${skipped} errors=${errors.length}`);
    if (errors[0]) console.log(`  first error: ${errors[0]}`);
  }

  // Views note
  reports.push({
    name: 'company_verification_status',
    source_count: 0,
    target_before: null,
    target_after: null,
    inserted_or_upserted: 0,
    skipped: 0,
    errors: [],
    status: 'view_apply_sql',
  });
  reports.push({
    name: 'companies_with_stats',
    source_count: 0,
    target_before: null,
    target_after: null,
    inserted_or_upserted: 0,
    skipped: 0,
    errors: [],
    status: 'view_apply_sql',
  });

  const outPath = resolve(outDir, 'supabase-migrate-uvq-to-are-remaining.json');
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        mode: dryRun ? 'dry-run' : 'confirm',
        sourceRef: cfg.sourceRef,
        targetRef: cfg.targetRef,
        includeQuotes,
        schemaSql: 'supabase/migrations/20260806190000_are_remaining_ops_tables.sql',
        applySqlEditor: 'scripts/output/APPLY-ON-ARE-REMAINING.sql',
        reports,
        excluded: [
          'user_profiles',
          'saved_*',
          'auth.*',
          'network_auth_handoffs',
          'company_claims',
          'company_owners',
          'company_portal_profiles',
          // Lender product — separate Supabase project hidcrbexurginnuqgjpx
          ...NEVER_ON_ARE,
        ],
        lenderNote:
          'uvq.lenders (647 rows) were legacy multi-product data. Do not copy to Move are. Future home: Lender-Trust-Hub (hidcrbexurginnuqgjpx).',
      },
      null,
      2
    )
  );

  console.log('\n── Summary ──');
  for (const r of reports) {
    console.log(
      `  ${r.name.padEnd(40)} ${r.status.padEnd(22)} src=${r.source_count} written=${r.inserted_or_upserted} skip=${r.skipped} err=${r.errors.length}`
    );
  }
  console.log(`\nReport: ${outPath}`);
  const missing = reports.filter((r) => r.status === 'missing_target');
  if (missing.length) {
    console.log(
      `\nApply SQL on are then re-run --confirm:\n  ${schemaSql}\n  or scripts/output/APPLY-ON-ARE-REMAINING.sql`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
