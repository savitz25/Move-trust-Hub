import Link from 'next/link';

/**
 * Phase 0 soft cross-hub discovery only — never primary nav.
 * Discreet footer line for existing users of the ConsumerTrust Hub network.
 */
export function ConsumerTrustNetworkLinks({ className = '' }: { className?: string }) {
  return (
    <p
      className={`text-center text-[11px] text-muted-foreground/80 leading-relaxed ${className}`}
    >
      Part of the ConsumerTrust Hub network →{' '}
      <Link
        prefetch={false}
        href="/lender"
        className="underline underline-offset-2 hover:text-foreground"
      >
        LenderTrustHub
      </Link>
      {' · '}
      <Link
        prefetch={false}
        href="/insurance"
        className="underline underline-offset-2 hover:text-foreground"
      >
        InsuranceTrustHub
      </Link>
    </p>
  );
}
