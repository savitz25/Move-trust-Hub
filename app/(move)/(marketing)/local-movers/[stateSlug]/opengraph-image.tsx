import {
  MOVE_OG_CONTENT_TYPE,
  MOVE_OG_FALLBACK_ALT,
  MOVE_OG_SIZE,
  renderMoveFallbackImage,
  renderMoveShareImage,
} from '@/lib/og/move-share-card';
import { moveStateShareModel } from '@/lib/seo/share-card-model';
import { getLocalState } from '@/lib/local-movers/states';

export const runtime = 'nodejs';
export const alt = MOVE_OG_FALLBACK_ALT;
export const size = MOVE_OG_SIZE;
export const contentType = MOVE_OG_CONTENT_TYPE;

export default async function StateOpenGraphImage({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}) {
  try {
    const { stateSlug } = await params;
    const state = getLocalState(stateSlug);
    if (!state) return renderMoveFallbackImage();
    return renderMoveShareImage(moveStateShareModel({ stateName: state.name }));
  } catch {
    return renderMoveFallbackImage();
  }
}
