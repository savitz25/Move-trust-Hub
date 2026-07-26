import { memo } from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, ExternalLink, MapPin } from 'lucide-react';
import { Badge } from '@/components/lender/ui/badge';
import { Button } from '@/components/lender/ui/button';
import { Card } from '@/components/lender/ui/card';
import type { Lender } from '@/lib/lender/mockData';
import { mergeLenderWithEnrichment, type EnrichedLender } from '@/lib/lender/enrichment/merge';
import { buildLenderProfileHref } from '@/lib/lender/lender-profile-links';

function toEnrichedLender(lender: Lender | EnrichedLender): EnrichedLender {
  return 'isEnriched' in lender ? lender : mergeLenderWithEnrichment(lender);
}

export const LenderCard = memo(function LenderCard({
  lender: lenderInput,
  rank,
  countyLabel,
  profileReturnPath,
}: {
  lender: Lender | EnrichedLender;
  /** Optional rank badge (county lists / progressive reveal). */
  rank?: number;
  countyLabel?: string;
  /** When set, profile links include a return path back to search results. Must start with /lender. */
  profileReturnPath?: string;
}) {
  const lender = toEnrichedLender(lenderInput);
  const profileHref = buildLenderProfileHref(lender.slug, profileReturnPath);
  const locationLine = [
    lender.city,
    lender.state,
    countyLabel ? `Serves ${countyLabel}` : `${lender.county} County`,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <Card
      id={`lender-${lender.id}`}
      aria-label={`${rank != null ? `#${rank} ` : ''}${lender.name} — mortgage ${lender.type.toLowerCase()}${countyLabel ? ` in ${countyLabel}` : ''}`}
      className="group flex h-full flex-col overflow-hidden transition-colors hover:border-[#3B82F6]/40"
    >
      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-1.5">
          <div className="flex items-start gap-2">
            {rank != null ? (
              <span
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0A2540]/10 text-xs font-bold text-[#0A2540]"
                aria-hidden="true"
              >
                {rank}
              </span>
            ) : null}
            <div className="min-w-0 flex-1">
              <Link
                href={profileHref}
                className="block text-xl font-semibold tracking-tight text-[#0A2540] transition-colors group-hover:text-[#3B82F6]"
              >
                {lender.name}
              </Link>
              <p className="mt-0.5 flex items-start gap-1 text-sm text-zinc-500">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{locationLine}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <Badge variant="outline" className="text-xs">
              {lender.type}
            </Badge>
            {lender.nmlsVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                NMLS Verified
              </span>
            ) : null}
            {lender.bbbRating ? (
              <span className="rounded-full bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600">
                BBB {lender.bbbRating}
                {lender.bbbAccredited ? ' · Accredited' : ''}
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            {lender.rating.toFixed(1)}
          </span>
          <span className="text-xs text-zinc-500">
            ({lender.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-zinc-600">{lender.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Loan types offered">
          {lender.loanTypes.slice(0, 4).map((type) => (
            <Badge key={type} variant="default" className="text-xs">
              {type}
            </Badge>
          ))}
          {lender.specialties.slice(0, 1).map((specialty) => (
            <Badge key={specialty} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-zinc-500">
          <div>
            <dt className="font-medium text-[#0A2540]">NMLS</dt>
            <dd className="tabular-nums">{lender.nmlsId}</dd>
          </div>
          <div>
            <dt className="font-medium text-[#0A2540]">Trust Score</dt>
            <dd className="tabular-nums">{lender.trustScore}/100</dd>
          </div>
          <div>
            <dt className="font-medium text-[#0A2540]">County Exp.</dt>
            <dd className="tabular-nums">{lender.countyExperienceScore}/100</dd>
          </div>
          <div>
            <dt className="font-medium text-[#0A2540]">Avg Close</dt>
            <dd className="tabular-nums">{lender.avgCloseDays} days</dd>
          </div>
        </dl>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-zinc-100 bg-zinc-50/60 px-5 py-3.5">
        <Link href={profileHref} className="min-w-0 flex-1 sm:flex-none">
          <Button size="sm" variant="default" className="w-full sm:w-auto">
            View Profile
          </Button>
        </Link>
        {lender.website ? (
          <a
            href={lender.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button size="sm" variant="outline" className="gap-1">
              Website
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Button>
          </a>
        ) : null}
        <Link href="/lender/compare" className="ml-auto hidden sm:inline-flex">
          <Button size="sm" variant="ghost">
            Compare
          </Button>
        </Link>
      </div>
    </Card>
  );
});
