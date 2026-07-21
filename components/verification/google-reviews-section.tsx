import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { MetricLabel } from '@/components/trust/metric-label';
import { googleMapsProfileUrl } from '@/lib/verification/google-profile-url';
import { PROFILE_METRIC_TOOLTIPS } from '@/lib/trust/profile-metrics';
import { buildGoogleAttributionSearchUrl } from '@/lib/trust/review-display-policy';
import type { GooglePlacesData } from '@/lib/verification/types';

function GoogleWordmark({ className }: { className?: string }) {
  return (
    <span className={className} aria-label="Google">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

type Props = {
  data: GooglePlacesData | null | undefined;
  companyName: string;
  attributableOnSiteCount?: number;
};

export function GoogleReviewsSection({
  data,
  companyName,
  attributableOnSiteCount = 0,
}: Props) {
  const profileUrl = data ? googleMapsProfileUrl(data) : null;
  // Show full card when we have a rating OR review snippets (Places API sometimes returns
  // snippets without a numeric rating, or vice versa).
  const hasApiSnapshot = Boolean(
    data?.status === 'ok' &&
      ((data.rating != null && data.rating > 0) ||
        (data.review_snippets?.length ?? 0) > 0 ||
        (data.review_count != null && data.review_count > 0))
  );
  const partialData: GooglePlacesData | null =
    data?.status === 'ok' && !hasApiSnapshot ? data : null;
  const showPartial =
    partialData != null &&
    Boolean(
      partialData.review_snippets?.length ||
        partialData.review_count != null ||
        partialData.rating != null
    );

  return (
    <Card className="overflow-hidden border-l-4 border-l-[#4285F4] bg-gradient-to-br from-white to-[#f8faff] dark:from-background dark:to-[#0d1117] mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <GoogleWordmark className="font-semibold tracking-tight" />
          <span className="text-foreground font-medium">Reviews from Google</span>
        </CardTitle>
        <MetricLabel
          label="Google Places API snapshot"
          tooltip={PROFILE_METRIC_TOOLTIPS.googlePlaces}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {hasApiSnapshot && data ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                {data.rating != null && data.rating > 0 ? (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-4xl font-semibold tabular-nums text-[#4285F4]">
                      {data.rating.toFixed(1)}
                    </span>
                    <StarRating rating={data.rating} size="lg" showNumber={false} />
                  </div>
                ) : (
                  <p className="text-sm font-medium text-foreground">Google Places snapshot</p>
                )}
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {data.review_count != null
                    ? `${data.review_count.toLocaleString()} reviews on Google Maps (API snapshot)`
                    : data.review_snippets?.length
                      ? 'Attributed Google review excerpts (API snapshot)'
                      : 'Google Maps reviews'}
                  {attributableOnSiteCount > 0 ? (
                    <span className="block text-xs mt-1">
                      Plus {attributableOnSiteCount} attributed excerpt
                      {attributableOnSiteCount === 1 ? '' : 's'} published on Move Trust Hub below.
                    </span>
                  ) : null}
                </p>
                {data.name ? (
                  <p className="text-xs text-muted-foreground mt-1">{data.name}</p>
                ) : null}
                {data.formatted_address ? (
                  <p className="text-xs text-muted-foreground">{data.formatted_address}</p>
                ) : null}
              </div>
              {profileUrl ? (
                <Link
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline shrink-0"
                >
                  View full Google profile
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </Link>
              ) : null}
            </div>

            {data.review_snippets?.length ? (
              <ul className="space-y-3 border-t pt-4">
                {data.review_snippets.slice(0, 3).map((review, index) => (
                  <li
                    key={index}
                    className="rounded-lg border bg-white/80 dark:bg-muted/20 p-3 text-sm shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-1.5">
                      <StarRating rating={review.rating} size="sm" showNumber={false} />
                      <span className="font-medium text-foreground">
                        {review.author ?? 'Google reviewer'}
                      </span>
                      {review.relative_time ? <span>· {review.relative_time}</span> : null}
                    </div>
                    <p className="text-foreground/90 leading-relaxed line-clamp-4">{review.text}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="text-[11px] text-muted-foreground border-t pt-3 leading-relaxed">
              {data.last_fetched
                ? `Google Places data last updated ${new Date(data.last_fetched).toLocaleDateString()}. `
                : ''}
              Excerpts are attributed to named Google reviewers where provided by the API.
            </p>
          </>
        ) : showPartial && partialData ? (
          <div className="rounded-md border bg-muted/20 px-4 py-4 text-sm space-y-2">
            <p className="text-muted-foreground leading-relaxed">
              Partial Google Places data is on file for {companyName}.
              {partialData.review_count != null
                ? ` Google reports ${partialData.review_count.toLocaleString()} reviews`
                : ''}
              {partialData.rating != null ? ` at ${partialData.rating.toFixed(1)}★` : ''}.
            </p>
            {profileUrl ? (
              <Link
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline"
              >
                Open Google Maps profile
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </Link>
            ) : null}
          </div>
        ) : attributableOnSiteCount > 0 ? (
          <div className="rounded-md border border-dashed bg-muted/20 px-4 py-5 text-sm text-center space-y-2">
            <p className="text-muted-foreground leading-relaxed">
              A live Google Places snapshot is not loaded for this profile, but Move Trust Hub
              publishes {attributableOnSiteCount} attributed Google review
              {attributableOnSiteCount === 1 ? '' : 's'} below with named reviewers.
            </p>
            <Link
              href="#attributed-reviews"
              className="text-primary font-medium hover:underline underline-offset-2"
            >
              Jump to attributed on-site reviews
            </Link>
            <p className="text-xs text-muted-foreground">
              Or{' '}
              <Link
                href={buildGoogleAttributionSearchUrl(companyName)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                search {companyName} on Google
              </Link>{' '}
              to confirm the latest public rating.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-dashed bg-muted/20 px-4 py-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data?.status === 'error'
                ? `We could not refresh the Google Places snapshot for ${companyName} right now${
                    data.error ? ` (${data.error.slice(0, 80)})` : ''
                  }. Ratings above may still reflect the last successful sync — confirm on Google Maps before booking.`
                : data?.status === 'not_found'
                  ? `No matching Google Business Profile was found for ${companyName}. Use industry-reported ratings above, or search Google to confirm public reviews.`
                  : `A live Google Places snapshot is not stored for ${companyName} yet. Use industry-reported ratings above, or confirm directly on Google Maps before booking.`}
            </p>
            <Link
              href={buildGoogleAttributionSearchUrl(companyName)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline"
            >
              Search Google for {companyName}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}