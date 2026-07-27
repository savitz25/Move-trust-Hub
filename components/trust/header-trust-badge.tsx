import {
  HEADER_TRUST_BADGE,
  INSURANCE_HEADER_TRUST_BADGE,
  MOVE_HEADER_TRUST_BADGE,
} from '@/lib/trust/site-messaging';
import { cn } from '@/lib/utils';

type HeaderTrustBadgeProps = {
  className?: string;
  /** When true, use moving-specific copy so chrome reads as a mover authority. */
  moving?: boolean;
  /** Insurance specialist directory wording. */
  insurance?: boolean;
};

/** Nav trust pill — hub-specific authority copy when provided. */
export function HeaderTrustBadge({
  className,
  moving = false,
  insurance = false,
}: HeaderTrustBadgeProps) {
  const label = moving
    ? MOVE_HEADER_TRUST_BADGE
    : insurance
      ? INSURANCE_HEADER_TRUST_BADGE
      : HEADER_TRUST_BADGE;
  return (
    <div
      className={cn(
        'hidden xl:flex items-center rounded-full border border-border/60 bg-muted/80 px-2.5 py-1',
        'text-[10px] font-semibold leading-snug tracking-wide text-[#3d4f63]',
        'max-w-[280px] text-center min-h-8',
        className
      )}
      title={label}
    >
      {label}
    </div>
  );
}