/**
 * Full-directory FMCSA batch refresh with inactive DOT cleanup rule.
 *
 * Dry run:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/fmcsa-inactive-dot-cleanup.ts --dry-run
 *
 * Live:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/fmcsa-inactive-dot-cleanup.ts --confirm
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const BATCH_SIZE = 40;

function parseArgs(argv: string[]) {
  return {
    dryRun: argv.includes('--dry-run') || !argv.includes('--confirm'),
  };
}

function csvEscape(value: string | null | undefined): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));
  const { runFmcsaBatchRefresh } = await import('../lib/fmcsa/refresh/batch-runner');

  console.log('=== FMCSA Inactive DOT Cleanup ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}\n`);

  let offset = 0;
  let totalWithUsdot = 0;
  const allRemovals: Array<Record<string, unknown>> = [];
  const batchSummaries: Array<Record<string, unknown>> = [];
  let totalRemoved = 0;
  let totalDotCorrected = 0;
  let totalUpdated = 0;

  do {
    const result = await runFmcsaBatchRefresh({
      batch: BATCH_SIZE,
      offset,
      dryRun,
    });

    totalWithUsdot = result.totalWithUsdot;
    totalRemoved += result.companiesRemoved;
    totalDotCorrected += result.companiesDotCorrected;
    totalUpdated += result.companiesUpdated;

    for (const removal of result.removals) {
      allRemovals.push({ ...removal, dryRun });
    }

    batchSummaries.push({
      offset,
      processed: result.companiesProcessed,
      updated: result.companiesUpdated,
      removed: result.companiesRemoved,
      dotCorrected: result.companiesDotCorrected,
      failed: result.companiesFailed,
    });

    console.log(
      `Batch offset ${offset}: ${result.companiesProcessed} processed, ${result.companiesUpdated} updated, ${result.companiesRemoved} removed, ${result.companiesDotCorrected} DOT corrected`
    );

    if (result.companiesSelected === 0) break;
    offset = result.nextOffset;
  } while (offset < totalWithUsdot);

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const csvPath = resolve(
    outDir,
    `inactive-dot-removed-${dryRun ? 'dry-run-' : ''}${date}.csv`
  );
  const jsonPath = resolve(
    outDir,
    `inactive-dot-cleanup-${dryRun ? 'dry-run-' : ''}${date}.json`
  );

  const header =
    'id,slug,name,usdot_number,mc_number,headquarters,inactive_dot,reason,inactive_safer_message,status';
  const csvLines = allRemovals.map((r) =>
    [
      r.id,
      r.slug,
      r.name,
      r.usdot_number,
      r.mc_number,
      r.headquarters,
      r.inactiveDot,
      r.reason,
      r.inactiveSaferMessage,
      dryRun ? 'would_delete' : 'deleted',
    ]
      .map((v) => csvEscape(String(v ?? '')))
      .join(',')
  );
  writeFileSync(csvPath, [header, ...csvLines].join('\n'), 'utf8');

  const log = {
    executedAt: new Date().toISOString(),
    dryRun,
    totalWithUsdot,
    totalUpdated,
    totalRemoved,
    totalDotCorrected,
    batchSummaries,
    removals: allRemovals,
  };
  writeFileSync(jsonPath, JSON.stringify(log, null, 2), 'utf8');

  console.log('\n=== Summary ===');
  console.log(`Companies scanned (with USDOT): ${totalWithUsdot}`);
  console.log(`Updated: ${totalUpdated}`);
  console.log(`Removed (Inactive DOT with no name match): ${totalRemoved}`);
  console.log(`DOT corrected via name search: ${totalDotCorrected}`);
  console.log(`Removal CSV: ${csvPath}`);
  console.log(`Change log: ${jsonPath}`);

  if (dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to apply.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});