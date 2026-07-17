import { NextResponse } from 'next/server';
import { apiCacheControl } from '@/lib/cache/control';
import { prepareCompaniesForDirectoryClient } from '@/lib/directory/directory-client-payload';
import { getPerformanceFlags } from '@/lib/edge-config/get-performance-flags';
import { getAllCompanies } from '@/lib/data-server';

export const revalidate = 3600;

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

function parseNonNegInt(raw: string | null, fallback: number): number {
  if (raw == null || raw === '') return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * GET /api/companies
 * Query:
 *   limit   — page size (default 50, max 200)
 *   offset  — skip N (default 0)
 *   fields  — "full" | "directory" (lean client payload)
 *
 * Unbounded full dump removed to reduce scrape/DoS payload (~500KB+).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = clamp(parseNonNegInt(searchParams.get('limit'), DEFAULT_LIMIT), 1, MAX_LIMIT);
  const offset = parseNonNegInt(searchParams.get('offset'), 0);
  const fields = searchParams.get('fields') === 'directory' ? 'directory' : 'full';

  const [all, flags] = await Promise.all([getAllCompanies(), getPerformanceFlags()]);

  const page = all.slice(offset, offset + limit);
  const companies =
    fields === 'directory' ? prepareCompaniesForDirectoryClient(page) : page;

  return NextResponse.json(
    {
      companies,
      count: companies.length,
      total: all.length,
      limit,
      offset,
      fields,
      hasMore: offset + companies.length < all.length,
    },
    {
      headers: {
        'Cache-Control': apiCacheControl(flags.apiCacheSeconds),
      },
    }
  );
}
