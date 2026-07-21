import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';
import { getAllCountyParams } from '@/lib/local-movers/geography/index';
import { localStates } from '@/lib/local-movers/states';

export const runtime = 'nodejs';

/** POST /api/revalidate-local-movers — bust all county page caches after remediation deploy. */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'REVALIDATE_SECRET not configured' }, { status: 503 });
  }

  const auth = request.headers.get('authorization');
  const bearer = auth?.startsWith('Bearer ') ? auth.slice(7) : null;
  const querySecret = request.nextUrl.searchParams.get('secret');
  if (bearer !== secret && querySecret !== secret) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  // Data cache for approved local movers (unstable_cache tag).
  revalidateTag(APPROVED_COUNTY_MOVERS_TAG);

  revalidatePath('/local-movers', 'layout');
  revalidatePath('/local-movers', 'page');
  revalidatePath('/sitemap-local', 'layout');

  for (const state of localStates) {
    revalidatePath(`/local-movers/${state.slug}`, 'page');
    revalidatePath(`/local-movers/${state.slug}`, 'layout');
  }

  const countyPaths: string[] = [];
  for (const { stateSlug, countySlug } of getAllCountyParams()) {
    const path = `/local-movers/${stateSlug}/${countySlug}`;
    countyPaths.push(path);
    revalidatePath(path, 'page');
    revalidatePath(path, 'layout');
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tag: APPROVED_COUNTY_MOVERS_TAG,
    stateHubs: localStates.length,
    countyPages: countyPaths.length,
    at: new Date().toISOString(),
  });
}