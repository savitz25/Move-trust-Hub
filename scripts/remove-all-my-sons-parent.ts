/**
 * Remove All My Sons Moving & Storage (Fort Lauderdale parent listing).
 * Regional franchises (Birmingham, Knoxville, etc.) remain in the directory.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/remove-all-my-sons-parent.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/remove-all-my-sons-parent.ts --confirm
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const SLUG = 'all-my-sons-moving-storage';

function parseArgs(argv: string[]) {
  return { dryRun: argv.includes('--dry-run') || !argv.includes('--confirm') };
}

async function countRelated(admin: ReturnType<typeof createAdminClient>, companyId: string) {
  const tables = ['reviews', 'fmcsa_change_log', 'bbb_change_log', 'company_suggestions'] as const;
  const counts: Record<string, number> = {};

  for (const table of tables) {
    const { count, error } = await admin
      .from(table)
      .select('id', { count: 'exact', head: true })
      .eq('company_id', companyId);
    counts[table] = error ? -1 : (count ?? 0);
  }

  return counts;
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));
  const admin = createAdminClient();

  const { data: company, error } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, is_verified, overall_rating, review_count, verification_sources'
    )
    .eq('slug', SLUG)
    .maybeSingle();

  if (error) throw error;

  console.log('=== Remove All My Sons Moving & Storage (parent) ===\n');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE DELETE'}\n`);

  if (!company) {
    console.log(`Company not found (${SLUG}). Nothing to do.`);
    return;
  }

  const related = await countRelated(admin, company.id);

  console.log('Target:');
  console.log(`  slug: ${company.slug}`);
  console.log(`  name: ${company.name}`);
  console.log(`  HQ:   ${company.headquarters}`);
  console.log(`  DOT:  ${company.usdot_number}`);
  console.log(`  related: ${JSON.stringify(related)}`);

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const backupPath = resolve(outDir, `removed-${SLUG}-${new Date().toISOString().slice(0, 10)}.json`);
  writeFileSync(
    backupPath,
    JSON.stringify({ removedAt: new Date().toISOString(), dryRun, company, related }, null, 2),
    'utf8'
  );
  console.log(`\nBackup: ${backupPath}`);

  if (dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to delete.');
    return;
  }

  const { error: deleteError } = await admin.from('companies').delete().eq('id', company.id);
  if (deleteError) throw new Error(`Delete failed: ${deleteError.message}`);

  const { count } = await admin.from('companies').select('id', { count: 'exact', head: true });
  const { data: stillThere } = await admin.from('companies').select('id').eq('slug', SLUG).maybeSingle();

  const { data: noGoogle } = await admin
    .from('companies')
    .select('slug, name, verification_sources')
    .not('verification_sources', 'is', null);

  const googleFailures =
    noGoogle?.filter((row) => {
      const sources = row.verification_sources as { google?: { status?: string } } | null;
      const status = sources?.google?.status;
      return !status || status !== 'ok';
    }) ?? [];

  console.log('\nDeleted successfully.');
  console.log(`Remaining companies: ${count ?? 'unknown'}`);
  console.log(`Slug still present: ${stillThere ? 'yes' : 'no'}`);
  console.log(`Companies without Google ok: ${googleFailures.length}`);
  for (const row of googleFailures) {
    const sources = row.verification_sources as { google?: { status?: string } } | null;
    console.log(`  - ${row.slug} | ${row.name} | google=${sources?.google?.status ?? 'missing'}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});