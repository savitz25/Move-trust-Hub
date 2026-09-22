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
    'Stored snapshot from the Google Places API, refreshed periodically — not a live feed. Separate from Move Trust Hub community reviews.',
  onSiteReviews:
    'Named third-party reviews (e.g. Google) republished on Move Trust Hub with reviewer attribution and an outbound link. Full review text is not republished. A small curated set — not the full third-party feed, and not the same as Move Trust Hub community reviews.',
} as const;

export function formatComplaintRatio(company: Pick<Company, 'fmcsaComplaints' | 'fmcsaShipments'>): string {
  const ratio = (company.fmcsaComplaints / Math.max(company.fmcsaShipments, 1)) * 1000;
  return ratio.toFixed(2);
}

/**
 * MOVE-PROFILE-V3-001A: no existing methodology defines a minimum shipment
 * denominator for a normalized complaint rate. This threshold is a
 * conservative, documented INTERIM choice to prevent false precision (e.g.
 * "0.00 per 1,000" on 1 shipment reading as a real safety signal) — it is
 * NOT a permanent statistical methodology and is pending Founder approval.
 * Below this volume we show raw counts with an explicit low-volume notice
 * instead of a normalized rate.
 */
export const MIN_SHIPMENTS_FOR_NORMALIZED_COMPLAINT_RATE = 20;

export type ComplaintDisplay =
  | { mode: 'none' }
  | { mode: 'low_volume'; complaints: number; shipments: number }
  | { mode: 'rate'; ratioPer1000: string; complaints: number; shipments: number };

/** Evidence-based complaint presentation: avoids a misleadingly precise rate on tiny denominators. */
export function getComplaintDisplay(
  company: Pick<Company, 'fmcsaComplaints' | 'fmcsaShipments'>
): ComplaintDisplay {
  const shipments = company.fmcsaShipments ?? 0;
  const complaints = company.fmcsaComplaints ?? 0;
  if (shipments <= 0) return { mode: 'none' };
  if (shipments < MIN_SHIPMENTS_FOR_NORMALIZED_COMPLAINT_RATE) {
    return { mode: 'low_volume', complaints, shipments };
  }
  return { mode: 'rate', ratioPer1000: formatComplaintRatio(company), complaints, shipments };
}

export function formatComplaintDisplayLabel(display: ComplaintDisplay): string {
  if (display.mode === 'none') return 'No FMCSA shipment volume on file';
  if (display.mode === 'low_volume') {
    const complaintWord = display.complaints === 1 ? 'complaint' : 'complaints';
    const shipmentWord = display.shipments === 1 ? 'shipment' : 'shipments';
    return `${display.complaints} ${complaintWord} recorded on ${display.shipments} reported ${shipmentWord} — too little shipment volume for a meaningful normalized rate.`;
  }
  return `${display.ratioPer1000} complaints per 1,000 shipments (${display.complaints.toLocaleString()} on ${display.shipments.toLocaleString()} shipments)`;
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
  // Live Google snippets take precedence over seed-only counts when present.
  const fromGoogle = company.googleData?.status === 'ok'
    ? (company.googleData.review_snippets ?? []).filter((s) => (s.text?.trim() ?? '').length >= 8).length
    : 0;
  const attributableOnSiteCount = Math.max(
    fromGoogle,
    getCompanyAttributableReviewCount(company.id)
  );
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