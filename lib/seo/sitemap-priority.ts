/** Flagship city hubs — maximum crawl priority regardless of nav ordering. */
export const FLAGSHIP_CITY_HUB_SLUGS = new Set([
  'myrtle-beach-sc',
  'north-myrtle-beach',
  'boca-raton',
  'miami',
  'fort-lauderdale',
  'greenville-sc',
  'hilton-head-sc',
  'nashville-tn',
  'austin-tx',
  'phoenix-az',
]);

/** Top corridor route guides — hand-written extended content. */
export const FLAGSHIP_ROUTE_SLUGS = new Set([
  'new-york-to-florida',
  'california-to-new-york',
  'florida-to-new-york',
  'texas-to-california',
  'east-coast-to-west-coast',
  'new-york-to-myrtle-beach',
]);

/** Map editorial `market.priority` (1 = flagship) to sitemap priority. */
export function getCityHubSitemapPriority(priority: number, slug?: string): number {
  if (slug && FLAGSHIP_CITY_HUB_SLUGS.has(slug)) return 0.95;
  if (priority <= 1) return 0.95;
  if (priority <= 3) return 0.93;
  if (priority <= 6) return 0.91;
  if (priority <= 12) return 0.89;
  if (priority <= 24) return 0.86;
  return 0.83;
}

export function getRouteGuideSitemapPriority(slug: string, isExtended: boolean): number {
  if (FLAGSHIP_ROUTE_SLUGS.has(slug)) return 0.95;
  if (isExtended) return 0.92;
  return 0.85;
}