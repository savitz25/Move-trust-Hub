/**
 * Enrichment for California "Moving To" city hubs:
 * up to 9 cards — core-county locals first, nearby-county locals, then state carriers.
 */
import type { MarketMoverEntry } from '@/lib/destinations/get-movers-for-market';
import type { Market } from '@/lib/destinations/types';
import type { LocalMover } from '@/lib/local-movers/types';
import type { Company } from '@/types';

/** Destination hubs that use the 9-card local-first enrichment layout. */
export const CA_ENRICHED_HUB_SLUGS = new Set([
  'riverside-san-bernardino-ca',
  'bakersfield-ca',
  'fresno-ca',
  'stockton-ca',
  'modesto-ca',
  'san-diego-ca',
  'ventura-oxnard-ca',
  'palmdale-lancaster-ca',
  'redding-ca',
  'sacramento-ca',
]);

export const CA_HUB_MOVER_CARD_LIMIT = 9;
/** Prefer ~3 statewide/interstate carriers in the mix when available. */
export const CA_HUB_STATE_CARRIER_SLOTS = 3;

export function isCaEnrichedHub(marketSlug: string): boolean {
  return CA_ENRICHED_HUB_SLUGS.has(marketSlug);
}

function countyKeyFromEntry(entry: MarketMoverEntry): string {
  return `${entry.countySlug}-${entry.stateCode.toLowerCase()}`;
}

function isPrimaryCountyEntry(entry: MarketMoverEntry, market: Market): boolean {
  const key = countyKeyFromEntry(entry);
  return market.primaryCounties.some((k) => k.toLowerCase() === key);
}

function isLocalMoverEntry(entry: MarketMoverEntry): boolean {
  return Boolean(entry.mover.isLocalOnly);
}

/** Convert a directory Company into a LocalMover for hub card display. */
export function companyToHubLocalMover(company: Company): LocalMover {
  const city =
    company.headquarters?.split(',')[0]?.trim() || company.headquarters || '';
  const isLocalOnly =
    company.serviceScope === 'intrastate' ||
    (!company.usdotNumber && company.serviceScope !== 'interstate');

  return {
    id: `directory-${company.slug}`,
    name: company.name,
    profileSlug: company.slug,
    rating: company.overallRating || 0,
    reviewCount: company.reviewCount || 0,
    shortDescription: company.shortDescription || '',
    services: Array.isArray(company.services)
      ? company.services.map(String)
      : ['Long Distance'],
    specialties: Array.isArray(company.specialties)
      ? company.specialties.map(String)
      : [],
    usdotNumber: company.usdotNumber || undefined,
    mcNumber: company.mcNumber || undefined,
    fmcsaSafetyRating: company.fmcsaSafetyRating || 'Not Rated',
    bbbRating: company.bbbRating || undefined,
    city,
    listingSource: 'directory',
    isLocalOnly,
    entityType: company.entityType ?? null,
    lastUpdated: company.lastUpdated || undefined,
  };
}

export function companyToStateCarrierEntry(
  company: Company,
  market: Market
): MarketMoverEntry {
  const primary = market.primaryCounties[0] ?? '';
  const parts = primary.split('-');
  const stateCode = (parts.pop() ?? market.stateCode).toUpperCase();
  const countySlug = parts.join('-') || market.slug.replace(/-ca$/, '');
  const countyLabel =
    countySlug
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ') + ' County';

  return {
    mover: companyToHubLocalMover(company),
    countyLabel,
    stateCode,
    stateSlug: market.stateName.toLowerCase().replace(/\s+/g, '-'),
    countySlug,
  };
}

/**
 * Build a max-9 list:
 * 1) Local (intrastate) movers from primary/core counties
 * 2) Local movers from nearby/adjacent counties
 * 3) Strong state-level / interstate carriers (featured + non-local catalog)
 */
export function selectEnrichedCaHubMovers(params: {
  market: Market;
  countyEntries: MarketMoverEntry[];
  stateCarrierEntries: MarketMoverEntry[];
  limit?: number;
  stateCarrierSlots?: number;
}): MarketMoverEntry[] {
  const limit = params.limit ?? CA_HUB_MOVER_CARD_LIMIT;
  const stateSlots = params.stateCarrierSlots ?? CA_HUB_STATE_CARRIER_SLOTS;
  const localSlots = Math.max(0, limit - stateSlots);

  const seen = new Set<string>();
  const out: MarketMoverEntry[] = [];

  const push = (entry: MarketMoverEntry): boolean => {
    const key = entry.mover.profileSlug || entry.mover.id;
    if (seen.has(key)) return false;
    seen.add(key);
    out.push(entry);
    return true;
  };

  const primaryLocal = params.countyEntries.filter(
    (e) => isLocalMoverEntry(e) && isPrimaryCountyEntry(e, params.market)
  );
  const nearbyLocal = params.countyEntries.filter(
    (e) => isLocalMoverEntry(e) && !isPrimaryCountyEntry(e, params.market)
  );
  const countyNonLocal = params.countyEntries.filter((e) => !isLocalMoverEntry(e));

  // Prefer higher-rated locals when ordering within a bucket
  const byRating = (a: MarketMoverEntry, b: MarketMoverEntry) =>
    b.mover.rating - a.mover.rating || b.mover.reviewCount - a.mover.reviewCount;

  primaryLocal.sort(byRating);
  nearbyLocal.sort(byRating);
  countyNonLocal.sort(byRating);

  let localCount = 0;
  for (const entry of primaryLocal) {
    if (localCount >= localSlots || out.length >= limit) break;
    if (push(entry)) localCount += 1;
  }
  for (const entry of nearbyLocal) {
    if (localCount >= localSlots || out.length >= limit) break;
    if (push(entry)) localCount += 1;
  }

  let stateCount = 0;
  for (const entry of params.stateCarrierEntries) {
    if (stateCount >= stateSlots || out.length >= limit) break;
    if (push(entry)) stateCount += 1;
  }
  for (const entry of countyNonLocal) {
    if (stateCount >= stateSlots || out.length >= limit) break;
    if (push(entry)) stateCount += 1;
  }

  // Fill remaining slots with leftover locals, then remaining non-locals
  if (out.length < limit) {
    for (const entry of [...primaryLocal, ...nearbyLocal]) {
      if (out.length >= limit) break;
      push(entry);
    }
  }
  if (out.length < limit) {
    for (const entry of countyNonLocal) {
      if (out.length >= limit) break;
      push(entry);
    }
  }
  if (out.length < limit) {
    for (const entry of params.stateCarrierEntries) {
      if (out.length >= limit) break;
      push(entry);
    }
  }

  return out.slice(0, limit);
}
