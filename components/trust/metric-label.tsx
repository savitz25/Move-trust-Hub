'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  METHODOLOGY_ANCHORS,
  methodologyHref,
  type MethodologyReturnContext,
} from '@/lib/trust/site-stats';

type MethodologyAnchor = keyof typeof METHODOLOGY_ANCHORS;

type MetricLabelProps = {
  label: string;
  tooltip: string;
  className?: string;
  /** Link label and info icon to the methodology page section. */
  methodologyAnchor?: MethodologyAnchor;
  /** Return context so methodology page can show “Back to …” */
  returnContext?: MethodologyReturnContext;
};

/**
 * Metric heading + shared InfoTooltip popover (title, body, optional Learn more).
 */
export function MetricLabel({
  label,
  tooltip,
  className,
  methodologyAnchor,
  returnContext,
}: MetricLabelProps) {
  const learnMoreHref = methodologyAnchor
    ? methodologyHref(methodologyAnchor, returnContext)
    : undefined;

  const labelContent = learnMoreHref ? (
    <Link
      href={learnMoreHref}
      className="hover:text-primary underline decoration-muted-foreground/30 underline-offset-2 transition-colors"
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
      <InfoTooltip
        title={label}
        description={tooltip}
        learnMoreHref={learnMoreHref}
        learnMoreLabel="Learn more →"
        triggerLabel={`${label}: more information`}
      />
    </div>
  );
}