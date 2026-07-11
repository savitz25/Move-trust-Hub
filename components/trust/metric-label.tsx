import Link from 'next/link';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { METHODOLOGY_ANCHORS, methodologyHref } from '@/lib/trust/site-stats';

type MethodologyAnchor = keyof typeof METHODOLOGY_ANCHORS;

type MetricLabelProps = {
  label: string;
  tooltip: string;
  className?: string;
  /** Link label and info icon to the methodology page section. */
  methodologyAnchor?: MethodologyAnchor;
};

/**
 * Accessible metric heading with plain-English explanation.
 * Optionally links to the canonical methodology page for transparency.
 */
export function MetricLabel({
  label,
  tooltip,
  className,
  methodologyAnchor,
}: MetricLabelProps) {
  const labelContent = methodologyAnchor ? (
    <Link
      href={methodologyHref(methodologyAnchor)}
      className="hover:text-primary underline decoration-muted-foreground/30 underline-offset-2 transition-colors"
      title={`${tooltip} — see full methodology`}
    >
      {label}
    </Link>
  ) : (
    <span>{label}</span>
  );

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground leading-snug">
        {labelContent}
      </span>
      {methodologyAnchor ? (
        <Link
          href={methodologyHref(methodologyAnchor)}
          className="inline-flex shrink-0 rounded-full text-muted-foreground/70 hover:text-primary transition-colors"
          title={`${tooltip} — see full methodology`}
          aria-label={`${label}: ${tooltip}. Learn how we calculate this.`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : (
        <span
          className="inline-flex shrink-0 rounded-full text-muted-foreground/70 hover:text-foreground transition-colors cursor-help"
          title={tooltip}
          aria-label={`${label}: ${tooltip}`}
          role="note"
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
    </div>
  );
}