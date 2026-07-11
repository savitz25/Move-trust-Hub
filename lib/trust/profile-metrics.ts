import type { Company } from '@/types';
import {
  EDITORIAL_REVIEW_VOLUME_NOTE,
  formatAttributableReviewCount,
  formatEditorialReviewVolume,
  getCompanyAttributableReviewCount,
} from '@/lib/trust/review-display-policy';
import type { GooglePlacesData } from '@/lib/verification/types';


export const PROFILE_METRIC_TOOLTIPS = {
  overallRating:
    'Editorial star rating from third-party review platforms (Google, BBB, industry surveys). Not collected or verified on Move Trust Hub.',
  editorialVolume: EDITORIAL_REVIEW_VOLUME_NOTE,
  reputationScore:
    'Composite directory score from 0–100 weighing FMCSA complaint ratio, years in business, editorial ratings, and licensing status. Higher is better.',
  avgPriceMove:
    'Estimated average for a 3-bedroom, cross-country interstate move (~1,000+ miles). Your cost depends on weight, distance, packing, and access.',
  avgPriceAuto:
    'Estimated average for an open-carrier, cross-country vehicle shipment. Enclosed transport and expedited delivery cost more.',
  complaintRatio:
    'FMCSA consumer complaints in the last 12 months per 1,000 household-goods shipments. Lower is better — compare carriers on equal footing.',
  coverage:
    'Geographic service area from the carrier profile and county directory assignments. Confirm your origin and destination with the mover.',
  fmcsaSafety:
    'Federal Motor Carrier Safety Administration safety rating from the latest SAFER snapshot. "Not Rated" means FMCSA has not assigned a rating yet — verify on FMCSA.gov.',
  googlePlaces:
    'Live snapshot from Google Places API — separate from industry-reported totals and on-site attributed reviews.',
  onSiteReviews:
    'Named Google reviews published on Move Trust Hub with reviewer attribution. A small curated set — not the full Google feed.',
} as const;

export function formatComplaintRatio(company: Pick<Company, 'fmcsaComplaints' | 'fmcsaShipments'>): string {
  const ratio = (company.fmcsaComplaints / Math.max(company.fmcsaShipments, 1)) * 1000;
  return ratio.toFixed(2);
}

export function formatFmcsaSafetyLabel(rating: Company['fmcsaSafetyRating']): string {
  if (rating === 'Not Rated') {
    return 'Not Rated by FMCSA';
  }
  return rating;
}

export type ProfileReviewSources = {
  editorialRating: number;
  editorialReviewCount: number;
  editorialVolumeLabel: string;
  attributableOnSiteCount: number;
  attributableOnSiteLabel: string;
  googleRating: number | null;
  googleReviewCount: number | null;
  googleAvailable: boolean;
  hasContradictionRisk: boolean;
};

export function buildProfileReviewSources(
  company: Pick<Company, 'id' | 'overallRating' | 'reviewCount'>,
  googleData?: GooglePlacesData | null
): ProfileReviewSources {
  const attributableOnSiteCount = getCompanyAttributableReviewCount(company.id);
  const googleAvailable = Boolean(
    googleData?.status === 'ok' && googleData.rating != null && googleData.rating > 0
  );
  const googleReviewCount = googleData?.review_count ?? null;
  const editorialReviewCount = company.reviewCount;

  const hasContradictionRisk =
    attributableOnSiteCount > 0 && !googleAvailable && googleData?.status !== 'ok';

  return {
    editorialRating: company.overallRating,
    editorialReviewCount,
    editorialVolumeLabel: formatEditorialReviewVolume(editorialReviewCount),
    attributableOnSiteCount,
    attributableOnSiteLabel: formatAttributableReviewCount(attributableOnSiteCount),
    googleRating: googleAvailable && googleData ? googleData.rating : null,
    googleReviewCount: googleAvailable ? googleReviewCount : null,
    googleAvailable,
    hasContradictionRisk,
  };
}