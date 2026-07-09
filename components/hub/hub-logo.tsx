import { OptimizedImage } from '@/components/ui/optimized-image';
import { DEFAULT_IMAGE_QUALITY, IMAGE_SIZES } from '@/lib/images/constants';
import { getHubConfig } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';

/** Optimized header logo — shared Move Trust Hub mark across all hub sections. */
export function HubLogo({
  hubId,
  priority = false,
}: {
  hubId: HubId;
  priority?: boolean;
}) {
  const hub = getHubConfig(hubId);

  return (
    <OptimizedImage
      src={hub.logoSrc}
      alt={hub.logoAlt}
      width={300}
      height={75}
      quality={DEFAULT_IMAGE_QUALITY}
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={IMAGE_SIZES.headerLogo}
      className="h-12 w-auto max-w-[300px] object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
    />
  );
}