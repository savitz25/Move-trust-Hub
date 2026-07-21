import 'server-only';

import type { SupabaseClient } from '@supabase/supabase-js';
import {
  parseGoogleData,
  parseVerificationSources,
  type VerificationSources,
} from '@/lib/verification/backfill-helpers';
import {
  isUsableGoogleSnapshot,
  mergeGoogleSnapshots,
} from '@/lib/verification/google-places';
import type { GooglePlacesData } from '@/lib/verification/types';
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';

/**
 * Persist a Google Places snapshot to verification_sources.google (and google_data when present).
 * Never overwrites a usable snapshot with a failed fetch.
 */
export async function persistGoogleSnapshot(
  admin: SupabaseClient<Database>,
  companyId: string,
  incoming: GooglePlacesData,
  options?: { existingRow?: Record<string, unknown> | null }
): Promise<{
  ok: boolean;
  applied: boolean;
  error?: string;
  merged: GooglePlacesData | null;
}> {
  let row = options?.existingRow ?? null;
  if (!row) {
    const { data } = await admin
      .from('companies')
      .select('id, verification_sources, google_data, overall_rating, review_count')
      .eq('id', companyId)
      .maybeSingle();
    row = (data as Record<string, unknown> | null) ?? null;
  }

  if (!row) {
    return { ok: false, applied: false, error: 'Company not found', merged: null };
  }

  const sources = parseVerificationSources(row.verification_sources);
  const existingFromSources = parseGoogleData(sources.google);
  const existingFromColumn = parseGoogleData(row.google_data);
  const existing = mergeGoogleSnapshots(existingFromSources, existingFromColumn);
  const merged = mergeGoogleSnapshots(existing, incoming);

  if (!merged) {
    return { ok: true, applied: false, merged: null };
  }

  // No change if we kept existing usable and incoming was bad
  if (
    isUsableGoogleSnapshot(existing) &&
    !isUsableGoogleSnapshot(incoming) &&
    existing === merged
  ) {
    logger.info('google_places.persist_skipped_keep_existing', {
      companyId,
      incomingStatus: incoming.status,
    });
    return { ok: true, applied: false, merged: existing };
  }

  const nextSources: VerificationSources = {
    ...sources,
    google: merged,
  };

  const patch: Record<string, unknown> = {
    verification_sources: toJsonbColumn(nextSources, { label: 'verification_sources' }),
    verification_last_synced_at: new Date().toISOString(),
    last_updated: new Date().toISOString().slice(0, 10),
    updated_at: new Date().toISOString(),
  };

  if (isUsableGoogleSnapshot(merged) && merged.rating != null && merged.rating > 0) {
    patch.overall_rating = merged.rating;
    if (merged.review_count != null) patch.review_count = merged.review_count;
  }

  // Try with google_data column first; fall back without it.
  const withLegacy = {
    ...patch,
    google_data: toJsonbColumn(merged, { label: 'google_data' }),
  };

  let { error } = await admin.from('companies').update(withLegacy as never).eq('id', companyId);

  if (error && (error.code === 'PGRST204' || error.message?.includes('google_data'))) {
    const retry = await admin.from('companies').update(patch as never).eq('id', companyId);
    error = retry.error;
  }

  if (error) {
    logger.error('google_places.persist_failed', {
      companyId,
      message: error.message,
      code: error.code,
    });
    return { ok: false, applied: false, error: error.message, merged };
  }

  logger.info('google_places.persisted', {
    companyId,
    status: merged.status,
    rating: merged.rating,
    reviewCount: merged.review_count,
    usable: isUsableGoogleSnapshot(merged),
  });

  return { ok: true, applied: true, merged };
}
