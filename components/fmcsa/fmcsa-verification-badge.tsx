import type { ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldCheck, ShieldX } from 'lucide-react';
import type { Company } from '@/types';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { badgeLegendHref, methodologyHref } from '@/lib/trust/methodology-paths';
import { FMCSA_PLAIN_ENGLISH, FMCSA_VERIFIED_TOOLTIP } from '@/lib/trust/fmcsa-consumer-copy';
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
    VERIFICATION_BADGE_LEGEND.find((item) => item.id === 'fmcsa')?.description ??
    FMCSA_VERIFIED_TOOLTIP,
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
  const rawStatus = statusOverride ?? deriveFmcsaVerificationStatus(company);
  // Never render “FMCSA Unverified” on public surfaces
  if (!rawStatus || rawStatus === 'unknown') return null;
  const status = rawStatus;

  const tooltip = TOOLTIPS[status];
  const legendId = LEGEND_IDS[status];
  const tone = TONE[status];
  const iconClass = verificationBadgeIconClass(size);
  const accessibleTitle =
    status === 'verified'
      ? `${LABELS.verified}. ${FMCSA_PLAIN_ENGLISH} ${tooltip}`
      : `${LABELS[status]}. ${tooltip}`;

  let badge: ReactNode;

  if (status === 'verified') {
    badge = (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, tone, className)}
        title={accessibleTitle}
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
        title={accessibleTitle}
      >
        <AlertTriangle className={iconClass} />
        {LABELS.warning}
      </Badge>
    );
  } else {
    badge = (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, tone, className)}
        title={accessibleTitle}
      >
        <ShieldX className={iconClass} />
        {LABELS.critical}
      </Badge>
    );
  }

  if (!linkToLegend) return badge;

  // Profile legend + full vetting explainer
  const href =
    size === 'profile' ? badgeLegendHref(legendId, true) : methodologyHref('vetting');

  return (
    <Link
      href={href}
      className={cn(verificationBadgeLinkClass(), 'hover:ring-1 hover:ring-primary/20 transition-shadow')}
      title={`${accessibleTitle} — see how we vet movers`}
      aria-label={`${LABELS[status]}: ${FMCSA_PLAIN_ENGLISH} ${tooltip}. See how we vet movers.`}
    >
      {badge}
    </Link>
  );
}
