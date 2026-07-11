/**
 * Enrich every lender in the directory in rate-limited batches.
 *
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-all.ts
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/enrich-lenders-all.ts --offset=10
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { lenders } from '@/lib/lender/mockData';
import { runLenderEnrichmentRefresh } from '@/lib/lender/enrichment/run-refresh';
import { readEnrichmentStore } from '@/lib/lender/enrichment/store';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const BATCH_SIZE = 30;

function parseOffset(argv: string[]): number {
  const arg = argv.find((a) => a.startsWith('--offset='));
  if (!arg) return 0;
  const n = Number(arg.split('=')[1]);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

async function main() {
  const startOffset = parseOffset(process.argv.slice(2));
  const total = lenders.length;
  const batches: Array<ReturnType<typeof runLenderEnrichmentRefresh> extends Promise<infer R> ? R : never> = [];

  console.log(`=== Full lender directory enrichment ===`);
  console.log(`Total lenders: ${total}`);
  console.log(`Batch size: ${BATCH_SIZE}`);
  console.log(`Start offset: ${startOffset}\n`);

  for (let offset = startOffset; offset < total; offset += BATCH_SIZE) {
    const limit = Math.min(BATCH_SIZE, total - offset);
    console.log(`\n── Batch ${Math.floor(offset / BATCH_SIZE) + 1}: offset=${offset} limit=${limit} ──`);

    const result = await runLenderEnrichmentRefresh({
      mode: 'full',
      dryRun: false,
      offset,
      limit,
      concurrency: 2,
    });

    batches.push(result);
    const storeSize = Object.keys(readEnrichmentStore()).length;
    console.log(
      `  enriched=${result.enriched} skipped=${result.skipped} failed=${result.failed} store=${storeSize}`
    );
  }

  const store = readEnrichmentStore();
  const summary = {
    executedAt: new Date().toISOString(),
    totalLenders: total,
    enrichedInStore: Object.keys(store).length,
    batches: batches.length,
    totalEnriched: batches.reduce((s, b) => s + b.enriched, 0),
    totalSkipped: batches.reduce((s, b) => s + b.skipped, 0),
    totalFailed: batches.reduce((s, b) => s + b.failed, 0),
    durationMs: batches.reduce((s, b) => s + b.durationMs, 0),
  };

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const logPath = resolve(outDir, `lender-enrichment-full-${new Date().toISOString().slice(0, 10)}.json`);
  writeFileSync(logPath, JSON.stringify({ summary, batches }, null, 2), 'utf8');

  console.log('\n=== Complete ===');
  console.log(JSON.stringify(summary, null, 2));
  console.log(`Log: ${logPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});