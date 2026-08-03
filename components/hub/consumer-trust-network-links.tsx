import type { HubId } from '@/lib/hub/types';
import {
  INSURANCE_SITE_URL,
  LENDER_SITE_URL,
  MOVE_SITE_URL,
} from '@/lib/hub/domains';

export const ASK_TRUST_HUB_URL = 'https://www.asktrusthub.com';
export const ASK_TRUST_HUB_PROMISE_URL = 'https://www.asktrusthub.com/promise';

/**
 * Quiet network note only — never primary nav or equal footer columns.
 * Sister hubs use absolute apex URLs (never residual /lender paths on Move).
 */
export function ConsumerTrustNetworkLinks({
  className = '',
  hubId = 'move',
}: {
  className?: string;
  hubId?: HubId;
}) {
  const askLink = (
    <a
      href={ASK_TRUST_HUB_PROMISE_URL}
      className="underline underline-offset-2 hover:text-muted-foreground"
      rel="noopener noreferrer"
    >
      Ask Trust Hub network
    </a>
  );

  if (hubId === 'insurance') {
    return (
      <p
        className={`text-center text-[11px] text-muted-foreground/70 leading-relaxed ${className}`}
      >
        Independent directory operated by InsuranceTrustHub. No paid placements. Not affiliated
        with listed agencies or carriers. Part of the {askLink}.
      </p>
    );
  }

  if (hubId === 'lender') {
    return (
      <p
        className={`text-center text-[11px] text-muted-foreground/70 leading-relaxed ${className}`}
      >
        Independent mortgage research directory. Part of the {askLink}.{' '}
        <a
          href={MOVE_SITE_URL}
          className="underline underline-offset-2 hover:text-muted-foreground"
          rel="noopener noreferrer"
        >
          MoveTrustHub
        </a>
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

  // Move hub
  return (
    <p
      className={`text-center text-[11px] text-muted-foreground/70 leading-relaxed ${className}`}
    >
      Independent mover research directory. No lead fees. No paid placements. Always verify
      licensing on FMCSA.gov. Part of the {askLink}.{' '}
      <a
        href={LENDER_SITE_URL}
        className="underline underline-offset-2 hover:text-muted-foreground"
        rel="noopener noreferrer"
      >
        Lender Trust Hub
      </a>
      {' · '}
      <a
        href={INSURANCE_SITE_URL}
        className="underline underline-offset-2 hover:text-muted-foreground"
        rel="noopener noreferrer"
      >
        Insurance Trust Hub
      </a>
    </p>
  );
}
