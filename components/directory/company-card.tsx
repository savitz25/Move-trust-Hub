'use client';

import type { Company } from '@/types';
import { useRouter } from 'next/navigation';
import type { KeyboardEvent, MouseEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/star-rating';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import { CompanyVerificationBadges } from '@/components/trust/company-verification-badges';
import { EditorialReviewVolume } from '@/components/trust/editorial-review-volume';
import {
  buildCompanyProfileHref,
  storeCompanyReturnPath,
} from '@/lib/directory/profile-back-link';
import {
  formatCompanyHeadquarters,
  formatFoundedLabel,
  normalizeCompanyForDisplay,
} from '@/lib/directory/normalize-company';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';
import { CompanyCardActions } from '@/components/directory/company-card-actions';
import { CompanyProfileLink } from '@/components/directory/company-profile-link';
import { getAutoTransportEvidence } from '@/lib/directory/auto-transport-evidence';

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

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest(
      'a, button, input, select, textarea, label, [role="button"], [data-card-actions]'
    )
  );
}

export function CompanyCard({ company: rawCompany, compareStore, profileReturnPath }: Props) {
  const router = useRouter();
  const company = normalizeCompanyForDisplay(rawCompany);
  const profileHref = buildCompanyProfileHref(company.slug);
  const canOpenProfile = Boolean(company.slug?.trim()) && profileHref !== '/companies';

  const foundedLabel = formatFoundedLabel(company.foundedYear);
  const locationLine = [formatCompanyHeadquarters(company.headquarters), foundedLabel]
    .filter(Boolean)
    .join(' • ');

  const services = company.services.slice(0, 2);
  const specialties = company.specialties.slice(0, 1);
  const autoTransportEvidence = getAutoTransportEvidence(company.usdotNumber);

  const reviewHref = reviewUrlForDirectoryCompany({
    usdotNumber: company.usdotNumber,
    mcNumber: company.mcNumber,
    slug: company.slug,
  });

  const openProfile = () => {
    if (!canOpenProfile) return;
    if (profileReturnPath) storeCompanyReturnPath(profileReturnPath);
    router.push(profileHref);
  };

  const onBodyClick = (event: MouseEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(event.target)) return;
    openProfile();
  };

  const onBodyKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (isInteractiveTarget(event.target)) return;
    event.preventDefault();
    openProfile();
  };

  return (
    <Card className="company-card group overflow-hidden flex flex-col">
      <div
        className="p-5 flex-1 cursor-pointer"
        onClick={onBodyClick}
        onKeyDown={onBodyKeyDown}
        role="link"
        tabIndex={canOpenProfile ? 0 : undefined}
        aria-label={canOpenProfile ? `Open profile for ${company.name}` : undefined}
      >
        <div className="space-y-1.5">
          <CompanyProfileLink
            slug={company.slug}
            returnPath={profileReturnPath}
            className="font-semibold text-xl tracking-tight group-hover:text-primary transition-colors block"
          >
            {company.name}
          </CompanyProfileLink>
          <div className="flex flex-wrap items-center gap-1.5">
            <CompanyTypeBadges company={company} size="compact" />
            <CompanyVerificationBadges company={company} size="compact" className="justify-start" />
          </div>
        </div>

        <div className="text-sm text-muted-foreground mt-1">{locationLine}</div>

        <div className="mt-3 flex items-baseline gap-2">
          {company.overallRating > 0 ? (
            <>
              <StarRating rating={company.overallRating} />
              <span
                className="text-xs text-muted-foreground"
                title="Industry-reported volume from third-party platforms (e.g. Google). Not the same as on-site attributable reviews."
              >
                (<EditorialReviewVolume count={company.reviewCount} />)
              </span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Rating not available yet</span>
          )}
        </div>

        <div className="mt-2 text-sm line-clamp-2 text-muted-foreground">
          {company.shortDescription}
        </div>

        {(services.length > 0 || specialties.length > 0 || autoTransportEvidence) && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {autoTransportEvidence ? (
              <Badge
                variant="outline"
                className="text-xs"
                title="Self-reported MCS-150 cargo classification from the FMCSA Company Census File. This is not a recommendation or a service-territory guarantee."
              >
                FMCSA motor-vehicle cargo evidence
              </Badge>
            ) : null}
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
        profileReturnPath={profileReturnPath}
        reviewHref={reviewHref}
        compareStore={compareStore}
      />
    </Card>
  );
}
