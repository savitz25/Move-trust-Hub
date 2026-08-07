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

/**
 * External Google rating reference only — never republish full review body text.
 * AggregateRating / Review schema is emitted only for moderated MTH community reviews.
 */
export function GoogleReviewsSection({
  data,
  companyName,
  attributableOnSiteCount = 0,
}: Props) {
  const profileUrl = data ? googleMapsProfileUrl(data) : null;
  // Legacy snapshots may omit status; treat missing status as ok when rating/count exist.
  const statusOk = !data?.status || data.status === 'ok';
  const hasRating =
    Boolean(data) &&
    statusOk &&
    ((data!.rating != null && data!.rating > 0) ||
      (data!.review_count != null && data!.review_count > 0));
  const searchUrl = profileUrl ?? buildGoogleAttributionSearchUrl(companyName);

  return (
    <Card className="overflow-hidden border-l-4 border-l-[#4285F4] bg-gradient-to-br from-white to-[#f8faff] dark:from-background dark:to-[#0d1117] mb-8">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <GoogleWordmark className="font-semibold tracking-tight" />
          <span className="text-foreground font-medium">Google rating (external)</span>
        </CardTitle>
        <MetricLabel
          label="Labeled third-party reference — not hosted on Move Trust Hub"
          tooltip={PROFILE_METRIC_TOOLTIPS.googlePlaces}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        {hasRating && data ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                {data.rating != null && data.rating > 0 ? (
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="text-4xl font-semibold tabular-nums text-[#4285F4]">
                      {data.rating.toFixed(1)}
                    </span>
                    <StarRating rating={data.rating} size="lg" showNumber={false} />
                    <span className="text-sm text-muted-foreground">
                      on Google
                      {data.review_count != null
                        ? ` · ${data.review_count.toLocaleString()} Google reviews`
                        : ''}
                    </span>
                  </div>
                ) : data.review_count != null ? (
                  <p className="text-sm font-medium text-foreground">
                    {data.review_count.toLocaleString()} reviews on Google
                  </p>
                ) : null}
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {data.rating != null && data.rating > 0
                    ? `${data.rating.toFixed(1)} on Google — view on Google for full reviews.`
                    : 'View this company on Google for full public reviews.'}{' '}
                  Move Trust Hub does not republish Google review body text.
                </p>
                {data.name ? (
                  <p className="text-xs text-muted-foreground mt-1">{data.name}</p>
                ) : null}
              </div>
              <Link
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline shrink-0"
              >
                View on Google
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
            <p className="text-[11px] text-muted-foreground border-t pt-3 leading-relaxed">
              {data.last_fetched
                ? `Google Places rating snapshot last updated ${new Date(data.last_fetched).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })} (UTC). `
                : ''}
              External rating only — not mixed into moderated Move Trust Hub review schema.
              {attributableOnSiteCount > 0
                ? ' Historical attributed references may appear below as short cards with outbound links.'
                : ''}
            </p>
          </>
        ) : (
          <div className="rounded-md border border-dashed bg-muted/20 px-4 py-6 text-center space-y-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {data?.status === 'error'
                ? `We could not refresh a Google Places rating for ${companyName} right now. Confirm on Google Maps before booking.`
                : data?.status === 'not_found'
                  ? `No matching Google Business Profile was found for ${companyName}. Search Google to confirm public ratings.`
                  : data?.status === 'ok' && (data.rating == null || data.rating <= 0)
                    ? `Google listing found for ${companyName}, but no star rating is published yet. Confirm on Google Maps before booking.`
                    : `A live Google rating is not stored for ${companyName} yet. Confirm directly on Google before booking.`}
            </p>
            <Link
              href={searchUrl}
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
