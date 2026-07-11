import Link from 'next/link';
import { Info } from 'lucide-react';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { methodologyHref } from '@/lib/trust/site-stats';
import { cn } from '@/lib/utils';

type VerificationBadgeLegendProps = {
  className?: string;
  compact?: boolean;
  /** Render anchor ids for in-page badge links (profiles + methodology page). */
  showAnchors?: boolean;
};

/** Explains Directory Verified, FMCSA, and third-party badges on company profiles. */
export function VerificationBadgeLegend({
  className,
  compact = false,
  showAnchors = false,
}: VerificationBadgeLegendProps) {
  return (
    <aside
      id="badge-legend"
      className={cn(
        'rounded-lg border border-border/70 bg-muted/30 px-4 py-3 text-sm text-muted-foreground scroll-mt-24',
        !compact && 'border-primary/20 bg-primary/5',
        className
      )}
      aria-label="Verification badge legend"
    >
      <p className="font-medium text-foreground inline-flex items-center gap-1.5 mb-2">
        <Info className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
        What our badges mean
        {!compact ? (
          <Link
            href={methodologyHref('badges')}
            className="ml-1 text-xs font-normal text-primary hover:underline"
          >
            Full legend →
          </Link>
        ) : null}
      </p>
      <ul className={cn('space-y-2', compact ? 'text-xs' : 'text-sm')}>
        {VERIFICATION_BADGE_LEGEND.map((item) => (
          <li key={item.id} id={showAnchors ? `badge-${item.id}` : undefined} className="scroll-mt-28">
            <span className="font-medium text-foreground">{item.label}</span>
            <span className="text-muted-foreground"> — {item.description}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}