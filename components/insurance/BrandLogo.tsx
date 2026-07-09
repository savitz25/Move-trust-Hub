import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_IMAGE_QUALITY, IMAGE_SIZES } from '@/lib/images/constants';
import { TRUST_HUB_LOGO } from '@/lib/hub/config';

/** Header logo — same Move Trust Hub mark as the main site. */
export function BrandLogo({
  href = '/',
  priority = false,
}: {
  href?: string;
  priority?: boolean;
}) {
  const image = (
    <Image
      src={TRUST_HUB_LOGO.src}
      alt={TRUST_HUB_LOGO.alt}
      width={300}
      height={75}
      quality={DEFAULT_IMAGE_QUALITY}
      priority={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={IMAGE_SIZES.headerLogo}
      className="h-12 w-auto max-w-[300px] object-contain object-left transition-transform group-hover:scale-[1.02]"
    />
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
    <Image
      src={TRUST_HUB_LOGO.src}
      alt={TRUST_HUB_LOGO.alt}
      width={192}
      height={48}
      loading="lazy"
      sizes={IMAGE_SIZES.footerLogo}
      className={`h-12 w-[192px] object-contain object-left ${className}`}
    />
  );
}