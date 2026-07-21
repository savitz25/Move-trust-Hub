import { normalizeCompanyWebsiteUrl } from '@/lib/verification/normalize-website-url';

/**
 * Self-contained shortlisted mover snapshot for Move Report email + PDF.
 * Enough detail to contact and verify a carrier without opening the website.
 */
export type ShortlistMoverCard = {
  name: string;
  slug: string;
  profileUrl: string;
  overallRating: number | null;
  reviewCount: number | null;
  reputationScore: number | null;
  googleRating: number | null;
  googleReviewCount: number | null;
  fmcsaSafetyRating: string | null;
  /** Carrier, Broker, Carrier/Broker, etc. */
  entityType: string | null;
  usdotNumber: string | null;
  mcNumber: string | null;
  powerUnits: number | null;
  /** e.g. Active authority, Out of service */
  authorityLabel: string | null;
  /** Street / HQ / Google formatted address */
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
};

export function emptyShortlistMoverCard(
  partial: Pick<ShortlistMoverCard, 'name' | 'slug' | 'profileUrl'>
): ShortlistMoverCard {
  return {
    name: partial.name,
    slug: partial.slug,
    profileUrl: partial.profileUrl,
    overallRating: null,
    reviewCount: null,
    reputationScore: null,
    googleRating: null,
    googleReviewCount: null,
    fmcsaSafetyRating: null,
    entityType: null,
    usdotNumber: null,
    mcNumber: null,
    powerUnits: null,
    authorityLabel: null,
    address: null,
    phone: null,
    email: null,
    website: null,
  };
}

/** Normalize phone for tel: links. */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits || phone.trim();
}

export function normalizeWebsiteHref(website: string): string {
  return normalizeCompanyWebsiteUrl(website) || website.trim();
}
