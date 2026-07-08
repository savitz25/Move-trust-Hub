import { Star, Globe, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DotReadonlyFields } from '@/components/suggestions/dot-readonly-fields';
import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import { BbbOnboardingPreview } from '@/components/verification/bbb-onboarding-preview';
import { PublicScrapeBadges } from '@/components/verification/public-scrape-badges';
import { hasBbbPublicScrapeData } from '@/lib/verification/bbb-public-display';
import type { EnrichedCompanyPreview } from '@/lib/suggestions/types';

type Props = {
  preview: EnrichedCompanyPreview;
  showFmcsa?: boolean;
};

export function MultiSourcePreviewCard({ preview, showFmcsa = true }: Props) {
  const { fmcsa, google, publicScrape } = preview;
  const showBbb = publicScrape ? hasBbbPublicScrapeData(publicScrape) : false;

  return (
    <div className="space-y-4">
      {showFmcsa && fmcsa?.legalName ? (
        <DotReadonlyFields preview={fmcsa} />
      ) : null}

      {google?.status === 'ok' ? (
        <Card className="border-amber-200/60 bg-amber-50/40 dark:bg-amber-950/20 p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Star className="h-4 w-4 text-amber-500" aria-hidden />
            <span className="text-sm font-semibold">Google business data</span>
            <Badge variant="outline" className="text-[10px] ml-auto">
              Google Places API · supplemental
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <GoogleRatingBadge data={google} />
            {google.name ? (
              <span className="text-sm text-muted-foreground">{google.name}</span>
            ) : null}
          </div>
          {google.formatted_address ? (
            <p className="text-xs text-muted-foreground">{google.formatted_address}</p>
          ) : null}
          {google.review_snippets?.length ? (
            <ul className="space-y-2 text-xs text-muted-foreground border-t pt-3">
              {google.review_snippets.slice(0, 3).map((r, i) => (
                <li key={i}>
                  <span className="font-medium text-foreground">{r.rating}★</span>
                  {r.author ? ` · ${r.author}` : ''}
                  {r.relative_time ? ` · ${r.relative_time}` : ''}
                  <p className="mt-0.5 line-clamp-2">{r.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      ) : google?.status === 'error' || google?.status === 'not_found' ? (
        <p className="text-xs text-muted-foreground rounded-md border border-dashed p-3">
          Google Places:{' '}
          {google.status === 'not_found' ? 'No matching business found.' : 'Lookup unavailable.'}
        </p>
      ) : null}

      {showBbb && publicScrape ? <BbbOnboardingPreview data={publicScrape} /> : null}

      {publicScrape &&
      (publicScrape.trustpilot_rating != null || publicScrape.yelp_rating != null) ? (
        <Card className="border-muted bg-muted/30 p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Globe className="h-4 w-4 text-muted-foreground" aria-hidden />
            <span className="text-sm font-semibold">Other public web ratings</span>
            <Badge variant="secondary" className="text-[10px] ml-auto">
              Public / scraped · lowest confidence
            </Badge>
          </div>
          <PublicScrapeBadges data={publicScrape} excludeBbb />
          <p className="text-xs text-muted-foreground">
            Scraped from public Trustpilot and Yelp pages. Confirm independently before booking.
          </p>
        </Card>
      ) : null}

      {fmcsa?.legalName ? (
        <p className="text-xs text-muted-foreground flex items-start gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" aria-hidden />
          <span>
            <strong className="font-medium text-foreground">FMCSA is primary.</strong> Google
            Places API is supplemental. BBB and other public scrape data are shown for
            transparency only — lowest confidence tier.
          </span>
        </p>
      ) : null}
    </div>
  );
}