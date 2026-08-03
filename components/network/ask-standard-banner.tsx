import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
import { cn } from '@/lib/utils';

type AskStandardBannerProps = {
  /** Short vertical label, e.g. “Move Trust Hub methodology” */
  verticalLabel?: string;
  className?: string;
};

/**
 * Cites the parent Ask Trust Hub Standard without duplicating full Trust Center essays.
 */
export function AskStandardBanner({
  verticalLabel = 'This hub’s methodology',
  className,
}: AskStandardBannerProps) {
  return (
    <aside
      className={cn(
        'rounded-xl border border-border/70 bg-muted/25 px-4 py-4 text-sm sm:px-5',
        className
      )}
      aria-label="Ask Trust Hub Standard"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Parent standard
      </p>
      <p className="mt-1.5 leading-relaxed text-muted-foreground">
        {verticalLabel} inherits{' '}
        <strong className="font-semibold text-foreground">The Ask Trust Hub Standard</strong>
        {' — '}
        SOURCE → VERIFY → DISCLOSE → SCORE → UPDATE → YOU DECIDE. Framework is shared; data and
        checks below are industry-specific.
      </p>
      <p className="mt-2">
        <a
          href={ASK_TRUST_HUB.methodologyUrl}
          className="font-semibold text-primary underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          Read the Ask Trust Hub Standard
        </a>
        {' · '}
        <a
          href={ASK_TRUST_HUB.promiseUrl}
          className="font-medium text-foreground/80 underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          Independence
        </a>
        {' · '}
        <a
          href={ASK_TRUST_HUB.revenueUrl}
          className="font-medium text-foreground/80 underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          How we make money
        </a>
      </p>
    </aside>
  );
}
