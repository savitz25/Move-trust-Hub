import { preload } from 'react-dom';
import { TRUST_HUB_LOGO } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';

/**
 * Preload header logo (~27KB PNG). Display box is 160–240px via CSS;
 * we do not request multi-megapixel optimizer URLs.
 */
export function HubLogoPreload({ hubId: _hubId }: { hubId: HubId }) {
  preload(TRUST_HUB_LOGO.src, {
    as: 'image',
    fetchPriority: 'high',
  });
  return null;
}
