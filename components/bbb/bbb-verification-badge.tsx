import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';
import type { Company } from '@/types';
import {
  deriveBbbVerificationStatus,
  getBbbDisplayFromScrape,
  type BbbVerificationStatus,
} from '@/lib/trust/verification-status';
import { badgeLegendHref } from '@/lib/trust/methodology-paths';
import {
  verificationBadgeClasses,
  verificationBadgeIconClass,
  verificationBadgeLinkClass,
  type VerificationBadgeSize,
} from '@/components/trust/verification-badge-styles';
import { cn } from '@/lib/utils';

const BBB_VERIFIED_TOOLTIP =
  'Confirmed BBB business listing from our most recent public scrape or BBB API check.';

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
  // Never render “BBB Unverified” on public listings — omit badge when no confirmed listing.
  if (status !== 'verified') return null;

  const { rating, accredited } = getBbbDisplayFromScrape(company.publicScrapeData);
  const iconClass = verificationBadgeIconClass(size);

  const verifiedTitle = [
    BBB_VERIFIED_TOOLTIP,
    rating ? `Rating: ${rating}` : null,
    accredited ? 'BBB Accredited' : null,
  ]
    .filter(Boolean)
    .join(' — ');

  const badge = (
    <Badge
      variant="outline"
      className={verificationBadgeClasses(size, 'success', className)}
      title={verifiedTitle}
    >
      <Award className={iconClass} aria-hidden="true" />
      {bbbVerifiedLabel(size, rating, accredited)}
    </Badge>
  );

  if (!linkToLegend) return badge;

  return (
    <Link
      href={badgeLegendHref('bbb-verified', true)}
      className={cn(verificationBadgeLinkClass(), 'hover:ring-1 hover:ring-primary/20 transition-shadow')}
      title={`${verifiedTitle} — see badge legend`}
      aria-label={`${bbbVerifiedLabel(size, rating, accredited)}: ${verifiedTitle}`}
    >
      {badge}
    </Link>
  );
}