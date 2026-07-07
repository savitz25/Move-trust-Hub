import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { GooglePlacesData } from '@/lib/verification/types';

export function GoogleRatingBadge({
  data,
  className,
}: {
  data: Pick<GooglePlacesData, 'rating' | 'review_count' | 'status'>;
  className?: string;
}) {
  if (data.status !== 'ok' || data.rating == null) return null;

  return (
    <Badge variant="outline" className={className} title="Google Places business rating">
      <Star className="h-3.5 w-3.5 mr-1 fill-amber-400 text-amber-500" aria-hidden />
      Google {data.rating.toFixed(1)}
      {data.review_count != null ? ` (${data.review_count.toLocaleString()})` : ''}
    </Badge>
  );
}