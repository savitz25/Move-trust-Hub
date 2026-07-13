'use client';

import { OptimizedImage } from '@/components/ui/optimized-image';
import { DEFAULT_IMAGE_QUALITY, IMAGE_SIZES } from '@/lib/images/constants';
import { TRUST_HUB_LOGO } from '@/lib/hub/config';
import { cn } from '@/lib/utils';

type TrustHubLogoImageProps = {
  variant: 'header' | 'footer';
  priority?: boolean;
  className?: string;
};

/**
 * Site logo — served as native PNG (optimizer bypass) so alpha transparency
 * is preserved on light and dark backgrounds.
 */
export function TrustHubLogoImage({
  variant,
  priority = false,
  className,
}: TrustHubLogoImageProps) {
  const isHeader = variant === 'header';

  return (
    <OptimizedImage
      src={TRUST_HUB_LOGO.src}
      alt={TRUST_HUB_LOGO.alt}
      width={isHeader ? TRUST_HUB_LOGO.width : 192}
      height={isHeader ? TRUST_HUB_LOGO.height : 60}
      quality={DEFAULT_IMAGE_QUALITY}
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={isHeader ? IMAGE_SIZES.headerLogo : IMAGE_SIZES.footerLogo}
      loading={priority ? undefined : 'lazy'}
      native
      className={cn(
        'object-contain object-left bg-transparent',
        isHeader
          ? 'h-full w-full transition-transform group-hover:scale-[1.02]'
          : 'h-12 w-[192px]',
        className
      )}
    />
  );
}