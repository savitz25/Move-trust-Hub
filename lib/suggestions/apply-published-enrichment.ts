import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import {
  googleFromVerificationSources,
  parseGoogleData,
  parsePublicScrapeData,
  parseVerificationSources,
  publicScrapeFromVerificationSources,
  type VerificationSources,
} from '@/lib/verification/backfill-helpers';
import {
  toGoogleDataColumn,
  toPublicScrapeColumn,
  toJsonbColumn,
} from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';
import type { Json } from '@/types/supabase';
import type { GooglePlacesData, PublicScrapeData } from '@/lib/verification/types';

export type PublishedEnrichmentInput = {
  googleData: GooglePlacesData | null;
  publicScrape: PublicScrapeData | null;
  verificationSources: VerificationSources;
  overallRating: number;
  reviewCount: number;
  bbbRating: string;
  bbbAccredited: boolean;
  reputationScore: number;
  coverage: string;
  fmcsaRaw: Json | null;
  fmcsaLastChecked: string | null;
  fmcsaLegalName: string | null;
  fmcsaSafetyRating: string;
  authorityActive: boolean | null;
  outOfService: boolean;
  complaintsLast12m: number;
  revocationDate: string | null;
  dataHash: string | null;
};

export type EnrichmentCopyLog = {
  companyKey: string;
  copied: {
    google_data: boolean;
    public_scrape_data: boolean;
    verification_sources: boolean;
    fmcsa_raw: boolean;
    overall_rating: boolean;
    review_count: boolean;
    bbb_rating: boolean;
  };
  googleRating: number | null;
  googleReviewCount: number | null;
  bbbRating: string | null;
  patchAttempts: string[];
  error?: string;
};

function isMissingColumnError(message?: string | null, code?: string): boolean {
  if (code === 'PGRST204') return true;
  if (!message) return false;
  const lower = message.toLowerCase();
  return lower.includes('schema cache') || (lower.includes('column') && lower.includes('does not exist'));
}

function stripKeys<T extends Record<string, unknown>>(row: T, keys: string[]): T {
  const next = { ...row };
  for (const key of keys) delete next[key];
  return next;
}

function readExistingEnrichment(row: Record<string, unknown> | null) {
  if (!row) {
    return { google: null as GooglePlacesData | null, scrape: null as PublicScrapeData | null };
  }
  return {
    google: parseGoogleData(row.google_data) ?? googleFromVerificationSources(parseVerificationSources(row.verification_sources)),
    scrape:
      parsePublicScrapeData(row.public_scrape_data) ??
      publicScrapeFromVerificationSources(parseVerificationSources(row.verification_sources)),
  };
}

/** Prefer incoming Google when existing is missing or not ok. */
function mergeGoogle(
  existing: GooglePlacesData | null,
  incoming: GooglePlacesData | null
): GooglePlacesData | null {
  if (!incoming) return existing;
  if (!existing || existing.status !== 'ok') return incoming;
  if (incoming.status !== 'ok') return existing;
  if ((existing.rating ?? 0) > 0 && (incoming.rating ?? 0) <= 0) return existing;
  return incoming;
}

/** Prefer incoming scrape when existing BBB/Google scrape fields are empty. */
function mergePublicScrape(
  existing: PublicScrapeData | null,
  incoming: PublicScrapeData | null
): PublicScrapeData | null {
  if (!incoming) return existing;
  if (!existing) return incoming;
  if (existing.bbb_rating && !incoming.bbb_rating) return existing;
  return { ...existing, ...incoming };
}

function buildPatch(input: PublishedEnrichmentInput, mergeWithExisting: {
  google: GooglePlacesData | null;
  scrape: PublicScrapeData | null;
}): Record<string, unknown> {
  const google = mergeGoogle(mergeWithExisting.google, input.googleData);
  const scrape = mergePublicScrape(mergeWithExisting.scrape, input.publicScrape);

  const overallRating =
    google?.status === 'ok' && google.rating && google.rating > 0
      ? google.rating
      : input.overallRating;
  const reviewCount =
    google?.status === 'ok' && google.review_count != null
      ? google.review_count
      : input.reviewCount;

  const sources: VerificationSources = {
    ...input.verificationSources,
    ...(google ? { google } : {}),
    ...(scrape ? { public_scrape: scrape } : {}),
  };

  return {
    google_data: toGoogleDataColumn(google),
    public_scrape_data: toPublicScrapeColumn(scrape),
    verification_sources: toJsonbColumn(sources, { label: 'verification_sources' }),
    verification_last_synced_at: new Date().toISOString(),
    overall_rating: overallRating,
    review_count: reviewCount,
    bbb_rating: scrape?.bbb_rating ?? input.bbbRating,
    bbb_accredited: scrape?.bbb_accredited ?? input.bbbAccredited,
    reputation_score: input.reputationScore,
    coverage: input.coverage,
    fmcsa_raw: input.fmcsaRaw,
    fmcsa_last_checked: input.fmcsaLastChecked,
    fmcsa_legal_name: input.fmcsaLegalName,
    fmcsa_safety_rating: input.fmcsaSafetyRating,
    authority_active: input.authorityActive,
    out_of_service: input.outOfService,
    complaints_last_12m: input.complaintsLast12m,
    revocation_date: input.revocationDate,
    data_hash: input.dataHash,
    last_updated: new Date().toISOString().slice(0, 10),
  };
}

/**
 * Explicitly copy suggestion enrichment onto a published company row.
 * The publish RPC only inserts core columns; this patch ensures Google/BBB/FMCSA
 * data is visible on the profile immediately after approval.
 */
export async function applyPublishedEnrichment(
  admin: SupabaseClient<Database>,
  companyKey: string,
  input: PublishedEnrichmentInput
): Promise<EnrichmentCopyLog> {
  const log: EnrichmentCopyLog = {
    companyKey,
    copied: {
      google_data: false,
      public_scrape_data: false,
      verification_sources: false,
      fmcsa_raw: false,
      overall_rating: false,
      review_count: false,
      bbb_rating: false,
    },
    googleRating: input.googleData?.rating ?? null,
    googleReviewCount: input.googleData?.review_count ?? null,
    bbbRating: input.publicScrape?.bbb_rating ?? input.bbbRating ?? null,
    patchAttempts: [],
  };

  const { data: existingRow } = await admin
    .from('companies')
    .select('*')
    .or(`id.eq.${companyKey},slug.eq.${companyKey}`)
    .maybeSingle();

  const existing = readExistingEnrichment(
    (existingRow as Record<string, unknown> | null) ?? null
  );

  const basePatch = buildPatch(input, existing);

  const attempts: Array<{ label: string; patch: Record<string, unknown> }> = [
    { label: 'full', patch: basePatch },
    {
      label: 'without_verification_sources',
      patch: stripKeys(basePatch, ['verification_sources', 'verification_last_synced_at']),
    },
    {
      label: 'ratings_and_json_only',
      patch: {
        google_data: basePatch.google_data,
        public_scrape_data: basePatch.public_scrape_data,
        overall_rating: basePatch.overall_rating,
        review_count: basePatch.review_count,
        bbb_rating: basePatch.bbb_rating,
        bbb_accredited: basePatch.bbb_accredited,
        reputation_score: basePatch.reputation_score,
        last_updated: basePatch.last_updated,
      },
    },
    {
      label: 'ratings_only',
      patch: {
        overall_rating: basePatch.overall_rating,
        review_count: basePatch.review_count,
        bbb_rating: basePatch.bbb_rating,
        bbb_accredited: basePatch.bbb_accredited,
        reputation_score: basePatch.reputation_score,
        last_updated: basePatch.last_updated,
      },
    },
  ];

  let lastError: string | undefined;

  for (const attempt of attempts) {
    if (!Object.keys(attempt.patch).length) continue;

    const { error } = await admin
      .from('companies')
      .update(attempt.patch)
      .or(`id.eq.${companyKey},slug.eq.${companyKey}`);

    log.patchAttempts.push(attempt.label);

    if (!error) {
      log.copied.google_data = basePatch.google_data != null;
      log.copied.public_scrape_data = basePatch.public_scrape_data != null;
      log.copied.verification_sources = 'verification_sources' in attempt.patch;
      log.copied.fmcsa_raw = basePatch.fmcsa_raw != null;
      log.copied.overall_rating = (basePatch.overall_rating as number) > 0;
      log.copied.review_count = (basePatch.review_count as number) > 0;
      log.copied.bbb_rating = Boolean(basePatch.bbb_rating && basePatch.bbb_rating !== 'NR');

      logger.info('approve.enrichment_copied', {
        companyKey,
        attempt: attempt.label,
        copied: log.copied,
        googleRating: log.googleRating,
        googleReviewCount: log.googleReviewCount,
        bbbRating: log.bbbRating,
      });

      return log;
    }

    lastError = error.message;

    if (!isMissingColumnError(error.message, error.code)) {
      log.error = error.message;
      logger.error('approve.enrichment_patch_failed', {
        companyKey,
        attempt: attempt.label,
        code: error.code,
        message: error.message,
      });
      return log;
    }

    logger.warn('approve.enrichment_patch_retry', {
      companyKey,
      attempt: attempt.label,
      message: error.message,
    });
  }

  log.error = lastError ?? 'Enrichment patch failed';
  logger.error('approve.enrichment_patch_exhausted', { companyKey, log });
  return log;
}