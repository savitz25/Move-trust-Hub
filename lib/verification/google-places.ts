import type { CompanyEnrichmentInput, GooglePlacesData } from '@/lib/verification/types';

const SEARCH_FIELD_MASK = [
  'places.id',
  'places.displayName',
  'places.formattedAddress',
  'places.rating',
  'places.userRatingCount',
  'places.reviews',
].join(',');

const DETAILS_FIELD_MASK = [
  'id',
  'displayName',
  'formattedAddress',
  'rating',
  'userRatingCount',
  'reviews',
].join(',');

type PlacePayload = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
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

function buildTextQuery(input: CompanyEnrichmentInput): string {
  const parts = [input.legalName, 'moving company'];
  if (input.city) parts.push(input.city);
  if (input.state) parts.push(input.state);
  else if (input.headquarters) parts.push(input.headquarters);
  return parts.filter(Boolean).join(' ');
}

function parseCityState(headquarters?: string | null): { city: string; state: string } {
  if (!headquarters) return { city: '', state: '' };
  const parts = headquarters.split(',').map((p) => p.trim());
  if (parts.length >= 2) {
    const state = parts[parts.length - 1].replace(/\d{5}(-\d{4})?/, '').trim();
    const city = parts[parts.length - 2] || parts[0];
    return { city, state: state.slice(0, 2).toUpperCase() };
  }
  return { city: parts[0] ?? '', state: '' };
}

function mapPlaceToGoogleData(place: PlacePayload, now: string): GooglePlacesData {
  const snippets =
    place.reviews?.slice(0, 3).map((r) => ({
      text: (r.text?.text ?? '').slice(0, 280),
      rating: r.rating ?? 0,
      relative_time: r.relativePublishTimeDescription,
      author: r.authorAttribution?.displayName,
    })) ?? [];

  return {
    source: 'google_places_api',
    place_id: place.id ?? null,
    name: place.displayName?.text ?? null,
    rating: place.rating ?? null,
    review_count: place.userRatingCount ?? null,
    formatted_address: place.formattedAddress ?? null,
    review_snippets: snippets.filter((s) => s.text.length > 0),
    last_fetched: now,
    status: 'ok',
    raw_response: {
      id: place.id,
      displayName: place.displayName?.text,
      rating: place.rating,
      userRatingCount: place.userRatingCount,
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
    review_snippets: [],
    last_fetched: now,
    status,
    error,
  };
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
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`, {
      cache: 'no-store',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': DETAILS_FIELD_MASK,
      },
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
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
    return emptyGoogleData(
      now,
      'error',
      err instanceof Error ? err.message : 'Google Places request failed'
    );
  }
}

export async function fetchGooglePlacesData(
  input: CompanyEnrichmentInput
): Promise<GooglePlacesData> {
  const now = new Date().toISOString();
  const apiKey = getGooglePlacesApiKey();

  if (!apiKey) {
    return emptyGoogleData(now, 'skipped', 'Google Places API key not configured');
  }

  if (input.placeId?.trim()) {
    return fetchGooglePlacesByPlaceId(input.placeId);
  }

  const geo = parseCityState(input.headquarters);
  const textQuery = buildTextQuery({
    ...input,
    city: input.city ?? geo.city,
    state: input.state ?? geo.state,
  });

  try {
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': SEARCH_FIELD_MASK,
      },
      body: JSON.stringify({ textQuery, maxResultCount: 1 }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return emptyGoogleData(
        now,
        'error',
        `Google Places API ${res.status}: ${errText.slice(0, 200)}`
      );
    }

    const json = (await res.json()) as { places?: PlacePayload[] };
    const place = json.places?.[0];
    if (!place) {
      return emptyGoogleData(now, 'not_found');
    }

    return mapPlaceToGoogleData(place, now);
  } catch (err) {
    return emptyGoogleData(
      now,
      'error',
      err instanceof Error ? err.message : 'Google Places request failed'
    );
  }
}