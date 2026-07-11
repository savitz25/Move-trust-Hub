import { ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { NmlsSuggestionPreview } from '@/lib/lender/onboarding/types';
import { LENDER_NMLS_BADGE_LABEL } from '@/lib/lender/onboarding/transparency';

type Props = {
  preview: NmlsSuggestionPreview;
};

export function NmlsReadonlyFields({ preview }: Props) {
  return (
    <div className="rounded-xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-5 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="trust-badge">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          {LENDER_NMLS_BADGE_LABEL}
        </span>
        {preview.needsManualReview ? (
          <span className="text-xs rounded-full bg-amber-100 text-amber-800 px-2 py-0.5">
            Manual review flagged
          </span>
        ) : null}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#0A2540]">{preview.legalName}</h3>
        <p className="text-sm text-zinc-600 mt-1">NMLS #{preview.nmlsId}</p>
      </div>

      <dl className="grid sm:grid-cols-2 gap-3 text-sm">
        {preview.streetAddress ? (
          <>
            <dt className="text-zinc-500">Street Address</dt>
            <dd className="text-[#0A2540]">{preview.streetAddress}</dd>
          </>
        ) : null}
        {preview.city || preview.state ? (
          <>
            <dt className="text-zinc-500">Location</dt>
            <dd className="text-[#0A2540]">
              {[preview.city, preview.state, preview.zip].filter(Boolean).join(', ')}
            </dd>
          </>
        ) : null}
        {preview.phone ? (
          <>
            <dt className="text-zinc-500">Phone</dt>
            <dd className="text-[#0A2540]">{preview.phone}</dd>
          </>
        ) : null}
        {preview.website ? (
          <>
            <dt className="text-zinc-500">Website</dt>
            <dd className="text-[#0A2540] break-all">{preview.website}</dd>
          </>
        ) : null}
        {preview.businessEmail ? (
          <>
            <dt className="text-zinc-500">Business Email</dt>
            <dd className="text-[#0A2540]">{preview.businessEmail}</dd>
          </>
        ) : null}
        {preview.dateFormed ? (
          <>
            <dt className="text-zinc-500">Date Formed</dt>
            <dd className="text-[#0A2540]">{preview.dateFormed}</dd>
          </>
        ) : null}
      </dl>

      {preview.licenses.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">
            State licenses ({preview.licenses.length})
          </p>
          <ul className="text-xs space-y-1 max-h-32 overflow-y-auto">
            {preview.licenses.slice(0, 8).map((lic) => (
              <li key={`${lic.state}-${lic.licenseName}`} className="text-zinc-700">
                {lic.state} · {lic.licenseName}
                {lic.authorized ? ' · Authorized' : lic.status ? ` · ${lic.status}` : ''}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        href={preview.nmlsRecordUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-[#3B82F6] hover:underline"
      >
        View official NMLS record
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}