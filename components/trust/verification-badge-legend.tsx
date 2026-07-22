import Link from 'next/link';
import { ChevronDown, Info } from 'lucide-react';
import {
  TYPE_BADGE_LEGEND,
  VERIFICATION_BADGE_LEGEND,
} from '@/lib/trust/site-messaging';
import { methodologyHref } from '@/lib/trust/methodology-paths';
import { cn } from '@/lib/utils';

type VerificationBadgeLegendProps = {
  className?: string;
  compact?: boolean;
  /** Render anchor ids for in-page badge links (profiles + methodology page). */
  showAnchors?: boolean;
  /**
   * When true (default on profiles), legend is a collapsed accordion.
   * Set false on methodology pages so definitions stay visible for anchors.
   */
  collapsible?: boolean;
};

function LegendList({
  items,
  compact,
  showAnchors,
}: {
  items: readonly { id: string; label: string; description: string }[];
  compact: boolean;
  showAnchors: boolean;
}) {
  return (
    <ul className={cn('space-y-2', compact ? 'text-xs' : 'text-sm')}>
      {items.map((item) => (
        <li
          key={item.id}
          id={showAnchors ? `badge-${item.id}` : undefined}
          className="scroll-mt-28"
        >
          <span className="font-medium text-foreground">{item.label}</span>
          <span className="text-muted-foreground"> — {item.description}</span>
        </li>
      ))}
    </ul>
  );
}

function LegendBody({
  compact,
  showAnchors,
}: {
  compact: boolean;
  showAnchors: boolean;
}) {
  return (
    <div className={cn('space-y-4', compact ? 'text-xs' : 'text-sm')}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Company type
        </p>
        <LegendList items={TYPE_BADGE_LEGEND} compact={compact} showAnchors={showAnchors} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
          Verification
        </p>
        <LegendList
          items={VERIFICATION_BADGE_LEGEND}
          compact={compact}
          showAnchors={showAnchors}
        />
      </div>
      {!compact ? (
        <p className="pt-1">
          <Link
            href={methodologyHref('badges')}
            className="text-xs font-medium text-primary hover:underline"
          >
            Full methodology →
          </Link>
        </p>
      ) : null}
    </div>
  );
}

/** Explains type + verification badges on company profiles (collapsible by default). */
export function VerificationBadgeLegend({
  className,
  compact = false,
  showAnchors = false,
  collapsible = true,
}: VerificationBadgeLegendProps) {
  const shellClass = cn(
    'rounded-lg border border-border/70 bg-muted/30 px-4 py-3 text-sm text-muted-foreground scroll-mt-24',
    !compact && 'border-primary/20 bg-primary/5',
    className
  );

  if (!collapsible) {
    return (
      <aside id="badge-legend" className={shellClass} aria-label="Verification badge legend">
        <p className="font-medium text-foreground inline-flex items-center gap-1.5 mb-3">
          <Info className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
          What our badges mean
        </p>
        <LegendBody compact={compact} showAnchors={showAnchors} />
      </aside>
    );
  }

  return (
    <details
      id="badge-legend"
      className={cn(shellClass, 'group')}
      aria-label="What our badges mean"
    >
      <summary
        className={cn(
          'cursor-pointer list-none font-medium text-foreground',
          'flex items-center justify-between gap-3',
          '[&::-webkit-details-marker]:hidden'
        )}
      >
        <span className="inline-flex items-center gap-1.5 min-w-0">
          <Info className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
          <span className="truncate">What our badges mean</span>
          <span className="text-xs font-normal text-muted-foreground whitespace-nowrap">
            (click to expand)
          </span>
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="mt-3 pt-3 border-t border-border/60">
        <LegendBody compact={compact} showAnchors={showAnchors} />
      </div>
    </details>
  );
}
