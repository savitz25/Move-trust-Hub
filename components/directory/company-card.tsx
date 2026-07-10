'use client';

import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import type { Company } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { FmcsaVerificationBadge } from '@/components/fmcsa/fmcsa-verification-badge';
import { BbbVerificationBadge } from '@/components/bbb/bbb-verification-badge';
import { canShowVerifiedBadge } from '@/lib/trust/company-display-policy';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import {
  companyProfileHref,
  formatAvgPricePerMove,
  formatCompanyHeadquarters,
  formatFoundedLabel,
  normalizeCompanyForDisplay,
} from '@/lib/directory/normalize-company';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';

type CompareStore = {
  isSelected: (slug: string) => boolean;
  canAddMore: () => boolean;
  toggleCompany: (company: Company) => void;
};

type Props = {
  company: Company;
  compareStore: CompareStore;
};

export function CompanyCard({ company: rawCompany, compareStore }: Props) {
  const company = normalizeCompanyForDisplay(rawCompany);
  const isSelected = compareStore.isSelected(company.slug);
  const canAdd = compareStore.canAddMore();
  const profileHref = companyProfileHref(company);
  const foundedLabel = formatFoundedLabel(company.foundedYear);
  const locationLine = [
    formatCompanyHeadquarters(company.headquarters),
    foundedLabel,
  ]
    .filter(Boolean)
    .join(' • ');

  const services = company.services.slice(0, 2);
  const specialties = company.specialties.slice(0, 1);

  const reviewHref = reviewUrlForDirectoryCompany({
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    slug: company.slug,
  });

  return (
    <Card className="company-card group overflow-hidden flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <Link
            href={profileHref}
            className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors"
          >
            {company.name}
          </Link>
          <div className="flex flex-wrap gap-1 justify-end">
            {canShowVerifiedBadge(company) ? (
              <Badge variant="success" className="text-[10px] h-fit">
                VERIFIED
              </Badge>
            ) : null}
            <FmcsaVerificationBadge company={company} className="text-[10px] h-fit" />
            <BbbVerificationBadge company={company} className="text-[10px] h-fit" />
          </div>
        </div>

        <div className="text-sm text-muted-foreground mt-1">{locationLine}</div>

        <div className="mt-3 flex items-baseline gap-2">
          <StarRating rating={company.overallRating} />
          <span
            className="text-xs text-muted-foreground"
            title="Industry-reported volume from third-party platforms"
          >
            (<EditorialReviewVolume count={company.reviewCount} />)
          </span>
        </div>

        <div className="mt-2 text-sm line-clamp-2 text-muted-foreground">
          {company.shortDescription}
        </div>

        {(services.length > 0 || specialties.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {services.map((s) => (
              <Badge key={s} variant="outline" className="text-xs">
                {s}
              </Badge>
            ))}
            {specialties.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="border-t px-5 py-3.5 bg-muted/20 flex items-center justify-between text-sm gap-3">
        <div className="min-w-0">
          <span className="font-semibold tabular-nums">{company.reputationScore}</span>
          <span className="text-muted-foreground">
            {' '}
            rep • {formatAvgPricePerMove(company.avgPricePerMove)}
          </span>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link href={reviewHref}>
            <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
              Review
            </Button>
          </Link>
          <Link href={profileHref}>
            <Button size="sm" variant="ghost" className="h-8 px-3">
              Details
            </Button>
          </Link>
          <Button
            size="sm"
            variant={isSelected ? 'default' : 'outline'}
            className="h-8 px-3 gap-1"
            onClick={() => compareStore.toggleCompany(company)}
            disabled={!isSelected && !canAdd}
          >
            {isSelected ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {isSelected ? 'Remove' : 'Compare'}
          </Button>
        </div>
      </div>
    </Card>
  );
}