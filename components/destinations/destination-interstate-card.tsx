import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';
import type { Company } from '@/types';

export function DestinationInterstateCard({
  company,
  rank,
  areaLabel,
  profileReturnPath,
}: {
  company: Company;
  rank: number;
  areaLabel: string;
  profileReturnPath?: string;
}) {
  const profileHref = buildCompanyProfileHref(company.slug, profileReturnPath);
  return (
    <article className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm hover:border-primary/30 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary"
            aria-hidden="true"
          >
            {rank}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight leading-tight">
              {company.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              <CompanyTypeBadges company={company} size="compact" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Serves {areaLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-sm font-semibold text-amber-700">
          <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          {company.overallRating.toFixed(1)}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {company.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="text-[10px] font-medium">
          Reputation {company.reputationScore}/100
        </Badge>
        <Badge variant="outline" className="text-[10px] font-medium">
          FMCSA Licensed
        </Badge>
      </div>

      <div className="flex gap-2">
        <Link
          href={profileHref}
          className="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          View Profile
        </Link>
        <Link
          href="/compare"
          className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-xs font-medium hover:border-primary/40 transition-colors"
        >
          Compare
          <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}