import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE_URL } from '@/lib/seo/site-metadata';

const PSC = 'https://psc.mt.gov/motorcarriers';
const AUTHORITY_LIST = 'https://psc.mt.gov/_docs/3_5_26_INTRABOOK.pdf';
const HHG_GUIDE = 'https://psc.mt.gov/_docs/Transportation/pdf/Guide-for-Application-Process-Household-Goods-or-Garbage-2015.pdf';
const ANNUAL_REPORT = 'https://psc.mt.gov/_docs/Transportation/pdf/MotorCarrierAnnualReportEXCEL.xls';

export const metadata: Metadata = {
  title: 'Montana household-goods carrier authority evidence | MoveTrustHub',
  description: 'Montana PSC intrastate motor-carrier authority and household-goods PCN framework. Current HHG population not reconciled; authority records are not companies.',
  alternates: { canonical: `${SITE_URL}/montana` },
  robots: { index: true, follow: true },
};

function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a className="underline underline-offset-2" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function MontanaMoveEvidencePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / Montana</nav>
      <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">State authority · Montana PSC</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">Montana household-goods carrier authority</h1>
      <p className="mt-5 text-lg text-slate-700">
        The Montana Public Service Commission regulates applicable intrastate motor-carrier authority.
        Household-goods transportation is addressed through the PSC certificate and household-goods
        PCN process. A PSC authority entry is an authority record, not a distinct company.
      </p>

      <section className="mt-8 rounded-xl border p-5" aria-labelledby="roster-status">
        <h2 id="roster-status" className="text-xl font-semibold">Household-goods authority population</h2>
        <p className="mt-3">The PSC authority list dated March 5, 2026 contains 60 authority entries. These entries were not treated as 60 companies or movers.</p>
        <p className="mt-3">A focused review of the list did not establish a defensible positive household-goods PCN cohort. Household-goods population: <strong>NOT_ACQUIRED / NOT_RECONCILED</strong>. That does not mean there are no authorized carriers.</p>
      </section>

      <section className="mt-8" aria-labelledby="separate-records">
        <h2 id="separate-records" className="text-2xl font-semibold">Keep authority and compliance records separate</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
          <li>The household-goods PCN/certificate and other intrastate authority classes have distinct service scopes. An application is not issued authority.</li>
          <li>Insurance filings, annual reports, tariffs, complaints, and PSC orders are separate evidence. A filing requirement does not establish current coverage, and a complaint is not a violation finding.</li>
          <li>FMCSA interstate authority and USDOT/MC identifiers are federal records. They do not establish Montana intrastate household-goods authority; no name-only federal bridge is made.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl bg-slate-50 p-5" aria-label="Official sources">
        <h2 className="text-lg font-semibold">Official sources and clocks</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li><Source href={PSC}>Montana PSC motor-carrier authority</Source> — regulator information and current authority-list entry point, checked 2026-10-14.</li>
          <li><Source href={AUTHORITY_LIST}>Intrastate authority list</Source> — source date March 5, 2026; 60 authority entries observed.</li>
          <li><Source href={HHG_GUIDE}>Household-goods / garbage PCN application guide</Source> — process guidance dated 2015; not a current carrier roster.</li>
          <li><Source href={ANNUAL_REPORT}>Motor-carrier annual-report form</Source> — blank form, not annual-report filing observations.</li>
        </ul>
      </section>
    </main>
  );
}
