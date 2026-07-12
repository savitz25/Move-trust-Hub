import type { ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldCheck, ShieldX } from 'lucide-react';
import type { Company } from '@/types';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { badgeLegendHref } from '@/lib/trust/site-stats';
import {
  verificationBadgeClasses,
  verificationBadgeIconClass,
  verificationBadgeLinkClass,
  type VerificationBadgeSize,
} from '@/components/trust/verification-badge-styles';
import {
  deriveFmcsaVerificationStatus,
  type FmcsaVerificationStatus,
} from '@/lib/trust/verification-status';
import { cn } from '@/lib/utils';

export type FmcsaBadgeStatus = FmcsaVerificationStatus;

export function deriveFmcsaBadgeStatus(
  company: Pick<
    Company,
    | 'usdotNumber'
    | 'mcNumber'
    | 'authorityActive'
    | 'outOfService'
    | 'fmcsaSafetyRating'
    | 'fmcsaLastChecked'
    | 'usdotStatus'
  >
): FmcsaBadgeStatus | null {
  return deriveFmcsaVerificationStatus(company);
}

const LABELS: Record<FmcsaBadgeStatus, string> = {
  verified: 'FMCSA Verified',
  warning: 'FMCSA Warning',
  critical: 'Authority Alert',
  unknown: 'FMCSA Unverified',
};

const LEGEND_IDS: Record<FmcsaBadgeStatus, string> = {
  verified: 'fmcsa',
  warning: 'fmcsa-warning',
  critical: 'fmcsa-critical',
  unknown: 'fmcsa-unknown',
};

const TOOLTIPS: Record<FmcsaBadgeStatus, string> = {
  verified:
    VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'fmcsa')?.description ?? LABELS.verified,
  warning:
    VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'fmcsa-warning')?.description ??
    LABELS.warning,
  critical:
    VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'fmcsa-critical')?.description ??
    LABELS.critical,
  unknown:
    VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'fmcsa-unknown')?.description ??
    LABELS.unknown,
};

const TONE: Record<FmcsaBadgeStatus, 'success' | 'warning' | 'critical' | 'muted'> = {
  verified: 'success',
  warning: 'warning',
  critical: 'critical',
  unknown: 'muted',
};

export function FmcsaVerificationBadge({
  company,
  className,
  status: statusOverride,
  size = 'profile',
  linkToLegend = true,
}: {
  company: Pick<
    Company,
    | 'usdotNumber'
    | 'mcNumber'
    | 'authorityActive'
    | 'outOfService'
    | 'fmcsaSafetyRating'
    | 'fmcsaLastChecked'
    | 'usdotStatus'
  >;
  className?: string;
  status?: FmcsaBadgeStatus;
  size?: VerificationBadgeSize;
  linkToLegend?: boolean;
}) {
  const status = statusOverride ?? deriveFmcsaVerificationStatus(company);
  if (!status) return null;

  const tooltip = TOOLTIPS[status];
  const legendId = LEGEND_IDS[status];
  const tone = TONE[status];
  const iconClass = verificationBadgeIconClass(size);

  let badge: ReactNode;

  if (status === 'verified') {
    badge = (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, tone, className)}
        title={tooltip}
      >
        <ShieldCheck className={iconClass} />
        {LABELS.verified}
      </Badge>
    );
  } else if (status === 'warning') {
    badge = (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, tone, className)}
        title={tooltip}
      >
        <AlertTriangle className={iconClass} />
        {LABELS.warning}
      </Badge>
    );
  } else if (status === 'critical') {
    badge = (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, tone, className)}
        title={tooltip}
      >
        <ShieldX className={iconClass} />
        {LABELS.critical}
      </Badge>
    );
  } else {
    badge = (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, tone, className)}
        title={tooltip}
      >
        {LABELS.unknown}
      </Badge>
    );
  }

  if (!linkToLegend) return badge;

  return (
    <Link
      href={badgeLegendHref(legendId, true)}
      className={cn(verificationBadgeLinkClass(), 'hover:ring-1 hover:ring-primary/20 transition-shadow')}
      title={`${tooltip} — see badge legend`}
      aria-label={`${LABELS[status]}: ${tooltip}. View badge legend.`}
    >
      {badge}
    </Link>
  );
}