import Link from 'next/link';

/**
 * Quiet network note only — never primary nav or equal footer columns.
 * Optional discovery of temporary /lender and /insurance subpaths on this domain.
 */
export function ConsumerTrustNetworkLinks({ className = '' }: { className?: string }) {
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
