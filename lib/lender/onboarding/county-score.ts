import { getCountyFromZip } from '@/lib/lender/lenders';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function resolveCountyFromAddress(params: {
  zip?: string | null;
  city?: string | null;
  state?: string | null;
}): { countySlug: string | null; stateSlug: string | null; county: string | null; state: string | null } {
  if (params.zip) {
    const match = getCountyFromZip(params.zip.replace(/\D/g, '').slice(0, 5));
    if (match) {
      return {
        countySlug: match.countySlug,
        stateSlug: match.stateSlug,
        county: match.county,
        state: match.state,
      };
    }
  }

  const state = params.state?.trim() || null;
  return {
    countySlug: params.city ? slugify(params.city) : null,
    stateSlug: state ? slugify(state) : null,
    county: params.city ?? null,
    state,
  };
}

/** County experience score 0–100 — mirrors mover destination weighting (simplified). */
export function computeCountyExperienceScore(params: {
  countySlug: string | null;
  stateSlug: string | null;
  licenseCount: number;
  googleRating: number | null;
  cfpbComplaints: number;
}): number {
  let score = 40;
  if (params.countySlug && params.stateSlug) score += 15;
  if (params.licenseCount >= 3) score += 15;
  else if (params.licenseCount >= 1) score += 8;
  if (params.googleRating != null) {
    score += Math.round((params.googleRating / 5) * 20);
  }
  if (params.cfpbComplaints > 50) score -= 15;
  else if (params.cfpbComplaints > 10) score -= 5;
  return Math.max(0, Math.min(100, score));
}