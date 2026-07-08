/**
 * Run production backfill across all candidate offsets in sequence.
 *
 * Usage:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/run-all-backfill-batches.ts --batch 25
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/run-all-backfill-batches.ts --dry-run --batch 25
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import {
  parseProductionBackfillArgs,
  runProductionBackfill,
  type ProductionBackfillStats,
} from '../lib/verification/run-production-backfill';

loadEnvLocal();

const baseOpts = parseProductionBackfillArgs(process.argv.slice(2));
baseOpts.scriptName = 'run-all-backfill-batches';

async function main(): Promise<void> {
  let offset = baseOpts.offset;
  const totals: ProductionBackfillStats = {
    processed: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
    supabase: 0,
    catalog: 0,
    googleOk: 0,
    bbbOk: 0,
  };

  console.log('── Full directory backfill (all batches) ──');
  console.log(`Mode: ${baseOpts.dryRun ? 'DRY RUN' : 'LIVE'} | Batch size: ${baseOpts.batch}`);
  console.log('');

  for (let batchNum = 1; batchNum <= 50; batchNum++) {
    const { stats, exitCode } = await runProductionBackfill({
      ...baseOpts,
      offset,
    });

    totals.processed += stats.processed;
    totals.updated += stats.updated;
    totals.skipped += stats.skipped;
    totals.errors += stats.errors;
    totals.supabase += stats.supabase;
    totals.catalog += stats.catalog;
    totals.googleOk += stats.googleOk;
    totals.bbbOk += stats.bbbOk;

    if (stats.processed === 0) {
      console.log(`\nNo more candidates at offset ${offset}. Done.`);
      break;
    }

    if (exitCode !== 0 && stats.errors >= stats.processed) {
      console.error(`\nBatch at offset ${offset} failed entirely. Stopping.`);
      process.exit(1);
    }

    offset += baseOpts.batch;
    console.log(`\n── Completed batch ${batchNum} (next offset: ${offset}) ──\n`);
  }

  console.log('\n══════════════════════════════════════');
  console.log('FULL RUN SUMMARY');
  console.log('══════════════════════════════════════');
  console.log(`  Processed:     ${totals.processed}`);
  console.log(`  Updated:       ${totals.updated}`);
  console.log(`  Skipped:       ${totals.skipped}`);
  console.log(`  Errors:        ${totals.errors}`);
  console.log(`  Google OK:     ${totals.googleOk}`);
  console.log(`  BBB data:      ${totals.bbbOk}`);
  console.log(`  Supabase:      ${totals.supabase}`);
  console.log(`  Catalog:       ${totals.catalog}`);
  console.log('══════════════════════════════════════');

  process.exit(totals.errors > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});