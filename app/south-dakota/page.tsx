import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/site-metadata';

const SOURCES = {
  statutes: 'https://sdlegislature.gov/Statutes/49',
  singleTrip: 'https://sdlegislature.gov/Statutes/49-28-36.7',
  intrastate: 'https://sdtruckinfo.sd.gov/intrastate-carriers/',
  commercialLicense: 'https://sdtruckinfo.sd.gov/intrastate-carriers/commercial-license-plates/',
  motorCarrierServices: 'https://dor.sd.gov/businesses/motor-vehicle/motor-carrier-services/',
  consumerMoving: 'https://consumer.sd.gov/fastfacts/moving.aspx',
  fmcsa: 'https://safer.fmcsa.dot.gov/',
} as const;

export const metadata: Metadata = {
  title: 'South Dakota household-goods mover regulation | MoveTrustHub',
  description: 'South Dakota intrastate commercial vehicle rules and federal interstate mover checks, with the household-goods roster marked NOT_ACQUIRED.',
  alternates: { canonical: `${SITE_URL}/south-dakota` },
  robots: { index: true, follow: true },
};

function Source({ href, children }: { href: string; children: ReactNode }) {
  return <a className="underline underline-offset-2" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export default function SouthDakotaMoveEvidencePage() {
  return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
    <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / South Dakota</nav>
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">State transportation rules - South Dakota</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">South Dakota household-goods mover regulation</h1>
    <p className="mt-5 text-lg text-slate-700">South Dakota's current public transportation guidance describes intrastate commercial vehicle licensing and trip permits. The reviewed current sources do not provide a clean statewide roster of household-goods carrier authority. Interstate mover authority remains a separate federal question.</p>

    <section className="mt-8 rounded-xl border p-5" aria-labelledby="roster-status">
      <h2 id="roster-status" className="text-2xl font-semibold">Household-goods authority population</h2>
      <p className="mt-3">Current statewide household-goods company roster and status rows: <strong>NOT_ACQUIRED</strong>. This does not mean there are zero movers or that no permits exist.</p>
      <p className="mt-3">No mover count or active-authority total is inferred from commercial vehicle registrations, single-trip permits, FMCSA records, consumer complaints, or historic motor-carrier provisions.</p>
    </section>

    <section className="mt-8" aria-labelledby="state-framework">
      <h2 id="state-framework" className="text-2xl font-semibold">What the state sources establish</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li>South Dakota's intrastate-carrier guidance directs carriers to commercial vehicle licensing information and county contacts. A vehicle registration or plate is not a household-goods company authority record.</li>
        <li>Current codified law defines motor carriers and lists many historic economic certificate provisions as repealed. The remaining Chapter 49-28 single-trip application provision is a trip permit record, not a statewide mover roster.</li>
        <li>The South Dakota consumer moving page points consumers to federal FMCSA resources for interstate movers. Federal operating authority and USDOT/MC identifiers do not establish intrastate state authority.</li>
        <li>Insurance requirements, actual coverage observations, tariffs, complaints, and orders are separate evidence. No current statewide South Dakota population for those records is published here.</li>
      </ul>
    </section>

    <section className="mt-8" aria-labelledby="sources">
      <h2 id="sources" className="text-2xl font-semibold">Authoritative sources and clocks</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
        <li><Source href={SOURCES.statutes}>South Dakota Codified Laws, Title 49</Source> - current codification effective September 3, 2026; reviewed October 14, 2026.</li>
        <li><Source href={SOURCES.singleTrip}>SDCL 49-28-36.7</Source> - single-trip permit application; reviewed October 14, 2026.</li>
        <li><Source href={SOURCES.intrastate}>SDTruckInfo intrastate-carrier guidance</Source> and <Source href={SOURCES.commercialLicense}>commercial plate guidance</Source> - reviewed October 14, 2026.</li>
        <li><Source href={SOURCES.motorCarrierServices}>South Dakota Department of Revenue Motor Carrier Services</Source> - intrastate and interstate vehicle credential guidance; reviewed October 14, 2026.</li>
        <li><Source href={SOURCES.consumerMoving}>South Dakota Consumer Protection moving guidance</Source> and <Source href={SOURCES.fmcsa}>FMCSA SAFER</Source> - federal interstate mover checks; reviewed October 14, 2026.</li>
      </ul>
    </section>

    <p className="mt-8 rounded-xl bg-slate-50 p-5 text-sm text-slate-700">This page reports source availability and regulatory structure. It does not rank movers, combine state and federal records, assign a Trust Score, or make a claim about any company's current authority or insurance.</p>
  </main>;
}
