import Link from 'next/link';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CompanyTypeBadges } from '@/components/company/company-type-badges';
import type { LocalMover } from '@/lib/local-movers/types';
import { buildCompanyProfileHref } from '@/lib/directory/profile-back-link';
import { predictCompanyProfileSlug } from '@/lib/directory/slug-resolution';
import { getLicenseDisplay } from '@/lib/trust/company-display-policy';
import { assessLicense } from '@/lib/trust/license-verification';
import { reviewUrlForDirectoryCompany } from '@/lib/reviews/review-url';

export function LocalMoverCard({
  mover,
  rank,
  countyLabel,
  stateCode,
  profileReturnPath,
}: {
  mover: LocalMover;
  rank: number;
  countyLabel?: string;
  stateCode?: string;
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

  const locationLine = [
    mover.city,
    stateCode ?? undefined,
    countyLabel ? `Serves ${countyLabel}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <article
      id={`mover-${mover.id}`}
      aria-label={`#${rank} ${mover.name} — local mover${countyLabel ? ` in ${countyLabel}` : ''}`}
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
              {profileHref ? (
                <Link href={profileHref} className="hover:text-primary transition-colors">
                  {mover.name}
                </Link>
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
              <CompanyTypeBadges
                size="compact"
                input={{
                  isLocalOnly: Boolean(mover.isLocalOnly),
                  serviceScope: mover.isLocalOnly
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
            <p className="text-xs text-muted-foreground mt-0.5">{locationLine}</p>
          </div>
        </div>
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
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {mover.shortDescription}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Services offered">
        {mover.services.slice(0, 5).map((service) => (
          <Badge key={service} variant="secondary" className="text-[10px] font-medium">
            {service}
          </Badge>
        ))}
        {mover.specialties?.slice(0, 2).map((specialty) => (
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
        {mover.fmcsaSafetyRating && (
          <div className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
            FMCSA: {mover.fmcsaSafetyRating}
          </div>
        )}
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
        {profileHref ? (
          <Link
            href={profileHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View full profile
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
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