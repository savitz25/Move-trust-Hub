import 'server-only';

import { fetchBbbBusinessSnapshot } from '@/lib/bbb/refresh/fetch-business';
import {
  bbbResultFromApiSnapshot,
  fetchBbbPublicScrape,
} from '@/lib/verification/bbb-public-scrape';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { computeProviderTrustScore } from '@/lib/insurance/enrichment/trust-score';
import type {
  ProviderEnrichmentInput,
  ProviderEnrichmentPayload,
  ProviderEnrichmentRecord,
} from '@/lib/insurance/enrichment/types';

function headquartersFromProvider(input: ProviderEnrichmentInput): string {
  return input.address ?? `${input.city}, ${input.state}`;
}

function googleBusinessCategory(input: ProviderEnrichmentInput): string {
  if (input.providerType === 'independent_agent') return 'insurance agent';
  return 'insurance agency';
}

async function fetchProviderBbb(input: ProviderEnrichmentInput) {
  const bbbInput = {
    companyName: input.name,
    city: input.city,
    state: input.state,
    headquarters: headquartersFromProvider(input),
  };

  let scrape = await fetchBbbPublicScrape(bbbInput);

  let api = null;
  try {
    api = await fetchBbbBusinessSnapshot({
      slug: input.slug,
      name: input.name,
      headquarters: headquartersFromProvider(input),
    });
  } catch {
    // BBB API miss — public scrape result is used when listed
  }

  if (api) {
    scrape = await bbbResultFromApiSnapshot(
      {
        accredited: api.accredited,
        rating: api.rating,
        customerReviews: api.customerReviews,
        profileUrl: api.profileUrl,
      },
      bbbInput
    );
  }

  return scrape;
}

function buildRecord(
  input: ProviderEnrichmentInput,
  payload: ProviderEnrichmentPayload
): ProviderEnrichmentRecord {
  const google = payload.google;
  const bbb = payload.bbb;

  return {
    slug: input.slug,
    google_rating: google?.rating ?? null,
    google_review_count: google?.review_count ?? null,
    google_place_id: google?.place_id ?? null,
    google_review_snippets: google?.review_snippets ?? [],
    bbb_rating: bbb.bbb_rating,
    bbb_accredited: bbb.bbb_accredited,
    bbb_complaint_count: bbb.complaint_count,
    bbb_profile_url: bbb.bbb_profile_url ?? null,
    trust_score: payload.trust_score,
    enriched_at: payload.fetched_at,
    needs_manual_review: payload.needs_manual_review,
    enrichment_json: payload,
  };
}

/**
 * Run Google Places + BBB enrichment in parallel.
 * Partial failures are captured in payload.partial_failures — never throws.
 */
export async function enrichProviderSources(
  input: ProviderEnrichmentInput
): Promise<ProviderEnrichmentRecord> {
  const now = new Date().toISOString();
  const partialFailures: string[] = [];
  const headquarters = headquartersFromProvider(input);

  const [googleResult, bbbResult] = await Promise.allSettled([
    fetchGooglePlacesData({
      legalName: input.name,
      headquarters,
      city: input.city,
      state: input.state,
      phone: input.phone,
      placeId: input.googlePlaceId,
      businessCategory: googleBusinessCategory(input),
    }),
    fetchProviderBbb(input),
  ]);

  const google =
    googleResult.status === 'fulfilled'
      ? googleResult.value.status === 'skipped'
        ? null
        : googleResult.value
      : null;
  if (googleResult.status === 'rejected') {
    partialFailures.push(`google: ${googleResult.reason}`);
  } else if (google?.status === 'error') {
    partialFailures.push(`google: ${google.error ?? google.status}`);
  }

  const bbbScrape =
    bbbResult.status === 'fulfilled'
      ? bbbResult.value
      : {
          listed: false,
          bbb_rating: null,
          bbb_review_count: null,
          bbb_accredited: null,
          bbb_accreditation_status: null,
          bbb_profile_url: null,
          bbb_recent_reviews: [],
          bbb_file_opened: null,
          bbb_accredited_since: null,
          meta: { status: 'error' as const, method: 'public_scrape' as const },
        };
  if (bbbResult.status === 'rejected') {
    partialFailures.push(`bbb: ${bbbResult.reason}`);
  }

  const hasGoogle = google?.status === 'ok' && google.rating != null;
  const hasBbb = bbbScrape.listed && bbbScrape.bbb_rating != null;
  const needsManualReview = !hasGoogle && !hasBbb;

  const trustScore = computeProviderTrustScore({
    googleRating: google?.rating,
    googleReviewCount: google?.review_count,
    bbbRating: bbbScrape.listed ? bbbScrape.bbb_rating : null,
    bbbAccredited: bbbScrape.listed ? bbbScrape.bbb_accredited : null,
    isVerified: input.isVerified,
    yearsInBusiness: input.yearsInBusiness,
  });

  const payload: ProviderEnrichmentPayload = {
    google,
    bbb: {
      bbb_rating: bbbScrape.listed ? bbbScrape.bbb_rating : null,
      bbb_review_count: bbbScrape.listed ? bbbScrape.bbb_review_count : null,
      bbb_accredited: bbbScrape.listed ? bbbScrape.bbb_accredited : null,
      bbb_accreditation_status: bbbScrape.listed ? bbbScrape.bbb_accreditation_status : null,
      bbb_profile_url: bbbScrape.listed ? bbbScrape.bbb_profile_url : null,
      bbb_recent_reviews: bbbScrape.listed ? bbbScrape.bbb_recent_reviews : [],
      bbb_file_opened: bbbScrape.listed ? bbbScrape.bbb_file_opened : null,
      bbb_accredited_since: bbbScrape.listed ? bbbScrape.bbb_accredited_since : null,
      listed: bbbScrape.listed,
      complaint_count: bbbScrape.listed ? bbbScrape.bbb_review_count : null,
    },
    trust_score: trustScore,
    fetched_at: now,
    partial_failures: partialFailures,
    needs_manual_review: needsManualReview,
  };

  return buildRecord(input, payload);
}