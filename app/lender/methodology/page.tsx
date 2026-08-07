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
import { NETWORK_VOCAB } from '@/lib/network/vocabulary';
import { hubPath } from '@/lib/hub/paths';
import { JsonLd } from '@/components/lender/directory/JsonLd';
import { LENDER_HUB_URL } from '@/lib/lender/canonical';
import { TRUST_STATS } from '@/lib/lender/mockData';

export const metadata: Metadata = buildHubMetadata('lender', {
  title: 'Methodology — How Lender Trust Hub Researches Mortgage Lenders',
  description:
    'Lender Trust Hub methodology under The Ask Trust Hub Standard: NMLS context, Trust Score inputs and limits, CFPB signals, close-time honesty, coverage scope. No paid rankings. Not a lender.',
  path: '/methodology',
});

const PIPELINE = [
  {
    verb: 'SOURCE',
    title: 'Public licensing and risk sources',
    body: 'Primary orientation is NMLS Consumer Access. Where used, CFPB complaint transparency, state licensing context, and FDIC bank directories (separate vertical) provide additional public signals. Public review platforms may add reputation context when attributed. We do not build rankings from paid advertising lists.',
  },
  {
    verb: 'VERIFY',
    title: 'What is verified vs third-party volume',
    body: '“Verified” here means we surface NMLS-related company/individual identifiers and licensing context for research when available. Review counts and star ratings from Google or similar platforms are third-party volume signals — labeled as such, not as NMLS fields. Official NMLS records always win over our summary.',
  },
  {
    verb: 'DISCLOSE',
    title: 'Independence and educational limits',
    body: 'We are not a lender, broker, or loan originator. Calculators are educational estimates. Trust Scores and County Experience Scores are research aids — not credit decisions, rate quotes, or approvals.',
  },
  {
    verb: 'SCORE',
    title: 'Trust Score inputs — honest caps and limits',
    body: 'See the scoring section below for explicit inputs, base/boost logic, and known discrimination limits. Scores are not for sale. Clustered high scores without real signal differences are treated as a product problem, not a marketing feature.',
  },
  {
    verb: 'UPDATE',
    title: 'Refresh when sources and workflows allow',
    body: 'Directory and enrichment overlays refresh through data and editorial workflows. Licensing and complaint systems change — re-check NMLS Consumer Access and written Loan Estimates before you apply.',
  },
  {
    verb: 'YOU DECIDE',
    title: 'Compare offers; confirm licenses',
    body: 'Use this hub to shortlist and compare. Confirm company and MLO licenses on NMLS and state regulators, read the Loan Estimate, and choose based on total cost and fit — not a single directory rank.',
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
      'Public complaint transparency as a pattern signal where incorporated — not automatic proof of wrongdoing on any single file, and not an NMLS license field.',
    href: 'https://www.consumerfinance.gov/',
  },
  {
    name: 'State licensing context',
    detail:
      'State-level mortgage company / MLO requirements vary. Our summaries do not replace state regulator confirmation.',
  },
  {
    name: 'FDIC (bank directory vertical)',
    detail:
      'FDIC-insured bank pages use federal deposit-insurance public data for that product line — separate from mortgage Trust Score composites.',
    href: 'https://www.fdic.gov/',
  },
  {
    name: 'Attributed public reviews',
    detail:
      'Google Places and similar ratings/snippets when available. Supplemental reputation only; not paid testimonials and not regulatory status.',
  },
  {
    name: 'BBB profiles (when listed)',
    detail:
      'Accreditation or letter grade only when a confirmed public profile exists. Absence of BBB is not shown as a fake grade.',
  },
] as const;

const LIMITATIONS = [
  'Trust Score is not a credit score, approval odds, APR quote, or guarantee of service.',
  'County Experience Score is relative market orientation — not proof of best local execution.',
  'NMLS status can change after we display a snapshot.',
  'Complaint volume is incomplete and easy to misread without context.',
  'Closing-performance metrics (avg close days, on-time close %) are not shown unless backed by a documented observed dataset — seed/editorial estimates are suppressed.',
  'Directory coverage is expanding; we do not claim complete coverage of every U.S. county.',
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
          How we apply The {NETWORK_VOCAB.standardName} to mortgage research: NMLS context, scores,
          sources, updates, and hard limits. {NETWORK_VOCAB.independentlyOperated}.{' '}
          {NETWORK_VOCAB.noPaidPlacements}. Not a lender.
        </p>

        <nav
          aria-label="Methodology sections"
          className="mt-5 flex flex-wrap gap-2 text-xs font-medium"
        >
          {[
            { href: '#pipeline', label: 'Pipeline' },
            { href: '#scores', label: 'Scoring' },
            { href: '#metrics', label: 'Close metrics' },
            { href: '#coverage', label: 'Coverage' },
            { href: '#sources', label: 'Sources' },
            { href: '#limitations', label: 'Limitations' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 hover:border-[#3B82F6]/40 hover:text-[#3B82F6]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-8">
          <AskStandardBanner verticalLabel="Lender Trust Hub methodology" />
        </div>

        <section id="pipeline" className="mt-12 scroll-mt-24">
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
            <li>Public complaint pattern references (e.g. CFPB) as risk orientation when used</li>
            <li>Attributed reputation signals from public platforms when present</li>
            <li>Local / county mapping for market orientation — not underwriting</li>
          </ul>
        </section>

        <section className="mt-12 scroll-mt-24" id="scores">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <Scale className="h-5 w-5 text-[#3B82F6]" aria-hidden />
            Scoring honesty
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Scores help you scan a crowded market. They are research aids under the SCORE step of the
            Standard — not guarantees and not for sale.
          </p>

          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold text-[#0A2540]">Trust Score (0–100) — category inputs</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              When live enrichment is available, the composite starts from a base and applies
              bounded boosts/penalties. Approximate categories (capped at 0–100 after rounding):
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-600">
              <li>
                <strong className="text-[#0A2540]">Base:</strong> 70 before public-signal adjustments
              </li>
              <li>
                <strong className="text-[#0A2540]">Google rating:</strong> adjustment from rating
                relative to a mid-scale baseline (when a rating exists)
              </li>
              <li>
                <strong className="text-[#0A2540]">Review volume:</strong> small positive steps above
                volume thresholds (e.g. 100+ / 500+)
              </li>
              <li>
                <strong className="text-[#0A2540]">BBB grade / accreditation:</strong> modest boost
                only when a confirmed public profile exists
              </li>
              <li>
                <strong className="text-[#0A2540]">CFPB complaint count:</strong> small positive when
                very low; penalty when high (pattern signal only)
              </li>
              <li>
                <strong className="text-[#0A2540]">NMLS context:</strong> licensing identifiers and
                verified flags support listing confidence; they do not alone manufacture a top score
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              Without enrichment, seed/editorial scores on static profiles may still appear — treat
              them as less current than enriched composites.
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/50 p-5">
            <h3 className="font-semibold text-[#0A2540]">
              Near-identical high scores (e.g. many 96–98s)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              If a market shows a tight band of high scores, that usually means public signals are
              incomplete, similar, or not yet discriminating enough —{' '}
              <strong className="font-semibold">not</strong> that every lender is equally “best.”
              Under The Ask Trust Hub Standard, a high cluster of identical scores is a product
              limitation. Prefer: compare Loan Estimates, re-check NMLS IDs, read complaint patterns,
              and talk to multiple lenders. Do not treat a one-point score gap as a decision.
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5">
              <h3 className="font-semibold text-[#0A2540]">County Experience Score</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Relative presence signals: primary county assignment, ZIP coverage in that county,
                local Google address match, and tenure cues when available. Useful orientation — not
                proof of service quality on your file.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5">
              <h3 className="font-semibold text-[#0A2540]">Not in any score</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                <li>Paid placement or lead fees</li>
                <li>Advertised rates or APR</li>
                <li>Private underwriting outcomes</li>
                <li>Invented BBB/Google when no profile exists</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            Expanded narrative also lives on{' '}
            <Link
              href={hubPath('lender', '/about')}
              className="font-medium text-[#3B82F6] underline-offset-2 hover:underline"
            >
              How we research lenders
            </Link>
            .
          </p>
        </section>

        <section id="metrics" className="mt-12 scroll-mt-24">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-[#0A2540]">
            <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden />
            Avg close / similar metrics
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Fields such as <strong className="text-[#0A2540]">average close days</strong> or{' '}
            <strong className="text-[#0A2540]">on-time close rate</strong> are{' '}
            <strong className="text-[#0A2540]">not displayed</strong> unless we have a defensible
            observed dataset with source, sample size, observation window, and methodology note. Seed
            or editorial estimates are suppressed (Phase 0). They are never official NMLS or CFPB
            performance statistics. Always ask the lender for current timelines in writing.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            <strong className="text-[#0A2540]">NMLS ID verified</strong> requires a numeric NMLS ID
            plus a directory verification flag — placeholder tokens (SEE-NMLS, TBD, N/A) never unlock
            a hard verified badge. Company identity and trust scores are keyed by NMLS entity, not by
            geo-variant listing rows.
          </p>
        </section>

        <section id="coverage" className="mt-12 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-[#0A2540]">Coverage claims</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Lender Trust Hub coverage is <strong className="text-[#0A2540]">expanding by state and
            county</strong> ({TRUST_STATS.countiesCoveredLabel.toLowerCase()}). We do not claim a
            complete directory of every U.S. county or every licensed originator. Absence from our
            directory is not a regulatory finding.
          </p>
        </section>

        <section id="sources" className="mt-12 scroll-mt-24">
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
            Lender profiles and enrichment overlays refresh through data and editorial workflows.
            Public licensing and complaint systems can change faster than any directory. Treat every
            score and badge as a research snapshot — re-verify before you apply.
          </p>
        </section>

        <section id="limitations" className="mt-12 scroll-mt-24">
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
            Your action · {NETWORK_VOCAB.verifyPrimaryRegulator}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Confirm company and individual licenses on{' '}
            <a
              href="https://www.nmlsconsumeraccess.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#3B82F6] underline-offset-2 hover:underline"
            >
              NMLS Consumer Access
            </a>{' '}
            and any applicable state regulator. Compare multiple written Loan Estimates. Lender Trust
            Hub does not originate loans, set rates, or accept payment for ranking position.
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a
            href={ASK_TRUST_HUB.methodologyUrl}
            className="font-semibold text-[#3B82F6] hover:underline"
            rel="noopener noreferrer"
          >
            {NETWORK_VOCAB.standardName}
          </a>
          <a
            href={ASK_TRUST_HUB.promiseUrl}
            className="font-medium text-zinc-700 hover:underline"
            rel="noopener noreferrer"
          >
            Independence
          </a>
          <a
            href={ASK_TRUST_HUB.revenueUrl}
            className="font-medium text-zinc-700 hover:underline"
            rel="noopener noreferrer"
          >
            How we make money
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
