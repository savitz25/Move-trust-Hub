import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/site-metadata';

const authority = 'https://dot.state.wy.us/home/trucking_commercial_vehicles/operating_authority.html';
const application = 'https://www.dot.state.wy.us/files/live/sites/wydot/files/shared/Motor%20Vehicle%20Services/IRP_IFTA/MC-100%20Wyoming%20Operating%20Authority%20Application%202026-01.pdf';
const manual = 'https://dot.state.wy.us/files/live/sites/wydot/files/shared/Motor%20Vehicle%20Services/IRP_IFTA/2020%20Wyoming%20Operating%20Authority%20Manual.pdf';
const tariffs = 'https://psc.wyo.gov/home/utility-tariffs';
const fmcsa = 'https://www.fmcsa.dot.gov/registration/types-operating-authority';
const Source = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{children}</a>
);

export const metadata: Metadata = {
  title: 'Wyoming household-goods carrier regulatory evidence',
  description: 'Wyoming intrastate motor-carrier authority and separate household-goods, tariff, insurance, and federal records.',
  alternates: { canonical: `${SITE_URL}/wyoming` },
  robots: { index: true, follow: true },
};

export default function WyomingMoveEvidencePage() {
  return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
    <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / Wyoming</nav>
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Intrastate carrier authority · Wyoming</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">Wyoming moving carrier regulatory evidence</h1>
    <p className="mt-5 text-lg text-slate-700">WYDOT administers intrastate operating authority for for-hire contract motor carriers transporting people or property. The public framework reviewed does not establish a separate household-goods-only certificate census.</p>
    <section className="mt-8 rounded-xl border p-5">
      <h2 className="text-xl font-semibold">Current household-goods authority roster</h2>
      <p className="mt-3"><strong>NOT_ACQUIRED.</strong> No free current statewide HHG-only roster was acquired. WYDOT authority applies to carrier operations broadly; an application or required filing is not proof of issued, active authority. FMCSA state-address records are not used as a Wyoming license census.</p>
    </section>
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Keep records separate</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li>WYDOT intrastate operating authority and any issued letter of authority are state motor-carrier records.</li>
        <li>The 2020 WYDOT manual lists household goods in its insurance-filing commodity guidance; that manual is dated and does not establish current coverage for any carrier.</li>
        <li>PSC tariff and maximum-rate materials are separate from WYDOT operating authority and are not a carrier roster.</li>
        <li>Applications, certificates, insurance filings, tariffs, complaints, orders, USDOT identity, and FMCSA interstate authority have distinct meanings and clocks.</li>
      </ul>
    </section>
    <section className="mt-8 rounded-xl bg-slate-50 p-5">
      <h2 className="text-lg font-semibold">Official sources and clocks</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li><Source href={authority}>WYDOT Intrastate Operating Authority</Source> — current framework checked October 14, 2026; no current HHG roster rows acquired.</li>
        <li><Source href={application}>WYDOT MC-100 application (January 2026 revision)</Source> — application requirements, not issued-authority observations.</li>
        <li><Source href={manual}>WYDOT Operating Authority Manual (revised December 2020)</Source> — historical insurance-filing commodity guidance.</li>
        <li><Source href={tariffs}>Wyoming PSC utility tariffs and rates</Source> — separate tariff/rate materials.</li>
        <li><Source href={fmcsa}>FMCSA operating-authority types</Source> — federal interstate context only.</li>
      </ul>
    </section>
  </main>;
}
