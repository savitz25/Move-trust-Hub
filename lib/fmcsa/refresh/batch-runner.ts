import { computeReputationScore } from '@/data/seed-companies';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import {
  detectBatchFieldChanges,
  extractDisplayFieldsFromSnapshot,
} from '@/lib/fmcsa/refresh/batch-fields';
import { fetchFmcsaCarrierForCompany } from '@/lib/fmcsa/refresh/fetch-company';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import type {
  BatchCompanyOutcome,
  BatchRefreshOptions,
  BatchRefreshResult,
  CompanyRefreshRow,
} from '@/lib/fmcsa/refresh/types';
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
  dataHash: string
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
  const payload: Record<string, unknown> = {
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

  if (nextMc) {
    payload.mc_number = nextMc;
  }

  return payload;
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
      changesDetected: 0,
      errors: ['SUPABASE_SERVICE_ROLE_KEY not configured'],
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
      changesDetected: 0,
      errors: ['FMCSA_WEB_KEY not configured'],
      durationMs: Date.now() - started,
      outcomes,
      nextOffset: offset + batch,
    };
  }

  const supabase = createAdminClient();
  const totalWithUsdot = await countCompaniesWithUsdot();
  const companies = await selectBatchCompanies(offset, batch);

  let processed = 0;
  let updated = 0;
  let unchanged = 0;
  let failed = 0;
  let changesDetected = 0;

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

    const updatePayload = buildFmcsaUpdatePayload(company, snapshot, dataHash);
    const hasMeaningfulChanges =
      fieldChanges.length > 0 || company.data_hash !== dataHash;

    if (dryRun) {
      outcomes.push({
        index: offset + i + 1,
        company,
        status: 'dry_run',
        lookupMethod: fetchResult.lookupMethod,
        nameMatch: nameMatchSummary,
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
        changes: [],
        displayFields,
      });
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
    changesDetected,
    errors,
    durationMs: Date.now() - started,
    outcomes,
    nextOffset: offset + companies.length,
  };
}