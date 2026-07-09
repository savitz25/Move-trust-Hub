/**
 * Full-directory FMCSA refresh + remove companies without active operating authority.
 *
 * Dry run (refresh writes, no deletes):
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/fmcsa-authority-cleanup.ts --dry-run
 *
 * Live:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/fmcsa-authority-cleanup.ts --confirm
 *
 * Skip refresh (only scan + remove from current DB state):
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/fmcsa-authority-cleanup.ts --confirm --skip-refresh
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { formatAuthorityStatus } from '@/lib/fmcsa/carrier-fields';
import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const BATCH_SIZE = 40;

type CompanyRow = {
  id: string;
  slug: string;
  name: string;
  headquarters: string | null;
  usdot_number: string | null;
  mc_number: string | null;
  authority_active: boolean | null;
  out_of_service: boolean | null;
  fmcsa_last_checked: string | null;
  fmcsa_safety_rating: string | null;
  fmcsa_raw: Record<string, unknown> | null;
};

type RemovalReason = 'out_of_service' | 'authority_inactive' | 'not_allowed_to_operate';

function parseArgs(argv: string[]) {
  return {
    dryRun: argv.includes('--dry-run') || !argv.includes('--confirm'),
    confirm: argv.includes('--confirm'),
    skipRefresh: argv.includes('--skip-refresh'),
  };
}

function csvEscape(value: string | null | undefined): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

/** Matches batch refresh + badge logic: authority_active and out_of_service only. */
function classifyRemoval(company: CompanyRow): RemovalReason | null {
  if (company.out_of_service === true) return 'out_of_service';
  if (company.authority_active === false) return 'authority_inactive';

  const raw = company.fmcsa_raw;
  if (!raw || !company.fmcsa_last_checked) return null;

  const allowed = String(raw.allowedToOperate ?? raw.allowToOperate ?? '')
    .trim()
    .toUpperCase();
  if (allowed === 'N') return 'not_allowed_to_operate';

  return null;
}

async function runFullRefresh() {
  const { runFmcsaBatchRefresh } = await import('../lib/fmcsa/refresh/batch-runner');
  let offset = 0;
  let totalWithUsdot = 0;
  const summaries: Array<Record<string, unknown>> = [];

  do {
    console.log(`\n--- FMCSA batch offset=${offset} size=${BATCH_SIZE} ---`);
    const result = await runFmcsaBatchRefresh({
      batch: BATCH_SIZE,
      offset,
      dryRun: false,
    });

    totalWithUsdot = result.totalWithUsdot;
    summaries.push({
      offset,
      processed: result.companiesProcessed,
      updated: result.companiesUpdated,
      unchanged: result.companiesUnchanged,
      failed: result.companiesFailed,
      nameRecovered: result.outcomes.filter((o) => o.lookupMethod === 'name_search').length,
      errors: result.errors.slice(0, 10),
    });

    console.log(
      `Batch done: ${result.companiesProcessed} processed, ${result.companiesUpdated} updated, ${result.companiesFailed} failed`
    );

    if (result.companiesSelected === 0) break;
    offset = result.nextOffset;
  } while (offset < totalWithUsdot);

  return { totalWithUsdot, summaries };
}

async function selectInactiveCompanies(admin: ReturnType<typeof createAdminClient>) {
  const { data, error } = await admin
    .from('companies')
    .select(
      'id, slug, name, headquarters, usdot_number, mc_number, authority_active, out_of_service, fmcsa_last_checked, fmcsa_safety_rating, fmcsa_raw'
    )
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '')
    .order('slug');

  if (error) throw new Error(`Select failed: ${error.message}`);

  const rows = (data ?? []) as CompanyRow[];
  const toRemove: Array<CompanyRow & { reason: RemovalReason; authorityStatus: string | null }> = [];

  for (const row of rows) {
    const reason = classifyRemoval(row);
    if (!reason) continue;
    toRemove.push({
      ...row,
      reason,
      authorityStatus: row.fmcsa_raw ? formatAuthorityStatus(row.fmcsa_raw) : null,
    });
  }

  return { allWithUsdot: rows.length, toRemove };
}

async function countRelated(admin: ReturnType<typeof createAdminClient>, companyId: string) {
  const tables = ['reviews', 'fmcsa_change_log', 'bbb_change_log', 'company_suggestions'] as const;
  const counts: Record<string, number> = {};
  for (const table of tables) {
    const { count } = await admin
      .from(table)
      .select('id', { count: 'exact', head: true })
      .eq('company_id', companyId);
    counts[table] = count ?? 0;
  }
  return counts;
}

async function removeCompanies(
  admin: ReturnType<typeof createAdminClient>,
  targets: Array<CompanyRow & { reason: RemovalReason }>,
  dryRun: boolean
) {
  const results: Array<Record<string, unknown>> = [];

  for (const target of targets) {
    const related = await countRelated(admin, target.id);
    if (!dryRun) {
      const { error } = await admin.from('companies').delete().eq('id', target.id);
      if (error) throw new Error(`Delete ${target.slug}: ${error.message}`);
    }
    results.push({
      id: target.id,
      slug: target.slug,
      name: target.name,
      usdot_number: target.usdot_number,
      mc_number: target.mc_number,
      headquarters: target.headquarters,
      reason: target.reason,
      authority_active: target.authority_active,
      out_of_service: target.out_of_service,
      authorityStatus: (target as { authorityStatus?: string | null }).authorityStatus ?? null,
      fmcsa_last_checked: target.fmcsa_last_checked,
      relatedCounts: related,
      status: dryRun ? 'would_delete' : 'deleted',
    });
  }

  return results;
}

async function tryRevalidate(slugs: string[]) {
  try {
    const { revalidatePublishedCompany } = await import('@/lib/directory/revalidate-company');
    const { revalidatePath, revalidateTag } = await import('next/cache');
    const { COMPANIES_DIRECTORY_TAG } = await import('@/lib/directory/revalidate-company');

    revalidateTag(COMPANIES_DIRECTORY_TAG);
    revalidatePath('/companies', 'page');
    revalidatePath('/companies', 'layout');
    revalidatePath('/verify-dot', 'page');
    revalidatePath('/sitemap.xml');

    for (const slug of slugs) {
      revalidatePublishedCompany(slug);
    }

    return { revalidated: true, slugs };
  } catch {
    return {
      revalidated: false,
      note: 'Cache revalidation skipped outside Next.js — deploy or 60s TTL will clear directory cache',
    };
  }
}

async function main() {
  const { dryRun, skipRefresh } = parseArgs(process.argv.slice(2));
  const admin = createAdminClient();

  if (!process.env.FMCSA_WEB_KEY?.trim() && !skipRefresh) {
    throw new Error('FMCSA_WEB_KEY not configured');
  }

  console.log('=== FMCSA Authority Directory Cleanup ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN (no deletes)' : 'LIVE'}`);
  console.log(`Refresh: ${skipRefresh ? 'skipped' : 'full directory'}\n`);

  let refreshSummary: Record<string, unknown> = { skipped: true };
  if (!skipRefresh) {
    refreshSummary = await runFullRefresh();
    console.log('\nFull FMCSA refresh complete.');
  }

  const { allWithUsdot, toRemove } = await selectInactiveCompanies(admin);

  console.log(`\nCompanies with USDOT: ${allWithUsdot}`);
  console.log(`Inactive / NOT AUTHORIZED after refresh: ${toRemove.length}`);

  if (toRemove.length) {
    console.log('\nRemoval targets:');
    for (const r of toRemove) {
      console.log(
        `  - ${r.slug} | ${r.name} | DOT ${r.usdot_number} | reason=${r.reason} | auth=${r.authority_active} | status=${r.authorityStatus ?? 'n/a'}`
      );
    }
  }

  const removalResults = await removeCompanies(admin, toRemove, dryRun);

  let verification: Record<string, unknown> = {};
  if (!dryRun && toRemove.length) {
    const { data: remainingInactive } = await admin
      .from('companies')
      .select('slug')
      .or('authority_active.eq.false,out_of_service.eq.true');
    const { count: remainingTotal } = await admin
      .from('companies')
      .select('id', { count: 'exact', head: true });
    verification = {
      remainingCompanies: remainingTotal ?? 0,
      remainingInactiveAuthority: (remainingInactive ?? []).map((r) => r.slug),
    };
  }

  const revalidation = dryRun
    ? { skipped: true }
    : await tryRevalidate(toRemove.map((r) => r.slug));

  const changeLog = {
    executedAt: new Date().toISOString(),
    dryRun,
    skipRefresh,
    refreshSummary,
    scannedWithUsdot: allWithUsdot,
    removedCount: toRemove.length,
    removals: removalResults,
    verification,
    revalidation,
  };

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });

  const csvPath = resolve(
    outDir,
    `fmcsa-authority-removed-${dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.csv`
  );
  const jsonPath = resolve(
    outDir,
    `fmcsa-authority-cleanup-${dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.json`
  );

  const csvHeader =
    'id,slug,name,usdot_number,mc_number,headquarters,reason,authority_active,out_of_service,authority_status,status';
  const csvLines = removalResults.map((r) =>
    [
      r.id,
      r.slug,
      r.name,
      r.usdot_number,
      r.mc_number,
      r.headquarters,
      r.reason,
      r.authority_active,
      r.out_of_service,
      r.authorityStatus,
      r.status,
    ]
      .map((v) => csvEscape(String(v ?? '')))
      .join(',')
  );
  writeFileSync(csvPath, [csvHeader, ...csvLines].join('\n'), 'utf8');
  writeFileSync(jsonPath, JSON.stringify(changeLog, null, 2), 'utf8');

  console.log(`\nRemoval CSV: ${csvPath}`);
  console.log(`Change log: ${jsonPath}`);

  if (dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to delete inactive companies.');
    return;
  }

  console.log('\n=== Post-cleanup verification ===');
  console.log(JSON.stringify(verification, null, 2));
  console.log('\nDone. Directory now contains only companies with active FMCSA operating authority.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});