import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeCheck,
  Database,
  Scale,
  Shield,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { buildHubMetadata } from '@/lib/hub/metadata';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';
import { AskStandardBanner } from '@/components/network/ask-standard-banner';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
import { hubPath } from '@/lib/hub/paths';
import { JsonLd } from '@/components/lender/directory/JsonLd';
import { LENDER_HUB_URL } from '@/lib/lender/canonical';

export const metadata: Metadata = buildHubMetadata('lender', {
  title: 'Methodology — How Lender Trust Hub Researches Mortgage Lenders',
  description:
    'Lender Trust Hub methodology under The Ask Trust Hub Standard: NMLS context, Trust Scores, CFPB signals, data sources, update practices, and limitations. No paid rankings. Not a lender.',
  path: '/methodology',
});

const PIPELINE = [
  {
    verb: 'SOURCE',
    title: 'Public licensing and risk sources',
    body: 'Primary orientation comes from NMLS Consumer Access and other public financial-consumer sources (e.g. CFPB complaint transparency). Public review platforms may add reputation context when attributed. We do not build rankings from paid advertising lists.',
  },
  {
    verb: 'VERIFY',
    title: 'Licensing context, carefully matched',
    body: 'Profiles surface NMLS-related identifiers and licensing context for research. Company and individual records can diverge; rebrands and multi-entity structures require careful matching. Official NMLS records always win over our summary.',
  },
  {
    verb: 'DISCLOSE',
    title: 'Independence and educational limits',
    body: 'We are not a lender, broker, or loan originator. Calculators are educational estimates. Trust Scores and County Experience Scores are research aids — not credit decisions or approvals.',
  },
  {
    verb: 'SCORE',
    title: 'Trust Score as a scan aid — not for sale',
    body: 'Where shown, Trust Score combines licensing context, reputation signals, and complaint transparency for prioritization. County Experience Score reflects relative market presence signals. Neither can be purchased. Identical scores across an entire market would be a product defect.',
  },
  {
    verb: 'UPDATE',
    title: 'Refresh when sources and workflows allow',
    body: 'Directory and score inputs refresh on editorial and data workflows. Licensing and complaint systems change — re-check NMLS Consumer Access and written Loan Estimates before you apply.',
  },
  {
    verb: 'YOU DECIDE',
    title: 'Compare offers; confirm licenses',
    body: 'Use this hub to shortlist and compare. Confirm company and MLO licenses on NMLS, read the Loan Estimate, and choose based on total cost and fit — not a single directory rank.',
  },
] as const;

const DATA_SOURCES = [
  {
    name: 'NMLS Consumer Access',
    detail:
      'Primary public registry for company and individual mortgage licensing context. Always re-confirm IDs before applying.',
    href: 'https://www.nmlsconsumeraccess.org/',
  },
  {
    name: 'CFPB complaint data',
    detail:
      'Public complaint transparency as a pattern signal — not automatic proof of wrongdoing on any single file.',
    href: 'https://www.consumerfinance.gov/',
  },
  {
    name: 'Attributed public reviews',
    detail:
      'Google Places and similar public ratings/snippets when available. Supplemental reputation only; not paid testimonials.',
  },
  {
    name: 'BBB and other public profiles',
    detail:
      'Where a confirmed public profile exists, accreditation or grade may add context — secondary to licensing.',
  },
] as const;

const LIMITATIONS = [
  'Trust Score is not a credit score, approval odds, or guarantee of rate or service.',
  'County Experience Score is relative orientation, not proof of “best” local execution.',
  'NMLS status can change after we display a snapshot.',
  'Complaint volume is incomplete and can be misread without context.',
  'We do not originate loans, set rates, or sell lead placement in rankings.',
] as const;

export default function LenderMethodologyPage() {
  const canonical = `${LENDER_HUB_URL}/methodology`;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Lender Trust Hub methodology',
          url: canonical,
          description:
            'How Lender Trust Hub researches mortgage lenders under The Ask Trust Hub Standard.',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Lender Trust Hub',
            url: LENDER_HUB_URL,
          },
        }}
      />

      <div className="container mx-auto max-w-3xl px-4 pb-16 pt-6">
        <MethodologyBackNav
          fallbackHref={hubPath('lender', '/')}
          fallbackLabel="Back to Lender Trust Hub"
        />

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
          Vertical methodology · Lending
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#0A2540] sm:text-4xl">
          Lender Trust Hub methodology
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-600">
          How we apply The Ask Trust Hub Standard to mortgage research: NMLS context, scores,
          sources, updates, and hard limits. Independent · no paid rankings · not a lender.
        </p>

        <div className="mt-8">
          <AskStandardBanner verticalLabel="Lender Trust Hub methodology" />
        </div>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <Scale className="h-5 w-5 text-[#3B82F6]" aria-hidden />
            Pipeline on this hub
          </h2>
          <ol className="mt-6 space-y-4">
            {PIPELINE.map((step, i) => (
              <li
                key={step.verb}
                className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#3B82F6]">
                    {step.verb}
                  </p>
                  <h3 className="mt-0.5 font-semibold text-[#0A2540]">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <BadgeCheck className="h-5 w-5 text-emerald-600" aria-hidden />
            Verification checks (lending-specific)
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-zinc-600">
            <li>NMLS company / individual identifiers when available for research display</li>
            <li>Licensing context and jurisdiction cues (always re-confirm on NMLS)</li>
            <li>Public complaint pattern references (e.g. CFPB) as risk orientation</li>
            <li>Attributed reputation signals from public platforms when present</li>
            <li>Local / county mapping for market orientation — not underwriting</li>
          </ul>
        </section>

        <section className="mt-12" id="scores">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <Scale className="h-5 w-5 text-[#3B82F6]" aria-hidden />
            Scores (research aids only)
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5">
              <h3 className="font-semibold text-[#0A2540]">Trust Score</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Composite of licensing context, reputation, and complaint transparency for scanning
                options. Not for sale. Not an endorsement or approval decision.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5">
              <h3 className="font-semibold text-[#0A2540]">County Experience Score</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Relative presence / association signals in a county market. Useful orientation —
                not proof of best execution on your file.
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            Deeper narrative and FAQs also live on{' '}
            <Link
              href={hubPath('lender', '/about')}
              className="font-medium text-[#3B82F6] underline-offset-2 hover:underline"
            >
              How we research lenders
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <Database className="h-5 w-5 text-[#3B82F6]" aria-hidden />
            Data sources
          </h2>
          <ul className="mt-6 space-y-3">
            {DATA_SOURCES.map((src) => (
              <li key={src.name} className="rounded-xl border border-zinc-200 bg-white p-4">
                <h3 className="font-semibold text-[#0A2540]">{src.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600">{src.detail}</p>
                {src.href ? (
                  <a
                    href={src.href}
                    className="mt-2 inline-block text-sm font-medium text-[#3B82F6] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Official source →
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <RefreshCw className="h-5 w-5 text-[#3B82F6]" aria-hidden />
            Update cadence
          </h2>
          <p className="mt-4 leading-relaxed text-zinc-600">
            Lender profiles and composites refresh through data and editorial workflows. Public
            licensing and complaint systems can change faster than any directory. Treat every
            score and badge as a research snapshot — re-verify before you apply.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden />
            Limitations
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-zinc-600">
            {LIMITATIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#0A2540]">
            <Shield className="h-5 w-5" aria-hidden />
            Not a lender
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Lender Trust Hub is an independent research directory. We do not originate loans, set
            rates, or accept payment for ranking position. Always verify licensing on NMLS Consumer
            Access and compare written Loan Estimates.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a
            href={ASK_TRUST_HUB.methodologyUrl}
            className="font-semibold text-[#3B82F6] hover:underline"
            rel="noopener noreferrer"
          >
            Ask Trust Hub Standard
          </a>
          <Link
            href={hubPath('lender', '/about')}
            className="font-medium text-zinc-700 hover:underline"
          >
            How we research (expanded)
          </Link>
          <Link
            href={hubPath('lender', '/local-lenders')}
            className="font-medium text-zinc-700 hover:underline"
          >
            Lender directory
          </Link>
          <Link
            href={hubPath('lender', '/contact')}
            className="font-medium text-zinc-700 hover:underline"
          >
            Contact / corrections
          </Link>
        </div>
      </div>
    </>
  );
}
