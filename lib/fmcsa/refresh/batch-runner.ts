import { computeReputationScore } from '@/data/seed-companies';
import { extractContactFromFmcsaRaw } from '@/lib/fmcsa/company-from-row';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import {
  detectBatchFieldChanges,
  extractDisplayFieldsFromSnapshot,
} from '@/lib/fmcsa/refresh/batch-fields';
import { fetchFmcsaCarrierForCompany } from '@/lib/fmcsa/refresh/fetch-company';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { INACTIVE_DOT_NO_MATCH_REASON } from '@/lib/fmcsa/refresh/inactive-dot';
import type {
  BatchCompanyOutcome,
  BatchRefreshOptions,
  BatchRefreshResult,
  CompanyRefreshRow,
  InactiveDotRemovalRecord,
} from '@/lib/fmcsa/refresh/types';
import { supportsEntityTypeColumn } from '@/lib/fmcsa/refresh/entity-type-column';
import { resolvePublicCompanyNameFromSources } from '@/lib/companies/public-display-name';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import type { ServiceType } from '@/types';

const COMPANY_SELECT =
  'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service, complaints_last_12m, revocation_date, data_hash, fmcsa_last_checked, fmcsa_raw, services, reputation_score, overall_rating, review_count, bbb_rating, bbb_accredited, is_verified, years_in_business';

async function countCompaniesWithUsdot(): Promise<number> {
  const supabase = createAdminClient();
  const { count, error } = await supabase
    .from('companies')
    .select('id', { count: 'exact', head: true })
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '');

  if (error) throw new Error(`Count query failed: ${error.message}`);
  return count ?? 0;
}

async function selectBatchCompanies(
  offset: number,
  batch: number
): Promise<CompanyRefreshRow[]> {
  const supabase = createAdminClient();
  const end = Math.max(offset, offset + batch - 1);

  const { data, error } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .not('usdot_number', 'is', null)
    .neq('usdot_number', '')
    .order('fmcsa_last_checked', { ascending: true, nullsFirst: true })
    .order('slug', { ascending: true })
    .range(offset, end);

  if (error) throw new Error(`Company query failed: ${error.message}`);
  return (data ?? []) as CompanyRefreshRow[];
}

function buildFmcsaUpdatePayload(
  company: CompanyRefreshRow,
  snapshot: NonNullable<Awaited<ReturnType<typeof fetchFmcsaCarrierForCompany>>['snapshot']>,
  dataHash: string,
  includeEntityTypeColumn: boolean
) {
  if (!snapshot) return null;

  const display = extractDisplayFieldsFromSnapshot(snapshot);
  const existingServices = (company.services ?? []) as ServiceType[];
  const services = mergeServicesWithEntityType(
    existingServices,
    display.entityType
  );

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

  const nextMc = snapshot.mcNumber?.replace(/\D/g, '') || null;
  const contact = extractContactFromFmcsaRaw(snapshot.raw);
  const payload: Record<string, unknown> = {
    ...(includeEntityTypeColumn ? { entity_type: display.entityType } : {}),
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
    last_updated: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const publicNames = resolvePublicCompanyNameFromSources({
    storedName: company.name,
    legalName: snapshot.legalName,
    dbaName: snapshot.dbaName,
    fmcsaRaw: snapshot.raw,
  });
  if (publicNames.shouldUpdateStoredName && publicNames.publicName) {
    payload.name = publicNames.publicName;
  }

  if (contact.physicalAddress) {
    payload.physical_address = contact.physicalAddress;
    if (!company.headquarters?.trim()) {
      payload.headquarters = contact.physicalAddress;
    }
  }
  if (contact.phone) {
    payload.phone = contact.phone;
  }

  if (nextMc) {
    payload.mc_number = nextMc;
  }

  const nextDot = snapshot.dotNumber?.replace(/\D/g, '') || null;
  const prevDot = company.usdot_number?.replace(/\D/g, '') || null;
  if (nextDot && nextDot !== prevDot) {
    payload.usdot_number = nextDot;
  }

  return payload;
}

function buildRemovalRecord(
  company: CompanyRefreshRow,
  fetchResult: Awaited<ReturnType<typeof fetchFmcsaCarrierForCompany>>
): InactiveDotRemovalRecord {
  return {
    id: company.id,
    slug: company.slug,
    name: company.name,
    usdot_number: company.usdot_number,
    mc_number: company.mc_number,
    headquarters: company.headquarters ?? null,
    reason: fetchResult.removalReason ?? INACTIVE_DOT_NO_MATCH_REASON,
    inactiveDot: fetchResult.inactiveDot ?? company.usdot_number ?? undefined,
    inactiveSaferMessage: fetchResult.inactiveSaferMessage,
  };
}

export async function runFmcsaBatchRefresh(
  options: BatchRefreshOptions
): Promise<BatchRefreshResult> {
  const started = Date.now();
  const batch = Math.max(1, options.batch);
  const offset = Math.max(0, options.offset);
  const dryRun = Boolean(options.dryRun);
  const outcomes: BatchCompanyOutcome[] = [];
  const errors: string[] = [];

  if (!isSupabaseAdminConfigured()) {
    return {
      batch,
      offset,
      dryRun,
      totalWithUsdot: 0,
      companiesSelected: 0,
      companiesProcessed: 0,
      companiesUpdated: 0,
      companiesUnchanged: 0,
      companiesFailed: 0,
      companiesRemoved: 0,
      companiesDotCorrected: 0,
      changesDetected: 0,
      errors: ['SUPABASE_SERVICE_ROLE_KEY not configured'],
      removals: [],
      durationMs: Date.now() - started,
      outcomes,
      nextOffset: offset + batch,
    };
  }

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    return {
      batch,
      offset,
      dryRun,
      totalWithUsdot: 0,
      companiesSelected: 0,
      companiesProcessed: 0,
      companiesUpdated: 0,
      companiesUnchanged: 0,
      companiesFailed: 0,
      companiesRemoved: 0,
      companiesDotCorrected: 0,
      changesDetected: 0,
      errors: ['FMCSA_WEB_KEY not configured'],
      removals: [],
      durationMs: Date.now() - started,
      outcomes,
      nextOffset: offset + batch,
    };
  }

  const supabase = createAdminClient();
  const batchMode = options.batchMode !== false;
  const includeEntityTypeColumn = await supportsEntityTypeColumn(supabase);
  const totalWithUsdot = await countCompaniesWithUsdot();
  const companies = await selectBatchCompanies(offset, batch);

  let processed = 0;
  let updated = 0;
  let unchanged = 0;
  let failed = 0;
  let removed = 0;
  let dotCorrected = 0;
  let changesDetected = 0;
  const removals: InactiveDotRemovalRecord[] = [];

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i]!;
    processed++;
    const dot = company.usdot_number?.replace(/\D/g, '');

    if (!dot) {
      failed++;
      const error = 'missing USDOT';
      errors.push(`${company.slug}: ${error}`);
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'failed',
        changes: [],
        error,
      });
      continue;
    }

    const fetchResult = await fetchFmcsaCarrierForCompany({
      usdot: dot,
      mcNumber: company.mc_number,
      companyName: company.name,
      headquarters: company.headquarters,
      fmcsaLastChecked: company.fmcsa_last_checked,
      fmcsaRaw: company.fmcsa_raw ?? null,
      batchMode,
    });

    if (fetchResult.lookupMethod === 'skipped_existing') {
      unchanged++;
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'skipped_existing',
        lookupMethod: 'skipped_existing',
        changes: [],
        error: fetchResult.skippedReason,
      });
      continue;
    }

    const snapshot = fetchResult.snapshot;
    if (!snapshot) {
      if (fetchResult.removeCandidate) {
        const removal = buildRemovalRecord(company, fetchResult);
        removals.push(removal);

        if (dryRun) {
          outcomes.push({
            index: offset + i + 1,
            company,
            status: 'would_remove',
            lookupMethod: fetchResult.lookupMethod,
            removal,
            changes: [],
            error: fetchResult.error,
          });
        } else {
          const { error: deleteError } = await supabase
            .from('companies')
            .delete()
            .eq('id', company.id);

          if (deleteError) {
            failed++;
            const error = `Remove failed — ${deleteError.message}`;
            errors.push(`${company.slug}: ${error}`);
            outcomes.push({
              index: offset + i + 1,
              company,
              status: 'failed',
              removal,
              changes: [],
              error,
            });
            continue;
          }

          removed++;
          outcomes.push({
            index: offset + i + 1,
            company,
            status: 'removed',
            lookupMethod: fetchResult.lookupMethod,
            removal,
            changes: [],
            error: fetchResult.error,
          });
        }
        continue;
      }

      failed++;
      const error =
        fetchResult.error ?? `FMCSA lookup failed for DOT ${dot} — existing data preserved`;
      errors.push(`${company.slug}: ${error}`);
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'failed',
        lookupMethod: fetchResult.lookupMethod,
        nameMatch: fetchResult.nameMatch
          ? {
              query: fetchResult.nameMatch.query,
              matchedLegalName: fetchResult.nameMatch.matchedLegalName,
              matchedDot: fetchResult.nameMatch.matchedDot,
              confidence: fetchResult.nameMatch.confidence,
            }
          : undefined,
        changes: [],
        error,
      });
      continue;
    }

    const nameMatchSummary = fetchResult.nameMatch
      ? {
          query: fetchResult.nameMatch.query,
          matchedLegalName: fetchResult.nameMatch.matchedLegalName,
          matchedDot: fetchResult.nameMatch.matchedDot,
          confidence: fetchResult.nameMatch.confidence,
        }
      : undefined;

    const dataHash = computeFmcsaDataHash(snapshot);
    const fieldChanges = detectBatchFieldChanges(company, snapshot);
    const displayFields = extractDisplayFieldsFromSnapshot(snapshot);
    changesDetected += fieldChanges.length;

    const updatePayload = buildFmcsaUpdatePayload(
      company,
      snapshot,
      dataHash,
      includeEntityTypeColumn
    );
    const correctedDot = Boolean(fetchResult.dotCorrected);
    if (correctedDot) dotCorrected++;
    const hasMeaningfulChanges =
      fieldChanges.length > 0 ||
      company.data_hash !== dataHash ||
      correctedDot;

    if (dryRun) {
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'dry_run',
        lookupMethod: fetchResult.lookupMethod,
        nameMatch: nameMatchSummary,
        dotCorrected: correctedDot,
        previousDot: fetchResult.previousDot,
        changes: fieldChanges,
        displayFields,
      });
      if (hasMeaningfulChanges) updated++;
      else unchanged++;
      continue;
    }

    if (!updatePayload) {
      failed++;
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'failed',
        changes: [],
        error: 'Could not build update payload',
      });
      continue;
    }

    const { error: updateError } = await supabase
      .from('companies')
      .update(updatePayload)
      .eq('id', company.id);

    if (updateError) {
      failed++;
      const error = `DB update failed — ${updateError.message}`;
      errors.push(`${company.slug}: ${error}`);
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'failed',
        changes: fieldChanges,
        error,
      });
      continue;
    }

    if (hasMeaningfulChanges) {
      updated++;
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'updated',
        lookupMethod: fetchResult.lookupMethod,
        nameMatch: nameMatchSummary,
        dotCorrected: correctedDot,
        previousDot: fetchResult.previousDot,
        changes: fieldChanges,
        displayFields,
      });
    } else {
      unchanged++;
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'unchanged',
        lookupMethod: fetchResult.lookupMethod,
        nameMatch: nameMatchSummary,
        dotCorrected: correctedDot,
        previousDot: fetchResult.previousDot,
        changes: [],
        displayFields,
      });
    }
  }

  if (!dryRun && (removed > 0 || updated > 0)) {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache');
      const { COMPANIES_DIRECTORY_TAG } = await import('@/lib/directory/revalidate-company');
      revalidateTag(COMPANIES_DIRECTORY_TAG);
      revalidatePath('/companies', 'page');
      revalidatePath('/companies', 'layout');
      revalidatePath('/verify-dot', 'page');
      revalidatePath('/sitemap.xml');
    } catch {
      // CLI scripts run outside Next.js request context
    }
  }

  return {
    batch,
    offset,
    dryRun,
    totalWithUsdot,
    companiesSelected: companies.length,
    companiesProcessed: processed,
    companiesUpdated: updated,
    companiesUnchanged: unchanged,
    companiesFailed: failed,
    companiesRemoved: removed,
    companiesDotCorrected: dotCorrected,
    changesDetected,
    errors,
    removals,
    durationMs: Date.now() - started,
    outcomes,
    nextOffset: offset + companies.length,
  };
}