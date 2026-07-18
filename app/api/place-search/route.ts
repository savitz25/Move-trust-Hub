import { NextRequest, NextResponse } from 'next/server';
import {
  isHighConfidencePlaceMatch,
  searchUsPlaces,
} from '@/lib/geo/search-us-places';

export const runtime = 'nodejs';
export const revalidate = 3600;

/**
 * GET /api/place-search?q=boca+raton
 * Returns City, State candidates for confirmation.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? '';
  if (q.length < 2) {
    return NextResponse.json({ query: q, results: [], highConfidence: false });
  }

  // Pure ZIP → not handled here (use zip-lookup)
  if (/^\d{3,5}$/.test(q)) {
    return NextResponse.json({
      query: q,
      results: [],
      highConfidence: false,
      isZip: true,
    });
  }

  try {
    const results = searchUsPlaces(q, { limit: 8 });
    return NextResponse.json(
      {
        query: q,
        results,
        highConfidence: isHighConfidencePlaceMatch(results),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Could not search places.', query: q, results: [] },
      { status: 502 }
    );
  }
}
