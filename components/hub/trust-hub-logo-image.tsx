import { IMAGE_SIZES } from '@/lib/images/constants';
import { TRUST_HUB_LOGO } from '@/lib/hub/config';
import { cn } from '@/lib/utils';

type TrustHubLogoImageProps = {
  variant: 'header' | 'footer';
  /** When true, eager load — never high-priority (protect H1 LCP). */
  priority?: boolean;
  className?: string;
};

/**
 * Site logo — native PNG preserves alpha.
 * Display box matches CSS .hub-logo-slot; never fetchPriority=high (H1 is LCP).
 */
export function TrustHubLogoImage({
  variant,
  priority = false,
  className,
}: TrustHubLogoImageProps) {
  const isHeader = variant === 'header';
  const displayW = isHeader ? 240 : 192;
  const displayH = isHeader ? 65 : 52;

  return (
    <img
      src={TRUST_HUB_LOGO.src}
      alt={TRUST_HUB_LOGO.alt}
      width={displayW}
      height={displayH}
      sizes={isHeader ? IMAGE_SIZES.headerLogo : IMAGE_SIZES.footerLogo}
      // auto priority — do not compete with text LCP
      fetchPriority="auto"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn(
        'object-contain object-left bg-transparent',
        isHeader
          ? 'h-full w-full'
          : 'h-12 w-[192px]',
        className
      )}
    />
  );
}
