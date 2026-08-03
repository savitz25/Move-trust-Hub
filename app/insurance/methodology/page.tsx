import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeCheck,
  Database,
  RefreshCw,
  Scale,
  Shield,
  AlertTriangle,
  Calculator,
} from 'lucide-react';
import { buildMetadata } from '@/lib/insurance/seo/metadata';
import { DISCLAIMER, SITE_NAME } from '@/lib/insurance/constants';
import { Card, CardContent } from '@/components/insurance/ui/card';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';
import { AskStandardBanner } from '@/components/network/ask-standard-banner';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';
import { NETWORK_VOCAB } from '@/lib/network/vocabulary';

export const metadata: Metadata = buildMetadata({
  title: 'Methodology — How Insurance Trust Hub Verifies Agencies',
  description:
    'Insurance Trust Hub methodology under The Ask Trust Hub Standard: state DOI / NAIC pathways, what verified means, tools vs directory, update cadence, and limitations. Research only — not quotes or enrollment.',
  path: '/methodology',
});

const PIPELINE = [
  {
    verb: 'SOURCE',
    title: 'Authoritative insurance sources',
    body: 'We prioritize state Department of Insurance (DOI) public license records and NAIC producer pathways where used. Public complaint or regulatory-action references appear only when we actually source them. Educational premium ranges are labeled as estimates — never as binding quotes or regulatory status.',
  },
  {
    verb: 'VERIFY',
    title: 'What “verified” means for agents & agencies',
    body: 'Where available, we match agent/agency names and license numbers to public DOI records and surface Active status and lines of authority when disclosed. NAIC / NPN identifiers can anchor multi-state identity. Matching can fail or lag; we do not invent Active status, carrier appointments, or authority we did not check.',
  },
  {
    verb: 'DISCLOSE',
    title: 'Limits and independence',
    body: 'We are not an insurance agency or carrier. We do not sell policies, issue free quotes as a brokerage, or accept paid placements. Calculators and guides are educational. Always re-check licenses on the official state DOI site before purchasing coverage.',
  },
  {
    verb: 'SCORE',
    title: 'No decorative universal rankings',
    body: 'Directory ordering is not sold. We do not assign decorative “99 trust” scores without published inputs. Where we surface research signals (ratings, complaint indexes, or editorial tools), they are research aids — not underwriting decisions or carrier recommendations.',
  },
  {
    verb: 'UPDATE',
    title: 'Cadence and corrections',
    body: 'License data and profiles can change. Agency- and consumer-reported corrections are reviewed through our contact process. Public records may still lag reality after we publish a fix.',
  },
  {
    verb: 'YOU DECIDE',
    title: 'Confirm with regulators and licensed professionals',
    body: 'Use this hub to research. Confirm producer licenses, appointment status, and policy terms with the state DOI / NAIC pathways and the licensed professional before you bind coverage.',
  },
] as const;

const DATA_SOURCES = [
  {
    name: 'State DOI public license databases',
    detail:
      'Primary source for producer and agency license status, lines of authority, and jurisdiction when publicly available.',
  },
  {
    name: 'NAIC / NPN pathways',
    detail:
      'Coordinating references for multi-state producer identity where used — always secondary to the state’s own record.',
  },
  {
    name: 'Public complaint / regulatory actions',
    detail:
      'Only when we actually incorporate an attributable public source for a tool or page (e.g. CMS complaint index for Medicare plan research). Not invented disciplinary flags.',
  },
  {
    name: 'Agency-submitted profile updates',
    detail:
      'Voluntary profile information treated as a claim until cross-checked against public sources when possible.',
  },
  {
    name: 'Moderated consumer reviews',
    detail:
      'User-submitted reviews screened for spam and obvious conflicts. Attributed to this platform; not purchased testimonials.',
  },
  {
    name: 'Educational reference ranges',
    detail:
      'Premium, subsidy, and needs tools use public program rules and labeled assumptions. Outputs are not quotes, eligibility determinations, or enrollment.',
  },
] as const;

const LIMITATIONS = [
  'State portals differ in completeness, update frequency, and public field availability.',
  'A listing is not a recommendation, endorsement, or guarantee of claims service.',
  'We do not underwrite, sell policies, bind coverage, or place carrier appointments for you.',
  'Medicare, ACA, and other tools are educational — program rules change and personal eligibility varies.',
  'Modeled cost estimates must never be treated as carrier-bound rates.',
  'We do not offer “free insurance quotes” as a lead marketplace; research and verification only.',
] as const;

export default function InsuranceMethodologyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-10 md:py-14">
      <div className="mb-6">
        <MethodologyBackNav fallbackHref="/" fallbackLabel={`Back to ${SITE_NAME}`} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        Vertical methodology · Insurance
      </p>
      <h1 className="section-heading mt-3">Insurance Trust Hub methodology</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        How {SITE_NAME} applies The {NETWORK_VOCAB.standardName} to state-licensed insurance research —
        sources, verification, tools vs directory, cadence, and limits.{' '}
        {NETWORK_VOCAB.independentlyOperated}. {NETWORK_VOCAB.noPaidPlacements}.
      </p>

      <nav
        aria-label="Methodology sections"
        className="mt-5 flex flex-wrap gap-2 text-xs font-medium"
      >
        {[
          { href: '#pipeline', label: 'Pipeline' },
          { href: '#verified', label: 'What verified means' },
          { href: '#tools', label: 'Tools vs directory' },
          { href: '#sources', label: 'Sources' },
          { href: '#limitations', label: 'Limitations' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full border bg-background px-3 py-1.5 hover:border-primary/40 hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-8">
        <AskStandardBanner verticalLabel="Insurance Trust Hub methodology" />
      </div>

      <section id="pipeline" className="mt-12 scroll-mt-24">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Scale className="h-5 w-5 text-primary" aria-hidden />
          Pipeline on this hub
        </h2>
        <ol className="mt-6 space-y-4">
          {PIPELINE.map((step, i) => (
            <li key={step.verb}>
              <Card>
                <CardContent className="flex gap-4 pt-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                      {step.verb}
                    </p>
                    <h3 className="mt-0.5 font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      <section id="verified" className="mt-12 scroll-mt-24">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <BadgeCheck className="h-5 w-5 text-trust" aria-hidden />
          What “verified” means here
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed">
          <li>State DOI license number and Active / inactive status when the portal exposes it</li>
          <li>Legal or DBA name matching against public records where possible</li>
          <li>Lines of authority / license types when disclosed</li>
          <li>NPN / NAIC references as secondary identity anchors</li>
          <li>Business contact and location fields from public or agency-provided data</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          “Verified” does <strong className="text-foreground">not</strong> mean we sell the policy,
          confirm carrier appointments in real time for every listing, or guarantee claims outcomes.
        </p>
      </section>

      <section id="tools" className="mt-12 scroll-mt-24">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Calculator className="h-5 w-5 text-primary" aria-hidden />
          Tools vs directory
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
              <h3 className="font-semibold text-foreground">Directory</h3>
              <p className="mt-2">
                Research licensed agents and agencies. Ordering is not sold. Identity and license
                context come from public sources where available.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5 text-sm leading-relaxed text-muted-foreground">
              <h3 className="font-semibold text-foreground">Calculators &amp; guides</h3>
              <p className="mt-2">
                Educational estimates and explainers (ACA, Medicare, cost tools, etc.). Not plan
                enrollment, not binding quotes, and not underwriting decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="sources" className="mt-12 scroll-mt-24">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <Database className="h-5 w-5 text-primary" aria-hidden />
          Data sources
        </h2>
        <ul className="mt-6 space-y-4">
          {DATA_SOURCES.map((src) => (
            <li key={src.name} className="rounded-lg border bg-card px-4 py-3">
              <h3 className="font-semibold text-foreground">{src.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{src.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <RefreshCw className="h-5 w-5 text-primary" aria-hidden />
          Update cadence
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Profile and directory data refresh as source systems and editorial workflows allow.
          Corrections reported by agencies or consumers are reviewed through our contact channel
          (typically within several business days). Always re-verify on the official DOI portal
          before purchasing a policy.
        </p>
      </section>

      <section id="limitations" className="mt-12 scroll-mt-24">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <AlertTriangle className="h-5 w-5 text-amber-600" aria-hidden />
          Limitations
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed">
          {LIMITATIONS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="disclaimer" className="mt-12 rounded-xl border bg-muted/30 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Shield className="h-5 w-5" aria-hidden />
          Your action · {NETWORK_VOCAB.verifyPrimaryRegulator}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Confirm licenses with the state Department of Insurance and NAIC pathways before you buy
          coverage. This site does not enroll you in plans or issue carrier quotes.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <a
          href={ASK_TRUST_HUB.methodologyUrl}
          className="font-semibold text-primary underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          {NETWORK_VOCAB.standardName}
        </a>
        <a
          href={ASK_TRUST_HUB.promiseUrl}
          className="font-medium text-muted-foreground underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          Independence
        </a>
        <a
          href={ASK_TRUST_HUB.revenueUrl}
          className="font-medium text-muted-foreground underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          How we make money
        </a>
        <Link href="/about" className="font-medium text-muted-foreground underline-offset-2 hover:underline">
          About
        </Link>
        <Link href="/directory" className="font-medium text-muted-foreground underline-offset-2 hover:underline">
          Agency directory
        </Link>
        <Link href="/contact" className="font-medium text-muted-foreground underline-offset-2 hover:underline">
          Report a correction
        </Link>
      </div>
    </div>
  );
}
