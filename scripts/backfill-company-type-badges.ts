/**
 * Backfill company type signals used for Carrier / Broker / Local Mover badges.
 *
 * - Intrastate: ensure service_scope = 'intrastate' (badge derives from scope)
 * - Interstate: set entity_type from fmcsa_raw when missing; merge Carrier/Broker into services
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
  const sa = [...a].sort().join('|');
  const sb = [...b].sort().join('|');
  return sa === sb;
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

  let query = admin
    .from('companies')
    .select(
      'id, slug, name, service_scope, entity_type, services, fmcsa_raw, usdot_number, is_verified'
    )
    .order('slug');

  if (slug) query = query.eq('slug', slug);
  if (limit > 0) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error('Query failed:', error.message);
    process.exit(1);
  }

  const rows = data ?? [];
  console.log(`Loaded ${rows.length} companies${dryRun ? ' (dry-run)' : ''}`);

  let updated = 0;
  let skipped = 0;
  let localScoped = 0;
  let entityFilled = 0;
  let servicesMerged = 0;

  for (const row of rows) {
    const scope =
      row.service_scope === 'intrastate'
        ? 'intrastate'
        : row.service_scope === 'interstate'
          ? 'interstate'
          : // Heuristic: no USDOT → treat as local if verified local onboard
            !row.usdot_number
            ? 'intrastate'
            : 'interstate';

    const patch: Record<string, unknown> = {};
    const fmcsaRaw =
      row.fmcsa_raw && typeof row.fmcsa_raw === 'object'
        ? (row.fmcsa_raw as Record<string, unknown>)
        : null;

    if (scope === 'intrastate') {
      if (row.service_scope !== 'intrastate') {
        patch.service_scope = 'intrastate';
        localScoped += 1;
      }
      // Local movers do not need FMCSA entity_type for the Local Mover badge.
    } else {
      if (row.service_scope !== 'interstate' && row.service_scope == null) {
        // Only set interstate when column was null; don't flip unknown intrastate without USDOT
        if (row.usdot_number) patch.service_scope = 'interstate';
      }

      const resolved =
        formatEntityTypeLabel(row.entity_type) ||
        (fmcsaRaw ? resolveEntityTypeFromFmcsaRaw(fmcsaRaw) : null);

      const entityLabel =
        resolved && resolved !== 'Not Available' ? resolved : null;

      if (entityLabel && formatEntityTypeLabel(row.entity_type) !== entityLabel) {
        patch.entity_type = entityLabel;
        entityFilled += 1;
      }

      const currentServices = asServices(row.services);
      const nextServices = mergeServicesWithEntityType(
        currentServices,
        entityLabel || row.entity_type
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
        .eq('id', row.id);
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
    dryRun,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
