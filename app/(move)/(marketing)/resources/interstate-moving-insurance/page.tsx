import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  Shield,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { GuideFooter } from '@/components/resources/guide-footer';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildResourceMetadata } from '@/lib/seo/resource-metadata';

const TITLE =
  'Interstate Moving Insurance Explained: Valuation Options, Coverage Limits & What to Choose in 2026';
const DESCRIPTION =
  'Understand interstate moving insurance options for 2026. Compare FMCSA-required Released Value vs. Full Value Protection, coverage limits, costs, and how to choose the right level for your belongings. Get transparent quotes on MoveTrustHub.com.';

const valuationOptions = [
  {
    icon: ShieldAlert,
    title: 'Released Value Protection',
    subtitle: 'Basic coverage (included)',
    color: 'amber',
    summary:
      'The default minimum protection at no additional charge. Limits liability to 60 cents per pound per article.',
    example:
      'A 50-pound television valued at $1,200 suffers damage. You would receive at most $30 (60¢ × 50 pounds), regardless of actual value.',
    limitations: [
      'Protection is calculated by weight, not replacement cost.',
      'No coverage for pairs or sets as complete units.',
      'Excludes certain perils unless specified.',
    ],
    bestFor: 'Low-value or easily replaceable items only — rarely adequate for full households.',
    note: 'You must explicitly waive Full Value Protection in writing to select Released Value.',
  },
  {
    icon: ShieldCheck,
    title: 'Full Value Protection',
    subtitle: 'Higher coverage (recommended)',
    color: 'emerald',
    summary:
      'Holds the mover liable for the actual replacement value of lost or damaged items, up to your declared shipment value.',
    example:
      'Repair, replacement with like kind and quality, or cash settlement — with deductibles ($0, $250, $500) that can lower premiums.',
    limitations: [
      'You declare total shipment value (movers may set minimums, e.g. $6–$10 per pound).',
      'Valuation fee typically 0.5–1%+ of declared value.',
      'Jewelry, cash, and collectibles may need separate riders or have sub-limits.',
    ],
    bestFor: 'Most interstate moves — especially electronics, heirlooms, and standard furnishings.',
    note: 'Request written quotes through Move Trust Hub to compare how movers structure fees and terms.',
  },
];

const costRows = [
  {
    option: 'Released Value Protection',
    cost: '$0 additional (included)',
    coverage: '60¢ per pound per article',
    note: 'Minimal protection — high financial risk on valuable items.',
  },
  {
    option: 'Full Value Protection',
    cost: 'Typically $100–$500+ added to move cost',
    coverage: 'Up to declared shipment value',
    note: 'For a $50,000 shipment, expect ~0.5–1% valuation fee depending on deductible.',
  },
];

const thirdPartyReasons = [
  'High-value items exceeding mover sub-limits.',
  'Need for broader all-risk protection beyond standard moving perils.',
  'Homeowner’s or renter’s policy may offer limited transit coverage — verify before relying on it.',
];

const decisionFactors = [
  {
    title: 'Value of your belongings',
    detail: 'Electronics, art, and antiques strongly favor Full Value Protection.',
  },
  {
    title: 'Risk tolerance',
    detail: 'Budget moves with replaceable items may use Released Value plus careful packing.',
  },
  {
    title: 'Mover selection',
    detail: 'Review FMCSA complaint history and reputation scores on Move Trust Hub.',
  },
  {
    title: 'Declared value accuracy',
    detail: 'Over- or under-declaring affects claims payouts and premium calculations.',
  },
  {
    title: 'Budget impact',
    detail: 'Balance protection cost against potential replacement expenses.',
  },
];

const actionChecklist = [
  'Inventory high-value items with photos and receipts.',
  'Request written explanations of valuation options from each mover.',
  'Compare total move quotes including protection fees.',
  'Read the Bill of Lading thoroughly before signing.',
];

const claimsSteps = [
  'Note exceptions on delivery paperwork immediately.',
  'Document damage with photos and retain packaging.',
  'File a written claim with the mover within required timeframes (typically 9 months for interstate).',
  'Provide supporting documentation — inventory, values, and photos.',
];

const faqs = [
  {
    question: 'Is Released Value Protection enough for my move?',
    answer:
      'It provides minimal coverage and is rarely adequate for household goods of significant value. Most experts recommend Full Value Protection.',
  },
  {
    question: 'How is the Full Value Protection fee calculated?',
    answer:
      'It is typically a percentage of your declared shipment value, varying by mover. Obtain written quotes for exact amounts.',
  },
  {
    question: 'Does my homeowner’s insurance cover interstate moves?',
    answer:
      'Some policies offer limited transit coverage. Review your policy and consider supplemental options if needed.',
  },
  {
    question: 'Can I insure only specific high-value items?',
    answer:
      'Yes. Movers often allow “extraordinary value” declarations or riders for items like jewelry or artwork.',
  },
  {
    question: 'What happens if I declare a lower value to save money?',
    answer:
      'Compensation is capped at the declared amount. Accurate valuation protects you fully.',
  },
  {
    question: 'How does Move Trust Hub help with insurance decisions?',
    answer:
      'Our platform displays mover profiles with reputation data, allowing informed comparisons of valuation offerings and overall reliability.',
  },
];

const colorMap = {
  amber: {
    border: 'border-amber-200/80',
    bg: 'bg-amber-50/50',
    icon: 'bg-amber-100 text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
  },
  emerald: {
    border: 'border-emerald-200/80',
    bg: 'bg-emerald-50/50',
    icon: 'bg-emerald-100 text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
  },
};

export const metadata = buildResourceMetadata(
  '/resources/interstate-moving-insurance',
  TITLE,
  DESCRIPTION
);

export default function InterstateMovingInsurancePage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path="/resources/interstate-moving-insurance"
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
        <section className="border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-3xl px-4 py-10">
            <Link
              href="/resources"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Regulation
              </Badge>
              <span className="text-xs text-muted-foreground">10 min read</span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Interstate Moving Insurance Explained
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Valuation options, coverage limits &amp; what to choose in 2026
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Interstate moving insurance — more accurately termed{' '}
              <strong className="font-medium text-foreground">valuation protection</strong> — often
              creates confusion for families relocating long-distance. Federal regulations require
              movers to offer specific liability options, yet many remain uncertain about the
              protection level for household goods in transit.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Under FMCSA rules, interstate movers must provide{' '}
              <strong className="font-medium text-foreground">Released Value Protection</strong>{' '}
              (minimal, no extra cost) and{' '}
              <strong className="font-medium text-foreground">Full Value Protection</strong> (higher
              coverage, with a fee). This guide explains each option — coverage limits, costs, claims,
              and decision factors for 2026 moves from Florida to New York, California to Texas, and
              every corridor in between.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              <Link href="/" className="text-primary underline underline-offset-2">
                Move Trust Hub
              </Link>{' '}
              is an independent directory with no paid placements. Compare movers by reputation, FMCSA
              compliance, and valuation offerings — and always verify licensing on{' '}
              <a
                href="https://www.fmcsa.dot.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                FMCSA.gov
              </a>
              .
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              FMCSA-mandated valuation options
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Federal law governs liability protection for interstate household goods moves. Movers
              must offer two standard options, which appear on your Bill of Lading.
            </p>

            <div className="space-y-6">
              {valuationOptions.map(
                ({
                  icon: Icon,
                  title,
                  subtitle,
                  color,
                  summary,
                  example,
                  limitations,
                  bestFor,
                  note,
                }) => {
                  const styles = colorMap[color as keyof typeof colorMap];
                  return (
                    <div
                      key={title}
                      className={`rounded-2xl border ${styles.border} ${styles.bg} p-6 sm:p-8`}
                    >
                      <div className="mb-5 flex items-start gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span
                            className={`mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles.badge}`}
                          >
                            {subtitle}
                          </span>
                          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                          <p className="mt-2 leading-relaxed text-muted-foreground">{summary}</p>
                        </div>
                      </div>

                      <div className="rounded-lg border bg-background/70 p-4 text-sm">
                        <p className="font-medium text-foreground">Example</p>
                        <p className="mt-1 text-muted-foreground">{example}</p>
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {limitations.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-4 text-sm">
                        <span className="font-medium text-foreground">Best for: </span>
                        <span className="text-muted-foreground">{bestFor}</span>
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Cost comparison: Released Value vs. Full Value Protection
            </h2>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              While Full Value increases upfront expense, it provides essential protection against
              potentially thousands in losses. Many families find the peace of mind justifies the
              modest premium.
            </p>

            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[520px] text-sm">
                <thead>
                  <tr className="border-b bg-muted/40 text-left">
                    <th className="px-4 py-3 font-semibold">Option</th>
                    <th className="px-4 py-3 font-semibold">Typical cost</th>
                    <th className="px-4 py-3 font-semibold">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {costRows.map((row) => (
                    <tr key={row.option} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{row.option}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.cost}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {costRows[1].note}
            </p>
          </section>

          <section className="rounded-2xl border bg-muted/20 p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Optional third-party moving insurance
              </h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Beyond mover liability, you may purchase separate policies from third-party providers.
              These often cover a broader range of perils and may offer higher or more flexible limits.
              Third-party policies <strong className="font-medium text-foreground">supplement</strong>
              — not replace — mover valuation.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">When to consider it:</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              {thirdPartyReasons.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Compare deductibles, exclusions, and claims processes carefully before purchasing.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              How to choose the right protection level
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {decisionFactors.map((factor) => (
                <div key={factor.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{factor.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{factor.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Actionable checklist</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {actionChecklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="sm" className="mt-4">
                <Link href="/compare">Use our side-by-side comparison tool →</Link>
              </Button>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Claims process and best practices
            </h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              If damage or loss occurs, reputable movers maintain transparent claims processes.
              Track records in FMCSA data and verified reviews help identify reliable partners.
            </p>
            <ol className="space-y-3">
              {claimsSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
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

          <section className="rounded-2xl border bg-gradient-to-br from-primary/8 via-background to-emerald-500/5 p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">Conclusion</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Selecting appropriate interstate moving valuation protection is one of the most
              important decisions in your relocation. While Released Value meets minimum federal
              requirements at no extra cost, Full Value Protection delivers the comprehensive
              coverage most families need.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              By understanding your options, comparing offers from FMCSA-licensed movers, and
              accurately valuing your shipment, you minimize financial risk and focus on settling
              into your new home. Use our{' '}
              <Link href="/moving-calculator" className="text-primary underline underline-offset-2">
                free Moving Calculator
              </Link>
              ,{' '}
              <Link href="/compare" className="text-primary underline underline-offset-2">
                comparison tool
              </Link>
              , and{' '}
              <Link href="/companies" className="text-primary underline underline-offset-2">
                mover directory
              </Link>{' '}
              to research verified companies before booking.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/companies">Compare trusted movers</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Contact our team</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Move Trust Hub is an independent informational directory with no paid placements or
              affiliations. Always verify licensing and authority directly with FMCSA.gov before
              booking.
            </p>
          </section>

          <GuideFooter
            relatedSlugs={[
              'fmcsa',
              'how-to-choose',
              'carrier-vs-broker',
              'interstate-moving-costs',
              'checklist',
              'scams',
            ]}
            prefilledNotes="Interested in interstate moving insurance / valuation options — please match with licensed movers who explain Full Value Protection clearly."
          />
        </div>
      </div>
    </>
  );
}