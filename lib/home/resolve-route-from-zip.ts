import 'server-only';

import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import type { UsZipPlace } from '@/lib/geo/lookup-us-zip';
import {
  resolveCountyFromCoords,
  type CensusCountyHit,
} from '@/lib/geo/resolve-county-from-coords';
import {
  appendZipQuery,
  resolveLocalMoversHref,
  type CountyMatchMethod,
} from '@/lib/home/resolve-local-movers-href';
import type { Company } from '@/types';

export type { CountyMatchMethod };
export {
  matchCensusToLocalCounty,
  resolveLocalMoversHref,
} from '@/lib/home/resolve-local-movers-href';

export type HomeRouteMover = {
  slug: string;
  name: string;
  headquarters: string;
  overallRating: number;
  reviewCount: number;
  reputationScore: number;
  isVerified: boolean;
  usdotNumber: string;
  mcNumber: string;
  shortDescription: string;
  services: string[];
};

export type HomeRouteResult = {
  from: UsZipPlace;
  to: UsZipPlace | null;
  moversHref: string;
  directoryHref: string;
  calculatorHref: string;
  localAreaLabel: string;
  topMovers: HomeRouteMover[];
  /** How the county page was chosen (analytics / debugging). */
  countyMatchMethod?: CountyMatchMethod;
};

function companyMatchesPlace(company: Company, place: UsZipPlace): boolean {
  const hq = (company.headquarters || '').toLowerCase();
  if (!hq) return false;
  const stateCode = place.stateCode.toLowerCase();
  const stateName = place.stateName.toLowerCase();
  const city = place.city.toLowerCase();

  if (hq.includes(`, ${stateCode}`) || hq.endsWith(` ${stateCode}`)) return true;
  if (hq.includes(stateName)) return true;
  if (hq.includes(city) && (hq.includes(stateCode) || hq.includes(stateName))) {
    return true;
  }
  return false;
}

function scoreCompanyForPlace(company: Company, place: UsZipPlace): number {
  const hq = (company.headquarters || '').toLowerCase();
  const city = place.city.toLowerCase();
  let score = company.reputationScore || 0;
  if (hq.includes(city)) score += 40;
  if (company.isVerified) score += 8;
  score += Math.min(company.overallRating || 0, 5) * 4;
  return score;
}

export function toHomeRouteMover(company: Company): HomeRouteMover {
  return {
    slug: company.slug,
    name: company.name,
    headquarters: company.headquarters,
    overallRating: company.overallRating,
    reviewCount: company.reviewCount,
    reputationScore: company.reputationScore,
    isVerified: company.isVerified,
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    shortDescription: company.shortDescription,
    services: (company.services || []).slice(0, 2),
  };
}

export async function buildHomeRouteResult(
  from: UsZipPlace,
  to: UsZipPlace | null
): Promise<HomeRouteResult> {
  let census: CensusCountyHit | null = null;
  try {
    census = await resolveCountyFromCoords(from.lat, from.lng);
  } catch {
    census = null;
  }

  const local = resolveLocalMoversHref(from, census);
  const moversHref = appendZipQuery(local.href, from.zip, to?.zip ?? null);
  const directoryHref = `/companies?search=${encodeURIComponent(from.city)}`;

  const calcParams = new URLSearchParams();
  calcParams.set('fromZip', from.zip);
  if (to) calcParams.set('toZip', to.zip);
  calcParams.set('fromCity', from.city);
  calcParams.set('toCity', to?.city ?? '');
  const calculatorHref = `/moving-calculator?${calcParams.toString()}`;

  const all = prepareCompaniesForDirectoryClient(
    await getUnifiedDirectoryCompanies()
  );
  const matched = all
    .filter((c) => companyMatchesPlace(c, from))
    .sort(
      (a, b) => scoreCompanyForPlace(b, from) - scoreCompanyForPlace(a, from)
    );

  const pool =
    matched.length >= 3
      ? matched
      : [...all].sort(
          (a, b) => (b.reputationScore || 0) - (a.reputationScore || 0)
        );

  const topMovers = pool.slice(0, 4).map(toHomeRouteMover);

  return {
    from,
    to,
    moversHref,
    directoryHref,
    calculatorHref,
    localAreaLabel: local.label,
    topMovers,
    countyMatchMethod: local.method,
  };
}
