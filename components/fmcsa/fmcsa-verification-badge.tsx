import type { ReactNode } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldCheck, ShieldX } from 'lucide-react';
import type { Company } from '@/types';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';
import { badgeLegendHref } from '@/lib/trust/site-stats';

export type FmcsaBadgeStatus = 'verified' | 'warning' | 'critical' | 'unknown';

export function deriveFmcsaBadgeStatus(company: Pick<
  Company,
  | 'authorityActive'
  | 'outOfService'
  | 'fmcsaSafetyRating'
  | 'fmcsaLastChecked'
>): FmcsaBadgeStatus {
  if (!company.fmcsaLastChecked) return 'unknown';
  if (company.outOfService || company.authorityActive === false) return 'critical';
  if (
    company.fmcsaSafetyRating === 'Unsatisfactory' ||
    company.fmcsaSafetyRating === 'Conditional'
  ) {
    return 'warning';
  }
  // authorityActive === false already returned critical above
  if (company.fmcsaSafetyRating === 'Satisfactory') {
    return 'verified';
  }
  return 'unknown';
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

export function FmcsaVerificationBadge({
  company,
  className,
  linkToLegend = true,
}: {
  company: Pick<
    Company,
    | 'authorityActive'
    | 'outOfService'
    | 'fmcsaSafetyRating'
    | 'fmcsaLastChecked'
  >;
  className?: string;
  linkToLegend?: boolean;
}) {
  const status = deriveFmcsaBadgeStatus(company);
  const tooltip = TOOLTIPS[status];
  const legendId = LEGEND_IDS[status];

  let badge: ReactNode;

  if (status === 'verified') {
    badge = (
      <Badge variant="success" className={className} title={tooltip}>
        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
        {LABELS.verified}
      </Badge>
    );
  } else if (status === 'warning') {
    badge = (
      <Badge variant="warning" className={className} title={tooltip}>
        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        {LABELS.warning}
      </Badge>
    );
  } else if (status === 'critical') {
    badge = (
      <Badge variant="destructive" className={className} title={tooltip}>
        <ShieldX className="h-3.5 w-3.5 mr-1" />
        {LABELS.critical}
      </Badge>
    );
  } else {
    badge = (
      <Badge variant="secondary" className={className} title={tooltip}>
        {LABELS.unknown}
      </Badge>
    );
  }

  if (!linkToLegend) return badge;

  return (
    <Link
      href={badgeLegendHref(legendId, true)}
      className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
      title={`${tooltip} — see badge legend`}
      aria-label={`${LABELS[status]}: ${tooltip}. View badge legend.`}
    >
      {badge}
    </Link>
  );
}