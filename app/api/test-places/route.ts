import { NextRequest, NextResponse } from 'next/server';
import {
  fetchGooglePlacesData,
  isGooglePlacesConfigured,
} from '@/lib/verification/google-places';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DEFAULT_QUERY = 'Two Men and a Truck moving company';

function verifyTestAuth(request: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret) return false;

  const headerSecret = request.headers.get('x-admin-secret')?.trim();
  const bearer = request.headers.get('authorization');
  const bearerSecret =
    bearer?.startsWith('Bearer ') ? bearer.slice(7).trim() : null;
  const querySecret = request.nextUrl.searchParams.get('secret')?.trim();

  return (
    headerSecret === adminSecret ||
    bearerSecret === adminSecret ||
    querySecret === adminSecret
  );
}

/**
 * Smoke-test Google Places API (New) from the Vercel server runtime.
 *
 * GET /api/test-places?secret=ADMIN_SECRET
 * GET /api/test-places?secret=ADMIN_SECRET&q=Allied+Van+Lines+moving+company
 */
export async function GET(request: NextRequest) {
  if (!verifyTestAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const configured = isGooglePlacesConfigured();
  const query =
    request.nextUrl.searchParams.get('q')?.trim() || DEFAULT_QUERY;

  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        error: 'GOOGLE_PLACES_API_KEY is not set on this deployment',
        query,
      },
      { status: 503 }
    );
  }

  const result = await fetchGooglePlacesData({
    legalName: query.replace(/\s+moving company$/i, '').trim() || query,
    headquarters: null,
  });

  const refererBlocked = result.error?.includes('API_KEY_HTTP_REFERRER_BLOCKED');

  return NextResponse.json({
    ok: result.status === 'ok',
    configured: true,
    query,
    status: result.status,
    refererBlocked,
    place: result.status === 'ok'
      ? {
          id: result.place_id,
          name: result.name,
          rating: result.rating,
          reviewCount: result.review_count,
          formattedAddress: result.formatted_address,
          snippetCount: result.review_snippets.length,
        }
      : null,
    error: result.error ?? null,
    checkedAt: result.last_fetched,
  });
}