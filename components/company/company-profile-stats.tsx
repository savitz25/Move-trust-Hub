import type { Company } from '@/types';
import { Card } from '@/components/ui/card';
import { MetricLabel } from '@/components/trust/metric-label';
import {
  formatComplaintEvidenceLabel,
  formatFmcsaSafetyLabel,
  getComplaintEvidence,
  NORMALIZED_COMPLAINT_RATE_UNAVAILABLE_NOTE,
  PROFILE_METRIC_TOOLTIPS,
} from '@/lib/trust/profile-metrics';
import { normalizeServiceTags } from '@/lib/data-quality/display-normalize';
import { ShieldCheck } from 'lucide-react';

type CompanyProfileStatsProps = {
  company: Company;
  variant?: 'move' | 'auto-transport';
};

/**
 * MOVE-PROFILE-V3-001A: regulatory/evidence stats only. The unattributed
 * blended star rating, the 0-100 directory composite score, and estimated
 * price/price tier were removed from public render here (opaque composite
 * scoring and unattributed pricing with no defensible current methodology
 * — see docs/MOVE-PROFILE-V3-001A-*.md). Data is preserved in storage;
 * this component simply stops rendering those fields.
 */
export function CompanyProfileStats({ company }: CompanyProfileStatsProps) {
  const complaintEvidence = getComplaintEvidence(company);
  const services = normalizeServiceTags(company.services as string[]);

  return (
    <section
      aria-label="Regulatory evidence stats"
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
    >
      <Card className="p-4 flex flex-col gap-1">
        <MetricLabel
          label="FMCSA safety rating"
          tooltip={PROFILE_METRIC_TOOLTIPS.fmcsaSafety}
        />
        <p className="text-2xl font-semibold mt-1 leading-none">
          {formatFmcsaSafetyLabel(company.fmcsaSafetyRating)}
        </p>
      </Card>

      {complaintEvidence.status === 'recorded' ? (
        <Card className="p-4 flex flex-col gap-1">
          <MetricLabel
            label="FMCSA complaints"
            tooltip={PROFILE_METRIC_TOOLTIPS.complaintEvidence}
          />
          <p className="text-2xl font-semibold mt-1 tabular-nums leading-none">
            {complaintEvidence.complaints.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground leading-snug">
            {formatComplaintEvidenceLabel(complaintEvidence)}
          </p>
          <p className="text-[11px] text-muted-foreground leading-snug mt-2 pt-2 border-t">
            <span className="font-medium text-foreground">Normalized complaint rate</span>
            <br />
            {NORMALIZED_COMPLAINT_RATE_UNAVAILABLE_NOTE}
          </p>
        </Card>
      ) : null}

      <Card className="p-4 flex flex-col gap-1">
        <MetricLabel label="Service coverage" tooltip={PROFILE_METRIC_TOOLTIPS.coverage} />
        <p className="font-semibold mt-1 leading-snug">{company.coverage}</p>
        {services.length > 0 ? (
          <p className="text-[11px] text-emerald-700 flex items-start gap-1 leading-snug">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{services.join(' · ')}</span>
          </p>
        ) : null}
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
