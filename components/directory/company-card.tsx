'use client';

import Link from 'next/link';
import type { Company } from '@/types';
import { Card } from '@/components/ui/card';
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
import { CompanyCardActions } from '@/components/directory/company-card-actions';

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
  const profileHref = profileReturnPath
    ? buildCompanyProfileHref(company.slug, profileReturnPath)
    : companyProfileHref(company);
  const foundedLabel = formatFoundedLabel(company.foundedYear);
  const locationLine = [formatCompanyHeadquarters(company.headquarters), foundedLabel]
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

      <CompanyCardActions
        company={company}
        profileHref={profileHref}
        reviewHref={reviewHref}
        compareStore={compareStore}
      />
    </Card>
  );
}
