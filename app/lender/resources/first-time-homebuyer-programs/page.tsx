import Link from 'next/link';
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  Landmark,
  MapPin,
  Percent,
  Scale,
  Search,
  Shield,
  Users,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArticleSchema } from '@/components/resources/article-schema';
import { JsonLd } from '@/lib/seo/json-ld';
import { buildTemplateMetadata } from '@/lib/hub/templates/metadata';
import { hubPath } from '@/lib/hub/paths';

const TITLE = 'First-Time Homebuyer Programs & Down Payment Assistance 2026';
const DESCRIPTION =
  'Explore 2026 first-time homebuyer mortgage programs, including FHA, VA, USDA, conventional loans, and down payment assistance. Learn how to qualify and compare lenders.';
const PATH = '/lender/resources/first-time-homebuyer-programs';
const META_PATH = '/resources/first-time-homebuyer-programs';

const ACCENT = 'text-[#3B82F6]';
const ACCENT_BG = 'bg-[#3B82F6]/10 text-[#3B82F6]';
const LINK = 'text-[#3B82F6] underline underline-offset-2';

function ProgramCta({
  calcLabel,
  calcHref,
  lendersLabel = 'Find lenders in our directory',
}: {
  calcLabel: string;
  calcHref: string;
  lendersLabel?: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Button asChild size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
        <Link href={calcHref}>{calcLabel}</Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={hubPath('lender', '/local-lenders')}>{lendersLabel}</Link>
      </Button>
    </div>
  );
}

const downPaymentMyths = [
  {
    label: 'Conventional (select programs)',
    value: 'As low as 3%',
    detail: 'HomeReady, Home Possible, and certain 97% LTV options for eligible borrowers.',
  },
  {
    label: 'FHA',
    value: 'As low as 3.5%',
    detail: 'Widely used first-time option; mortgage insurance and total cost still matter.',
  },
  {
    label: 'VA / USDA (eligible)',
    value: '0% down possible',
    detail: 'Eligibility, property rules, and funding/guarantee fees still apply. Zero down ≠ zero cash.',
  },
];

const loanPrograms = [
  {
    id: 'conventional',
    num: '1',
    title: 'Conventional mortgages with low down payments',
    icon: Landmark,
    summary:
      'A conventional mortgage is not insured or guaranteed by the federal government. Certain programs allow down payments as low as 3% for eligible borrowers.',
    examples: [
      'Fannie Mae HomeReady',
      'Fannie Mae 97% LTV options',
      'Freddie Mac Home Possible',
      'Other conventional programs from individual lenders',
    ],
    factors: [
      'Credit history and score',
      'Income and debt-to-income ratio',
      'Employment history',
      'Property type and occupancy',
      'Area median income',
      'First-time buyer status (where relevant)',
    ],
    who: [
      'Solid credit and stable income',
      'Manageable debt load',
      'Want less than 20% down',
      'May qualify for down payment assistance',
      'Want to compare conventional vs FHA total cost',
    ],
    tip: 'Private mortgage insurance may eventually be cancelable when requirements are met—attractive if you expect to build equity over time. Compare total cost, not just the down payment.',
    sources: [
      {
        label: 'Fannie Mae HomeReady',
        href: 'https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/homeready-mortgage',
      },
    ],
  },
  {
    id: 'fha',
    num: '2',
    title: 'FHA loans',
    icon: Home,
    summary:
      'FHA loans are insured by the Federal Housing Administration and remain one of the most recognized first-time buyer options—accessible down payments, but mortgage insurance and full cost require careful comparison.',
    examples: [
      'Down payment potentially as low as 3.5%',
      'May fit borrowers with credit challenges or limited savings',
      'Loan limits vary by location and property type',
    ],
    factors: [
      'Down payment',
      'Upfront and annual mortgage insurance',
      'Interest rate and closing costs',
      'Monthly payment and long-term cost',
      'Ability to refinance later',
    ],
    who: [
      'Limited savings',
      'Credit challenges',
      'Higher DTI pressure on conventional options',
      'Want to compare a 3.5% down path',
    ],
    tip: 'In 2026, FHA policy continues to evolve. HUD has announced policy updates aimed at reducing administrative burdens and expanding access—always verify current rules with an FHA-approved lender.',
    sources: [
      {
        label: 'HUD news (2026 policy updates)',
        href: 'https://www.hud.gov/news/hud-no-26-051',
      },
    ],
  },
  {
    id: 'va',
    num: '3',
    title: 'VA loans for eligible veterans and servicemembers',
    icon: Shield,
    summary:
      'If you may be eligible (veteran, active-duty, certain surviving spouses, or other eligible borrowers), a VA-backed mortgage should be among the first programs you investigate—often with no down payment and no monthly PMI.',
    examples: [
      'Potential 0% down for eligible borrowers',
      'No monthly private mortgage insurance',
      'VA funding fee may apply (exemptions possible)',
      'Funding fee can vary by circumstances and first vs subsequent use',
    ],
    factors: [
      'Closing costs and prepaid taxes/insurance',
      'Inspection, appraisal, moving, repairs',
      'Potential funding fees',
      'Eligibility documentation',
    ],
    who: [
      'May be VA-eligible',
      'Limited savings for a down payment',
      'Want to compare VA vs other options seriously',
    ],
    tip: '“0% down” does not mean “zero cost.” Budget for closing and post-purchase cash needs. Start with VA if you may qualify—then compare total cost.',
    sources: [
      {
        label: 'CFPB special loan programs',
        href: 'https://www.consumerfinance.gov/owning-a-home/special-loan-programs/',
      },
    ],
  },
  {
    id: 'usda',
    num: '4',
    title: 'USDA loans',
    icon: MapPin,
    summary:
      'USDA-backed mortgages can offer another 0%-down path for qualified buyers purchasing eligible properties in qualifying areas—often aimed at low- and moderate-income households.',
    examples: [
      'Potentially 0% down',
      'Competitive financing for eligible buyers',
      'Income and property location requirements',
      'Upfront and ongoing fees',
    ],
    factors: [
      'Property must meet rural/area eligibility rules',
      'Household income limits',
      'Primary residence purchase',
      'Program fees and monthly costs',
    ],
    who: [
      'Limited savings',
      'Moderate household income',
      'Primary residence in an eligible area',
    ],
    tip: '“Rural” does not always mean remote. Some eligible areas are closer to suburbs than buyers expect—check property eligibility early.',
    sources: [
      {
        label: 'CFPB special loan programs',
        href: 'https://www.consumerfinance.gov/owning-a-home/special-loan-programs/',
      },
    ],
  },
];

const dpaTypes = [
  {
    title: 'Grants',
    detail:
      'Funds that may not need repayment if you meet rules—primary occupancy, stay period, income limits, price caps, homebuyer education.',
  },
  {
    title: 'Deferred second mortgages',
    detail:
      'Payments may be deferred; balance can become due when you sell, refinance, pay off the first mortgage, or stop occupying the home.',
  },
  {
    title: 'Forgivable loans',
    detail:
      'Balance may be forgiven over time if you meet program requirements (for example, multi-year occupancy).',
  },
  {
    title: 'Low-interest second mortgages',
    detail: 'A second lien with a below-market rate—still a loan with obligations.',
  },
  {
    title: 'Mortgage credit certificates',
    detail:
      'Certain state or local programs may offer tax benefits for eligible borrowers, subject to program rules.',
  },
];

const dpaSources = [
  'State housing finance agencies',
  'Counties, cities, and municipalities',
  'Nonprofit and community organizations',
  'Employers and housing authorities',
  'Certain federal or federally supported programs',
];

const combinations = [
  'FHA + down payment assistance',
  'Conventional + down payment assistance',
  'HomeReady + eligible assistance',
  'Home Possible + eligible assistance',
  'State HFA program + first mortgage',
];

const dpaQuestions = [
  'Do I have to repay it? When?',
  'Is the balance forgiven over time?',
  'What happens if I sell or refinance?',
  'Is there interest or a lien?',
  'Do I have to live in the home for a set period?',
  'Are there income or purchase price limits?',
];

const findDpaSteps = [
  {
    title: 'State housing finance agency',
    detail: 'Many states offer first-time buyer and assistance programs through their HFA.',
  },
  {
    title: 'Local government',
    detail: 'County, city, and municipal programs may target income, neighborhoods, or property locations.',
  },
  {
    title: 'HUD-approved housing counselors',
    detail: 'Counselors can help you understand programs and homebuying options for your situation.',
  },
  {
    title: 'Ask mortgage lenders',
    detail:
      'Ask: “Which first-time homebuyer and down payment assistance programs do you currently participate in?” Not every lender participates in every program.',
  },
  {
    title: 'Program matching resources',
    detail:
      'Some industry tools help identify assistance by location and circumstances (for example, resources referenced by Freddie Mac and others).',
  },
];

const compareLenderAsks = [
  'APR (not only rate)',
  'Origination fees and discount points',
  'Lender credits and closing costs',
  'Mortgage insurance',
  'Down payment assistance access',
  'Program eligibility and rate-lock terms',
  'Estimated closing timeline',
];

const strategySteps = [
  {
    title: 'Check your credit',
    detail: 'Review reports for errors, late payments, high balances, and accounts you do not recognize. Fix issues before applying when possible.',
  },
  {
    title: 'Calculate a realistic budget',
    detail:
      'Estimate monthly payment, home price, down payment, taxes, and insurance—then compare scenarios with a calculator.',
  },
  {
    title: 'Map your cash',
    detail:
      'Separate savings into down payment, closing costs, emergency reserves, and moving expenses. Not every dollar should go to the down payment.',
  },
  {
    title: 'Explore mortgage programs',
    detail: 'Compare conventional, FHA, VA, and USDA. Include specialized options if you may be eligible.',
  },
  {
    title: 'Search for down payment assistance',
    detail: 'State, local, county, employer, and nonprofit programs—before you lock a lender that does not participate.',
  },
  {
    title: 'Get multiple preapprovals',
    detail: 'Ask several lenders to evaluate you for the programs you may qualify for.',
  },
  {
    title: 'Compare actual numbers',
    detail:
      'Rate, APR, payment, mortgage insurance, closing costs, cash to close, assistance, and total loan cost.',
  },
  {
    title: 'Choose the fit for your life',
    detail:
      'Lowest down payment ≠ cheapest mortgage. Lowest rate ≠ lowest cost. Best ad ≠ best lender. Look at the full picture.',
  },
];

const exampleRows = [
  { scenario: '20% conventional', cash: '$70,000' },
  { scenario: '3% conventional', cash: '$10,500' },
  { scenario: '3.5% FHA', cash: '$12,250' },
  { scenario: '0% VA/USDA (if eligible)', cash: '$0 down*' },
];

const checklistGroups = [
  {
    title: 'Financial preparation',
    items: [
      'Checked credit reports and score',
      'Calculated monthly debt and estimated DTI',
      'Determined available savings and emergency reserves',
    ],
  },
  {
    title: 'Mortgage research',
    items: [
      'Compared conventional, FHA, VA, and USDA (as applicable)',
      'Asked about first-time buyer programs',
      'Reviewed mortgage insurance requirements',
    ],
  },
  {
    title: 'Down payment assistance',
    items: [
      'Checked state, county, and local programs',
      'Asked about grants, deferred/forgivable loans, and second mortgages',
      'Asked about closing cost assistance',
    ],
  },
  {
    title: 'Lender shopping',
    items: [
      'Compared multiple lenders and DPA participation',
      'Obtained multiple preapprovals',
      'Compared Loan Estimates, APR, fees, and cash to close',
    ],
  },
];

const faqs = [
  {
    question: 'What is the best mortgage for a first-time homebuyer?',
    answer:
      'There is no single best mortgage for everyone. Conventional, FHA, VA, and USDA loans each have different eligibility requirements and costs. The best option depends on your credit, income, debt, savings, military eligibility, property location, and long-term financial goals.',
  },
  {
    question: 'Can I buy a house with 3% down?',
    answer:
      'Yes. Certain conventional mortgage programs allow eligible borrowers to purchase with as little as 3% down. Fannie Mae’s HomeReady program is one example, subject to its eligibility requirements.',
  },
  {
    question: 'Can first-time homebuyers buy a house with no money down?',
    answer:
      'Some eligible borrowers may qualify for 0%-down financing through programs such as VA or USDA. Zero down does not necessarily mean zero cash needed—buyers may still face closing costs, prepaid expenses, inspections, moving costs, and other expenses.',
  },
  {
    question: 'Does FHA require 20% down?',
    answer:
      'No. Eligible FHA borrowers may qualify for a down payment as low as 3.5%, depending on qualifications and circumstances.',
  },
  {
    question: 'Can I use down payment assistance with an FHA loan?',
    answer:
      'Many state and local programs are designed to work alongside FHA or conventional mortgages, but exact rules depend on the assistance program and loan type.',
  },
  {
    question: 'How do I find down payment assistance near me?',
    answer:
      'Start with your state’s housing finance agency, local government, HUD-approved housing counseling resources, and participating mortgage lenders. Eligibility often depends on income, location, purchase price, and first-time buyer status.',
  },
  {
    question: 'Is down payment assistance free money?',
    answer:
      'Sometimes. Some programs provide grants; others provide loans that must eventually be repaid. Some loans may be deferred or forgiven if you meet specific requirements. Always understand the terms before accepting assistance.',
  },
  {
    question: 'What credit score do I need to buy my first home?',
    answer:
      'There is no single credit score requirement for every mortgage. Requirements vary by loan program, lender, and the overall strength of your application.',
  },
  {
    question: 'Should I get preapproved by more than one lender?',
    answer:
      'Generally, yes. Comparing multiple lenders helps you understand available programs and costs. The CFPB recommends comparing multiple mortgage offers and suggests getting at least three preapprovals when shopping for a mortgage.',
  },
  {
    question: 'Is it better to put 20% down?',
    answer:
      'Not necessarily. A larger down payment can reduce your loan amount, but using all of your savings may leave you without adequate emergency funds. The right down payment depends on your overall financial position.',
  },
  {
    question: 'How much money should I have saved before buying my first home?',
    answer:
      'There is no universal amount. Ideally, plan for down payment, closing costs, prepaid expenses, moving costs, and an emergency reserve. Your lender can help estimate cash-to-close; also plan for needs after closing.',
  },
];

const relatedCluster = [
  {
    href: hubPath('lender', '/calculators'),
    title: 'Mortgage calculators',
    detail: 'Payment, affordability, and scenario tools to stress-test your budget.',
  },
  {
    href: hubPath('lender', '/resources/how-to-choose-mortgage-lender'),
    title: 'How to choose a mortgage lender',
    detail: 'NMLS checks, red flags, and a side-by-side comparison framework.',
  },
  {
    href: hubPath('lender', '/local-lenders'),
    title: 'Mortgage lender directory',
    detail: 'Research lenders independently—no paid placements.',
  },
  {
    href: hubPath('lender', '/compare'),
    title: 'Compare mortgage lenders',
    detail: 'Line up options before you commit to a single preapproval path.',
  },
  {
    href: hubPath('lender', '/resources/fixed-vs-adjustable-rate-mortgages'),
    title: 'Fixed vs adjustable rates',
    detail: 'Understand rate structure risk alongside program choice.',
  },
  {
    href: hubPath('lender', '/about'),
    title: 'Trust & NMLS verification',
    detail: 'How Lender Trust Hub approaches independent research.',
  },
];

export const metadata = buildTemplateMetadata({
  hub: 'lender',
  title: TITLE,
  description: DESCRIPTION,
  path: META_PATH,
  type: 'article',
});

export default function FirstTimeHomebuyerProgramsPage() {
  return (
    <>
      <ArticleSchema
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        hub="lender"
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
        {/* Hero */}
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
                Buying Guide
              </Badge>
              <Badge variant="outline" className="text-[11px] font-medium tracking-wide">
                First-time buyers
              </Badge>
              <span className="text-xs text-muted-foreground">20 min read · Evergreen</span>
              <span className="rounded-full border border-[#3B82F6]/25 bg-[#3B82F6]/5 px-2.5 py-0.5 text-xs font-medium text-[#1e40af]">
                Last updated: July 2026
              </span>
            </div>

            <h1 className="text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              First-Time Homebuyer Mortgage Programs and Down Payment Assistance Options in 2026
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              FHA, VA, USDA, conventional loans, and local assistance—how to compare what fits you
            </p>

            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Buying your first home is exciting—but figuring out how to pay for it can feel
              overwhelming. How much do you need down? What credit score helps? FHA or conventional?
              Could VA or USDA mean little or no money down? Are there state or local programs for
              closing costs?
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              First-time buyers in 2026 often have more options than saving 20% for a traditional
              mortgage. Depending on income, credit, location, and military eligibility, you may
              qualify for as little as 3% down—or 0% through certain government-backed programs—plus
              grants, forgivable loans, deferred seconds, and other assistance.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              This guide breaks down major programs, basic qualification factors, and a framework
              for comparing options{' '}
              <strong className="font-semibold text-foreground">before</strong> you choose a lender.
            </p>

            <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
              <div className="flex gap-3">
                <AlertTriangle
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">Programs change—verify current rules</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    Mortgage programs, rates, income and loan limits, and down payment assistance can
                    change. Eligibility depends on your finances and the property. Always verify
                    requirements with an approved lender or program administrator before making a
                    financial decision. This page is educational, not personalized advice.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              <Link href={hubPath('lender', '/')} className={LINK}>
                Lender Trust Hub
              </Link>{' '}
              is an independent informational directory—no paid placements. Use our{' '}
              <Link href={hubPath('lender', '/calculators')} className={LINK}>
                calculators
              </Link>
              ,{' '}
              <Link href={hubPath('lender', '/local-lenders')} className={LINK}>
                lender directory
              </Link>
              , and{' '}
              <Link href={hubPath('lender', '/compare')} className={LINK}>
                comparison tools
              </Link>{' '}
              to research options, then verify licensing via{' '}
              <a
                href="https://www.nmlsconsumeraccess.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                NMLS Consumer Access
              </a>
              .
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Link href={hubPath('lender', '/calculators')}>
                  <Calculator className="mr-1.5 h-4 w-4" aria-hidden="true" />
                  Open mortgage calculators
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={hubPath('lender', '/local-lenders')}>Browse lenders</Link>
              </Button>
            </div>
          </div>
        </section>

        <div className="container mx-auto max-w-3xl space-y-14 px-4 py-10">
          {/* You may not need 20% */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Percent className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                You may not need 20% down
              </h2>
            </div>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              One of the biggest misconceptions about buying a home is that you need a 20% down
              payment. That is not necessarily true. Do not assume the amount you have saved
              automatically determines whether you can buy—income, credit, debt, location, loan type,
              property type, and available assistance all matter.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {downPaymentMyths.map((item) => (
                <div key={item.label} className="rounded-xl border bg-card p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </p>
                  <p className={`mt-1 text-xl font-semibold ${ACCENT}`}>{item.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Example: Fannie Mae&apos;s HomeReady can offer eligible borrowers down payments as low
              as 3% and may allow certain gifts, grants, and Community Seconds subject to program
              rules. Fannie Mae also maintains 97% LTV options for eligible first-time and other
              qualifying borrowers.{' '}
              <a
                href="https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/homeready-mortgage"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                HomeReady (Fannie Mae)
              </a>
            </p>
          </section>

          {/* FTHB definition */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                What “first-time homebuyer” actually means
              </h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              You might assume a first-time homebuyer is someone who has never owned a home. That is
              often true—but not always. For certain programs, the definition can be broader. HUD’s
              definition used for some programs generally includes someone who has not owned a
              principal residence during the three-year period before purchasing. Circumstances
              involving former homeowners, single parents, displaced homemakers, and homes not
              permanently affixed to a foundation can also affect status.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If you owned a home years ago, do not automatically assume every first-time program is
              closed to you. Ask a lender or housing counselor to evaluate your situation.
            </p>
          </section>

          {/* Program overview chips */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Scale className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Major mortgage options for first-time buyers in 2026
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              There is no single “best” first-time homebuyer mortgage. The right loan depends on your
              circumstances. Explore conventional, FHA, VA, USDA, state/local HFA programs,
              specialized affordable products, and assistance that can pair with eligible first
              mortgages.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Conventional', 'FHA', 'VA', 'USDA', 'State / local HFA', 'DPA programs'].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border bg-card px-3 py-1 text-sm font-medium text-foreground"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Detailed programs 1-4 */}
          {loanPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <section key={program.id} id={program.id}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Program {program.num}
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight">{program.title}</h2>
                  </div>
                </div>
                <p className="mb-4 leading-relaxed text-muted-foreground">{program.summary}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border bg-card p-4">
                    <h3 className="font-semibold">Key points</h3>
                    <ul className="mt-2 space-y-1.5">
                      {program.examples.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT}`}
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border bg-card p-4">
                    <h3 className="font-semibold">Who may explore this</h3>
                    <ul className="mt-2 space-y-1.5">
                      {program.who.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <BadgeCheck
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                            aria-hidden="true"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-3 rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Underwriting often looks at: </span>
                    {program.factors.join(' · ')}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{program.tip}</p>
                  {program.sources.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Sources:{' '}
                      {program.sources.map((s, i) => (
                        <span key={s.href}>
                          {i > 0 && ' · '}
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={LINK}
                          >
                            {s.label}
                          </a>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
                <ProgramCta
                  calcLabel="See if your budget works →"
                  calcHref={hubPath('lender', '/calculators')}
                />
              </section>
            );
          })}

          {/* DPA section */}
          <section id="down-payment-assistance">
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                5. State and local down payment assistance
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              This is where many first-time buyers leave money—or potential help—on the table. Down
              payment assistance is not one national program. It is highly local: what exists in one
              state or county may not exist next door.
            </p>
            <p className="mb-3 text-sm font-medium text-foreground">Assistance may come from</p>
            <ul className="mb-5 grid gap-2 sm:grid-cols-2">
              {dpaSources.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT}`} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid gap-3 sm:grid-cols-2">
              {dpaTypes.map((type) => (
                <div key={type.title} className="rounded-xl border bg-card p-4">
                  <h3 className="font-semibold">{type.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{type.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Amounts vary from a few thousand dollars to larger figures based on income, location,
              household size, and purchase price. Search for assistance{' '}
              <em>before</em> you assume you must save a fixed cash target.{' '}
              <a
                href="https://myhome.freddiemac.com/buying/down-payment-assistance-programs"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Freddie Mac on DPA programs
              </a>
            </p>
          </section>

          {/* Combine DPA */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <FileText className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Can assistance combine with FHA or conventional loans?
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              In many cases, yes—some programs are built to sit alongside a first mortgage. Rules
              vary: income and purchase price limits, credit, first-time status, education,
              occupancy, and <strong className="font-semibold text-foreground">approved lender</strong>{' '}
              requirements are common. Identify assistance early so you do not pick a lender that
              cannot participate in the program you need.
            </p>
            <ul className="space-y-2">
              {combinations.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT}`} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted-foreground">
              Fannie Mae notes eligible assistance sources can apply toward down payments and closing
              costs under applicable guidelines.{' '}
              <a
                href="https://singlefamily.fanniemae.com/originating-underwriting/mortgage-products/down-payment-and-closing-cost-assistance"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Fannie Mae DPA overview
              </a>
            </p>
          </section>

          {/* Credit, income, DTI */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <CreditCard className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Credit, income, and debt-to-income
              </h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h3 className="font-semibold">Credit score matters—but not alone</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Underwriting may also weigh payment history, DTI, employment stability, assets and
                  reserves, existing debts, loan type, and property type. A higher score can improve
                  options and pricing; a lower score may still qualify for certain programs. Ask:{' '}
                  <em>What programs could I realistically qualify for based on my full profile?</em>
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h3 className="font-semibold">There is no universal income requirement</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Affordability depends on home price, rate, taxes, insurance, HOA, down payment,
                  credit, existing debt, and loan program. Two households with the same income can
                  qualify for very different amounts. Calculators map{' '}
                  <strong className="font-medium text-foreground">
                    income → debt → down payment → rate → payment → price
                  </strong>
                  —then a lender reviews documentation.
                </p>
                <ProgramCta
                  calcLabel="Run affordability scenarios →"
                  calcHref={`${hubPath('lender', '/calculators')}?calc=affordability`}
                />
              </div>
              <div className="rounded-xl border bg-card p-4 sm:p-5">
                <h3 className="font-semibold">Debt-to-income (DTI) ratio</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  DTI compares monthly debt obligations with gross monthly income. Example: $8,000
                  gross income and $2,000 in qualifying monthly debts → 25% DTI. Obligations may
                  include cards, auto and student loans, personal loans, housing payments, and the
                  proposed mortgage. Maximum acceptable DTI varies by program. Income alone does not
                  set your budget—monthly obligations matter too.
                </p>
              </div>
            </div>
          </section>

          {/* Down payment vs closing costs */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Wallet className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Down payment vs closing costs—and how much to put down
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              First-time buyers often focus only on the down payment. You may also need cash for
              origination fees, appraisal, title, recording, prepaid interest, taxes, insurance,
              escrow, and inspections. Someone with $20,000 saved should not assume all of it can go
              to the down payment—closing costs and reserves matter. Assistance can sometimes help
              with closing costs as well as the down payment.
            </p>
            <div className="rounded-xl border border-[#3B82F6]/20 bg-[#3B82F6]/5 p-5">
              <p className="text-sm font-medium text-foreground">A healthier framing</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Not simply “smallest down payment possible” or “always 20%.” Ask:{' '}
                <strong className="font-semibold text-foreground">
                  What down payment creates the healthiest overall financial position for me?
                </strong>{' '}
                Discuss with a qualified lender—and a financial professional when appropriate—so you
                still have room for repairs, furniture, moving, and emergencies after closing.
              </p>
            </div>
          </section>

          {/* DPA not always free */}
          <section className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8 dark:bg-amber-950/20">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-900/40">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Assistance isn’t always “free money”
              </h2>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              “Down payment assistance” can sound like a gift. Sometimes it is a grant. Often it is a
              deferred, forgivable, or repayable second mortgage—or a tax credit—with real
              conditions. A $10,000 program can still be valuable; the terms attached to that $10,000
              matter.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {dpaQuestions.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
                  {q}
                </li>
              ))}
            </ul>
          </section>

          {/* How to find DPA */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Search className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                How to find down payment assistance in 2026
              </h2>
            </div>
            <ol className="space-y-3">
              {findDpaSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3 rounded-xl border bg-card p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Compare lenders */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Compare lenders—not just rates
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              A mortgage is a long-term commitment. The lender affects rate, fees, closing costs,
              available programs, DPA access, underwriting experience, communication, and timeline.
              Two lenders offering the same program type can produce very different total costs. The
              CFPB recommends comparing multiple lenders and obtaining at least three preapprovals or
              loan offers when shopping.{' '}
              <a
                href="https://www.consumerfinance.gov/consumer-tools/mortgages/shopping-for-a-mortgage/"
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                CFPB: shopping for a mortgage
              </a>
            </p>
            <ul className="mb-4 grid gap-2 sm:grid-cols-2">
              {compareLenderAsks.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT}`} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mb-4 text-sm text-muted-foreground">
              Then compare the actual Loan Estimates you receive—not just advertisements.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Link href={hubPath('lender', '/compare')}>Open lender comparison →</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href={hubPath('lender', '/resources/how-to-choose-mortgage-lender')}>
                  How to choose a lender
                </Link>
              </Button>
            </div>
          </section>

          {/* 8-step strategy */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Your first-time homebuyer strategy for 2026
              </h2>
            </div>
            <ol className="space-y-3">
              {strategySteps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/10 text-xs font-semibold text-[#3B82F6]">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Example comparison */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <Calculator className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Why comparing programs matters: a simple example
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              Imagine a first-time buyer looking at a <strong className="text-foreground">$350,000</strong>{' '}
              home. Down payment alone can swing cash needed by tens of thousands of dollars—but it is
              only one part of the decision. Also weigh mortgage insurance, rate, fees, monthly
              payment, taxes, insurance, assistance terms, and long-term cost.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full min-w-[20rem] text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Scenario</th>
                    <th className="px-4 py-3 font-semibold">Down payment cash*</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleRows.map((row) => (
                    <tr key={row.scenario} className="border-t">
                      <td className="px-4 py-2.5">{row.scenario}</td>
                      <td className="px-4 py-2.5 tabular-nums font-medium text-muted-foreground">
                        {row.cash}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              *Illustrative only. Closing costs, reserves, and program fees are additional. VA/USDA
              0% down still requires budgeting for non-down-payment cash needs.
            </p>
            <ProgramCta
              calcLabel="Model payment scenarios →"
              calcHref={`${hubPath('lender', '/calculators')}?calc=payment`}
            />
          </section>

          {/* Checklist */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${ACCENT_BG}`}>
                <ClipboardList className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight">
                2026 first-time homebuyer checklist
              </h2>
            </div>
            <div className="space-y-4">
              {checklistGroups.map((group) => (
                <div key={group.title} className="rounded-xl border bg-card p-4 sm:p-5">
                  <h3 className="mb-3 font-semibold">{group.title}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#3B82F6]/40"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom line */}
          <section className="rounded-2xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#3B82F6]/8 via-background to-[#0A2540]/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              The bottom line: more options than you think
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Buying your first home in 2026 does not necessarily require 20% down. You may have access
              to low-down conventional products, FHA, VA or USDA (if eligible), HFA programs, local
              DPA, grants, forgivable or deferred seconds, closing cost help, and specialized
              first-time products.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The challenge is finding the combination that works for{' '}
              <strong className="font-semibold text-foreground">you</strong>. The first lender you
              speak with may not offer every program you qualify for. The first rate you see may not
              be your best offer. Online program marketing may not fit once you read the full terms.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Start with education, understand your numbers, compare options, then speak with multiple
              qualified lenders. Ask: Are they licensed? Experienced with your loan type? Do they
              participate in local DPA? Can they explain total cost and give a transparent Loan
              Estimate you can compare?
            </p>
            <p className="mt-4 font-medium text-foreground">
              Understand the programs. Compare the numbers. Research the lender. Then choose the
              mortgage that fits your financial future—not simply the lowest advertised down payment.
            </p>
          </section>

          {/* Cluster links */}
          <section>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">
              Continue on Lender Trust Hub
            </h2>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              This is a pillar guide. Use these tools and articles as your next steps—education →
              calculators → directory → comparison.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedCluster.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border bg-card p-4 transition-colors hover:border-[#3B82F6]/50"
                >
                  <h3 className="font-semibold group-hover:text-[#3B82F6]">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <div className="mb-6 flex items-center gap-2">
              <HelpCircle className={`h-5 w-5 ${ACCENT}`} aria-hidden="true" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
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

          {/* Next step CTA */}
          <section className="rounded-2xl border bg-gradient-to-br from-[#3B82F6]/8 via-background to-[#0A2540]/5 p-6 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Your next step</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              If you are thinking about buying your first home in 2026, don&apos;t start only with{' '}
              <em>“How much house can I afford?”</em> Start with:{' '}
              <strong className="font-semibold text-foreground">
                “What mortgage programs and assistance options could I qualify for?”
              </strong>
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Explore numbers with a calculator. Research lenders. Compare multiple offers. Ask about
              down payment assistance. Understand the full cost of the mortgage—not just the down
              payment.
            </p>
            <p className="mt-4 font-medium text-foreground">
              The path to your first home may be closer than you think.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Link href={hubPath('lender', '/calculators')}>Explore mortgage calculators</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={hubPath('lender', '/local-lenders')}>Find lenders near you</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Lender Trust Hub is an independent informational directory with no paid placements or
              affiliations. Always verify licensing through{' '}
              <a
                href="https://www.nmlsconsumeraccess.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                NMLS Consumer Access
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
