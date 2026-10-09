import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';
import roster from '@/data/missouri/mo-move-001/roster-observations.json';

const rosterUrl = 'https://www.modot.org/media/53733';
const rulesUrl = 'https://www.modot.org/sites/default/files/documents/HHGRuleAndRegList_0_0.pdf';
const guideUrl = 'https://www.modot.org/sites/default/files/documents/Missouri%20Trucking%20Guide-Sept2024_0.pdf';
const active = roster.rows.filter((row) => row.status === 'ACTIVE').length;
const suspended = roster.rows.filter((row) => row.status === 'SUSPENDED').length;

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Missouri Household Goods Mover Authority | MoveTrustHub',
    description: 'MoDOT household goods authorization evidence, with a dated carrier roster and separate common carrier certificates, contract carrier permits, applications and insurance rules.',
    path: '/missouri',
  });
}

export default function MissouriMovePage() {
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Missouri household goods mover authority', url: `${SITE_URL}/missouri` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Missouri research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">MoDOT Motor Carrier Services</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Missouri household goods mover authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Missouri intrastate household goods carriers generally need MoDOT operating authority. A common carrier receives a certificate; a contract carrier receives a permit. The application, annual regulatory license, insurance filings and FMCSA interstate authority are separate records.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Missouri evidence summary">
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">{roster.rows.length}</p><p className="text-sm">MoDOT roster observations</p><p className="mt-1 text-xs text-muted-foreground">As of {roster.source_as_of}; {active} ACTIVE, {suspended} SUSPENDED. This is a dated source snapshot.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Certificate / permit</p><p className="text-sm">Two authority classes</p><p className="mt-1 text-xs text-muted-foreground">The public roster does not identify which class applies to each carrier.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">USDOT is a bridge</p><p className="text-sm">Not a Missouri credential</p><p className="mt-1 text-xs text-muted-foreground">A federal identifier cannot establish current Missouri authority or interstate household goods authority.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">What MoDOT publishes</h2>
      <p>The <a className="underline" href={rosterUrl}>MoDOT authorized transporters roster</a> names household goods carriers and prints USDOT identifiers and status. Its source date is {roster.source_as_of}. The extracted {roster.rows.length} rows have {new Set(roster.rows.map((row) => row.usdot)).size} distinct printed USDOT identifiers. The list has {active} ACTIVE and {suspended} SUSPENDED rows. These statuses describe that date, not a live verification on this page. Check directly with MoDOT before hiring a carrier.</p>
      <p>The <a className="underline" href={guideUrl}>Missouri Trucking Guide</a> says common carriers of household goods receive certificates and contract carriers receive permits. MoDOT&apos;s <a className="underline" href={rulesUrl}>household goods rules list</a> cites sections 390.051 and 390.061 for those distinct authorities. The authorized-transporter roster does not print certificate or permit numbers or their class. We therefore do not assign a class to any roster row. An application is a request for authority, not proof that it was granted.</p>
      <p>MoDOT says an applicant must supply proof of insurance and financial fitness. A requirement does not establish actual, current compliance for a named carrier. Current provider insurance filings, certificate and permit documents, applications, tariffs, complaint outcomes and enforcement orders were not acquired as entity-level evidence. Complaints, if later acquired, must remain distinct from findings.</p>
      <h2 className="text-lg font-semibold text-foreground">Coverage limits</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Raw MoDOT roster: {roster.rows.length} observations, {roster.rows.length} distinct printed USDOT identifiers, source as of {roster.source_as_of}; retrieved October 6, 2026.</li>
        <li>Certificate numbers, permit numbers, authority class and current live statuses: NOT_ACQUIRED. The roster date must not be treated as today&apos;s status.</li>
        <li>Provider-level insurance compliance and federal interstate household goods authority: NOT_ACQUIRED. No combined state and federal total is asserted.</li>
        <li>No city or county research is published here.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="missouri" stateName="Missouri" />
    </main>;
}
