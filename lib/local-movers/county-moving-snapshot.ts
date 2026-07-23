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

/** Operational / essay titles that must never appear as "Major corridors". */
const CORRIDOR_FIELD_BLOCKLIST =
  /tourism calendars|operational inputs|hoa density|parking\/curb|curb staging|portal-to-portal|heat and afternoon|student & seasonal|growth villages|licensing:|intrastate|corporate and finance|event, stadium|high-rises make|urban core and northern/i;

/**
 * Extract road/route-like tokens from free text (I-4, US-1, FL-408, expressways, etc.).
 * Used only as a fallback when pack.majorCorridors is not set.
 */
export function extractRoadCorridorTokens(text: string, max = 6): string[] {
  if (!text.trim()) return [];
  const patterns: RegExp[] = [
    /\bI[-\s]?\d{1,3}[A-Z]?\b/gi,
    /\bUS[-\s]?\d{1,3}(?:\/\d{1,3})?\b/gi,
    /\b(?:FL|SR|GA|NY|TX|CA|AZ|NJ|CR)[-\s]?\d{1,3}[A-Z]?\b/gi,
    /\b(?:Florida|New Jersey|Garden State|Dallas North|Sam Houston|President George Bush)\s+Turnpike\b/gi,
    /\b(?:Cross Bronx|Major Deegan|Bruckner|Grand Central|Long Island|Garden State)\s+Expressway\b/gi,
    /\bPGBT\b/gi,
    /\b(?:Florida Turnpike|Dallas North Tollway|International Drive|PGA Boulevard|Grand Concourse)\b/gi,
    /\b(?:I-75\/85|I-75\/I-85)\s*(?:Connector)?\b/gi,
  ];
  const found: string[] = [];
  const seen = new Set<string>();
  for (const re of patterns) {
    const matches = text.match(re) ?? [];
    for (const raw of matches) {
      const token = raw.replace(/\s+/g, ' ').trim();
      const key = token.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      found.push(token);
      if (found.length >= max) return found;
    }
  }
  return found;
}

function resolveMajorCorridors(pack: CountyIntelligencePack): string {
  const explicit = pack.majorCorridors?.trim();
  if (explicit && !CORRIDOR_FIELD_BLOCKLIST.test(explicit)) {
    return explicit;
  }

  const corpus = [
    pack.heroOpener,
    pack.heroCredibility ?? '',
    ...pack.whatMakesDifferent.bullets.map((b) => `${b.title}. ${b.detail}`),
    ...(pack.specialized ?? []).flatMap((s) => [s.title, s.intro, ...s.bullets]),
  ].join(' ');

  const tokens = extractRoadCorridorTokens(corpus, 6);
  if (tokens.length >= 2) {
    return tokens.join(' · ');
  }

  // Never promote operational essay titles into the corridor field.
  return 'Local arterials — see zone guide below';
}

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

  const majorCorridors = resolveMajorCorridors(pack);

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
