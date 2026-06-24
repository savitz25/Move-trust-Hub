import { NextRequest, NextResponse } from 'next/server';
import {
  estimateDrivingMiles,
  haversineMiles,
  isValidUsZip,
} from '@/lib/auto-transport/distance';
import type { ZipDistanceResult } from '@/lib/auto-transport/types';

type ZippopotamResponse = {
  places?: Array<{
    latitude: string;
    longitude: string;
    'place name'?: string;
    'state abbreviation'?: string;
  }>;
};

const zipCache = new Map<
  string,
  { lat: number; lng: number; city?: string; state?: string }
>();

async function lookupZip(zip: string) {
  const cached = zipCache.get(zip);
  if (cached) return cached;

  const response = await fetch(`https://api.zippopotam.us/us/${zip}`, {
    next: { revalidate: 60 * 60 * 24 * 30 },
  });

  if (!response.ok) {
    throw new Error(`ZIP ${zip} not found`);
  }

  const data = (await response.json()) as ZippopotamResponse;
  const place = data.places?.[0];

  if (!place?.latitude || !place.longitude) {
    throw new Error(`ZIP ${zip} has no coordinates`);
  }

  const result = {
    lat: Number(place.latitude),
    lng: Number(place.longitude),
    city: place['place name'],
    state: place['state abbreviation'],
  };

  zipCache.set(zip, result);
  return result;
}

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
    const [from, to] = await Promise.all([lookupZip(fromZip), lookupZip(toZip)]);
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
      fromState: from.state,
      toCity: to.city,
      toState: to.state,
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