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
import {
  decidePlaceAttachment,
  hasSharedLocationEvidence,
  PLACE_HOLDER_READ_LIMIT,
  type HolderEnumeration,
  type PlaceHolder,
  type RatingReview,
} from '@/lib/verification/rating-provenance';
import type { GooglePlacesData } from '@/lib/verification/types';
import { toJsonbColumn } from '@/lib/suggestions/jsonb-payload';
import { logger } from '@/lib/logging/logger';
import type { Database } from '@/types/supabase';

export async function loadOtherPlaceHolders(
  admin: SupabaseClient<Database>,
  placeId: string,
  exceptCompanyId: string
): Promise<{ holders: PlaceHolder[]; error: string | null; enumeration: HolderEnumeration }> {
  const columns =
    'id, name, usdot_number, fmcsa_legal_name, website, google_data, verification_sources';
  let fromSources: { data: unknown[] | null; error: { message?: string } | null };
  let fromColumn: { data: unknown[] | null; error: { message?: string } | null };
  try {
    [fromSources, fromColumn] = await Promise.all([
    admin
      .from('companies')
      .select(columns)
      .neq('id', exceptCompanyId)
      .filter('verification_sources->google->>place_id', 'eq', placeId)
      .limit(PLACE_HOLDER_READ_LIMIT),
    admin
      .from('companies')
      .select(columns)
      .neq('id', exceptCompanyId)
      .filter('google_data->>place_id', 'eq', placeId)
      .limit(PLACE_HOLDER_READ_LIMIT),
    ]);
  } catch (error) {
    return {
      holders: [],
      error: error instanceof Error ? error.message : 'lookup failed',
      enumeration: 'failed',
    };
  }
  if (fromSources.error || fromColumn.error) {
    return {
      holders: [],
      error: fromSources.error?.message || fromColumn.error?.message || 'lookup failed',
      enumeration: 'failed',
    };
  }
  const sourcesRows = Array.isArray(fromSources.data) ? fromSources.data : null;
  const columnRows = Array.isArray(fromColumn.data) ? fromColumn.data : null;
  if (!sourcesRows || !columnRows) {
    return { holders: [], error: null, enumeration: 'ambiguous' };
  }
  const capped =
    sourcesRows.length >= PLACE_HOLDER_READ_LIMIT ||
    columnRows.length >= PLACE_HOLDER_READ_LIMIT;
  const rows = [...sourcesRows, ...columnRows] as Array<Record<string, unknown>>;
  const seen = new Set<string>();
  const holders: PlaceHolder[] = [];
  for (const row of rows) {
    const id = typeof row.id === 'string' ? row.id : '';
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const sources = parseVerificationSources(row.verification_sources);
    const google = parseGoogleData(sources.google) ?? parseGoogleData(row.google_data);
    holders.push({
      companyId: id,
      companyName: typeof row.name === 'string' ? row.name : '',
      legalName: typeof row.fmcsa_legal_name === 'string' ? row.fmcsa_legal_name : null,
      usdotNumber: typeof row.usdot_number === 'string' ? row.usdot_number : null,
      website: typeof row.website === 'string' ? row.website : null,
      placeId,
      placeName: google?.name ?? null,
      formattedAddress: google?.formatted_address ?? null,
      phone: typeof row.phone === 'string' ? row.phone : null,
      sharedLocationEvidence: hasSharedLocationEvidence(google)
        ? google?.shared_location_evidence ?? null
        : null,
    });
  }
  return {
    holders,
    error: null,
    enumeration: capped ? 'incomplete' : 'complete',
  };
}

/**
 * Persist a Google Places snapshot to verification_sources.google (and google_data when present).
 * Never overwrites a usable snapshot with a failed fetch. A conflicting or
 * ambiguous place_id is left for review and is not written. Other companies
 * that already hold the place are not deleted.
 */
export async function persistGoogleSnapshot(
  admin: SupabaseClient<Database>,
  companyId: string,
  incoming: GooglePlacesData,
  options?: {
    existingRow?: Record<string, unknown> | null;
    holders?: PlaceHolder[];
    holderEnumeration?: HolderEnumeration;
  }
): Promise<{
  ok: boolean;
  applied: boolean;
  error?: string;
  review?: RatingReview | null;
  merged: GooglePlacesData | null;
}> {
  let row = options?.existingRow ?? null;
  if (!row) {
    const { data } = await admin
      .from('companies')
      .select(
        'id, name, headquarters, usdot_number, fmcsa_legal_name, website, verification_sources, google_data, overall_rating, review_count'
      )
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

  const identity = {
    id: companyId,
    name: typeof row.name === 'string' ? row.name : '',
    legalName: typeof row.fmcsa_legal_name === 'string' ? row.fmcsa_legal_name : null,
    usdotNumber: typeof row.usdot_number === 'string' ? row.usdot_number : null,
    website: typeof row.website === 'string' ? row.website : null,
    headquarters: typeof row.headquarters === 'string' ? row.headquarters : null,
  };
  let holders = options?.holders;
  let holderEnumeration: HolderEnumeration | undefined = options?.holderEnumeration;
  if (!holders && incoming.place_id && incoming.status === 'ok') {
    const loaded = await loadOtherPlaceHolders(admin, incoming.place_id, companyId);
    holderEnumeration = loaded.enumeration;
    if (loaded.enumeration === 'failed' || loaded.error) {
      const review: RatingReview = {
        providerId: companyId,
        placeId: incoming.place_id,
        reason: 'Place association lookup failed; listing was not attached',
        holderIds: [],
      };
      logger.info('google_places.association_review', {
        companyId,
        reason: review.reason,
        placeId: incoming.place_id,
      });
      return { ok: true, applied: false, review, merged: existing };
    }
    holders = loaded.holders;
  }

  const decision = decidePlaceAttachment({
    target: identity,
    incoming,
    holders,
    holderEnumeration,
    existingPlaceId: existing?.place_id ?? null,
  });
  if (decision.action === 'review') {
    logger.info('google_places.association_review', {
      companyId,
      reason: decision.reason,
      placeId: incoming.place_id,
    });
    return { ok: true, applied: false, review: decision.review, merged: existing };
  }

  let candidate = incoming;
  if (decision.scope) {
    candidate = {
      ...incoming,
      association_scope: incoming.association_scope ?? decision.scope,
    };
  }
  const merged = mergeGoogleSnapshots(existing, candidate);

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
