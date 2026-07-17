import { NextRequest, NextResponse } from 'next/server';
import { isValidUsZip, lookupUsZip } from '@/lib/geo/lookup-us-zip';

export const runtime = 'nodejs';

/**
 * GET /api/zip-lookup?zip=33101
 * Real-time city/state suggestion for homepage From/To ZIP inputs.
 */
export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim() ?? '';

  if (!isValidUsZip(zip)) {
    return NextResponse.json(
      { error: 'Enter a valid 5-digit US ZIP code.' },
      { status: 400 }
    );
  }

  try {
    const place = await lookupUsZip(zip);
    if (!place) {
      return NextResponse.json({ error: `ZIP ${zip} not found.` }, { status: 404 });
    }

    return NextResponse.json(
      {
        zip: place.zip,
        city: place.city,
        state: place.stateCode,
        stateName: place.stateName,
        stateSlug: place.stateSlug,
        label: `${place.city}, ${place.stateCode}`,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      }
    );
  } catch {
    return NextResponse.json({ error: 'ZIP lookup failed.' }, { status: 502 });
  }
}
