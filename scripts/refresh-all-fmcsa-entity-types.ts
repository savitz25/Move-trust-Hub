/**
 * Full-directory FMCSA refresh focused on accurate Entity Type.
 * Safe mode: does NOT remove inactive-DOT companies (batchMode off).
 *
 * Dry run (first 25):
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/refresh-all-fmcsa-entity-types.ts --dry-run
 *
 * Live — all companies:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/refresh-all-fmcsa-entity-types.ts
 *
 * Requires .env.local: SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL, FMCSA_WEB_KEY
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { loadEnvLocal } from '../lib/verification/load-env-local';
import type { BatchRefreshResult } from '@/lib/fmcsa/refresh/types';

loadEnvLocal();

function parseArgs(argv: string[]) {
  let batch = 25;
  let maxBatches = 0;
  let dryRun = false;
  let startOffset = 0;

  for (const arg of argv) {
    if (arg === '--dry-run') dryRun = true;
    const batchMatch = arg.match(/^--batch(?:=|-)?(\d+)$/);
    if (batchMatch) batch = Number(batchMatch[1]);
    const offsetMatch = arg.match(/^--offset(?:=|-)?(\d+)$/);
    if (offsetMatch) startOffset = Number(offsetMatch[1]);
    const maxMatch = arg.match(/^--max-batches(?:=|-)?(\d+)$/);
    if (maxMatch) maxBatches = Number(maxMatch[1]);
  }

  return {
    batch: Number.isFinite(batch) && batch > 0 ? batch : 25,
    startOffset: Number.isFinite(startOffset) && startOffset >= 0 ? startOffset : 0,
    maxBatches: Number.isFinite(maxBatches) && maxBatches > 0 ? maxBatches : 0,
    dryRun,
  };
}

type EntityTypeTotals = Record<string, number>;

function tallyEntityTypes(result: BatchRefreshResult, totals: EntityTypeTotals) {
  for (const outcome of result.outcomes) {
    const label = outcome.displayFields?.entityType ?? '(no snapshot)';
    totals[label] = (totals[label] ?? 0) + 1;
  }
}

async function main() {
  const { batch, startOffset, maxBatches, dryRun } = parseArgs(process.argv.slice(2));
  const { runFmcsaBatchRefresh } = await import('@/lib/fmcsa/refresh/batch-runner');

  console.log('=== Full Directory FMCSA Refresh (Entity Type Focus) ===');
  console.log(`Batch size: ${batch}`);
  console.log(`Start offset: ${startOffset}`);
  console.log(`Dry run: ${dryRun}`);
  console.log('Safe mode: inactive DOT companies are NOT auto-removed.');
  console.log('Entity types: Carrier | Broker | Carrier/Broker | Not Available\n');

  let offset = startOffset;
  let batchNum = 0;
  const aggregate = {
    processed: 0,
    updated: 0,
    unchanged: 0,
    failed: 0,
    removed: 0,
    dotCorrected: 0,
    changesDetected: 0,
    nameRecovered: 0,
    skippedExisting: 0,
    errors: [] as string[],
    entityTypes: {} as EntityTypeTotals,
    totalWithUsdot: 0,
  };

  const started = Date.now();

  while (true) {
    if (maxBatches > 0 && batchNum >= maxBatches) {
      console.log(`\nStopped after ${maxBatches} batch(es) (--max-batches).`);
      break;
    }

    batchNum++;
    console.log(`\n--- Batch ${batchNum} @ offset ${offset} ---`);

    const result = await runFmcsaBatchRefresh({
      batch,
      offset,
      dryRun,
      batchMode: false,
    });

    if (result.errors.length && result.companiesSelected === 0) {
      console.error('Batch refresh could not start:');
      for (const error of result.errors) console.error(`  - ${error}`);
      process.exit(1);
    }

    aggregate.totalWithUsdot = result.totalWithUsdot;
    aggregate.processed += result.companiesProcessed;
    aggregate.updated += result.companiesUpdated;
    aggregate.unchanged += result.companiesUnchanged;
    aggregate.failed += result.companiesFailed;
    aggregate.removed += result.companiesRemoved;
    aggregate.dotCorrected += result.companiesDotCorrected;
    aggregate.changesDetected += result.changesDetected;
    aggregate.errors.push(...result.errors);
    aggregate.nameRecovered += result.outcomes.filter((o) => o.lookupMethod === 'name_search').length;
    aggregate.skippedExisting += result.outcomes.filter((o) => o.status === 'skipped_existing').length;
    tallyEntityTypes(result, aggregate.entityTypes);

    console.log(
      `Batch done: processed=${result.companiesProcessed} updated=${result.companiesUpdated} failed=${result.companiesFailed}`
    );

    if (result.nextOffset >= result.totalWithUsdot) break;
    offset = result.nextOffset;
  }

  const durationSec = ((Date.now() - started) / 1000).toFixed(1);
  const summary = {
    completedAt: new Date().toISOString(),
    dryRun,
    batchSize: batch,
    batchesRun: batchNum,
    durationSec,
    ...aggregate,
  };

  console.log('\n=== FINAL SUMMARY ===');
  console.log(`Total companies with USDOT: ${aggregate.totalWithUsdot}`);
  console.log(`Processed: ${aggregate.processed}`);
  console.log(`Updated: ${aggregate.updated}`);
  console.log(`Unchanged: ${aggregate.unchanged}`);
  console.log(`Failed: ${aggregate.failed}`);
  console.log(`Removed: ${aggregate.removed}`);
  console.log(`DOT corrected via name search: ${aggregate.dotCorrected}`);
  console.log(`Field changes detected: ${aggregate.changesDetected}`);
  console.log(`Recovered via name search: ${aggregate.nameRecovered}`);
  console.log(`Skipped (existing preserved): ${aggregate.skippedExisting}`);
  console.log(`Duration: ${durationSec}s`);
  console.log('\nEntity Type distribution (this run):');
  for (const [type, count] of Object.entries(aggregate.entityTypes).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type}: ${count}`);
  }

  if (aggregate.errors.length) {
    console.log('\nErrors (first 20):');
    for (const error of aggregate.errors.slice(0, 20)) {
      console.log(`  - ${error}`);
    }
    if (aggregate.errors.length > 20) {
      console.log(`  ... and ${aggregate.errors.length - 20} more`);
    }
  }

  const outDir = join(process.cwd(), 'scripts', 'output');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(
    outDir,
    `fmcsa-entity-type-refresh-${dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.json`
  );
  writeFileSync(outPath, JSON.stringify(summary, null, 2));
  console.log(`\nSummary written to ${outPath}`);

  if (aggregate.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});