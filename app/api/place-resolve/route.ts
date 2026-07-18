import { NextRequest, NextResponse } from 'next/server';
import { isValidUsZip, lookupUsZip } from '@/lib/geo/lookup-us-zip';
import { resolveCityToCounty } from '@/lib/geo/resolve-city-to-county';
import {
  resolveLocalMoversHref,
  appendZipQuery,
} from '@/lib/home/resolve-local-movers-href';
import { resolveCountyFromCoords } from '@/lib/geo/resolve-county-from-coords';

export const runtime = 'nodejs';
export const revalidate = 300;

/**
 * GET /api/place-resolve?city=Boca+Raton&state=FL
 * GET /api/place-resolve?zip=33433
 * Resolves to county movers page after City+State confirmation (or ZIP).
 */
export async function GET(req: NextRequest) {
  const zipRaw = req.nextUrl.searchParams.get('zip')?.trim() ?? '';
  const city = req.nextUrl.searchParams.get('city')?.trim() ?? '';
  const state = req.nextUrl.searchParams.get('state')?.trim() ?? '';

  try {
    if (zipRaw) {
      if (!isValidUsZip(zipRaw)) {
        return NextResponse.json(
          { error: 'Enter a valid 5-digit ZIP.' },
          { status: 400 }
        );
      }
      const place = await lookupUsZip(zipRaw);
      if (!place) {
        return NextResponse.json(
          { error: `ZIP ${zipRaw} not found.` },
          { status: 404 }
        );
      }
      let census = null;
      try {
        census = await resolveCountyFromCoords(place.lat, place.lng);
      } catch {
        census = null;
      }
      const local = resolveLocalMoversHref(place, census);
      return NextResponse.json(
        {
          city: place.city,
          stateCode: place.stateCode,
          stateSlug: place.stateSlug,
          stateName: place.stateName,
          label: `${place.city}, ${place.stateCode}`,
          countySlug: local.county?.slug ?? null,
          countyName: local.county?.name ?? null,
          moversHref: appendZipQuery(local.href, place.zip),
          zip: place.zip,
          lat: place.lat,
          lng: place.lng,
          method: local.method,
        },
        {
          headers: {
            'Cache-Control':
              'public, s-maxage=300, stale-while-revalidate=3600',
          },
        }
      );
    }

    if (!city || !state) {
      return NextResponse.json(
        { error: 'Provide city and state, or a ZIP code.' },
        { status: 400 }
      );
    }

    const resolved = await resolveCityToCounty(city, state);
    if (!resolved) {
      return NextResponse.json(
        { error: 'Could not resolve that city and state.' },
        { status: 404 }
      );
    }

    return NextResponse.json(resolved, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Could not resolve place.' },
      { status: 502 }
    );
  }
}
