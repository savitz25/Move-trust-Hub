import { googleMapsProfileUrl } from '@/lib/verification/google-profile-url';
import type { GooglePlacesData } from '@/lib/verification/types';

/** Public profile evidence gate; a searchable company alone is not a snapshot. */
export function hasGoogleReputationSnapshot(
  data: GooglePlacesData | null | undefined
): data is GooglePlacesData & { rating: number; review_count: number } {
  if (!data || (data.status && data.status !== 'ok')) return false;

  // Older stored snapshots may omit status, but must retain actual evidence.
  return (
    data.source === 'google_places_api' &&
    typeof data.rating === 'number' &&
    Number.isFinite(data.rating) && data.rating >= 1 && data.rating <= 5 &&
    typeof data.review_count === 'number' &&
    Number.isInteger(data.review_count) && data.review_count > 0 &&
    typeof data.last_fetched === 'string' &&
    Number.isFinite(Date.parse(data.last_fetched)) &&
    Boolean(data.place_id?.trim() || (data.name?.trim() && data.formatted_address?.trim())) &&
    Boolean(googleMapsProfileUrl(data))
  );
}
