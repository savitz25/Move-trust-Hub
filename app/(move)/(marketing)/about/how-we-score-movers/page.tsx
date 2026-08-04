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
import { AskStandardBanner } from '@/components/network/ask-standard-banner';
import { TrustMark } from '@/components/network/trust-mark';

export const metadata = buildResourceMetadata(
  METHODOLOGY_PAGE_PATH,
  'Methodology — How We Score, Vet & Source Mover Data',
  'Move Trust Hub methodology under The Ask Trust Hub Standard: reputation score, FMCSA data use, review policy, independence, data sources, limitations, and corrections.'
);

export default async function HowWeScoreMoversPage() {
  const stats = await getDirectoryTrustStatsAsync();

  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Move Trust Hub methodology',
          url: `${SITE_URL}${METHODOLOGY_PAGE_PATH}`,
          description:
            'Move Trust Hub methodology under The Ask Trust Hub Standard: reputation, review policy, FMCSA data use, independence, and corrections.',
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
            Vertical methodology · Moving
          </Badge>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Move Trust Hub methodology
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {DIRECTORY_INDEPENDENCE_TAGLINE} This is the canonical methodology for reputation
            scores, review policy, FMCSA data use, independence, and how we vet listings under The
            Ask Trust Hub Standard. County and profile pages link here instead of repeating long
            boilerplate.
          </p>
          <div className="mt-4">
            <TrustMark />
          </div>
          <div className="mt-4 max-w-2xl">
            <AskStandardBanner verticalLabel="Move Trust Hub methodology" />
          </div>
          <nav
            aria-label="Trust Center sections"
            className="mt-5 flex flex-wrap gap-2 text-xs font-medium"
          >
            {[
              { href: '#how-we-vet', label: 'How we vet' },
              { href: '#entity-matching', label: 'Entity matching' },
              { href: '#interstate-intrastate', label: 'Interstate vs local' },
              { href: '#reputation-score', label: 'Reputation Score' },
              { href: '#review-attribution', label: 'Review policy' },
              { href: '#data-sources', label: 'Data sources' },
              { href: '#updates', label: 'Updates' },
              { href: '#independence', label: 'Independence' },
              { href: '#limitations', label: 'Limitations' },
              { href: '#corrections', label: 'Corrections' },
              { href: '#badges', label: 'Badges' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border bg-background px-3 py-1.5 hover:border-primary/40 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
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
              href="https://safer.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              FMCSA SAFER
            </a>{' '}
            (and state authorities for intrastate work) before booking. FMCSA does{' '}
            <strong className="text-foreground">not</strong> recommend or endorse movers.
          </p>
        </section>

        {/* Entity matching */}
        <section id="entity-matching" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Entity matching</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Public records often list a legal name while consumers search a DBA. At a high level we
            match listings using:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-foreground">USDOT / MC numbers</strong> as primary identity
              keys when present and format-valid
            </li>
            <li>
              <strong className="text-foreground">Legal name and DBA</strong> strings against SAFER
              and related public fields (fuzzy match; rebrands can lag)
            </li>
            <li>
              <strong className="text-foreground">Address / phone cascade</strong> as supporting
              signals when primary IDs conflict or are incomplete — never as a substitute for active
              authority
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            When we cannot confidently match a record, we do not invent “verified” status. Internal
            pipeline details stay operational; this page documents the consumer-facing standard only.
          </p>
        </section>

        {/* Interstate vs intrastate */}
        <section id="interstate-intrastate" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">
            Interstate vs intrastate / local evidence
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              <h3 className="font-semibold text-foreground mb-2">Interstate household goods</h3>
              <p>
                Primary evidence is FMCSA USDOT identity, operating authority, out-of-service and
                safety context from SAFER / related public FMCSA systems. Authority status is the
                floor for “FMCSA Verified” style presentation.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              <h3 className="font-semibold text-foreground mb-2">Intrastate / local movers</h3>
              <p>
                Many states regulate local movers separately. County and local paths may rely more on
                state licensing context where available, plus attributed Google/BBB signals when a
                confirmed listing exists. Local presence is not the same as interstate authority.
              </p>
            </div>
          </div>
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
            generally indicate safer interstate choices for research prioritization. We recalculate
            when FMCSA data refreshes or new attributable reviews are published. Scores are editorial
            composites — not star averages and not an FMCSA endorsement.
          </p>
          <div className="mt-4 rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 text-sm leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">Not included in the score</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Paid advertising, sponsorship, or lead-fee relationships (none buy rank)</li>
              <li>Unattributed or fabricated reviews</li>
              <li>BBB or Google factors when no confirmed public profile is on file</li>
              <li>Private contract terms, final price, or “best mover” guarantees</li>
            </ul>
          </div>
        </section>

        {/* Review Attribution */}
        <section id="review-attribution" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
              <Star className="h-5 w-5 text-amber-600" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Review policy</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {REVIEW_TRANSPARENCY_DISCLAIMER}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Hosted / moderated reviews</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Community submissions on <Link href="/review" className="text-primary underline">/review</Link>{' '}
                are moderated before publish. Only those reviews may appear in schema.org Review /
                AggregateRating markup on community profiles.
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Third-party ratings (external)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                Google, BBB, and similar platforms are shown as <strong className="text-foreground">labeled external references</strong> with outbound links. We do not republish full third-party review body text. Count: {formatAttributedReviewsLabel(stats.attributableReviews)} historical references on file (not schema).
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Industry-reported volume</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground leading-relaxed">
                <p className="mb-2">{EDITORIAL_REVIEW_VOLUME_NOTE}</p>
                Display-only context on directory cards — never mixed into AggregateRating schema.
              </CardContent>
            </Card>
          </div>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            {ATTRIBUTED_REVIEWS_EXPLANATION}
          </p>
        </section>

        <section id="independence" className="scroll-mt-24">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Independence & paid rankings</h2>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                Move Trust Hub is an independent research directory. We do not sell leads to movers,
                accept paid placements for higher rankings, or boost scores for advertising partners.
                Contact tools help you reach carriers you choose — we are not a quote marketplace.
              </p>
            </div>
          </div>
        </section>

        <section id="limitations" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Data sources & limitations</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-foreground">FMCSA</strong> provides licensing, authority, and
              safety context — not consumer pricing tables or star ratings.
            </li>
            <li>
              Local cost ranges on county pages are <strong className="text-foreground">editorial estimates</strong> from market research, not government price data.
            </li>
            <li>
              Google Places and BBB snapshots can lag or mismatch; always re-check official sources before booking.
            </li>
            <li>
              Reputation Score is an editorial composite, not a substitute for multiple written estimates and in-person diligence.
            </li>
          </ul>
        </section>

        <section id="updates" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Update / refresh</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 leading-relaxed">
            <li>
              <strong className="text-foreground">FMCSA-derived fields</strong> (authority, safety
              context, related SAFER signals) refresh through scheduled data pipelines where built
            </li>
            <li>
              <strong className="text-foreground">Directory / county pages</strong> revalidate after
              publish and enrichment events
            </li>
            <li>
              <strong className="text-foreground">Editorial copy</strong> (cost ranges, guides) is
              reviewed on a content cadence — not every sentence is live-fed from FMCSA
            </li>
            <li>
              <strong className="text-foreground">Google / BBB snapshots</strong> only appear when a
              confirmed listing is present; they can lag or mismatch
            </li>
          </ul>
        </section>

        <section id="corrections" className="scroll-mt-24 rounded-2xl border bg-muted/20 p-6">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">Corrections &amp; your action</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Found outdated licensing, a wrong DBA, or a listing that should be removed?{' '}
            <Link href="/contact" className="text-primary font-medium underline underline-offset-2">
              Contact editorial
            </Link>{' '}
            or use company claim/portal flows when available. Named researchers are listed on the{' '}
            <Link href="/about/editorial-team" className="text-primary font-medium underline underline-offset-2">
              editorial team page
            </Link>
            .
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            <strong className="text-foreground">Before you book:</strong> re-verify the USDOT on{' '}
            <a
              href="https://safer.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline underline-offset-2"
            >
              FMCSA SAFER
            </a>
            , confirm any state intrastate license with the state agency, and get multiple written
            estimates. Move Trust Hub is a research tool — not a booking agent.
          </p>
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
                snapshots as external references (full review bodies not republished)
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
