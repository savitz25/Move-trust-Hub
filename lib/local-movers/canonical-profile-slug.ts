import type { LocalMover } from '@/lib/local-movers/types';

/**
 * County cards may only link a profile slug supplied by a resolved company row.
 * Inferring a slug from a mover's name or license can create a plausible URL
 * for a company profile that does not exist.
 */
export function canonicalProfileSlugForMover(
  mover: Pick<LocalMover, 'profileSlug'>
): string | null {
  const slug = mover.profileSlug?.trim();
  if (!slug || !/^[a-z0-9][a-z0-9-]*$/i.test(slug)) return null;
  return slug;
}
