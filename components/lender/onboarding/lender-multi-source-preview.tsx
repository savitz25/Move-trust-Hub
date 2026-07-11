import { Star, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { EnrichedLenderPreview } from '@/lib/lender/onboarding/types';
import { NmlsReadonlyFields } from '@/components/lender/onboarding/nmls-readonly-fields';
import { LENDER_TRANSPARENCY_DISCLAIMER } from '@/lib/lender/onboarding/transparency';

type Props = {
  preview: EnrichedLenderPreview;
};

export function LenderMultiSourcePreview({ preview }: Props) {
  const { google, publicScrape, cfpb } = preview;

  return (
    <div className="space-y-4">
      <NmlsReadonlyFields preview={preview.nmls} />

      <div className="grid sm:grid-cols-2 gap-3">
        {google?.status === 'ok' ? (
          <div className="rounded-lg border p-4">
            <p className="text-xs font-semibold uppercase text-zinc-500 mb-2">
              Google · Supplemental
            </p>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-[#0A2540]">{google.rating?.toFixed(1)}</span>
              <span className="text-sm text-zinc-500">
                ({google.review_count?.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-4 text-sm text-zinc-500">
            Google Places data unavailable
          </div>
        )}

        {publicScrape?.bbb_rating ? (
          <div className="rounded-lg border p-4">
            <p className="text-xs font-semibold uppercase text-zinc-500 mb-2">
              BBB · Public scrape
            </p>
            <p className="font-semibold text-[#0A2540]">BBB {publicScrape.bbb_rating}</p>
            {publicScrape.bbb_review_count ? (
              <p className="text-sm text-zinc-500">{publicScrape.bbb_review_count} reviews</p>
            ) : null}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-4 text-sm text-zinc-500">
            BBB data not confirmed
          </div>
        )}
      </div>

      {cfpb ? (
        <div className="rounded-lg border p-4">
          <p className="text-xs font-semibold uppercase text-zinc-500 mb-1">CFPB Complaints</p>
          <p className="text-sm text-[#0A2540]">
            {cfpb.complaintCount.toLocaleString()} complaints on file
            {cfpb.status === 'error' ? ' (lookup partial)' : ''}
          </p>
        </div>
      ) : null}

      <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 text-sm">
        <p className="font-medium text-[#0A2540] flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          County experience score: {preview.countyExperienceScore}/100
        </p>
        <p className="text-xs text-zinc-600 mt-1">
          Based on licensing breadth, location match, Google rating, and CFPB signals.
        </p>
      </div>

      <aside className="rounded-lg border border-amber-200/70 bg-amber-50/40 px-4 py-3 text-xs text-zinc-600 leading-relaxed">
        <p className="font-medium text-[#0A2540] flex items-center gap-1 mb-1">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          Transparency notice
        </p>
        {LENDER_TRANSPARENCY_DISCLAIMER}
      </aside>
    </div>
  );
}