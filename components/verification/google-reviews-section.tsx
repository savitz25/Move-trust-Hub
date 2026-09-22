import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { MetricLabel } from '@/components/trust/metric-label';
import { googleMapsProfileUrl } from '@/lib/verification/google-profile-url';
import { PROFILE_METRIC_TOOLTIPS } from '@/lib/trust/profile-metrics';
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
};

/**
 * External Google rating reference only — never republish full review body text.
 * AggregateRating / Review schema is emitted only for moderated MTH community reviews.
 *
 * MOVE-EXTREP-001A: renders nothing at all (not even an empty-state card) when
 * there is no real, displayable stored snapshot. A generic placeholder search
 * link is not evidence and must never be presented as if it were — every
 * company can be searched on Google, so that link told the consumer nothing.
 * Founder decision: prefer omission over empty-state clutter. Callers
 * should treat this component as self-gating and check `isDisplayableGoogleForUi`
 * (lib/verification/display-enrichment.ts) only when they need to know in
 * advance whether it will render anything (e.g. section-level visibility).
 */
export function GoogleReviewsSection({ data }: Props) {
  const profileUrl = data ? googleMapsProfileUrl(data) : null;
  // Legacy snapshots may omit status; treat missing status as ok when rating/count exist.
  const statusOk = !data?.status || data.status === 'ok';
  const hasRating =
    Boolean(data) &&
    statusOk &&
    ((data!.rating != null && data!.rating > 0) ||
      (data!.review_count != null && data!.review_count > 0));

  if (!hasRating || !data) return null;

  // Direct link tied to this specific stored snapshot's own place_id/name/address.
  // Never falls back to a generic "search for this company" link here — if the
  // snapshot itself carries no way to link out, we simply omit the link rather
  // than substitute a placeholder search query as if it were sourced evidence.
  const sourceUrl = profileUrl;

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
          {sourceUrl ? (
            <Link
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a73e8] hover:underline shrink-0"
            >
              View on Google
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : null}
        </div>
        <p className="text-[11px] text-muted-foreground border-t pt-3 leading-relaxed">
          {data.last_fetched
            ? `Google Places rating snapshot checked ${new Date(data.last_fetched).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })} (UTC). `
            : ''}
          External rating only — not mixed into moderated Move Trust Hub review schema.
        </p>
      </CardContent>
    </Card>
  );
}
