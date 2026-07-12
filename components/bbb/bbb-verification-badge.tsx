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
import {
  verificationBadgeClasses,
  verificationBadgeIconClass,
  verificationBadgeLinkClass,
  type VerificationBadgeSize,
} from '@/components/trust/verification-badge-styles';
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

function bbbVerifiedLabel(
  size: VerificationBadgeSize,
  rating: string | null,
  accredited: boolean
): string {
  if (size === 'compact') return 'BBB Verified';
  let label = 'BBB Verified';
  if (rating) label += ` ${rating}`;
  if (accredited) label += ' · Accredited';
  return label;
}

export function BbbVerificationBadge({
  company,
  className,
  status: statusOverride,
  size = 'profile',
  linkToLegend = true,
}: {
  company: Pick<Company, 'publicScrapeData'>;
  className?: string;
  status?: BbbVerificationStatus;
  size?: VerificationBadgeSize;
  linkToLegend?: boolean;
}) {
  const status = statusOverride ?? deriveBbbVerificationStatus(company.publicScrapeData);
  const { rating, accredited } = getBbbDisplayFromScrape(company.publicScrapeData);
  const iconClass = verificationBadgeIconClass(size);

  const verifiedTitle = [
    BBB_VERIFIED_TOOLTIP,
    rating ? `Rating: ${rating}` : null,
    accredited ? 'BBB Accredited' : null,
  ]
    .filter(Boolean)
    .join(' — ');

  const badge =
    status === 'verified' ? (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, 'success', className)}
        title={verifiedTitle}
      >
        <Award className={iconClass} aria-hidden="true" />
        {bbbVerifiedLabel(size, rating, accredited)}
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className={verificationBadgeClasses(size, 'muted', className)}
        title={BBB_UNVERIFIED_TOOLTIP}
      >
        <ShieldAlert className={iconClass} aria-hidden="true" />
        BBB Unverified
      </Badge>
    );

  if (!linkToLegend) return badge;

  const legendId = status === 'verified' ? 'bbb-verified' : 'bbb-unverified';

  return (
    <Link
      href={badgeLegendHref(legendId, true)}
      className={cn(verificationBadgeLinkClass(), 'hover:ring-1 hover:ring-primary/20 transition-shadow')}
      title={`${status === 'verified' ? verifiedTitle : BBB_UNVERIFIED_TOOLTIP} — see badge legend`}
      aria-label={
        status === 'verified'
          ? `${bbbVerifiedLabel(size, rating, accredited)}: ${verifiedTitle}`
          : `BBB Unverified: ${BBB_UNVERIFIED_TOOLTIP}`
      }
    >
      {badge}
    </Link>
  );
}