import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import {
  hasBbbPublicScrapeData,
  normalizeBbbPublicDisplay,
} from '@/lib/verification/bbb-public-display';
import type { PublicScrapeData } from '@/lib/verification/types';

/** BBB fields from public_scrape — single source for profile Licensing & Compliance */
export function BbbPublicDetail({ data }: { data: PublicScrapeData }) {
  if (!hasBbbPublicScrapeData(data)) {
    return null;
  }

  const bbb = normalizeBbbPublicDisplay(data);

  return (
    <div className="space-y-1.5 text-sm text-foreground">
      {bbb.accreditationStatus ? (
        <p>
          <span className="text-muted-foreground">Accreditation:</span>{' '}
          {bbb.accreditationStatus}
          {bbb.accreditedSince ? ` (since ${bbb.accreditedSince})` : ''}
        </p>
      ) : null}
      {bbb.rating ? (
        <p>
          <span className="text-muted-foreground">Rating:</span> {bbb.rating}
          {bbb.reviewCount != null ? ` · ${bbb.reviewCount} BBB reviews` : ''}
        </p>
      ) : null}
      {bbb.fileOpened ? (
        <p>
          <span className="text-muted-foreground">File opened:</span> {bbb.fileOpened}
        </p>
      ) : null}
      {bbb.profileUrl ? (
        <p>
          <Link
            href={bbb.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            View BBB profile <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </p>
      ) : null}
      {bbb.recentReviews.length > 0 ? (
        <div className="mt-2 rounded-md border bg-muted/30 p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Recent BBB reviews</p>
          <ul className="space-y-2">
            {bbb.recentReviews.slice(0, 3).map((review, i) => (
              <li key={i} className="text-xs leading-relaxed">
                {review.author ? (
                  <span className="font-medium text-foreground">{review.author}: </span>
                ) : null}
                {review.date ? (
                  <span className="text-muted-foreground">{review.date} — </span>
                ) : null}
                {review.text}
              </li>
            ))}
          </ul>
        </div>
      ) : bbb.reviewCount === 0 ? (
        <p className="text-xs text-muted-foreground">No BBB customer reviews on file yet.</p>
      ) : null}
      {bbb.lastScrapedAt ? (
        <p className="text-[11px] text-muted-foreground">
          Scraped {new Date(bbb.lastScrapedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      ) : null}
    </div>
  );
}