/**
 * Remove directory companies that have a USDOT on file but no successful FMCSA refresh
 * (fmcsa_last_checked is null → no DOT status / unverified FMCSA data).
 *
 * Dry run (preview + backup CSV only):
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/remove-unverified-fmcsa-companies.ts --dry-run
 *
 * Live delete:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/remove-unverified-fmcsa-companies.ts --confirm
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { createAdminClient } from '@/lib/supabase/admin';

loadEnvLocal();

function parseArgs(argv: string[]) {
  return {
    dryRun: argv.includes('--dry-run') || !argv.includes('--confirm'),
    confirm: argv.includes('--confirm'),
  };
}

function csvEscape(value: string | null | undefined): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

async function selectTargets() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('companies')
    .select('id, slug, name, headquarters, usdot_number, mc_number, is_verified, fmcsa_last_checked')
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '')
    .is('fmcsa_last_checked', null)
    .order('slug');

  if (error) throw new Error(`Select failed: ${error.message}`);
  return data ?? [];
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));
  const targets = await selectTargets();

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const backupPath = resolve(outDir, 'removed-unverified-fmcsa-companies.csv');
  const header = 'id,slug,name,headquarters,usdot_number,mc_number,is_verified';
  const lines = targets.map((c) =>
    [c.id, c.slug, c.name, c.headquarters, c.usdot_number, c.mc_number, c.is_verified]
      .map(csvEscape)
      .join(',')
  );
  writeFileSync(backupPath, [header, ...lines].join('\n'), 'utf8');

  console.log('=== Remove Unverified FMCSA Companies ===\n');
  console.log(`Targets (USDOT on file, fmcsa_last_checked null): ${targets.length}`);
  console.log(`Backup saved: ${backupPath}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN (no deletes)' : 'LIVE DELETE'}\n`);

  if (!targets.length) {
    console.log('Nothing to remove.');
    return;
  }

  console.log('Sample (first 15):');
  for (const c of targets.slice(0, 15)) {
    console.log(`  - ${c.slug} | ${c.name} | DOT ${c.usdot_number}`);
  }
  if (targets.length > 15) {
    console.log(`  ... and ${targets.length - 15} more`);
  }

  if (dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to delete.');
    return;
  }

  const supabase = createAdminClient();
  const ids = targets.map((c) => c.id);
  const batchSize = 50;
  let deleted = 0;

  for (let i = 0; i < ids.length; i += batchSize) {
    const chunk = ids.slice(i, i + batchSize);
    const { error } = await supabase.from('companies').delete().in('id', chunk);
    if (error) throw new Error(`Delete failed: ${error.message}`);
    deleted += chunk.length;
    console.log(`Deleted ${deleted}/${ids.length}...`);
  }

  const { count } = await supabase
    .from('companies')
    .select('id', { count: 'exact', head: true });

  console.log(`\nDone. Removed ${deleted} companies.`);
  console.log(`Remaining companies in directory: ${count ?? 'unknown'}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});