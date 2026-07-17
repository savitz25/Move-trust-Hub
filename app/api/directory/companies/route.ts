import { NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import {
  DIRECTORY_MAX_PAGE_LIMIT,
  DIRECTORY_PAGE_SIZE,
} from '@/lib/directory/page-size';
import { queryDirectoryPage } from '@/lib/directory/query-directory-page';
import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';
import type { DirectoryFilters, ServiceType, SortOption } from '@/types';

export const revalidate = 300;

function parseNonNegInt(raw: string | null, fallback: number): number {
  if (raw == null || raw === '') return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/**
 * GET /api/directory/companies
 * Server-side filter/sort + offset/limit for progressive directory loading.
 * Paginate with offset until hasMore is false — no total browse ceiling.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseNonNegInt(searchParams.get('offset'), 0);
  const limit = Math.min(
    Math.max(parseNonNegInt(searchParams.get('limit'), DIRECTORY_PAGE_SIZE), 1),
    DIRECTORY_MAX_PAGE_LIMIT
  );

  const servicesRaw = searchParams.get('services');
  const services = servicesRaw
    ? (servicesRaw.split(',').map((s) => s.trim()).filter(Boolean) as ServiceType[])
    : [];

  const maxPriceRaw = parseNonNegInt(searchParams.get('maxPrice'), 12000);
  const filters: DirectoryFilterInputFromQuery = {
    search: searchParams.get('search') ?? '',
    sort: (searchParams.get('sort') as SortOption) || 'reputation',
    minRating: Number(searchParams.get('minRating')) || 0,
    maxPrice: maxPriceRaw || 12000,
    coverage:
      (searchParams.get('coverage') as DirectoryFilters['coverage']) || 'Any',
    onlyFullService: searchParams.get('full') === 'true',
    onlyVerified: searchParams.get('verified') === 'true',
    bbbMin: searchParams.get('bbbMin') || undefined,
    services,
  };

  const [page, flags] = await Promise.all([
    queryDirectoryPage({ offset, limit, filters }),
    getPerformanceFlags(),
  ]);

  return NextResponse.json(page, {
    headers: {
      'Cache-Control': apiCacheControl(Math.min(flags.apiCacheSeconds, 300)),
    },
  });
}

type DirectoryFilterInputFromQuery = Partial<DirectoryFilters> & {
  search?: string;
  services?: ServiceType[];
};
