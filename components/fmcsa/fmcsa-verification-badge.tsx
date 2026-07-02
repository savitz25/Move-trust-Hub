import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ShieldCheck, ShieldX } from 'lucide-react';
import type { Company } from '@/types';

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

  if (status === 'verified') {
    return (
      <Badge variant="success" className={className}>
        <ShieldCheck className="h-3.5 w-3.5 mr-1" />
        {LABELS.verified}
      </Badge>
    );
  }

  if (status === 'warning') {
    return (
      <Badge variant="warning" className={className}>
        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        {LABELS.warning}
      </Badge>
    );
  }

  if (status === 'critical') {
    return (
      <Badge variant="destructive" className={className}>
        <ShieldX className="h-3.5 w-3.5 mr-1" />
        {LABELS.critical}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className={className}>
      {LABELS.unknown}
    </Badge>
  );
}