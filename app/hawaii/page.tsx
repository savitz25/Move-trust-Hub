import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/site-metadata';

const PUC = 'https://puc.hawaii.gov/motor_carriers/';
const REPORT = 'https://hpuc.my.site.com/cdms/s/reports?report=Active%20Motor%20Carriers%20Report';
const ANNUAL = 'https://puc.hawaii.gov/wp-content/uploads/2026/01/PUC-Annual-Report-Fiscal-Year-2025.pdf';
const TARIFF = 'https://puc.hawaii.gov/wp-content/uploads/2021/08/MC-FAQ-Tariff.pdf';

export const metadata: Metadata = {
  title: 'Hawaii household-goods carrier authority evidence',
  description: 'Hawaii PUC motor-carrier authority, source limits, and separate federal records.',
  alternates: { canonical: `${SITE_URL}/hawaii` },
  robots: { index: true, follow: true },
};

const Source = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{children}</a>
);

export default function HawaiiMoveEvidencePage() {
  return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
    <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / Hawaii</nav>
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">State authority · Hawaii PUC</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">Hawaii moving carrier authority</h1>
    <p className="mt-5 text-lg text-slate-700">The Hawaii Public Utilities Commission regulates intrastate motor carriers. Its property-carrier classes include household goods, general commodities, dump-truck commodities, and specific commodities. Those state authority classes are distinct from federal interstate authority.</p>
    <section className="mt-8 rounded-xl border p-5" aria-labelledby="roster-status">
      <h2 id="roster-status" className="text-xl font-semibold">Current authority roster</h2>
      <p className="mt-3">Current statewide household-goods authority rows and counts: <strong>NOT_ACQUIRED</strong>. The PUC publishes an Active Motor Carriers report link, but the report was not available as a reproducible downloadable roster during this retrieval. A tariff is not an authority census.</p>
      <p className="mt-3">The FY2025 PUC annual report records 50 newly certificated or licensed property carriers and 9 property-carrier surrenders or revocations. These are annual flow observations across property classes, not a current household-goods count.</p>
    </section>
    <section className="mt-8" aria-labelledby="separate-records">
      <h2 id="separate-records" className="text-2xl font-semibold">Keep the records separate</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li>Household-goods authority, other property-carrier authority, certificate or permit, and operating status are separate PUC records.</li>
        <li>Tariff filings, insurance requirements, complaints, and PUC orders are separate evidence. A requirement does not prove current coverage; a complaint does not establish a violation.</li>
        <li>FMCSA interstate authority and USDOT/MC identifiers are federal records and do not establish Hawaii intrastate authority.</li>
      </ul>
    </section>
    <section className="mt-8 rounded-xl bg-slate-50 p-5" aria-label="Official sources">
      <h2 className="text-lg font-semibold">Official sources and clocks</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li><Source href={PUC}>Hawaii PUC motor-carrier licensing</Source> — current source page; no downloadable roster rows acquired.</li>
        <li><Source href={REPORT}>PUC Active Motor Carriers report</Source> — report entry point; source-native current rows NOT_ACQUIRED.</li>
        <li><Source href={TARIFF}>PUC tariff FAQ</Source> — tariff guidance, not a current authority list.</li>
        <li><Source href={ANNUAL}>FY2025 PUC annual report</Source> — annual activity totals described above.</li>
      </ul>
    </section>
  </main>;
}
