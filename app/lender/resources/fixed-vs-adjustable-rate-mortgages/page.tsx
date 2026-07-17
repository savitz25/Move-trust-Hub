import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  LineChart,
  Scale,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubPath } from '@/lib/hub/paths';

const TITLE =
  'Fixed-Rate vs. Adjustable-Rate Mortgages in 2026: Pros, Cons, Break-Even Analysis, and When to Choose Each';
const DESCRIPTION =
  'Fixed-rate vs. adjustable-rate mortgages in 2026: compare pros, cons, rate forecasts, and break-even math. Learn which option best fits your financial goals and risk tolerance. Use LenderTrustHub tools for transparent lender comparisons.';
const PATH = '/lender/resources/fixed-vs-adjustable-rate-mortgages';

const fixedPros = [
  'Predictable payments and budgeting',
  'Protection against rising rates',
  'Easier to refinance if rates drop',
];
const fixedCons = [
  'Higher initial interest rate than ARMs',
  'Less benefit if rates fall significantly',
];
const armPros = [
  'Lower starting rate and payment (often 0.5–1.5% below fixed)',
  'Potential savings if you sell or refinance before adjustments',
  'Good for short-term ownership',
];
const armCons = [
  'Payment uncertainty after fixed period',
  'Risk of significantly higher rates and payments',
  'More complex to understand',
];

const chooseFixed = [
  'You plan to stay in the home 7+ years',
  'You value payment certainty',
  'You are risk-averse or on a fixed income',
];
const chooseArm = [
  'You expect to sell or refinance within 5–7 years',
  'You can comfortably afford higher future payments',
  'You want to maximize cash flow in the early years',
];

const faqs = [
  {
    question: 'Are ARMs riskier in the current rate environment?',
    answer:
      'They carry more uncertainty, but caps limit how much the rate can increase each adjustment period and over the life of the loan.',
  },
  {
    question: 'Can I convert an ARM to a fixed-rate later?',
    answer:
      'Some ARMs include a conversion option, but it usually comes with a fee. Most borrowers refinance instead.',
  },
  {
    question: 'How much lower are ARM rates typically?',
    answer:
      'In 2026, introductory ARM rates are generally 0.5–1.5 percentage points below comparable fixed rates.',
  },
  {
    question: 'Does my credit score affect which loan I qualify for?',
    answer:
      'Yes. Stronger credit improves both options, but ARMs often have slightly stricter qualifying standards during the initial period.',
  },
  {
    question: 'How does LenderTrustHub help?',
    answer:
      'Our directory lets you compare NMLS-verified lenders side-by-side, review local expertise, and request transparent quotes from multiple options.',
  },
];

export const metadata = buildTemplateMetadata({
  hub: 'lender',
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources/fixed-vs-adjustable-rate-mortgages',
  type: 'article',
});

export default function FixedVsArmPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        hub="lender"
        datePublished="2026-07-17"
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
        <section className="border-b bg-gradient-to-b from-[#3B82F6]/5 via-background to-background">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <Link
              href={hubPath('lender', '/resources')}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Planning
              </Badge>
              <span className="text-xs text-muted-foreground">12 min read</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Fixed-Rate vs. Adjustable-Rate Mortgages in 2026
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Pros, cons, break-even analysis, and when to choose each
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The choice between a fixed-rate mortgage and an adjustable-rate mortgage (ARM) can
              save or cost you tens of thousands of dollars over the life of your loan. In 2026,
              with interest rates still elevated but expected to moderate, understanding the
              trade-offs has never been more important.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Fixed-rate loans offer payment stability; ARMs typically start with lower rates but
              carry the risk of future increases. This guide provides a clear comparison, includes
              realistic break-even analysis, and offers practical guidance on which option aligns
              with your situation.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              <Link
                href={hubPath('lender', '/')}
                className="text-[#3B82F6] underline underline-offset-2"
              >
                LenderTrustHub.com
              </Link>{' '}
              is an independent directory of NMLS-verified local mortgage lenders and brokers. We
              provide transparent county-level data, trust scores, and comparison tools with no paid
              placements or affiliations.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How fixed-rate and adjustable-rate mortgages work
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold">Fixed-rate mortgage</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The interest rate remains constant for the entire term (usually 15 or 30 years).
                  Your monthly principal-and-interest payment never changes.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold">Adjustable-rate mortgage (ARM)</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  The rate is fixed for an initial period (e.g., 5/1 ARM = fixed for 5 years, then
                  adjusts annually). After the introductory period, the rate adjusts based on an
                  index plus a margin.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Pros and cons comparison (2026 context)
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-5">
                <h3 className="font-semibold text-emerald-900">Fixed-rate pros</h3>
                <ul className="mt-3 space-y-2">
                  {fixedPros.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-5 font-semibold text-amber-900">Fixed-rate cons</h3>
                <ul className="mt-2 space-y-2">
                  {fixedCons.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-blue-200/80 bg-blue-50/40 p-5">
                <h3 className="font-semibold text-blue-900">ARM pros</h3>
                <ul className="mt-3 space-y-2">
                  {armPros.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <h3 className="mt-5 font-semibold text-amber-900">ARM cons</h3>
                <ul className="mt-2 space-y-2">
                  {armCons.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <LineChart className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Break-even analysis: a practical example
              </h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Assume a $400,000 loan, 30-year term, and current 2026 market rates:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Fixed-rate (30-year):</strong> 6.75% → monthly
                P&amp;I ≈ $2,594
              </li>
              <li>
                <strong className="text-foreground">5/1 ARM:</strong> 6.0% initial → monthly P&amp;I ≈
                $2,398 (first 5 years)
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Difference in monthly payment = $196. Over 5 years = $11,760 in savings with the ARM.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If rates rise and the ARM adjusts to 7.5% in year 6, payments jump to ≈ $2,798. The
              break-even point and long-term cost depend heavily on how long you keep the loan and
              future rate movements.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Use{' '}
              <Link
                href={hubPath('lender', '/calculators')}
                className="text-[#3B82F6] underline underline-offset-2"
              >
                LenderTrustHub.com calculators
              </Link>{' '}
              to run your own personalized scenarios.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <Shield className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                When to choose each option in 2026
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold">Choose fixed-rate if</h3>
                <ul className="mt-3 space-y-2">
                  {chooseFixed.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold">Choose ARM if</h3>
                <ul className="mt-3 space-y-2">
                  {chooseArm.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border bg-card px-4 py-3 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-2 border-t pt-2 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Conclusion</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The right choice between a fixed-rate and adjustable-rate mortgage depends on your
              timeline, risk tolerance, and financial goals. In 2026, careful analysis and
              personalized calculations are essential.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              LenderTrustHub.com provides independent, data-driven tools to research and compare
              lenders so you can make the decision with confidence.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Start comparing mortgage options today. Explore local lenders, use our calculators,
              and request competitive quotes. Always verify NMLS licensing before proceeding.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Link href={hubPath('lender', '/compare')}>Compare lenders</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={hubPath('lender', '/calculators')}>Mortgage calculators</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={hubPath('lender', '/resources/how-to-choose-mortgage-lender')}>
                  How to choose a lender
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              LenderTrustHub is an independent informational directory with no paid placements or
              affiliations.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
