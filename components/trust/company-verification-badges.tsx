import type { Company } from '@/types';
import { DirectoryVerifiedBadge } from '@/components/trust/directory-verified-badge';
import { FmcsaVerificationBadge } from '@/components/fmcsa/fmcsa-verification-badge';
import { BbbVerificationBadge } from '@/components/bbb/bbb-verification-badge';
import { getCompanyVerificationStatus } from '@/lib/trust/verification-status';
import type { VerificationBadgeSize } from '@/components/trust/verification-badge-styles';
import { cn } from '@/lib/utils';

type CompanyVerificationBadgesProps = {
  company: Company;
  /** @deprecated Use size="compact" */
  compact?: boolean;
  size?: VerificationBadgeSize;
  linkToLegend?: boolean;
  className?: string;
};

/**
 * Renders Directory, FMCSA, and BBB badges from the verification SSOT.
 * Use on company cards, directory listings, and profile headers.
 */
export function CompanyVerificationBadges({
  company,
  compact = false,
  size,
  linkToLegend = true,
  className,
}: CompanyVerificationBadgesProps) {
  const resolvedSize: VerificationBadgeSize = size ?? (compact ? 'compact' : 'profile');
  const status = getCompanyVerificationStatus(company);
  const showDirectory = status.directoryVerified;
  const showFmcsa = status.fmcsa !== null;
  const showBbb = true;

  if (!showDirectory && !showFmcsa && !showBbb) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-1', className)}>
      {showDirectory ? (
        <DirectoryVerifiedBadge size={resolvedSize} linkToLegend={linkToLegend} />
      ) : null}
      {showFmcsa ? (
        <FmcsaVerificationBadge
          company={company}
          linkToLegend={linkToLegend}
          size={resolvedSize}
          status={status.fmcsa ?? undefined}
        />
      ) : null}
      {showBbb ? (
        <BbbVerificationBadge
          company={company}
          linkToLegend={linkToLegend}
          size={resolvedSize}
          status={status.bbb}
        />
      ) : null}
    </div>
  );
}