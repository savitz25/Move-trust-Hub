import { NextResponse } from 'next/server';
import { getCompanyBySlugAsync } from '@/lib/data-server';
import { isAnonymousPublicProfileAllowed } from '@/lib/provider/publication';
import { isPubliclyDisplayableCompany } from '@/lib/trust/company-display-policy';
import {
  finalizeCompanyEnrichmentForDisplay,
  getBbbDisplaySafe,
  getGoogleDisplayMeta,
} from '@/lib/verification/company-display-enrichment';
import { resolveConfirmedPublicScrapeForCompany } from '@/lib/verification/display-enrichment';
import type { Company } from '@/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX = 8;

/**
 * Live company hydration for /compare — same source of truth as profiles
 * (getCompanyBySlugAsync / DB + unified catalog).
 *
 * GET /api/compare/companies?slugs=a,b,c
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('slugs') || searchParams.get('add') || '';
  const slugs = [
    ...new Set(
      raw
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, MAX)
    ),
  ];

  if (slugs.length === 0) {
    return NextResponse.json({ companies: [] as Company[] });
  }

  const results = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const company = await getCompanyBySlugAsync(slug);
        if (
          company &&
          isAnonymousPublicProfileAllowed(company) &&
          isPubliclyDisplayableCompany(company)
        ) {
          const finalized = finalizeCompanyEnrichmentForDisplay(company);
          const google = getGoogleDisplayMeta(finalized);
          const bbb = getBbbDisplaySafe(finalized);
          const confirmedScrape = resolveConfirmedPublicScrapeForCompany(finalized);
          // Strip huge county arrays from compare payload (profile has full row)
          const { coverageCounties: _c, ...rest } = finalized;
          return {
            ...rest,
            googleData: finalized.googleData ?? null,
            publicScrapeData: confirmedScrape,
            googleSummary: {
              status: google.available ? 'ok' : google.status ?? null,
              rating: google.rating,
              reviewCount: google.reviewCount,
              placeId: google.placeId,
              hasSnapshot: google.available,
              derivedFromColumns: google.derivedFromColumns,
              mapsUrl: google.mapsUrl,
            },
            bbbConfirmed: bbb.confirmed,
          } as Company & Record<string, unknown>;
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
