import { OptimizedImage } from '@/components/ui/optimized-image';
import { DEFAULT_IMAGE_QUALITY, IMAGE_SIZES } from '@/lib/images/constants';
import { getHubConfig } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';

/** Optimized header logo — headerLogoSrc + fixed slot to prevent CLS. */
export function HubLogo({
  hubId,
  priority = false,
}: {
  hubId: HubId;
  priority?: boolean;
}) {
  const hub = getHubConfig(hubId);
  const src = hub.headerLogoSrc;
  const imgClass =
    'h-full w-full object-contain object-left transition-transform group-hover:scale-[1.02]';

  return (
    <span className="hub-logo-slot relative block shrink-0">
      <OptimizedImage
        src={src}
        alt={hub.logoAlt}
        width={300}
        height={75}
        quality={DEFAULT_IMAGE_QUALITY}
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={IMAGE_SIZES.headerLogo}
        className={imgClass}
      />
    </span>
  );
}