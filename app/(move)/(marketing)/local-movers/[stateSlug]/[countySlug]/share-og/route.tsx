import { NextResponse } from 'next/server';
import { renderMoveFallbackImage, renderMoveShareImage } from '@/lib/og/move-share-card';
import { moveCountyShareModel } from '@/lib/seo/share-card-model';
import { getCounty } from '@/lib/local-movers/geography/index';
import { getLocalState } from '@/lib/local-movers/states';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ stateSlug: string; countySlug: string }> },
) {
  try {
    const { stateSlug, countySlug } = await context.params;
    const state = getLocalState(stateSlug);
    const county = getCounty(stateSlug, countySlug);
    if (!state || !county) return renderMoveFallbackImage();
    return renderMoveShareImage(
      moveCountyShareModel({
        countyLabel: buildCountyLabel(county),
        stateName: state.name,
      }),
    );
  } catch {
    return renderMoveFallbackImage();
  }
}

export function HEAD() {
  return new NextResponse(null, { status: 200, headers: { 'Content-Type': 'image/png' } });
}
