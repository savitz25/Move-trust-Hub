import { IMAGE_SIZES } from '@/lib/images/constants';
import { TRUST_HUB_LOGO } from '@/lib/hub/config';
import { cn } from '@/lib/utils';

type TrustHubLogoImageProps = {
  variant: 'header' | 'footer';
  priority?: boolean;
  className?: string;
};

/**
 * Site logo — native PNG (optimizer bypass) preserves alpha on light/dark backgrounds.
 * Server-rendered to avoid pulling next/image into the header client bundle.
 */
export function TrustHubLogoImage({
  variant,
  priority = false,
  className,
}: TrustHubLogoImageProps) {
  const isHeader = variant === 'header';

  return (
    <img
      src={TRUST_HUB_LOGO.src}
      alt={TRUST_HUB_LOGO.alt}
      width={isHeader ? TRUST_HUB_LOGO.width : 192}
      height={isHeader ? TRUST_HUB_LOGO.height : 60}
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      sizes={isHeader ? IMAGE_SIZES.headerLogo : IMAGE_SIZES.footerLogo}
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