import { HEADER_TRUST_BADGE } from '@/lib/trust/site-messaging';
import { cn } from '@/lib/utils';

type HeaderTrustBadgeProps = {
  className?: string;
};

/** Consistent nav pill — independent & verified directory across all Trust Hub properties. */
export function HeaderTrustBadge({ className }: HeaderTrustBadgeProps) {
  return (
    <div
      className={cn(
        'hidden xl:flex items-center rounded-full border border-border/60 bg-muted/80 px-2.5 py-1',
        'text-[10px] font-semibold leading-snug tracking-wide text-[#3d4f63]',
        'max-w-[240px] text-center min-h-8',
        className
      )}
      title={HEADER_TRUST_BADGE}
    >
      {HEADER_TRUST_BADGE}
    </div>
  );
}