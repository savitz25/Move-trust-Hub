import { NextRequest, NextResponse } from 'next/server';
import {
  estimateDrivingMiles,
  haversineMiles,
} from '@/lib/auto-transport/distance';
import { isValidUsZip, lookupUsZip } from '@/lib/geo/lookup-us-zip';
import { buildHomeRouteResult } from '@/lib/home/resolve-route-from-zip';

export const runtime = 'nodejs';
export const revalidate = 300;

/**
 * GET /api/home-route?from=33101&to=78701
 * Resolves route places, local movers path, calculator link, and top movers.
 */
export async function GET(req: NextRequest) {
  const fromZip = req.nextUrl.searchParams.get('from')?.trim() ?? '';
  const toZip = req.nextUrl.searchParams.get('to')?.trim() ?? '';

  if (!isValidUsZip(fromZip)) {
    return NextResponse.json(
      { error: 'Enter a valid 5-digit pickup ZIP.' },
      { status: 400 }
    );
  }

  if (toZip && !isValidUsZip(toZip)) {
    return NextResponse.json(
      { error: 'Enter a valid 5-digit delivery ZIP.' },
      { status: 400 }
    );
  }

  try {
    const from = await lookupUsZip(fromZip);
    if (!from) {
      return NextResponse.json(
        { error: `Pickup ZIP ${fromZip} not found.` },
        { status: 404 }
      );
    }

    let to = null;
    if (toZip) {
      to = await lookupUsZip(toZip);
      if (!to) {
        return NextResponse.json(
          { error: `Delivery ZIP ${toZip} not found.` },
          { status: 404 }
        );
      }
    }

    const route = await buildHomeRouteResult(from, to);

    let drivingMiles: number | null = null;
    if (to) {
      const straight = haversineMiles(
        { lat: from.lat, lng: from.lng },
        { lat: to.lat, lng: to.lng }
      );
      drivingMiles = estimateDrivingMiles(Math.round(straight));
    }

    return NextResponse.json(
      {
        ...route,
        drivingMiles,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      }
    );
  } catch {
    return NextResponse.json({ error: 'Could not resolve route.' }, { status: 502 });
  }
}
