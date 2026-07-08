import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import type { GooglePlacesData } from '@/lib/verification/types';

export function GooglePlacesPanel({ data }: { data: GooglePlacesData }) {
  if (data.status !== 'ok') return null;

  return (
    <div className="sm:col-span-2 rounded-md border border-amber-200/50 bg-amber-50/30 dark:bg-amber-950/10 p-3 space-y-2">
      <div className="text-muted-foreground text-xs">Google Places (API)</div>
      <GoogleRatingBadge data={data} />
      {data.name ? (
        <p className="text-sm text-muted-foreground">{data.name}</p>
      ) : null}
      {data.formatted_address ? (
        <p className="text-xs text-muted-foreground">{data.formatted_address}</p>
      ) : null}
      {data.review_snippets?.length ? (
        <ul className="space-y-2 text-xs text-muted-foreground border-t border-amber-200/40 pt-2">
          {data.review_snippets.map((review, index) => (
            <li key={index}>
              <span className="font-medium text-foreground">{review.rating}★</span>
              {review.author ? ` · ${review.author}` : ''}
              {review.relative_time ? ` · ${review.relative_time}` : ''}
              <p className="mt-0.5 line-clamp-3">{review.text}</p>
            </li>
          ))}
        </ul>
      ) : null}
      {data.last_fetched ? (
        <p className="text-xs text-muted-foreground">
          Last fetched {new Date(data.last_fetched).toLocaleDateString()}
        </p>
      ) : null}
    </div>
  );
}