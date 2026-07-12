import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import type { PublicScrapeData } from '@/lib/verification/types';

export function PublicScrapeBadges({
  data,
  className,
  /** BBB is rendered via BbbVerificationBadge — always excluded here to avoid duplicates */
  excludeBbb = true,
}: {
  data: PublicScrapeData;
  className?: string;
  excludeBbb?: boolean;
}) {
  const items: string[] = [];
  if (data.trustpilot_rating != null) {
    items.push(`Trustpilot ${data.trustpilot_rating.toFixed(1)}`);
  }
  if (data.yelp_rating != null) {
    items.push(`Yelp ${data.yelp_rating.toFixed(1)}`);
  }

  if (!items.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ''}`}>
      {items.map((label) => (
        <Badge
          key={label}
          variant="secondary"
          className="text-xs"
          title="Public data — scraped from public web pages; lower confidence than FMCSA or Google API"
        >
          <Globe className="h-3 w-3 mr-1 opacity-70" aria-hidden />
          {label}
          <span className="ml-1 opacity-60 font-normal">(public)</span>
        </Badge>
      ))}
    </div>
  );
}