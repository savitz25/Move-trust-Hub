/**
 * Post-refresh audit: entity type coverage across all directory companies.
 *
 *   npx tsx scripts/audit-entity-type-after-refresh.ts
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { extractFmcsaFieldsFromRow } from '@/lib/fmcsa/company-from-row';
import { resolveEntityTypeFromFmcsaRaw } from '@/lib/fmcsa/entity-type-display';
import { createAdminClient } from '@/lib/supabase/admin';
import type { ServiceType } from '@/types';

loadEnvLocal();

async function main() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('companies')
    .select('slug, name, usdot_number, fmcsa_raw, entity_type, services')
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '');

  if (error) throw error;
  const rows = data ?? [];

  const counts: Record<string, number> = {};
  const missing: Array<{ slug: string; name: string; usdot: string }> = [];

  for (const row of rows) {
    const raw = row.fmcsa_raw as Record<string, unknown> | null;
    const fmcsaFields = extractFmcsaFieldsFromRow(
      row as Record<string, unknown>,
      (row.services as ServiceType[]) ?? []
    );
    const fromColumn =
      typeof row.entity_type === 'string' ? row.entity_type.trim() : null;
    const label =
      fromColumn ||
      fmcsaFields.entityType ||
      (raw ? resolveEntityTypeFromFmcsaRaw(raw) : 'No FMCSA data');

    counts[label] = (counts[label] ?? 0) + 1;
    if (!fmcsaFields.entityType && !fromColumn && raw) {
      missing.push({
        slug: row.slug,
        name: row.name,
        usdot: row.usdot_number ?? '',
      });
    }
  }

  console.log('=== Entity Type Audit (post-refresh) ===\n');
  console.log(`Companies with USDOT: ${rows.length}\n`);
  console.log('Distribution:');
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${k}: ${v}`);
  }

  if (missing.length) {
    console.log(`\n${missing.length} companies with fmcsa_raw but unresolved entity type (sample):`);
    for (const m of missing.slice(0, 15)) {
      console.log(`  - ${m.slug} (${m.usdot})`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});