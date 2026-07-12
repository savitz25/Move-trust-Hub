import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Award, ShieldAlert } from 'lucide-react';
import type { Company } from '@/types';
import {
  deriveBbbVerificationStatus,
  getBbbDisplayFromScrape,
  type BbbVerificationStatus,
} from '@/lib/trust/verification-status';
import { badgeLegendHref } from '@/lib/trust/site-stats';
import { cn } from '@/lib/utils';

const BBB_VERIFIED_TOOLTIP =
  'Confirmed BBB business listing from our most recent public scrape or BBB API check.';
const BBB_UNVERIFIED_TOOLTIP =
  'No confirmed BBB listing found in our latest scrape — verify independently on BBB.org.';

export function deriveBbbBadgeStatus(
  company: Pick<Company, 'publicScrapeData'>
): BbbVerificationStatus {
  return deriveBbbVerificationStatus(company.publicScrapeData);
}

export function BbbVerificationBadge({
  company,
  className,
  status: statusOverride,
  linkToLegend = true,
}: {
  company: Pick<Company, 'publicScrapeData'>;
  className?: string;
  status?: BbbVerificationStatus;
  linkToLegend?: boolean;
}) {
  const status = statusOverride ?? deriveBbbVerificationStatus(company.publicScrapeData);
  const { rating, accredited } = getBbbDisplayFromScrape(company.publicScrapeData);

  const badge =
    status === 'verified' ? (
      <Badge variant="success" className={className} title={BBB_VERIFIED_TOOLTIP}>
        <Award className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
        BBB Verified
        {rating ? ` ${rating}` : ''}
        {accredited ? ' · Accredited' : ''}
      </Badge>
    ) : (
      <Badge variant="outline" className={className} title={BBB_UNVERIFIED_TOOLTIP}>
        <ShieldAlert className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
        BBB Unverified
      </Badge>
    );

  if (!linkToLegend) return badge;

  const legendId = status === 'verified' ? 'bbb-verified' : 'bbb-unverified';

  return (
    <Link
      href={badgeLegendHref(legendId, true)}
      className={cn('inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full')}
      title={`${status === 'verified' ? BBB_VERIFIED_TOOLTIP : BBB_UNVERIFIED_TOOLTIP} — see badge legend`}
      aria-label={
        status === 'verified'
          ? `BBB Verified${rating ? ` ${rating}` : ''}: ${BBB_VERIFIED_TOOLTIP}`
          : `BBB Unverified: ${BBB_UNVERIFIED_TOOLTIP}`
      }
    >
      {badge}
    </Link>
  );
}