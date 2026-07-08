import type { GooglePlacesData } from '@/lib/verification/types';

/** Public Google Maps URL for a Places API (New) place_id. */
export function googleMapsProfileUrl(data: GooglePlacesData): string | null {
  if (data.place_id) {
    const query = encodeURIComponent(data.name?.trim() || 'moving company');
    return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${encodeURIComponent(data.place_id)}`;
  }

  if (data.name && data.formatted_address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${data.name} ${data.formatted_address}`)}`;
  }

  return null;
}

export function hasDisplayableGoogleReviews(
  data: GooglePlacesData | null | undefined
): data is GooglePlacesData {
  return Boolean(data && data.status === 'ok' && data.rating != null && data.rating > 0);
}