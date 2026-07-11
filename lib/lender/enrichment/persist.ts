import 'server-only';

import { createAdminClient } from '@/lib/lender/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/lender/supabase/config';
import type { Lender } from '@/lib/lender/mockData';
import type { LenderEnrichmentRecord } from '@/lib/lender/enrichment/types';
import type { Database, Json } from '@/types/lender/supabase';

type LenderInsert = Database['public']['Tables']['lenders']['Insert'];
import { upsertEnrichmentInStore, writeEnrichmentStore, readEnrichmentStore } from '@/lib/lender/enrichment/store';

export function lenderToDbRow(lender: Lender) {
  return {
    id: lender.id,
    slug: lender.slug,
    name: lender.name,
    nmls_id: lender.nmlsId,
    lender_type: lender.type,
    city: lender.city,
    state: lender.state,
    state_slug: lender.stateSlug,
    county: lender.county,
    county_slug: lender.countySlug,
    zip_codes: lender.zipCodes,
    rating: lender.rating,
    review_count: lender.reviewCount,
    trust_score: lender.trustScore,
    county_experience_score: lender.countyExperienceScore,
    loan_types: lender.loanTypes,
    specialties: lender.specialties,
    credit_tiers: lender.creditTiers,
    nmls_verified: lender.nmlsVerified,
    cfpb_complaints: lender.cfpbComplaints,
    bbb_rating: lender.bbbRating,
    google_rating: lender.googleRating,
    trustpilot_rating: lender.trustpilotRating,
    short_description: lender.shortDescription,
    website: lender.website ?? null,
    phone: lender.phone ?? null,
    is_featured: false,
    zero_paid_placement: true,
    updated_at: new Date().toISOString(),
  };
}

export function enrichmentToDbUpdate(record: LenderEnrichmentRecord) {
  return {
    google_rating: record.google_rating,
    google_review_count: record.google_review_count,
    google_place_id: record.google_place_id,
    rating: record.google_rating,
    review_count: record.google_review_count ?? 0,
    bbb_rating: record.bbb_rating,
    bbb_accredited: record.bbb_accredited,
    bbb_complaint_count: record.bbb_complaint_count,
    bbb_score: record.bbb_score,
    cfpb_complaints: record.cfpb_complaints_count ?? 0,
    cfpb_complaints_count: record.cfpb_complaints_count,
    county_experience_score: record.county_experience_score ?? 0,
    enriched_at: record.enriched_at,
    enrichment_json: record.enrichment_json,
    updated_at: new Date().toISOString(),
  };
}

export async function persistLenderEnrichment(
  lender: Lender,
  record: LenderEnrichmentRecord,
  options: { writeJson?: boolean; writeDb?: boolean } = {}
): Promise<{ json: boolean; db: boolean; dbError?: string }> {
  const writeJson = options.writeJson !== false;
  const writeDb = options.writeDb !== false && isSupabaseAdminConfigured();

  if (writeJson) {
    upsertEnrichmentInStore(record);
  }

  if (!writeDb) {
    return { json: writeJson, db: false };
  }

  try {
    const admin = createAdminClient();
    const baseRow = lenderToDbRow(lender);
    const enrichmentRow = enrichmentToDbUpdate(record);

    const row: LenderInsert = {
      ...baseRow,
      ...enrichmentRow,
      enrichment_json: record.enrichment_json as unknown as Json,
    };

    const { error } = await admin.from('lenders').upsert(row, { onConflict: 'slug' });

    if (error) {
      return { json: writeJson, db: false, dbError: error.message };
    }

    return { json: writeJson, db: true };
  } catch (err) {
    return {
      json: writeJson,
      db: false,
      dbError: err instanceof Error ? err.message : 'DB persist failed',
    };
  }
}

export async function exportEnrichmentStoreFromDb(): Promise<number> {
  if (!isSupabaseAdminConfigured()) return 0;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('lenders')
    .select(
      'slug, google_rating, google_review_count, google_place_id, bbb_rating, bbb_accredited, bbb_complaint_count, bbb_score, cfpb_complaints_count, county_experience_score, enriched_at, enrichment_json'
    )
    .not('enriched_at', 'is', null);

  if (error || !data?.length) return 0;

  const store = readEnrichmentStore();

  for (const row of data) {
    const json = row.enrichment_json as LenderEnrichmentRecord['enrichment_json'] | null;
    const snippets = json?.google?.review_snippets ?? [];
    store[row.slug] = {
      slug: row.slug,
      google_rating: row.google_rating,
      google_review_count: row.google_review_count,
      google_place_id: row.google_place_id,
      google_review_snippets: snippets,
      bbb_rating: row.bbb_rating,
      bbb_accredited: row.bbb_accredited,
      bbb_complaint_count: row.bbb_complaint_count,
      bbb_score: row.bbb_score,
      bbb_profile_url: json?.bbb?.bbb_profile_url ?? null,
      cfpb_complaints_count: row.cfpb_complaints_count,
      cfpb_recent_issues: json?.cfpb?.recent_issues ?? [],
      county_experience_score: row.county_experience_score,
      enriched_at: row.enriched_at ?? new Date().toISOString(),
      enrichment_json: json ?? {
        google: null,
        bbb: {
          bbb_rating: null,
          bbb_review_count: null,
          bbb_accredited: null,
          bbb_accreditation_status: null,
          bbb_profile_url: null,
          bbb_recent_reviews: [],
          bbb_file_opened: null,
          bbb_accredited_since: null,
          listed: false,
          complaint_count: null,
        },
        cfpb: {
          source: 'cfpb_public_api',
          company_query: row.slug,
          complaints_count: row.cfpb_complaints_count,
          recent_issues: [],
          recent_products: [],
          last_fetched: row.enriched_at ?? new Date().toISOString(),
          status: 'ok',
        },
        county: {
          score: row.county_experience_score ?? 0,
          factors: {
            primary_county: 0,
            zip_coverage: 0,
            google_local_match: 0,
            bbb_presence: 0,
            tenure: 0,
          },
          computed_at: row.enriched_at ?? new Date().toISOString(),
        },
        years_in_business: null,
        fetched_at: row.enriched_at ?? new Date().toISOString(),
        partial_failures: [],
      },
    };
  }

  writeEnrichmentStore(store);
  return Object.keys(store).length;
}