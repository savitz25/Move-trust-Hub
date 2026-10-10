import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { LOUISIANA_MOVE_SNAPSHOT as s } from '@/lib/louisiana-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Louisiana Household-Goods Common Carrier Certificate | MoveTrustHub',
    description: 'The Louisiana Public Service Commission requires a common carrier certificate for household-goods moves inside Louisiana. Check authority, the written-estimate order, and public-data limits.',
    path: '/louisiana',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function LouisianaMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Louisiana household-goods common carrier certificate', url: `${SITE_URL}/louisiana` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Louisiana research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Louisiana Public Service Commission</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Louisiana household-goods common carrier certificate</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">A for-hire household-goods move between points in Louisiana needs a Louisiana Public Service Commission common carrier certificate. An LPSC certificate, a USDOT number, and a federal MC number are different credentials.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Louisiana evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">LPSC certificate</p><p className="mt-1 text-sm font-medium">La. R.S. 45:164(E)</p><p className="mt-1 text-xs text-muted-foreground">Intrastate household-goods movers need a common carrier certificate before they move goods inside Louisiana.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide household-goods roster</p><p className="mt-1 text-xs text-muted-foreground">The public portal is a search. No roster or mover count was acquired. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Written estimate</p><p className="mt-1 text-sm font-medium">General Order July 12, 2013</p><p className="mt-1 text-xs text-muted-foreground">Customers have a right to a written estimate. That order is not a tariff file and not a price.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Check the LPSC certificate</h2>
      <p><Official href={s.householdGoodsUrl}>LPSC Motor Carrier household-goods guidance</Official> says a move from one Louisiana location to another Louisiana location is regulated by the Commission. {s.statute} requires an intrastate household-goods mover to secure a common carrier certificate before moving household goods. A relocation company or third-party service that uses a carrier without that certificate can be cited. <Official href={s.thirdPartyLetterUrl}>The May 8, 2015 staff letter</Official> states that point. It is not a census of movers.</p>
      <p>Registered household-goods movers can be looked up in the <Official href={s.searchPortalUrl}>LPSC public portal</Official>. That portal was not downloaded. No active-certificate rows, certificate numbers, or current statuses were acquired. Commission staff can confirm outstanding fines or citations for a named carrier on request. That request path is not a public enforcement file. Call the Transportation Division at 225-342-4439 or 888-342-5717, or write Post Office Box 91154, Baton Rouge, Louisiana 70821-9154.</p>

      <h2 className="text-lg font-semibold text-foreground">Written estimates, insurance, and interstate moves</h2>
      <p>The <Official href={s.writtenEstimateOrderUrl}>General Order dated July 12, 2013</Official> says every customer has the right to a written estimate from a household-goods mover. A waiver has to tell the customer about that right. The order is a consumer rule. It is not a filed-tariff corpus, not a quote, and not a statewide price. No tariff documents were acquired.</p>
      <p>No published Louisiana cargo or liability dollar minimum, and no provider-level current insurance status, was acquired. A missing insurance figure is not zero coverage and not proof that a carrier is insured today.</p>
      <p>A move that leaves Louisiana is an FMCSA interstate move. LPSC points consumers to 1-888-368-7238 and protectyourmove.gov. <Official href={s.interstateComplaintUrl}>FMCSA has a separate interstate complaint path</Official>. A USDOT or federal MC number does not establish a current LPSC certificate, and an LPSC certificate does not substitute for FMCSA authority on a move that crosses a state line. No exact state-to-federal bridges were acquired.</p>

      <h2 className="text-lg font-semibold text-foreground">Complaints and enforcement</h2>
      <p>The Transportation Division takes household-goods complaints and says an investigation will be opened. The <Official href={s.complaintFormUrl}>household-goods complaint form</Official> is intake. No provider-level complaint rows or outcomes were acquired. A complaint is not a finding. Individual transportation orders exist, including the written-estimate order. A complete household-goods orders or revocation corpus was not acquired. Enforcement capability is PARTIAL. No provider-level adverse rows were attached, including by name.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Household-goods certificate rows, certificate numbers, and current statuses: NOT_ACQUIRED. The portal is OPEN_SEARCH_ONLY. No mover count is shown.</li>
        <li>Rows with a printed USDOT or MC number, exact federal bridges, and unmatched state rows: NOT_ACQUIRED. No combined Louisiana and federal total.</li>
        <li>Cargo or liability minimum: NOT_ACQUIRED. Provider insurance status: NOT_ACQUIRED.</li>
        <li>Written-estimate right: KNOWN, General Order dated July 12, 2013. Tariff corpus: NOT_ACQUIRED.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}; graph writes: {s.graphWrites}; claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>LPSC household-goods page retrieved {s.retrievedAt}. The written-estimate order is dated July 12, 2013. The third-party letter is dated May 8, 2015. Page data generated {s.generatedAt}. No roster or enforcement as-of date was available. Retrieval is not a certificate effective date.</li>
        <li>New Orleans, Baton Rouge, Shreveport, and Lafayette are search context only. This page publishes no city or parish research routes.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="louisiana" stateName="Louisiana" />
    </main>;
}
