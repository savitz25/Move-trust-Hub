'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/lender/ui/card';
import { CalcDisclaimer } from './CalcDisclaimer';
import { CalcMatchCTA } from './CalcMatchCTA';
import type { CalcMatchProfile } from '@/lib/lender/calculators/match-profile';

interface CalcShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  matchProfile?: CalcMatchProfile;
  matchLabel?: string;
  actions?: React.ReactNode;
  onPreset?: () => void;
  presetLabel?: string;
}

export function CalcShell({
  title,
  subtitle,
  children,
  matchProfile,
  matchLabel,
  actions,
  onPreset,
  presetLabel,
}: CalcShellProps) {
  return (
    <Card className="overflow-hidden border-[#E5E7EB] bg-white shadow-sm">
      <CardHeader className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl text-[#111827] md:text-2xl">{title}</CardTitle>
            <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {onPreset && (
              <button
                type="button"
                onClick={onPreset}
                className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-semibold text-[#374151] shadow-sm hover:border-[#3B82F6] hover:text-[#1D4ED8]"
              >
                {presetLabel ?? 'Example Preset'}
              </button>
            )}
            {actions}
          </div>
        </div>
        <CalcDisclaimer className="mt-3" />
      </CardHeader>
      <CardContent className="space-y-6 bg-white p-4 md:p-6">{children}</CardContent>
      {matchProfile && (
        <div className="border-t border-[#E5E7EB] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] p-4 md:p-6">
          <CalcMatchCTA profile={matchProfile} label={matchLabel} />
        </div>
      )}
    </Card>
  );
}
