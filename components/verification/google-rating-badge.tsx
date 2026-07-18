import Link from 'next/link';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { badgeLegendHref } from '@/lib/trust/methodology-paths';
import type { GooglePlacesData } from '@/lib/verification/types';

export function GoogleRatingBadge({
  data,
  className,
  linkToLegend = true,
}: {
  data: Pick<GooglePlacesData, 'rating' | 'review_count' | 'status'>;
  className?: string;
  linkToLegend?: boolean;
}) {
  if (data.status !== 'ok' || data.rating == null) return null;

  const badge = (
    <Badge variant="outline" className={className} title="Google Places business rating — see badge legend">
      <Star className="h-3.5 w-3.5 mr-1 fill-amber-400 text-amber-500" aria-hidden />
      Google {data.rating.toFixed(1)}
      {data.review_count != null ? ` (${data.review_count.toLocaleString()})` : ''}
    </Badge>
  );

  if (!linkToLegend) return badge;

  return (
    <Link
      href={badgeLegendHref('google', true)}
      className="inline-flex focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
      aria-label="Google rating badge — view badge legend"
    >
      {badge}
    </Link>
  );
}