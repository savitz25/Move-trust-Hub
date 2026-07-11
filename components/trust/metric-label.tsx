import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type MetricLabelProps = {
  label: string;
  tooltip: string;
  className?: string;
};

/**
 * Accessible metric heading with plain-English explanation.
 * Uses native title + aria-label for crawlers and screen readers (no client JS).
 */
export function MetricLabel({ label, tooltip, className }: MetricLabelProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground leading-snug">
        {label}
      </span>
      <span
        className="inline-flex shrink-0 rounded-full text-muted-foreground/70 hover:text-foreground transition-colors cursor-help"
        title={tooltip}
        aria-label={`${label}: ${tooltip}`}
        role="note"
      >
        <Info className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </div>
  );
}