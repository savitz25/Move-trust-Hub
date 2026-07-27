import Link from 'next/link';
import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';
import { LENDER_HUB_LOGO } from '@/lib/hub/config';
import { cn } from '@/lib/utils';

/** Header logo — LenderTrustHub mark on /lender section. */
export function BrandLogo({
  href = '/lender',
  priority = false,
}: {
  href?: string;
  priority?: boolean;
}) {
  const image = (
    <span className="hub-logo-slot relative block shrink-0 max-w-[300px]">
      <TrustHubLogoImage variant="header" priority={priority} hubId="lender" />
    </span>
  );

  if (!href) {
    return <div className="flex items-center">{image}</div>;
  }

  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14B8A6] focus-visible:ring-offset-2 rounded-lg"
      aria-label={`${LENDER_HUB_LOGO.alt} — home`}
    >
      {image}
    </Link>
  );
}

/**
 * Footer logo — light wordmark for navy footer (no CSS invert hack).
 */
export function BrandLogoStacked({ className = '' }: { className?: string }) {
  return (
    <span className={cn('relative block h-12 w-[192px] shrink-0 bg-transparent', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- explicit light asset for dark footer */}
      <img
        src={LENDER_HUB_LOGO.footerSrc}
        alt={LENDER_HUB_LOGO.alt}
        width={LENDER_HUB_LOGO.width}
        height={LENDER_HUB_LOGO.height}
        className="h-12 w-[192px] object-contain object-left bg-transparent"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
