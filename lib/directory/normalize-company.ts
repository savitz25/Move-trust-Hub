import type { Company } from '@/types';
import { normalizeCompanyWebsiteUrl } from '@/lib/verification/normalize-website-url';
import {
  normalizeServiceTags,
  normalizeSpecialtyTags,
} from '@/lib/data-quality/display-normalize';
import { dedupeEntitiesByIdentity } from '@/lib/data-quality/entity-dedup';
import { allowVerifiedPresentation } from '@/lib/data-quality/consistency-alarms';

const EMPTY_RATING_BREAKDOWN: Company['ratingBreakdown'] = {
  fiveStar: 0,
  fourStar: 0,
  threeStar: 0,
  twoStar: 0,
  oneStar: 0,
};

/** Normalize company records for safe directory rendering (handles suggestion-approved rows). */
export function normalizeCompanyForDisplay(company: Company): Company {
  const slug = (company.slug || company.id || '').trim() || 'unknown-company';
  const services = normalizeServiceTags(
    Array.isArray(company.services) ? (company.services as string[]) : []
  ) as Company['services'];
  const specialties = normalizeSpecialtyTags(
    Array.isArray(company.specialties) ? company.specialties : []
  );

  const isVerified =
    Boolean(company.isVerified) && allowVerifiedPresentation(company);

  return {
    ...company,
    id: (company.id || slug).trim(),
    slug,
    name: company.name?.trim() || 'Unnamed company',
    shortDescription:
      company.shortDescription?.trim() || 'Profile details are being updated.',
    description: company.description?.trim() || '',
    headquarters: company.headquarters?.trim() || '',
    website: normalizeCompanyWebsiteUrl(company.website) || company.website?.trim() || '',
    usdotNumber: company.usdotNumber?.trim() || '',
    mcNumber: company.mcNumber?.trim() || '',
    entityType: company.entityType ?? null,
    serviceScope: company.serviceScope ?? null,
    foundedYear: Number(company.foundedYear) > 0 ? Number(company.foundedYear) : 0,
    fmcsaSafetyRating: company.fmcsaSafetyRating || 'Not Rated',
    fmcsaComplaints: Number(company.fmcsaComplaints) || 0,
    fmcsaShipments: Math.max(Number(company.fmcsaShipments) || 0, 1),
    bbbRating: company.bbbRating || 'NR',
    overallRating: Number(company.overallRating) || 0,
    reviewCount: Number(company.reviewCount) || 0,
    reputationScore: Number(company.reputationScore) || 0,
    yearsInBusiness: Number(company.yearsInBusiness) || 0,
    avgPricePerMove: Number(company.avgPricePerMove) || 0,
    priceRange: company.priceRange || '$$',
    coverage: company.coverage || 'Continental US',
    services,
    specialties,
    ratingBreakdown: company.ratingBreakdown ?? EMPTY_RATING_BREAKDOWN,
    lastUpdated: company.lastUpdated || '',
    isVerified,
    bbbAccredited: Boolean(company.bbbAccredited),
    outOfService: Boolean(company.outOfService),
    // Explicit pass-through so enrichment is never dropped by partial rebuilds
    googleData: company.googleData ?? null,
    publicScrapeData: company.publicScrapeData ?? null,
  };
}

export function normalizeCompaniesForDisplay(companies: Company[]): Company[] {
  if (!Array.isArray(companies)) return [];

  const mapped = companies
    .map((company) => {
      try {
        return normalizeCompanyForDisplay(company);
      } catch {
        return null;
      }
    })
    .filter((row): row is Company => row !== null);

  // Phase 2: collapse USDOT / name+place duplicates in public lists
  return dedupeEntitiesByIdentity(mapped).unique;
}

export function formatCompanyHeadquarters(headquarters: string | null | undefined): string {
  const value = headquarters?.trim();
  return value || 'No address available';
}

const MIN_FOUNDED_YEAR = 1800;

/** True when a founding year is real (never 0 / missing / far-future). */
export function isValidFoundedYear(foundedYear: number | null | undefined): boolean {
  const year = Number(foundedYear);
  if (!Number.isFinite(year) || year <= 0) return false;
  const maxYear = new Date().getFullYear() + 1;
  return year >= MIN_FOUNDED_YEAR && year <= maxYear;
}

/** Prefer stored years; else derive from a valid founding year. Never returns 0. */
export function resolveYearsInBusiness(
  yearsInBusiness: number | null | undefined,
  foundedYear?: number | null
): number | null {
  const stored = Number(yearsInBusiness);
  if (Number.isFinite(stored) && stored > 0 && stored < 300) return Math.floor(stored);
  if (isValidFoundedYear(foundedYear)) {
    const derived = new Date().getFullYear() - Number(foundedYear);
    if (derived > 0 && derived < 300) return derived;
  }
  return null;
}

export function formatFoundedLabel(foundedYear: number | null | undefined): string | null {
  return isValidFoundedYear(foundedYear) ? `Est. ${Number(foundedYear)}` : null;
}

export function formatFoundedPlain(foundedYear: number | null | undefined): string | null {
  return isValidFoundedYear(foundedYear) ? `Founded ${Number(foundedYear)}` : null;
}

export function formatYearsInBusinessLabel(
  yearsInBusiness: number | null | undefined,
  foundedYear?: number | null
): string | null {
  const years = resolveYearsInBusiness(yearsInBusiness, foundedYear);
  if (years == null) return null;
  return years === 1 ? '1 year in business' : `${years} years in business`;
}

/**
 * Profile subtitle: HQ • Founded YYYY • N years in business.
 * Omits founded / tenure segments when data is missing or zero.
 */
export function formatCompanyTenureLine(input: {
  headquarters?: string | null;
  foundedYear?: number | null;
  yearsInBusiness?: number | null;
}): string {
  const parts: string[] = [];
  const hq = input.headquarters?.trim();
  if (hq) parts.push(hq);
  const founded = formatFoundedPlain(input.foundedYear);
  if (founded) parts.push(founded);
  const tenure = formatYearsInBusinessLabel(input.yearsInBusiness, input.foundedYear);
  if (tenure) parts.push(tenure);
  return parts.join(' • ');
}

export function formatAvgPricePerMove(price: number | null | undefined): string {
  const value = Number(price) || 0;
  return value > 0 ? `$${value.toLocaleString()}` : 'Price unavailable';
}

export function companyProfileHref(company: Pick<Company, 'slug' | 'id'>): string {
  const slug = (company.slug || company.id || '').trim();
  return slug ? `/companies/${slug}` : '/companies';
}