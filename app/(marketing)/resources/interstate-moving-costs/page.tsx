import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  DollarSign,
  HelpCircle,
  Home,
  MapPin,
  Phone,
  PiggyBank,
  ShieldCheck,
  TrendingDown,
  Truck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideCtaClient } from '@/components/resources/guide-cta-client';
import { GuideFooter } from '@/components/resources/guide-footer';
import { TrustBadges } from '@/components/trust/trust-badges';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

const TITLE = 'Interstate Moving Costs 2026: Average Prices, Factors & Smart Savings Tips';
const DESCRIPTION =
  'Discover 2026 interstate moving costs—from studio to 4-bedroom homes. Learn what drives prices, realistic averages by distance, and proven ways to save without sacrificing quality. Use our free calculator and independent mover directory.';

const homeSizeCosts = [
  {
    size: 'Studio / 1-Bedroom',
    specs: '1,000–2,000 lbs · 500–1,000 cu ft',
    range: '$4,000 – $7,500',
    note: 'Local to 1,000 miles',
  },
  {
    size: '2-Bedroom',
    specs: '3,000–5,000 lbs',
    range: '$5,500 – $9,500',
    note: 'Most common starter home move',
  },
  {
    size: '3-Bedroom',
    specs: '7,000–12,000 lbs',
    range: '$7,000 – $15,000+',
    note: 'Family home average',
  },
  {
    size: '4-Bedroom+',
    specs: '15,000+ lbs',
    range: '$12,000 – $25,000+',
    note: 'Large household or full home',
  },
];

const distanceCosts = [
  { miles: '500–1,000 miles', range: '$6,000 – $10,000', example: 'Atlanta → Chicago' },
  { miles: '1,000–2,000 miles', range: '$8,000 – $14,000', example: 'Dallas → New York' },
  { miles: '2,000+ miles', range: '$10,000 – $20,000+', example: 'Los Angeles → Miami' },
];

const costDrivers = [
  {
    icon: Home,
    title: 'Home Size & Shipment Weight',
    description:
      'Cubic footage and total weight remain the primary variables. Accurate inventories prevent unexpected charges.',
  },
  {
    icon: MapPin,
    title: 'Distance',
    description:
      'Longer hauls increase fuel, driver time, and toll expenses. Coast-to-coast moves carry the highest per-mile costs.',
  },
  {
    icon: Calendar,
    title: 'Time of Year & Peak Demand',
    description:
      'Summer months and end-of-month dates command premium pricing. Off-peak windows can save 15–25%.',
  },
  {
    icon: Truck,
    title: 'Services Requested',
    description:
      'Full packing, disassembly/reassembly, specialty items (pianos, safes), and storage-in-transit add costs.',
  },
  {
    icon: DollarSign,
    title: 'Accessibility',
    description:
      'Stairs, elevators, parking restrictions, or remote locations raise labor fees and extend loading time.',
  },
  {
    icon: ShieldCheck,
    title: 'Insurance & Valuation',
    description:
      'Full Value Protection costs more than basic released-value coverage (60 cents per pound per article).',
  },
];

const savingsTips = [
  {
    title: 'Declutter aggressively',
    detail: 'Reducing shipment size by 20–30% can save thousands in transportation and labor costs.',
  },
  {
    title: 'Choose off-peak dates',
    detail:
      'Mid-week, mid-month, or non-summer moves often cost 15–25% less than peak season. See our best time to move guide for month-by-month planning.',
  },
  {
    title: 'Get multiple binding estimates',
    detail: 'Compare at least 3–4 written quotes from FMCSA-registered companies before committing.',
  },
  {
    title: 'Pack yourself',
    detail: 'Handling non-fragile items saves on packing labor — often $1,000 or more.',
  },
  {
    title: 'Bundle services',
    detail: 'Combining household goods with auto transport can yield meaningful discounts.',
  },
  {
    title: 'Use accurate inventories',
    detail: 'Our Moving Calculator helps create precise lists for better, more reliable quotes.',
  },
  {
    title: 'Book early',
    detail: 'Advance reservations secure better availability and rates before peak demand spikes.',
  },
];

const costBreakdown = [
  { label: 'Transportation & Labor', pct: '60–70%', width: 65, color: 'bg-primary' },
  { label: 'Packing Materials & Services', pct: '15–25%', width: 20, color: 'bg-blue-500' },
  { label: 'Fuel & Tolls', pct: '5–10%', width: 8, color: 'bg-amber-500' },
  { label: 'Insurance & Extras', pct: '5–10%', width: 8, color: 'bg-emerald-500' },
];

const platformFeatures = [
  'Free, no-obligation quotes from pre-screened, licensed interstate movers',
  'Side-by-side comparisons of pricing, services, and reputation data',
  'Moving Calculator for accurate size/weight estimates',
  'Transparent FMCSA licensing and review information',
];

const faqs = [
  {
    question: 'What is the cheapest month to move interstate in 2026?',
    answer:
      'January–March and mid-week dates typically offer the lowest rates due to reduced demand. Avoid late May through August and month-end weekends when possible.',
  },
  {
    question: 'Are binding estimates required for interstate moves?',
    answer:
      'Not required, but highly recommended. A binding estimate locks in the price with limited exceptions for added items discovered on moving day.',
  },
  {
    question: 'How can I avoid surprise fees?',
    answer:
      'Insist on written estimates after a visual survey or detailed inventory. Verify all charges upfront and confirm whether the estimate is binding or non-binding.',
  },
  {
    question: 'Does distance affect price more than weight?',
    answer:
      'Both matter significantly. Longer distances amplify per-mile and fuel costs, while weight drives labor, equipment, and truck size requirements.',
  },
  {
    question: 'Should I pay for full-value protection insurance?',
    answer:
      'Consider it for high-value items. Basic released-value coverage is minimal — 60 cents per pound per article. Review all valuation options carefully with your mover.',
  },
  {
    question: 'Can brokers quote lower prices?',
    answer:
      'They sometimes do initially, but final costs depend on the assigned carrier. Always compare total value, not just the headline quote. See our carrier vs broker guide for details.',
  },
];

export const metadata = buildResourceMetadata(
  '/resources/interstate-moving-costs',
  TITLE,
  DESCRIPTION
);

export default function InterstateMovingCostsPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path="/resources/interstate-moving-costs"
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
              <span className="text-xs text-muted-foreground">9 min read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.15] text-balance">
              Interstate Moving Costs 2026
            </h1>
            <p className="mt-2 text-lg text-muted-foreground font-medium">
              Average prices, key factors &amp; smart savings tips
            </p>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              The cost of an interstate move remains one of the biggest concerns for families
              relocating across state lines. With inflation, fuel prices, and demand fluctuations,
              obtaining clear pricing information proves challenging — and lowball quotes often lead
              to significant increases on moving day.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card px-5 py-4 text-center shadow-sm">
                <div className="text-3xl font-semibold tracking-tight text-primary">$4,500</div>
                <p className="text-xs text-muted-foreground mt-1">Typical low end (2026)</p>
              </div>
              <div className="rounded-xl border bg-card px-5 py-4 text-center shadow-sm">
                <div className="text-3xl font-semibold tracking-tight text-foreground">$12,000+</div>
                <p className="text-xs text-muted-foreground mt-1">Typical high end (2026)</p>
              </div>
            </div>

            <div className="mt-8">
              <GuideCtaClient />
            </div>
            <TrustBadges variant="compact" className="mt-6" />

            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
              At{' '}
              <Link href="/" className="text-primary underline underline-offset-2">
                Move Trust Hub
              </Link>
              , our independent tools — including the free{' '}
              <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                Moving Calculator
              </Link>{' '}
              and side-by-side comparisons — help you obtain transparent quotes from verified,
              licensed movers with no paid placements.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10 max-w-3xl space-y-14">
          {/* Average costs by home size */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Average interstate moving costs in 2026
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Costs vary significantly based on move specifics. The following figures represent
              typical market ranges for 2026 based on industry data and verified mover reports.
              Actual prices require personalized quotes.
            </p>

            <div className="space-y-3">
              {homeSizeCosts.map(({ size, specs, range, note }) => (
                <div
                  key={size}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border bg-card p-5 shadow-sm"
                >
                  <div>
                    <h3 className="font-semibold text-sm">{size}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{specs}</p>
                    <p className="text-xs text-muted-foreground">{note}</p>
                  </div>
                  <div className="text-xl font-semibold tracking-tight text-primary shrink-0">
                    {range}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Additional services such as packing, storage, or auto transport increase totals by
              20–50%.
            </p>
          </section>

          {/* Distance-based costs */}
          <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Distance-based pricing (3-bedroom home)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Distance is one of the strongest cost multipliers. These ranges reflect approximate
              2026 pricing for a typical 3-bedroom household.
            </p>

            <div className="space-y-3">
              {distanceCosts.map(({ miles, range, example }) => (
                <div
                  key={miles}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border bg-card px-5 py-4"
                >
                  <div>
                    <p className="font-medium text-sm">{miles}</p>
                    <p className="text-xs text-muted-foreground">{example}</p>
                  </div>
                  <p className="font-semibold text-primary shrink-0">{range}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="sm">
                <Link href="/moving-calculator">
                  <Calculator className="mr-2 h-4 w-4" />
                  Get Your Free Estimate
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/resources/routes">Browse Route Guides</Link>
              </Button>
            </div>
          </section>

          {/* Cost drivers */}
          <section>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              What drives the cost of your move?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Several key factors determine the final price. Understanding each one helps you budget
              accurately and spot quotes that seem too good to be true.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {costDrivers.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-xl border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-blue-200/80 bg-blue-50/50 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-medium">Carrier vs broker impact:</strong>{' '}
              Direct carriers with their own fleets often provide firmer pricing after surveys,
              while brokers may offer lower initial quotes that change upon carrier assignment.{' '}
              <Link
                href="/resources/carrier-vs-broker"
                className="text-primary underline underline-offset-2"
              >
                Read our full comparison guide →
              </Link>
            </div>
          </section>

          {/* Savings tips */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
                <PiggyBank className="h-5 w-5 text-emerald-700" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Proven ways to save on your interstate move
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You can reduce costs significantly without compromising safety or reliability.
            </p>

            <ul className="space-y-3">
              {savingsTips.map(({ title, detail }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-5">
              <p className="text-sm font-medium mb-1">Pro tip</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Filter movers on{' '}
                <Link href="/companies" className="text-primary underline underline-offset-2">
                  Move Trust Hub
                </Link>{' '}
                by reputation score and complaint ratio to ensure savings do not come at the expense
                of service quality.
              </p>
            </div>
          </section>

          {/* Cost breakdown */}
          <section className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Cost breakdown example
            </h2>
            <p className="text-sm text-muted-foreground mb-1">
              3-bedroom home · 1,200-mile move
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Requesting a detailed written estimate that specifies all line items prevents
              surprises on delivery day.
            </p>

            <div className="space-y-4">
              {costBreakdown.map(({ label, pct, width, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium">{label}</span>
                    <span className="text-muted-foreground">{pct}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${color}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How MTH helps */}
          <section>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <TrendingDown className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How Move Trust Hub helps you control costs
              </h2>
            </div>

            <ul className="space-y-2.5 mt-4">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/compare">
                  Compare Movers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/moving-calculator">Moving Calculator</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/companies">Compare Trusted Movers</Link>
              </Button>
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

          {/* Conclusion CTA */}
          <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-primary/5 to-transparent p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              Take control of your move budget
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Interstate moving costs in 2026 vary widely, but knowledge and preparation deliver
              substantial savings and peace of mind. Use our free calculator and
              compare FMCSA-licensed carriers in our independent directory before you book.
            </p>

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
              <Button asChild variant="outline" size="lg">
                <Link href="/companies">Browse Movers</Link>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" />
              <span>
                Or call our specialist team at{' '}
                <a href="tel:18009181477" className="text-primary font-medium hover:underline">
                  1-800-918-1477
                </a>
              </span>
            </div>
          </section>

          <GuideFooter
            relatedSlugs={[
              'best-time-to-move',
              'move-size-weight',
              'how-to-choose',
              'carrier-vs-broker',
              'routes',
              'checklist',
            ]}
          />

          <p className="text-xs text-muted-foreground text-center pb-4">
            Always verify licensing directly with{' '}
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