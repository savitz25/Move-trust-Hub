import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get('zip');

  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Please enter a valid 5-digit ZIP code' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`, {
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'ZIP code not found' }, { status: 404 });
    }

    const data = await res.json();
    const place = data.places?.[0];

    if (!place) {
      return NextResponse.json({ error: 'No location data available' }, { status: 404 });
    }

    return NextResponse.json({
      city: place['place name'],
      state: place['state abbreviation'],
    });
  } catch (error) {
    console.error('ZIP lookup error:', error);
    return NextResponse.json({ error: 'Unable to lookup ZIP code at this time' }, { status: 500 });
  }
}
