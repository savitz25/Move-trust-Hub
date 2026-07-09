import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  Layers,
  Network,
  Scale,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubPath } from '@/lib/hub/paths';

const TITLE =
  'How to Choose the Right Health Insurance Plan in 2026: Key Factors, Networks & Cost Comparison Guide';
const DESCRIPTION =
  'Learn how to select the best health insurance plan in 2026. Compare metal tiers, networks, deductibles, premiums, and subsidies. Use independent tools on our platform for transparent side-by-side comparisons and personalized guidance.';
const PATH = '/insurance/resources/how-to-choose-health-insurance-plan';

const metalTiers = [
  {
    tier: 'Bronze',
    split: '60% plan / 40% you',
    summary: 'Lowest premiums, highest deductibles and out-of-pocket costs.',
    bestFor: 'Healthy individuals with minimal expected usage.',
    color: 'amber',
  },
  {
    tier: 'Silver',
    split: '70% plan / 30% you',
    summary: 'Moderate balance. Enhanced Silver plans with cost-sharing reductions for lower-income households.',
    bestFor: 'Balanced coverage needs; subsidy-eligible households.',
    color: 'slate',
  },
  {
    tier: 'Gold',
    split: '80% plan / 20% you',
    summary: 'Higher premiums, lower out-of-pocket expenses.',
    bestFor: 'Frequent medical needs and ongoing care.',
    color: 'yellow',
  },
  {
    tier: 'Platinum',
    split: '90% plan / 10% you',
    summary: 'Highest premiums, lowest out-of-pocket costs.',
    bestFor: 'Maximum coverage with predictable low cost-sharing.',
    color: 'emerald',
  },
];

const networkTypes = [
  {
    title: 'HMO (Health Maintenance Organization)',
    detail:
      'Lower costs but requires a primary care physician and referrals for specialists. Limited out-of-network coverage.',
  },
  {
    title: 'PPO (Preferred Provider Organization)',
    detail:
      'Greater flexibility to see any provider, though in-network yields better rates. No referrals needed.',
  },
  {
    title: 'EPO (Exclusive Provider Organization)',
    detail: 'No out-of-network coverage except emergencies; lower costs than PPOs.',
  },
  {
    title: 'POS (Point of Service)',
    detail: 'Hybrid model combining HMO and PPO features.',
  },
];

const costTerms = [
  {
    term: 'Premium',
    detail: 'Monthly payment for coverage.',
  },
  {
    term: 'Deductible',
    detail: 'Amount paid before the plan contributes (except preventive care).',
  },
  {
    term: 'Copayments / Coinsurance',
    detail: 'Your share of costs after the deductible.',
  },
  {
    term: 'Out-of-Pocket Maximum',
    detail: 'Annual cap on your spending (excluding premiums).',
  },
];

const comparisonSteps = [
  'Assess Your Needs — Review recent medical history, medications, and anticipated care.',
  'Determine Eligibility — Check for ACA subsidies, employer options, or special enrollment periods.',
  'Compare Side-by-Side — Evaluate metal tiers, networks, premiums, and total estimated costs.',
  'Review Extras — Consider dental/vision riders, telemedicine, or wellness benefits.',
  'Verify Provider Access — Search each plan’s directory.',
  'Read the Fine Print — Examine exclusions, prior authorizations, and appeals processes.',
];

const pitfalls = [
  'Focusing solely on the lowest premium.',
  'Ignoring network restrictions.',
  'Underestimating total costs for chronic conditions or procedures.',
  'Missing open enrollment deadlines (November 1, 2025 – January 15, 2026, for most states).',
];

const faqs = [
  {
    question: 'When is open enrollment for 2026 coverage?',
    answer:
      'It generally runs from November 1, 2025, to January 15, 2026. Qualifying life events allow enrollment outside this period.',
  },
  {
    question: 'How do subsidies work?',
    answer:
      'Premium tax credits reduce monthly costs based on household income and size. They are available on the ACA marketplace.',
  },
  {
    question: 'Should I choose a high-deductible plan?',
    answer:
      'It may suit healthy individuals who can pair it with an HSA for tax advantages, but review expected medical needs carefully.',
  },
  {
    question: 'What is the difference between a broker and direct enrollment?',
    answer:
      'Brokers provide guidance across multiple carriers; direct enrollment uses official marketplaces. Both can access the same plans.',
  },
  {
    question: 'Can I change plans mid-year?',
    answer:
      'Generally only with a qualifying event (e.g., job loss, marriage, birth). Otherwise, changes occur during open enrollment.',
  },
  {
    question: 'How does Insurance Trust Hub help?',
    answer:
      'It offers unbiased comparisons, verified provider data, calculators, and resources to match you with suitable options.',
  },
];

const tierColorMap = {
  amber: 'border-amber-200/80 bg-amber-50/40',
  slate: 'border-slate-200/80 bg-slate-50/40',
  yellow: 'border-yellow-200/80 bg-yellow-50/40',
  emerald: 'border-emerald-200/80 bg-emerald-50/40',
};

export const metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources/how-to-choose-health-insurance-plan',
  type: 'article',
  keywords: [
    'health insurance',
    'ACA marketplace',
    'metal tiers',
    'health plan comparison',
    '2026 open enrollment',
  ],
});

export default function HowToChooseHealthInsurancePlanPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        hub="insurance"
        datePublished="2026-07-09"
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
        <section className="border-b bg-gradient-to-b from-emerald-500/5 via-background to-background">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <Link
              href={hubPath('insurance', '/resources')}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Health Insurance
              </Badge>
              <span className="text-xs text-muted-foreground">14 min read</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              How to Choose the Right Health Insurance Plan in 2026
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Key factors, networks &amp; cost comparison guide
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Selecting the appropriate health insurance plan represents one of the most important
              financial and healthcare decisions individuals and families make each year. In 2026,
              with evolving premiums, cost-sharing structures, and marketplace options, understanding
              key differences prevents underinsurance or overpayment.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The Affordable Care Act (ACA) marketplace, employer-sponsored plans, short-term options,
              and Medicare-related coverage each present distinct advantages and trade-offs. Factors
              such as provider networks, deductibles, out-of-pocket maximums, and premium subsidies
              significantly influence total annual costs and access to care.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              This guide provides a clear framework for evaluating plans in 2026. Whether shopping
              during open enrollment, experiencing a qualifying life event, or exploring alternatives
              to employer coverage, these insights support informed choices.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              <Link href={hubPath('insurance', '/')} className="text-emerald-600 underline underline-offset-2">
                Insurance Trust Hub
              </Link>{' '}
              is an independent informational directory with no paid placements or affiliations. It
              aggregates verified data and empowers consumers through comparison tools, educational
              resources, and connections to reputable providers. Always verify plan details through{' '}
              <a
                href="https://www.healthcare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 underline underline-offset-2"
              >
                HealthCare.gov
              </a>{' '}
              or your state marketplace.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Layers className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Understanding health plan metal tiers and cost-sharing
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              ACA marketplace plans are categorized into metal tiers — Bronze, Silver, Gold, and
              Platinum — that indicate the division of costs between you and the insurer. Catastrophic
              plans offer limited eligibility and very high deductibles but protect against major
              expenses. When estimating total costs, consider both monthly premiums and potential
              out-of-pocket spending based on your health needs.
            </p>

            <div className="space-y-4">
              {metalTiers.map(({ tier, split, summary, bestFor, color }) => (
                <div
                  key={tier}
                  className={`rounded-xl border p-5 ${tierColorMap[color as keyof typeof tierColorMap]}`}
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-lg font-semibold">{tier}</h3>
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {split}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium text-foreground">Best for: </span>
                    <span className="text-muted-foreground">{bestFor}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Network className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Provider networks and access to care
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Network type determines flexibility and costs for in-network versus out-of-network care.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {networkTypes.map((network) => (
                <div key={network.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{network.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{network.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-emerald-200/60 bg-emerald-50/40 p-4 text-sm text-muted-foreground">
              <strong className="font-medium text-foreground">Action step: </strong>
              Verify that your preferred doctors, hospitals, and specialists are in-network. Confirm
              coverage for ongoing prescriptions using the plan&apos;s formulary.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Scale className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Premiums, deductibles, and total cost considerations
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {costTerms.map((item) => (
                <div key={item.term} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{item.term}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              <strong className="font-medium text-foreground">2026 note: </strong>
              Subsidies (premium tax credits) remain available and can significantly reduce costs
              based on income. Enhanced subsidies may vary by legislative action — check eligibility
              during open enrollment. Use cost estimators or calculators to model scenarios based on
              expected healthcare utilization.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href={hubPath('insurance', '/calculators/aca-subsidy')}>
                  ACA subsidy calculator
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={hubPath('insurance', '/tools/aca-eligibility-checker')}>
                  ACA eligibility checker
                </Link>
              </Button>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Step-by-step guide to comparing plans
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Leverage independent comparison tools to view plans transparently without sales
              pressure.
            </p>
            <ol className="space-y-3">
              {comparisonSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-600">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <Button asChild size="sm" className="mt-6 bg-emerald-600 hover:bg-emerald-700">
              <Link href={hubPath('insurance', '/directory')}>Browse agency directory →</Link>
            </Button>
          </section>

          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Common pitfalls to avoid</h2>
            </div>
            <ul className="space-y-3">
              {pitfalls.map((pitfall) => (
                <li key={pitfall} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  {pitfall}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How Insurance Trust Hub simplifies the process
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                'Unbiased plan and agent comparisons with verified licensing data.',
                'ACA subsidy and eligibility calculators for personalized estimates.',
                'Health insurance hub directories by major market.',
                'Educational resources with no paid placements or affiliations.',
              ].map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href={hubPath('insurance', '/hubs/health-insurance')}>Health insurance hubs</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={hubPath('insurance', '/calculators')}>All calculators</Link>
              </Button>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <h2 className="text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-gradient-to-br from-emerald-500/8 via-background to-emerald-600/5 p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              <h2 className="text-2xl font-semibold tracking-tight">Conclusion</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Choosing the right health insurance plan in 2026 requires balancing premiums, coverage
              levels, networks, and personal healthcare needs. A methodical comparison process,
              supported by transparent tools and current information, leads to better protection and
              financial outcomes.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Insurance Trust Hub simplifies this journey through educational resources, plan
              comparisons, and connections to reputable options. Take control of your health coverage
              today — research options, compare plans side-by-side, and request personalized guidance
              or quotes from licensed professionals.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href={hubPath('insurance', '/directory')}>Explore agency directory</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hubPath('insurance', '/contact')}>Contact our team</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Insurance Trust Hub is an independent informational directory with no paid placements or
              affiliations. Always verify plan details and eligibility directly through official
              sources such as{' '}
              <a
                href="https://www.healthcare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                HealthCare.gov
              </a>{' '}
              or your state marketplace.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}