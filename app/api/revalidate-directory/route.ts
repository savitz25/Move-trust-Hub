import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { COMPANIES_DIRECTORY_TAG } from '@/lib/directory/revalidate-company';
import { APPROVED_COUNTY_MOVERS_TAG } from '@/lib/local-movers/approved-county-movers-tag';

export const runtime = 'nodejs';

/** POST /api/revalidate-directory — bust directory cache after DB cleanup (requires secret). */
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

  revalidateTag(COMPANIES_DIRECTORY_TAG);
  revalidateTag(APPROVED_COUNTY_MOVERS_TAG);
  revalidatePath('/companies', 'page');
  revalidatePath('/companies', 'layout');
  revalidatePath('/compare', 'page');
  revalidatePath('/local-movers', 'layout');
  revalidatePath('/sitemap.xml');

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tags: [COMPANIES_DIRECTORY_TAG, APPROVED_COUNTY_MOVERS_TAG],
    paths: ['/companies', '/compare', '/local-movers', '/sitemap.xml'],
    at: new Date().toISOString(),
  });
}