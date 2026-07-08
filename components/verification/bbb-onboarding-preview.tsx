import { Award, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  hasBbbPublicScrapeData,
  normalizeBbbPublicDisplay,
} from '@/lib/verification/bbb-public-display';
import type { PublicScrapeData } from '@/lib/verification/types';

type Props = {
  data: PublicScrapeData;
};

export function BbbOnboardingPreview({ data }: Props) {
  if (!hasBbbPublicScrapeData(data)) {
    return null;
  }

  const bbb = normalizeBbbPublicDisplay(data);
  const method = data.sources?.bbb?.method === 'bbb_api' ? 'BBB API' : 'Public scrape';

  return (
    <Card className="border-slate-200/80 bg-slate-50/50 dark:bg-slate-950/20 p-4 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <Award className="h-4 w-4 text-slate-600" aria-hidden />
        <span className="text-sm font-semibold">BBB business profile</span>
        <Badge variant="secondary" className="text-[10px] ml-auto">
          {method} · lowest confidence tier
        </Badge>
      </div>

      {bbb.accreditationStatus ? (
        <p className="text-sm">
          <span className="text-muted-foreground">Accreditation:</span>{' '}
          {bbb.accreditationStatus}
          {bbb.accreditedSince ? ` (since ${bbb.accreditedSince})` : ''}
        </p>
      ) : null}

      {bbb.rating ? (
        <p className="text-sm">
          <span className="text-muted-foreground">BBB rating:</span> {bbb.rating}
          {bbb.reviewCount != null ? ` · ${bbb.reviewCount} reviews` : ''}
        </p>
      ) : null}

      {bbb.fileOpened ? (
        <p className="text-sm">
          <span className="text-muted-foreground">File opened:</span> {bbb.fileOpened}
        </p>
      ) : null}

      {bbb.profileUrl ? (
        <a
          href={bbb.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          View BBB profile <ExternalLink className="h-3 w-3" />
        </a>
      ) : null}

      {bbb.recentReviews.length > 0 ? (
        <ul className="space-y-2 text-xs text-muted-foreground border-t pt-3">
          {bbb.recentReviews.slice(0, 3).map((review, i) => (
            <li key={i}>
              {review.author ? (
                <span className="font-medium text-foreground">{review.author}: </span>
              ) : null}
              {review.date ? <span>{review.date} — </span> : null}
              <span className="line-clamp-2">{review.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}