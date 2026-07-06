import type { Company } from '@/types';

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
  const services = Array.isArray(company.services) ? company.services : [];
  const specialties = Array.isArray(company.specialties) ? company.specialties : [];

  return {
    ...company,
    id: (company.id || slug).trim(),
    slug,
    name: company.name?.trim() || 'Unnamed company',
    shortDescription:
      company.shortDescription?.trim() || 'Profile details are being updated.',
    description: company.description?.trim() || '',
    headquarters: company.headquarters?.trim() || '',
    website: company.website?.trim() || '',
    usdotNumber: company.usdotNumber?.trim() || '',
    mcNumber: company.mcNumber?.trim() || '',
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
    isVerified: Boolean(company.isVerified),
    bbbAccredited: Boolean(company.bbbAccredited),
    outOfService: Boolean(company.outOfService),
  };
}

export function normalizeCompaniesForDisplay(companies: Company[]): Company[] {
  return companies.map(normalizeCompanyForDisplay);
}

export function formatCompanyHeadquarters(headquarters: string | null | undefined): string {
  const value = headquarters?.trim();
  return value || 'No address available';
}

export function formatFoundedLabel(foundedYear: number): string | null {
  return foundedYear > 0 ? `Est. ${foundedYear}` : null;
}

export function formatAvgPricePerMove(price: number | null | undefined): string {
  const value = Number(price) || 0;
  return value > 0 ? `$${value.toLocaleString()}` : 'Price unavailable';
}

export function companyProfileHref(company: Pick<Company, 'slug' | 'id'>): string {
  const slug = (company.slug || company.id || '').trim();
  return slug ? `/companies/${slug}` : '/companies';
}