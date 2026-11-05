/**
 * MOVE-SITEMAP-CLEANUP-001
 * These profiles are already noindex. They stay reachable and stay out of sitemap.xml.
 * The identified Cord and Gouffon profiles are not in this set.
 */

const SITEMAP_EXCLUDED_HOLD_SLUGS = new Set([
  'cord-moving-storage',
  'gouffon-moving-storage-2',
]);

export function isSitemapExcludedHoldProfile(slug: string): boolean {
  return SITEMAP_EXCLUDED_HOLD_SLUGS.has(slug.trim());
}
