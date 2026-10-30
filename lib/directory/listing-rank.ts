/**
 * Ranking contract for the default public company listing.
 * Matches directory_query_page's reputation branch:
 * COALESCE(reputation_score, 0) DESC, id ASC.
 * Null scores sort with zero, then the id tie-breaker keeps pages stable.
 */

export const LISTING_HEAVY_JSON_COLUMNS = ['google_data', 'public_scrape_data'] as const;

export const VISIBLE_PUBLICATION_STATES = ['PUBLISHABLE', 'INDEXABLE', 'VERIFIED'] as const;

export type ListingRankRow = {
  id: string;
  reputationScore: number | null;
  publicationState?: string | null;
  serviceScope?: string | null;
};

/** Columns the default listing page needs. Heavy JSON is intentionally absent. */
export const PLAIN_REPUTATION_LISTING_SQL = `
SELECT c.id::text AS company_id,
       count(*) OVER ()::bigint AS total_count
  FROM public.companies c
 WHERE (
         c.publication_state IS NULL
      OR c.publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
       )
   AND c.service_scope IS DISTINCT FROM 'intrastate'
 ORDER BY COALESCE(c.reputation_score, 0) DESC, c.id ASC
OFFSET $1
 LIMIT $2
`.trim();

const ROLE_FILTERS = new Set(['Carrier', 'Broker', 'Carrier / Broker', 'Local Mover']);

export type PlainListingProbe = {
  excludeLocal: boolean;
  usdot: string | null;
  mc: string | null;
  filters: {
    sort?: string | null;
    search?: string | null;
    state?: string | null;
    bbbMin?: string | null;
    minRating?: number | null;
    maxPrice?: number | null;
    onlyFullService?: boolean | null;
    onlyVerified?: boolean | null;
    services?: readonly string[] | null;
    counties?: readonly string[] | null;
    recordedHqState?: string | null;
    recordedHqCity?: string | null;
  };
};

/** Default /companies browse: reputation order, no extra predicate the RPC still owns. */
export function isPlainReputationListing(options: PlainListingProbe): boolean {
  const { filters, excludeLocal, usdot, mc } = options;
  const sort = filters.sort || 'reputation';
  if (sort !== 'reputation') return false;
  if (!excludeLocal) return false;
  if (usdot || mc) return false;
  if (filters.search?.trim()) return false;
  if (filters.state?.trim()) return false;
  if (filters.bbbMin) return false;
  if (filters.minRating && filters.minRating > 0) return false;
  if (filters.maxPrice && filters.maxPrice < 12000) return false;
  if (filters.onlyFullService || filters.onlyVerified) return false;
  if (filters.counties?.length) return false;
  if (filters.recordedHqState || filters.recordedHqCity) return false;
  if (filters.services?.some((service) => ROLE_FILTERS.has(service))) return false;
  return true;
}

export function listingSqlOmitsHeavyJson(sql: string): boolean {
  const normalized = sql.toLowerCase();
  return LISTING_HEAVY_JSON_COLUMNS.every((column) => !normalized.includes(column));
}

export function isListingVisible(publicationState: string | null | undefined): boolean {
  if (publicationState == null || publicationState.trim() === '') return true;
  return (VISIBLE_PUBLICATION_STATES as readonly string[]).includes(publicationState);
}

/** Same predicate as `service_scope IS DISTINCT FROM 'intrastate'`. */
export function isDefaultListingScope(serviceScope: string | null | undefined): boolean {
  return serviceScope !== 'intrastate';
}

export function reputationSortKey(score: number | null | undefined): number {
  if (score == null || Number.isNaN(Number(score))) return 0;
  return Number(score);
}

export function compareReputationListing(
  a: Pick<ListingRankRow, 'id' | 'reputationScore'>,
  b: Pick<ListingRankRow, 'id' | 'reputationScore'>
): number {
  const byScore = reputationSortKey(b.reputationScore) - reputationSortKey(a.reputationScore);
  if (byScore !== 0) return byScore;
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

export function pageReputationListing<T extends ListingRankRow>(
  rows: readonly T[],
  offset: number,
  limit: number,
  predicate: (row: T) => boolean = (row) =>
    isListingVisible(row.publicationState) && isDefaultListingScope(row.serviceScope)
): { ids: string[]; total: number; hasMore: boolean } {
  const start = Math.max(offset, 0);
  const size = Math.max(limit, 0);
  const ranked = rows.filter(predicate).slice().sort(compareReputationListing);
  const ids = ranked.slice(start, start + size).map((row) => row.id);
  return {
    ids,
    total: ranked.length,
    hasMore: start + ids.length < ranked.length,
  };
}
