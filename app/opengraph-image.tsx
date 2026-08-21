import {
  MOVE_OG_CONTENT_TYPE,
  MOVE_OG_FALLBACK_ALT,
  MOVE_OG_SIZE,
  renderMoveFallbackImage,
} from '@/lib/og/move-share-card';

export const runtime = 'edge';
export const alt = MOVE_OG_FALLBACK_ALT;
export const size = MOVE_OG_SIZE;
export const contentType = MOVE_OG_CONTENT_TYPE;

export default function OpenGraphImage() {
  return renderMoveFallbackImage();
}
