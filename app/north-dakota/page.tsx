import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/site-metadata';

const NDDOT_FORM = 'https://www.dot.nd.gov/forms/sfn10539.pdf';
const NDDOT_FORMS = 'https://www.dot.nd.gov/dot/view/forms.aspx';
const NDDOT_MANUAL = 'https://www.dot.nd.gov/sites/www/files/documents/Drivers%20-%20documents/Motor%20Vehicles/registration-manual.pdf';
const FMCSA = 'https://safer.fmcsa.dot.gov/';

export const metadata: Metadata = {
  title: 'North Dakota household-goods carrier permits | MoveTrustHub',
  description: 'North Dakota NDDOT household-goods carrier permit framework and source limits, kept separate from federal FMCSA authority.',
  alternates: { canonical: `${SITE_URL}/north-dakota` },
  robots: { index: true, follow: true },
};

function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a className="underline underline-offset-2" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function NorthDakotaMoveEvidencePage() {
  return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
    <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / North Dakota</nav>
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">State authority · North Dakota DOT</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">North Dakota household-goods carrier permits</h1>
    <p className="mt-5 text-lg text-slate-700">North Dakota administers an intrastate household-goods carrier permit through the Department of Transportation’s Motor Vehicle Division. The permit application, insurance documentation, annual renewal, complaints, and federal interstate records are separate evidence.</p>

    <section className="mt-8 rounded-xl border p-5" aria-labelledby="roster-status">
      <h2 id="roster-status" className="text-2xl font-semibold">Current permit population</h2>
      <p className="mt-3">A current, source-native statewide permit roster was not acquired for this publication. Household-goods permit rows and current status: <strong>NOT_ACQUIRED</strong>. This is not evidence that no permitted carriers exist.</p>
      <p className="mt-3">The NDDOT application and registration manual describe the permit process; neither is a current carrier roster. No mover count, company count, or active-status total is inferred from those documents or from FMCSA data.</p>
    </section>

    <section className="mt-8" aria-labelledby="separate-records">
      <h2 id="separate-records" className="text-2xl font-semibold">Keep authority and compliance evidence separate</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li>A North Dakota household-goods permit is state intrastate authority. An application is not an issued permit.</li>
        <li>The current NDDOT form requests liability-insurance proof and describes a renewal application. That requirement does not establish any carrier’s current insurance coverage.</li>
        <li>Permit status, tariffs, complaints, and state orders are distinct records. No current tariff, complaint, or order population is published here.</li>
        <li>FMCSA operating authority and USDOT/MC identifiers are federal records. They do not establish North Dakota intrastate household-goods authority; no name-only match is made.</li>
      </ul>
    </section>

    <section className="mt-8 rounded-xl bg-slate-50 p-5" aria-label="Official sources and clocks">
      <h2 className="text-lg font-semibold">Official sources and clocks</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li><Source href={NDDOT_FORM}>NDDOT SFN 10539 household-goods carrier permit application</Source> — form revision April 2, 2026; application and renewal requirements, not roster rows.</li>
        <li><Source href={NDDOT_FORMS}>NDDOT official forms directory</Source> — current form entry point, checked October 14, 2026.</li>
        <li><Source href={NDDOT_MANUAL}>NDDOT registration manual</Source> — process guidance for intrastate household-goods carriers; not a current roster.</li>
        <li><Source href={FMCSA}>FMCSA SAFER</Source> — separate federal carrier lookup, not a substitute for state permit evidence.</li>
      </ul>
      <p className="mt-3 text-sm text-slate-600">Source pages checked October 14, 2026. No permit roster rows, distinct permit holders, active-status totals, insurance observations, complaint rows, or order rows were acquired.</p>
    </section>
  </main>;
}
