import {
  MOVE_OG_CONTENT_TYPE,
  MOVE_OG_FALLBACK_ALT,
  MOVE_OG_SIZE,
  renderMoveFallbackImage,
  renderMoveShareImage,
} from '@/lib/og/move-share-card';
import { moveCountyShareModel } from '@/lib/seo/share-card-model';
import { getCounty } from '@/lib/local-movers/geography/index';
import { getLocalState } from '@/lib/local-movers/states';
import { buildCountyLabel } from '@/lib/local-movers/schema-helpers';

export const runtime = 'nodejs';
export const alt = MOVE_OG_FALLBACK_ALT;
export const size = MOVE_OG_SIZE;
export const contentType = MOVE_OG_CONTENT_TYPE;

export default async function CountyOpenGraphImage({
  params,
}: {
  params: Promise<{ stateSlug: string; countySlug: string }>;
}) {
  try {
    const { stateSlug, countySlug } = await params;
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
