/**
 * Backfill company type signals used for Carrier / Broker / Local Mover badges.
 *
 * - Prefer service_scope when the column exists
 * - Interstate: set entity_type from fmcsa_raw; merge Carrier/Broker into services
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-type-badges.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-type-badges.ts --limit=50
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/backfill-company-type-badges.ts --slug=some-slug
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { mergeServicesWithEntityType } from '../lib/fmcsa/derive-directory-services';
import {
  resolveEntityTypeFromFmcsaRaw,
  formatEntityTypeLabel,
} from '../lib/fmcsa/entity-type-display';
import type { ServiceType } from '../types';

function loadEnv() {
  try {
    const p = resolve(process.cwd(), '.env.local');
    if (!existsSync(p)) return;
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
      if (!m) continue;
      const key = m[1]!;
      let val = m[2]!.trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // ignore
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  let dryRun = false;
  let limit = 0;
  let slug: string | null = null;
  for (const a of args) {
    if (a === '--dry-run') dryRun = true;
    else if (a.startsWith('--limit=')) limit = Number(a.slice(8)) || 0;
    else if (a.startsWith('--slug=')) slug = a.slice(7) || null;
  }
  return { dryRun, limit, slug };
}

function asServices(raw: unknown): ServiceType[] {
  if (!Array.isArray(raw)) return ['Full Service'];
  return raw.map((s) => String(s)) as ServiceType[];
}

function servicesEqual(a: ServiceType[], b: ServiceType[]): boolean {
  if (a.length !== b.length) return false;
  return [...a].sort().join('|') === [...b].sort().join('|');
}

async function main() {
  loadEnv();
  const { dryRun, limit, slug } = parseArgs();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing Supabase URL or service role key');
    process.exit(1);
  }

  const admin = createClient(url, key, { auth: { persistSession: false } });

  // Prefer full select; fall back when service_scope / coverage migrations lag prod.
  const selectFull =
    'id, slug, name, service_scope, entity_type, services, fmcsa_raw, usdot_number, is_verified';
  const selectCore =
    'id, slug, name, entity_type, services, fmcsa_raw, usdot_number, is_verified';

  async function loadRows(select: string) {
    let query = admin.from('companies').select(select).order('slug');
    if (slug) query = query.eq('slug', slug);
    if (limit > 0) query = query.limit(limit);
    return query;
  }

  let { data, error } = await loadRows(selectFull);
  let hasServiceScope = true;
  if (error && /service_scope/i.test(error.message)) {
    console.warn('service_scope column missing — backfilling entity_type/services only');
    hasServiceScope = false;
    ({ data, error } = await loadRows(selectCore));
  }

  if (error) {
    console.error('Query failed:', error.message);
    process.exit(1);
  }

  const rows = (data ?? []) as Array<Record<string, unknown>>;
  console.log(
    `Loaded ${rows.length} companies${dryRun ? ' (dry-run)' : ''} · service_scope=${hasServiceScope}`
  );

  let updated = 0;
  let skipped = 0;
  let localScoped = 0;
  let entityFilled = 0;
  let servicesMerged = 0;

  for (const row of rows) {
    const usdot = String(row.usdot_number ?? '').replace(/\D/g, '');
    const storedScope = row.service_scope as string | undefined;
    const scope =
      storedScope === 'intrastate'
        ? 'intrastate'
        : storedScope === 'interstate'
          ? 'interstate'
          : usdot.length >= 5
            ? 'interstate'
            : 'intrastate';

    const patch: Record<string, unknown> = {};
    const fmcsaRaw =
      row.fmcsa_raw && typeof row.fmcsa_raw === 'object'
        ? (row.fmcsa_raw as Record<string, unknown>)
        : null;

    if (scope === 'intrastate') {
      if (hasServiceScope && storedScope !== 'intrastate') {
        patch.service_scope = 'intrastate';
        localScoped += 1;
      }
    } else {
      if (hasServiceScope && !storedScope && usdot.length >= 5) {
        patch.service_scope = 'interstate';
      }

      const resolved =
        formatEntityTypeLabel(row.entity_type as string | null) ||
        (fmcsaRaw ? resolveEntityTypeFromFmcsaRaw(fmcsaRaw) : null);

      const entityLabel =
        resolved && resolved !== 'Not Available' ? resolved : null;

      if (
        entityLabel &&
        formatEntityTypeLabel(row.entity_type as string | null) !== entityLabel
      ) {
        patch.entity_type = entityLabel;
        entityFilled += 1;
      }

      const currentServices = asServices(row.services);
      const nextServices = mergeServicesWithEntityType(
        currentServices,
        entityLabel || (row.entity_type as string | null)
      );
      if (!servicesEqual(currentServices, nextServices)) {
        patch.services = nextServices;
        servicesMerged += 1;
      }
    }

    if (!Object.keys(patch).length) {
      skipped += 1;
      continue;
    }

    console.log(
      `${dryRun ? '[dry] ' : ''}${row.slug}: ${JSON.stringify(patch)}`
    );

    if (!dryRun) {
      const { error: upErr } = await admin
        .from('companies')
        .update(patch)
        .eq('id', row.id as string);
      if (upErr) {
        console.error(`  FAIL ${row.slug}: ${upErr.message}`);
        continue;
      }
    }
    updated += 1;
  }

  console.log('\nSummary');
  console.log({
    updated,
    skipped,
    localScoped,
    entityFilled,
    servicesMerged,
    hasServiceScope,
    dryRun,
  });
  if (!hasServiceScope) {
    console.log(
      '\nNOTE: Apply migration 20260718160000_interstate_intrastate_scope.sql so Local Mover badges use service_scope permanently.'
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
