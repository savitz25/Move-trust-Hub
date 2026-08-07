import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { MetricLabel } from '@/components/trust/metric-label';
import {
  buildProfileReviewSources,
  PROFILE_METRIC_TOOLTIPS,
} from '@/lib/trust/profile-metrics';
import { REVIEW_TRANSPARENCY_DISCLAIMER } from '@/lib/trust/review-display-policy';
import { methodologyHref } from '@/lib/trust/methodology-paths';
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';

type Props = {
  company: Pick<Company, 'id' | 'name' | 'overallRating' | 'reviewCount' | 'slug'>;
  googleData?: GooglePlacesData | null;
  /** Move Trust Hub composite — never mixed with star ratings or AggregateRating */
  reputationScore?: number | null;
  fmcsaSafetyRating?: Company['fmcsaSafetyRating'] | null;
};

/**
 * Server-rendered separation of score / rating sources.
 * Prevents contradictory counts and schema contamination.
 */
export function CompanyProfileReviewSources({
  company,
  googleData,
  reputationScore,
  fmcsaSafetyRating,
}: Props) {
  const sources = buildProfileReviewSources(company, googleData);
  const returnContext = {
    returnPath: `/companies/${company.slug}`,
    returnLabel: company.name,
  };
  const showRep = (reputationScore ?? 0) > 0;
  const showEditorial =
    (sources.editorialRating ?? 0) > 0 && (sources.editorialReviewCount ?? 0) > 0;

  return (
    <Card className="mb-8 border-dashed bg-muted/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">How scores and ratings on this page work</CardTitle>
        <p className="text-xs text-muted-foreground leading-relaxed">
          These sources are <strong className="text-foreground font-medium">not added together</strong>{' '}
          and are never mixed into schema.org AggregateRating. Google and BBB snapshots are third-party
          context only.
        </p>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {showRep ? (
            <div className="rounded-lg border bg-background p-3">
              <MetricLabel
                label="Move Trust Hub Reputation Score"
                tooltip={PROFILE_METRIC_TOOLTIPS.reputationScore}
                methodologyAnchor="reputationScore"
                returnContext={returnContext}
              />
              <dd className="mt-2 font-semibold tabular-nums text-primary text-xl">
                {reputationScore}
                <span className="text-sm font-normal text-muted-foreground"> / 100</span>
              </dd>
              <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Editorial composite from public licensing and listing signals — not a star rating.
              </dd>
            </div>
          ) : null}

          <div className="rounded-lg border bg-background p-3">
            <MetricLabel
              label="Industry-reported rating"
              tooltip={PROFILE_METRIC_TOOLTIPS.overallRating}
              methodologyAnchor="reviewAttribution"
              returnContext={returnContext}
            />
            {showEditorial ? (
              <>
                <dd className="mt-2 flex items-center gap-2">
                  <StarRating rating={sources.editorialRating} size="sm" />
                  <span className="font-semibold tabular-nums">
                    {sources.editorialRating.toFixed(1)}★
                  </span>
                </dd>
                <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {sources.editorialVolumeLabel} — third-party volume, not collected on Move Trust Hub
                </dd>
              </>
            ) : (
              <dd className="mt-2 text-xs text-muted-foreground leading-relaxed">
                No industry-reported rating basis on this profile yet.
              </dd>
            )}
          </div>

          <div className="rounded-lg border bg-background p-3">
            <MetricLabel
              label="FMCSA safety rating"
              tooltip={PROFILE_METRIC_TOOLTIPS.fmcsaSafety}
              methodologyAnchor="reviewAttribution"
              returnContext={returnContext}
            />
            <dd className="mt-2 font-semibold">
              {fmcsaSafetyRating && fmcsaSafetyRating !== 'Not Rated'
                ? fmcsaSafetyRating
                : 'Not Rated by FMCSA'}
            </dd>
            <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Federal safety rating (when assigned) — separate from reputation score and star snapshots.
            </dd>
          </div>

          <div className="rounded-lg border bg-background p-3">
            <MetricLabel
              label="Google Places snapshot"
              tooltip={PROFILE_METRIC_TOOLTIPS.googlePlaces}
              methodologyAnchor="reviewAttribution"
              returnContext={returnContext}
            />
            {sources.googleAvailable ? (
              <>
                <dd className="mt-2 font-semibold tabular-nums text-[#4285F4]">
                  {sources.googleRating?.toFixed(1)}★
                  {sources.googleReviewCount != null
                    ? ` · ${sources.googleReviewCount.toLocaleString()} Google reviews`
                    : ''}
                </dd>
                <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Live third-party snapshot — not Move Trust Hub AggregateRating
                </dd>
              </>
            ) : (
              <dd className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Google Places snapshot not loaded for this profile.
                {sources.attributableOnSiteCount > 0 ? (
                  <>
                    {' '}
                    See{' '}
                    <Link
                      href="#attributed-reviews"
                      className="text-primary underline underline-offset-2"
                    >
                      attributed on-site reviews
                    </Link>{' '}
                    below instead.
                  </>
                ) : (
                  ' Confirm ratings on Google Maps before booking.'
                )}
              </dd>
            )}
          </div>

          <div className="rounded-lg border bg-background p-3">
            <MetricLabel
              label="On-site attributed reviews"
              tooltip={PROFILE_METRIC_TOOLTIPS.onSiteReviews}
              methodologyAnchor="reviewAttribution"
              returnContext={returnContext}
            />
            <dd className="mt-2 font-semibold">{sources.attributableOnSiteLabel}</dd>
            <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
              External references with outbound links —{' '}
              <Link href="#attributed-reviews" className="text-primary underline underline-offset-2">
                see references
              </Link>
              . Moderated community reviews (if any) are listed separately.
            </dd>
          </div>
        </dl>
        <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed border-t pt-3">
          {REVIEW_TRANSPARENCY_DISCLAIMER}{' '}
          <Link
            href={methodologyHref('reviewAttribution', returnContext)}
            className="text-primary underline underline-offset-2"
          >
            Read our review methodology →
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
