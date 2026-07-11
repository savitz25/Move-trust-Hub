import Link from 'next/link';
import { Star, ShieldCheck, AlertTriangle, MapPin, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/lender/ui/badge';
import type { EnrichedLender } from '@/lib/lender/enrichment/merge';

type Props = {
  lender: EnrichedLender;
  className?: string;
};

function formatEnrichedDate(iso?: string): string | null {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return null;
  }
}

export function LenderTrustSignals({ lender, className = '' }: Props) {
  const enrichedDate = formatEnrichedDate(lender.enrichedAt);
  const payload = lender.enrichment?.enrichment_json;
  const yearsInBusiness = payload?.years_in_business;

  return (
    <section
      className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm ${className}`}
      aria-labelledby="lender-trust-signals-heading"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="lender-trust-signals-heading" className="text-xl font-semibold text-[#0A2540]">
          Trust Signals
        </h2>
        {lender.isEnriched ? (
          <Badge variant="outline" className="text-xs">
            Verified summary{lender.enrichedAt ? ` · ${enrichedDate}` : ''}
          </Badge>
        ) : (
          <Badge variant="outline" className="text-xs text-zinc-500">
            Seed data — run enrichment for live signals
          </Badge>
        )}
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A2540]">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden="true" />
            Google Reviews
          </div>
          <p className="text-2xl font-bold text-amber-700">
            {lender.rating.toFixed(1)}
            <span className="text-sm font-normal text-zinc-500">
              {' '}
              / 5 · {lender.reviewCount.toLocaleString()} reviews
            </span>
          </p>
          {lender.googleReviewSnippets.length > 0 ? (
            <ul className="mt-3 space-y-2 border-t border-amber-200/40 pt-3 text-xs text-zinc-600">
              {lender.googleReviewSnippets.slice(0, 3).map((snippet, i) => (
                <li key={i}>
                  <span className="font-medium text-[#0A2540]">{snippet.rating}★</span>
                  {snippet.author ? ` · ${snippet.author}` : ''}
                  {snippet.relative_time ? ` · ${snippet.relative_time}` : ''}
                  <p className="mt-0.5 line-clamp-2">{snippet.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-2 text-[10px] text-zinc-400">Google Places API · supplemental</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A2540]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            BBB Profile
          </div>
          <p className="text-lg font-bold text-[#0A2540]">
            {lender.bbbRating}
            {lender.bbbAccredited ? (
              <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Accredited
              </span>
            ) : null}
          </p>
          {payload?.bbb?.bbb_profile_url ? (
            <a
              href={payload.bbb.bbb_profile_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#3B82F6] hover:underline"
            >
              View BBB profile <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : null}
          <p className="mt-2 text-[10px] text-zinc-400">Public BBB data · confirm independently</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A2540]">
            <AlertTriangle className="h-4 w-4 text-orange-500" aria-hidden="true" />
            CFPB Complaints
          </div>
          <p className="text-2xl font-bold text-[#0A2540]">
            {lender.cfpbComplaints.toLocaleString()}
            <span className="text-sm font-normal text-zinc-500"> total</span>
          </p>
          {lender.cfpbRecentIssues.length > 0 ? (
            <ul className="mt-2 list-inside list-disc text-xs text-zinc-600">
              {lender.cfpbRecentIssues.slice(0, 3).map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-zinc-500">No recent complaint themes returned.</p>
          )}
          <p className="mt-2 text-[10px] text-zinc-400">CFPB public complaint database</p>
        </div>

        <div className="rounded-xl border border-blue-200/60 bg-blue-50/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#0A2540]">
            <MapPin className="h-4 w-4 text-[#3B82F6]" aria-hidden="true" />
            County Experience
          </div>
          <p className="text-2xl font-bold text-[#0A2540]">
            {lender.countyExperienceScore}
            <span className="text-sm font-normal text-zinc-500"> / 100</span>
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            Local presence in {lender.county} County, {lender.state} based on ZIP coverage, Google
            locality, BBB listing, and tenure signals.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-sm text-zinc-600">
        <p className="font-semibold text-[#0A2540]">Verification summary</p>
        <ul className="mt-2 space-y-1 text-xs">
          <li>
            <strong>NMLS #{lender.nmlsId}</strong> — verify at{' '}
            <a
              href="https://www.nmlsconsumeraccess.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82F6] hover:underline"
            >
              NMLS Consumer Access
            </a>
          </li>
          {yearsInBusiness != null ? (
            <li>
              <strong>Years in business (BBB):</strong> ~{yearsInBusiness}+ years
            </li>
          ) : null}
          <li>
            <strong>Trust score:</strong> {lender.trustScore}/100 (weighted from ratings, BBB, CFPB,
            and county experience)
          </li>
        </ul>
      </div>

      <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
        Data aggregated from NMLS, CFPB, BBB, and Google for informational purposes only. Lender
        Trust Hub is not a lender or broker and does not provide financial advice.{' '}
        <Link href="/lender/about" className="text-[#3B82F6] hover:underline">
          Learn how we source data
        </Link>
        .
      </p>
    </section>
  );
}