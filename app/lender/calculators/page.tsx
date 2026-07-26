import type { Metadata } from 'next';
import Link from 'next/link';
import { CalculatorHubLoader } from '@/components/lender/calculator-hub-loader';
import { JsonLd } from '@/components/lender/directory/JsonLd';
import { TrustBar } from '@/components/lender/TrustBar';
import { calculatorsPageSchema } from '@/lib/lender/seo/calculators';
import { CALC_DISCLAIMER } from '@/lib/lender/calculators/registry';
import { Breadcrumbs } from '@/components/lender/directory/Breadcrumbs';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Mortgage Calculators That Help You Make Better Decisions | Lender Trust Hub',
  description:
    'Free mortgage calculators with live PITI payment, affordability, refinance break-even, amortization, rent vs buy & more. No account required. Match to NMLS-verified lenders — zero paid placements.',
  alternates: { canonical: 'https://www.movetrusthub.com/lender/calculators' },
  openGraph: {
    title: 'Mortgage Calculators That Help You Make Better Decisions',
    description:
      'Working tools first: live payment estimate above the fold, journey-based calculators, and independent lender research.',
    url: 'https://www.movetrusthub.com/lender/calculators',
    type: 'website',
  },
  keywords: [
    'mortgage payment calculator',
    'PITI calculator',
    'home affordability calculator',
    'refinance break-even',
    'free mortgage calculators',
    'NMLS verified lenders',
  ],
};

const FAQ = [
  {
    q: 'Are these calculators free?',
    a: 'Yes — all tools are free, require no account, and update in real time as you adjust inputs.',
  },
  {
    q: 'How accurate are the estimates?',
    a: CALC_DISCLAIMER,
  },
  {
    q: 'What is PITI?',
    a: 'PITI means Principal, Interest, Taxes, and Insurance — the full monthly housing payment most lenders underwrite. Our flagship calculator also includes PMI (when LTV is above 80%) and optional HOA so you see a more complete number than principal & interest alone.',
  },
  {
    q: 'What does Match Me to Lenders do?',
    a: 'It filters our independent, NMLS-verified directory using your calculated loan profile — loan type, estimated amount, and payment. We never accept paid placements or sell your information for ranking.',
  },
  {
    q: 'Do you sell my data or charge lenders for placement?',
    a: 'No. Lender Trust Hub does not accept payment for placement or ranking. Calculator results are educational estimates; directory listings are independent.',
  },
  {
    q: 'Which calculator should I use first?',
    a: 'Start with the live Mortgage Payment (PITI) tool at the top of this page. If you are budgeting, open Affordability and DTI next. If you already have a loan, use Refinance Savings or the Payoff Planner.',
  },
];

const LEARNING = [
  {
    title: 'PITI vs principal & interest',
    body: 'Principal & interest is only part of what you pay each month. Property taxes, homeowners insurance, PMI, and HOA often add hundreds of dollars. Underwriters care about the full housing payment.',
  },
  {
    title: 'When PMI usually applies',
    body: 'Conventional loans often require private mortgage insurance when you put down less than 20% (LTV above 80%). PMI is an estimate until a lender quotes your program and credit profile.',
  },
  {
    title: 'Affordability rules of thumb',
    body: 'Front-end DTI (housing / income) and back-end DTI (all debts / income) are common screens. Guidelines vary by loan type — use the DTI Analyzer and Affordability tools, then confirm with a licensed professional.',
  },
  {
    title: 'Refinance break-even',
    body: 'Closing costs on a refinance can wipe out monthly savings if you sell or refinance again soon. The Refinance Savings tool estimates months to break even after costs.',
  },
  {
    title: 'Assumptions we use',
    body: 'Default tax rates are simplified state averages you can override. Insurance and HOA are editable. Rates are illustrative — shop real quotes. Always treat outputs as educational, not offers.',
  },
  {
    title: 'From numbers to lenders',
    body: 'When you know a rough loan size and payment, explore NMLS-verified lenders by county. We do not sell placement — you research profiles on your terms.',
  },
];

export default function CalculatorsPage() {
  return (
    <>
      <JsonLd data={calculatorsPageSchema()} />

      <div className="container mx-auto px-4 pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/lender' },
            { label: 'Calculators' },
          ]}
        />
      </div>

      {/* Hero — decision framing; live tool mounts immediately below via CalculatorHub */}
      <section className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <div className="mx-auto max-w-3xl text-center md:mx-0 md:max-w-2xl md:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#2563EB]">
              Working tools first · Marketing second
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#111827] md:text-5xl">
              Mortgage Calculators That Help You Make Better Decisions
            </h1>
            <p className="mt-4 text-lg text-[#6B7280]">
              Free tools. No account. Independent estimates you can adjust in seconds — then research
              NMLS-verified lenders with{' '}
              <strong className="font-semibold text-[#111827]">zero paid placements</strong>.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="#flagship-calc"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-bold text-white hover:bg-[#2563EB]"
              >
                Calculate payment now
              </a>
              <a
                href="#intent-heading"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 py-3 text-sm font-semibold text-[#111827] shadow-sm hover:border-[#93C5FD]"
              >
                Choose your goal
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b border-[#E5E7EB] bg-white py-2.5 text-center text-xs text-[#6B7280]">
        <strong className="text-[#111827]">Free</strong>
        {' · '}No sign-up{' · '}Educational estimates{' · '}NMLS-verified directory matching
        {' · '}
        <span className="font-medium text-[#047857]">We do not sell your information</span>
      </div>

      {/* Interactive hub on soft off-white canvas */}
      <div className="bg-[#F8F9FA]">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <CalculatorHubLoader />
        </div>
      </div>

      {/* Educational layer */}
      <section
        className="border-t border-[#E5E7EB] bg-white py-14"
        aria-labelledby="learning-heading"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 id="learning-heading" className="text-2xl font-bold text-[#111827] md:text-3xl">
              Understand the numbers
            </h2>
            <p className="mt-2 text-[#6B7280]">
              Short explainers so the tools stay useful — not a wall of generic content.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNING.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 shadow-sm"
              >
                <h3 className="font-bold text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / transparency */}
      <section
        className="border-t border-[#E5E7EB] bg-[#F8F9FA] py-10"
        aria-labelledby="trust-heading"
      >
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 id="trust-heading" className="text-xl font-bold text-[#111827]">
            Trust &amp; transparency
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[#6B7280]">
            Calculation assumptions (taxes, insurance, PMI formulas) are simplified and editable in
            each tool. Directory matching uses public licensing and independent trust signals — not
            paid ranking. For deposit accounts and banking, see our{' '}
            <Link
              href="/lender/fdic-insured-banks"
              className="font-medium text-[#2563EB] hover:underline"
            >
              FDIC-insured banks
            </Link>{' '}
            directory.
          </p>
        </div>
        <div className="mt-8">
          <TrustBar />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-14" aria-labelledby="how-calc-works">
        <div className="container mx-auto px-4">
          <h2
            id="how-calc-works"
            className="mb-8 text-center text-2xl font-bold text-[#111827]"
          >
            How calculators connect to verified lenders
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Get a useful estimate',
                desc: 'Start with live PITI above the fold — or pick a journey for affordability, refinance, or comparison tools.',
              },
              {
                step: '02',
                title: 'See your numbers clearly',
                desc: 'Large payment totals, breakdowns, and a browser-saved session snapshot keep context while you explore other tools.',
              },
              {
                step: '03',
                title: 'Research independent lenders',
                desc: 'Match Me and county search filter NMLS-verified listings. No paid placements. No lead fees for ranking.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 shadow-sm"
              >
                <span className="text-2xl font-bold text-[#BFDBFE]">{item.step}</span>
                <h3 className="mt-2 text-lg font-bold text-[#111827]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#6B7280]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="border-t border-[#E5E7EB] bg-[#F8F9FA] py-14"
        aria-labelledby="calc-faq"
      >
        <div className="container mx-auto max-w-3xl px-4">
          <h2 id="calc-faq" className="mb-8 text-center text-2xl font-bold text-[#111827]">
            Calculator FAQ
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm"
              >
                <summary className="cursor-pointer font-semibold text-[#111827]">{f.q}</summary>
                <p className="mt-2 text-sm text-[#6B7280]">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#6B7280]">
            Explore county lenders:{' '}
            <Link
              href="/lender/local-lenders/florida"
              className="font-medium text-[#2563EB] hover:underline"
            >
              Florida
            </Link>
            {' · '}
            <Link
              href="/lender/local-lenders/texas"
              className="font-medium text-[#2563EB] hover:underline"
            >
              Texas
            </Link>
            {' · '}
            <Link
              href="/lender/local-lenders/california"
              className="font-medium text-[#2563EB] hover:underline"
            >
              California
            </Link>
            {' · '}
            <Link
              href="/lender/local-lenders"
              className="font-medium text-[#2563EB] hover:underline"
            >
              All states
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
