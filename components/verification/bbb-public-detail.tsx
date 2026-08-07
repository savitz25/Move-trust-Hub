import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import {
  hasBbbPublicScrapeData,
  normalizeBbbPublicDisplay,
} from '@/lib/verification/bbb-public-display';
import type { PublicScrapeData } from '@/lib/verification/types';

/**
 * BBB block for Licensing & Compliance — only rendered when hasBbbPublicScrapeData() is true.
 * Parent must gate on that helper; returns null if listing is unconfirmed.
 */
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
      {bbb.reviewCount != null && bbb.reviewCount > 0 ? (
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {bbb.reviewCount.toLocaleString()} BBB customer reviews reported
          {bbb.profileUrl ? ' — view full reviews on the BBB profile (not republished here).' : '.'}
        </p>
      ) : bbb.reviewCount === 0 ? (
        <p className="text-xs text-muted-foreground">No BBB customer reviews on file yet.</p>
      ) : null}
      {bbb.lastScrapedAt ? (
        <p className="text-[11px] text-muted-foreground">
          Scraped{' '}
          {new Date(bbb.lastScrapedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          })}{' '}
          (UTC)
        </p>
      ) : null}
    </div>
  );
}