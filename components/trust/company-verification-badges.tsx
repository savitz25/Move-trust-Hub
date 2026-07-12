import type { Company } from '@/types';
import { DirectoryVerifiedBadge } from '@/components/trust/directory-verified-badge';
import { FmcsaVerificationBadge } from '@/components/fmcsa/fmcsa-verification-badge';
import { BbbVerificationBadge } from '@/components/bbb/bbb-verification-badge';
import { getCompanyVerificationStatus } from '@/lib/trust/verification-status';
import { cn } from '@/lib/utils';

type CompanyVerificationBadgesProps = {
  company: Company;
  compact?: boolean;
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
  linkToLegend = true,
  className,
}: CompanyVerificationBadgesProps) {
  const status = getCompanyVerificationStatus(company);
  const showDirectory = status.directoryVerified;
  const showFmcsa = status.fmcsa !== null;
  const showBbb = true;

  if (!showDirectory && !showFmcsa && !showBbb) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap gap-1 justify-end', className)}>
      {showDirectory ? (
        <DirectoryVerifiedBadge compact={compact} linkToLegend={linkToLegend} />
      ) : null}
      {showFmcsa ? (
        <FmcsaVerificationBadge
          company={company}
          className={compact ? 'text-[10px] h-fit' : undefined}
          linkToLegend={linkToLegend}
          status={status.fmcsa ?? undefined}
        />
      ) : null}
      {showBbb ? (
        <BbbVerificationBadge
          company={company}
          className={compact ? 'text-[10px] h-fit' : undefined}
          linkToLegend={linkToLegend}
          status={status.bbb}
        />
      ) : null}
    </div>
  );
}