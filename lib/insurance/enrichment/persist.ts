import 'server-only';

import { createAdminClient } from '@/lib/insurance/supabase/admin';
import { isSupabaseAdminConfigured } from '@/lib/insurance/supabase/config';
import type {
  ProviderEnrichmentInput,
  ProviderEnrichmentRecord,
} from '@/lib/insurance/enrichment/types';
import type { Database, Json } from '@/types/insurance/supabase';
import {
  readEnrichmentStore,
  upsertEnrichmentInStore,
  writeEnrichmentStore,
} from '@/lib/insurance/enrichment/store';

type ProviderUpdate = Database['public']['Tables']['providers']['Update'];

export function enrichmentToDbUpdate(record: ProviderEnrichmentRecord): ProviderUpdate {
  return {
    google_rating: record.google_rating,
    google_review_count: record.google_review_count,
    google_place_id: record.google_place_id,
    rating: record.google_rating ?? undefined,
    review_count: record.google_review_count ?? undefined,
    bbb_rating: record.bbb_rating,
    bbb_accredited: record.bbb_accredited,
    bbb_complaint_count: record.bbb_complaint_count,
    trust_score: record.trust_score,
    enriched_at: record.enriched_at,
    enrichment_json: record.enrichment_json as unknown as Json,
    needs_manual_review: record.needs_manual_review,
    updated_at: new Date().toISOString(),
  };
}

export async function persistProviderEnrichment(
  input: ProviderEnrichmentInput,
  record: ProviderEnrichmentRecord,
  options: { writeJson?: boolean; writeDb?: boolean } = {}
): Promise<{ json: boolean; db: boolean; dbError?: string }> {
  const writeJson = options.writeJson !== false;
  const writeDb =
    options.writeDb !== false &&
    isSupabaseAdminConfigured() &&
    input.source === 'supabase' &&
    Boolean(input.providerId);

  if (writeJson) {
    upsertEnrichmentInStore(record);
  }

  if (!writeDb) {
    return { json: writeJson, db: false };
  }

  try {
    const admin = createAdminClient();
    const enrichmentRow = enrichmentToDbUpdate(record);

    const { error } = await admin
      .from('providers')
      .update(enrichmentRow)
      .eq('id', input.providerId!);

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
    .from('providers')
    .select(
      'slug, google_rating, google_review_count, google_place_id, bbb_rating, bbb_accredited, bbb_complaint_count, trust_score, enriched_at, needs_manual_review, enrichment_json'
    )
    .not('enriched_at', 'is', null);

  if (error || !data?.length) return 0;

  const store = readEnrichmentStore();

  for (const row of data) {
    const json = row.enrichment_json as ProviderEnrichmentRecord['enrichment_json'] | null;
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
      bbb_profile_url: json?.bbb?.bbb_profile_url ?? null,
      trust_score: row.trust_score,
      enriched_at: row.enriched_at ?? new Date().toISOString(),
      needs_manual_review: row.needs_manual_review ?? false,
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
        trust_score: row.trust_score ?? 0,
        fetched_at: row.enriched_at ?? new Date().toISOString(),
        partial_failures: [],
        needs_manual_review: row.needs_manual_review ?? false,
      },
    };
  }

  writeEnrichmentStore(store);
  return Object.keys(store).length;
}