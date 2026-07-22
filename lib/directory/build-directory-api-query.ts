import type {
  DirectoryCoverageFilter,
  DirectoryFilters,
  ServiceType,
  SortOption,
} from '@/types';
import type { DirectoryFilterInput } from '@/lib/directory/filter-companies';
import { DIRECTORY_PAGE_SIZE } from '@/lib/directory/page-size';
import { normalizeCoverageFilter } from '@/lib/directory/coverage-filter';

const SORT_OPTIONS = new Set<SortOption>([
  'reputation',
  'rating',
  'reviews',
  'price-low',
  'price-high',
  'years',
  'complaints',
]);

function firstParam(
  value: string | string[] | undefined
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parseCoverageFilterFromParams(
  searchParams: Record<string, string | string[] | undefined>
): DirectoryCoverageFilter {
  const modeRaw = firstParam(searchParams.coverageMode);
  if (
    modeRaw === 'national' ||
    modeRaw === 'regional' ||
    modeRaw === 'state' ||
    modeRaw === 'any'
  ) {
    const countiesRaw = firstParam(searchParams.coverageCounties) || '';
    return {
      mode: modeRaw,
      region: (firstParam(searchParams.coverageRegion) as DirectoryCoverageFilter['region']) || null,
      stateCode: firstParam(searchParams.coverageState) || null,
      countySlugs: countiesRaw
        ? countiesRaw.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    };
  }
  return normalizeCoverageFilter({
    coverage: (firstParam(searchParams.coverage) as DirectoryFilters['coverage']) || 'Any',
  });
}

/** Parse directory filters from Next.js `searchParams` (SSR). */
export function directoryFiltersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): DirectoryFilterInput {
  const sortRaw = firstParam(searchParams.sort);
  const sort: SortOption =
    sortRaw && SORT_OPTIONS.has(sortRaw as SortOption)
      ? (sortRaw as SortOption)
      : 'reputation';

  const servicesRaw = firstParam(searchParams.services);
  const services = servicesRaw
    ? (servicesRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean) as ServiceType[])
    : [];

  const maxPriceRaw = Number(firstParam(searchParams.maxPrice));
  const minRatingRaw = Number(firstParam(searchParams.minRating));
  const coverageFilter = parseCoverageFilterFromParams(searchParams);

  return {
    search: firstParam(searchParams.search)?.trim() ?? '',
    sort,
    minRating: Number.isFinite(minRatingRaw) ? minRatingRaw : 0,
    maxPrice: Number.isFinite(maxPriceRaw) && maxPriceRaw > 0 ? maxPriceRaw : 12000,
    coverage:
      (firstParam(searchParams.coverage) as DirectoryFilters['coverage']) || 'Any',
    coverageFilter,
    onlyFullService:
      firstParam(searchParams.full) === 'true' ||
      firstParam(searchParams.full) === '1',
    onlyVerified:
      firstParam(searchParams.verified) === 'true' ||
      firstParam(searchParams.verified) === '1',
    bbbMin: firstParam(searchParams.bbbMin) || undefined,
    services,
  };
}

function appendCoverageParams(
  params: URLSearchParams,
  filters: Partial<DirectoryFilters>
) {
  const cf = normalizeCoverageFilter(filters);
  if (cf.mode === 'any') return;

  params.set('coverageMode', cf.mode);
  if (cf.mode === 'regional' && cf.region) {
    params.set('coverageRegion', cf.region);
    // legacy
    params.set('coverage', cf.region);
  }
  if (cf.mode === 'national') {
    params.set('coverage', 'National');
  }
  if (cf.mode === 'state' && cf.stateCode) {
    params.set('coverageState', cf.stateCode.toUpperCase());
    if (cf.countySlugs?.length) {
      params.set('coverageCounties', cf.countySlugs.join(','));
    }
  }
}

/** Build query string for GET /api/directory/companies */
export function buildDirectoryApiQuery(options: {
  offset: number;
  limit: number;
  filters: Partial<DirectoryFilters>;
  search: string;
  services: ServiceType[];
}): string {
  const params = new URLSearchParams();
  params.set('offset', String(options.offset));
  params.set('limit', String(options.limit ?? DIRECTORY_PAGE_SIZE));

  const { filters, search, services } = options;
  if (search.trim()) params.set('search', search.trim());
  if (filters.sort && filters.sort !== 'reputation') params.set('sort', filters.sort);
  if (filters.minRating && filters.minRating > 0) {
    params.set('minRating', String(filters.minRating));
  }
  if (filters.maxPrice && filters.maxPrice < 12000) {
    params.set('maxPrice', String(filters.maxPrice));
  }
  appendCoverageParams(params, filters);
  if (filters.onlyFullService) params.set('full', 'true');
  if (filters.onlyVerified) params.set('verified', 'true');
  if (filters.bbbMin) params.set('bbbMin', filters.bbbMin);
  if (services.length > 0) params.set('services', services.join(','));

  return params.toString();
}
