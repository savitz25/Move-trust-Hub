import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import {
  googleMapsProfileUrl,
  hasDisplayableGoogleReviews,
} from '@/lib/verification/google-profile-url';
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
};

export function GoogleReviewsSection({ data, companyName }: Props) {
  const profileUrl = data ? googleMapsProfileUrl(data) : null;
  const hasData = hasDisplayableGoogleReviews(data);

  return (
    <Card className="overflow-hidden border-l-4 border-l-[#4285F4] bg-gradient-to-br from-white to-[#f8faff] dark:from-background dark:to-[#0d1117]">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
          <GoogleWordmark className="font-semibold tracking-tight" />
          <span className="text-foreground font-medium">Reviews from Google</span>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Licensed business ratings from Google Places — separate from Move Trust Hub moderated reviews.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!hasData ? (
          <p className="text-sm text-muted-foreground rounded-md border border-dashed bg-muted/20 px-4 py-6 text-center">
            Google data not yet available for {companyName}.
          </p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-semibold tabular-nums text-[#4285F4]">
                    {data.rating!.toFixed(1)}
                  </span>
                  <StarRating rating={data.rating!} size="lg" showNumber={false} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {data.review_count != null
                    ? `${data.review_count.toLocaleString()} Google review${data.review_count === 1 ? '' : 's'}`
                    : 'Google reviews'}
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

            <p className="text-[11px] text-muted-foreground border-t pt-3">
              {data.last_fetched
                ? `Google Places data last updated ${new Date(data.last_fetched).toLocaleDateString()}. `
                : ''}
              Excerpts are attributed to named Google reviewers where provided by the API.
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}