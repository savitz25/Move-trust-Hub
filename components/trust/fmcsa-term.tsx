'use client';

import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  FMCSA_ACRONYM_EXPANDED,
  FMCSA_GUIDE_HREF,
  FMCSA_PLAIN_ENGLISH,
  FMCSA_VERIFIED_TOOLTIP,
} from '@/lib/trust/fmcsa-consumer-copy';
import { HOW_WE_VET_HREF } from '@/lib/trust/vetting-criteria';
import { cn } from '@/lib/utils';

type FmcsaTermProps = {
  /** Visible label — default “FMCSA”. */
  label?: string;
  className?: string;
  /** Extra tooltip body beyond the plain-English definition. */
  detail?: string;
  showVetLink?: boolean;
};

/**
 * “FMCSA” with consumer plain-English popover — use next to badges and trust claims.
 */
export function FmcsaTerm({
  label = 'FMCSA',
  className,
  detail,
  showVetLink = true,
}: FmcsaTermProps) {
  const description = [FMCSA_ACRONYM_EXPANDED, FMCSA_PLAIN_ENGLISH, detail]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      <span className="font-medium">{label}</span>
      <InfoTooltip
        title="What is FMCSA?"
        description={description}
        learnMoreHref={showVetLink ? HOW_WE_VET_HREF : FMCSA_GUIDE_HREF}
        learnMoreLabel={showVetLink ? 'See how we vet movers →' : 'FMCSA guide →'}
        triggerLabel="What does FMCSA mean?"
      />
    </span>
  );
}

/** Compact helper for “FMCSA Verified” style claims. */
export function FmcsaVerifiedExplainer({ className }: { className?: string }) {
  return (
    <InfoTooltip
      title="FMCSA Verified"
      description={FMCSA_VERIFIED_TOOLTIP}
      learnMoreHref={HOW_WE_VET_HREF}
      learnMoreLabel="See how we vet movers →"
      triggerLabel="About FMCSA Verified"
      className={className}
    />
  );
}
