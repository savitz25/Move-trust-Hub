import Link from 'next/link';
import { BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { badgeLegendHref } from '@/lib/trust/methodology-paths';
import {
  verificationBadgeClasses,
  verificationBadgeIconClass,
  verificationBadgeLinkClass,
  type VerificationBadgeSize,
} from '@/components/trust/verification-badge-styles';
import { cn } from '@/lib/utils';

const DIRECTORY_LEGEND = VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'directory')!;

type DirectoryVerifiedBadgeProps = {
  className?: string;
  /** @deprecated Use size="compact" */
  compact?: boolean;
  size?: VerificationBadgeSize;
  linkToLegend?: boolean;
};

export function DirectoryVerifiedBadge({
  className,
  compact = false,
  size,
  linkToLegend = true,
}: DirectoryVerifiedBadgeProps) {
  const resolvedSize: VerificationBadgeSize = size ?? (compact ? 'compact' : 'profile');

  const badge = (
    <Badge
      variant="outline"
      className={cn(
        verificationBadgeClasses(resolvedSize, 'success', className),
        linkToLegend && 'hover:ring-1 hover:ring-emerald-500/25 transition-shadow'
      )}
      title={DIRECTORY_LEGEND.description}
    >
      <BadgeCheck className={verificationBadgeIconClass(resolvedSize)} aria-hidden="true" />
      {DIRECTORY_LEGEND.label}
    </Badge>
  );

  if (!linkToLegend) return badge;

  return (
    <Link
      href={badgeLegendHref('directory', true)}
      className={verificationBadgeLinkClass()}
      title={`${DIRECTORY_LEGEND.description} — see badge legend`}
      aria-label={`${DIRECTORY_LEGEND.label}: ${DIRECTORY_LEGEND.description}. View badge legend.`}
    >
      {badge}
    </Link>
  );
}