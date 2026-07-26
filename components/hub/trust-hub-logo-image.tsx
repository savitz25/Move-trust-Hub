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
 * Display dimensions match CSS .hub-logo-slot; source is 712×192 (~27KB) so we never
 * request a multi-megapixel optimizer derivative (no w=3840 path).
 */
export function TrustHubLogoImage({
  variant,
  priority = false,
  className,
}: TrustHubLogoImageProps) {
  const isHeader = variant === 'header';

  // Intrinsic attributes match display slot (not source PNG 712×192) for CLS
  const displayW = isHeader ? 240 : 192;
  const displayH = isHeader ? 65 : 52;
  const sizes = isHeader ? IMAGE_SIZES.headerLogo : IMAGE_SIZES.footerLogo;

  return (
    <img
      src={TRUST_HUB_LOGO.src}
      alt={TRUST_HUB_LOGO.alt}
      width={displayW}
      height={displayH}
      // Hint decoder the real bitmap is modest; display box is smaller
      srcSet={`${TRUST_HUB_LOGO.src} ${TRUST_HUB_LOGO.width}w`}
      sizes={sizes}
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'async' : 'async'}
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
