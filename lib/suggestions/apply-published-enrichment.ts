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
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';
import type { Json } from '@/types/supabase';
import { mergeGoogleSnapshots } from '@/lib/verification/google-places';
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
  storageMode: 'verification_sources' | 'legacy_columns' | 'ratings_only' | 'failed';
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

function mergeGoogle(
  existing: GooglePlacesData | null,
  incoming: GooglePlacesData | null
): GooglePlacesData | null {
  return mergeGoogleSnapshots(existing, incoming);
}

function mergePublicScrape(
  existing: PublicScrapeData | null,
  incoming: PublicScrapeData | null
): PublicScrapeData | null {
  if (!incoming) return existing;
  if (!existing) return incoming;
  if (existing.bbb_rating && !incoming.bbb_rating) return existing;
  return { ...existing, ...incoming };
}

function buildMergedSources(
  input: PublishedEnrichmentInput,
  existing: { google: GooglePlacesData | null; scrape: PublicScrapeData | null }
): VerificationSources {
  const google = mergeGoogle(existing.google, input.googleData);
  const scrape = mergePublicScrape(existing.scrape, input.publicScrape);

  return {
    ...input.verificationSources,
    ...(google ? { google } : {}),
    ...(scrape ? { public_scrape: scrape } : {}),
  };
}

function ratingsFromGoogle(
  google: GooglePlacesData | null,
  fallbackRating: number,
  fallbackCount: number
): { overallRating: number; reviewCount: number } {
  if (google?.status === 'ok' && google.rating && google.rating > 0) {
    return {
      overallRating: google.rating,
      reviewCount: google.review_count ?? fallbackCount,
    };
  }
  return { overallRating: fallbackRating, reviewCount: fallbackCount };
}

/**
 * Explicitly copy suggestion enrichment onto a published company row.
 * Uses verification_sources when legacy google_data/public_scrape_data columns are absent.
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
    storageMode: 'failed',
  };

  const { data: existingRow } = await admin
    .from('companies')
    .select('*')
    .or(`id.eq.${companyKey},slug.eq.${companyKey}`)
    .maybeSingle();

  const existing = readExistingEnrichment(
    (existingRow as Record<string, unknown> | null) ?? null
  );

  const sources = buildMergedSources(input, existing);
  const google = sources.google ?? null;
  const scrape = sources.public_scrape ?? null;
  const { overallRating, reviewCount } = ratingsFromGoogle(
    google,
    input.overallRating,
    input.reviewCount
  );

  const verificationSourcesJson = toJsonbColumn(sources, { label: 'verification_sources' });

  const verificationSourcesPatch: Record<string, unknown> = {
    verification_sources: verificationSourcesJson,
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

  const legacyPatch: Record<string, unknown> = {
    ...verificationSourcesPatch,
    google_data: google ? toJsonbColumn(google, { label: 'google_data' }) : null,
    public_scrape_data: scrape ? toJsonbColumn(scrape, { label: 'public_scrape_data' }) : null,
  };

  const attempts: Array<{ label: string; patch: Record<string, unknown>; mode: EnrichmentCopyLog['storageMode'] }> = [
    { label: 'verification_sources_bundle', patch: verificationSourcesPatch, mode: 'verification_sources' },
    { label: 'legacy_full', patch: legacyPatch, mode: 'legacy_columns' },
    {
      label: 'ratings_only',
      patch: stripKeys(verificationSourcesPatch, [
        'verification_sources',
        'verification_last_synced_at',
        'fmcsa_raw',
        'fmcsa_last_checked',
        'fmcsa_legal_name',
        'data_hash',
        'authority_active',
        'out_of_service',
        'complaints_last_12m',
        'revocation_date',
        'fmcsa_safety_rating',
      ]),
      mode: 'ratings_only',
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
      log.storageMode = attempt.mode;
      log.copied.verification_sources = 'verification_sources' in attempt.patch;
      log.copied.google_data = Boolean(google);
      log.copied.public_scrape_data = Boolean(scrape);
      log.copied.fmcsa_raw = input.fmcsaRaw != null;
      log.copied.overall_rating = overallRating > 0;
      log.copied.review_count = reviewCount > 0;
      log.copied.bbb_rating = Boolean(scrape?.bbb_rating && scrape.bbb_rating !== 'NR');

      logger.info('approve.enrichment_copied', {
        companyKey,
        attempt: attempt.label,
        storageMode: attempt.mode,
        copied: log.copied,
        googleRating: log.googleRating,
        googleReviewCount: log.googleReviewCount,
        bbbRating: log.bbbRating,
        hasGoogleInSources: Boolean(google),
        hasScrapeInSources: Boolean(scrape),
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