import { NextResponse } from 'next/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import type { Company } from '@/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX = 4;

/**
 * Live company hydration for /compare — same source of truth as profiles
 * (getCompanyBySlugAsync / DB + unified catalog), not the static SSG list.
 *
 * GET /api/compare/companies?slugs=a,b,c
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('slugs') || searchParams.get('add') || '';
  const slugs = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, MAX);

  if (slugs.length === 0) {
    return NextResponse.json({ companies: [] as Company[] });
  }

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const company = await getCompanyBySlugAsync(slug);
        if (company && isPubliclyDisplayableCompany(company)) {
          return company;
        }
        return null;
      } catch (e) {
        console.error('[api/compare/companies]', slug, e);
        return null;
      }
    })
  );

  const companies = results.filter(Boolean) as Company[];

  return NextResponse.json(
    { companies },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
