import { NextResponse } from 'next/server';
import { lookupNmlsForOnboarding } from '@/lib/lender/onboarding/nmls-lookup';
import { enrichLenderSources } from '@/lib/lender/onboarding/enrich-lender';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nmlsId = searchParams.get('nmlsId')?.trim();
  const zip = searchParams.get('zip')?.trim();

  if (!nmlsId) {
    return NextResponse.json({ success: false, error: 'nmlsId required' }, { status: 400 });
  }

  const lookup = await lookupNmlsForOnboarding(nmlsId);
  if (!lookup.success || !lookup.preview) {
    return NextResponse.json(lookup, { status: 404 });
  }

  const enriched = await enrichLenderSources(lookup.preview, zip);
  return NextResponse.json({ success: true, preview: enriched });
}