'use server';

import { headers } from 'next/headers';
import { searchCarriersByNameState } from '@/actions/verify-dot';
import { suggestCompanySchema } from '@/lib/suggestions/schema';
import { checkSuggestionDuplicate } from '@/lib/suggestions/duplicates';
import { checkSuggestionRateLimit } from '@/lib/suggestions/rate-limit';
import {
  lookupFmcsaForSuggestion,
  toFmcsaSuggestionPreview,
} from '@/lib/suggestions/fmcsa-lookup';
import type { EnrichedCompanyPreview, FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import { resolveSubmissionEnrichment } from '@/lib/suggestions/enrichment-snapshot';
import { enrichCompanySources } from '@/lib/verification/enrich-company';
import {
  buildCompanySuggestionInsertRow,
  insertCompanySuggestion,
} from '@/lib/suggestions/insert-suggestion';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';
import { predictCompanyProfileSlug } from '@/lib/directory/resolve-company';
import { hashEmail, hashIp } from '@/lib/reviews/hash';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';
import type { NameStateSearchResult } from '@/actions/verify-dot';

export type SubmitSuggestionResult = {
  success: boolean;
  error?: string;
  suggestionId?: string;
  /** Predicted profile slug after admin approval */
  profileSlug?: string;
  /** Link to existing profile when duplicate already in directory */
  existingProfileSlug?: string;
  pendingReview?: boolean;
};

export type PreviewFmcsaSuggestionResult = {
  success: boolean;
  error?: string;
  preview?: FmcsaSuggestionPreview;
};

export type PreviewEnrichedSuggestionResult = {
  success: boolean;
  error?: string;
  preview?: EnrichedCompanyPreview;
};

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

async function buildEnrichedPreview(input: {
  carrierQuery?: string;
}): Promise<PreviewEnrichedSuggestionResult> {
  if (!input.carrierQuery?.trim()) {
    return {
      success: false,
      error: 'A verified USDOT or MC number is required.',
    };
  }

  const parsed = parseCarrierNumber(input.carrierQuery.trim());
  if (!parsed) {
    return {
      success: false,
      error: 'Enter a valid USDOT or MC number (3–8 digits).',
    };
  }

  if (!process.env.FMCSA_WEB_KEY?.trim()) {
    return {
      success: false,
      error: 'FMCSA lookup is temporarily unavailable. Please try again later.',
    };
  }

  const fmcsa = await lookupFmcsaForSuggestion(input.carrierQuery);
  if (!fmcsa?.legalName) {
    return {
      success: false,
      error:
        'No FMCSA record found for that number. Confirm it on safer.fmcsa.dot.gov before submitting.',
    };
  }

  const fmcsaPreview = toFmcsaSuggestionPreview(fmcsa);
  const legalName = fmcsa.legalName;

  const enrichment = await enrichCompanySources({
    legalName,
    headquarters: fmcsa.headquarters,
    phone: fmcsa.phone,
    city: fmcsaPreview.addressCity,
    state: fmcsaPreview.addressState,
    usdotNumber: fmcsa.usdot,
  });

  return {
    success: true,
    preview: {
      fmcsa: fmcsaPreview,
      google: enrichment.google,
      publicScrape: enrichment.publicScrape,
      fetchedAt: enrichment.fetchedAt,
    },
  };
}

export async function searchCarriersForOnboarding(
  raw: unknown
): Promise<NameStateSearchResult> {
  return searchCarriersByNameState(raw);
}

export async function previewFmcsaSuggestion(
  carrierQuery: string
): Promise<PreviewFmcsaSuggestionResult> {
  const res = await buildEnrichedPreview({ carrierQuery });
  if (!res.success || !res.preview) {
    return { success: false, error: res.error };
  }
  if (!res.preview.fmcsa) {
    return { success: false, error: res.error ?? 'FMCSA preview unavailable' };
  }
  return { success: true, preview: res.preview.fmcsa };
}

/** Multi-source preview: FMCSA (required) + Google Places + public BBB scrape in parallel. */
export async function previewEnrichedCompanySuggestion(input: {
  carrierQuery?: string;
  companyName?: string;
}): Promise<PreviewEnrichedSuggestionResult> {
  if (input.carrierQuery?.trim()) {
    return buildEnrichedPreview({ carrierQuery: input.carrierQuery });
  }

  return {
    success: false,
    error:
      'FMCSA verification is required. Search by USDOT/MC or use Name + State to find the carrier first.',
  };
}

export async function submitCompanySuggestion(
  raw: unknown
): Promise<SubmitSuggestionResult> {
  try {
    const parsed = suggestCompanySchema.safeParse(raw);
    if (!parsed.success) {
      const first = parsed.error.flatten().fieldErrors;
      const msg =
        Object.values(first).flat()[0] ?? 'Please check your suggestion and try again.';
      return { success: false, error: msg };
    }

    if (parsed.data.website) {
      return { success: false, error: 'Submission rejected.' };
    }

    if (!isSupabaseAdminConfigured()) {
      return {
        success: false,
        error: 'Suggestions are temporarily unavailable. Please try again later.',
      };
    }

    const carrierParsed = parseCarrierNumber(parsed.data.carrierQuery!);
    if (!carrierParsed) {
      return {
        success: false,
        error:
          'FMCSA verification is required before submitting. Search by USDOT/MC or Name + State.',
      };
    }

    const headerStore = await headers();
    const userIp = clientIpFromHeaders(headerStore);

    const rateCheck = await checkSuggestionRateLimit({
      ip: userIp,
      email: parsed.data.suggestedByEmail,
    });

    if (!rateCheck.allowed) {
      return { success: false, error: rateCheck.reason };
    }

    const fmcsa = await lookupFmcsaForSuggestion(parsed.data.carrierQuery!);
    const companyName = fmcsa?.legalName?.trim();

    if (!companyName) {
      return {
        success: false,
        error: 'Could not verify this carrier with FMCSA. Confirm the USDOT/MC number and try again.',
      };
    }

    const enrichment = await resolveSubmissionEnrichment({
      legalName: companyName,
      headquarters: fmcsa?.headquarters,
      phone: fmcsa?.phone,
      snapshot: parsed.data.enrichmentSnapshot,
    });

    const duplicateCheck = await checkSuggestionDuplicate({
      name: companyName,
      usdot: fmcsa?.usdot ?? (carrierParsed.type === 'DOT' ? carrierParsed.value : null),
    });

    if (duplicateCheck.duplicate) {
      return {
        success: false,
        error: duplicateCheck.reason,
        existingProfileSlug: duplicateCheck.existingSlug,
      };
    }

    const admin = createAdminClient();
    const emailHash = hashEmail(parsed.data.suggestedByEmail);
    const ipHash = userIp ? hashIp(userIp) : null;

    const row = buildCompanySuggestionInsertRow({
      parsed: parsed.data,
      companyName,
      fmcsa,
      carrierParsed,
      enrichment,
      userIp,
      emailHash,
      ipHash,
    });

    const insertResult = await insertCompanySuggestion(admin, row);

    if (!insertResult.ok) {
      return { success: false, error: insertResult.error };
    }

    logger.info('suggestion.submitted', {
      suggestionId: insertResult.id,
      usdot: fmcsa?.usdot,
      hasFmcsa: Boolean(fmcsa),
      hasGoogle: Boolean(enrichment.google?.status === 'ok'),
      hasPublicScrape: Boolean(enrichment.publicScrape),
      enrichmentStored: insertResult.enrichmentStored,
      trustedDot: true,
    });

    const profileSlug = predictCompanyProfileSlug({
      name: companyName,
      usdot: fmcsa?.usdot ?? (carrierParsed.type === 'DOT' ? carrierParsed.value : null),
    });

    return {
      success: true,
      suggestionId: insertResult.id,
      profileSlug,
      pendingReview: true,
    };
  } catch (err) {
    logger.error('suggestion.submit_exception', {
      message: err instanceof Error ? err.message : 'unknown',
      stack: err instanceof Error ? err.stack : undefined,
    });
    return {
      success: false,
      error:
        'Something went wrong while saving your suggestion. Please wait a moment and try again.',
    };
  }
}