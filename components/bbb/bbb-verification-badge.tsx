import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Award, ShieldAlert } from 'lucide-react';
import type { Company } from '@/types';

export type BbbBadgeStatus = 'accredited' | 'rated' | 'warning' | 'unknown';

export function deriveBbbBadgeStatus(
  company: Pick<
    Company,
    'bbbAccredited' | 'bbbRating' | 'bbbLastChecked' | 'bbbAlertCount'
  >
): BbbBadgeStatus {
  if (!company.bbbLastChecked) return 'unknown';
  if ((company.bbbAlertCount ?? 0) > 0) return 'warning';
  if (company.bbbAccredited) return 'accredited';
  const rating = company.bbbRating ?? 'NR';
  if (rating === 'F' || rating.startsWith('D') || rating.startsWith('C')) return 'warning';
  if (rating !== 'NR') return 'rated';
  return 'unknown';
}

export function BbbVerificationBadge({
  company,
  className,
  showRating = true,
}: {
  company: Pick<
    Company,
    'bbbAccredited' | 'bbbRating' | 'bbbLastChecked' | 'bbbAlertCount'
  >;
  className?: string;
  showRating?: boolean;
}) {
  const status = deriveBbbBadgeStatus(company);

  if (status === 'accredited') {
    return (
      <Badge variant="success" className={className}>
        <Award className="h-3.5 w-3.5 mr-1" />
        BBB Accredited{showRating && company.bbbRating ? ` ${company.bbbRating}` : ''}
      </Badge>
    );
  }

  if (status === 'rated' && showRating && company.bbbRating && company.bbbRating !== 'NR') {
    return (
      <Badge variant="secondary" className={className}>
        BBB {company.bbbRating}
      </Badge>
    );
  }

  if (status === 'warning') {
    return (
      <Badge variant="warning" className={className}>
        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        BBB Warning
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className={className}>
      <ShieldAlert className="h-3.5 w-3.5 mr-1" />
      BBB Unverified
    </Badge>
  );
}