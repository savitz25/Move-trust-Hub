import Link from 'next/link';
import type { HubId } from '@/lib/hub/types';
import { INSURANCE_SITE_URL } from '@/lib/hub/domains';

/**
 * Quiet network note only — never primary nav or equal footer columns.
 * InsuranceTrustHub is fully independent: no MoveTrustHub links in its chrome.
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
        Independent directory operated by InsuranceTrustHub. No paid placements. Not affiliated
        with listed agencies or carriers.
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
        <a
          href={INSURANCE_SITE_URL}
          className="underline underline-offset-2 hover:text-muted-foreground"
          rel="noopener noreferrer"
        >
          InsuranceTrustHub
        </a>
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
      <a
        href={INSURANCE_SITE_URL}
        className="underline underline-offset-2 hover:text-muted-foreground"
        rel="noopener noreferrer"
      >
        Insurance
      </a>
    </p>
  );
}
