import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  MessageSquare,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubPath } from '@/lib/hub/paths';

const TITLE =
  'How to Choose the Right Mortgage Lender in 2026: Key Factors, Red Flags & Comparison Tips';
const DESCRIPTION =
  'Learn how to select the best mortgage lender in 2026. Discover essential factors, NMLS verification steps, red flags to avoid, and practical comparison strategies for securing optimal rates and service. Use Lender Trust Hub tools for transparent research.';
const PATH = '/lender/resources/how-to-choose-mortgage-lender';

const keyFactors = [
  {
    title: 'NMLS Licensing and Regulatory Compliance',
    detail:
      'Verify the lender and individual loan officers through the Nationwide Multistate Licensing System (NMLS). Active licensing in your state and a clean compliance record are non-negotiable.',
  },
  {
    title: 'Interest Rates and Annual Percentage Rate (APR)',
    detail:
      'Compare APRs, which incorporate fees, rather than rates alone. Obtain personalized quotes based on your credit profile.',
  },
  {
    title: 'Fees and Closing Costs',
    detail:
      'Scrutinize origination fees, application charges, discount points, and third-party costs. Transparent lenders provide clear Loan Estimates early.',
  },
  {
    title: 'Loan Product Variety and Expertise',
    detail:
      'Seek lenders experienced with conventional, FHA, VA, USDA, jumbo, or specialty programs matching your situation.',
  },
  {
    title: 'Customer Service and Communication',
    detail:
      'Evaluate responsiveness, clarity of explanations, and willingness to answer questions throughout the process.',
  },
  {
    title: 'Technology and Process Efficiency',
    detail:
      'Digital platforms for document submission, status tracking, and e-closings enhance convenience.',
  },
  {
    title: 'Reputation and Reviews',
    detail:
      'Analyze verified feedback from multiple sources, including complaint ratios with regulators and review platforms.',
  },
];

const redFlags = [
  {
    title: 'Pressure Tactics or Unrealistic Promises',
    detail:
      'Avoid lenders pushing quick decisions or guaranteeing rates/approvals without full documentation.',
  },
  {
    title: 'Vague or Hidden Fees',
    detail:
      'Reputable lenders disclose all costs upfront. Evasive responses on fees warrant caution.',
  },
  {
    title: 'Poor Communication',
    detail: 'Slow replies or unreturned calls signal potential issues during critical closing stages.',
  },
  {
    title: 'Pushing Inappropriate Loan Products',
    detail:
      'Steering toward higher-commission options that do not suit your needs raises concerns.',
  },
  {
    title: 'Lack of Transparency on Licensing',
    detail: 'Reluctance to provide NMLS numbers or company details is a major red flag.',
  },
  {
    title: 'Negative Review Patterns',
    detail:
      'Consistent complaints about surprises at closing or poor service require careful review.',
  },
];

const comparisonSteps = [
  'Gather Multiple Quotes — Contact at least 3–5 licensed lenders for pre-approvals or Loan Estimates.',
  'Compare Total Loan Costs — Analyze APR, monthly payments, and closing costs over the loan term.',
  'Assess Service Quality — Ask targeted questions about processes, timelines, and support.',
  'Verify Credentials — Confirm NMLS status, state licensing, and any disciplinary history.',
  'Review Written Disclosures — Carefully examine the Loan Estimate and Closing Disclosure.',
  'Check Recent Performance — Inquire about current close rates and typical timelines.',
];

const lenderQuestions = [
  'What is your current rate for my loan scenario, and how does the APR compare?',
  'Can you provide a detailed breakdown of all fees?',
  'How long does your typical closing process take?',
  'What loan programs do you recommend for my situation, and why?',
  'How do you handle rate locks and float-down options?',
  'Can you share recent client references or reviews?',
];

const platformFeatures = [
  'Independent lender directory with NMLS-verified profiles.',
  'Side-by-side comparisons of rates, fees, and services.',
  'Educational resources and mortgage calculators.',
  'Free matching with reputable lenders for personalized quotes.',
];

const faqs = [
  {
    question: 'How many lenders should I compare before choosing?',
    answer: 'At least three to five provides a reliable benchmark for rates and terms.',
  },
  {
    question: 'Does shopping for rates hurt my credit score?',
    answer:
      'Multiple inquiries within a short window (typically 14–45 days) are treated as a single inquiry for scoring purposes.',
  },
  {
    question: 'What is the most important factor when selecting a lender?',
    answer:
      'While rates matter, overall cost (APR), transparency, and communication reliability often prove more impactful long-term.',
  },
  {
    question: 'Can I negotiate lender fees?',
    answer:
      'Yes. Many fees, including origination charges, are negotiable, particularly when comparing competing offers.',
  },
  {
    question: 'Should I work with a mortgage broker or direct lender?',
    answer:
      'Brokers access multiple sources; direct lenders may offer specialized in-house products. Evaluate both based on your needs.',
  },
  {
    question: 'How does Lender Trust Hub ensure lender quality?',
    answer:
      'The directory focuses on NMLS-registered entities with accessible review and compliance data, remaining fully independent.',
  },
];

export const metadata = buildTemplateMetadata({
  hub: 'lender',
  title: TITLE,
  description: DESCRIPTION,
  path: '/resources/how-to-choose-mortgage-lender',
  type: 'article',
  keywords: [
    'mortgage lender',
    'NMLS verification',
    'mortgage comparison',
    'choose a lender',
    '2026 mortgage',
  ],
});

export default function HowToChooseMortgageLenderPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        hub="lender"
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
        <section className="border-b bg-gradient-to-b from-[#3B82F6]/5 via-background to-background">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <Link
              href={hubPath('lender', '/resources')}
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Buying Guide
              </Badge>
              <span className="text-xs text-muted-foreground">12 min read</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              How to Choose the Right Mortgage Lender in 2026
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Key factors, red flags &amp; comparison tips
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Choosing the right mortgage lender ranks among the most critical decisions in the
              homebuying process. In 2026, with fluctuating interest rates and evolving lending
              guidelines, the difference between a smooth closing and costly surprises often stems
              from the lender selected. A transparent, responsive lender can save thousands over
              the loan&apos;s life through competitive rates, lower fees, and reliable guidance.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Many borrowers focus solely on advertised rates, overlooking communication quality, fee
              transparency, and long-term support. This comprehensive guide outlines key evaluation
              criteria, common red flags, and proven comparison methods for 2026. Whether pursuing
              your first home, refinancing, or investing in property, these insights empower
              confident decisions.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              <Link href={hubPath('lender', '/')} className="text-[#3B82F6] underline underline-offset-2">
                Lender Trust Hub
              </Link>{' '}
              is an independent informational directory and comparison hub for mortgage lenders and
              brokers. The platform aggregates NMLS data, verified reviews, and transparent details
              with no paid placements or affiliations. Always verify licensing through{' '}
              <a
                href="https://www.nmlsconsumeraccess.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3B82F6] underline underline-offset-2"
              >
                NMLS Consumer Access
              </a>
              .
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <Scale className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Key factors to evaluate when choosing a mortgage lender
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Consider these essential criteria during your search. Use our{' '}
              <Link
                href={hubPath('lender', '/compare')}
                className="text-[#3B82F6] underline underline-offset-2"
              >
                side-by-side comparison tool
              </Link>{' '}
              to evaluate multiple lenders at once.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {keyFactors.map((factor) => (
                <div key={factor.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{factor.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{factor.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Red flags to avoid in 2026</h2>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Watch for these warning signs that may indicate unreliable or predatory practices.
              Always cross-reference NMLS records and BBB/Trustpilot profiles before proceeding.
            </p>
            <ul className="space-y-4">
              {redFlags.map((flag) => (
                <li key={flag.title} className="rounded-lg border bg-background/70 p-4">
                  <h3 className="font-semibold text-amber-900">{flag.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{flag.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <ClipboardList className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Step-by-step comparison process</h2>
            </div>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Follow this framework for objective evaluation. Leverage Lender Trust Hub&apos;s
              comparison features to streamline the process with verified data and reputation scores.
            </p>
            <ol className="space-y-3">
              {comparisonSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10 text-xs font-semibold text-[#3B82F6]">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <Button asChild size="sm" className="mt-6 bg-[#3B82F6] hover:bg-[#2563EB]">
              <Link href={hubPath('lender', '/compare')}>Open lender comparison tool →</Link>
            </Button>
          </section>

          <section className="rounded-2xl border bg-muted/20 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Questions to ask potential lenders</h2>
            </div>
            <ul className="space-y-3">
              {lenderQuestions.map((question) => (
                <li key={question} className="flex gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#3B82F6]" />
                  {question}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Document all responses for later comparison.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6]">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How Lender Trust Hub simplifies the process
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              These tools promote informed shopping without sales pressure.
            </p>
            <ul className="space-y-3">
              {platformFeatures.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href={hubPath('lender', '/local-lenders')}>Browse lender directory</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href={hubPath('lender', '/calculators')}>Mortgage calculators</Link>
              </Button>
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#3B82F6]" />
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

          <section className="rounded-2xl border bg-gradient-to-br from-[#3B82F6]/8 via-background to-[#0A2540]/5 p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#3B82F6]" />
              <h2 className="text-2xl font-semibold tracking-tight">Conclusion</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Selecting the right mortgage lender in 2026 requires thorough research beyond
              advertised rates. By evaluating licensing, costs, service quality, and reputation while
              avoiding common red flags, you secure favorable terms and a supportive partner
              throughout the home financing journey.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Lender Trust Hub provides the independent resources necessary for confident
              decision-making through transparent data, comparison tools, and educational guidance.
              Begin your lender search with confidence today — explore the directory, compare options
              side-by-side, and request free pre-approvals or quotes from vetted professionals.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Link href={hubPath('lender', '/local-lenders')}>Explore lender directory</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hubPath('lender', '/contact')}>Contact our team</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Lender Trust Hub is an independent informational directory with no paid placements or
              affiliations. Always verify licensing through the{' '}
              <a
                href="https://www.nmlsconsumeraccess.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                NMLS Consumer Access
              </a>{' '}
              portal.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}