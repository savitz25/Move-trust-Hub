import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarDays,
  CheckCircle2,
  CloudSnow,
  HelpCircle,
  PiggyBank,
  ShieldCheck,
  Sun,
  Thermometer,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideCtaClient } from '@/components/resources/guide-cta-client';
import { GuideFooter } from '@/components/resources/guide-footer';
import { TrustBadges } from '@/components/trust/trust-badges';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

const TITLE = 'Best Time to Move Interstate in 2026: Seasonal Pricing & Tips';
const DESCRIPTION =
  'Discover the best time to move interstate in 2026. Compare peak vs off-peak pricing, weather risks, and booking windows. Use our free calculator and compare quotes on MoveTrustHub.com.';

const quickReference = [
  {
    variable: 'Peak Season (May–Sept)',
    cost: 'High (15–30% premium)',
    availability: 'Extremely tight',
    recommendation: 'Avoid if possible; book 4–6 weeks early',
  },
  {
    variable: 'Off-Peak Season (Oct–April)',
    cost: 'Low (baseline rates)',
    availability: 'Wide open',
    recommendation: 'Best time for maximum cost savings',
  },
  {
    variable: 'Mid-Month (4th–24th)',
    cost: 'Lower rates',
    availability: 'Moderate',
    recommendation: 'Ideal for flexible schedules',
  },
  {
    variable: 'End/Start of Month',
    cost: 'Higher rates',
    availability: 'Very tight',
    recommendation: 'Avoid due to lease turnovers',
  },
  {
    variable: 'Mid-Week (Tues–Thurs)',
    cost: 'Cheaper rates',
    availability: 'Good',
    recommendation: 'Best weekly window to save money',
  },
  {
    variable: 'Weekends (Fri–Mon)',
    cost: 'Premium rates',
    availability: 'Very tight',
    recommendation: 'High demand; lines up with work schedules',
  },
];

const seasons = [
  {
    icon: Sun,
    season: 'Summer',
    period: 'Late May through Labor Day',
    label: 'Peak Season',
    color: 'rose',
    cost: 'Expect the highest rates of the year. Carriers routinely add peak-season surcharges because demand heavily outstrips truck capacity.',
    risks: [
      'Crews working back-to-back jobs — higher industry-wide claim rates',
      'Frequent delays as trucks run at maximum volume capacity',
      'Limited availability; last-minute bookings often cost 20%+ more',
    ],
    tip: 'If summer is unavoidable, book 4–6 weeks ahead and request binding estimates after a virtual survey.',
  },
  {
    icon: Thermometer,
    season: 'Fall',
    period: 'September through November',
    label: 'Transition Period',
    color: 'amber',
    cost: 'Prices begin to normalize. Peak surcharges typically vanish by mid-September as school-year demand drops.',
    risks: [
      'Hurricane season can disrupt Southeast and Gulf Coast corridors',
      'Early October remains busy in college towns',
    ],
    tip: 'September and October offer strong value — experienced crews with more time per job.',
  },
  {
    icon: CloudSnow,
    season: 'Winter',
    period: 'December through February',
    label: 'Bargain Window',
    color: 'blue',
    cost: 'The most affordable time to move cross-country. Companies frequently offer promotional discounts or waive accessory fees to keep trucks moving.',
    risks: [
      'Blizzards in the Midwest and Northeast can delay delivery windows',
      'Icy loading conditions increase handling time for fragile items',
      'Holiday weeks (late Dec–early Jan) see a brief demand spike',
    ],
    tip: 'January and February historically deliver the lowest baseline rates of the year.',
  },
  {
    icon: Calendar,
    season: 'Spring',
    period: 'March through early May',
    label: 'Sweet Spot',
    color: 'emerald',
    cost: 'Rates remain close to winter baselines until mid-May, when the summer rush begins.',
    risks: [
      'Spring break and college move-out weeks create localized spikes',
      'Rates climb quickly after Memorial Day weekend',
    ],
    tip: 'March and April balance mild weather with near-off-peak pricing — a top choice for families.',
  },
];

const seasonColorMap = {
  rose: {
    border: 'border-rose-200/80',
    bg: 'bg-rose-50/50',
    icon: 'bg-rose-100 text-rose-700',
    badge: 'bg-rose-100 text-rose-800',
  },
  amber: {
    border: 'border-amber-200/80',
    bg: 'bg-amber-50/50',
    icon: 'bg-amber-100 text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
  },
  blue: {
    border: 'border-blue-200/80',
    bg: 'bg-blue-50/50',
    icon: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-100 text-blue-800',
  },
  emerald: {
    border: 'border-emerald-200/80',
    bg: 'bg-emerald-50/50',
    icon: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
  },
};

const planningSteps = [
  {
    step: '01',
    title: 'Pinpoint the week and day',
    items: [
      'Aim for the core of the month — between the 4th and the 24th',
      'Book load dates on Tuesday, Wednesday, or Thursday',
      'Avoid the 25th through the 3rd when lease turnovers flood demand',
    ],
  },
  {
    step: '02',
    title: 'Calculate your move size early',
    items: [
      'Catalog your home room by room before calling any mover',
      'Purge items you no longer need — less weight means lower cost',
      'calculator',
    ],
  },
  {
    step: '03',
    title: 'Compare at least 3 independent quotes',
    items: [
      'Never trust a phone estimate without a virtual or in-person survey',
      'Compare binding vs non-binding estimates side by side',
      'compare',
    ],
  },
  {
    step: '04',
    title: 'Verify FMCSA authority before booking',
    items: [
      'Confirm active USDOT and MC numbers on FMCSA.gov',
      'Check that authority includes Household Goods',
      'Review complaint history relative to shipment volume',
    ],
  },
];

const fmcsaSteps = [
  'Get the company\'s USDOT and MC numbers before signing anything',
  'Visit the FMCSA Company Snapshot at fmcsa.dot.gov (or protectyourmove.gov)',
  'Verify operating authority status shows "Authorized" for Household Goods',
  'Review complaint ratios, safety ratings, and fleet size',
  'Cross-reference with Move Trust Hub reputation scores and verified reviews',
];

const schoolScheduleTips = [
  {
    audience: 'Families with school-age children',
    advice:
      'Late May through early June and mid-August remain peak windows. If flexible, consider a December or January move during winter break for lower rates — then enroll children for the spring semester.',
  },
  {
    audience: 'College students & graduates',
    advice:
      'Avoid late August and early September near campus towns. Mid-May and early June offer better pricing before the mass summer rush begins.',
  },
  {
    audience: 'Remote workers & flexible schedules',
    advice:
      'Mid-week, mid-month moves in January, February, or November deliver the deepest discounts. Your flexibility is a negotiating advantage.',
  },
];

const faqs = [
  {
    question: 'What is the single cheapest month to move interstate?',
    answer:
      'Historically, January and February are the cheapest months to move interstate. Consumer demand drops to its lowest annual point after the winter holidays, and moving companies lower baseline rates and offer promotions to keep crews employed and trucks on the road.',
  },
  {
    question: 'How far in advance should I book an interstate mover in 2026?',
    answer:
      'For peak summer season (May through September), book 4 to 6 weeks in advance to secure a licensed, highly rated carrier. For off-peak months (October through April), a window of 2 to 3 weeks is generally sufficient — though earlier is always safer.',
  },
  {
    question: 'Do moving prices increase on weekends?',
    answer:
      'Yes. Most consumers prefer weekend moves to minimize time away from work or school. Moving companies routinely charge premium rates for Friday, Saturday, and Monday dates. Booking a mid-week move (Tuesday through Thursday) is one of the easiest ways to lower your quote.',
  },
  {
    question: 'Can weather delays affect my winter moving costs?',
    answer:
      'A reputable carrier operating under a binding flat-rate estimate cannot arbitrarily raise your price due to a weather delay. However, severe winter weather can disrupt logistics and extend your delivery window. Always discuss inclement weather policies before booking.',
  },
  {
    question: 'How much can I save by moving off-peak vs peak season?',
    answer:
      'Industry data consistently shows peak-season surcharges of 15–30% over winter baseline rates. On a typical 1,000-mile, 2–3 bedroom move, shifting from a July Saturday to a November Tuesday can save $1,000–$1,650 or more on transportation costs alone.',
  },
  {
    question: 'Does Move Trust Hub recommend specific moving dates?',
    answer:
      'No. We are an independent directory with no paid placements. We provide data-driven planning guidance and free tools — calculator, comparisons, and quotes — so you can choose dates and companies based on your priorities. Always verify licensing directly with FMCSA.gov.',
  },
];

export const metadata = buildResourceMetadata(
  '/resources/best-time-to-move',
  TITLE,
  DESCRIPTION
);

export default function BestTimeToMovePage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path="/resources/best-time-to-move"
        datePublished="2026-06-25"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto px-4 py-10 max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all resources
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Planning Guide
              </Badge>
              <span className="text-xs text-muted-foreground">10 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] text-balance">
              Best Time to Move Interstate in 2026
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-medium">
              Seasonal pricing, availability &amp; planning tips
            </p>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Planning an interstate move is one of life&apos;s most significant transitions.
              Whether you are relocating from California to Texas, New York to Florida, or Virginia
              to anywhere across the country, timing your move correctly can save you thousands of
              dollars. The exact same three-bedroom household move can cost drastically different
              amounts depending on the month, week, or even day you choose.
            </p>

            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
              In 2026, elevated housing costs and tight carrier operational budgets mean moving
              companies focus heavily on maximizing margins during peak windows. Industry operational
              reports indicate peak moving season can command a{' '}
              <strong className="text-foreground font-medium">15% to 30% pricing premium</strong>{' '}
              over winter off-peak months. Understanding these seasonal dynamics is your best weapon
              against overcharging.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card px-5 py-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <TrendingUp className="h-4 w-4 text-rose-600" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Peak summer move
                  </span>
                </div>
                <div className="text-3xl font-semibold tracking-tight text-rose-600">$5,600+</div>
                <p className="text-xs text-muted-foreground mt-1">1,000-mile, 2–3 BR home</p>
              </div>
              <div className="rounded-xl border bg-card px-5 py-4 text-center shadow-sm">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <TrendingDown className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Off-peak winter move
                  </span>
                </div>
                <div className="text-3xl font-semibold tracking-tight text-emerald-600">$3,950</div>
                <p className="text-xs text-muted-foreground mt-1">Same route &amp; inventory</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Potential savings of{' '}
              <strong className="text-emerald-700 font-medium">$1,650+</strong> by shifting from a
              Saturday in July to a Tuesday in November — based on 2026 long-distance market data
              for a typical 1,000-mile relocation.{' '}
              <Link
                href="/resources/interstate-moving-costs"
                className="text-primary underline underline-offset-2"
              >
                See full cost breakdown →
              </Link>
            </p>

            <div className="mt-8">
              <GuideCtaClient />
            </div>
            <TrustBadges variant="compact" className="mt-6" />
          </div>
        </section>

        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-14">
          {/* Quick reference table */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Best time to move cross-country: quick reference
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Use this table to compare timing variables at a glance. Combine an off-peak month with
              a mid-month, mid-week date for maximum savings.
            </p>

            <div className="overflow-x-auto rounded-2xl border shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/60">
                    <th className="p-4 text-left font-semibold min-w-[160px]">Timing Variable</th>
                    <th className="p-4 text-left font-semibold min-w-[130px]">Cost Impact</th>
                    <th className="p-4 text-left font-semibold min-w-[120px]">Availability</th>
                    <th className="p-4 text-left font-semibold min-w-[180px]">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {quickReference.map((row) => (
                    <tr key={row.variable} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">{row.variable}</td>
                      <td className="p-4 text-muted-foreground">{row.cost}</td>
                      <td className="p-4 text-muted-foreground">{row.availability}</td>
                      <td className="p-4 text-muted-foreground">{row.recommendation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Four seasons */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              The four seasons of interstate moving
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The moving industry is highly cyclical. Each season brings distinct pricing patterns,
              crew availability, and risk factors you should weigh before locking in a date.
            </p>

            <div className="space-y-5">
              {seasons.map(({ icon: Icon, season, period, label, color, cost, risks, tip }) => {
                const styles = seasonColorMap[color as keyof typeof seasonColorMap];
                return (
                  <div
                    key={season}
                    className={`rounded-2xl border ${styles.border} ${styles.bg} p-6 sm:p-8`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span
                          className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${styles.badge} mb-2`}
                        >
                          {label}
                        </span>
                        <h3 className="text-xl font-semibold tracking-tight">
                          {season}{' '}
                          <span className="text-muted-foreground font-normal text-base">
                            ({period})
                          </span>
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      <strong className="text-foreground font-medium">Pricing:</strong> {cost}
                    </p>

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Risks &amp; considerations
                    </p>
                    <ul className="space-y-1.5 mb-4">
                      {risks.map((risk) => (
                        <li key={risk} className="flex items-start gap-2 text-sm leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                          {risk}
                        </li>
                      ))}
                    </ul>

                    <div className="rounded-xl border bg-card/60 px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                      <strong className="text-foreground font-medium">Pro tip:</strong> {tip}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Cost example */}
          <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <PiggyBank className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  How smart timing protects your wallet
                </h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  A typical 1,000-mile move — such as a 2-to-3 bedroom home from Ohio to Florida —
                  carries a 2026 baseline cost range of{' '}
                  <strong className="text-foreground font-medium">$3,944 to $5,689</strong> for
                  full-service interstate relocation. Timing alone can push you to either end of that
                  spectrum.
                </p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-3">
                <span className="text-rose-600 font-semibold w-36 shrink-0">Peak (July Sat)</span>
                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[95%] rounded-full bg-rose-500" />
                </div>
                <span className="text-rose-600 font-semibold shrink-0">$5,600+</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-600 font-semibold w-36 shrink-0">Off-peak (Nov Tue)</span>
                <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                  <div className="h-full w-[65%] rounded-full bg-emerald-500" />
                </div>
                <span className="text-emerald-600 font-semibold shrink-0">$3,950</span>
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
              By skipping peak surcharges and landing at the bottom of the pricing spectrum, you
              protect over <strong className="text-emerald-700 font-medium">$1,650</strong> on
              transportation costs alone. Pair timing with accurate sizing via our{' '}
              <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                free Moving Calculator
              </Link>{' '}
              to compound your savings.
            </p>
          </section>

          {/* School schedules */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <CalendarDays className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                School schedules &amp; family timing
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Academic calendars drive a large share of peak-season demand. If your household has
              flexibility, aligning your move outside these windows unlocks better rates and calmer
              crews.
            </p>

            <div className="space-y-4">
              {schoolScheduleTips.map(({ audience, advice }) => (
                <div key={audience} className="rounded-xl border bg-card p-5 shadow-sm">
                  <h3 className="font-semibold text-sm mb-2">{audience}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{advice}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Planning steps */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Step-by-step calendar planning strategy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Once you have selected a low-demand month, drill into the weekly and daily calendar.
              Landlords typically require leases to end on the last day of the month or the 1st —
              which is why trucks are swamped from the 25th to the 3rd.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {planningSteps.map(({ step, title, items }) => (
                <div key={step} className="rounded-xl border bg-card p-5 shadow-sm">
                  <span className="text-xs font-bold text-primary/70 tracking-wider">{step}</span>
                  <h3 className="font-semibold mt-1 mb-3">{title}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {item === 'calculator' ? (
                          <>
                            Use our{' '}
                            <Link
                              href="/moving-calculator"
                              className="text-primary underline underline-offset-2"
                            >
                              Moving Calculator
                            </Link>{' '}
                            for accurate cubic feet and weight estimates
                          </>
                        ) : item === 'compare' ? (
                          <>
                            Use our{' '}
                            <Link
                              href="/compare"
                              className="text-primary underline underline-offset-2"
                            >
                              comparison tool
                            </Link>{' '}
                            to review FMCSA licensing, complaint ratios, and reviews
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Mid-page CTA */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Compare movers before you commit to a date
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Move Trust Hub is a completely independent directory — we do not accept paid
              placements from moving carriers. Use our transparent tools to evaluate top-rated
              interstate movers based on real reviews, FMCSA complaint ratios, and reputation scores.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-sm">
                <Link href="/compare">
                  Compare Movers Side-by-Side
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/companies">Browse Mover Directory</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resources/routes">Route Planning Guides</Link>
              </Button>
            </div>
          </section>

          {/* FMCSA safety */}
          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                <ShieldCheck className="h-5 w-5 text-amber-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight mb-2">
                  Consumer protection: the non-negotiable FMCSA check
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  No matter what time of year you move, scam prevention must be your highest
                  priority. Rogue movers prey on anxious consumers with lowball quotes, then hold
                  household goods hostage until thousands in hidden fees are paid. The Move Trust
                  Hub safety protocol:
                </p>
                <ul className="space-y-2.5">
                  {fmcsaSteps.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {step.includes('fmcsa.dot.gov') ? (
                        <>
                          Visit the FMCSA Company Snapshot at{' '}
                          <a
                            href="https://www.fmcsa.dot.gov"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline underline-offset-2"
                          >
                            fmcsa.dot.gov
                          </a>{' '}
                          (or protectyourmove.gov)
                        </>
                      ) : (
                        step
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  Learn more in our{' '}
                  <Link
                    href="/resources/fmcsa"
                    className="text-primary underline underline-offset-2"
                  >
                    FMCSA safety ratings guide
                  </Link>{' '}
                  and{' '}
                  <Link
                    href="/resources/scams"
                    className="text-primary underline underline-offset-2"
                  >
                    scam red flags checklist
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border bg-card shadow-sm [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-medium text-sm sm:text-base hover:bg-muted/30 transition-colors rounded-xl">
                    {faq.question}
                    <span className="text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t pt-4">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Lock in your off-peak rate today
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-1">
              Timing your move strategically is the easiest way to keep your hard-earned money in your
              bank account. By choosing a mid-month, mid-week date during the off-peak season, you
              eliminate arbitrary surcharges and secure the industry&apos;s best crews.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Let Move Trust Hub strip the stress out of your upcoming relocation. We do the heavy
              lifting of vetting carriers so you don&apos;t have to — with no paid placements and no
              affiliations.
            </p>

            <div className="rounded-xl border bg-card p-5 sm:p-6 mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Move Trust Hub free toolbox
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  Free Moving Calculator for accurate size estimates
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  Side-by-side mover comparisons with FMCSA data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  Independent directory — no lead fees, no paid placements
                </li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-sm">
                  <Link href="/companies">
                    Compare Trusted Movers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/moving-calculator">Moving Calculator</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                Questions?{' '}
                <Link href="/contact" className="text-primary font-medium hover:underline">
                  Contact us
                </Link>
              </span>
            </div>
          </section>

          <GuideFooter
            relatedSlugs={[
              'interstate-moving-costs',
              'move-size-weight',
              'how-to-choose',
              'routes',
              'checklist',
            ]}
          />

          <p className="text-xs text-muted-foreground text-center pb-4">
            Always verify licensing and authority directly with{' '}
            <a
              href="https://www.fmcsa.dot.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              FMCSA.gov
            </a>
            . Move Trust Hub is an independent directory with no affiliations or paid placements.
          </p>
        </div>
      </div>
    </>
  );
}