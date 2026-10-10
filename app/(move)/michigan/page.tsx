import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { MICHIGAN_MOVE_SNAPSHOT as s } from '@/lib/michigan-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Michigan Household Goods Mover Authority | MoveTrustHub',
    description: 'Michigan CVED household-goods authority: 199 Active public search rows, exact printed USDOT and federal motor carrier identifiers, insurance, tariff rules and complaint limits.',
    path: '/michigan',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function MichiganMoveIntelligencePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Michigan household-goods mover authority', url: `${SITE_URL}/michigan` }]} />
      <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Michigan research' }]} />
      <header className="border-b border-border pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Michigan · household-goods authority</p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Michigan household-goods mover authority</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          The Michigan State Police Commercial Vehicle Enforcement Division (CVED) authorizes point-to-point household-goods moves in Michigan.
          A USDOT number alone does not prove Michigan household-goods authority. Michigan CVED authority, a USDOT identifier and federal MC authority are different records.
        </p>
      </header>

      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">{s.activeHhgAuthorityRows}</p><p className="mt-1 text-sm font-medium">Active Household Goods search rows</p><p className="mt-1 text-xs text-muted-foreground">199 distinct CVED numbers; status label is exactly “Active” in the public search.</p></div>
        <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">{s.printedUsdotBridges} / {s.printedFederalMotorCarrierBridges}</p><p className="mt-1 text-sm font-medium">Rows with printed USDOT / federal motor carrier identifiers</p><p className="mt-1 text-xs text-muted-foreground">187 distinct USDOT values; exact fields are not a second carrier population or proof of current federal authority.</p></div>
        <div className="rounded-xl border p-4"><p className="text-2xl font-semibold">Verify live</p><p className="mt-1 text-sm font-medium">Check a carrier with CVED</p><p className="mt-1 text-xs text-muted-foreground">The public search supports CVED #, USDOT, federal motor carrier number, name, operation type and authority status.</p></div>
      </section>

      <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">What the statewide search establishes</h2>
        <p>We captured the official <Official href={s.authoritySearch}>CVED Authority Carrier Search</Official> with its “Household Goods” and “Active” filters. The public result reports {s.activeHhgAuthorityRows} rows with {s.distinctCvedNumbers} distinct CVED numbers. It prints a USDOT value on {s.printedUsdotBridges} rows ({s.distinctPrintedUsdot} distinct USDOT values) and a federal motor carrier number on {s.printedFederalMotorCarrierBridges} rows. A missing identifier is unknown, not zero federal authority. CVED does not print a source as-of date; this snapshot was retrieved {s.retrievedAt}. Recheck live status before a move.</p>
        <p>The row is a Michigan authority observation. A CVED number is not a USDOT or MC number. An exact printed identifier is a source bridge, not a merged state and federal license or a new company. We created no canonical organizations and made no graph writes.</p>

        <h2 className="text-lg font-semibold text-foreground">Authority, renewal and insurance</h2>
        <p><Official href={s.regulatoryPage}>MSP/CVED Regulatory and Credentialing</Official> says intrastate for-hire carriers need CVED authority before operating. Household-goods carriers renew annually and purchase decals. General approval requirements include business registration, workers&apos; compensation proof or an exclusion, a liability certificate and Form E from the insurer, and fees. A valid USDOT number applies when required for vehicles over 26,001 pounds GVWR. Household-goods carriers additionally provide Form H from their insurer and any continuous contracts. These filings, identifiers and annual authority are separate facts.</p>

        <h2 className="text-lg font-semibold text-foreground">Tariffs, rates and consumer protection</h2>
        <p>CVED requires tariff membership for household-goods travel over 40 miles when the carrier is not operating under a continuous contract. The <Official href={s.consumerGuide}>MSP household-goods guide</Official> describes rates for moves of 40 miles or less as unregulated and rates for longer moves as regulated by weight and mileage, with supplemental services. It also describes the bill of lading, estimate, valuation options and written damage claims. We acquired these official rules, not a carrier tariff corpus or price database. A tariff is not a quote.</p>

        <h2 className="text-lg font-semibold text-foreground">Complaints and enforcement</h2>
        <p>MSP says CVED receives complaints about hostage freight, cargo theft and property damage. Its <Official href={s.investigationPage}>Investigation Unit</Official> accepts information about potentially illegal or unsafe carrier operations at MSP-CVEDSPSection@michigan.gov. Complaint intake is known; no provider-level complaint rows or adjudicated outcomes were acquired. A complaint is not a finding.</p>

        <h2 className="text-lg font-semibold text-foreground">Coverage limits</h2>
        <ul className="list-disc pl-5">
          <li>Active search rows are a retrieval snapshot, not a guarantee of current authority or a count of all historical authorities.</li>
          <li>No combined Michigan plus federal mover total; no name-based adverse-evidence matching.</li>
          <li>Carrier tariff documents, provider-level complaints and enforcement outcomes: NOT_ACQUIRED.</li>
          <li>No city intelligence pages; Detroit, Grand Rapids, Lansing and Ann Arbor are search context only.</li>
          <li>No ratings or recommendations.</li>
        </ul>
      </section>
    <StateCountyLinks stateSlug="michigan" stateName="Michigan" />
    </main>
  );
}
