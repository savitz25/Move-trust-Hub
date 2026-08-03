import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BadgeCheck,
  Database,
  RefreshCw,
  Scale,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { buildMetadata } from '@/lib/insurance/seo/metadata';
import { DISCLAIMER, SITE_NAME } from '@/lib/insurance/constants';
import { Card, CardContent } from '@/components/insurance/ui/card';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';
import { AskStandardBanner } from '@/components/network/ask-standard-banner';
import { ASK_TRUST_HUB } from '@/lib/network/ask-trust-hub';

export const metadata: Metadata = buildMetadata({
  title: 'Methodology — How Insurance Trust Hub Verifies Agencies',
  description:
    'Insurance Trust Hub methodology under The Ask Trust Hub Standard: state DOI / NAIC pathways, verification checks, educational tools, update cadence, and limitations. Rankings not for sale.',
  path: '/methodology',
});

const PIPELINE = [
  {
    verb: 'SOURCE',
    title: 'Authoritative insurance sources',
    body: 'We prioritize state Department of Insurance (DOI) public license records, NAIC producer pathways, and other attributable public references. Educational premium ranges are labeled as estimates — never as binding quotes or regulatory status.',
  },
  {
    verb: 'VERIFY',
    title: 'What “verified” means here',
    body: 'Where available, we match agent/agency names and license numbers to public DOI records and surface Active status and lines of authority when disclosed. NAIC / NPN identifiers can anchor multi-state identity. Matching can fail or lag; we do not invent Active status.',
  },
  {
    verb: 'DISCLOSE',
    title: 'Limits and independence',
    body: 'We are not an insurance agency or carrier. We do not sell policies or paid placements. Calculators are educational. Always re-check licenses on the official state DOI site before purchasing coverage.',
  },
  {
    verb: 'SCORE',
    title: 'No pay-to-rank composites',
    body: 'Directory ordering is not sold. Where we surface research signals (ratings, complaints, or editorial indexes), they are research aids — not underwriting decisions or carrier recommendations.',
  },
  {
    verb: 'UPDATE',
    title: 'Cadence and corrections',
    body: 'License data and profiles can change. Agency- and consumer-reported corrections are reviewed through our contact process. Public records may still lag reality after we publish a fix.',
  },
  {
    verb: 'YOU DECIDE',
    title: 'Confirm with regulators and agents',
    body: 'Use this hub to research. Confirm producer licenses, appointment status, and policy terms with the state DOI and the licensed professional before you bind coverage.',
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
      'Coordinating references for multi-state producer identity — always secondary to the state’s own record.',
  },
  {
    name: 'Agency-submitted profile updates',
    detail:
      'Voluntary profile information that we still treat as claim until cross-checked against public sources when possible.',
  },
  {
    name: 'Moderated consumer reviews',
    detail:
      'User-submitted reviews screened for spam and obvious conflicts. Attributed to this platform; not purchased testimonials.',
  },
  {
    name: 'Educational reference ranges',
    detail:
      'Premium and subsidy tools use public program rules and labeled assumptions. Outputs are not quotes or eligibility determinations.',
  },
] as const;

const LIMITATIONS = [
  'State portals differ in completeness, update frequency, and public field availability.',
  'A listing is not a recommendation, endorsement, or guarantee of claims service.',
  'Medicare, ACA, and other tools are educational — program rules change and personal eligibility varies.',
  'We do not underwrite, sell policies, or place coverage.',
  'Modeled cost estimates must never be treated as carrier-bound rates.',
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
        How {SITE_NAME} applies The Ask Trust Hub Standard to state-licensed insurance research —
        sources, verification, disclosure, scores (when used), updates, and your decision.
      </p>

      <div className="mt-8">
        <AskStandardBanner verticalLabel="Insurance Trust Hub methodology" />
      </div>

      <section className="mt-12">
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

      <section className="mt-12">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <BadgeCheck className="h-5 w-5 text-trust" aria-hidden />
          Verification checks (insurance-specific)
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground leading-relaxed">
          <li>State DOI license number and Active / inactive status when the portal exposes it</li>
          <li>Legal or DBA name matching against public records where possible</li>
          <li>Lines of authority / license types when disclosed</li>
          <li>NPN / NAIC references as secondary identity anchors</li>
          <li>Business contact and location fields from public or agency-provided data</li>
        </ul>
      </section>

      <section className="mt-12">
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

      <section className="mt-12">
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
          Disclaimer
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/about" className="font-semibold text-primary underline-offset-2 hover:underline">
          About & independence
        </Link>
        <a
          href={ASK_TRUST_HUB.methodologyUrl}
          className="font-semibold text-primary underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          Ask Trust Hub Standard
        </a>
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
