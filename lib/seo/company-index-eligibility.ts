/**
 * Company sitemap and robots: FMCSA identity plus reviews, complaints, or
 * real business data. GATES-014 holds stay noindex even when enriched.
 */

import { isGates014HeldSlug } from '@/lib/seo/gates-014-hold';
import { isSeoIndexableCompany } from '@/lib/provider/publication';
import type { PublicationState } from '@/lib/provider/types';
import { assessLicense } from '@/lib/trust/license-verification';

export type CompanyIndexSignals = {
  slug?: string | null;
  usdotNumber?: string | null;
  mcNumber?: string | null;
  reviewCount?: number | null;
  fmcsaComplaints?: number | null;
  complaintsLast12m?: number | null;
  complaintsLast36m?: number | null;
  phone?: string | null;
  website?: string | null;
  physicalAddress?: string | null;
  headquarters?: string | null;
  bbbBusinessId?: string | null;
  indexable?: boolean | null;
  publicationState?: PublicationState | null;
};

function filled(value: string | null | undefined): boolean {
  return Boolean(value && value.trim());
}

export function hasFmcsaIdentity(company: CompanyIndexSignals): boolean {
  return assessLicense(company.usdotNumber ?? undefined, company.mcNumber ?? undefined).isDisplayable;
}

export function hasRealBusinessData(company: CompanyIndexSignals): boolean {
  return (
    filled(company.phone) ||
    filled(company.website) ||
    filled(company.physicalAddress) ||
    filled(company.headquarters) ||
    filled(company.bbbBusinessId)
  );
}

export function hasReviewOrComplaintSignal(company: CompanyIndexSignals): boolean {
  return (
    (company.reviewCount ?? 0) > 0 ||
    (company.fmcsaComplaints ?? 0) > 0 ||
    (company.complaintsLast12m ?? 0) > 0 ||
    (company.complaintsLast36m ?? 0) > 0
  );
}

/**
 * Enriched profile: a displayable FMCSA number plus at least one of reviews,
 * complaints, or real business data. Holds and non-indexable publication
 * states never qualify.
 */
export function isEnrichedCompanyProfile(company: CompanyIndexSignals): boolean {
  if (isGates014HeldSlug(company.slug)) return false;
  if (
    !isSeoIndexableCompany({
      indexable: company.indexable,
      publicationState: company.publicationState,
    })
  ) {
    return false;
  }
  if (!hasFmcsaIdentity(company)) return false;
  return hasReviewOrComplaintSignal(company) || hasRealBusinessData(company);
}
