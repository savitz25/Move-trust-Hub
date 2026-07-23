import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import type { CountyPopularRoute } from '@/lib/local-movers/county-popular-routes';

export type CountyMovingSnapshot = {
  primaryMarkets: string;
  moveProfile: string;
  peakSeason: string;
  keyChallenges: string;
  majorCorridors: string;
  popularDestinations: string;
};

/** Compact snapshot derived from intelligence pack + popular routes (unique per county). */
export function buildCountyMovingSnapshot(
  pack: CountyIntelligencePack | null,
  routes: CountyPopularRoute[],
  countyLabel: string
): CountyMovingSnapshot | null {
  if (!pack) return null;

  const primaryMarkets =
    pack.zones
      .slice(0, 4)
      .map((z) => z.shortName)
      .join(' · ') || countyLabel;

  const moveProfile =
    pack.specialized?.[0]?.title ??
    pack.heroCredibility ??
    pack.whatMakesDifferent.intro.slice(0, 120);

  const peakSeason =
    pack.seasonal.items
      .slice(0, 2)
      .map((i) => i.title)
      .join('; ') || 'Peak summer and month-end demand';

  const keyChallenges = pack.whatMakesDifferent.bullets
    .slice(0, 3)
    .map((b) => b.title)
    .filter(Boolean)
    .join(' · ');

  const corridorBullet = pack.whatMakesDifferent.bullets.find((b) =>
    /traffic|corridor|freeway|parkway|expressway|bridge|turnpike|route/i.test(
      `${b.title} ${b.detail}`
    )
  );
  const majorCorridors =
    corridorBullet?.title ??
    pack.zones
      .slice(0, 2)
      .map((z) => z.name)
      .join(' / ');

  const popularDestinations =
    routes
      .filter((r) => r.direction === 'outbound' || r.direction === 'inbound')
      .slice(0, 3)
      .map((r) => r.label)
      .join(' · ') ||
    routes
      .slice(0, 3)
      .map((r) => r.label)
      .join(' · ');

  return {
    primaryMarkets,
    moveProfile,
    peakSeason,
    keyChallenges: keyChallenges || pack.whatMakesDifferent.intro.slice(0, 100),
    majorCorridors,
    popularDestinations: popularDestinations || `Local moves within ${countyLabel}`,
  };
}
