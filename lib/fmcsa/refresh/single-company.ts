import 'server-only';

import { computeReputationScore } from '@/data/seed-companies';
import { mergeServicesWithEntityType } from '@/lib/fmcsa/derive-directory-services';
import {
  detectBatchFieldChanges,
  extractDisplayFieldsFromSnapshot,
} from '@/lib/fmcsa/refresh/batch-fields';
import { fetchFmcsaCarrierForCompany } from '@/lib/fmcsa/refresh/fetch-company';
import { computeFmcsaDataHash } from '@/lib/fmcsa/refresh/hash';
import { INACTIVE_DOT_NO_MATCH_REASON } from '@/lib/fmcsa/refresh/inactive-dot';
import type { CompanyRefreshRow } from '@/lib/fmcsa/refresh/types';
import { supportsEntityTypeColumn } from '@/lib/fmcsa/refresh/entity-type-column';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { revalidatePublishedCompany } from '@/lib/directory/revalidate-company';
import type { ServiceType } from '@/types';

const COMPANY_SELECT =
  'id, slug, name, headquarters, usdot_number, mc_number, fmcsa_safety_rating, fmcsa_complaints, fmcsa_shipments, authority_active, out_of_service, complaints_last_12m, revocation_date, data_hash, fmcsa_last_checked, fmcsa_raw, services, reputation_score, overall_rating, review_count, bbb_rating, bbb_accredited, is_verified, years_in_business';

function buildFmcsaUpdatePayload(
  company: CompanyRefreshRow,
  snapshot: NonNullable<Awaited<ReturnType<typeof fetchFmcsaCarrierForCompany>>['snapshot']>,
  dataHash: string,
  includeEntityTypeColumn: boolean
) {
  const display = extractDisplayFieldsFromSnapshot(snapshot);
  const existingServices = (company.services ?? []) as ServiceType[];
  const services = mergeServicesWithEntityType(existingServices, display.entityType);

  const reputationScore = computeReputationScore({
    overallRating: company.overall_rating ?? 0,
    reviewCount: company.review_count,
    fmcsaComplaints: snapshot.complaintsLast12m,
    fmcsaShipments: snapshot.shipments,
    bbbRating: (company.bbb_rating as 'A+') ?? 'NR',
    bbbAccredited: company.bbb_accredited,
    isVerified: company.is_verified,
    yearsInBusiness: company.years_in_business ?? 0,
  });

  const nextMc = snapshot.mcNumber?.replace(/\D/g, '') || null;
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
    last_updated: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString(),
  };

  if (nextMc) payload.mc_number = nextMc;

  const nextDot = snapshot.dotNumber?.replace(/\D/g, '') || null;
  const prevDot = company.usdot_number?.replace(/\D/g, '') || null;
  if (nextDot && nextDot !== prevDot) payload.usdot_number = nextDot;

  return payload;
}

export type SingleFmcsaRefreshResult = {
  success: boolean;
  error?: string;
  message?: string;
  fieldsUpdated?: number;
  removed?: boolean;
};

export async function refreshSingleCompanyFmcsa(
  companyId: string,
  options?: { force?: boolean }
): Promise<SingleFmcsaRefreshResult> {
  if (!isSupabaseAdminConfigured()) {
    return { success: false, error: 'Database not configured' };
  }

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    return { success: false, error: 'FMCSA_WEB_KEY not configured' };
  }

  const supabase = createAdminClient();
  const { data: company, error: fetchError } = await supabase
    .from('companies')
    .select(COMPANY_SELECT)
    .eq('id', companyId)
    .maybeSingle();

  if (fetchError || !company) {
    return { success: false, error: 'Company not found' };
  }

  const row = company as CompanyRefreshRow;
  const dot = row.usdot_number?.replace(/\D/g, '');
  if (!dot) {
    return { success: false, error: 'Company has no USDOT number' };
  }

  const fetchResult = await fetchFmcsaCarrierForCompany({
    usdot: dot,
    mcNumber: row.mc_number,
    companyName: row.name,
    headquarters: row.headquarters,
    fmcsaLastChecked: row.fmcsa_last_checked,
    fmcsaRaw: row.fmcsa_raw ?? null,
    batchMode: !options?.force,
  });

  if (fetchResult.lookupMethod === 'skipped_existing') {
    return {
      success: true,
      message: 'FMCSA data is already fresh — use force refresh to re-pull',
      fieldsUpdated: 0,
    };
  }

  const snapshot = fetchResult.snapshot;
  if (!snapshot) {
    if (fetchResult.removeCandidate) {
      const { error: deleteError } = await supabase.from('companies').delete().eq('id', companyId);
      if (deleteError) {
        return { success: false, error: `Remove failed: ${deleteError.message}` };
      }
      revalidatePublishedCompany(row.slug);
      return {
        success: true,
        removed: true,
        message: `Company removed — ${fetchResult.removalReason ?? INACTIVE_DOT_NO_MATCH_REASON}`,
      };
    }
    return {
      success: false,
      error: fetchResult.error ?? `FMCSA lookup failed for DOT ${dot}`,
    };
  }

  const includeEntityTypeColumn = await supportsEntityTypeColumn(supabase);
  const dataHash = computeFmcsaDataHash(snapshot);
  const fieldChanges = detectBatchFieldChanges(row, snapshot);
  const updatePayload = buildFmcsaUpdatePayload(row, snapshot, dataHash, includeEntityTypeColumn);

  if (!updatePayload) {
    return { success: false, error: 'Failed to build FMCSA update payload' };
  }

  const { error: updateError } = await supabase
    .from('companies')
    .update(updatePayload as never)
    .eq('id', companyId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePublishedCompany(row.slug);

  const fieldsUpdated = Math.max(fieldChanges.length, 1);
  return {
    success: true,
    fieldsUpdated,
    message: `DOT data refreshed — ${fieldsUpdated} field${fieldsUpdated === 1 ? '' : 's'} updated`,
  };
}