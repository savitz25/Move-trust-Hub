import 'server-only';

import { fetchBbbBusinessSnapshot } from '@/lib/bbb/refresh/fetch-business';
import {
  bbbResultFromApiSnapshot,
  fetchBbbPublicScrape,
} from '@/lib/verification/bbb-public-scrape';
import { fetchGooglePlacesData } from '@/lib/verification/google-places';
import { fetchCfpbComplaints } from '@/lib/lender/enrichment/cfpb-lookup';
import {
  computeCountyExperienceScore,
  yearsInBusinessFromBbb,
} from '@/lib/lender/enrichment/county-score';
import type {
  LenderEnrichmentInput,
  LenderEnrichmentPayload,
  LenderEnrichmentRecord,
} from '@/lib/lender/enrichment/types';

function headquartersFromLender(input: LenderEnrichmentInput): string {
  return `${input.city}, ${input.state}`;
}

async function fetchLenderBbb(input: LenderEnrichmentInput) {
  const bbbInput = {
    companyName: input.name,
    city: input.city,
    state: input.state,
    headquarters: headquartersFromLender(input),
  };

  let scrape = await fetchBbbPublicScrape(bbbInput);

  let api = null;
  try {
    api = await fetchBbbBusinessSnapshot({
      slug: input.slug,
      name: input.name,
      headquarters: headquartersFromLender(input),
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
  input: LenderEnrichmentInput,
  payload: LenderEnrichmentPayload
): LenderEnrichmentRecord {
  const google = payload.google;
  const bbb = payload.bbb;
  const cfpb = payload.cfpb;

  return {
    slug: input.slug,
    google_rating: google?.rating ?? null,
    google_review_count: google?.review_count ?? null,
    google_place_id: google?.place_id ?? null,
    google_review_snippets: google?.review_snippets ?? [],
    bbb_rating: bbb.bbb_rating,
    bbb_accredited: bbb.bbb_accredited,
    bbb_complaint_count: bbb.complaint_count,
    bbb_score: bbb.bbb_rating,
    bbb_profile_url: bbb.bbb_profile_url ?? null,
    cfpb_complaints_count: cfpb.complaints_count,
    cfpb_recent_issues: cfpb.recent_issues,
    county_experience_score: payload.county.score,
    enriched_at: payload.fetched_at,
    enrichment_json: payload,
  };
}

/**
 * Run Google Places + BBB + CFPB + county score enrichment in parallel.
 * Partial failures are captured in payload.partial_failures — never throws.
 */
export async function enrichLenderSources(
  input: LenderEnrichmentInput
): Promise<LenderEnrichmentRecord> {
  const now = new Date().toISOString();
  const partialFailures: string[] = [];
  const headquarters = headquartersFromLender(input);

  const [googleResult, bbbResult, cfpbResult] = await Promise.allSettled([
    fetchGooglePlacesData({
      legalName: input.name,
      headquarters,
      city: input.city,
      state: input.state,
      phone: input.phone,
      placeId: input.googlePlaceId,
      businessCategory: 'mortgage lender',
    }),
    fetchLenderBbb(input),
    fetchCfpbComplaints(input.name),
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

  const cfpb =
    cfpbResult.status === 'fulfilled'
      ? cfpbResult.value
      : {
          source: 'cfpb_public_api' as const,
          company_query: input.name,
          complaints_count: null,
          recent_issues: [],
          recent_products: [],
          last_fetched: now,
          status: 'error' as const,
          error: String(cfpbResult.reason),
        };
  if (cfpbResult.status === 'rejected') {
    partialFailures.push(`cfpb: ${cfpbResult.reason}`);
  } else if (cfpb.status === 'error') {
    partialFailures.push(`cfpb: ${cfpb.error ?? cfpb.status}`);
  }

  const yearsInBusiness = yearsInBusinessFromBbb(bbbScrape.bbb_file_opened);
  const countyComputed = computeCountyExperienceScore(input, {
    googleAddress: google?.formatted_address,
    bbbListed: bbbScrape.listed,
    yearsInBusiness,
  });

  const payload: LenderEnrichmentPayload = {
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
    cfpb,
    county: {
      score: countyComputed.score,
      factors: countyComputed.factors,
      computed_at: now,
    },
    years_in_business: countyComputed.yearsInBusiness,
    fetched_at: now,
    partial_failures: partialFailures,
  };

  return buildRecord(input, payload);
}