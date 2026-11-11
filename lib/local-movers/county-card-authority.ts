import type { LocalMover } from '@/lib/local-movers/types';

export type CountyCardTypeScope = {
  isLocalOnly: boolean;
  serviceScope: 'intrastate' | 'interstate' | undefined;
};

/**
 * State-only movers are not shown as federally authorized.
 * A USDOT number without federal registration evidence does not flip the
 * county card to Interstate Carrier.
 */
export function countyCardTypeScope(mover: LocalMover): CountyCardTypeScope {
  if (mover.regulatoryStanding?.basis === 'state_only') {
    return { isLocalOnly: true, serviceScope: 'intrastate' };
  }
  if (mover.usdotNumber) {
    return { isLocalOnly: false, serviceScope: 'interstate' };
  }
  if (mover.isLocalOnly) {
    return { isLocalOnly: true, serviceScope: 'intrastate' };
  }
  return { isLocalOnly: false, serviceScope: undefined };
}

/**
 * Profile links are rendered only for an explicit slug on a consumer-visible
 * company. Guessed slugs and unpublished profiles are not linked.
 */
export function listedMoverProfileSlug(
  mover: Pick<LocalMover, 'profileSlug' | 'listingSource' | 'profilePublished'>
): string {
  const slug = mover.profileSlug?.trim() ?? '';
  if (!slug) return '';
  if (mover.listingSource === 'directory' || mover.profilePublished) return slug;
  return '';
}
