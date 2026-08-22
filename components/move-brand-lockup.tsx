import Link from 'next/link';
import { MoveNetworkMark } from '@/components/move-network-mark';
import { cn } from '@/lib/utils';

export function MoveBrandLockup({
  href = '/',
  inverted = false,
  className,
}: {
  href?: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      className={cn(
        'group th-logo-lockup flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--th-accent)] focus-visible:ring-offset-2',
        inverted && 'th-logo-lockup-on-dark',
        className,
      )}
      aria-label="Move Trust Hub home"
    >
      <MoveNetworkMark className="th-logo-mark" />
      <span className="th-logo-wordmark">
        <span className="th-logo-name">MOVE</span>
        <span className="th-logo-hub">TRUST HUB</span>
      </span>
    </Link>
  );
}
