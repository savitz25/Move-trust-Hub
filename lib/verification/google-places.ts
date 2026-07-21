import type { CompanyEnrichmentInput, GooglePlacesData } from '@/lib/verification/types';
import {
  buildGooglePlacesQueryVariants,
  GOOGLE_PLACES_HIGH_CONFIDENCE_SCORE,
  GOOGLE_PLACES_MAX_QUERY_ATTEMPTS,
  GOOGLE_PLACES_MIN_ACCEPT_SCORE,
  parseCityStateFromHeadquarters,
  scoreGooglePlaceMatch,
  type GooglePlacesQueryVariant,
} from '@/lib/verification/google-places-name-queries';
import { logger } from '@/lib/logging/logger';

const SEARCH_FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.websiteUri',
  'places.rating',
  'places.userRatingCount',
  'places.nationalPhoneNumber',
  'places.reviews',
].join(',');

const DETAILS_FIELD_MASK = [
  'id',
  'displayName',
  'formattedAddress',
  'websiteUri',
  'rating',
  'userRatingCount',
  'nationalPhoneNumber',
  'internationalPhoneNumber',
  'reviews',
].join(',');

const MAX_RETRIES = 3;
const RETRY_BASE_MS = 400;
/** Candidates per text search so we can score the best (not only rank-1). */
const SEARCH_MAX_RESULTS = 5;

type PlacePayload = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  reviews?: Array<{
    text?: { text?: string };
    rating?: number;
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string };
  }>;
};

/** Server-side Places API (New) key — set as GOOGLE_PLACES_API_KEY on Vercel. */
export function getGooglePlacesApiKey(): string | null {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || null;
}

export function isGooglePlacesConfigured(): boolean {
  return Boolean(getGooglePlacesApiKey());
}

/** True when a snapshot is usable for public profile display. */
export function isUsableGoogleSnapshot(
  data: GooglePlacesData | null | undefined
): boolean {
  if (!data) return false;
  const status = data.status ?? 'ok';
  if (status !== 'ok') return false;
  return (
    (data.rating != null && data.rating > 0) ||
    (data.review_count != null && data.review_count > 0) ||
    (data.review_snippets?.length ?? 0) > 0 ||
    Boolean(data.place_id)
  );
}

function mapPlaceToGoogleData(
  place: PlacePayload,
  now: string,
  matchMeta?: {
    strategy?: string;
    query?: string;
    searchName?: string;
    score?: number;
    attempt?: number;
  }
): GooglePlacesData {
  const snippets =
    place.reviews?.slice(0, 3).map((r) => ({
      text: (r.text?.text ?? '').slice(0, 280),
      rating: r.rating ?? 0,
      relative_time: r.relativePublishTimeDescription,
      author: r.authorAttribution?.displayName,
    })) ?? [];

  const phone =
    place.nationalPhoneNumber?.trim() ||
    place.internationalPhoneNumber?.trim() ||
    null;

  return {
    source: 'google_places_api',
    place_id: place.id ?? null,
    name: place.displayName?.text ?? null,
    rating: place.rating ?? null,
    review_count: place.userRatingCount ?? null,
    formatted_address: place.formattedAddress ?? null,
    website_url: place.websiteUri?.trim() || null,
    phone,
    review_snippets: snippets.filter((s) => s.text.length > 0),
    last_fetched: now,
    status: 'ok',
    raw_response: {
      id: place.id,
      displayName: place.displayName?.text,
      rating: place.rating,
      userRatingCount: place.userRatingCount,
      nationalPhoneNumber: place.nationalPhoneNumber,
      internationalPhoneNumber: place.internationalPhoneNumber,
      ...(matchMeta?.strategy
        ? {
            match_strategy: matchMeta.strategy,
            match_query: matchMeta.query,
            match_search_name: matchMeta.searchName,
            match_score: matchMeta.score,
            match_attempt: matchMeta.attempt,
          }
        : {}),
    },
  };
}

function emptyGoogleData(
  now: string,
  status: GooglePlacesData['status'],
  error?: string
): GooglePlacesData {
  return {
    source: 'google_places_api',
    place_id: null,
    name: null,
    rating: null,
    review_count: null,
    formatted_address: null,
    website_url: null,
    phone: null,
    review_snippets: [],
    last_fetched: now,
    status,
    error,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function shouldRetryStatus(status: number): boolean {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  context: Record<string, unknown>
): Promise<Response> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, init);
      if (res.ok || !shouldRetryStatus(res.status) || attempt === MAX_RETRIES - 1) {
        return res;
      }
      logger.warn('google_places.retry', {
        ...context,
        attempt: attempt + 1,
        status: res.status,
      });
      await sleep(RETRY_BASE_MS * Math.pow(2, attempt));
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt === MAX_RETRIES - 1) throw lastError;
      logger.warn('google_places.retry_exception', {
        ...context,
        attempt: attempt + 1,
        message: lastError.message,
      });
      await sleep(RETRY_BASE_MS * Math.pow(2, attempt));
    }
  }
  throw lastError ?? new Error('Google Places request failed');
}

export async function fetchGooglePlacesByPlaceId(placeId: string): Promise<GooglePlacesData> {
  const now = new Date().toISOString();
  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) {
    return emptyGoogleData(now, 'skipped', 'Google Places API key not configured');
  }

  const id = placeId.replace(/^places\//, '').trim();
  if (!id) {
    return emptyGoogleData(now, 'not_found');
  }

  try {
    const res = await fetchWithRetry(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`,
      {
        cache: 'no-store',
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': DETAILS_FIELD_MASK,
        },
      },
      { op: 'details', placeId: id }
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      logger.error('google_places.details_failed', {
        status: res.status,
        placeId: id,
        body: errText.slice(0, 300),
      });
      return emptyGoogleData(
        now,
        res.status === 404 ? 'not_found' : 'error',
        `Google Places API ${res.status}: ${errText.slice(0, 200)}`
      );
    }

    const place = (await res.json()) as PlacePayload;
    if (!place.id && !place.displayName?.text) {
      return emptyGoogleData(now, 'not_found');
    }

    return mapPlaceToGoogleData(place, now);
  } catch (err) {
    logger.error('google_places.details_exception', {
      placeId: id,
      message: err instanceof Error ? err.message : String(err),
    });
    return emptyGoogleData(
      now,
      'error',
      err instanceof Error ? err.message : 'Google Places request failed'
    );
  }
}

async function searchTextPlaces(
  apiKey: string,
  textQuery: string
): Promise<{ places: PlacePayload[]; error?: string; httpStatus?: number }> {
  try {
    const res = await fetchWithRetry(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': SEARCH_FIELD_MASK,
        },
        body: JSON.stringify({ textQuery, maxResultCount: SEARCH_MAX_RESULTS }),
      },
      { op: 'searchText', query: textQuery.slice(0, 120) }
    );

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      logger.error('google_places.searchText_failed', {
        status: res.status,
        query: textQuery.slice(0, 120),
        body: errText.slice(0, 300),
      });
      return {
        places: [],
        error: `Google Places API ${res.status}: ${errText.slice(0, 200)}`,
        httpStatus: res.status,
      };
    }

    const json = (await res.json()) as { places?: PlacePayload[] };
    return { places: json.places ?? [] };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.error('google_places.searchText_exception', {
      query: textQuery.slice(0, 120),
      message,
    });
    return { places: [], error: message };
  }
}

/**
 * Multi-query Google Places text search:
 * prefer DBA / suffix-stripped trade names, score name + location, accept
 * high-confidence matches without manual intervention.
 */
export async function fetchGooglePlacesData(
  input: CompanyEnrichmentInput
): Promise<GooglePlacesData> {
  const now = new Date().toISOString();
  const apiKey = getGooglePlacesApiKey();

  if (!apiKey) {
    logger.warn('google_places.skipped', { reason: 'GOOGLE_PLACES_API_KEY not configured' });
    return emptyGoogleData(now, 'skipped', 'Google Places API key not configured');
  }

  if (input.placeId?.trim()) {
    return fetchGooglePlacesByPlaceId(input.placeId);
  }

  if (!input.legalName?.trim() && !input.dbaName?.trim()) {
    return emptyGoogleData(now, 'not_found', 'No company name provided for Google Places search');
  }

  const geo = parseCityStateFromHeadquarters(input.headquarters);
  const city = (input.city ?? geo.city ?? '').trim();
  const state = (input.state ?? geo.state ?? '').trim().toUpperCase().slice(0, 2);

  const variants = buildGooglePlacesQueryVariants({
    ...input,
    city: city || input.city,
    state: state || input.state,
  }).slice(0, GOOGLE_PLACES_MAX_QUERY_ATTEMPTS);

  let best:
    | {
        place: PlacePayload;
        score: number;
        variant: GooglePlacesQueryVariant;
        attempt: number;
      }
    | null = null;
  let lastError: string | undefined;
  const tried: string[] = [];

  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i]!;
    tried.push(variant.strategy);

    const { places, error } = await searchTextPlaces(apiKey, variant.textQuery);
    if (error) lastError = error;

    for (const place of places) {
      const score = scoreGooglePlaceMatch(
        {
          displayName: place.displayName?.text,
          formattedAddress: place.formattedAddress,
        },
        variant.searchName,
        city,
        state
      );
      if (!best || score > best.score) {
        best = { place, score, variant, attempt: i + 1 };
      }
    }

    if (best && best.score >= GOOGLE_PLACES_HIGH_CONFIDENCE_SCORE) {
      break;
    }
  }

  if (best && best.score >= GOOGLE_PLACES_MIN_ACCEPT_SCORE) {
    const mapped = mapPlaceToGoogleData(best.place, now, {
      strategy: best.variant.strategy,
      query: best.variant.textQuery,
      searchName: best.variant.searchName,
      score: best.score,
      attempt: best.attempt,
    });
    logger.info('google_places.ok', {
      legalName: input.legalName?.slice(0, 80),
      dbaName: input.dbaName?.slice(0, 80) ?? null,
      strategy: best.variant.strategy,
      query: best.variant.textQuery.slice(0, 120),
      searchName: best.variant.searchName.slice(0, 80),
      matchScore: best.score,
      attempt: best.attempt,
      triedStrategies: tried,
      placeId: mapped.place_id,
      placeName: mapped.name,
      rating: mapped.rating,
      reviewCount: mapped.review_count,
      hasPhone: Boolean(mapped.phone),
      hasWebsite: Boolean(mapped.website_url),
      snippets: mapped.review_snippets?.length ?? 0,
    });
    return mapped;
  }

  logger.info('google_places.not_found', {
    legalName: input.legalName?.slice(0, 80),
    dbaName: input.dbaName?.slice(0, 80) ?? null,
    triedStrategies: tried,
    bestScore: best?.score ?? null,
    bestName: best?.place.displayName?.text?.slice(0, 80) ?? null,
    lastError: lastError?.slice(0, 200),
  });

  if (lastError && !best) {
    return emptyGoogleData(now, 'error', lastError);
  }

  return emptyGoogleData(
    now,
    'not_found',
    best
      ? `No high-confidence Google match (best score ${best.score})`
      : undefined
  );
}

/**
 * Prefer a successful snapshot; never let a failed fetch replace good data.
 */
export function mergeGoogleSnapshots(
  existing: GooglePlacesData | null | undefined,
  incoming: GooglePlacesData | null | undefined
): GooglePlacesData | null {
  if (!incoming) return existing ?? null;
  if (!existing) return incoming;
  if (isUsableGoogleSnapshot(existing) && !isUsableGoogleSnapshot(incoming)) {
    return existing;
  }
  if (isUsableGoogleSnapshot(incoming)) return incoming;
  if (isUsableGoogleSnapshot(existing)) return existing;
  // Both unusable — keep the newer error/not_found for diagnostics
  return incoming;
}
