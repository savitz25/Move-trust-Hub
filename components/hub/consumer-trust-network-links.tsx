import Link from 'next/link';
import type { HubId } from '@/lib/hub/types';

/**
 * Quiet network note only — never primary nav or equal footer columns.
 * Copy adapts so each specialist site names itself first.
 */
export function ConsumerTrustNetworkLinks({
  className = '',
  hubId = 'move',
}: {
  className?: string;
  hubId?: HubId;
}) {
  if (hubId === 'insurance') {
    return (
      <p
        className={`text-center text-[11px] text-muted-foreground/70 leading-relaxed ${className}`}
      >
        Part of the ConsumerTrust Hub network.{' '}
        <a
          href="https://www.movetrusthub.com"
          className="underline underline-offset-2 hover:text-muted-foreground"
          rel="noopener noreferrer"
        >
          MoveTrustHub
        </a>
        {' · '}
        <span className="text-muted-foreground/50">LenderTrustHub (coming soon)</span>
      </p>
    );
  }

  if (hubId === 'lender') {
    return (
      <p
        className={`text-center text-[11px] text-muted-foreground/70 leading-relaxed ${className}`}
      >
        Part of the ConsumerTrust Hub network.{' '}
        <Link
          prefetch={false}
          href="/"
          className="underline underline-offset-2 hover:text-muted-foreground"
        >
          MoveTrustHub
        </Link>
        {' · '}
        <Link
          prefetch={false}
          href="/insurance"
          className="underline underline-offset-2 hover:text-muted-foreground"
        >
          InsuranceTrustHub
        </Link>
      </p>
    );
  }

  return (
    <p
      className={`text-center text-[11px] text-muted-foreground/70 leading-relaxed ${className}`}
    >
      Move Trust Hub is part of the ConsumerTrust Hub network.{' '}
      <Link
        prefetch={false}
        href="/lender"
        className="underline underline-offset-2 hover:text-muted-foreground"
      >
        Lenders
      </Link>
      {' · '}
      <Link
        prefetch={false}
        href="/insurance"
        className="underline underline-offset-2 hover:text-muted-foreground"
      >
        Insurance
      </Link>
    </p>
  );
}
