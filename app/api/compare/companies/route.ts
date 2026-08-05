import { NextResponse } from 'next/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import { hasBbbPublicScrapeData } from '@/lib/verification/bbb-public-display';
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX = 4;

/** Compact Google summary for compare table (always present key). */
export type CompareGoogleSummary = {
  status: string | null;
  rating: number | null;
  reviewCount: number | null;
  placeId: string | null;
  hasSnapshot: boolean;
};

function googleSummary(company: Company): CompareGoogleSummary {
  const g = company.googleData as GooglePlacesData | null | undefined;
  const ok =
    g?.status === 'ok' &&
    ((g.rating != null && g.rating > 0) ||
      (g.review_count != null && g.review_count > 0));
  return {
    status: g?.status ?? null,
    rating: ok ? g!.rating ?? null : g?.rating ?? null,
    reviewCount: ok ? g!.review_count ?? null : g?.review_count ?? null,
    placeId: g?.place_id ?? null,
    hasSnapshot: Boolean(ok),
  };
}

/**
 * Live company hydration for /compare — same source of truth as profiles
 * (getCompanyBySlugAsync / DB + unified catalog).
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
          // Ensure enrichment keys are always serialized (even when null)
          return {
            ...company,
            googleData: company.googleData ?? null,
            publicScrapeData: company.publicScrapeData ?? null,
            googleSummary: googleSummary(company),
            bbbConfirmed: hasBbbPublicScrapeData(company.publicScrapeData),
          };
        }
        return null;
      } catch (e) {
        console.error('[api/compare/companies]', slug, e);
        return null;
      }
    })
  );

  const companies = results.filter(Boolean);

  return NextResponse.json(
    { companies },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    }
  );
}
