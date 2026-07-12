import type { Company } from '@/types';
import {
  assessLicense,
  buildFmcsaSaferUrl,
  isMarketplaceListing,
} from '@/lib/trust/license-verification';
import { hasActiveDotLicense } from '@/lib/trust/verification-status';

export const LICENSE_PENDING_MESSAGE = 'Licensing details pending verification';

export type LicenseDisplayStatus = 'verified' | 'pending' | 'marketplace';

export type LicenseDisplay = {
  status: LicenseDisplayStatus;
  usdot?: string;
  mc?: string;
  fmcsaUrl?: string;
  pendingMessage?: string;
  marketplaceNote?: string;
};

export function canShowLicenseNumbers(
  usdot: string | undefined,
  mc?: string | undefined
): boolean {
  if (isMarketplaceListing(usdot, mc)) return false;
  return assessLicense(usdot, mc).isDisplayable;
}

export function canShowVerifiedBadge(
  company: Pick<
    Company,
    | 'usdotNumber'
    | 'mcNumber'
    | 'authorityActive'
    | 'outOfService'
    | 'usdotStatus'
  >
): boolean {
  return hasActiveDotLicense(company);
}

function hasNoLicenseOnFile(
  company: Pick<Company, 'usdotNumber' | 'mcNumber'>
): boolean {
  return !company.usdotNumber?.trim() && !company.mcNumber?.trim();
}

/** Whether a company may appear in public directories and profile routes. */
export function isPubliclyDisplayableCompany(
  company: Pick<Company, 'usdotNumber' | 'mcNumber'>
): boolean {
  if (isMarketplaceListing(company.usdotNumber, company.mcNumber)) return true;
  if (hasNoLicenseOnFile(company)) return true;
  return assessLicense(company.usdotNumber, company.mcNumber).isDisplayable;
}

export function getLicenseDisplay(
  company: Pick<Company, 'usdotNumber' | 'mcNumber'>
): LicenseDisplay {
  if (isMarketplaceListing(company.usdotNumber, company.mcNumber)) {
    return {
      status: 'marketplace',
      marketplaceNote:
        'Online marketplace — carriers on the platform hold their own FMCSA authority. Verify each transporter before booking.',
    };
  }

  const license = assessLicense(company.usdotNumber, company.mcNumber);
  if (license.isDisplayable) {
    return {
      status: 'verified',
      usdot: company.usdotNumber,
      mc: company.mcNumber,
      fmcsaUrl: buildFmcsaSaferUrl(company.usdotNumber!),
    };
  }

  return {
    status: 'pending',
    pendingMessage: LICENSE_PENDING_MESSAGE,
  };
}

export function directoryVerifiedLabel(
  company: Pick<
    Company,
    | 'usdotNumber'
    | 'mcNumber'
    | 'authorityActive'
    | 'outOfService'
    | 'usdotStatus'
  >
): string | null {
  return canShowVerifiedBadge(company) ? 'Directory Verified' : null;
}