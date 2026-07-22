import { NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import { directoryFiltersFromSearchParams } from '@/lib/directory/build-directory-api-query';
import {
  DIRECTORY_MAX_PAGE_LIMIT,
  DIRECTORY_PAGE_SIZE,
} from '@/lib/directory/page-size';
import { queryDirectoryPage } from '@/lib/directory/query-directory-page';
import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';

export const revalidate = 300;

function parseNonNegInt(raw: string | null, fallback: number): number {
  if (raw == null || raw === '') return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

/**
 * GET /api/directory/companies
 * Server-side filter/sort + offset/limit for progressive directory loading.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseNonNegInt(searchParams.get('offset'), 0);
  const limit = Math.min(
    Math.max(parseNonNegInt(searchParams.get('limit'), DIRECTORY_PAGE_SIZE), 1),
    DIRECTORY_MAX_PAGE_LIMIT
  );

  const record: Record<string, string | undefined> = {};
  searchParams.forEach((value, key) => {
    record[key] = value;
  });

  const filters = directoryFiltersFromSearchParams(record);

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
