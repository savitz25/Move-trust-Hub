'use client';

import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import type { Company } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';
import {
  companyProfileHref,
  formatCompanyHeadquarters,
  formatFoundedLabel,
  normalizeCompanyForDisplay,
} from '@/lib/directory/normalize-company';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';
import { MethodologyLink } from '@/components/trust/methodology-link';
import { MoverEmailButton } from '@/components/save-my-move/mover-email-button';
import { SaveMoverButton } from '@/components/save-my-move/save-mover-button';
import { ClaimProfileCta } from '@/components/portal/claim-cta';

type CompareStore = {
  isSelected: (slug: string) => boolean;
  canAddMore: () => boolean;
  toggleCompany: (company: Company) => void;
};

type Props = {
  company: Company;
  compareStore: CompareStore;
  /** When set, profile links return to this page (e.g. county directory). */
  profileReturnPath?: string;
};

export function CompanyCard({ company: rawCompany, compareStore, profileReturnPath }: Props) {
  const company = normalizeCompanyForDisplay(rawCompany);
  const isSelected = compareStore.isSelected(company.slug);
  const canAdd = compareStore.canAddMore();
  const profileHref = profileReturnPath
    ? buildCompanyProfileHref(company.slug, profileReturnPath)
    : companyProfileHref(company);
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
        <div className="space-y-1.5">
          <Link
            href={profileHref}
            className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors block"
          >
            {company.name}
          </Link>
          <CompanyVerificationBadges company={company} size="compact" className="justify-start" />
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

      <div className="border-t px-5 py-3.5 bg-muted/20 space-y-2">
        <div className="flex items-center justify-between text-sm gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="min-w-0">
              <MethodologyLink anchor="reputationScore" className="font-semibold tabular-nums no-underline">
                {company.reputationScore}
              </MethodologyLink>
              <span className="text-muted-foreground"> rep</span>
            </div>
            <MoverEmailButton companySlug={company.slug} companyName={company.name} />
          </div>
          <div className="flex gap-2 shrink-0 items-center">
            <SaveMoverButton companySlug={company.slug} companyName={company.name} />
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
        <ClaimProfileCta companySlug={company.slug} variant="card" />
      </div>
    </Card>
  );
}