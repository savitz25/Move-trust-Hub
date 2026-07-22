import Link from 'next/link';
import {
  BarChart3,
  ShieldCheck,
  Star,
  Scale,
  BadgeCheck,
  Database,
  ArrowRight,
  ClipboardCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { VerificationBadgeLegend } from '@/components/trust/verification-badge-legend';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';
import { SITE_URL } from '@/lib/seo/site-metadata';
import {
  REPUTATION_SCORE_FACTORS,
  REPUTATION_SCORE_THRESHOLD,
  REPUTATION_SCORE_SUMMARY,
} from '@/lib/trust/reputation-score-factors';
import {
  getDirectoryTrustStatsAsync,
  formatAttributedReviewsLabel,
  METHODOLOGY_PAGE_PATH,
  ATTRIBUTED_REVIEWS_EXPLANATION,
} from '@/lib/trust/site-stats';
import {
  REVIEW_TRANSPARENCY_DISCLAIMER,
  EDITORIAL_REVIEW_VOLUME_NOTE,
} from '@/lib/trust/review-display-policy';
import { DIRECTORY_INDEPENDENCE_TAGLINE } from '@/lib/trust/site-messaging';
import {
  FMCSA_ACRONYM_EXPANDED,
  FMCSA_PLAIN_ENGLISH,
} from '@/lib/trust/fmcsa-consumer-copy';
import {
  HOW_WE_VET_INTRO,
  MOVER_VETTING_CRITERIA,
} from '@/lib/trust/vetting-criteria';

export const metadata = buildResourceMetadata(
  METHODOLOGY_PAGE_PATH,
  'How We Score Movers — Reputation, Reviews & Vetting Criteria',
  'Transparent methodology for Move Trust Hub reputation scores, review attribution, FMCSA licensing checks, and how we vet movers. Independent directory — honest review counts.'
);

export default async function HowWeScoreMoversPage() {
  const stats = await getDirectoryTrustStatsAsync();

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'How We Score Movers',
          url: `${SITE_URL}${METHODOLOGY_PAGE_PATH}`,
          description:
            'Move Trust Hub scoring methodology for reputation scores, review attribution, and FMCSA verification.',
          isPartOf: { '@type': 'WebSite', name: 'Move Trust Hub', url: SITE_URL },
        }}
      />

      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-14 max-w-4xl">
          <div className="mb-6">
            <MethodologyBackNav
              fallbackHref="/companies"
              fallbackLabel="Back to Directory"
            />
          </div>
          <Badge variant="secondary" className="mb-4">
            Transparency · Methodology
          </Badge>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            How We Score Movers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {DIRECTORY_INDEPENDENCE_TAGLINE} This page explains every number you see on our
            directory — reputation scores, review counts, verification badges, and how we vet
            listings.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border bg-background px-3 py-1.5 tabular-nums">
              {stats.verifiedMovers.toLocaleString()} FMCSA-licensed listings
            </span>
            <span className="rounded-full border bg-background px-3 py-1.5">
              {formatAttributedReviewsLabel(stats.attributableReviews)}
            </span>
            <span className="rounded-full border bg-background px-3 py-1.5 tabular-nums">
              {stats.averageRating}★ directory average
            </span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            <strong className="text-foreground">What is FMCSA?</strong> {FMCSA_ACRONYM_EXPANDED}{' '}
            {FMCSA_PLAIN_ENGLISH}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
        {/* How we vet */}
        <section id="how-we-vet" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
              <ClipboardCheck className="h-5 w-5 text-emerald-700" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">How we vet our movers</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">{HOW_WE_VET_INTRO}</p>
            </div>
          </div>

          <ol className="space-y-3" role="list">
            {MOVER_VETTING_CRITERIA.map((criterion, index) => (
              <li
                key={criterion.id}
                className="flex items-start gap-3 rounded-xl border bg-card px-4 py-3 text-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 text-xs font-bold text-emerald-800 tabular-nums">
                  {index + 1}
                </span>
                <div>
                  <div className="font-medium">{criterion.title}</div>
                  <p className="text-muted-foreground leading-relaxed mt-0.5">{criterion.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            This is a curated research directory — not a raw scrape of every company name on the
            internet. You should still re-verify USDOT authority on{' '}
            <a
              href="https://www.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              FMCSA.gov
            </a>{' '}
            before booking.
          </p>
        </section>

        {/* Reputation Score */}
        <section id="reputation-score" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Reputation Score (0–100)</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">{REPUTATION_SCORE_SUMMARY}</p>
            </div>
          </div>

          <ul className="space-y-3" role="list">
            {REPUTATION_SCORE_FACTORS.map((factor) => (
              <li
                key={factor.id}
                className="flex items-start gap-3 rounded-xl border bg-card px-4 py-3 text-sm"
              >
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary tabular-nums">
                  {factor.weight}
                </span>
                <div>
                  <div className="font-medium">{factor.label}</div>
                  <p className="text-muted-foreground leading-relaxed mt-0.5">{factor.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Scores at or above <strong className="text-foreground">{REPUTATION_SCORE_THRESHOLD}</strong>{' '}
            generally indicate safer interstate choices. We recalculate when FMCSA data refreshes or
            new attributable reviews are published. Scores are editorial composites — not star averages.
          </p>
        </section>

        {/* Review Attribution */}
        <section id="review-attribution" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
              <Star className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Review Attribution</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {REVIEW_TRANSPARENCY_DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Attributed Google reviews we publish</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground text-lg tabular-nums mb-2">
                  {formatAttributedReviewsLabel(stats.attributableReviews)}
                </p>
                {ATTRIBUTED_REVIEWS_EXPLANATION} This total is calculated from live directory data
                (Google review snippets on company profiles plus curated on-site excerpts) and updates
                automatically as companies are added.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Industry-reported volume</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">{EDITORIAL_REVIEW_VOLUME_NOTE}</p>
                Shown on directory cards and profiles as context for editorial star ratings — never
                combined with on-site counts.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Google Places snapshot</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Live API data when available (rating + short attributed excerpts). Confirm
                independently on Google Maps before booking.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Sources */}
        <section id="data-sources" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
              <Database className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Data Sources & Freshness</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                We pull licensing, safety ratings, and complaint data from the public FMCSA SAFER
                system. Each company profile shows a dated sync note. Editorial ratings combine
                third-party research — always verify before booking.
              </p>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground" role="list">
            <li className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" aria-hidden="true" />
              <span>
                <strong className="text-foreground">FMCSA SAFER</strong> — {FMCSA_PLAIN_ENGLISH}{' '}
                USDOT authority, safety rating, complaints, shipments
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Scale className="h-4 w-4 shrink-0 mt-0.5 text-primary" aria-hidden="true" />
              <span>
                <strong className="text-foreground">BBB public data</strong> — accreditation and
                letter grade when a confirmed listing exists
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Star className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" aria-hidden="true" />
              <span>
                <strong className="text-foreground">Google Places API</strong> — live rating
                snapshots and attributed review snippets where configured
              </span>
            </li>
          </ul>
        </section>

        {/* Badges */}
        <section id="badges" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <BadgeCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Verification Badge Legend</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                Every badge on a company profile links here. Click any badge on a profile to jump to
                its definition.
              </p>
            </div>
          </div>

          <VerificationBadgeLegend showAnchors collapsible={false} />
        </section>

        <div className="rounded-2xl border bg-muted/20 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ready to compare carriers with this context? Browse the directory or verify a USDOT
            number yourself.
          </p>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Link href="/companies">
              <Button className="gap-2">
                Browse Directory <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/verify-dot">
              <Button variant="outline">Verify USDOT</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
