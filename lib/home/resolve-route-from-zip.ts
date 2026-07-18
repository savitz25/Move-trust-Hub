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
import type { MoverCoverageTier } from '@/lib/home/rank-movers-for-route';
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
  /** local (county) → state → national for shortlist ranking UI */
  coverageTier?: MoverCoverageTier;
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

export function toHomeRouteMover(
  company: Company,
  coverageTier?: MoverCoverageTier
): HomeRouteMover {
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
    coverageTier,
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

  // Prefer companies assigned to this county when available (true "local" set).
  let localSlugs: Set<string> | undefined;
  if (local.county) {
    try {
      const { getApprovedMoversForCounty } = await import(
        '@/lib/local-movers/approved-county-movers'
      );
      const approved = await getApprovedMoversForCounty(
        from.stateSlug,
        local.county.slug
      );
      if (approved.length) {
        localSlugs = new Set(
          approved
            .map((m) => m.profileSlug)
            .filter((slug): slug is string => Boolean(slug))
        );
      }
    } catch {
      localSlugs = undefined;
    }
  }

  const { rankMoversForPickup } = await import('@/lib/home/rank-movers-for-route');
  const ranked = rankMoversForPickup(all, from, local.county, {
    limit: 10,
    localSlugs,
  });

  // If ranking is sparse, pad with reputation leaders (already classified).
  let topPool = ranked;
  if (topPool.length < 10) {
    const seen = new Set(topPool.map((c) => c.slug));
    const pad = [...all]
      .sort((a, b) => (b.reputationScore || 0) - (a.reputationScore || 0))
      .filter((c) => !seen.has(c.slug))
      .slice(0, 10 - topPool.length)
      .map((c) => ({
        ...c,
        coverageTier: (localSlugs?.has(c.slug)
          ? 'local'
          : companyMatchesPlace(c, from)
            ? 'state'
            : 'national') as import('@/lib/home/rank-movers-for-route').MoverCoverageTier,
      }));
    topPool = [...topPool, ...pad];
  }

  const topMovers = topPool.slice(0, 10).map((c) =>
    toHomeRouteMover(c, c.coverageTier)
  );

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
