import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { MARYLAND_MOVE_SNAPSHOT as s } from '@/lib/maryland-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({ title: 'Maryland Household-Goods Mover Registration | MoveTrustHub', description: 'Verify Maryland Labor household-goods mover registration in its official public query. Registration is separate from USDOT and MC authority; learn about complaints and coverage limits.', path: '/maryland' });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function MarylandMovePage() {
  return <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Maryland household-goods mover registration', url: `${SITE_URL}/maryland` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Maryland research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Maryland Labor · household-goods authority</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Maryland household-goods mover registration</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">The Maryland Department of Labor, Division of Occupational and Professional Licensing, administers household-goods mover registration. Maryland registration, USDOT identity and MC authority are separate. A federal number does not establish Maryland registration.</p>
    </header>
    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Maryland evidence summary">
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">Live lookup</p><p className="mt-1 text-sm font-medium">Maryland Labor registration</p><p className="mt-1 text-xs text-muted-foreground">Search by company, trade name, location or registration number.</p></div>
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide roster count</p><p className="mt-1 text-xs text-muted-foreground">The official search uses reCAPTCHA and offers no public export. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Exact USDOT / MC bridges</p><p className="mt-1 text-xs text-muted-foreground">No state rows were captured, so no exact federal links were made.</p></div>
    </section>
    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Check a Maryland registration</h2>
      <p><Official href={s.regulatorUrl}>Maryland Labor</Official> says people or companies providing household-goods moving services in the state using a commercial motor vehicle must register. Its <Official href={s.searchUrl}>official public query</Official> describes its results as active licensees and supports company name, trade name, city or ZIP, and registration-number searches. Verify the displayed registration number and status in that live query before hiring. We do not reproduce individual records because the query requires reCAPTCHA and has no public export.</p>
      <p>Maryland Labor&apos;s <Official href={s.launchUrl}>November 2025 launch announcement</Official> says enforcement began March 1, 2026. Its <Official href={s.regulatorUrl}>registration landing page</Official> still says March 1, 2025. These official dates conflict; the current live query is the verification path. Registration certificates last one year under the <Official href={s.regulationsUrl}>regulations</Official>. A search result&apos;s status, issue or expiration date and renewal are separate facts. No individual status or date was captured here.</p>
      <p>The <Official href={s.applicationUrl}>application requirements</Official> include company and trade names, a DOT number, liability and cargo insurance, workers&apos; compensation and good-standing evidence. These requirements do not prove any particular mover&apos;s current coverage. We do not publish FEIN, ownership, resident-agent or policy details.</p>
      <h2 className="text-lg font-semibold text-foreground">Complaints and enforcement</h2>
      <p>Maryland Labor&apos;s <Official href={s.consumerUrl}>consumer page</Official> directs property damage, late or unprofessional conduct, contract and money disputes, detained property and missing property to a complaint form. For suspected lack of registration, proper insurance or workers&apos; compensation, it directs consumers to call 410-230-6174. These are intake categories, not provider-level findings.</p>
      <p>The public query says to contact the Household Goods Movers Registration Unit for disciplinary-action information. The <Official href={s.regulationsUrl}>regulations</Official> allow civil penalties for violations, including unregistered moving. A clean public provider-level 2025–2026 enforcement corpus was NOT_ACQUIRED. Enforcement capability is KNOWN/PARTIAL; no respondent, action or adverse link was inferred.</p>
      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc pl-5"><li>Official statewide roster rows, distinct registration numbers, company names, exact status labels, issue/expiration dates and business locations: NOT_ACQUIRED. The public query is verification only.</li><li>Rows with USDOT or MC, distinct federal identifiers, exact state-to-federal bridges and rows without federal IDs: NOT_ACQUIRED. No name-only joins or combined state and federal total.</li><li>New canonical organizations: 0; graph writes: 0; claim eligibility changes: 0.</li><li>Public query footer updated {s.queryUpdatedAt}; sources retrieved {s.retrievedAt}; page data generated {s.generatedAt}. Neither source clock is a universal Maryland registration as-of date. No individual expiration or enforcement date was acquired.</li><li>Baltimore, Annapolis, Frederick and Rockville are geographic search context only; no city intelligence pages or mover ranking.</li></ul>
    </section>
  <StateCountyLinks stateSlug="maryland" stateName="Maryland" />
    </main>;
}
