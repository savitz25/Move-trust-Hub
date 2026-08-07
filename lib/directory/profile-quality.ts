/**
 * Phase 4 — profile thinness / indexation policy.
 * Prefer fewer strong profiles over aggressive indexation of stubs.
 */

import type { Company } from '@/types';
import { assessLicense } from '@/lib/trust/license-verification';

export type ProfileQuality = {
  /** Enough substance for normal indexation */
  indexable: boolean;
  reason: string;
  /** Research page is still useful for users who land there */
  usable: boolean;
};

/**
 * Thin profiles: missing USDOT (when interstate), and almost no descriptive content.
 * Intrastate locals without USDOT can still be usable but stay cautious on index.
 */
export function assessProfileQuality(company: Company): ProfileQuality {
  const license = assessLicense(company.usdotNumber, company.mcNumber);
  const hasDot = license.isDisplayable;
  const descLen =
    (company.description?.trim().length ?? 0) +
    (company.shortDescription?.trim().length ?? 0);
  const hasReviews = (company.reviewCount ?? 0) > 0 && (company.overallRating ?? 0) > 0;
  const hasFreshness = Boolean(company.fmcsaLastChecked?.trim());
  const isIntrastate = company.serviceScope === 'intrastate';

  if (company.outOfService || company.authorityActive === false) {
    return {
      indexable: hasDot || hasReviews,
      reason: 'authority_alert_profile',
      usable: true,
    };
  }

  if (!hasDot && !isIntrastate && descLen < 60 && !hasReviews) {
    return {
      indexable: false,
      reason: 'thin_interstate_stub',
      usable: true,
    };
  }

  if (!hasDot && isIntrastate && descLen < 40 && !hasReviews) {
    return {
      indexable: false,
      reason: 'thin_local_stub',
      usable: true,
    };
  }

  if (hasDot || hasReviews || hasFreshness || descLen >= 80) {
    return { indexable: true, reason: 'sufficient_research_signals', usable: true };
  }

  return { indexable: false, reason: 'insufficient_profile_signals', usable: true };
}
