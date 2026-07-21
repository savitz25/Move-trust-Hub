import { generatedMoversCatalog } from '@/data/generated/index';
import { getCompanyBySlug, seedCompanies } from '@/data/seed-companies';
import {
  assessLicense,
  isPlaceholderMoverId,
  normalizeUsdot,
} from '@/lib/trust/license-verification';
import type { LocalMover } from '@/lib/local-movers/types';

/**
 * Curated listing policy — what qualifies for public display on Move Trust Hub.
 *
 * A mover is displayable when ALL of the following hold:
 * 1. ID is not a regional placeholder (`regional-*`).
 * 2. ID is not from the auto-generated state template catalog (pseudo FMCSA numbers).
 * 3. USDOT passes format + suspicious-pattern checks (no sequential/placeholder values).
 * 4. If linked to the interstate directory (`profileSlug`), the directory entry must
 *    exist, be marked verified, and USDOT must match the directory record.
 * 5. Local-only movers (no profileSlug) must have a valid, non-suspicious USDOT and MC.
 *
 * Review / AggregateRating schema is emitted ONLY when attributable verified reviews
 * exist (see verified-reviews.ts) — not from county editorial quotes or seed ratings.
 */

export const CURATED_LISTING_POLICY = {
  minUsdotDigits: 5,
  maxUsdotDigits: 8,
  requireMcForLocalOnly: false,
  directoryLinkRequiredForSchemaRatings: true,
  attributableReviewSources: ['Google'] as const,
} as const;

export type CuratedListingVerdict = {
  isDisplayable: boolean;
  reason: string;
  tier: 'directory_linked' | 'local_verified_format' | 'excluded';
};

const verifiedDirectoryUsdots = new Set(
  seedCompanies
    .filter((c) => c.isVerified && assessLicense(c.usdotNumber, c.mcNumber).isDisplayable)
    .map((c) => normalizeUsdot(c.usdotNumber))
);

export function isGeneratedTemplateMover(id: string): boolean {
  return id in generatedMoversCatalog;
}

export function evaluateCuratedListing(mover: LocalMover): CuratedListingVerdict {
  // Published company profiles (from Intrastate/Interstate onboarding) always qualify
  // for county/hub display. Local movers often have no USDOT on the company row by design.
  if (mover.id.startsWith('directory-') && mover.profileSlug) {
    const license = assessLicense(mover.usdotNumber, mover.mcNumber);
    if (license.isDisplayable) {
      return {
        isDisplayable: true,
        reason: 'onboarded_directory_profile',
        tier: 'directory_linked',
      };
    }
    // Local / intrastate onboarded profile without USDOT identity
    return {
      isDisplayable: true,
      reason: 'onboarded_local_directory_profile',
      tier: 'directory_linked',
    };
  }

  if (isPlaceholderMoverId(mover.id)) {
    return { isDisplayable: false, reason: 'regional_placeholder_id', tier: 'excluded' };
  }

  if (isGeneratedTemplateMover(mover.id)) {
    return { isDisplayable: false, reason: 'generated_template_catalog', tier: 'excluded' };
  }

  const license = assessLicense(mover.usdotNumber, mover.mcNumber);
  if (!license.isDisplayable) {
    return {
      isDisplayable: false,
      reason: `license_${license.issues[0] ?? 'invalid'}`,
      tier: 'excluded',
    };
  }

  if (mover.profileSlug) {
    const company = getCompanyBySlug(mover.profileSlug);
    if (!company) {
      return { isDisplayable: false, reason: 'missing_directory_profile', tier: 'excluded' };
    }
    if (!company.isVerified) {
      return { isDisplayable: false, reason: 'unverified_directory_profile', tier: 'excluded' };
    }
    const companyLicense = assessLicense(company.usdotNumber, company.mcNumber);
    if (!companyLicense.isDisplayable) {
      return {
        isDisplayable: false,
        reason: 'directory_license_invalid',
        tier: 'excluded',
      };
    }
    const moverUsdot = normalizeUsdot(mover.usdotNumber);
    const companyUsdot = normalizeUsdot(company.usdotNumber);
    if (moverUsdot && companyUsdot && moverUsdot !== companyUsdot) {
      return { isDisplayable: false, reason: 'usdot_directory_mismatch', tier: 'excluded' };
    }
    return { isDisplayable: true, reason: 'directory_linked_verified', tier: 'directory_linked' };
  }

  return {
    isDisplayable: true,
    reason: 'local_format_valid_license',
    tier: 'local_verified_format',
  };
}

export function isCuratedMover(mover: LocalMover): boolean {
  return evaluateCuratedListing(mover).isDisplayable;
}

export function isDirectoryVerifiedUsdot(usdot: string | undefined): boolean {
  const normalized = normalizeUsdot(usdot);
  return normalized.length > 0 && verifiedDirectoryUsdots.has(normalized);
}

export function countVerifiedDirectoryCompanies(): number {
  return verifiedDirectoryUsdots.size;
}