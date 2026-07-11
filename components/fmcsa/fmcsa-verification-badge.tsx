import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldCheck, ShieldX } from 'lucide-react';
import type { Company } from '@/types';
import { VERIFICATION_BADGE_LEGEND } from '@/lib/trust/site-messaging';

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
  if (company.fmcsaSafetyRating === 'Satisfactory' && company.authorityActive !== false) {
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
}: {
  company: Pick<
    Company,
    | 'authorityActive'
    | 'outOfService'
    | 'fmcsaSafetyRating'
    | 'fmcsaLastChecked'
  >;
  className?: string;
}) {
  const status = deriveFmcsaBadgeStatus(company);
  const tooltip = TOOLTIPS[status];

  if (status === 'verified') {
    return (
      <Badge variant="success" className={className} title={tooltip}>
        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
        {LABELS.verified}
      </Badge>
    );
  }

  if (status === 'warning') {
    return (
      <Badge variant="warning" className={className} title={tooltip}>
        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        {LABELS.warning}
      </Badge>
    );
  }

  if (status === 'critical') {
    return (
      <Badge variant="destructive" className={className} title={tooltip}>
        <ShieldX className="h-3.5 w-3.5 mr-1" />
        {LABELS.critical}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className={className} title={tooltip}>
      {LABELS.unknown}
    </Badge>
  );
}