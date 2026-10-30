/**
 * Ranking contract for the default public company listing.
 * Matches directory_query_page's reputation branch:
 * COALESCE(reputation_score, 0) DESC, id ASC.
 * Null scores sort with zero, then the id tie-breaker keeps pages stable.
 * The count is computed before LIMIT so an offset past the last row stays exact.
 */
import type { DirectoryFilterInput } from '@/lib/directory/filter-companies';

export const LISTING_HEAVY_JSON_COLUMNS = ['google_data', 'public_scrape_data'] as const;

export const VISIBLE_PUBLICATION_STATES = ['PUBLISHABLE', 'INDEXABLE', 'VERIFIED'] as const;

export type ListingRankRow = {
  id: string;
  reputationScore: number | null;
  publicationState?: string | null;
  serviceScope?: string | null;
};

/**
 * Columns the default listing page needs. Heavy JSON is intentionally absent.
 * `totals` is one row, so an empty page still returns the real count.
 */
export const PLAIN_REPUTATION_LISTING_SQL = `
WITH visible AS (
  SELECT c.id,
         COALESCE(c.reputation_score, 0) AS reputation_key
    FROM public.companies c
   WHERE (
           c.publication_state IS NULL
        OR c.publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
         )
     AND c.service_scope IS DISTINCT FROM 'intrastate'
),
totals AS (
  SELECT count(*)::bigint AS total_count
    FROM visible
),
paged AS (
  SELECT v.id::text AS company_id
    FROM visible v
   ORDER BY v.reputation_key DESC, v.id ASC
  OFFSET $1
   LIMIT $2
)
SELECT p.company_id,
       t.total_count
  FROM totals t
  LEFT JOIN paged p ON true
`.trim();

export type PlainListingProbe = {
  excludeLocal: boolean;
  usdot: string | null;
  mc: string | null;
  filters: DirectoryFilterInput;
};

const KNOWN_PLAIN_FILTER_KEYS = [
  'search',
  'sort',
  'minRating',
  'maxPrice',
  'services',
  'coverage',
  'coverageFilter',
  'bbbMin',
  'onlyFullService',
  'onlyVerified',
  'specialties',
  'scope',
  'state',
  'counties',
  'recordedHqState',
  'recordedHqCity',
] as const satisfies readonly (keyof DirectoryFilterInput)[];

function textIsBlank(value: unknown): boolean {
  return value == null || (typeof value === 'string' && value.trim() === '');
}

function listIsEmpty(value: unknown): boolean {
  return value == null || (Array.isArray(value) && value.length === 0);
}

function coverageFilterIsInactive(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value !== 'object') return false;
  const filter = value as {
    mode?: string;
    stateCode?: string | null;
    region?: string | null;
    countySlugs?: readonly string[] | null;
  };
  if (filter.mode !== 'any') return false;
  if (filter.stateCode?.trim()) return false;
  if (filter.region?.trim()) return false;
  return !filter.countySlugs?.length;
}

function scopeIsInactive(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value !== 'object') return false;
  const scope = value as {
    stateCode?: string;
    stateName?: string;
    countyLabel?: string;
    preferredMoverIds?: readonly string[];
    restrictToScope?: boolean;
  };
  if (scope.stateCode?.trim()) return false;
  if (scope.stateName?.trim()) return false;
  if (scope.countyLabel?.trim()) return false;
  if (scope.preferredMoverIds?.length) return false;
  return !scope.restrictToScope;
}

function plainFilterValueIsInactive(key: keyof DirectoryFilterInput, value: unknown): boolean {
  switch (key) {
    case 'search':
    case 'state':
    case 'bbbMin':
    case 'recordedHqState':
    case 'recordedHqCity':
      return textIsBlank(value);
    case 'sort':
      return textIsBlank(value) || value === 'reputation';
    case 'minRating':
      return (
        value == null ||
        (typeof value === 'number' && (!Number.isFinite(value) || value <= 0))
      );
    case 'maxPrice':
      return (
        value == null ||
        (typeof value === 'number' && (!Number.isFinite(value) || value >= 12000))
      );
    case 'services':
    case 'specialties':
    case 'counties':
      return listIsEmpty(value);
    case 'coverage':
      return textIsBlank(value) || value === 'Any';
    case 'onlyFullService':
    case 'onlyVerified':
      return value == null || value === false;
    case 'coverageFilter':
      return coverageFilterIsInactive(value);
    case 'scope':
      return scopeIsInactive(value);
    default:
      return false;
  }
}

/**
 * Narrow id query only when every DirectoryFilterInput value is inactive.
 * Service, specialty, scope, and any unknown key stay on directory_query_page.
 */
export function isPlainReputationListing(options: PlainListingProbe): boolean {
  if (!options.excludeLocal) return false;
  if (!textIsBlank(options.usdot) || !textIsBlank(options.mc)) return false;
  const filters = options.filters ?? {};
  for (const key of Object.keys(filters)) {
    if (!(KNOWN_PLAIN_FILTER_KEYS as readonly string[]).includes(key)) return false;
    if (!plainFilterValueIsInactive(key as keyof DirectoryFilterInput, filters[key as keyof DirectoryFilterInput])) {
      return false;
    }
  }
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

export type PlainListingSqlRow = {
  company_id: string | null;
  total_count: number | string | null;
};

/** Read the narrow SQL page. A null id is the empty-page carrier for total_count. */
export function readPlainListingPage(rows: readonly PlainListingSqlRow[]): {
  ids: string[];
  total: number;
} {
  if (!rows.length) return { ids: [], total: 0 };
  const total = Number(rows[0]?.total_count ?? 0);
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const id = row.company_id;
    if (!id || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return { ids, total: Number.isFinite(total) ? total : 0 };
}

/**
 * Put hydrated companies back into the ranked id order.
 * Duplicate fetches collapse. Ids that were not returned are omitted.
 * Companies outside the requested page are not appended.
 */
export function hydrateListingPage<T extends { id: string }>(
  ids: readonly string[],
  rows: readonly T[]
): T[] {
  const byId = new Map<string, T>();
  for (const row of rows) {
    if (!row.id || byId.has(row.id)) continue;
    byId.set(row.id, row);
  }
  const ordered: T[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    if (!id || seen.has(id)) continue;
    seen.add(id);
    const row = byId.get(id);
    if (row) ordered.push(row);
  }
  return ordered;
}
