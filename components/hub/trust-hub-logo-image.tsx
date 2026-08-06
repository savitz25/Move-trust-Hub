import { IMAGE_SIZES } from '@/lib/images/constants';
import { getHubConfig, TRUST_HUB_LOGO } from '@/lib/hub/config';
import type { HubId } from '@/lib/hub/types';
import { cn } from '@/lib/utils';

type TrustHubLogoImageProps = {
  variant: 'header' | 'footer';
  /** When true, eager load — never high-priority (protect H1 LCP). */
  priority?: boolean;
  className?: string;
  /** Defaults to Move branding. Pass hub for vertical-specific mark + alt. */
  hubId?: HubId;
};

/**
 * Site logo — native PNG preserves alpha.
 * Display box matches CSS .hub-logo-slot; never fetchPriority=high (H1 is LCP).
 */
export function TrustHubLogoImage({
  variant,
  priority = false,
  className,
  hubId = 'move',
}: TrustHubLogoImageProps) {
  const isHeader = variant === 'header';
  const displayW = isHeader ? 240 : 192;
  const displayH = isHeader ? 65 : 52;
  const hub = getHubConfig(hubId);
  const src = isHeader ? hub.headerLogoSrc : hub.logoSrc;
  const alt = hub.logoAlt || TRUST_HUB_LOGO.alt;
  const isSvg = /\.svg(\?|$)/i.test(src);

  return (
    <img
      src={src}
      alt={alt}
      width={displayW}
      height={displayH}
      sizes={isHeader ? IMAGE_SIZES.headerLogo : IMAGE_SIZES.footerLogo}
      fetchPriority="auto"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn(
        'object-contain object-left bg-transparent',
        isHeader ? 'h-10 w-auto max-h-11 sm:h-11 md:h-12' : 'h-11 w-[200px] sm:h-12 sm:w-[220px]',
        isSvg && 'w-auto',
        className
      )}
    />
  );
}
