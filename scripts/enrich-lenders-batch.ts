/**
 * Bulk lender enrichment — Google Places, BBB, CFPB, county experience score.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --dry-run
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --confirm
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --confirm --slug=rocket-mortgage-florida
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-batch.ts --confirm --limit=10 --offset=0
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import { isGooglePlacesConfigured } from '@/lib/verification/google-places';
import { runLenderEnrichmentRefresh } from '@/lib/lender/enrichment/run-refresh';

loadEnvLocal();

function parseArgs(argv: string[]) {
  const dryRun = argv.includes('--dry-run') || !argv.includes('--confirm');
  const slugArg = argv.find((a) => a.startsWith('--slug='));
  const limitArg = argv.find((a) => a.startsWith('--limit='));
  const offsetArg = argv.find((a) => a.startsWith('--offset='));
  const modeArg = argv.find((a) => a.startsWith('--mode='));

  return {
    dryRun,
    slug: slugArg?.split('=')[1],
    limit: limitArg ? Number(limitArg.split('=')[1]) : undefined,
    offset: offsetArg ? Number(offsetArg.split('=')[1]) : undefined,
    mode: (modeArg?.split('=')[1] as 'full' | 'incremental') ?? 'full',
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!isGooglePlacesConfigured()) {
    console.warn('GOOGLE_PLACES_API_KEY not set — Google enrichment will be skipped.');
  }

  console.log('=== Lender bulk enrichment ===');
  console.log(`Mode: ${args.dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`Refresh: ${args.mode}`);
  if (args.slug) console.log(`Slug: ${args.slug}`);
  if (args.limit != null) console.log(`Limit: ${args.limit}, offset: ${args.offset ?? 0}`);
  console.log('');

  const result = await runLenderEnrichmentRefresh({
    mode: args.mode,
    dryRun: args.dryRun,
    slug: args.slug,
    limit: args.limit,
    offset: args.offset,
    concurrency: 2,
  });

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const logPath = resolve(
    outDir,
    `lender-enrichment-${args.dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.json`
  );
  writeFileSync(logPath, JSON.stringify({ executedAt: new Date().toISOString(), ...result }, null, 2), 'utf8');

  console.log('\n=== Summary ===');
  console.log(`Status: ${result.status}`);
  console.log(`Processed: ${result.processed}`);
  console.log(`Enriched: ${result.enriched}`);
  console.log(`Skipped: ${result.skipped}`);
  console.log(`Failed: ${result.failed}`);
  console.log(`Duration: ${(result.durationMs / 1000).toFixed(1)}s`);
  if (result.errors.length) {
    console.log('\nErrors (first 10):');
    for (const e of result.errors.slice(0, 10)) {
      console.log(`  - ${e.slug}: ${e.message}`);
    }
  }
  console.log(`\nLog: ${logPath}`);

  if (args.dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to persist JSON + Supabase.');
  }

  process.exit(result.status === 'failed' ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});