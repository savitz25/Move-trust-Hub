import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import type { LookupCarrierPreview } from '@/actions/reviews';
import { StarRating } from '@/components/ui/star-rating';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = {
  carrier: LookupCarrierPreview;
  displayNumber: string;
  onChangeCarrier?: () => void;
  className?: string;
};

function companyInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export function ReviewCompanyHeader({
  carrier,
  displayNumber,
  onChangeCarrier,
  className,
}: Props) {
  const profileHref = carrier.inDatabase
    ? `/company/${carrier.slug}`
    : carrier.legacyProfileSlug
      ? `/companies/${carrier.legacyProfileSlug}`
      : null;

  return (
    <div
      className={cn(
        'flex items-start gap-4 rounded-xl border bg-gradient-to-br from-background to-muted/30 p-4 sm:p-5',
        className
      )}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary"
        aria-hidden="true"
      >
        {companyInitials(carrier.name)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold leading-tight">{carrier.name}</h3>
          {carrier.inDatabase ? (
            <Badge variant="secondary" className="text-[10px]">
              In directory
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px]">
              New carrier
            </Badge>
          )}
        </div>

        <p className="mt-1 text-sm text-muted-foreground">{displayNumber}</p>

        {carrier.address ? (
          <p className="mt-1 flex items-start gap-1 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{carrier.address}</span>
          </p>
        ) : null}

        {carrier.approvedReviewCount > 0 ? (
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={carrier.avgRating} size="sm" />
            <span className="text-xs text-muted-foreground">
              {carrier.approvedReviewCount} moderated review
              {carrier.approvedReviewCount === 1 ? '' : 's'}
            </span>
          </div>
        ) : (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            Be the first to leave a moderated review
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
          {profileHref ? (
            <Link href={profileHref} className="text-primary hover:underline underline-offset-2">
              View company profile
            </Link>
          ) : null}
          {onChangeCarrier ? (
            <button
              type="button"
              onClick={onChangeCarrier}
              className="text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Change company
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}