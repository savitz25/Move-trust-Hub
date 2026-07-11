import Link from 'next/link';
import { AlertCircle, ExternalLink, ShieldCheck, Star } from 'lucide-react';
import { GoogleRatingBadge } from '@/components/verification/google-rating-badge';
import { BbbPublicDetail } from '@/components/verification/bbb-public-detail';
import { hasBbbPublicScrapeData } from '@/lib/verification/bbb-public-display';
import type { EnrichedProvider } from '@/lib/insurance/enrichment/merge';
import type { PublicScrapeData } from '@/lib/verification/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/insurance/ui/card';
import { Badge } from '@/components/insurance/ui/badge';

function enrichmentToBbbData(provider: EnrichedProvider): PublicScrapeData | null {
  const bbb = provider.enrichment?.enrichment_json.bbb;
  if (!bbb?.listed) return null;

  const data: PublicScrapeData = {
    confidence: 'public',
    bbb_rating: bbb.bbb_rating,
    bbb_review_count: bbb.bbb_review_count,
    bbb_accredited: bbb.bbb_accredited,
    bbb_accreditation_status: bbb.bbb_accreditation_status,
    bbb_profile_url: bbb.bbb_profile_url,
    bbb_recent_reviews: bbb.bbb_recent_reviews,
    bbb_file_opened: bbb.bbb_file_opened,
    bbb_accredited_since: bbb.bbb_accredited_since,
    trustpilot_rating: null,
    trustpilot_review_count: null,
    yelp_rating: null,
    yelp_review_count: null,
    sources: { bbb: { status: 'ok', method: 'public_scrape' } },
    last_scraped_at: provider.enriched_at ?? new Date().toISOString(),
  };

  return hasBbbPublicScrapeData(data) ? data : null;
}

export function TrustVerificationSummary({ provider }: { provider: EnrichedProvider }) {
  const google = provider.enrichment?.enrichment_json.google;
  const bbbData = enrichmentToBbbData(provider);
  const hasGoogle = google?.status === 'ok' && google.rating != null;
  const hasBbb = Boolean(bbbData);
  const hasTrustScore = provider.trust_score != null;

  if (!hasGoogle && !hasBbb && !hasTrustScore) {
    return null;
  }

  return (
    <section aria-labelledby="trust-verification-heading">
      <h2 id="trust-verification-heading" className="text-xl font-semibold mb-4">
        Trust &amp; Verification Summary
      </h2>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex flex-wrap items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-trust" aria-hidden />
            Independent trust signals
            {provider.is_verified && (
              <Badge variant="success" className="text-xs font-normal">
                DOI verified listing
              </Badge>
            )}
            {provider.bbb_accredited && (
              <Badge variant="outline" className="text-xs font-normal">
                BBB Accredited
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-sm">
          {hasTrustScore && (
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Trust Score</p>
              <p className="text-2xl font-bold tabular-nums mt-1">
                {provider.trust_score}
                <span className="text-base font-normal text-muted-foreground">/100</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Composite score from Google reviews, BBB standing, license verification, and tenure.
                Not influenced by paid placement.
              </p>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            {hasGoogle && google && (
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">Google Reviews</p>
                  <GoogleRatingBadge data={google} />
                </div>
                {google.review_snippets.length > 0 && (
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {google.review_snippets.slice(0, 3).map((snippet, i) => (
                      <li key={i} className="border-l-2 border-amber-400/50 pl-2 leading-relaxed">
                        <span className="inline-flex items-center gap-0.5 text-amber-600 font-medium">
                          <Star className="h-3 w-3 fill-current" aria-hidden />
                          {snippet.rating}
                        </span>
                        {snippet.relative_time ? ` · ${snippet.relative_time}` : ''}
                        <p className="mt-0.5 text-foreground/80">{snippet.text}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {google.formatted_address && (
                  <p className="text-xs text-muted-foreground">{google.formatted_address}</p>
                )}
              </div>
            )}

            {hasBbb && bbbData && (
              <div className="rounded-lg border p-4 space-y-2">
                <p className="font-medium">Better Business Bureau</p>
                <BbbPublicDetail data={bbbData} />
                {provider.bbb_complaint_count != null && provider.bbb_complaint_count > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {provider.bbb_complaint_count} BBB customer review
                    {provider.bbb_complaint_count !== 1 ? 's' : ''} on file
                  </p>
                )}
              </div>
            )}
          </div>

          {provider.needs_manual_review && (
            <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-3 text-xs text-muted-foreground">
              <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" aria-hidden />
              <p>
                Automated lookup could not confidently match this agency to Google or BBB records.
                Verify ratings directly with carriers and state DOI before choosing coverage.
              </p>
            </div>
          )}

          {provider.enriched_at && (
            <p className="text-[11px] text-muted-foreground">
              Trust data last refreshed{' '}
              {new Date(provider.enriched_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              {bbbData?.bbb_profile_url && (
                <>
                  {' · '}
                  <Link
                    href={bbbData.bbb_profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-primary hover:underline"
                  >
                    BBB profile <ExternalLink className="h-3 w-3" />
                  </Link>
                </>
              )}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}