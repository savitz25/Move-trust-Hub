'use server';

import { headers } from 'next/headers';
import { suggestCompanySchema } from '@/lib/suggestions/schema';
import { checkSuggestionDuplicate } from '@/lib/suggestions/duplicates';
import { checkSuggestionRateLimit } from '@/lib/suggestions/rate-limit';
import {
  lookupFmcsaForSuggestion,
  toFmcsaSuggestionPreview,
} from '@/lib/suggestions/fmcsa-lookup';
import type { FmcsaSuggestionPreview } from '@/lib/suggestions/types';
import { parseCarrierNumber } from '@/lib/verify-dot/schema';
import { hashEmail, hashIp } from '@/lib/reviews/hash';
import { createAdminClient } from '@/lib/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/supabase/config';
import { logger } from '@/lib/logging/logger';

export type SubmitSuggestionResult = {
  success: boolean;
  error?: string;
  suggestionId?: string;
};

export type PreviewFmcsaSuggestionResult = {
  success: boolean;
  error?: string;
  preview?: FmcsaSuggestionPreview;
};

function clientIpFromHeaders(headerStore: Headers): string | null {
  return (
    headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerStore.get('x-real-ip') ||
    null
  );
}

export async function previewFmcsaSuggestion(
  carrierQuery: string
): Promise<PreviewFmcsaSuggestionResult> {
  const parsed = parseCarrierNumber(carrierQuery.trim());
  if (!parsed) {
    return {
      success: false,
      error: 'Enter a valid USDOT or MC number (3–8 digits).',
    };
  }

  const fmcsa = await lookupFmcsaForSuggestion(carrierQuery);
  if (!fmcsa?.legalName) {
    return {
      success: false,
      error:
        'No FMCSA record found for that number. Confirm it on safer.fmcsa.dot.gov before submitting.',
    };
  }

  return {
    success: true,
    preview: toFmcsaSuggestionPreview(fmcsa),
  };
}

export async function submitCompanySuggestion(
  raw: unknown
): Promise<SubmitSuggestionResult> {
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

  const headerStore = await headers();
  const userIp = clientIpFromHeaders(headerStore);

  const rateCheck = await checkSuggestionRateLimit({
    ip: userIp,
    email: parsed.data.suggestedByEmail,
  });

  if (!rateCheck.allowed) {
    return { success: false, error: rateCheck.reason };
  }

  const carrierParsed = parsed.data.carrierQuery
    ? parseCarrierNumber(parsed.data.carrierQuery)
    : null;

  let fmcsa = carrierParsed
    ? await lookupFmcsaForSuggestion(parsed.data.carrierQuery!)
    : null;

  const companyName =
    fmcsa?.legalName?.trim() ||
    parsed.data.name?.trim() ||
    null;

  if (!companyName) {
    return {
      success: false,
      error: carrierParsed
        ? 'Could not verify this carrier with FMCSA. Try again or confirm the USDOT number.'
        : 'Company name is required when no USDOT/MC number is provided.',
    };
  }

  const duplicateCheck = await checkSuggestionDuplicate({
    name: companyName,
    usdot: fmcsa?.usdot ?? (carrierParsed?.type === 'DOT' ? carrierParsed.value : null),
  });

  if (duplicateCheck.duplicate) {
    return { success: false, error: duplicateCheck.reason };
  }

  const admin = createAdminClient();
  const emailHash = hashEmail(parsed.data.suggestedByEmail);
  const ipHash = userIp ? hashIp(userIp) : null;

  const { data: inserted, error } = await admin
    .from('company_suggestions')
    .insert({
      name: companyName,
      usdot: fmcsa?.usdot ?? (carrierParsed?.type === 'DOT' ? carrierParsed.value : null),
      mc_number: fmcsa?.mcNumber ?? (carrierParsed?.type === 'MC' ? carrierParsed.value : null),
      details: parsed.data.details,
      status: 'pending',
      suggested_by_name: parsed.data.suggestedByName,
      suggested_by_email: parsed.data.suggestedByEmail,
      submitter_ip: userIp,
      ip_hash: ipHash,
      email_hash: emailHash,
      source_page: parsed.data.sourcePage || '/companies',
      legal_name: fmcsa?.legalName ?? companyName,
      headquarters: fmcsa?.headquarters,
      phone: fmcsa?.phone,
      authority_status: fmcsa?.authorityStatus,
      fmcsa_preview: fmcsa?.fmcsaPreview ?? null,
      fmcsa_raw: fmcsa?.fmcsaRaw ?? null,
    })
    .select('id')
    .single();

  if (error || !inserted) {
    if (error?.code === '23505') {
      return {
        success: false,
        error: 'This company is already pending review. We will add it shortly.',
      };
    }
    logger.error('suggestion.submit_failed', { error: error?.message });
    return { success: false, error: 'Failed to save your suggestion. Please try again.' };
  }

  logger.info('suggestion.submitted', {
    suggestionId: inserted.id,
    usdot: fmcsa?.usdot,
    hasFmcsa: Boolean(fmcsa),
    trustedDot: Boolean(carrierParsed && fmcsa),
  });

  return { success: true, suggestionId: inserted.id };
}