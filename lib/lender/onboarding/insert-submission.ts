import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LenderOnboardingInput } from '@/lib/lender/onboarding/schema';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import {
  LENDER_DATA_FRESHNESS_NOTE,
  LENDER_TRANSPARENCY_DISCLAIMER,
} from '@/lib/lender/onboarding/transparency';
import type { Database } from '@/types/lender/supabase';

type AdminClient = SupabaseClient<Database>;

export function buildLenderOnboardingInsertRow(params: {
  parsed: LenderOnboardingInput;
  enrichment: EnrichedLenderPreview;
  userIp: string | null;
  emailHash: string;
  ipHash: string | null;
}): Record<string, unknown> {
  const { nmls, google, publicScrape, cfpb, countySlug, stateSlug, countyExperienceScore } =
    params.enrichment;

  return {
    name: nmls.legalName,
    nmls_id: nmls.nmlsId,
    lender_type: params.parsed.lenderType,
    details: params.parsed.details ?? null,
    status: 'pending',
    submitted_by_name: params.parsed.submittedByName,
    submitted_by_email: params.parsed.submittedByEmail,
    submitter_ip: params.userIp,
    ip_hash: params.ipHash,
    email_hash: params.emailHash,
    source_page: params.parsed.sourcePage,
    legal_name: nmls.legalName,
    street_address: nmls.streetAddress,
    city: nmls.city,
    state: nmls.state,
    zip: params.parsed.zipCode ?? nmls.zip,
    phone: nmls.phone,
    fax: nmls.fax,
    website: nmls.website,
    business_email: nmls.businessEmail,
    date_formed: nmls.dateFormed,
    nmls_preview: nmls,
    nmls_raw: nmls,
    google_data: google,
    public_scrape_data: publicScrape,
    cfpb_data: cfpb,
    county_slug: countySlug,
    state_slug: stateSlug,
    county_experience_score: countyExperienceScore,
    needs_manual_review: nmls.needsManualReview,
    transparency_disclaimer: LENDER_TRANSPARENCY_DISCLAIMER,
    data_freshness_note: LENDER_DATA_FRESHNESS_NOTE,
  };
}

export async function insertLenderOnboardingSubmission(
  admin: AdminClient,
  row: Record<string, unknown>
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const { data, error } = await admin
    .from('lender_onboarding_submissions')
    .insert(row as Database['public']['Tables']['lender_onboarding_submissions']['Insert'])
    .select('id')
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? 'Failed to save submission.' };
  }

  return { ok: true, id: data.id };
}