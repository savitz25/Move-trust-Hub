import { getCountyResearch } from '@/lib/local-movers/county-research';
import { buildAttributableCountyReviews } from '@/lib/trust/verified-reviews';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyMarketInsights = {
  moverCount: number;
  avgRating: number;
  totalReviews: number;
  usdotVerifiedCount: number;
  attributableReviewCount: number;
  topServices: string[];
  localChallenges: string[];
};

function topServicesFromMovers(movers: LocalMover[], limit = 4): string[] {
  const counts = new Map<string, number>();
  for (const mover of movers) {
    for (const service of mover.services) {
      counts.set(service, (counts.get(service) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([service]) => service);
}

function extractLocalChallenges(
  stateSlug: string,
  countySlug: string,
  movers: LocalMover[]
): string[] {
  const research = getCountyResearch(stateSlug, countySlug);
  const challenges: string[] = [];

  if (research?.tips?.length) {
    challenges.push(research.tips[0]);
    if (research.tips[1]) challenges.push(research.tips[1]);
  }

  const specialtyCounts = new Map<string, number>();
  for (const mover of movers) {
    for (const specialty of mover.specialties ?? []) {
      specialtyCounts.set(specialty, (specialtyCounts.get(specialty) ?? 0) + 1);
    }
  }
  const topSpecialty = [...specialtyCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (topSpecialty) {
    challenges.push(
      `${topSpecialty[0]} is a common specialty among verified movers serving this market.`
    );
  }

  return challenges.slice(0, 3);
}

export function buildCountyMarketInsights(
  stateSlug: string,
  countySlug: string,
  _county: LocalCounty,
  movers: LocalMover[]
): CountyMarketInsights {
  const moverCount = movers.length;
  const totalReviews = movers.reduce((sum, m) => sum + m.reviewCount, 0);
  const avgRating =
    moverCount > 0
      ? Math.round((movers.reduce((sum, m) => sum + m.rating, 0) / moverCount) * 10) / 10
      : 0;
  const usdotVerifiedCount = movers.filter((m) => Boolean(m.usdotNumber)).length;
  const attributableReviewCount = buildAttributableCountyReviews(movers, 10).length;

  return {
    moverCount,
    avgRating,
    totalReviews,
    usdotVerifiedCount,
    attributableReviewCount,
    topServices: topServicesFromMovers(movers),
    localChallenges: extractLocalChallenges(stateSlug, countySlug, movers),
  };
}