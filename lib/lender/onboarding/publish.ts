import 'server-only';

import { revalidatePath } from 'next/cache';
import { createAdminClient } from '@/lib/lender/supabase/admin';
import { slugFromNmls } from '@/lib/lender/onboarding/schema';
import {
  LENDER_DATA_FRESHNESS_NOTE,
  LENDER_TRANSPARENCY_DISCLAIMER,
} from '@/lib/lender/onboarding/transparency';
import type { LenderOnboardingSubmissionRow } from '@/lib/lender/onboarding/types';
import { resolveCountyFromAddress } from '@/lib/lender/onboarding/county-score';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/lender/supabase';

type Submission = LenderOnboardingSubmissionRow & {
  lender_type?: string;
  street_address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  phone?: string | null;
  website?: string | null;
  county_slug?: string | null;
  state_slug?: string | null;
  county_experience_score?: number;
  google_data?: unknown;
  public_scrape_data?: unknown;
  cfpb_data?: { complaintCount?: number } | null;
  nmls_preview?: { legalName?: string; nmlsId?: string } | null;
};

function uniqueSlug(base: string, nmlsId: string): string {
  return slugFromNmls(nmlsId, base);
}

export async function publishLenderOnboardingSubmission(
  submission: Submission
): Promise<{ success: boolean; error?: string; lenderId?: string; slug?: string }> {
  const admin = createAdminClient();
  const nmls = submission.nmls_preview;
  const legalName = submission.name || nmls?.legalName;
  const nmlsId = submission.nmls_id;

  if (!legalName || !nmlsId) {
    return { success: false, error: 'Missing NMLS data for publish.' };
  }

  const geo = resolveCountyFromAddress({
    zip: submission.zip,
    city: submission.city,
    state: submission.state,
  });

  const slug = uniqueSlug(legalName, nmlsId);
  const bbbRating =
    (submission.public_scrape_data as { bbb_rating?: string } | null)?.bbb_rating ?? null;

  const row: Database['public']['Tables']['lenders']['Insert'] = {
    id: crypto.randomUUID(),
    slug,
    name: legalName,
    nmls_id: nmlsId,
    lender_type: submission.lender_type ?? 'Mortgage',
    city: submission.city,
    state: submission.state ?? geo.state ?? 'US',
    state_slug: submission.state_slug ?? geo.stateSlug ?? 'us',
    county: geo.county ?? submission.city ?? 'Unknown',
    county_slug: submission.county_slug ?? geo.countySlug ?? 'unknown',
    zip_codes: submission.zip ? [submission.zip] : [],
    rating: (submission.google_data as { rating?: number } | null)?.rating ?? null,
    review_count:
      (submission.google_data as { review_count?: number } | null)?.review_count ?? 0,
    trust_score: submission.county_experience_score ?? 50,
    county_experience_score: submission.county_experience_score ?? 50,
    loan_types: ['Conventional', 'FHA', 'VA'],
    specialties: [],
    credit_tiers: ['Good', 'Excellent'],
    nmls_verified: true,
    cfpb_complaints: submission.cfpb_data?.complaintCount ?? 0,
    bbb_rating: bbbRating,
    google_rating: (submission.google_data as { rating?: number } | null)?.rating ?? null,
    trustpilot_rating: null,
    short_description: `${legalName} — NMLS #${nmlsId}. Independent directory profile for research.`,
    website: submission.website,
    phone: submission.phone,
    is_featured: false,
    zero_paid_placement: true,
    published_from_onboarding: true,
    transparency_note: LENDER_TRANSPARENCY_DISCLAIMER,
    data_freshness_note: LENDER_DATA_FRESHNESS_NOTE,
    nmls_preview: submission.nmls_preview as Database['public']['Tables']['lenders']['Insert']['nmls_preview'],
    google_data: submission.google_data as Database['public']['Tables']['lenders']['Insert']['google_data'],
    public_scrape_data:
      submission.public_scrape_data as Database['public']['Tables']['lenders']['Insert']['public_scrape_data'],
    cfpb_complaints_data:
      submission.cfpb_data as Database['public']['Tables']['lenders']['Insert']['cfpb_complaints_data'],
    verification_sources: {
      nmls: { tier: 'primary', url: `https://www.nmlsconsumeraccess.org/EntityDetails.aspx/COMPANY/${nmlsId}` },
      google: { tier: 'supplemental' },
      bbb: { tier: 'public_scrape' },
      cfpb: { tier: 'supplemental' },
    },
  };

  const { data: inserted, error } = await admin.from('lenders').insert(row).select('id, slug').single();

  if (error || !inserted) {
    logger.error('lender.onboarding.publish_failed', { error: error?.message, nmlsId });
    return { success: false, error: error?.message ?? 'Failed to publish lender profile.' };
  }

  await admin
    .from('lender_onboarding_submissions')
    .update({
      status: 'approved',
      lender_id: inserted.id,
      moderated_at: new Date().toISOString(),
      moderated_by: 'admin',
    })
    .eq('id', submission.id);

  revalidatePath(`/lender/lenders/${inserted.slug}`);
  revalidatePath('/lender/local-lenders');

  logger.info('lender.onboarding.published', { lenderId: inserted.id, slug: inserted.slug, nmlsId });

  return { success: true, lenderId: inserted.id, slug: inserted.slug };
}