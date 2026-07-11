import Link from 'next/link';
import { Star, ShieldCheck, ChevronRight, Phone, ExternalLink } from 'lucide-react';
import type { DbLender } from '@/lib/lender/supabase/queries/lenders';
import { Badge } from '@/components/lender/ui/badge';
import {
  LENDER_DATA_FRESHNESS_NOTE,
  LENDER_TRANSPARENCY_DISCLAIMER,
} from '@/lib/lender/onboarding/transparency';

type Props = {
  lender: DbLender;
};

export function DbLenderProfile({ lender }: Props) {
  const countyLabel = `${lender.county} County, ${lender.state}`;
  const loanTypes = Array.isArray(lender.loan_types)
    ? (lender.loan_types as string[])
    : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/lender/" className="hover:text-[#3B82F6]">
              Home
            </Link>
          </li>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <li>
            <Link
              href={`/lender/local-lenders/${lender.state_slug}/${lender.county_slug}`}
              className="hover:text-[#3B82F6]"
            >
              {countyLabel}
            </Link>
          </li>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <li>
            <span className="text-[#0A2540]">{lender.name}</span>
          </li>
        </ol>
      </nav>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="trust-badge">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  NMLS Verified via Consumer Access
                </span>
                <Badge variant="outline">{lender.lender_type}</Badge>
              </div>
              <h1 className="text-3xl font-bold text-[#0A2540]">{lender.name}</h1>
              <p className="mt-1 text-zinc-500">
                {lender.city}, {lender.state} · NMLS #{lender.nmls_id}
              </p>
            </div>
            {lender.google_rating != null ? (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-lg font-semibold text-amber-700">
                <Star className="h-5 w-5 fill-current" aria-hidden="true" />
                {Number(lender.google_rating).toFixed(1)}
                <span className="text-sm font-normal text-zinc-500">
                  ({lender.review_count.toLocaleString()})
                </span>
              </div>
            ) : null}
          </div>

          {lender.short_description ? (
            <p className="mb-6 text-zinc-600 leading-relaxed">{lender.short_description}</p>
          ) : null}

          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-zinc-50 p-4 text-center">
              <div className="text-xl font-bold text-[#0A2540]">{lender.trust_score}/100</div>
              <div className="text-xs text-zinc-500">Trust Score</div>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4 text-center">
              <div className="text-xl font-bold text-[#0A2540]">
                {lender.county_experience_score}/100
              </div>
              <div className="text-xs text-zinc-500">County Experience</div>
            </div>
          </div>

          {loanTypes.length > 0 ? (
            <div className="mb-6">
              <h2 className="mb-2 font-semibold text-[#0A2540]">Loan Types</h2>
              <div className="flex flex-wrap gap-2">
                {loanTypes.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-6 grid gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-sm sm:grid-cols-2">
            {lender.bbb_rating ? (
              <div>
                <strong>BBB Rating:</strong> {lender.bbb_rating}
              </div>
            ) : null}
            <div>
              <strong>CFPB Complaints:</strong> {lender.cfpb_complaints}
            </div>
            {lender.google_rating != null ? (
              <div>
                <strong>Google Rating:</strong> {lender.google_rating}/5
              </div>
            ) : null}
          </div>

          <aside className="mb-6 rounded-lg border border-amber-200/70 bg-amber-50/40 px-4 py-3 text-xs text-zinc-600 leading-relaxed">
            <p className="font-medium text-[#0A2540] mb-1">Transparency</p>
            <p>{lender.transparency_note ?? LENDER_TRANSPARENCY_DISCLAIMER}</p>
            <p className="mt-2">{lender.data_freshness_note ?? LENDER_DATA_FRESHNESS_NOTE}</p>
            {lender.zero_paid_placement ? (
              <p className="mt-2 font-medium">Zero paid placement — listings are not for sale.</p>
            ) : null}
          </aside>

          <div className="flex flex-wrap gap-3">
            {lender.phone ? (
              <a
                href={`tel:${lender.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A2540]/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {lender.phone}
              </a>
            ) : null}
            {lender.website ? (
              <a
                href={lender.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-5 py-2.5 text-sm font-semibold text-[#0A2540] hover:bg-zinc-50"
              >
                Visit Website <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}