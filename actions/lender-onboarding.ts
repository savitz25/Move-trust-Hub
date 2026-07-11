'use server';

import { headers } from 'next/headers';
import { enrichLenderSources } from '@/lib/lender/onboarding/enrich-lender';
import { checkLenderOnboardingDuplicate } from '@/lib/lender/onboarding/duplicates';
import {
  buildLenderOnboardingInsertRow,
  insertLenderOnboardingSubmission,
} from '@/lib/lender/onboarding/insert-submission';
import {
  lookupNmlsForOnboarding,
  searchNmlsByName,
  type NmlsLookupResult,
  type NmlsNameSearchResult,
} from '@/lib/lender/onboarding/nmls-lookup';
import { checkLenderOnboardingRateLimit } from '@/lib/lender/onboarding/rate-limit';
import { lenderOnboardingSchema, slugFromNmls } from '@/lib/lender/onboarding/schema';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import { createAdminClient } from '@/lib/lender/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';
import { hashEmail, hashIp } from '@/lib/reviews/hash';
import { logger } from '@/lib/logging/logger';

export type SubmitLenderOnboardingResult = {
  success: boolean;
  error?: string;
  submissionId?: string;
  profileSlug?: string;
  existingProfileSlug?: string;
  pendingReview?: boolean;
};

export type PreviewEnrichedLenderResult = {
  success: boolean;
  error?: string;
  preview?: EnrichedLenderPreview;
};

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

export async function previewEnrichedLenderSuggestion(input: {
  nmlsId?: string;
  zipCode?: string | null;
}): Promise<PreviewEnrichedLenderResult> {
  if (!input.nmlsId?.trim()) {
    return { success: false, error: 'NMLS ID is required.' };
  }

  const nmlsResult = await lookupNmlsForOnboarding(input.nmlsId);
  if (!nmlsResult.success || !nmlsResult.preview) {
    return { success: false, error: nmlsResult.error ?? 'NMLS lookup failed.' };
  }

  const enrichment = await enrichLenderSources(nmlsResult.preview, input.zipCode);
  return { success: true, preview: enrichment };
}

export async function lookupNmlsForOnboardingAction(
  nmlsId: string
): Promise<NmlsLookupResult> {
  return lookupNmlsForOnboarding(nmlsId);
}

export async function searchNmlsForOnboardingAction(
  companyName: string,
  state?: string
): Promise<NmlsNameSearchResult> {
  return searchNmlsByName(companyName, state);
}

export async function submitLenderOnboarding(
  raw: unknown
): Promise<SubmitLenderOnboardingResult> {
  try {
    const parsed = lenderOnboardingSchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        Object.values(first).flat()[0] ?? 'Please check your submission and try again.';
      return { success: false, error: msg };
    }

    if (!isSupabaseAdminConfigured()) {
      return {
        success: false,
        error: 'Onboarding is temporarily unavailable. Please try again later.',
      };
    }

    const headerStore = await headers();
    const userIp = clientIpFromHeaders(headerStore);
    const emailHash = hashEmail(parsed.data.submittedByEmail);
    const ipHash = userIp ? hashIp(userIp) : null;

    const rateCheck = await checkLenderOnboardingRateLimit({
      ip: userIp,
      email: parsed.data.submittedByEmail,
      ipHash,
      emailHash,
    });
    if (!rateCheck.allowed) {
      return { success: false, error: rateCheck.reason };
    }

    const nmlsResult = await lookupNmlsForOnboarding(parsed.data.nmlsId);
    if (!nmlsResult.success || !nmlsResult.preview) {
      return { success: false, error: nmlsResult.error ?? 'NMLS verification failed.' };
    }

    const enrichment = await enrichLenderSources(nmlsResult.preview, parsed.data.zipCode);

    const duplicate = await checkLenderOnboardingDuplicate({
      nmlsId: nmlsResult.preview.nmlsId,
      legalName: nmlsResult.preview.legalName,
    });
    if (duplicate.duplicate) {
      return {
        success: false,
        error: duplicate.reason,
        existingProfileSlug: duplicate.existingSlug,
      };
    }

    const admin = createAdminClient();
    const row = buildLenderOnboardingInsertRow({
      parsed: parsed.data,
      enrichment,
      userIp,
      emailHash,
      ipHash,
    });

    const insertResult = await insertLenderOnboardingSubmission(admin, row);
    if (!insertResult.ok) {
      return { success: false, error: insertResult.error };
    }

    logger.info('lender.onboarding.submitted', {
      submissionId: insertResult.id,
      nmlsId: nmlsResult.preview.nmlsId,
      needsManualReview: nmlsResult.preview.needsManualReview,
    });

    const profileSlug = slugFromNmls(nmlsResult.preview.nmlsId, nmlsResult.preview.legalName);

    return {
      success: true,
      submissionId: insertResult.id,
      profileSlug,
      pendingReview: true,
    };
  } catch (err) {
    logger.error('lender.onboarding.submit_exception', {
      message: err instanceof Error ? err.message : 'unknown',
    });
    return {
      success: false,
      error: 'Something went wrong while saving your submission. Please try again.',
    };
  }
}