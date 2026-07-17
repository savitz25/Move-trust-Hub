import 'server-only';

import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getUnifiedDirectoryCompanies } from '@/lib/directory/unified-directory';
import type { UsZipPlace } from '@/lib/geo/lookup-us-zip';
import {
  getCountiesForState,
  getCountyPath,
  getStatePath,
} from '@/lib/local-movers/index';
import type { Company } from '@/types';

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
};

function normalizeCity(value: string): string {
  return value
    .toLowerCase()
    .replace(/\bst\.\b/g, 'saint')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Best-effort city → county path within a state. */
export function resolveLocalMoversHref(place: UsZipPlace): {
  href: string;
  label: string;
} {
  const statePath = getStatePath(place.stateSlug);
  const counties = getCountiesForState(place.stateSlug);
  if (!counties.length) {
    return {
      href: statePath,
      label: `${place.city}, ${place.stateCode}`,
    };
  }

  const city = normalizeCity(place.city);
  let best:
    | { slug: string; name: string; score: number }
    | undefined;

  for (const county of counties) {
    const name = normalizeCity(county.name.replace(/ county$/i, ''));
    let score = 0;
    if (name === city) score = 100;
    else if (city.includes(name) || name.includes(city)) score = 70;
    else {
      const cityTokens = city.split(' ').filter(Boolean);
      const nameTokens = name.split(' ').filter(Boolean);
      const overlap = cityTokens.filter((t) => nameTokens.includes(t)).length;
      if (overlap > 0) score = 40 + overlap * 10;
    }
    if (!best || score > best.score) {
      best = { slug: county.slug, name: county.name, score };
    }
  }

  if (best && best.score >= 40) {
    return {
      href: getCountyPath(place.stateSlug, best.slug),
      label: `${best.name}, ${place.stateCode}`,
    };
  }

  return {
    href: statePath,
    label: `${place.stateName} local movers`,
  };
}

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
  const local = resolveLocalMoversHref(from);
  const directoryHref = `/companies?search=${encodeURIComponent(from.city)}`;

  const calcParams = new URLSearchParams();
  calcParams.set('fromZip', from.zip);
  if (to) calcParams.set('toZip', to.zip);
  calcParams.set('fromCity', from.city);
  calcParams.set('toCity', to?.city ?? '');
  const calculatorHref = `/moving-calculator?${calcParams.toString()}`;

  const all = prepareCompaniesForDirectoryClient(await getUnifiedDirectoryCompanies());
  const matched = all
    .filter((c) => companyMatchesPlace(c, from))
    .sort((a, b) => scoreCompanyForPlace(b, from) - scoreCompanyForPlace(a, from));

  const pool =
    matched.length >= 3
      ? matched
      : [...all].sort((a, b) => (b.reputationScore || 0) - (a.reputationScore || 0));

  const topMovers = pool.slice(0, 4).map(toHomeRouteMover);

  return {
    from,
    to,
    moversHref: local.href,
    directoryHref,
    calculatorHref,
    localAreaLabel: local.label,
    topMovers,
  };
}
