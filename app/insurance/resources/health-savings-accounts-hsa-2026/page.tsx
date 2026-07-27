import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  HelpCircle,
  Landmark,
  PiggyBank,
  Scale,
  Shield,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubPath } from '@/lib/hub/paths';

const TITLE = 'HSA 2026: Contribution Limits, Eligibility & Tax Benefits';
const DESCRIPTION =
  'Learn about Health Savings Accounts in 2026, including HSA eligibility, contribution limits, tax benefits, qualified expenses, investing, and how to maximize your HSA.';
const PATH = '/resources/health-savings-accounts-hsa-2026';
const META_PATH = '/resources/health-savings-accounts-hsa-2026';

const LINK = 'text-emerald-700 underline underline-offset-2 dark:text-emerald-400';
const ICON_BOX = 'flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600';

const tripleTax = [
  {
    title: 'Tax-advantaged contributions',
    detail:
      'Eligible contributions may be deductible or made pre-tax through an employer cafeteria plan—potentially reducing taxable income.',
  },
  {
    title: 'Tax-free growth',
    detail:
      'Balances can generally grow without current federal income tax, including investment earnings when you invest through your HSA provider.',
  },
  {
    title: 'Tax-free qualified withdrawals',
    detail:
      'Withdrawals used for qualified medical expenses are generally tax-free—creating the often-cited “triple tax advantage.”',
  },
];

const eligibility = [
  'Covered by an HSA-eligible high-deductible health plan (HDHP)',
  'No disqualifying additional health coverage',
  'Generally not enrolled in Medicare',
  'Generally not claimed as someone else’s tax dependent',
];

const hdhpLimits2026 = [
  { label: 'Minimum annual deductible (self-only)', value: '$1,700' },
  { label: 'Minimum annual deductible (family)', value: '$3,400' },
  { label: 'Max out-of-pocket (self-only)', value: '$8,500' },
  { label: 'Max out-of-pocket (family)', value: '$17,000' },
];

const contributionLimits2026 = [
  { label: 'Self-only coverage', value: '$4,400' },
  { label: 'Family coverage', value: '$8,750' },
  { label: 'Catch-up (age 55+)', value: '+$1,000' },
  { label: 'Self-only + catch-up', value: 'Up to $5,400' },
  { label: 'Family + catch-up', value: 'Up to $9,750' },
];

const qualifiedExpenses = [
  'Doctor visits and hospital services',
  'Prescription medications',
  'Certain over-the-counter medications',
  'Dental and vision care',
  'Eye exams, eyeglasses, and contacts',
  'Certain medical equipment and supplies',
  'Certain mental health services',
  'Certain long-term care expenses (subject to rules)',
];

const premiumExceptions = [
  'Long-term care insurance premiums (subject to limits)',
  'Health coverage while receiving unemployment compensation',
  'Certain continuation coverage such as COBRA',
  'Medicare premiums after becoming Medicare-eligible (subject to rules)',
];

const maximizeSteps = [
  {
    title: 'Contribute as much as reasonably possible',
    detail: 'If eligible and your budget allows, consider contributing up to the annual limit.',
  },
  {
    title: 'Capture employer contributions',
    detail:
      'Employer contributions count toward your annual limit—do not accidentally overcontribute.',
  },
  {
    title: 'Keep receipts',
    detail: 'Maintain records of qualified medical expenses even if you reimburse yourself later.',
  },
  {
    title: 'Build a cash reserve',
    detail: 'Keep enough liquid HSA cash for expected near-term healthcare costs.',
  },
  {
    title: 'Invest long-term funds',
    detail:
      'If you have reserves and risk capacity, consider investing money you will not need soon.',
  },
  {
    title: 'Reimburse strategically',
    detail:
      'Some owners pay medical bills from other funds, keep receipts, and reimburse later so more money can compound—only with excellent recordkeeping.',
  },
];

const spendVsInvest = [
  {
    title: 'Strategy A: Healthcare spending account',
    points: [
      'Contribute, then use funds for qualified expenses',
      'Fits regular medical costs and limited cash savings',
      'Preferred if you need the money for care now',
    ],
  },
  {
    title: 'Strategy B: Long-term healthcare asset',
    points: [
      'Contribute and invest longer-term balances',
      'Pay current bills with other funds when practical',
      'Keep detailed receipts for possible later reimbursement',
      'Fits emergency savings, long horizon, and comfort with risk',
    ],
  },
];

const hsaVsFsa = [
  { feature: 'Requires qualifying HDHP', hsa: 'Generally yes', fsa: 'Generally no' },
  { feature: 'Account belongs to you', hsa: 'Yes', fsa: 'Generally employer-sponsored' },
  { feature: 'Pre-tax contributions', hsa: 'Yes', fsa: 'Yes' },
  { feature: 'Tax-free qualified withdrawals', hsa: 'Yes', fsa: 'Yes' },
  { feature: 'Investment potential', hsa: 'Often available', fsa: 'Generally limited' },
  { feature: 'Funds roll over', hsa: 'Generally yes', fsa: 'Rules vary' },
  { feature: 'Portable after leaving job', hsa: 'Yes', fsa: 'Generally no' },
];

const consumerProfiles = [
  {
    title: 'Consumer A — lower usage',
    traits: [
      'Healthy, rarely visits the doctor',
      'Has emergency savings',
      'Can afford a higher deductible',
      'Wants to save for future healthcare costs',
    ],
    fit: 'An HSA-compatible HDHP may be attractive.',
  },
  {
    title: 'Consumer B — higher usage',
    traits: [
      'Frequent appointments or specialists',
      'Expensive medications',
      'Expects surgery or ongoing treatment',
      'Limited emergency savings',
    ],
    fit: 'A higher-premium plan with lower cost-sharing may make more sense.',
  },
];

const decisionFramework = [
  {
    q: 'Am I eligible for an HSA?',
    a: 'If not, the HSA comparison ends there.',
  },
  {
    q: 'How much will I pay in annual premiums?',
    a: 'Calculate annual cost—not only the monthly premium.',
  },
  {
    q: 'How much does my employer contribute?',
    a: 'Employer HSA dollars can materially change the math.',
  },
  {
    q: 'What is the deductible?',
    a: 'Know how much you may pay before plan cost-sharing kicks in.',
  },
  {
    q: 'What is the out-of-pocket maximum?',
    a: 'Understand worst-case exposure for covered in-network care.',
  },
  {
    q: 'How much healthcare do I expect to use?',
    a: 'Visits, prescriptions, specialists, therapy, planned procedures, ongoing care.',
  },
  {
    q: 'What are the tax benefits?',
    a: 'Pre-tax contributions, tax-free growth, and tax-free qualified withdrawals.',
  },
];

const mistakes = [
  {
    title: 'Assuming every high-deductible plan is HSA eligible',
    detail: 'Verify official HSA eligibility—not marketing language alone.',
  },
  {
    title: 'Forgetting employer contributions',
    detail: 'Employer dollars count toward the annual IRS limit.',
  },
  {
    title: 'Overcontributing',
    detail: 'Excess contributions can create tax complications.',
  },
  {
    title: 'Non-qualified withdrawals',
    detail: 'Know what qualifies before you spend HSA funds.',
  },
  {
    title: 'Losing receipts',
    detail: 'Keep documentation of eligible expenses.',
  },
  {
    title: 'Ignoring fees',
    detail: 'High admin or investment fees erode long-term returns.',
  },
  {
    title: 'Investing without a cash reserve',
    detail: 'Near-term medical needs may require liquid funds.',
  },
  {
    title: 'Forgetting Medicare timing',
    detail: 'Medicare enrollment generally ends new HSA contributions.',
  },
  {
    title: 'Choosing only by premium',
    detail: 'Lowest monthly premium may not mean lowest total cost.',
  },
];

const maximize2026 = [
  'Confirm your plan is officially HSA eligible',
  'Know 2026 limits: $4,400 self / $8,750 family / +$1,000 age 55+',
  'Capture full employer contributions without exceeding the limit',
  'Consider payroll contributions for pre-tax convenience',
  'Maintain a healthcare cash reserve inside or alongside the HSA',
  'Compare HSA providers on fees, investments, and transfer rules',
  'Invest long-term funds only if appropriate for your situation',
  'Keep every receipt (digital storage helps)',
  'Reassess plan and HSA strategy each open enrollment',
];

const checklist = [
  'Is my plan officially HSA eligible?',
  'What is my annual premium, deductible, and out-of-pocket maximum?',
  'How much will my employer contribute?',
  'What are the HSA contribution limits for my coverage type?',
  'What investment options and fees apply?',
  'How much do I expect to spend on healthcare this year?',
  'Do I qualify for ACA subsidies or cost-sharing reductions?',
  'Would another metal-tier plan provide better overall value?',
  'Am I approaching Medicare eligibility?',
  'Do I have enough emergency savings to handle the deductible?',
];

const faqs = [
  {
    question: 'What is the HSA contribution limit for 2026?',
    answer:
      'For 2026, the HSA contribution limit is $4,400 for self-only coverage and $8,750 for family coverage. Eligible individuals age 55 or older may generally make an additional $1,000 catch-up contribution.',
  },
  {
    question: 'Can I have an HSA without an HDHP?',
    answer:
      'Generally, you must have qualifying HSA-eligible high-deductible health plan coverage to contribute to an HSA. Other coverage and circumstances can also affect eligibility.',
  },
  {
    question: 'Can I use my HSA to pay medical bills?',
    answer: 'Yes. HSA funds can generally be used tax-free for qualified medical expenses.',
  },
  {
    question: 'Can I invest my HSA?',
    answer:
      'Many HSA providers offer investment options. Availability varies by provider, and investing involves risk.',
  },
  {
    question: 'Do HSA funds expire?',
    answer:
      'Generally, no. Unlike certain flexible spending arrangements, HSA funds generally roll over from year to year.',
  },
  {
    question: 'Do I lose my HSA if I change jobs?',
    answer:
      'Generally, no. The HSA belongs to you and generally remains yours when you change employers.',
  },
  {
    question: 'Can I contribute to an HSA after age 65?',
    answer:
      'Generally, you cannot contribute to an HSA once you are enrolled in Medicare. You can generally continue using existing HSA funds for qualified expenses.',
  },
  {
    question: 'Can I use HSA money for my spouse’s medical expenses?',
    answer:
      'Generally, HSA funds can be used for qualified medical expenses of your spouse and eligible dependents, subject to applicable IRS rules.',
  },
  {
    question: 'Can I use an HSA to pay health insurance premiums?',
    answer:
      'Generally, HSA funds cannot be used tax-free for ordinary health insurance premiums, but exceptions exist for certain types of coverage and circumstances.',
  },
  {
    question: 'Is an HSA better than an FSA?',
    answer:
      'Not necessarily. HSAs and FSAs work differently. An HSA generally offers greater portability and rollover benefits, while an FSA may help employees set aside pre-tax funds for predictable expenses without an HSA-qualified plan.',
  },
  {
    question: 'Should I invest my HSA?',
    answer:
      'It depends. If you have adequate cash reserves and do not need the money for near-term healthcare, investing may be worth considering. If you expect significant medical expenses soon, a larger cash balance may make more sense.',
  },
  {
    question: 'Can an HSA be used as a retirement account?',
    answer:
      'An HSA is not technically a retirement account, but it can serve as a long-term healthcare savings vehicle. After age 65, non-qualified withdrawals generally face ordinary income tax rather than the additional 20% penalty that often applies before 65.',
  },
];

const relatedCluster = [
  {
    href: hubPath('insurance', '/resources/how-to-choose-health-insurance-plan'),
    title: 'How to choose a health plan',
    detail: 'Metal tiers, networks, deductibles, and total-cost comparison for 2026.',
  },
  {
    href: hubPath('insurance', '/calculators/aca-subsidy'),
    title: 'ACA subsidy calculator',
    detail: 'Estimate premium tax credits before you compare HDHP vs Silver options.',
  },
  {
    href: hubPath('insurance', '/tools/aca-eligibility-checker'),
    title: 'ACA eligibility checker',
    detail: 'Confirm marketplace pathways and enrollment context.',
  },
  {
    href: hubPath('insurance', '/hubs/aca'),
    title: 'ACA specialty hub',
    detail: 'Marketplace-focused education and local agent research.',
  },
  {
    href: hubPath('insurance', '/hubs/health-insurance'),
    title: 'Health insurance hubs',
    detail: 'Browse health coverage topics and markets.',
  },
  {
    href: hubPath('insurance', '/directory'),
    title: 'Agency directory',
    detail: 'Research licensed agents independently—no paid placements.',
  },
];

export const metadata = buildTemplateMetadata({
  hub: 'insurance',
  title: TITLE,
  description: DESCRIPTION,
  path: META_PATH,
  type: 'article',
});

export default function HealthSavingsAccountsHsa2026Page() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        hub="insurance"
        datePublished="2026-07-26"
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
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              Back to all resources
            </Link>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-[11px] font-medium tracking-wide">
                Health Insurance
              </Badge>
              <Badge variant="outline" className="text-[11px] font-medium tracking-wide">
                HSA · HDHP · ACA
              </Badge>
              <span className="text-xs text-muted-foreground">18 min read · Evergreen</span>
              <span className="rounded-full border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:text-emerald-300">
                Last updated: July 2026
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Health Savings Accounts (HSAs) in 2026: Eligibility, Contribution Limits, Tax Benefits,
              and How to Maximize Them
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              Who qualifies, how much you can contribute, triple tax advantages, investing, and when
              an HSA-compatible plan actually fits
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Health insurance is often reduced to one question: <em>How much is the monthly premium?</em>{' '}
              That is only part of the equation. Your plan also shapes deductibles, cost-sharing, and
              how you prepare for future healthcare costs.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              For eligible consumers, a Health Savings Account (HSA) can be one of the most powerful
              tools available—tax advantages for contributions, growth, and qualified withdrawals,
              with funds that generally roll over and belong to you, not your employer. Used
              strategically, an HSA can become a long-term healthcare savings and investment vehicle.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              HSAs are not right for everyone. Eligibility depends on coverage type. An HSA-compatible
              HDHP may mean lower premiums but higher out-of-pocket exposure before coverage kicks in.
              This guide explains the 2026 rules, tradeoffs, and how to evaluate an HSA inside your
              broader insurance strategy.
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Educational only—not tax, legal, financial, or insurance advice
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    HSA rules can change. Eligibility depends on your coverage and circumstances.
                    Confirm details with the IRS, your health plan, HSA administrator, and qualified
                    professionals before making decisions.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <Link href={hubPath('insurance', '/')} className={LINK}>
                Insurance Trust Hub
              </Link>{' '}
              is an independent informational directory—no paid placements. Pair this guide with our{' '}
              <Link href={hubPath('insurance', '/calculators')} className={LINK}>
                calculators
              </Link>
              ,{' '}
              <Link
                href={hubPath('insurance', '/resources/how-to-choose-health-insurance-plan')}
                className={LINK}
              >
                plan-selection guide
              </Link>
              , and{' '}
              <Link href={hubPath('insurance', '/directory')} className={LINK}>
                agency directory
              </Link>
              .
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href={hubPath('insurance', '/calculators/aca-subsidy')}>
                  <Calculator className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  ACA subsidy calculator
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={hubPath('insurance', '/resources/how-to-choose-health-insurance-plan')}>
                  Compare health plans
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          {/* What is HSA */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <PiggyBank className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">What is a Health Savings Account?</h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              An HSA is a tax-advantaged account for eligible individuals to save for qualified medical
              expenses. The three-part tax treatment is what makes HSAs unusually powerful among
              financial accounts—but you must be eligible to contribute in the first place.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {tripleTax.map((item, i) => (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    Advantage #{i + 1}
                  </p>
                  <h3 className="mt-1 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Eligibility */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Who is eligible for an HSA in 2026?
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              The first question is not “Should I open an HSA?” It is “Am I eligible to contribute?”
              Rules can be more complex when other coverage is involved; limited-purpose coverage may
              be treated differently. When unsure, check with your plan, HSA administrator, or tax
              professional.
            </p>
            <ul className="space-y-2">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* HDHP */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <Shield className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                What is an HSA-eligible high-deductible health plan?
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              You generally cannot contribute to an HSA with just any health plan. You need qualifying
              HDHP coverage. The IRS sets annual deductible and out-of-pocket requirements for
              HSA-qualified plans.
            </p>
            <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
              <p className="text-sm font-medium text-foreground">
                Deductible ≠ contribution limit
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your <strong className="text-foreground">deductible</strong> is what you may pay before
                the plan pays according to its cost-sharing rules. Your{' '}
                <strong className="text-foreground">HSA contribution limit</strong> is the maximum you
                can put into the account for the year. They are completely different numbers.
              </p>
            </div>
            <p className="mb-3 text-sm font-medium text-foreground">
              2026 IRS HDHP thresholds (HSA-qualified)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {hdhpLimits2026.map((row) => (
                <div key={row.label} className="rounded-xl border bg-card p-4">
                  <p className="text-xs text-muted-foreground">{row.label}</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contribution limits */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How much can you contribute in 2026?
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contributionLimits2026.map((row) => (
                <div key={row.label} className="rounded-xl border bg-card p-4">
                  <p className="text-xs text-muted-foreground">{row.label}</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The $1,000 catch-up is generally available on an individual basis. If both spouses are
              55+, each may generally qualify for a catch-up contribution, typically to that
              spouse&apos;s own HSA. Limits can change annually—verify current IRS figures before
              finalizing contributions. Employer contributions count toward the same annual limit.
            </p>
          </section>

          {/* Tax advantages deep dive */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <Landmark className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                The three big tax advantages in practice
              </h2>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h3 className="font-semibold">1. Contributions may reduce taxable income</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Eligible contributions may be deductible. Through an employer cafeteria plan, payroll
                  contributions are generally pre-tax. Example: earning $80,000 and contributing $4,000
                  through an eligible payroll arrangement may reduce taxable income by that amount,
                  subject to tax rules. Exact savings depend on your federal bracket and state treatment.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h3 className="font-semibold">2. Investment growth can be tax-free</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Many people use an HSA like a medical checking account—but many providers also allow
                  investing in mutual funds, index funds, or other options. Growth is generally not
                  subject to current federal income tax. Investing is not automatic: keep cash for
                  near-term care; match strategy to risk tolerance and horizon. Returns are never
                  guaranteed.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h3 className="font-semibold">3. Qualified medical withdrawals are generally tax-free</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Used for qualified medical expenses, withdrawals are generally tax-free—completing
                  the contribution → growth → withdrawal chain that financial professionals often call
                  a triple tax advantage.
                </p>
              </div>
            </div>
          </section>

          {/* Non-medical + expenses */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Non-qualified withdrawals, expenses, and premiums
              </h2>
            </div>
            <div className="mb-4 rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 dark:bg-amber-950/20">
              <p className="text-sm font-medium text-foreground">Non-medical use changes the rules</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Non-qualified withdrawals may face ordinary income tax and, for many account holders
                under 65, an additional 20% tax. After 65, the extra 20% penalty generally no longer
                applies, though ordinary income tax may still apply. Keep careful records—do not treat
                the HSA like a regular checking account.
              </p>
            </div>
            <p className="mb-2 text-sm font-medium text-foreground">Examples of potential qualified expenses</p>
            <ul className="mb-5 grid gap-2 sm:grid-cols-2">
              {qualifiedExpenses.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
              Not every health-related product qualifies. Verify under current IRS rules and keep
              receipts—even if you reimburse yourself later.
            </p>
            <p className="mb-2 text-sm font-medium text-foreground">
              Ordinary health premiums generally do not qualify—exceptions may include:
            </p>
            <ul className="space-y-2">
              {premiumExceptions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <HelpCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Portability / jobs / Medicare */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Portability, job changes, and Medicare
              </h2>
            </div>
            <div className="space-y-3">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">The HSA is yours—not your employer’s</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Change jobs, become self-employed, retire, or move—and the accumulated balance
                  generally stays with you. You may keep the account, use funds for eligible expenses,
                  contribute if still eligible, or transfer/roll over to another provider. Compare fees
                  and investment options before transferring.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Medicare enrollment ends new contributions</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Once you enroll in Medicare, you generally cannot contribute further—but you can
                  still use existing funds for qualified expenses. Medicare enrollment can sometimes be
                  retroactive. People approaching 65 should coordinate contributions with enrollment
                  timing and speak with a qualified professional before large year-end deposits.
                </p>
              </div>
            </div>
          </section>

          {/* Investing */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <TrendingUp className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Can you invest your HSA?</h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Potentially yes—options vary by provider (index funds, mutual funds, target-date funds,
              and more). Some require a minimum cash balance first. Evaluate fees, available funds,
              cash requirements, ease of investing, and transfer options. The goal is not to invest
              because you can—it is whether investing fits expected healthcare spending and your
              broader plan.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {spendVsInvest.map((s) => (
                <div key={s.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{s.title}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Maximize strategy */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                The “maximize your HSA” strategy
              </h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              With financial flexibility, some people treat the HSA as a long-term healthcare
              investment account rather than spending every dollar immediately.
            </p>
            <ol className="space-y-3">
              {maximizeSteps.map((step, i) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl border bg-muted/30 p-4 sm:p-5">
              <p className="text-sm font-medium text-foreground">Simple growth illustration</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Contribute $4,000 in a year, invest unused funds, and—if repeated over many years—the
                account may grow into a meaningful pool for future care. Outcomes depend on
                contributions, returns, fees, withdrawals, time, and markets. Investments can lose
                value; the unique edge is the tax structure combined with long-term compounding
                potential.
              </p>
            </div>
          </section>

          {/* HSA vs FSA */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">HSA vs. FSA: what&apos;s the difference?</h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Both can provide tax advantages for healthcare spending, but they work differently. An
              HSA is generally more portable and can accumulate. An FSA may fit someone with
              predictable expenses who does not have an HSA-eligible plan.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-3 py-2.5 font-semibold">Feature</th>
                    <th className="px-3 py-2.5 font-semibold">HSA</th>
                    <th className="px-3 py-2.5 font-semibold">FSA</th>
                  </tr>
                </thead>
                <tbody>
                  {hsaVsFsa.map((row) => (
                    <tr key={row.feature} className="border-t">
                      <td className="px-3 py-2 font-medium">{row.feature}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.hsa}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.fsa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* HDHP vs traditional */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <CreditCard className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                HSA-compatible HDHP vs traditional plan
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              An HSA-eligible HDHP may offer lower monthly premiums but higher deductibles and greater
              upfront costs. A traditional plan may cost more each month with lower deductibles and
              more predictable cost-sharing. The cheapest premium is not necessarily the cheapest plan.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {consumerProfiles.map((c) => (
                <div key={c.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{c.title}</h3>
                  <ul className="mt-2 space-y-1.5">
                    {c.traits.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm font-medium text-emerald-800 dark:text-emerald-300">
                    {c.fit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ACA marketplace */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <Landmark className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                HSAs, ACA Marketplace plans, subsidies, and CSRs
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Marketplace plans use metal tiers (Bronze, Silver, Gold, Platinum) that describe cost
              split—not care quality. Some Marketplace plans may be HSA-eligible, but not every
              high-deductible plan automatically qualifies. Verify HSA eligibility for the specific
              plan.
            </p>
            <div className="space-y-3">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Premium tax credits (subsidies)</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compare after-subsidy premiums—not sticker prices—then factor medical spending, tax
                  savings, employer HSA contributions, investment potential, and maximum out-of-pocket
                  exposure. For some households a subsidized Silver plan wins; for others an
                  HSA-compatible plan wins on premium + tax advantages.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold">Cost-sharing reductions (CSRs)</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  CSRs generally apply when eligible consumers select a qualifying Silver plan and can
                  substantially lower deductibles and out-of-pocket costs. Do not choose an HSA plan
                  solely for tax benefits if a CSR Silver plan delivers a better total cost structure.
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href={hubPath('insurance', '/calculators/aca-subsidy')}>
                  Estimate subsidies →
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={hubPath('insurance', '/hubs/aca')}>ACA hub</Link>
              </Button>
            </div>
          </section>

          {/* 7 questions */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">The HSA decision framework</h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              When comparing health plans, work through these seven questions, then compare the
              complete financial picture.
            </p>
            <ol className="space-y-3">
              {decisionFramework.map((item, i) => (
                <li key={item.q} className="flex gap-3 rounded-xl border bg-card p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.q}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.a}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Mistakes */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <XCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">Common HSA mistakes to avoid</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {mistakes.map((m, i) => (
                <div key={m.title} className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Mistake #{i + 1}
                  </p>
                  <h3 className="mt-1 font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Maximize 2026 + checklist */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={ICON_BOX}>
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How to maximize your HSA in 2026
              </h2>
            </div>
            <ul className="mb-8 space-y-2">
              {maximize2026.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <h3 className="mb-3 text-lg font-semibold">2026 HSA checklist</h3>
            <div className="rounded-xl border bg-card p-4 sm:p-5">
              <ul className="space-y-2">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-emerald-500/40"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Bottom line */}
          <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 via-background to-emerald-600/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">The bottom line</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              An HSA can be one of the most valuable tax-advantaged tools available to eligible
              consumers—but it should not be evaluated in isolation. The real decision is not “Should I
              open an HSA?” It is:{' '}
              <strong className="font-semibold text-foreground">
                Does an HSA-compatible health plan make sense for my healthcare needs, finances, and
                long-term goals?
              </strong>
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Compare the total picture: premiums, deductibles, copays, coinsurance, out-of-pocket
              maximums, prescriptions, employer contributions, ACA subsidies, tax advantages, expected
              usage, and long-term goals. Used strategically, an HSA can help manage costs today and
              prepare for care in retirement.
            </p>
            <p className="mt-4 font-medium text-foreground">
              The best health insurance decision is not always the plan with the lowest premium—it is
              the plan with the right balance of coverage, cost, flexibility, and financial value for
              your situation.
            </p>
          </section>

          {/* Cluster */}
          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Continue on Insurance Trust Hub
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              This is a cornerstone HSA guide. Next: understand plan selection, run subsidy numbers,
              then research licensed help.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedCluster.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border bg-card p-4 transition-colors hover:border-emerald-500/50"
                >
                  <h3 className="font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions about HSAs in 2026
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border bg-card p-4 sm:p-5">
                  <h3 className="font-semibold leading-snug">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Next step */}
          <section className="rounded-2xl border bg-gradient-to-br from-emerald-500/8 via-background to-emerald-600/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Your next step</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              When comparing 2026 health plans, do not stop at the monthly premium. Calculate annual
              premiums, deductibles and out-of-pocket maximums, ACA subsidies and CSRs, HSA
              eligibility, employer contributions, and tax advantages—then compare total potential
              cost.
            </p>
            <p className="mt-4 font-medium text-foreground">
              Understand the coverage. Understand the HSA. Understand the numbers. Then make the
              decision with confidence.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Link href={hubPath('insurance', '/resources/how-to-choose-health-insurance-plan')}>
                  How to choose a health plan
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hubPath('insurance', '/directory')}>Find insurance agents</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Insurance Trust Hub is an independent informational directory with no paid placements.
              Always verify plan details and eligibility through official sources such as{' '}
              <a
                href="https://www.healthcare.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                HealthCare.gov
              </a>
              , your state marketplace, your plan documents, and the IRS.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
