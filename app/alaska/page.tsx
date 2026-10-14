import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/site-metadata';

const DOT = 'https://dot.alaska.gov/mscvc/pages/cve.shtml';
const CARRIER_RULES = 'https://dot.alaska.gov/mscvc/webdocs/17AAC25.pdf';
const STATE_AUTHORITY = 'https://dot.alaska.gov/comm/statutory-regulatory-authority.shtml';
const FMCSA = 'https://www.fmcsa.dot.gov/registration/types-operating-authority';

export const metadata: Metadata = {
  title: 'Alaska household-goods carrier regulatory evidence',
  description: 'Alaska intrastate motor-carrier safety framework and separate federal household-goods authority evidence.',
  alternates: { canonical: `${SITE_URL}/alaska` },
  robots: { index: true, follow: true },
};

const Source = ({ href, children }: { href: string; children: ReactNode }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{children}</a>;

export default function AlaskaMoveEvidencePage() {
  return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
    <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / Alaska</nav>
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Intrastate carrier safety · Alaska DOT&amp;PF</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">Alaska moving carrier regulatory evidence</h1>
    <p className="mt-5 text-lg text-slate-700">Alaska’s published motor-carrier framework requires intrastate-only motor carriers to file a carrier identification report and obtain an intrastate USDOT number before operating. That safety and identification framework is not evidence of a separate household-goods operating certificate or current carrier roster.</p>
    <section className="mt-8 rounded-xl border p-5" aria-labelledby="roster-status">
      <h2 id="roster-status" className="text-xl font-semibold">Current Alaska household-goods authority roster</h2>
      <p className="mt-3">A distinct statewide household-goods certificate program or current HHG roster was not identified in the reviewed Alaska sources: <strong>NOT_ACQUIRED / no distinct roster located</strong>. No Alaska-address FMCSA results are substituted for an Alaska state license census.</p>
    </section>
    <section className="mt-8" aria-labelledby="separate-records">
      <h2 id="separate-records" className="text-2xl font-semibold">Separate records and meanings</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li>Alaska intrastate carrier identification and safety rules are state requirements; this review found no separate HHG certificate roster.</li>
        <li>FMCSA interstate household-goods operating authority is federal and does not establish Alaska intrastate authority.</li>
        <li>USDOT identity, insurance filings, tariffs, complaints, applications, and enforcement orders are separate records. A filing requirement does not prove current coverage; a complaint is not a violation finding.</li>
      </ul>
    </section>
    <section className="mt-8 rounded-xl bg-slate-50 p-5" aria-label="Official sources">
      <h2 className="text-lg font-semibold">Official sources and clocks</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li><Source href={DOT}>Alaska DOT&amp;PF Commercial Vehicle Compliance</Source> — source checked October 14, 2026; live source, no HHG roster rows acquired.</li>
        <li><Source href={CARRIER_RULES}>17 AAC 25, motor-carrier regulations</Source> — state carrier identification and safety framework.</li>
        <li><Source href={STATE_AUTHORITY}>Alaska DOT&amp;PF statutory and regulatory authority</Source> — state department authority sources.</li>
        <li><Source href={FMCSA}>FMCSA operating-authority types</Source> — federal interstate authority context, kept separate from Alaska state requirements.</li>
      </ul>
    </section>
  </main>;
}
