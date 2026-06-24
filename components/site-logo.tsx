import { cn } from '@/lib/utils';

type SiteLogoProps = {
  className?: string;
  alt?: string;
};

const DEFAULT_ALT =
  'Move Trust Hub — trusted interstate moving directory and free quote matching';

export function SiteLogo({
  className,
  alt = DEFAULT_ALT,
}: SiteLogoProps) {
  return (
    <span className={cn('relative inline-flex items-center', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-wordmark.svg"
        alt={alt}
        width={300}
        height={72}
        decoding="async"
        className="h-full w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-wordmark-dark.svg"
        alt={alt}
        width={300}
        height={72}
        decoding="async"
        className="hidden h-full w-auto dark:block"
      />
    </span>
  );
}