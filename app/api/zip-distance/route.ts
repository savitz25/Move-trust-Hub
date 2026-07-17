import { NextRequest, NextResponse } from 'next/server';
import {
  estimateDrivingMiles,
  haversineMiles,
  isValidUsZip,
} from '@/lib/auto-transport/distance';
import { lookupUsZip } from '@/lib/geo/lookup-us-zip';
import type { ZipDistanceResult } from '@/lib/auto-transport/types';

export async function GET(req: NextRequest) {
  const fromZip = req.nextUrl.searchParams.get('from')?.trim() ?? '';
  const toZip = req.nextUrl.searchParams.get('to')?.trim() ?? '';

  if (!isValidUsZip(fromZip) || !isValidUsZip(toZip)) {
    return NextResponse.json(
      { error: 'Both from and to must be valid 5-digit ZIP codes.' },
      { status: 400 }
    );
  }

  if (fromZip === toZip) {
    return NextResponse.json(
      { error: 'Pickup and delivery ZIP codes must be different.' },
      { status: 400 }
    );
  }

  try {
    const [from, to] = await Promise.all([lookupUsZip(fromZip), lookupUsZip(toZip)]);
    if (!from || !to) {
      return NextResponse.json(
        { error: 'One or both ZIP codes could not be found.' },
        { status: 404 }
      );
    }
    const straightLineMiles = Math.round(
      haversineMiles({ lat: from.lat, lng: from.lng }, { lat: to.lat, lng: to.lng })
    );
    const drivingMiles = estimateDrivingMiles(straightLineMiles);

    const payload: ZipDistanceResult = {
      fromZip,
      toZip,
      straightLineMiles,
      drivingMiles,
      fromCity: from.city,
      fromState: from.stateCode,
      toCity: to.city,
      toState: to.stateCode,
    };

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Distance lookup failed';
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export const runtime = 'nodejs';