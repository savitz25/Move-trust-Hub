import Link from 'next/link';
import { TrustHubLogoImage } from '@/components/hub/trust-hub-logo-image';

/** Header logo — same Move Trust Hub mark as the main site. */
export function BrandLogo({
  href = '/',
  priority = false,
}: {
  href?: string;
  priority?: boolean;
}) {
  const image = (
    <span className="hub-logo-slot relative block shrink-0 max-w-[300px]">
      <TrustHubLogoImage variant="header" priority={priority} />
    </span>
  );

  if (!href) {
    return <div className="flex items-center">{image}</div>;
  }

  return (
    <Link
      href={href}
      className="group flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-trust focus-visible:ring-offset-2 rounded-lg"
      aria-label="Insurance Trust Hub — home"
    >
      {image}
    </Link>
  );
}

/** Footer logo — same Move Trust Hub mark as the main site. */
export function BrandLogoStacked({ className = '' }: { className?: string }) {
  return (
    <span className={`relative block h-12 w-[192px] shrink-0 bg-transparent ${className}`}>
      <TrustHubLogoImage variant="footer" />
    </span>
  );
}