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
 * FMCSA badge status — active DOT carriers default to verified unless warning/critical.
 * Avoids showing "FMCSA Unverified" alongside Directory Verified for the same carrier.
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

  if (hasActiveDotLicense(company)) {
    return 'verified';
  }

  if (company.fmcsaLastChecked) return 'unknown';
  return null;
}

/**
 * BBB Verified only when public scrape (or API) returned a confirmed listing.
 * Otherwise BBB Unverified — including missing or failed scrapes.
 */
export function deriveBbbVerificationStatus(
  publicScrapeData?: PublicScrapeData | null
): BbbVerificationStatus {
  return hasBbbPublicScrapeData(publicScrapeData) ? 'verified' : 'unverified';
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
  const bbb = deriveBbbVerificationStatus(company.publicScrapeData);
  const bbbDisplay = getBbbDisplayFromScrape(company.publicScrapeData);

  return {
    directoryVerified: hasActiveDotLicense(company),
    fmcsa: deriveFmcsaVerificationStatus(company),
    bbb,
    bbbRating: bbbDisplay.rating,
    bbbAccredited: bbbDisplay.accredited,
  };
}

/** @deprecated Use getCompanyVerificationStatus().directoryVerified */
export function showDirectoryVerifiedBadge(company: CompanyVerificationFields): boolean {
  return hasActiveDotLicense(company);
}