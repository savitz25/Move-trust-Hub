import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { ALABAMA_MOVE_SNAPSHOT as s } from '@/lib/alabama-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Alabama Household-Goods Motor Carrier Authority | MoveTrustHub',
    description: 'The Alabama Public Service Commission requires an intrastate certificate or permit for household-goods moves inside Alabama. Check authority, insurance minima, tariffs and public-data limits.',
    path: '/alabama',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function AlabamaMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Alabama household-goods motor carrier authority', url: `${SITE_URL}/alabama` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Alabama research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Alabama Public Service Commission</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Alabama household-goods motor carrier authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">For-hire transportation of household goods between points in Alabama needs an Alabama Public Service Commission certificate or permit, unless an exemption applies. An APSC certificate, a contract permit, a USDOT number and a federal MC number are different credentials.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Alabama evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">APSC certificate or permit</p><p className="mt-1 text-sm font-medium">Verify with Motor Carrier Services</p><p className="mt-1 text-xs text-muted-foreground">Ask for the household-goods certificate number and whether it is still in effect.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">NOT_ACQUIRED</p><p className="mt-1 text-sm font-medium">Statewide household-goods roster</p><p className="mt-1 text-xs text-muted-foreground">No defensible public roster or mover count was acquired. Missing is not zero.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">$5,000 cargo</p><p className="mt-1 text-sm font-medium">Published cargo minimum</p><p className="mt-1 text-xs text-muted-foreground">A minimum is a filing rule. It is not proof that a carrier is insured today.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">Check the APSC authority</h2>
      <p><Official href={s.motorCarrierUrl}>APSC Motor Carrier Services</Official> regulates intrastate for-hire transportation of passengers or property, and it says that property includes household goods. A broker who arranges property transportation inside Alabama needs a separate broker license. <Official href={s.applicationsUrl}>The applications page</Official> lists Form 14H for a household-goods certificate, Form 14A for other property, and Form 19A for a property or household-goods broker. Those forms are different authority classes. A property certificate is not a household-goods certificate, and a broker license is not a carrier certificate. Passenger, taxi, charter-bus and nonprofit authority are also separate.</p>
      <p>Call Motor Carrier Services at 334-242-5176 or email mcs.ued@psc.alabama.gov to ask about a particular certificate. The 2025 household-goods annual-report form also prints toll-free 888-505-9047. An older carrier-search host, apsc.alabama.gov, did not respond on {s.retrievedAt}. That is a verification path and a missed bulk download, not a live roster and not a count of zero movers.</p>

      <h2 className="text-lg font-semibold text-foreground">Insurance, tariffs and annual reports</h2>
      <p><Official href={s.insuranceUrl}>APSC publishes minimum insurance limits</Official> for an intrastate certificate or permit. It states that all cargo is $5,000. For property equipment, the same page prints $100,000 bodily injury for one person, $300,000 for more than one person, $50,000 property damage that is not cargo, and $350,000 combined. Household goods move under the property class for that table. Passenger seating bands are a different equipment class and are not household-goods limits. Brokers are printed at a $10,000 surety, which is not carrier liability insurance. Self-insurance, if the Commission approves it, is five times the combined amount. Filings must use the full certificate or permit name and a physical address. No provider-level current insurance status was acquired.</p>
      <p>Household-goods carriers must keep an approved tariff on file. The tariff states rates, charges and rules. No tariff corpus was acquired. A tariff is not a quote. Household-goods carriers also file an annual report by April 30 for the year ending December 31. The blank <Official href={s.annualReportFormUrl}>2025 household-goods annual-report form</Official> is a filing requirement for the period ending December 31, 2025, due April 30, 2026. Filed reports were not acquired, so the form is not a census. The form asks for APSC certificate numbers, permit numbers, an FMCSA MC number and a DOT number as separate fields. Those identifiers were not joined.</p>
      <p>Unified Carrier Registration is an interstate registration. It does not establish Alabama household-goods authority. A USDOT or federal MC number does not establish a current APSC certificate, and an APSC certificate does not substitute for FMCSA authority on a move that leaves Alabama.</p>

      <h2 className="text-lg font-semibold text-foreground">Complaints and enforcement</h2>
      <p>APSC lists consumer services complaints at 1-800-392-8050. That is intake, not a public file of mover cases. <Official href={s.interstateComplaintUrl}>FMCSA has a separate interstate mover complaint path</Official>. No provider-level Alabama mover complaint rows or outcomes were acquired. A complaint is not a finding.</p>
      <p>Commission meeting records include individual motor-carrier dockets, including some household-goods applications and insurance reinstatements. A complete household-goods orders or revocation corpus was not acquired. Enforcement capability is PARTIAL. No provider-level adverse rows were attached, including by name.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Household-goods certificate rows, certificate numbers and current statuses: NOT_ACQUIRED. No mover count is shown.</li>
        <li>Rows with a printed USDOT or MC number, exact federal bridges and unmatched state rows: NOT_ACQUIRED. No combined Alabama and federal total.</li>
        <li>Cargo minimum ${s.cargoMinimumUsd.toLocaleString('en-US')}; property combined minimum ${s.propertyCombinedMinimumUsd.toLocaleString('en-US')}; broker surety ${s.brokerSuretyUsd.toLocaleString('en-US')}. Provider insurance status: NOT_ACQUIRED.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}; graph writes: {s.graphWrites}; claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>APSC motor-carrier, application and insurance pages retrieved {s.retrievedAt}. The annual-report form covers the period ending December 31, 2025, and is due April 30, 2026. Page data generated {s.generatedAt}. No roster, provider-insurance or enforcement as-of date was available. Retrieval is not an authority effective date.</li>
        <li>Birmingham, Montgomery, Huntsville and Mobile are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  </main>;
}
