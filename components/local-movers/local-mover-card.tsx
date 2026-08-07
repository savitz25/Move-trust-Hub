import Link from 'next/link';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import type { LocalMover } from '@/lib/local-movers/types';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';
import { CompanyProfileLink } from '@/components/directory/company-profile-link';
import { predictCompanyProfileSlug } from '@/lib/directory/slug-resolution';
import { getLicenseDisplay } from '@/lib/trust/company-display-policy';
import { assessLicense } from '@/lib/trust/license-verification';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';
import { sanitizeMoverDescription } from '@/lib/local-movers/sanitize-mover-description';
import { classifyMoverLocality } from '@/lib/local-movers/locality-rules';
import {
  normalizeServiceTags,
  normalizeSpecialtyTags,
} from '@/lib/data-quality/display-normalize';
import type { LocalCounty } from '@/lib/local-movers/types';

export function LocalMoverCard({
  mover,
  rank,
  countyLabel,
  stateCode,
  county,
  profileReturnPath,
}: {
  mover: LocalMover;
  rank: number;
  countyLabel?: string;
  /** Page county state — used only for "Serves …" context, never as HQ state. */
  stateCode?: string;
  /** When provided, locality badges use Phase 1 distance/adjacency rules. */
  county?: Pick<LocalCounty, 'slug' | 'name' | 'stateCode' | 'stateSlug' | 'seat'>;
  /** When set, profile links return to this page (e.g. county directory). */
  profileReturnPath?: string;
}) {
  const hasDirectoryProfile =
    Boolean(mover.profileSlug) ||
    assessLicense(mover.usdotNumber, mover.mcNumber).isDisplayable;
  const profileSlug =
    mover.profileSlug ||
    (hasDirectoryProfile
      ? predictCompanyProfileSlug({ name: mover.name, usdot: mover.usdotNumber })
      : '');
  const profileHref = profileSlug
    ? buildCompanyProfileHref(profileSlug, profileReturnPath)
    : null;

  const license = getLicenseDisplay(mover);
  const hqState = mover.headquartersState?.toUpperCase();
  // Never stamp the page county's state onto an out-of-state HQ city.
  const locationLine = [
    mover.city || undefined,
    hqState || undefined,
    countyLabel ? `Serves ${countyLabel}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  const hasReviewBasis = (mover.reviewCount ?? 0) > 0 && (mover.rating ?? 0) > 0;
  const isUnratedVerified = !hasReviewBasis && license.status === 'verified';

  return (
    <article
      id={`mover-${mover.id}`}
      aria-label={`#${rank} ${mover.name}${countyLabel ? ` serving ${countyLabel}` : ''}`}
      className="rounded-2xl border bg-card p-5 sm:p-6 shadow-sm hover:border-primary/30 transition-colors"
    >
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
              {profileSlug && profileHref ? (
                <CompanyProfileLink
                  slug={profileSlug}
                  returnPath={profileReturnPath}
                  className="hover:text-primary transition-colors"
                >
                  {mover.name}
                </CompanyProfileLink>
              ) : (
                mover.name
              )}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              {mover.recentlyAdded ? (
                <Badge className="text-[10px] font-semibold bg-emerald-600 hover:bg-emerald-600">
                  Recently added
                </Badge>
              ) : null}
              {(() => {
                if (county) {
                  const locality = classifyMoverLocality(mover, county as LocalCounty);
                  if (locality.class === 'local') {
                    return (
                      <Badge
                        variant="outline"
                        className="text-[10px] font-semibold border-emerald-300 text-emerald-800"
                      >
                        {locality.label}
                      </Badge>
                    );
                  }
                  if (locality.class === 'regional') {
                    return (
                      <Badge variant="outline" className="text-[10px] font-medium border-amber-300 text-amber-900">
                        {locality.label}
                      </Badge>
                    );
                  }
                  return (
                    <Badge variant="outline" className="text-[10px] font-medium">
                      {locality.label}
                    </Badge>
                  );
                }
                // Fallback without county context: never invent “local” from same-state alone
                if (mover.isLocalOnly) {
                  return (
                    <Badge
                      variant="outline"
                      className="text-[10px] font-semibold border-emerald-300 text-emerald-800"
                    >
                      Local / Intrastate
                    </Badge>
                  );
                }
                if (hqState) {
                  return (
                    <Badge variant="outline" className="text-[10px] font-medium">
                      National / Long-distance
                    </Badge>
                  );
                }
                return null;
              })()}
              <CompanyTypeBadges
                size="compact"
                input={{
                  // Geography badge (Local / Regional) is separate above.
                  // Type badges = entity role only — never blur carrier vs broker.
                  isLocalOnly: county ? false : Boolean(mover.isLocalOnly),
                  serviceScope: county
                    ? mover.usdotNumber
                      ? 'interstate'
                      : undefined
                    : mover.isLocalOnly
                      ? 'intrastate'
                      : mover.usdotNumber
                        ? 'interstate'
                        : undefined,
                  entityType: mover.entityType,
                  usdotNumber: mover.usdotNumber,
                  mcNumber: mover.mcNumber,
                  services: mover.services,
                }}
              />
            </div>
            {locationLine ? (
              <p className="text-xs text-muted-foreground mt-0.5">{locationLine}</p>
            ) : null}
          </div>
        </div>
        {hasReviewBasis ? (
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-sm font-semibold text-amber-700">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
            {mover.rating.toFixed(1)}
            <span
              className="text-xs font-normal text-muted-foreground"
              title="Industry-reported volume from third-party platforms — not verified on Move Trust Hub"
            >
              ({mover.reviewCount.toLocaleString()} industry-reported)
            </span>
          </div>
        ) : isUnratedVerified ? (
          <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            Verified — awaiting reviews
          </div>
        ) : (
          <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            No public rating yet
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {sanitizeMoverDescription(
          mover.name,
          mover.shortDescription,
          mover.usdotNumber
        )}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Services offered">
        {normalizeServiceTags(mover.services).slice(0, 5).map((service) => (
          <Badge key={service} variant="secondary" className="text-[10px] font-medium">
            {service}
          </Badge>
        ))}
        {normalizeSpecialtyTags(mover.specialties).slice(0, 2).map((specialty) => (
          <Badge key={specialty} variant="outline" className="text-[10px] font-medium">
            {specialty}
          </Badge>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
        {license.status === 'verified' && license.usdot ? (
          <div>
            <span className="font-medium text-foreground">USDOT:</span> {license.usdot}
          </div>
        ) : null}
        {license.status === 'verified' && license.mc ? (
          <div>
            <span className="font-medium text-foreground">MC:</span> {license.mc}
          </div>
        ) : null}
        {mover.fmcsaSafetyRating && license.status === 'verified' ? (
          <div className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            FMCSA: {mover.fmcsaSafetyRating}
          </div>
        ) : null}
        {mover.bbbRating && (
          <div>
            <span className="font-medium text-foreground">BBB:</span> {mover.bbbRating}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {license.status === 'verified' && (license.usdot || license.mc) && profileSlug ? (
          <Link
            href={reviewUrlForDirectoryCompany({
              usdotNumber: license.usdot,
              mcNumber: license.mc,
              slug: profileSlug,
            })}
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Leave a review
          </Link>
        ) : null}
        {profileSlug && profileHref ? (
          <CompanyProfileLink
            slug={profileSlug}
            returnPath={profileReturnPath}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View full profile
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </CompanyProfileLink>
        ) : mover.website ? (
          <a
            href={mover.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            Visit website
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        ) : (
          <p className="text-xs text-muted-foreground">
            Verify licensing on{' '}
            <a
              href="https://www.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              FMCSA.gov
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
