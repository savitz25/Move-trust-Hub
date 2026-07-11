import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { MetricLabel } from '@/components/trust/metric-label';
import {
  buildProfileReviewSources,
  PROFILE_METRIC_TOOLTIPS,
} from '@/lib/trust/profile-metrics';
import { REVIEW_TRANSPARENCY_DISCLAIMER } from '@/lib/trust/review-display-policy';
import { methodologyHref } from '@/lib/trust/site-stats';
import type { Company } from '@/types';
import type { GooglePlacesData } from '@/lib/verification/types';

type Props = {
  company: Pick<Company, 'id' | 'name' | 'overallRating' | 'reviewCount' | 'slug'>;
  googleData?: GooglePlacesData | null;
};

/**
 * Server-rendered review source breakdown — prevents contradictory counts across the profile.
 */
export function CompanyProfileReviewSources({ company, googleData }: Props) {
  const sources = buildProfileReviewSources(company, googleData);

  return (
    <Card className="mb-8 border-dashed bg-muted/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">How review numbers on this page work</CardTitle>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Three separate sources — they are not added together. Directory cards and this profile use
          the same industry-reported total.
        </p>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-lg border bg-background p-3">
            <MetricLabel
              label="Industry-reported rating"
              tooltip={PROFILE_METRIC_TOOLTIPS.overallRating}
              methodologyAnchor="reviewAttribution"
            />
            <dd className="mt-2 flex items-center gap-2">
              <StarRating rating={sources.editorialRating} size="sm" />
              <span className="font-semibold tabular-nums">{sources.editorialRating.toFixed(1)}★</span>
            </dd>
            <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {sources.editorialVolumeLabel} — matches the directory listing card
            </dd>
          </div>

          <div className="rounded-lg border bg-background p-3">
            <MetricLabel
              label="Google Places snapshot"
              tooltip={PROFILE_METRIC_TOOLTIPS.googlePlaces}
              methodologyAnchor="reviewAttribution"
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
                  Live API data — may differ from industry-reported totals above
                </dd>
              </>
            ) : (
              <dd className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Google Places snapshot not loaded for this profile.
                {sources.attributableOnSiteCount > 0 ? (
                  <>
                    {' '}
                    See{' '}
                    <Link href="#attributed-reviews" className="text-primary underline underline-offset-2">
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
            />
            <dd className="mt-2 font-semibold">{sources.attributableOnSiteLabel}</dd>
            <dd className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Named reviewers published on Move Trust Hub — scroll to{' '}
              <Link href="#attributed-reviews" className="text-primary underline underline-offset-2">
                attributed reviews
              </Link>
            </dd>
          </div>
        </dl>
        <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed border-t pt-3">
          {REVIEW_TRANSPARENCY_DISCLAIMER}{' '}
          <Link href={methodologyHref('reviewAttribution')} className="text-primary underline underline-offset-2">
            Read our review methodology →
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}