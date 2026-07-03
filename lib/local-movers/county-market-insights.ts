import {
  extractParkingHoaNotes,
  extractSeasonalAdviceFromResearch,
  getCountyResearch,
  getCountyResearchCosts,
  parseCountyPopulationFromNotes,
} from '@/lib/local-movers/county-research';
import { buildAttributableCountyReviews } from '@/lib/trust/verified-reviews';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

export type CountyMarketInsights = {
  moverCount: number;
  avgRating: number;
  /** Sum of industry-reported review counts — not verified on Move Trust Hub */
  editorialReviewVolume: number;
  usdotVerifiedCount: number;
  attributableReviewCount: number;
  topServices: string[];
  localChallenges: string[];
  costSnapshot?: {
    studioRange: string;
    familyRange: string;
    avgHourly: string;
  };
  seasonalAdvice?: string;
  parkingHoaNotes: string[];
  migrationSnippet?: string;
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

  if (research?.marketNotes) {
    const sentences = research.marketNotes.split(/(?<=[.!?])\s+/).slice(0, 2);
    challenges.push(...sentences);
  } else if (research?.tips?.length) {
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

  const parkingNotes = extractParkingHoaNotes(stateSlug, countySlug);
  for (const note of parkingNotes) {
    if (!challenges.some((c) => c.slice(0, 40) === note.slice(0, 40))) {
      challenges.push(note);
    }
  }

  return challenges.slice(0, 4);
}

function buildMigrationSnippet(stateSlug: string, countySlug: string): string | undefined {
  const research = getCountyResearch(stateSlug, countySlug);
  if (!research?.marketNotes) return undefined;

  const population = parseCountyPopulationFromNotes(research.marketNotes);
  if (population && population < 50000) {
    return `Smaller county market (~${population.toLocaleString()} residents) — confirm service-area coverage and travel fees with regional providers.`;
  }

  if (/student|university|campus|college/i.test(research.marketNotes)) {
    return 'Academic calendar peaks (August and May) drive elevated local move demand — book early around semester turnover.';
  }

  if (/retiree|snowbird|seasonal|coastal|beach/i.test(research.marketNotes)) {
    return 'Seasonal inbound/outbound migration affects crew availability — winter and summer peaks may widen scheduling windows.';
  }

  if (/tech|corporate|headquarters|hiring/i.test(research.marketNotes)) {
    return 'Corporate relocation cycles can tighten peak-season availability — request binding estimates 6–8 weeks ahead.';
  }

  return undefined;
}

export function buildCountyMarketInsights(
  stateSlug: string,
  countySlug: string,
  _county: LocalCounty,
  movers: LocalMover[]
): CountyMarketInsights {
  const moverCount = movers.length;
  const editorialReviewVolume = movers.reduce((sum, m) => sum + m.reviewCount, 0);
  const avgRating =
    moverCount > 0
      ? Math.round((movers.reduce((sum, m) => sum + m.rating, 0) / moverCount) * 10) / 10
      : 0;
  const usdotVerifiedCount = movers.filter((m) => Boolean(m.usdotNumber)).length;
  const attributableReviewCount = buildAttributableCountyReviews(movers, 10).length;
  const costs = getCountyResearchCosts(stateSlug, countySlug);

  return {
    moverCount,
    avgRating,
    editorialReviewVolume,
    usdotVerifiedCount,
    attributableReviewCount,
    topServices: topServicesFromMovers(movers),
    localChallenges: extractLocalChallenges(stateSlug, countySlug, movers),
    costSnapshot: costs
      ? {
          studioRange: costs.studioRange,
          familyRange: costs.familyRange,
          avgHourly: costs.avgHourly,
        }
      : undefined,
    seasonalAdvice: extractSeasonalAdviceFromResearch(stateSlug, countySlug),
    parkingHoaNotes: extractParkingHoaNotes(stateSlug, countySlug),
    migrationSnippet: buildMigrationSnippet(stateSlug, countySlug),
  };
}