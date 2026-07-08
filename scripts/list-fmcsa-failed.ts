/**
 * List companies with USDOT that never received a successful FMCSA refresh.
 * Run: npx tsx --require ./scripts/stub-server-only.cjs scripts/list-fmcsa-failed.ts
 */
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

function csvEscape(value: string | null | undefined): string {
  const s = String(value ?? '');
  return `"${s.replace(/"/g, '""')}"`;
}

async function main() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('companies')
    .select('slug, name, usdot_number, mc_number, headquarters, fmcsa_last_checked')
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '')
    .is('fmcsa_last_checked', null)
    .order('slug');

  if (error) {
    console.error('Query failed:', error.message);
    process.exit(1);
  }

  const rows = data ?? [];
  const header = 'slug,name,usdot_number,mc_number,headquarters';
  const lines = rows.map((c) =>
    [c.slug, c.name, c.usdot_number, c.mc_number, c.headquarters]
      .map(csvEscape)
      .join(',')
  );

  const csv = [header, ...lines].join('\n');
  const outPath = resolve(process.cwd(), 'scripts/output/fmcsa-failed-companies.csv');
  writeFileSync(outPath, csv, 'utf8');

  console.log(`FMCSA refresh failures: ${rows.length} companies (no fmcsa_last_checked)\n`);
  console.log('slug | name | USDOT');
  console.log('-----|------|------');
  for (const c of rows) {
    console.log(`${c.slug} | ${c.name} | ${c.usdot_number}`);
  }
  console.log(`\nSaved CSV: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});