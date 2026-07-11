import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { reviewHighlights } from '@/lib/trust/trust-data';
import { MethodologyLink } from '@/components/trust/methodology-link';
import { cn } from '@/lib/utils';

type ReviewHighlightsProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
};

export function ReviewHighlights({
  title = 'Top-Rated Interstate Movers',
  subtitle = 'Highlighted companies with attributable on-site Google reviews, reputation scores, and FMCSA data you can check yourself.',
  className,
  compact = false,
}: ReviewHighlightsProps) {
  return (
    <section className={cn('container mx-auto px-4', className)} aria-labelledby="review-highlights-heading">
      <div className={cn('mb-8', compact ? 'text-left' : 'text-center max-w-2xl mx-auto')}>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium mb-3">
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Directory Highlights
        </div>
        <h2 id="review-highlights-heading" className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {reviewHighlights.map((company, index) => (
          <Link
            key={company.slug}
            href={`/companies/${company.slug}`}
            className="group rounded-xl border bg-card p-5 shadow-sm hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {company.companyName}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{company.source}</p>
              </div>
              <Badge variant="secondary" className="shrink-0 text-[10px]">
                #{index + 1}
              </Badge>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={company.rating} />
              <span className="text-sm text-muted-foreground">
                ({company.attributableOnSite} attributed on-site)
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {company.highlight}
            </p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Reputation:{' '}
                <MethodologyLink anchor="reputationScore" className="font-semibold text-primary">
                  {company.reputationScore}/100
                </MethodologyLink>
              </span>
              <span className="inline-flex items-center gap-1 text-primary font-medium group-hover:underline">
                View profile <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/companies?sort=reputation"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Browse all movers by reputation score <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}