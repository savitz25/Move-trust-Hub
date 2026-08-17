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
  // Insurance: compact pill from md.
  // Move: long "Independent FMCSA Mover Directory" chip waits until 2xl so
  // logo + Find Movers + Calculator never collide at 1280 / 1440 / 125% zoom.
  const showFrom = insurance ? 'hidden md:flex' : 'hidden 2xl:flex';

  return (
    <div
      className={cn(
        showFrom,
        'min-w-0 items-center overflow-hidden rounded-full border border-border/60 bg-muted/80 px-2.5 py-1',
        'text-[10px] font-semibold leading-snug tracking-wide text-[#3d4f63]',
        insurance
          ? 'max-w-[200px] tracking-[0.08em] uppercase'
          : 'max-w-[min(16rem,22vw)] truncate',
        'text-center min-h-8',
        className
      )}
      title={label}
    >
      {insurance ? 'Independent' : label}
    </div>
  );
}