/** Lightweight path helpers — safe for client components (no geography/catalog imports). */

export function getCountyPath(stateSlug: string, countySlug: string): string {
  return `/local-movers/${stateSlug}/${countySlug}`;
}

export function getStatePath(stateSlug: string): string {
  return `/local-movers/${stateSlug}`;
}