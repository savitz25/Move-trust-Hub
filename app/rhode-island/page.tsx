import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { SITE_URL } from '@/lib/seo/site-metadata';

const MOVING = 'https://ripuc.ri.gov/utility-information/motor-carriers/moving-information';
const JURISDICTION = 'https://ripuc.ri.gov/utility-information/motor-carriers/responsibilities-and-jurisdiction-motor-carriers-division';
const FORMS = 'https://ripuc.ri.gov/utility-information/motor-carriers/motor-carrier-forms';
const FMCSA = 'https://safer.fmcsa.dot.gov/';
export const metadata: Metadata = { title: 'Rhode Island household-goods carrier authority | MoveTrustHub', description: 'Rhode Island DPUC intrastate household-goods authority and dated licensed-mover snapshot, kept separate from federal FMCSA records.', alternates: { canonical: `${SITE_URL}/rhode-island` }, robots: { index: true, follow: true } };
function Source({ href, children }: { href: string; children: ReactNode }) { return <a className="underline" href={href} target="_blank" rel="noopener noreferrer">{children}</a>; }
export default function RhodeIslandMoveEvidencePage() {
  return <main className="mx-auto max-w-4xl px-4 py-10 text-slate-900">
    <nav aria-label="Breadcrumb" className="mb-5 text-sm"><Link href="/" className="underline">Home</Link> / Rhode Island</nav>
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">State authority · Rhode Island DPUC</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight">Rhode Island household-goods carrier authority</h1>
    <p className="mt-5 text-lg text-slate-700">The Rhode Island Division of Public Utilities and Carriers (DPUC), Motor Carriers Division regulates intrastate household-goods carriers. The state certificate, a filed tariff, insurance evidence, complaints, and federal interstate authority are distinct records.</p>
    <section className="mt-8 rounded-xl border p-5"><h2 className="text-2xl font-semibold">DPUC licensed-mover list snapshot</h2><p className="mt-3">The public DPUC PDF dated December 17, 2025 contains 43 carrier entries and 43 distinct MC certificate identifiers. This is the source's dated snapshot count, not a current active-carrier count.</p><p className="mt-3">Current household-goods certificate status roster: <strong>NOT_ACQUIRED</strong>. The DPUC page says its list is not updated in real time; current authority should be confirmed directly with the Division.</p><p className="mt-3 text-sm">The raw PDF and SHA-256 are preserved in <code>data/rhode-island-move-001/</code>.</p></section>
    <section className="mt-8"><h2 className="text-2xl font-semibold">Authority and records remain separate</h2><ul className="mt-3 list-disc space-y-2 pl-6"><li>Intrastate household-goods certificate: DPUC authority for in-state moves.</li><li>Application: not an issued certificate.</li><li>Tariff: DPUC approval/filing evidence, not proof of current authority or a unique carrier.</li><li>Insurance filing: a regulatory filing is not independent proof of current coverage.</li><li>Complaint or order: separate event records; complaint is not a violation finding.</li><li>FMCSA and USDOT/MC: federal interstate records, not Rhode Island intrastate authority.</li></ul></section>
    <section className="mt-8 rounded-xl bg-slate-50 p-5"><h2 className="text-xl font-semibold">Official sources</h2><ul className="mt-3 list-disc space-y-2 pl-6"><li><Source href={MOVING}>DPUC moving information and licensed mover list</Source></li><li><Source href={JURISDICTION}>DPUC Motor Carriers Division responsibilities and jurisdiction</Source></li><li><Source href={FORMS}>DPUC motor-carrier forms, tariffs, and filings</Source></li><li><Source href={FMCSA}>FMCSA SAFER</Source> for separate federal interstate verification.</li></ul><p className="mt-3 text-sm">Sources retrieved October 14, 2026; carrier-list PDF clock December 17, 2025. No company-level federal match or present-day active status is inferred.</p></section>
  </main>;
}
