import { StateCountyLinks } from '@/components/local-movers/state-county-links';
import type { Metadata } from 'next';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { OKLAHOMA_MOVE_SNAPSHOT as s } from '@/lib/oklahoma-intelligence/snapshot';
import { buildMovePageMetadata } from '@/lib/seo/move-metadata';
import { JsonLd } from '@/lib/seo/json-ld';
import { SITE_URL } from '@/lib/seo/site-metadata';

export function generateMetadata(): Metadata {
  return buildMovePageMetadata({
    title: 'Oklahoma Household Goods Certificate Authority | MoveTrustHub',
    description: 'Oklahoma intrastate household-goods moves need an OCC Household Goods Certificate. The posted motor-carrier list is dated November 27, 2023, and is not a current census.',
    path: '/oklahoma',
  });
}

function Official({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{children}</a>;
}

export default function OklahomaMovePage() {
  return <main className="mx-auto max-w-6xl overflow-x-clip px-4 py-8 sm:px-6 sm:py-10">
    <JsonLd data={[{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Oklahoma household-goods certificate authority', url: `${SITE_URL}/oklahoma` }]} />
    <LocalMoversBreadcrumbs crumbs={[{ label: 'Home', href: '/' }, { label: 'Oklahoma research' }]} />
    <header className="border-b border-border pb-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C2410C]">Oklahoma Corporation Commission</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">Oklahoma household-goods certificate authority</h1>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">For-hire household-goods transportation between points in Oklahoma, including a move that stays inside one city, uses an Intrastate Household Goods Certificate from the Oklahoma Corporation Commission Transportation Division. That certificate, an application, a vehicle identification stamp, another motor-carrier license, a USDOT number, and FMCSA interstate authority are different credentials.</p>
    </header>

    <section className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Oklahoma evidence summary">
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">Household Goods Certificate</p><p className="mt-1 text-sm font-medium">OCC Transportation Division</p><p className="mt-1 text-xs text-muted-foreground">Issued for statewide intrastate operations. The initial term is one year, and the certificate must be renewed.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">{s.postedListRows} PIN rows</p><p className="mt-1 text-sm font-medium">List dated {s.listDated}</p><p className="mt-1 text-xs text-muted-foreground">This is the posted For-Hire Household Goods file. It is not a current census. A current roster was not acquired.</p></div>
      <div className="rounded-xl border p-4"><p className="text-lg font-semibold">${s.identificationStampUsd} stamp</p><p className="mt-1 text-sm font-medium">Identification device, not the certificate</p><p className="mt-1 text-xs text-muted-foreground">One stamp per vehicle operated under the certificate. Insurance dollar minima were not acquired.</p></div>
    </section>

    <section className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
      <h2 className="text-lg font-semibold text-foreground">What the certificate is</h2>
      <p>The <Official href={s.faqUrl}>OCC household-goods page</Official> says intrastate carriers of household goods must obtain a Household Goods Certificate, even when the shipment never leaves a city. The certificate is valid for statewide operations. It is initially issued for one year and must be renewed. A copy of the certificate stays in each vehicle, and the original stays in the carrier's files. An <Official href={s.faqUrl}>MCF 1 application</Official> is the request for authority. It is not an issued certificate. MCF 2 is the renewal application. A renewal form is not proof that a named carrier's certificate is current today.</p>
      <p>The identification stamp costs ${s.identificationStampUsd}. It is a device for a vehicle operated under the certificate. Buying a stamp, or filing TDF 16 for more stamps, does not itself create certificate authority. If the carrier also operates in interstate commerce, Unified Carrier Registration is a separate program. A USDOT number is required in the OCC application process. Printing or holding a USDOT number does not by itself prove a current Oklahoma certificate, and an Oklahoma certificate does not authorize a move that leaves Oklahoma.</p>

      <h2 className="text-lg font-semibold text-foreground">The posted list, and what it is not</h2>
      <p>OCC posts a For-Hire Household Goods motor-carrier list at the <Official href={s.listUrl}>household-goods list PDF</Official>. The file is dated {s.listDated}. Retrieved {s.retrievedAt}, it has {s.postedListRows} rows and {s.distinctPins} distinct PIN numbers. Every row prints a USDOT number, and those {s.distinctPrintedUsdots} printed values are distinct. The file does not print a separate MC column. No printed USDOT was checked against FMCSA, so there are no exact federal bridges. A mailing address or a physical address on that file is not the territory of the certificate and is not a service area.</p>
      <p>Because the certificate term is one year, a list dated {s.listDated} cannot be treated as the set of carriers authorized on {s.retrievedAt}. The current statewide roster was NOT_ACQUIRED. Missing a current count is not zero carriers. The {s.postedListRows} rows are the observation in that file only. Other OCC motor-carrier lists, including for-hire property, were not parsed and are not part of this {s.postedListRows}. Passenger authority and hazardous-materials permits are separate.</p>

      <h2 className="text-lg font-semibold text-foreground">Insurance, complaints, and enforcement</h2>
      <p>The OCC page says household-goods carriers must keep a valid liability insurance certificate and a valid cargo insurance certificate on file, and points to OAC 165:30-3-11. Dollar minima were NOT_ACQUIRED from that rule. The posted list does not print insurance status. A filing requirement is not proof that a named carrier is insured today. No provider-level complaint rows or enforcement orders were acquired. A complaint is not a finding. No carrier was attached to an order by name.</p>

      <h2 className="text-lg font-semibold text-foreground">Coverage and source clocks</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Current household-goods certificate roster and current count: NOT_ACQUIRED. The posted list is a different record.</li>
        <li>Posted list dated {s.listDated}: {s.postedListRows} rows, {s.distinctPins} distinct PINs, {s.rowsWithPrintedUsdot} printed USDOT values. MC column: not printed. Exact FMCSA bridges: none.</li>
        <li>Application, renewal, identification stamp, other motor-carrier authority, passenger authority, UCR, and FMCSA stay separate.</li>
        <li>Insurance requirement: known. Dollar minima and provider insurance status: NOT_ACQUIRED. Tariff corpus: NOT_ACQUIRED.</li>
        <li>New canonical organizations: {s.newCanonicalOrganizations}. Graph writes: {s.graphWrites}. Claim eligibility changes: {s.claimEligibilityChanges}.</li>
        <li>List SHA-256 {s.listSha256}. FAQ page last modified {s.faqPageLastModified}. Both retrieved {s.retrievedAt}. Page data generated {s.generatedAt}. The list date is not an authority effective date for 2026.</li>
        <li>Oklahoma City, Tulsa, Norman, Lawton, Edmond, and Broken Arrow are search context only. This page publishes no city or county research routes.</li>
      </ul>
    </section>
  <StateCountyLinks stateSlug="oklahoma" stateName="Oklahoma" />
    </main>;
}
