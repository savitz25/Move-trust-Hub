/**
 * Single source of truth for company verification badges (directory, FMCSA, BBB).
 * Used by cards, directory listings, and profile pages.
 */
import type { Company } from '@/types';
import { hasBbbPublicScrapeData, normalizeBbbPublicDisplay } from '@/lib/verification/bbb-public-display';
import type { PublicScrapeData } from '@/lib/verification/types';
import {
  assessLicense,
  isMarketplaceListing,
} from '@/lib/trust/license-verification';

export type FmcsaVerificationStatus = 'verified' | 'warning' | 'critical' | 'unknown';

export type BbbVerificationStatus = 'verified' | 'unverified';

export type CompanyVerificationSnapshot = {
  /** Verifiable USDOT/MC with active operating authority from DOT/FMCSA data */
  directoryVerified: boolean;
  /** FMCSA badge to render — null when carrier should not show FMCSA badge */
  fmcsa: FmcsaVerificationStatus | null;
  /** BBB always renders as verified or unverified */
  bbb: BbbVerificationStatus;
  bbbRating: string | null;
  bbbAccredited: boolean;
};

export type CompanyVerificationFields = Pick<
  Company,
  | 'usdotNumber'
  | 'mcNumber'
  | 'authorityActive'
  | 'outOfService'
  | 'fmcsaSafetyRating'
  | 'fmcsaLastChecked'
  | 'usdotStatus'
  | 'publicScrapeData'
>;

/** Displayable USDOT/MC that is not a marketplace placeholder. */
export function hasDisplayableDotRecord(
  company: Pick<Company, 'usdotNumber' | 'mcNumber'>
): boolean {
  if (isMarketplaceListing(company.usdotNumber, company.mcNumber)) return false;
  return assessLicense(company.usdotNumber, company.mcNumber).isDisplayable;
}

export type DotLicenseFields = Pick<
  Company,
  'usdotNumber' | 'mcNumber' | 'authorityActive' | 'outOfService' | 'usdotStatus'
>;

/** Active interstate authority from DOT/FMCSA sync — basis for Directory Verified. */
export function hasActiveDotLicense(company: DotLicenseFields): boolean {
  if (!hasDisplayableDotRecord(company)) return false;
  if (company.outOfService) return false;
  if (company.authorityActive === false) return false;
  if (company.usdotStatus === 'OUT OF SERVICE' || company.usdotStatus === 'INACTIVE') {
    return false;
  }
  if (company.authorityActive === true || company.usdotStatus === 'ACTIVE') return true;
  // Displayable DOT on file without inactive/OOS flags
  return true;
}

/**
 * FMCSA badge status for public directory UI.
 * - Active DOT carriers → verified (never "unverified" when listed)
 * - Safety issues → warning; authority issues → critical
 * - Incomplete refresh data → null (badge hidden; Directory Verified still covers DOT/MC)
 *
 * Public listings must never show "FMCSA Unverified" — that contradicts site-wide
 * "DOT/MC verification on every interstate carrier" claims.
 */
export function deriveFmcsaVerificationStatus(
  company: CompanyVerificationFields
): FmcsaVerificationStatus | null {
  if (!hasDisplayableDotRecord(company)) return null;

  if (
    company.outOfService ||
    company.authorityActive === false ||
    company.usdotStatus === 'OUT OF SERVICE' ||
    company.usdotStatus === 'INACTIVE'
  ) {
    return 'critical';
  }

  if (
    company.fmcsaSafetyRating === 'Unsatisfactory' ||
    company.fmcsaSafetyRating === 'Conditional'
  ) {
    return 'warning';
  }

  // Displayable DOT with active/unknown-but-not-revoked authority → verified
  if (hasActiveDotLicense(company)) {
    return 'verified';
  }

  // Incomplete sync: do not show a negative badge on a listed carrier
  return null;
}

/**
 * BBB badge for public UI: only "verified" when scrape/API confirmed a listing.
 * Missing BBB data is not shown as "Unverified" (that reads like the mover is shady).
 */
export function deriveBbbVerificationStatus(
  publicScrapeData?: PublicScrapeData | null
): BbbVerificationStatus {
  return hasBbbPublicScrapeData(publicScrapeData) ? 'verified' : 'unverified';
}

/** True when a BBB Verified badge should render (never show BBB Unverified publicly). */
export function shouldShowBbbVerifiedBadge(
  publicScrapeData?: PublicScrapeData | null
): boolean {
  return deriveBbbVerificationStatus(publicScrapeData) === 'verified';
}

export function getBbbDisplayFromScrape(
  publicScrapeData?: PublicScrapeData | null
): { rating: string | null; accredited: boolean } {
  if (!hasBbbPublicScrapeData(publicScrapeData) || !publicScrapeData) {
    return { rating: null, accredited: false };
  }
  const normalized = normalizeBbbPublicDisplay(publicScrapeData);
  return {
    rating: normalized.rating,
    accredited: Boolean(
      publicScrapeData.bbb_accredited ||
        normalized.accreditationStatus?.toLowerCase().includes('accredited business')
    ),
  };
}

/** Full verification snapshot for a company — use in all badge UIs. */
export function getCompanyVerificationStatus(
  company: CompanyVerificationFields
): CompanyVerificationSnapshot {
  const directoryVerified = hasActiveDotLicense(company);
  let fmcsa = deriveFmcsaVerificationStatus(company);

  // Never pair Directory Verified with a missing/unknown FMCSA state — show verified.
  if (directoryVerified && (fmcsa === null || fmcsa === 'unknown')) {
    fmcsa = 'verified';
  }

  const bbb = deriveBbbVerificationStatus(company.publicScrapeData);
  const bbbDisplay = getBbbDisplayFromScrape(company.publicScrapeData);

  return {
    directoryVerified,
    fmcsa,
    bbb,
    bbbRating: bbbDisplay.rating,
    bbbAccredited: bbbDisplay.accredited,
  };
}

/** @deprecated Use getCompanyVerificationStatus().directoryVerified */
export function showDirectoryVerifiedBadge(company: CompanyVerificationFields): boolean {
  return hasActiveDotLicense(company);
}