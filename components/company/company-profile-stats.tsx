import type { Company } from '@/types';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { MetricLabel } from '@/components/trust/metric-label';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import {
  formatComplaintRatio,
  formatFmcsaSafetyLabel,
  PROFILE_METRIC_TOOLTIPS,
} from '@/lib/trust/profile-metrics';
import { MethodologyLink } from '@/components/trust/methodology-link';
import { ShieldCheck } from 'lucide-react';

type CompanyProfileStatsProps = {
  company: Company;
  variant?: 'move' | 'auto-transport';
};

export function CompanyProfileStats({ company, variant = 'move' }: CompanyProfileStatsProps) {
  const complaintRatio = formatComplaintRatio(company);
  const priceLabel =
    variant === 'auto-transport'
      ? 'Est. avg. price (open carrier)'
      : 'Est. avg. price (3BR, cross-country)';
  const priceTooltip =
    variant === 'auto-transport'
      ? PROFILE_METRIC_TOOLTIPS.avgPriceAuto
      : PROFILE_METRIC_TOOLTIPS.avgPriceMove;

  return (
    <section aria-label="Company profile statistics" className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
      <Card className="p-4 flex flex-col gap-1">
        <MetricLabel
          label="Editorial star rating"
          tooltip={PROFILE_METRIC_TOOLTIPS.overallRating}
          methodologyAnchor="reviewAttribution"
        />
        <div className="flex items-baseline gap-2 mt-1">
          <StarRating rating={company.overallRating} size="lg" />
          <span className="text-xs text-muted-foreground leading-snug">
            based on <EditorialReviewVolume count={company.reviewCount} />
          </span>
        </div>
      </Card>

      <Card className="p-4 flex flex-col gap-1">
        <MetricLabel
          label="Reputation score"
          tooltip={PROFILE_METRIC_TOOLTIPS.reputationScore}
          methodologyAnchor="reputationScore"
        />
        <p className="text-3xl font-semibold mt-1 tabular-nums text-primary leading-none">
          <MethodologyLink anchor="reputationScore" className="no-underline hover:text-primary">
            {company.reputationScore}
          </MethodologyLink>
          <span className="text-lg font-normal text-muted-foreground"> / 100</span>
        </p>
        <p className="text-[11px] text-muted-foreground leading-snug">Directory composite score</p>
      </Card>

      <Card className="p-4 flex flex-col gap-1">
        <MetricLabel label={priceLabel} tooltip={priceTooltip} />
        <p className="text-3xl font-semibold mt-1 tabular-nums leading-none">
          ${company.avgPricePerMove.toLocaleString()}
        </p>
        <p className="text-[11px] text-muted-foreground leading-snug">
          Price tier: {company.priceRange || 'Not listed'}
        </p>
      </Card>

      <Card className="p-4 flex flex-col gap-1">
        <MetricLabel
          label="FMCSA complaint ratio"
          tooltip={PROFILE_METRIC_TOOLTIPS.complaintRatio}
        />
        <p className="text-3xl font-semibold mt-1 tabular-nums leading-none">{complaintRatio}</p>
        <p className="text-[11px] text-muted-foreground leading-snug">
          complaints per 1,000 shipments ({company.fmcsaComplaints.toLocaleString()} on{' '}
          {company.fmcsaShipments.toLocaleString()} shipments)
        </p>
      </Card>

      <Card className="p-4 flex flex-col gap-1 md:col-span-1 col-span-2">
        <MetricLabel label="Service coverage" tooltip={PROFILE_METRIC_TOOLTIPS.coverage} />
        <p className="font-semibold mt-1 leading-snug">{company.coverage}</p>
        <p className="text-[11px] text-emerald-700 flex items-start gap-1 leading-snug">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{company.services.join(' · ')}</span>
        </p>
      </Card>
    </section>
  );
}

export function FmcsaSafetyMetric({ rating }: { rating: Company['fmcsaSafetyRating'] }) {
  return (
    <div>
      <MetricLabel
        label="FMCSA safety rating"
        tooltip={PROFILE_METRIC_TOOLTIPS.fmcsaSafety}
      />
      <p className="font-medium mt-1">{formatFmcsaSafetyLabel(rating)}</p>
      {rating === 'Not Rated' ? (
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
          No federal safety rating on file — check the official SAFER record before booking.
        </p>
      ) : null}
    </div>
  );
}