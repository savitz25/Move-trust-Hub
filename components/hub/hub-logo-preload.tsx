import { preload } from 'react-dom';
import { shouldBypassImageOptimizer } from '@/lib/images/constants';
import { getHubConfig } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';

/**
 * Preload SVG header logos during RSC (native <img> — no next/image preload).
 * Raster logos use HubLogo priority={true} which triggers next/image preload.
 */
export function HubLogoPreload({ hubId }: { hubId: HubId }) {
  const { logoSrc } = getHubConfig(hubId);
  if (!shouldBypassImageOptimizer(logoSrc)) {
    return null;
  }
  preload(logoSrc, { as: 'image', fetchPriority: 'low' });
  return null;
}