import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import {
  NATIVE_REVIEW_VERIFIED_LABEL,
  getReviewSourceDisplay,
} from '@/lib/trust/review-display-policy';
import type { Review } from '@/types';

type Props = {
  review: Review;
  companyName?: string;
  className?: string;
};

export function ReviewSourceBadge({ review, companyName, className = '' }: Props) {
  const display = getReviewSourceDisplay(review);

  if (display.isAttributable) {
    const searchUrl = companyName
      ? `https://www.google.com/search?q=${encodeURIComponent(`${companyName} ${review.author} review`)}`
      : undefined;

    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <Badge variant="success" className="text-[10px] gap-1">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          {display.shortLabel}
        </Badge>
        <span className="text-[10px] text-muted-foreground">
          {review.author} · {review.rating}★
        </span>
        {searchUrl ? (
          <Link
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[10px] text-primary hover:underline"
          >
            Find on Google
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <Badge variant="outline" className={`text-[10px] ${className}`}>
      {display.shortLabel}
    </Badge>
  );
}

export function NativeReviewVerifiedBadge({ className = '' }: { className?: string }) {
  return (
    <Badge variant="success" className={`text-[10px] gap-1 ${className}`}>
      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
      {NATIVE_REVIEW_VERIFIED_LABEL}
    </Badge>
  );
}