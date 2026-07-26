'use client';

import { CalcDisclaimer } from '@/components/lender/calculators/shared/CalcDisclaimer';
import { CalcMatchCTA } from '@/components/lender/calculators/shared/CalcMatchCTA';
import type { CalcMatchProfile } from '@/lib/lender/calculators/match-profile';

/** Wraps legacy calculator components with unified disclaimer + match CTA */
export function LegacyCalcWrapper({
  children,
  matchProfile,
  matchLabel,
}: {
  children: React.ReactNode;
  matchProfile?: CalcMatchProfile;
  matchLabel?: string;
}) {
  return (
    <div className="space-y-0 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
        <CalcDisclaimer />
      </div>
      <div className="bg-white">{children}</div>
      {matchProfile && (
        <div className="border-t border-[#E5E7EB] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] p-4 md:p-6">
          <CalcMatchCTA profile={matchProfile} label={matchLabel} />
        </div>
      )}
    </div>
  );
}
