import type { Metadata } from 'next';
import Link from 'next/link';
import { BadgeCheck, Database, Scale, Shield } from 'lucide-react';
import { buildMetadata } from '@/lib/insurance/seo/metadata';
import { DISCLAIMER, SITE_NAME } from '@/lib/insurance/constants';
import { Card, CardContent } from '@/components/insurance/ui/card';
import { MethodologyBackNav } from '@/components/trust/methodology-back-nav';

export const metadata: Metadata = buildMetadata({
  title: 'About InsuranceTrustHub — Independence & Verification',
  description:
    'How InsuranceTrustHub researches agencies, verifies DOI/NAIC licenses, and maintains editorial independence — no paid placements or pay-to-rank.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14 max-w-3xl">
      <div className="mb-6">
        <MethodologyBackNav
          fallbackHref="/"
          fallbackLabel="Back to InsuranceTrustHub"
        />
      </div>
      <h1 className="section-heading">About {SITE_NAME}</h1>
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        {SITE_NAME} is an independent informational directory for researching licensed insurance
        agents and agencies. We do not sell insurance policies, accept paid placements, or rank
        listings based on fees or commissions.
      </p>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
        Full vertical methodology (sources, verification, limits) lives on{' '}
        <Link href="/methodology" className="font-semibold text-primary underline-offset-2 hover:underline">
          /methodology
        </Link>
        , under{' '}
        <a
          href="https://www.asktrusthub.com/methodology"
          className="font-semibold text-primary underline-offset-2 hover:underline"
          rel="noopener noreferrer"
        >
          The Ask Trust Hub Standard
        </a>
        .
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          Independence statement
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          We are not affiliated with, endorsed by, or a partner of the insurance agencies, brokers,
          or carriers listed on this site. Company names, logos, and descriptive data are used for
          identification and research purposes only. Listing presence does not constitute a
          recommendation or guarantee of service quality.
        </p>
        <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
          <li>
            <strong className="text-foreground">No paid placements</strong> — agents cannot pay to
            appear higher in directory results.
          </li>
          <li>
            <strong className="text-foreground">No pay-to-rank</strong> — ranking and featured
            modules are not sold.
          </li>
          <li>
            <strong className="text-foreground">No lead-sale marketplace</strong> — we are not a
            paid lead-matching service.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-trust" />
          How agents are verified
        </h2>
        <div className="mt-6 grid gap-4">
          {[
            {
              step: '1',
              title: 'State DOI license cross-check',
              text: 'We match agent and agency license numbers against state Department of Insurance public records where available, and surface Active status and lines of authority when disclosed.',
            },
            {
              step: '2',
              title: 'NAIC / NPN references',
              text: 'Where National Producer Numbers or NAIC references are available, we use them as additional identity anchors for research — consumers should still confirm on official regulator sites.',
            },
            {
              step: '3',
              title: 'Business identity review',
              text: 'Listings include publicly available contact information, carrier appointments, and years in business when disclosed.',
            },
            {
              step: '4',
              title: 'Review moderation',
              text: 'User-submitted reviews are screened for spam, profanity, and obvious conflicts of interest before publication.',
            },
            {
              step: '5',
              title: 'Ongoing corrections',
              text: 'Agencies and consumers can report outdated data via our contact form. Corrections are processed within 5–10 business days.',
            },
          ].map((item) => (
            <Card key={item.step}>
              <CardContent className="pt-5 flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Editorial standards
        </h2>
        <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
          <li>Guides explain consumer choices; they do not recommend specific carriers or agents.</li>
          <li>Calculators are educational estimates — not binding quotes or underwriting decisions.</li>
          <li>We label methodology limits and always point readers to official DOI / NAIC sources.</li>
          <li>Corrections and takedown requests are handled through the contact form.</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Data sources
        </h2>
        <ul className="mt-4 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
          <li>State insurance department (DOI) public license databases</li>
          <li>NAIC and related public producer / regulatory references</li>
          <li>Agency-submitted profile information and voluntary updates</li>
          <li>Moderated consumer reviews submitted through our website</li>
          <li>Industry reference data for educational premium range estimates</li>
        </ul>
      </section>

      <section id="disclaimer" className="mt-12 rounded-xl border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Disclaimer
        </h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{DISCLAIMER}</p>
      </section>
    </div>
  );
}