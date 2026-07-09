/**
 * Precise directory corrections — JK Moving DOT fix + inactive company removals.
 *
 * Dry run:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/directory-corrections.ts --dry-run
 *
 * Live:
 *   npx tsx --require ./scripts/stub-server-only.cjs scripts/directory-corrections.ts --confirm
 */
import { mkdirSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { computeReputationScore } from '@/data/seed-companies';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import {
  detectBatchFieldChanges,
  extractDisplayFieldsFromSnapshot,
} from '@/lib/fmcsa/refresh/batch-fields';
import { fetchFmcsaCarrierSnapshot } from '@/lib/fmcsa/refresh/fetch-carrier-core';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import type { CompanyRefreshRow } from '@/lib/fmcsa/refresh/types';
import { buildVerificationSourcesFromOnboarding } from '@/lib/suggestions/build-verification-sources';
import { createAdminClient } from '@/lib/supabase/admin';
import { loadEnvLocal } from '../lib/verification/load-env-local';

loadEnvLocal();

const JK_SLUG = 'jk-moving-services';
const JK_NEW_DOT = '1065394';

const REMOVAL_TARGETS = [
  { id: 'pensey', slug: 'pensey-moving', name: 'Pensey Moving & Storage' },
  { id: 'safeway', slug: 'safeway-moving', name: 'Safeway Moving' },
  { id: 'royal', slug: 'royal-moving', name: 'Royal Moving & Storage' },
  { id: 'atx-movers-llc', slug: 'atx-movers-llc', name: 'ATX MOVERS LLC' },
] as const;

const COMPANY_SELECT =
  'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service, complaints_last_12m, revocation_date, data_hash, fmcsa_last_checked, fmcsa_raw, services, reputation_score, overall_rating, review_count, bbb_rating, bbb_accredited, is_verified, years_in_business, verification_sources';

type ChangeLog = {
  executedAt: string;
  dryRun: boolean;
  jkMoving: Record<string, unknown>;
  removals: Array<Record<string, unknown>>;
  verification: Record<string, unknown>;
};

function parseArgs(argv: string[]) {
  return {
    dryRun: argv.includes('--dry-run') || !argv.includes('--confirm'),
    confirm: argv.includes('--confirm'),
  };
}

async function countRelatedData(admin: ReturnType<typeof createAdminClient>, companyId: string) {
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

async function refreshJkMovingFmcsa(
  admin: ReturnType<typeof createAdminClient>,
  company: CompanyRefreshRow,
  dryRun: boolean
) {
  const oldDot = company.usdot_number?.replace(/\D/g, '') ?? '';
  const snapshot = await fetchFmcsaCarrierSnapshot(JK_NEW_DOT, company.mc_number);

  if (!snapshot?.legalName) {
    throw new Error(`FMCSA lookup failed for DOT ${JK_NEW_DOT}`);
  }

  const dataHash = computeFmcsaDataHash(snapshot);
  const fieldChanges = detectBatchFieldChanges(company, snapshot);
  const displayFields = extractDisplayFieldsFromSnapshot(snapshot);
  const existingServices = (company.services ?? []) as import('@/types').ServiceType[];
  const services = mergeServicesWithEntityType(existingServices, displayFields.entityType);

  const reputationScore = computeReputationScore({
    overallRating: company.overall_rating ?? 0,
    reviewCount: company.review_count,
    fmcsaComplaints: snapshot.complaintsLast12m,
    fmcsaShipments: snapshot.shipments,
    bbbRating: (company.bbb_rating as any) ?? 'NR',
    bbbAccredited: company.bbb_accredited,
    isVerified: company.is_verified,
    yearsInBusiness: company.years_in_business ?? 0,
  });

  const nextMc = snapshot.mcNumber?.replace(/\D/g, '') || company.mc_number;
  const verificationSources = buildVerificationSourcesFromOnboarding({
    fmcsaSnapshot: snapshot,
    fmcsaRaw: snapshot.raw,
    google: null,
    publicScrape: null,
  });

  const updatePayload = {
    usdot_number: JK_NEW_DOT,
    mc_number: nextMc,
    fmcsa_safety_rating: snapshot.safetyRating,
    fmcsa_complaints: snapshot.complaintsLast12m,
    fmcsa_shipments: snapshot.shipments,
    complaints_last_12m: snapshot.complaintsLast12m,
    authority_active: snapshot.authorityActive,
    out_of_service: snapshot.outOfService,
    revocation_date: snapshot.revocationDate,
    data_hash: dataHash,
    fmcsa_last_checked: new Date().toISOString(),
    fmcsa_legal_name: snapshot.legalName ?? null,
    fmcsa_raw: snapshot.raw,
    services,
    reputation_score: reputationScore,
    verification_sources: verificationSources,
    verification_last_synced_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (!dryRun) {
    const { error } = await admin.from('companies').update(updatePayload).eq('id', company.id);
    if (error) throw new Error(`JK Moving update failed: ${error.message}`);
  }

  return {
    slug: company.slug,
    oldDot,
    newDot: JK_NEW_DOT,
    legalName: snapshot.legalName,
    fieldChanges,
    displayFields,
    dryRun,
  };
}

async function removeCompanies(
  admin: ReturnType<typeof createAdminClient>,
  dryRun: boolean
) {
  const results: Array<Record<string, unknown>> = [];

  for (const target of REMOVAL_TARGETS) {
    const { data: row, error: fetchError } = await admin
      .from('companies')
      .select('id, slug, name, usdot_number, mc_number, headquarters')
      .eq('id', target.id)
      .maybeSingle();

    if (fetchError) throw new Error(`Fetch ${target.id}: ${fetchError.message}`);

    if (!row) {
      results.push({ ...target, status: 'not_found' });
      continue;
    }

    const related = await countRelatedData(admin, target.id);

    if (!dryRun) {
      const { error: deleteError } = await admin.from('companies').delete().eq('id', target.id);
      if (deleteError) throw new Error(`Delete ${target.id}: ${deleteError.message}`);
    }

    results.push({
      ...target,
      usdot_number: row.usdot_number,
      mc_number: row.mc_number,
      headquarters: row.headquarters,
      relatedCounts: related,
      status: dryRun ? 'would_delete' : 'deleted',
    });
  }

  return results;
}

async function verifyClean(admin: ReturnType<typeof createAdminClient>) {
  const slugs = [...REMOVAL_TARGETS.map((t) => t.slug), JK_SLUG];
  const checks: Record<string, unknown> = {};

  for (const slug of slugs) {
    const { data } = await admin.from('companies').select('id, slug, usdot_number').eq('slug', slug).maybeSingle();
    checks[slug] = data ?? null;
  }

  const orphanReviews: Record<string, number> = {};
  for (const target of REMOVAL_TARGETS) {
    const { count } = await admin
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .eq('company_id', target.id);
    orphanReviews[target.id] = count ?? 0;
  }

  return { companies: checks, orphanReviews };
}

async function tryRevalidate(slugs: string[]) {
  try {
    const { revalidatePublishedCompany } = await import('@/lib/directory/revalidate-company');
    const { revalidateDestinationPaths } = await import('@/lib/suggestions/revalidate-destination');
    const { revalidatePath } = await import('next/cache');

    revalidatePublishedCompany(JK_SLUG);
    revalidateDestinationPaths('Sterling, VA');

    for (const target of REMOVAL_TARGETS) {
      revalidatePublishedCompany(target.slug);
    }

    revalidatePath('/companies', 'page');
    revalidatePath('/companies', 'layout');
    revalidatePath('/sitemap.xml');

    return { revalidated: slugs, note: 'cache tags and paths invalidated' };
  } catch {
    return {
      revalidated: false,
      note: 'Next.js cache revalidation skipped (run from app server or wait for deploy / 60s TTL)',
    };
  }
}

async function main() {
  const { dryRun } = parseArgs(process.argv.slice(2));
  const admin = createAdminClient();

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    throw new Error('FMCSA_WEB_KEY not configured');
  }

  const { data: jkBefore, error: jkErr } = await admin
    .from('companies')
    .select(COMPANY_SELECT)
    .eq('slug', JK_SLUG)
    .single();

  if (jkErr || !jkBefore) {
    throw new Error(`JK Moving not found: ${jkErr?.message ?? JK_SLUG}`);
  }

  console.log('=== Directory Corrections ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}\n`);

  console.log('1) JK Moving Services — update DOT and refresh FMCSA');
  console.log(`   Current DOT: ${jkBefore.usdot_number} → ${JK_NEW_DOT}`);

  const jkResult = await refreshJkMovingFmcsa(admin, jkBefore as CompanyRefreshRow, dryRun);
  console.log(`   FMCSA legal name: ${jkResult.legalName}`);
  console.log(`   entity_type: ${jkResult.displayFields.entityType}`);
  console.log(`   usdot_status: ${jkResult.displayFields.usdotStatus}`);
  console.log(`   power_units: ${jkResult.displayFields.powerUnits}`);
  console.log(`   authority_status: ${jkResult.displayFields.authorityStatus}`);
  console.log(`   safety_rating: ${jkResult.displayFields.safetyRating}`);
  if (jkResult.fieldChanges.length) {
    console.log('   Field changes:');
    for (const c of jkResult.fieldChanges) {
      console.log(`     - ${c.field}: ${c.oldValue ?? '(none)'} → ${c.newValue ?? '(none)'}`);
    }
  }

  console.log('\n2) Remove inactive / invalid companies');
  const removalResults = await removeCompanies(admin, dryRun);
  for (const r of removalResults) {
    console.log(
      `   ${r.status}: ${r.name} (${r.slug}) — related: ${JSON.stringify(r.relatedCounts ?? {})}`
    );
  }

  let verification: Record<string, unknown> = { skipped: dryRun };
  let revalidation: Record<string, unknown> = { skipped: dryRun };

  if (!dryRun) {
    verification = await verifyClean(admin);
    revalidation = await tryRevalidate([JK_SLUG, ...REMOVAL_TARGETS.map((t) => t.slug)]);
  }

  const changeLog: ChangeLog = {
    executedAt: new Date().toISOString(),
    dryRun,
    jkMoving: {
      before: {
        usdot_number: jkBefore.usdot_number,
        mc_number: jkBefore.mc_number,
        authority_active: jkBefore.authority_active,
        fmcsa_safety_rating: jkBefore.fmcsa_safety_rating,
      },
      after: jkResult,
    },
    removals: removalResults,
    verification,
    revalidation,
  };

  const outDir = resolve(process.cwd(), 'scripts/output');
  mkdirSync(outDir, { recursive: true });
  const logPath = resolve(
    outDir,
    `directory-corrections-${dryRun ? 'dry-run-' : ''}${new Date().toISOString().slice(0, 10)}.json`
  );
  writeFileSync(logPath, JSON.stringify(changeLog, null, 2), 'utf8');

  console.log(`\nChange log: ${logPath}`);

  if (dryRun) {
    console.log('\nDry run complete. Re-run with --confirm to apply.');
    return;
  }

  console.log('\n3) Post-change verification');
  console.log(JSON.stringify(verification, null, 2));
  console.log('\nDone. Directory corrections applied.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});