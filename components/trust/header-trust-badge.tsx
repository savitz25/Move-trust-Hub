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
        'hidden lg:flex items-center rounded-full bg-muted/70 px-2 py-px text-[7px] font-semibold tracking-[0.5px] text-muted-foreground border border-border/50 max-w-[220px] leading-tight text-center',
        className
      )}
      title={HEADER_TRUST_BADGE}
    >
      {HEADER_TRUST_BADGE}
    </div>
  );
}