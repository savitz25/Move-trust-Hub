/**
 * URL slug aliases → canonical registry/market slugs.
 *
 * Some FL/SC Grand Strand hubs were published under bare slugs (e.g. `miami`)
 * while external links and user intuition use state-suffixed forms (`miami-fl`).
 * Aliases resolve to real CityHub content; sitemap keeps canonical bare slugs.
 */
export const CITY_HUB_SLUG_ALIASES: Record<string, string> = {
  // South Carolina Grand Strand (bare → published)
  'north-myrtle-beach-sc': 'north-myrtle-beach',
  'surfside-beach-sc': 'surfside-beach',
  'atlantic-beach-sc': 'atlantic-beach',
  'garden-city-beach-sc': 'garden-city-beach',
  'little-river-sc': 'little-river',
  'murrells-inlet-sc': 'murrells-inlet',
  'socastee-sc': 'socastee',
  'carolina-forest-sc': 'carolina-forest',
  // Florida (bare → published)
  'boca-raton-fl': 'boca-raton',
  'deerfield-beach-fl': 'deerfield-beach',
  'boynton-beach-fl': 'boynton-beach',
  'delray-beach-fl': 'delray-beach',
  'miami-fl': 'miami',
  'fort-lauderdale-fl': 'fort-lauderdale',
  'hollywood-fl': 'hollywood',
  'pompano-beach-fl': 'pompano-beach',
  'jacksonville-fl': 'jacksonville',
  'naples-fl': 'naples',
  'ocala-fl': 'ocala',
  'sarasota-fl': 'sarasota',
  'st-augustine-fl': 'st-augustine',
  'wildwood-fl': 'wildwood',
};

/** Map request slug to the registry/market key (identity if already canonical). */
export function resolveCityHubSlug(slug: string): string {
  return CITY_HUB_SLUG_ALIASES[slug] ?? slug;
}
