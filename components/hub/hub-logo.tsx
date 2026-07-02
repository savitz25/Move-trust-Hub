import Image from 'next/image';
import type { HubId } from '@/lib/hub/types';
import { getHubConfig } from '@/lib/hub/config';

/** Optimized header logo — caps requested width to avoid 3840px src requests. */
export function HubLogo({
  hubId,
  priority = false,
}: {
  hubId: HubId;
  priority?: boolean;
}) {
  const hub = getHubConfig(hubId);

  return (
    <Image
      src={hub.logoSrc}
      alt={hub.logoAlt}
      width={240}
      height={60}
      priority={priority}
      sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
      className="h-12 w-auto max-w-[240px] object-contain object-left transition-transform group-hover:scale-[1.02]"
    />
  );
}