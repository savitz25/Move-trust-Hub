import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { PublicScrapeData } from '@/lib/verification/types';

/** Extended BBB public-scrape fields for company profiles */
export function BbbPublicDetail({ data }: { data: PublicScrapeData }) {
  if (!data.bbb_rating && !data.bbb_accreditation_status && !data.bbb_file_opened) {
    return null;
  }

  return (
    <div className="mt-3 space-y-1.5 text-sm text-foreground">
      {data.bbb_accreditation_status ? (
        <p>
          <span className="text-muted-foreground">Accreditation:</span>{' '}
          {data.bbb_accreditation_status}
          {data.bbb_accredited_since ? ` (since ${data.bbb_accredited_since})` : ''}
        </p>
      ) : null}
      {data.bbb_rating ? (
        <p>
          <span className="text-muted-foreground">BBB rating:</span> {data.bbb_rating}
          {data.bbb_review_count != null ? ` · ${data.bbb_review_count} BBB reviews` : ''}
        </p>
      ) : null}
      {data.bbb_file_opened ? (
        <p>
          <span className="text-muted-foreground">BBB file opened / business started:</span>{' '}
          {data.bbb_file_opened}
        </p>
      ) : null}
      {data.bbb_profile_url ? (
        <p>
          <Link
            href={data.bbb_profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            View BBB profile <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </p>
      ) : null}
      {data.bbb_recent_reviews && data.bbb_recent_reviews.length > 0 ? (
        <div className="mt-2 rounded-md border bg-muted/30 p-3">
          <p className="text-xs font-semibold text-muted-foreground mb-2">Recent BBB reviews</p>
          <ul className="space-y-2">
            {data.bbb_recent_reviews.slice(0, 3).map((review, i) => (
              <li key={i} className="text-xs leading-relaxed">
                {review.date ? <span className="text-muted-foreground">{review.date} — </span> : null}
                {review.text}
              </li>
            ))}
          </ul>
        </div>
      ) : data.bbb_review_count === 0 ? (
        <p className="text-xs text-muted-foreground">No BBB customer reviews on file yet.</p>
      ) : null}
    </div>
  );
}