/**
 * Safe batched FMCSA refresh for directory companies.
 *
 * First test batch (dry run — no DB writes):
 *   npm run refresh:fmcsa:batch -- --batch=10 --offset=0 --dry-run
 *
 * Recover missing FMCSA data (name fallback for bad USDOTs):
 *   npm run refresh:fmcsa:batch -- --batch=25 --offset=0 --dry-run
 *   npm run refresh:fmcsa:batch -- --batch=25 --offset=0
 *
 * Next batch:
 *   npm run refresh:fmcsa:batch -- --batch=25 --offset=25
 *
 * Requires .env.local:
 *   SUPABASE_SERVICE_ROLE_KEY, NEXT_PUBLIC_SUPABASE_URL, FMCSA_WEB_KEY
 *
 * Only FMCSA-related company fields are updated on success.
 * Failed API lookups leave existing data untouched.
 */
import { loadEnvLocal } from '../lib/verification/load-env-local';
import type { BatchCompanyOutcome } from '@/lib/fmcsa/refresh/types';

loadEnvLocal();

function parseArgs(argv: string[]) {
  let batch = 25;
  let offset = 0;
  let dryRun = false;

  for (const arg of argv) {
    if (arg === '--dry-run' || arg === '--dryRun') {
      dryRun = true;
      continue;
    }

    const batchMatch = arg.match(/^--batch(?:=|-)?(\d+)$/);
    if (batchMatch) {
      batch = Number(batchMatch[1]);
      continue;
    }

    const offsetMatch = arg.match(/^--offset(?:=|-)?(\d+)$/);
    if (offsetMatch) {
      offset = Number(offsetMatch[1]);
      continue;
    }
  }

  return {
    batch: Number.isFinite(batch) && batch > 0 ? batch : 25,
    offset: Number.isFinite(offset) && offset >= 0 ? offset : 0,
    dryRun,
  };
}

function formatValue(value: string | null | undefined): string {
  if (!value || value.trim() === '') return '(none)';
  return value;
}

function printChangeLines(outcome: BatchCompanyOutcome) {
  if (outcome.changes.length) {
    console.log('  Changes:');
    for (const change of outcome.changes) {
      const severity =
        change.severity === 'critical'
          ? ' [CRITICAL]'
          : change.severity === 'warning'
            ? ' [warning]'
            : '';
      console.log(
        `    - ${change.field}: ${formatValue(change.oldValue)} -> ${formatValue(change.newValue)}${severity}`
      );
    }
    return;
  }

  if (outcome.displayFields) {
    console.log('  Current FMCSA snapshot:');
    const fields = outcome.displayFields;
    console.log(`    - entity_type: ${formatValue(fields.entityType)}`);
    console.log(`    - usdot_status: ${formatValue(fields.usdotStatus)}`);
    console.log(`    - power_units: ${formatValue(fields.powerUnits)}`);
    console.log(`    - mc_number: ${formatValue(fields.mcNumber)}`);
    console.log(`    - authority_status: ${formatValue(fields.authorityStatus)}`);
    console.log(`    - fmcsa_safety_rating: ${formatValue(fields.safetyRating)}`);
    console.log(`    - complaints_last_12m: ${formatValue(fields.complaintsLast12m)}`);
  }
}

function printOutcome(outcome: BatchCompanyOutcome, position: number, total: number) {
  const { company } = outcome;
  const dot = company.usdot_number?.replace(/\D/g, '') ?? 'unknown';
  console.log(
    `\n[${position}/${total}] ${company.name} (${company.slug}) DOT ${dot}`
  );

  if (outcome.status === 'failed') {
    console.log(`  x ${outcome.error ?? 'FMCSA refresh failed — existing data preserved'}`);
    return;
  }

  if (outcome.status === 'skipped_existing') {
    console.log(`  ~ ${outcome.error ?? 'Existing FMCSA data preserved (USDOT lookup failed)'}`);
    return;
  }

  if (outcome.lookupMethod === 'name_search' && outcome.nameMatch) {
    const m = outcome.nameMatch;
    console.log(
      `  + Fetched via NAME SEARCH (query="${m.query}", matched DOT ${m.matchedDot}, ${m.matchedLegalName}, confidence ${m.confidence.toFixed(2)})`
    );
  } else {
    console.log('  + Fetched from FMCSA API (USDOT lookup)');
  }
  printChangeLines(outcome);

  if (outcome.status === 'dry_run') {
    console.log('  -> DRY RUN: no database writes');
  } else if (outcome.status === 'updated') {
    console.log('  -> Updated FMCSA fields in database');
  } else {
    console.log('  -> FMCSA fields refreshed (no field-level diffs detected)');
  }
}

async function main() {
  const { batch, offset, dryRun } = parseArgs(process.argv.slice(2));
  const { runFmcsaBatchRefresh } = await import('../lib/fmcsa/refresh/batch-runner');

  console.log('=== FMCSA Batch Refresh ===');
  console.log(`Batch size: ${batch}`);
  console.log(`Offset: ${offset}`);
  console.log(`Dry run: ${dryRun ? 'yes (no writes)' : 'no (will write on success)'}`);
  console.log('Safety: failed API lookups never overwrite existing company data.');
  console.log(
    'Fallback: when USDOT fails, tries FMCSA name search with city/state fuzzy matching (high confidence only).'
  );
  console.log(
    'Fields updated on success: entity type, USDOT status, power units, MC number, authority, safety rating, complaints, fmcsa_raw, and related FMCSA columns.'
  );

  const result = await runFmcsaBatchRefresh({ batch, offset, dryRun });

  if (result.errors.length && result.companiesSelected === 0) {
    console.error('\nBatch refresh could not start:');
    for (const error of result.errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log(`\nCompanies with USDOT in directory: ${result.totalWithUsdot}`);
  console.log(
    `Processing rows ${offset + 1}-${offset + result.companiesSelected} (batch of ${result.companiesSelected})`
  );

  for (let i = 0; i < result.outcomes.length; i++) {
    printOutcome(result.outcomes[i]!, i + 1, result.companiesSelected);
  }

  console.log('\n=== Summary ===');
  console.log(`Processed: ${result.companiesProcessed}`);
  console.log(`Updated: ${result.companiesUpdated}`);
  console.log(`Unchanged: ${result.companiesUnchanged}`);
  console.log(`Failed: ${result.companiesFailed}`);
  console.log(`Field changes detected: ${result.changesDetected}`);
  const nameRecovered = result.outcomes.filter((o) => o.lookupMethod === 'name_search').length;
  const skippedExisting = result.outcomes.filter((o) => o.status === 'skipped_existing').length;
  if (nameRecovered) console.log(`Recovered via name search: ${nameRecovered}`);
  if (skippedExisting) console.log(`Skipped (existing FMCSA preserved): ${skippedExisting}`);
  console.log(`Duration: ${(result.durationMs / 1000).toFixed(1)}s`);

  if (result.errors.length) {
    console.log('\nErrors:');
    for (const error of result.errors) {
      console.log(`  - ${error}`);
    }
  }

  if (result.nextOffset < result.totalWithUsdot) {
    const nextBatch = Math.min(batch, result.totalWithUsdot - result.nextOffset);
    const dryRunFlag = dryRun ? ' --dry-run' : '';
    console.log('\nNext batch command:');
    console.log(
      `  npm run refresh:fmcsa:batch -- --batch=${nextBatch} --offset=${result.nextOffset}${dryRunFlag}`
    );
  } else {
    console.log('\nAll companies with USDOT have been processed in this pass.');
  }

  if (result.companiesFailed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});