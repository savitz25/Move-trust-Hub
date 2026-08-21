import { NextResponse } from 'next/server';
import { renderMoveFallbackImage, renderMoveShareImage } from '@/lib/og/move-share-card';
import { moveStateShareModel } from '@/lib/seo/share-card-model';
import { getLocalState } from '@/lib/local-movers/states';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  context: { params: Promise<{ stateSlug: string }> },
) {
  try {
    const { stateSlug } = await context.params;
    const state = getLocalState(stateSlug);
    if (!state) return renderMoveFallbackImage();
    return renderMoveShareImage(moveStateShareModel({ stateName: state.name }));
  } catch {
    return renderMoveFallbackImage();
  }
}

export function HEAD() {
  return new NextResponse(null, { status: 200, headers: { 'Content-Type': 'image/png' } });
}
