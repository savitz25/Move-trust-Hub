const EARTH_RADIUS_MILES = 3958.8;

/** Typical U.S. road distance is ~25–30% longer than straight-line. */
export const DRIVING_DISTANCE_FACTOR = 1.27;

export type Coordinates = {
  lat: number;
  lng: number;
};

export function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineMiles(a: Coordinates, b: Coordinates): number {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(h));
}

export function estimateDrivingMiles(straightLineMiles: number): number {
  return Math.round(straightLineMiles * DRIVING_DISTANCE_FACTOR);
}

export function isValidUsZip(zip: string): boolean {
  return /^\d{5}$/.test(zip.trim());
}